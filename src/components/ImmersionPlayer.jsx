import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { buildCorpus, SOURCES, GRANULARITY, GAPS, ECHO } from '../data/immersion'

const STATS_KEY = 'korean-immersion-stats-v1'
const STAR_KEY = 'korean-immersion-stars-v1'
const TIMERS = [
  { v: 0, t: '不限' },
  { v: 15, t: '15 分钟' },
  { v: 30, t: '30 分钟' },
  { v: 60, t: '60 分钟' },
]
const GOALS = [15, 30, 60, 120]

const todayStr = () => new Date().toLocaleDateString('sv')
const rand = (a, b) => a + Math.random() * (b - a)
const randInt = (a, b) => Math.floor(rand(a, b + 1))

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}
function save(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch {
    // 存不了不影响播放
  }
}
const fmt = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`

function Pills({ options, value, onChange }) {
  return (
    <div className="im-pills">
      {options.map((o) => (
        <button key={o.v} className={`im-pill ${value === o.v ? 'on' : ''}`} onClick={() => onChange(o.v)}>
          {o.t}
        </button>
      ))}
    </div>
  )
}

export default function ImmersionPlayer({ speak, stop, slow, onRunningChange }) {
  const corpus = useMemo(() => buildCorpus(), [])
  const [settings, setSettings] = useState({ source: 'all', gran: 'mix', gap: 'mid', rate: 1, echo: 'mid', peek: 'off', timer: 0 })
  const [running, setRunning] = useState(false)
  const [current, setCurrent] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [sessionSec, setSessionSec] = useState(0)
  const [heard, setHeard] = useState(0)
  const [finished, setFinished] = useState(false)
  const [stats, setStats] = useState(() => {
    const s = load(STATS_KEY, null)
    return s && s.date === todayStr() ? s : { date: todayStr(), sec: 0, clips: 0, goal: s?.goal || 30 }
  })
  const [stars, setStars] = useState(() => load(STAR_KEY, []))

  const settingsRef = useRef(settings)
  const slowRef = useRef(slow)
  const runningRef = useRef(false)
  const queueRef = useRef([])
  const playsRef = useRef(new Map())
  const counterRef = useRef(0)
  const tokenRef = useRef(0)
  const gapTimerRef = useRef(null)
  const watchRef = useRef(null)
  const statsRef = useRef(stats)

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])
  useEffect(() => {
    slowRef.current = slow
  }, [slow])
  useEffect(() => {
    statsRef.current = stats
  }, [stats])
  // 条数变化时持久化（不放在 setStats 的 updater 里：updater 应为纯函数，StrictMode 下会被调用两次）
  useEffect(() => {
    if (stats.clips > 0) save(STATS_KEY, statsRef.current)
  }, [stats.clips])
  useEffect(() => {
    onRunningChange?.(running)
  }, [running, onRunningChange])

  // 当前选择的内容来源下，各类型单元的池子
  const pools = useMemo(() => {
    const list = settings.source === 'all' ? corpus : corpus.filter((i) => i.src === settings.source)
    return {
      chunk: list.filter((i) => i.type === 'chunk'),
      word: list.filter((i) => i.type === 'word'),
      sent: list.filter((i) => i.type === 'line' || i.type === 'phrase'),
    }
  }, [corpus, settings.source])
  const poolsRef = useRef(pools)
  useEffect(() => {
    poolsRef.current = pools
  }, [pools])

  // 从一个池子里"抽样 5 个，取听得最少的"，让每个单元的出现次数大致均衡
  const tournament = (list) => {
    let best = null
    let bestN = Infinity
    for (let k = 0; k < 5; k++) {
      const it = list[Math.floor(Math.random() * list.length)]
      const n = playsRef.current.get(it.id) || 0
      if (n < bestN || (n === bestN && Math.random() < 0.5)) {
        best = it
        bestN = n
      }
    }
    return best
  }

  const pickNext = () => {
    const s = settingsRef.current
    const n = counterRef.current
    const q = queueRef.current
    const dueIdx = q.findIndex((x) => x.at <= n)
    let item
    if (dueIdx >= 0) {
      item = q.splice(dueIdx, 1)[0].item
    } else {
      const p = poolsRef.current
      const w = GRANULARITY[s.gran]
      const weights = { chunk: p.chunk.length ? w.chunk : 0, word: p.word.length ? w.word : 0, sent: p.sent.length ? w.sent : 0 }
      const total = weights.chunk + weights.word + weights.sent
      let r = Math.random() * total
      let kind = 'sent'
      for (const k of ['chunk', 'word', 'sent']) {
        if (r < weights[k]) {
          kind = k
          break
        }
        r -= weights[k]
      }
      item = tournament(p[kind].length ? p[kind] : p.sent.length ? p.sent : p.word)
    }

    // 安排"回声"：碎片和整句互相隔几条再回来；单词偶尔原样再来一次
    const prob = ECHO[s.echo].p
    if (q.length < 6 && Math.random() < prob) {
      if ((item.type === 'line' || item.type === 'phrase') && item.kids?.length) {
        q.push({ at: n + randInt(2, 5), item: item.kids[Math.floor(Math.random() * item.kids.length)] })
      } else if (item.type === 'chunk' && item.parent) {
        q.push({ at: n + randInt(3, 7), item: item.parent })
      } else if (item.type === 'word' && Math.random() < 0.6) {
        q.push({ at: n + randInt(3, 8), item })
      }
    }
    return item
  }

  const playNext = useCallback(() => {
    if (!runningRef.current) return
    const item = pickNext()
    if (!item) return
    setCurrent(item)
    setRevealed(false)
    const my = ++tokenRef.current
    const rate = slowRef.current ? 0.7 : settingsRef.current.rate
    clearTimeout(gapTimerRef.current)
    clearTimeout(watchRef.current)

    // 每条只结算一次：ended、浏览器朗读 onend、兜底计时器可能先后都触发，
    // 以前兜底先到、ended 后到时会计两次，还会排出两个 playNext 形成并行的两条播放链
    let settled = false
    const done = () => {
      if (settled || tokenRef.current !== my || !runningRef.current) return
      settled = true
      clearTimeout(watchRef.current)
      counterRef.current += 1
      playsRef.current.set(item.id, (playsRef.current.get(item.id) || 0) + 1)
      setHeard((h) => h + 1)
      setStats((s) => ({ ...s, clips: s.clips + 1 }))
      const [lo, hi] = GAPS[settingsRef.current.gap].range
      let gap = rand(lo, hi)
      if (Math.random() < 0.1) gap += rand(3, 7) // 偶尔安静一会儿
      clearTimeout(gapTimerRef.current)
      gapTimerRef.current = setTimeout(playNext, gap * 1000)
    }
    // 保险：万一 ended 事件没触发，也按时长估算继续（按语速放宽，避免慢速时提前结算）
    watchRef.current = setTimeout(done, Math.min(25, (3 + item.ko.length * 0.45) / rate) * 1000)
    speak(item.ko, { rate, voice: item.voice, onEnd: done })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speak])

  const start = () => {
    // 快速连点时 state 还没更新，按钮还在，防止启动两条播放链
    if (runningRef.current) return
    runningRef.current = true
    setRunning(true)
    setFinished(false)
    setSessionSec(0)
    playNext()
  }

  const stopAll = useCallback(() => {
    runningRef.current = false
    tokenRef.current += 1
    clearTimeout(gapTimerRef.current)
    clearTimeout(watchRef.current)
    stop?.()
    setRunning(false)
    save(STATS_KEY, statsRef.current)
  }, [stop])

  // 计时：播放期间每秒累计到"今日时长"，到定时就自动停
  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => {
      setSessionSec((s) => s + 1)
      setStats((st) => {
        const ns = { ...st, sec: st.sec + 1 }
        if (ns.sec % 5 === 0) save(STATS_KEY, ns)
        return ns
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    const t = settings.timer
    if (running && t > 0 && sessionSec >= t * 60) {
      stopAll()
      setFinished(true)
    }
  }, [sessionSec, running, settings.timer, stopAll])

  useEffect(() => () => {
    runningRef.current = false
    tokenRef.current += 1
    clearTimeout(gapTimerRef.current)
    clearTimeout(watchRef.current)
  }, [])

  const set = (k) => (v) => setSettings((s) => ({ ...s, [k]: v }))

  const toggleStar = () => {
    if (!current) return
    setStars((list) => {
      const exists = list.some((x) => x.id === current.id)
      const next = exists
        ? list.filter((x) => x.id !== current.id)
        : [{ id: current.id, ko: current.ko, zh: current.zh, voice: current.voice, parentKo: current.parentKo }, ...list].slice(0, 80)
      save(STAR_KEY, next)
      return next
    })
  }
  const starred = current && stars.some((x) => x.id === current.id)

  const setGoal = (g) =>
    setStats((s) => {
      const ns = { ...s, goal: g }
      save(STATS_KEY, ns)
      return ns
    })

  const showKo = settings.peek !== 'off' || revealed
  const showZh = settings.peek === 'both' || revealed
  const goalPct = Math.min(100, Math.round((stats.sec / 60 / stats.goal) * 100))

  return (
    <div className="im">
      <div className="im-intro">
        <b>像婴儿一样，先"泡"在韩语里。</b>
        婴儿在能听懂之前，耳边是大量断断续续的片段：一个词、半句话、同一句话换着时候再来一遍。听多了，语感自己就长出来了。
        所以这里<b>不解释每一句的意思</b>——点"开始"，放着，做别的事，让耳朵自己去适应。听到耳熟的、想弄懂的，随手点个星标，之后再查。
      </div>

      <div className="im-stage">
        <div className={`im-orb ${running ? 'on' : ''}`}>
          <div className="im-orb-core" />
        </div>

        <div className="im-now">
          {!current && <span className="im-muted">点下面的按钮，开始磨耳朵</span>}
          {current && !showKo && <span className="im-muted">♪ ……</span>}
          {current && showKo && (
            <>
              <div className="im-now-ko">{current.ko}</div>
              {showZh && (
                <div className="im-now-zh">
                  {current.zh}
                  {current.type === 'chunk' && <span className="im-muted">　（碎片，出自：{current.parentKo}）</span>}
                </div>
              )}
            </>
          )}
        </div>

        <div className="im-main-actions">
          {!running ? (
            <button className="im-start" onClick={start}>
              ▶ 开始磨耳朵
            </button>
          ) : (
            <button className="im-start stop" onClick={stopAll}>
              ⏸ 暂停
            </button>
          )}
        </div>
        {running && current && (
          <div className="im-sub-actions">
            <button className="lr-btn" onClick={() => setRevealed((r) => !r)}>
              👁 偷看这一句
            </button>
            <button className={`lr-btn ${starred ? 'primary' : ''}`} onClick={toggleStar}>
              {starred ? '⭐ 已标记' : '☆ 想弄懂这句'}
            </button>
          </div>
        )}
        {finished && <div className="im-finished">🌱 这一轮 {settings.timer} 分钟听完了，休息一下，或者再来一轮。</div>}
      </div>

      <div className="im-stats">
        <div className="im-stats-row">
          <span>
            本轮 <b>{fmt(sessionSec)}</b>　· 本轮已听 <b>{heard}</b> 条
          </span>
          <span>
            今日累计 <b>{Math.floor(stats.sec / 60)}</b> 分钟　· <b>{stats.clips}</b> 条
          </span>
        </div>
        <div className="im-goal-bar">
          <div className="im-goal-fill" style={{ width: `${goalPct}%` }} />
        </div>
        <div className="im-goal-row">
          今日目标
          <div className="im-pills">
            {GOALS.map((g) => (
              <button key={g} className={`im-pill ${stats.goal === g ? 'on' : ''}`} onClick={() => setGoal(g)}>
                {g} 分钟
              </button>
            ))}
          </div>
          {goalPct >= 100 && <span className="im-ok">✅ 达成</span>}
        </div>
      </div>

      <div className="im-settings">
        <div className="im-set">
          <div className="im-set-label">听什么</div>
          <Pills options={SOURCES.map((s) => ({ v: s.id, t: s.title }))} value={settings.source} onChange={set('source')} />
        </div>
        <div className="im-set">
          <div className="im-set-label">碎片 / 整句比例</div>
          <Pills options={Object.entries(GRANULARITY).map(([v, o]) => ({ v, t: o.title }))} value={settings.gran} onChange={set('gran')} />
        </div>
        <div className="im-set">
          <div className="im-set-label">两条之间的间隔</div>
          <Pills options={Object.entries(GAPS).map(([v, o]) => ({ v, t: o.title }))} value={settings.gap} onChange={set('gap')} />
        </div>
        <div className="im-set">
          <div className="im-set-label">"回声"（碎片与整句隔几条再回来）</div>
          <Pills options={Object.entries(ECHO).map(([v, o]) => ({ v, t: o.title }))} value={settings.echo} onChange={set('echo')} />
        </div>
        <div className="im-set">
          <div className="im-set-label">语速</div>
          <Pills
            options={[
              { v: 0.85, t: '稍慢' },
              { v: 1, t: '原速' },
              { v: 1.15, t: '稍快' },
            ]}
            value={settings.rate}
            onChange={set('rate')}
          />
        </div>
        <div className="im-set">
          <div className="im-set-label">文字（想"纯听"就选不显示）</div>
          <Pills
            options={[
              { v: 'off', t: '不显示' },
              { v: 'ko', t: '只显示韩文' },
              { v: 'both', t: '韩文 + 中文' },
            ]}
            value={settings.peek}
            onChange={set('peek')}
          />
        </div>
        <div className="im-set">
          <div className="im-set-label">定时</div>
          <Pills options={TIMERS} value={settings.timer} onChange={set('timer')} />
        </div>
      </div>

      <div className="im-stars">
        <div className="im-stars-title">⭐ 想弄懂的（{stars.length}）</div>
        {stars.length === 0 ? (
          <div className="im-muted">听的时候遇到耳熟或好奇的，点"想弄懂这句"，会存在这里，之后再慢慢看意思。</div>
        ) : (
          <div className="im-star-list">
            {stars.map((s) => (
              <div key={s.id} className="im-star" onClick={() => speak(s.ko, { voice: s.voice, rate: slow ? 0.7 : 1 })}>
                <div className="im-star-ko">
                  {s.ko} <span className="gr-example-play">🔊</span>
                </div>
                <div className="im-star-zh">
                  {s.zh}
                  {s.parentKo && <span className="im-muted">　（碎片，出自：{s.parentKo}）</span>}
                </div>
                <button
                  className="im-star-del"
                  aria-label="移除"
                  onClick={(e) => {
                    e.stopPropagation()
                    setStars((list) => {
                      const next = list.filter((x) => x.id !== s.id)
                      save(STAR_KEY, next)
                      return next
                    })
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="drama-notice">
        语料来自站内的对话、故事、课文、短句和单词，共 {corpus.length} 个音频单元（其中 {corpus.filter((i) => i.type === 'chunk').length} 个是从整句里截出来的碎片）。语音是机器合成。
      </p>
    </div>
  )
}

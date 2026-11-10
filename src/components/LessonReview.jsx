import { useEffect, useMemo, useState } from 'react'
import MemoryFlipCard from './MemoryFlipCard'

const STORE_KEY = 'korean-lesson-remembered-v1'

function loadAll() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveAll(v) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(v))
  } catch {
    // 隐私模式等情况下存不了，不影响使用
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const glossOf = (it) => it.gloss || it.zh
const audioOf = (it) => it.audio || it.ko

// ---------- 模式 1：翻卡 ----------
function FlipMode({ items, speak, slow, remembered, setMark }) {
  const [reverse, setReverse] = useState(false)
  const [onlyTodo, setOnlyTodo] = useState(false)
  const shown = onlyTodo ? items.filter((it) => !remembered.has(it.ko)) : items

  return (
    <>
      <div className="lr-options">
        <div className="lr-seg">
          <button className={!reverse ? 'on' : ''} onClick={() => setReverse(false)}>
            韩 → 中
          </button>
          <button className={reverse ? 'on' : ''} onClick={() => setReverse(true)}>
            中 → 韩
          </button>
        </div>
        <label className="lr-check">
          <input type="checkbox" checked={onlyTodo} onChange={(e) => setOnlyTodo(e.target.checked)} />
          只看还没记住的
        </label>
      </div>
      {shown.length === 0 ? (
        <div className="lr-done">🎉 这一课的卡片你都标成"记住了"啦！取消"只看还没记住的"可以再随便翻翻。</div>
      ) : (
        <div className="mflip-grid">
          {shown.map((item) => (
            <MemoryFlipCard
              key={item.ko + reverse}
              item={item}
              speak={speak}
              slow={slow}
              reverse={reverse}
              remembered={remembered.has(item.ko)}
              onMark={(val) => setMark(item.ko, val)}
            />
          ))}
        </div>
      )}
    </>
  )
}

// ---------- 模式 2：听音揭晓 ----------
function ListenMode({ items, speak, slow, setMark }) {
  const [queue, setQueue] = useState(() => shuffle(items))
  const [i, setI] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [stats, setStats] = useState({ ok: 0, again: 0 })
  const rate = slow ? 0.6 : 1
  const cur = queue[i]

  useEffect(() => {
    if (cur) speak(audioOf(cur), { rate })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, queue])

  const answer = (ok) => {
    setMark(cur.ko, ok)
    setStats((s) => ({ ok: s.ok + (ok ? 1 : 0), again: s.again + (ok ? 0 : 1) }))
    setRevealed(false)
    setI((n) => n + 1)
  }

  const restart = () => {
    setQueue(shuffle(items))
    setI(0)
    setRevealed(false)
    setStats({ ok: 0, again: 0 })
  }

  if (!cur) {
    return (
      <div className="lr-done">
        <div className="lr-done-big">🎧 听完一轮啦</div>
        <p>
          记住了 <b>{stats.ok}</b> 个，还要再听听 <b>{stats.again}</b> 个。
        </p>
        <button className="lr-btn primary" onClick={restart}>
          再来一轮
        </button>
      </div>
    )
  }

  return (
    <div className="lr-listen">
      <div className="lr-progress-text">
        第 {i + 1} / {queue.length} 个
      </div>
      <button className="lr-bigplay" onClick={() => speak(audioOf(cur), { rate })} aria-label="再听一次">
        🔊
      </button>
      <div className="lr-listen-hint">先听，心里想想是什么意思，再点"揭晓"</div>
      {revealed ? (
        <div className="lr-reveal">
          <div className="lr-reveal-ko">{cur.ko}</div>
          <div className="lr-reveal-ro">{cur.ro}</div>
          <div className="lr-reveal-zh">{glossOf(cur)}</div>
          <div className="lr-reveal-actions">
            <button className="lr-btn primary" onClick={() => answer(true)}>
              ✅ 记住了
            </button>
            <button className="lr-btn" onClick={() => answer(false)}>
              🔁 还没记住
            </button>
          </div>
        </div>
      ) : (
        <button className="lr-btn primary" onClick={() => setRevealed(true)}>
          👁 揭晓答案
        </button>
      )}
    </div>
  )
}

// ---------- 模式 3：配对 ----------
function MatchMode({ items, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const makeRound = () => {
    const picked = shuffle(items).slice(0, Math.min(6, items.length))
    return { left: picked, right: shuffle(picked) }
  }
  const [round, setRound] = useState(makeRound)
  const [pickedLeft, setPickedLeft] = useState(null)
  const [matched, setMatched] = useState([])
  const [wrong, setWrong] = useState(null)
  const [moves, setMoves] = useState(0)
  const done = matched.length === round.left.length

  const newRound = () => {
    setRound(makeRound())
    setPickedLeft(null)
    setMatched([])
    setWrong(null)
    setMoves(0)
  }

  const clickLeft = (it) => {
    if (matched.includes(it.ko)) return
    setPickedLeft(it)
    speak(audioOf(it), { rate })
  }

  const clickRight = (it) => {
    if (matched.includes(it.ko) || !pickedLeft) return
    setMoves((m) => m + 1)
    if (pickedLeft.ko === it.ko) {
      setMatched((m) => [...m, it.ko])
    } else {
      setWrong(it.ko)
      setTimeout(() => setWrong(null), 400)
    }
    setPickedLeft(null)
  }

  return (
    <div className="lr-match">
      <p className="lr-listen-hint">先点左边的韩语（会读出来），再点右边对应的意思</p>
      <div className="lr-match-cols">
        <div className="lr-match-col">
          {round.left.map((it) => (
            <button
              key={it.ko}
              className={`lr-match-item ko ${matched.includes(it.ko) ? 'matched' : ''} ${pickedLeft?.ko === it.ko ? 'picked' : ''}`}
              onClick={() => clickLeft(it)}
              disabled={matched.includes(it.ko)}
            >
              {it.ko}
            </button>
          ))}
        </div>
        <div className="lr-match-col">
          {round.right.map((it) => (
            <button
              key={it.ko}
              className={`lr-match-item ${matched.includes(it.ko) ? 'matched' : ''} ${wrong === it.ko ? 'shake' : ''}`}
              onClick={() => clickRight(it)}
              disabled={matched.includes(it.ko)}
            >
              {glossOf(it)}
            </button>
          ))}
        </div>
      </div>
      {done && (
        <div className="lr-done">
          <div className="lr-done-big">✨ 全部配对成功</div>
          <p>用了 {moves} 次尝试</p>
        </div>
      )}
      <button className="lr-btn" onClick={newRound}>
        🔀 换一组
      </button>
    </div>
  )
}

// ---------- 模式 4：对话演练（你扮演其中一个角色） ----------
function RoleplayMode({ dialogues, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const [di, setDi] = useState(0)
  const [role, setRole] = useState('B')
  const [step, setStep] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const d = dialogues[di]
  const line = d.lines[step]
  const mine = line && line.speaker === role
  const voiceFor = (s) => (s === 'A' ? 'F' : 'M')

  useEffect(() => {
    if (line && !mine) speak(line.ko, { rate, voice: voiceFor(line.speaker) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [di, role, step])

  const reset = (nextDi = di, nextRole = role) => {
    setDi(nextDi)
    setRole(nextRole)
    setStep(0)
    setRevealed(false)
  }

  const next = () => {
    setStep((s) => s + 1)
    setRevealed(false)
  }

  const reveal = () => {
    setRevealed(true)
    speak(line.ko, { rate, voice: voiceFor(line.speaker) })
  }

  const bubble = (l, key) => (
    <div key={key} className={`dialogue-line spk-${l.speaker}`}>
      <div className="dialogue-avatar" aria-hidden="true">
        {l.speaker === 'A' ? '👩🏻' : '👨🏻'}
      </div>
      <div className="dialogue-bubble">
        <span className="dialogue-ko" onClick={() => speak(l.ko, { rate, voice: voiceFor(l.speaker) })}>
          {l.ko}
        </span>
        <div className="dialogue-trans">
          <div className="dialogue-ro">{l.ro}</div>
          <div className="dialogue-zh">{l.zh}</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="lr-role">
      <div className="lr-options">
        <div className="lr-seg">
          {dialogues.map((dd, idx) => (
            <button key={dd.id} className={idx === di ? 'on' : ''} onClick={() => reset(idx, role)}>
              {dd.title}
            </button>
          ))}
        </div>
        <div className="lr-seg">
          <button className={role === 'A' ? 'on' : ''} onClick={() => reset(di, 'A')}>
            我演 👩🏻 A
          </button>
          <button className={role === 'B' ? 'on' : ''} onClick={() => reset(di, 'B')}>
            我演 👨🏻 B
          </button>
        </div>
      </div>
      <p className="lr-listen-hint">
        情景：{d.situation}。对方的台词会自动播放，轮到你时先自己开口说，再点"揭晓"对答案。
      </p>

      <div className="lr-stage">
        {d.lines.slice(0, step).map((l, idx) => bubble(l, idx))}

        {line && !mine && (
          <>
            {bubble(line, 'cur')}
            <button className="lr-btn primary" onClick={next}>
              下一句 →
            </button>
          </>
        )}

        {line && mine && (
          <div className="lr-your-turn">
            <div className="lr-your-label">🎤 轮到你说</div>
            <div className="lr-your-zh">{line.zh}</div>
            {revealed ? (
              <>
                {bubble(line, 'mine')}
                <button className="lr-btn primary" onClick={next}>
                  下一句 →
                </button>
              </>
            ) : (
              <button className="lr-btn primary" onClick={reveal}>
                👁 说完了，揭晓并听标准发音
              </button>
            )}
          </div>
        )}

        {!line && (
          <div className="lr-done">
            <div className="lr-done-big">🎭 这段对话演完了</div>
            <div className="lr-reveal-actions">
              <button className="lr-btn primary" onClick={() => reset()}>
                再演一遍
              </button>
              <button className="lr-btn" onClick={() => reset(di, role === 'A' ? 'B' : 'A')}>
                换个角色再演
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- 总入口 ----------
const MODES = [
  { id: 'flip', label: '🃏 翻卡' },
  { id: 'listen', label: '🎧 听音揭晓' },
  { id: 'match', label: '🔗 配对' },
  { id: 'role', label: '🎭 对话演练' },
]

export default function LessonReview({ lessonId, items, dialogues, speak, slow }) {
  const [mode, setMode] = useState('flip')
  const [remembered, setRemembered] = useState(() => new Set(loadAll()[lessonId] || []))

  const setMark = (ko, val) => {
    setRemembered((prev) => {
      const next = new Set(prev)
      if (val) next.add(ko)
      else next.delete(ko)
      const all = loadAll()
      all[lessonId] = [...next]
      saveAll(all)
      return next
    })
  }

  const clearAll = () => {
    setRemembered(new Set())
    const all = loadAll()
    delete all[lessonId]
    saveAll(all)
  }

  const count = useMemo(() => items.filter((it) => remembered.has(it.ko)).length, [items, remembered])
  const pct = Math.round((count / items.length) * 100)

  return (
    <div className="lr">
      <div className="lr-progress">
        <div className="lr-progress-bar">
          <div className="lr-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="lr-progress-label">
          已记住 {count} / {items.length}
          {count > 0 && (
            <button className="lr-link" onClick={clearAll}>
              清空
            </button>
          )}
        </div>
      </div>

      <div className="lr-modes">
        {MODES.map((m) => (
          <button key={m.id} className={`lr-mode ${mode === m.id ? 'on' : ''}`} onClick={() => setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'flip' && <FlipMode items={items} speak={speak} slow={slow} remembered={remembered} setMark={setMark} />}
      {mode === 'listen' && <ListenMode items={items} speak={speak} slow={slow} setMark={setMark} />}
      {mode === 'match' && <MatchMode items={items} speak={speak} slow={slow} />}
      {mode === 'role' && <RoleplayMode dialogues={dialogues} speak={speak} slow={slow} />}
    </div>
  )
}

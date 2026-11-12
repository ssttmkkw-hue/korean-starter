import { useCallback, useEffect, useRef, useState } from 'react'
import { speakScenarios, speakIntro } from '../data/speakScenarios'
import { askTutor, similarity, diffSyllables } from '../utils/koreanAi'
import { useKoreanASR } from '../useKoreanASR'
import { AI_VOICE_ENABLED } from '../config'

const SETTINGS_KEY = 'korean-speak-settings-v1'

function loadSettings() {
  try {
    return { autoSend: true, autoPlay: true, showZh: false, ...JSON.parse(localStorage.getItem(SETTINGS_KEY)) }
  } catch {
    return { autoSend: true, autoPlay: true, showZh: false }
  }
}

let msgId = 0
const nextId = () => ++msgId

const FIX_LABEL = { minor: '可以更自然', wrong: '这里有点问题' }

function scoreWord(score) {
  if (score >= 0.88) return { t: '很棒！几乎一样', c: 'good' }
  if (score >= 0.65) return { t: '接近了，再说一遍试试', c: 'mid' }
  return { t: '差别比较大，先听一遍再跟读', c: 'low' }
}

// 开关关闭时只渲染提示，不挂载下面的练习组件：不会创建语音识别、不会申请麦克风、不会请求 AI 代理
export default function SpeakPractice(props) {
  if (!AI_VOICE_ENABLED) {
    return (
      <div className="sp">
        <p className="drama-notice">🎤 语音练习暂时关闭（语音输入和 AI 口语陪练正在维护中），敬请期待。</p>
      </div>
    )
  }
  return <SpeakPracticeLive {...props} />
}

function SpeakPracticeLive({ speak, stop, slow, active }) {
  const [scenarioId, setScenarioId] = useState(null)
  const [messages, setMessages] = useState([])
  const [hints, setHints] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [settings, setSettings] = useState(loadSettings)
  const [shadow, setShadow] = useState(null) // { target, heard, score, parts }
  const [revealed, setRevealed] = useState({}) // id -> true
  const asr = useKoreanASR()

  const scenario = speakScenarios.find((s) => s.id === scenarioId)
  const rate = slow ? 0.7 : 1

  const settingsRef = useRef(settings)
  const messagesRef = useRef(messages)
  const scenarioRef = useRef(scenario)
  const busyRef = useRef(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)
  settingsRef.current = settings
  messagesRef.current = messages
  scenarioRef.current = scenario

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    } catch {
      // 存不了不影响使用
    }
  }, [settings])

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages, busy])

  useEffect(() => {
    if (!active) {
      asr.cancel()
      stop?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  const playAi = useCallback(
    (ko) => {
      asr.cancel()
      speak(ko, { rate, voice: 'F' })
    },
    [asr, speak, rate],
  )

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }))

  const startScenario = (sc) => {
    asr.cancel()
    setScenarioId(sc.id)
    setMessages([{ id: nextId(), role: 'ai', ko: sc.opening.ko, zh: sc.opening.zh }])
    setHints(sc.starters)
    setInput('')
    setError('')
    setShadow(null)
    setRevealed({})
    if (settingsRef.current.autoPlay) speak(sc.opening.ko, { rate, voice: 'F' })
  }

  const backToList = () => {
    asr.cancel()
    stop?.()
    setScenarioId(null)
  }

  const send = useCallback(
    async (rawText) => {
      const text = String(rawText ?? '').trim()
      const sc = scenarioRef.current
      if (!text || !sc || busyRef.current) return
      busyRef.current = true
      setBusy(true)
      setError('')
      setShadow(null)
      setInput('')
      const history = messagesRef.current.map((m) => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.ko,
      }))
      const userMsg = { id: nextId(), role: 'user', ko: text }
      setMessages((ms) => [...ms, userMsg])
      try {
        const out = await askTutor(sc, history, text)
        setMessages((ms) => [
          ...ms.map((m) => (m.id === userMsg.id ? { ...m, fix: out.fix } : m)),
          { id: nextId(), role: 'ai', ko: out.ko, zh: out.zh },
        ])
        setHints(out.hints)
        if (settingsRef.current.autoPlay) speak(out.ko, { rate, voice: 'F' })
      } catch (e) {
        setError(e.message || 'AI 没有响应')
        setInput(text)
        setMessages((ms) => ms.filter((m) => m.id !== userMsg.id))
      } finally {
        busyRef.current = false
        setBusy(false)
      }
    },
    [speak, rate],
  )

  const toggleMic = () => {
    if (asr.listening) {
      asr.stop()
      return
    }
    stop?.()
    setShadow(null)
    setError('')
    asr.start((text) => {
      if (settingsRef.current.autoSend) send(text)
      else {
        setInput(text)
        inputRef.current?.focus()
      }
    })
  }

  // 跟读：听完目标句后，用麦克风说一遍，对比识别结果和目标句
  const startShadow = (target) => {
    stop?.()
    setError('')
    setShadow({ target, listening: true })
    asr.start((heard) => {
      const score = similarity(heard, target)
      setShadow({ target, heard, score, parts: diffSyllables(heard, target) })
    })
  }

  const listenThenShadow = (target) => {
    asr.cancel()
    setShadow({ target, waiting: true })
    speak(target, {
      rate,
      voice: 'F',
      onEnd: () => startShadow(target),
    })
  }

  const asrError = asr.error

  // ---------- 场景选择 ----------
  if (!scenario) {
    return (
      <div className="sp">
        <p className="sp-intro">{speakIntro}</p>
        {!asr.supported && (
          <p className="drama-notice">
            当前浏览器不支持语音识别，建议用 Edge 或 Chrome 打开。不支持时仍然可以打字和 AI 对话。
          </p>
        )}
        <div className="sp-scenarios">
          {speakScenarios.map((s) => (
            <button key={s.id} className="sp-scenario" onClick={() => startScenario(s)}>
              <span className="sp-scenario-icon">{s.icon}</span>
              <span className="sp-scenario-title">{s.title}</span>
              <span className="sp-scenario-ko">{s.ko}</span>
              <span className="sp-scenario-desc">{s.situation}</span>
            </button>
          ))}
        </div>
        <p className="sp-foot">
          提示：AI 新说出的句子用浏览器自带的语音朗读（Edge 浏览器的韩语朗读最自然）；
          你说的话只用于识别，不会保存。对话由 AI 生成，偶尔会出错，仅供口语练习。
        </p>
      </div>
    )
  }

  // ---------- 对话 ----------
  const lastAi = [...messages].reverse().find((m) => m.role === 'ai')

  return (
    <div className="sp">
      <div className="sp-bar">
        <button className="lr-btn" onClick={backToList}>
          ← 换场景
        </button>
        <div className="sp-bar-title">
          <span>{scenario.icon}</span> {scenario.title} · {scenario.ko}
          <span className="sp-bar-role">AI 扮演：{scenario.role}</span>
        </div>
        <button className="lr-btn" onClick={() => startScenario(scenario)}>
          重新开始
        </button>
      </div>

      <div className="sp-layout">
        <div className="sp-chat">
          <div className="sp-list" ref={listRef}>
            {messages.map((m) => (
              <div key={m.id} className={`sp-msg ${m.role}`}>
                <div className="sp-bubble">
                  <div className="sp-bubble-ko">{m.ko}</div>
                  {m.role === 'ai' && (
                    <>
                      <div className="sp-bubble-tools">
                        <button className="gr-example-play" onClick={() => playAi(m.ko)} title="再听一遍">
                          🔊
                        </button>
                        <button className="sp-mini" onClick={() => listenThenShadow(m.ko)}>
                          🎤 跟读这句
                        </button>
                        {!settings.showZh && (
                          <button
                            className="sp-mini"
                            onClick={() => setRevealed((r) => ({ ...r, [m.id]: !r[m.id] }))}
                          >
                            {revealed[m.id] ? '隐藏中文' : '看中文'}
                          </button>
                        )}
                      </div>
                      {(settings.showZh || revealed[m.id]) && <div className="sp-bubble-zh">{m.zh}</div>}
                    </>
                  )}
                </div>
                {m.role === 'user' && m.fix && m.fix.status !== 'ok' && (
                  <div className={`sp-fix ${m.fix.status}`}>
                    <div className="sp-fix-head">💡 {FIX_LABEL[m.fix.status]}</div>
                    {m.fix.better && (
                      <div className="sp-fix-better" onClick={() => playAi(m.fix.better)} title="点击听">
                        {m.fix.better} 🔊
                      </div>
                    )}
                    {m.fix.note && <div className="sp-fix-note">{m.fix.note}</div>}
                  </div>
                )}
                {m.role === 'user' && m.fix && m.fix.status === 'ok' && <div className="sp-ok">✓ 说得很自然</div>}
              </div>
            ))}
            {busy && (
              <div className="sp-msg ai">
                <div className="sp-bubble sp-thinking">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          {(error || asrError) && (
            <div className="sp-error">
              {error || asrError}
              {error && !busy && (
                <button className="sp-mini" onClick={() => send(input)}>
                  重试
                </button>
              )}
            </div>
          )}

          <div className="sp-input">
            <button
              className={`sp-mic ${asr.listening ? 'on' : ''}`}
              onClick={toggleMic}
              disabled={!asr.supported || busy}
              title={asr.supported ? '点击开始说话，再点一下结束' : '当前浏览器不支持语音识别'}
            >
              {asr.listening ? '■ 说完了' : '🎤 说韩语'}
            </button>
            <div className="sp-input-main">
              <input
                ref={inputRef}
                className="sp-text"
                value={asr.listening && asr.interim ? asr.interim : input}
                placeholder={asr.listening ? '正在听……请说韩语' : '识别结果会显示在这里，也可以直接打韩文'}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing) send(input)
                }}
                readOnly={asr.listening}
                lang="ko"
              />
              <button className="sp-send" disabled={busy || !input.trim()} onClick={() => send(input)}>
                发送
              </button>
            </div>
          </div>
        </div>

        <aside className="sp-side">
          {shadow && (
            <div className="sp-shadow">
              <div className="sp-side-title">🎯 跟读</div>
              <div className="sp-shadow-target">
                {shadow.parts
                  ? shadow.parts.map((p, i) => (
                      <span key={i} className={p.ok === null ? '' : p.ok ? 'hit' : 'miss'}>
                        {p.ch}
                      </span>
                    ))
                  : shadow.target}
              </div>
              {shadow.waiting && <div className="sp-muted">先听一遍……</div>}
              {shadow.listening && !asr.listening && !shadow.parts && (
                <div className="sp-muted">{asrError ? '没有录到声音，点"再来一遍"重试。' : '准备麦克风……'}</div>
              )}
              {asr.listening && shadow.target && !shadow.parts && (
                <div className="sp-shadow-live">🎤 请跟着说：{asr.interim || '……'}</div>
              )}
              {shadow.parts && (
                <>
                  <div className="sp-shadow-heard">
                    识别到：<b>{shadow.heard}</b>
                  </div>
                  <div className={`sp-shadow-score ${scoreWord(shadow.score).c}`}>
                    {Math.round(shadow.score * 100)} 分 · {scoreWord(shadow.score).t}
                  </div>
                  <div className="sp-muted">绿色＝识别对了，红色＝没识别出来或识别成了别的。语音识别本身有误差，仅供参考。</div>
                </>
              )}
              <div className="sp-shadow-actions">
                <button className="sp-mini" onClick={() => listenThenShadow(shadow.target)}>
                  🔁 再来一遍
                </button>
                <button className="sp-mini" onClick={() => setShadow(null)}>
                  关闭
                </button>
              </div>
            </div>
          )}

          <div className="sp-hints">
            <div className="sp-side-title">💭 参考说法（你可以这样回答）</div>
            {hints.length === 0 && <div className="sp-muted">AI 回复后这里会给出 3 句可说的话。</div>}
            {hints.map((h, i) => (
              <div key={i} className="sp-hint">
                <div className="sp-hint-ko">{h.ko}</div>
                <div className="sp-hint-zh">{h.zh}</div>
                <div className="sp-hint-actions">
                  <button className="gr-example-play" onClick={() => playAi(h.ko)} title="听">
                    🔊
                  </button>
                  <button className="sp-mini" onClick={() => listenThenShadow(h.ko)}>
                    🎤 跟读
                  </button>
                  <button className="sp-mini" onClick={() => send(h.ko)} disabled={busy}>
                    直接发送
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sp-settings">
            <label>
              <input type="checkbox" checked={settings.autoSend} onChange={() => toggle('autoSend')} />
              说完自动发送
            </label>
            <label>
              <input type="checkbox" checked={settings.autoPlay} onChange={() => toggle('autoPlay')} />
              自动朗读 AI 回复
            </label>
            <label>
              <input type="checkbox" checked={settings.showZh} onChange={() => toggle('showZh')} />
              始终显示中文翻译
            </label>
          </div>
          {lastAi && !settings.autoPlay && (
            <button className="sp-mini wide" onClick={() => playAi(lastAi.ko)}>
              🔊 听最新一句
            </button>
          )}
        </aside>
      </div>
    </div>
  )
}

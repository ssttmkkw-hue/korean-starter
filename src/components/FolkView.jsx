import { useEffect, useRef, useState } from 'react'
import { folkNotice } from '../data/folk'

function QA({ q, speak, rate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="folk-qa">
      <div className="folk-q" onClick={() => speak(q.ko, { rate })}>
        ❓ {q.ko}
        <span className="folk-q-sub">
          {q.ro}　{q.zh}
        </span>
      </div>
      {open ? (
        <div className="folk-a" onClick={() => speak(q.aKo, { rate })}>
          💡 {q.aKo}
          <span className="folk-q-sub">
            {q.aRo}　{q.aZh}
          </span>
        </div>
      ) : (
        <button
          className="lr-btn"
          onClick={() => {
            setOpen(true)
            speak(q.aKo, { rate })
          }}
        >
          👁 先自己想想，再看答案
        </button>
      )}
    </div>
  )
}

// 一个故事 / 一段经典文本：简介 → 逐句阅读（可整段播放）→ 单词 → 语言点 → 读后小问答
export default function FolkView({ item, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const [showRo, setShowRo] = useState(true)
  const [showZh, setShowZh] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(-1)
  const aliveRef = useRef(true)
  const playRef = useRef(false)

  useEffect(() => {
    aliveRef.current = true
    return () => {
      aliveRef.current = false
      playRef.current = false
    }
  }, [])

  const playAll = () => {
    playRef.current = true
    setPlaying(true)
    let i = 0
    const step = () => {
      if (!aliveRef.current) return
      if (!playRef.current || i >= item.lines.length) {
        playRef.current = false
        setPlaying(false)
        setCurrent(-1)
        return
      }
      const idx = i
      i += 1
      setCurrent(idx)
      const l = item.lines[idx]
      speak(l.ko, { rate, voice: l.voice, onEnd: () => setTimeout(step, 350) })
    }
    step()
  }

  const stopAll = () => {
    playRef.current = false
    setPlaying(false)
    setCurrent(-1)
  }

  return (
    <div className="drama">
      <div className="drama-head">
        <div className="drama-title">
          {item.title} <span className="drama-title-zh">{item.titleZh}</span>
        </div>
        <div className="drama-meta">{item.tag}</div>
        <span className="drama-conf title folk-badge">{item.badge}</span>
      </div>

      <div className="drama-blocks">
        <div className="lesson-block">
          <div className="lesson-block-head">📖 故事 / 背景</div>
          <p className="lesson-block-text">{item.intro}</p>
        </div>
        <div className="lesson-block">
          <div className="lesson-block-head">🇰🇷 文化小知识</div>
          <p className="lesson-block-text">{item.culture}</p>
        </div>
      </div>

      <div className="lesson-part-title">📜 逐句阅读</div>
      <div className="lr-options">
        {playing ? (
          <button className="lr-btn" onClick={stopAll}>
            ⏹ 停止
          </button>
        ) : (
          <button className="lr-btn primary" onClick={playAll}>
            ▶ 从头播放整段
          </button>
        )}
        <label className="lr-check">
          <input type="checkbox" checked={showRo} onChange={(e) => setShowRo(e.target.checked)} />
          显示罗马音
        </label>
        <label className="lr-check">
          <input type="checkbox" checked={showZh} onChange={(e) => setShowZh(e.target.checked)} />
          显示中文
        </label>
      </div>
      <div className="folk-lines">
        {item.lines.map((l, i) => (
          <div
            key={i}
            className={`folk-line ${l.who ? 'has-who' : ''} ${i === current ? 'is-current' : ''} v-${l.voice}`}
            onClick={() => speak(l.ko, { rate, voice: l.voice })}
          >
            {l.who && <div className="folk-who">{l.who}</div>}
            <div className="folk-ko">{l.ko}</div>
            {showRo && <div className="folk-ro">{l.ro}</div>}
            {showZh && <div className="folk-zh">{l.zh}</div>}
          </div>
        ))}
      </div>

      <div className="lesson-part-title">🔑 本文单词</div>
      <div className="lesson-words">
        {item.words.map((w, i) => (
          <button key={i} className="letter-word-chip" onClick={() => speak(w.ko.split(' / ')[0], { rate })}>
            <span className="letter-word-ko">{w.ko}</span>
            <span className="letter-word-ro">{w.ro}</span>
            <span className="letter-word-zh">{w.zh}</span>
          </button>
        ))}
      </div>

      <div className="lesson-part-title">📝 语言点讲解</div>
      <div className="drama-blocks">
        {item.points.map((p, i) => (
          <div key={i} className="lesson-block">
            <div className="lesson-block-head">{p.head}</div>
            <p className="lesson-block-text">{p.text}</p>
          </div>
        ))}
      </div>

      {item.questions.length > 0 && (
        <>
          <div className="lesson-part-title">💬 读后小问答（先想再点）</div>
          <div className="folk-qas">
            {item.questions.map((q, i) => (
              <QA key={i} q={q} speak={speak} rate={rate} />
            ))}
          </div>
        </>
      )}

      <p className="drama-notice">{folkNotice}</p>
    </div>
  )
}

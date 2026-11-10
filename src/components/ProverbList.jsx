import { useState } from 'react'
import { proverbIntro, proverbs } from '../data/folk'

function Card({ p, speak, rate, quiz }) {
  const [open, setOpen] = useState(false)
  const show = !quiz || open

  return (
    <div className="proverb">
      <div className="proverb-ko" onClick={() => speak(p.ko, { rate })}>
        {p.ko}
        <button
          className="drama-play"
          aria-label="播放"
          onClick={(e) => {
            e.stopPropagation()
            speak(p.ko, { rate })
          }}
        >
          🔊
        </button>
      </div>
      <div className="drama-ro">{p.ro}</div>

      {show ? (
        <>
          <div className="proverb-zh">{p.zh}</div>
          <div className="proverb-rows">
            <div>
              <b>字面：</b>
              {p.literal}
            </div>
            <div>
              <b>近似的中文：</b>
              {p.equiv}
            </div>
            <div>
              <b>什么时候用：</b>
              {p.use}
            </div>
          </div>
        </>
      ) : (
        <button className="lr-btn" onClick={() => setOpen(true)}>
          👁 先猜意思，再点看
        </button>
      )}

      <div className="lesson-words">
        {p.words.map((w, i) => (
          <button key={i} className="letter-word-chip" onClick={() => speak(w.ko, { rate })}>
            <span className="letter-word-ko">{w.ko}</span>
            <span className="letter-word-ro">{w.ro}</span>
            <span className="letter-word-zh">{w.zh}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ProverbList({ speak, slow }) {
  const rate = slow ? 0.6 : 1
  const [quiz, setQuiz] = useState(false)

  return (
    <div className="drama">
      <div className="drama-head">
        <div className="drama-title">
          속담 <span className="drama-title-zh">谚语 · {proverbs.length} 句</span>
        </div>
        <div className="drama-meta">{proverbIntro}</div>
      </div>
      <div className="lr-options">
        <label className="lr-check">
          <input type="checkbox" checked={quiz} onChange={(e) => setQuiz(e.target.checked)} />
          自测模式：先隐藏释义，点开再看
        </label>
      </div>
      <div className="proverb-grid">
        {proverbs.map((p) => (
          <Card key={p.ko + quiz} p={p} speak={speak} rate={rate} quiz={quiz} />
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'

// 紧凑卡片：点韩文朗读（多个词时可以单独点某个词朗读）；
// "答案"按钮点一下显示罗马音+中文意思，再点一下隐藏 —— 用来自测记忆
export default function FlipCard({ item, speak, slow }) {
  const [revealed, setRevealed] = useState(false)
  const words = item.display.split(' ')
  const rate = slow ? 0.6 : 1

  return (
    <div className="flip-card">
      <div className="flip-display" onClick={() => speak(item.audio, { rate })} title="点击朗读">
        {words.map((w, i) => (
          <span
            key={i}
            className="flip-word"
            onClick={(e) => {
              if (words.length > 1) {
                e.stopPropagation()
                speak(w, { rate })
              }
            }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </div>
      <button className="flip-toggle" onClick={() => setRevealed((r) => !r)}>
        {revealed ? '🙈 隐藏' : '👁 答案'}
      </button>
      {revealed && (
        <div className="flip-answer">
          <span className="flip-ro">{item.ro}</span>
          <span className="flip-meta">{item.meta}</span>
        </div>
      )}
    </div>
  )
}

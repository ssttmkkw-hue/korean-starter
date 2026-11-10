import { letterExtras } from '../data/letterExtras'

// 扩展版字母卡片：字母本体 + 高频例词 + 两句小对话，桌面版空间足够就多展示一些
export default function LetterPanel({ item, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const extra = letterExtras[item.letter]

  return (
    <div className="letter-panel">
      <div className="letter-panel-head" onClick={() => speak(item.demo, { rate })}>
        <div className="letter-panel-jamo">{item.letter}</div>
        <div className="letter-panel-meta">
          <div className="letter-panel-demo">
            读作 <strong>{item.demo}</strong>
          </div>
          <div className="letter-panel-ro">{item.ro}</div>
          {item.name && <div className="letter-panel-name">{item.name}</div>}
        </div>
      </div>

      {extra && (
        <>
          <div className="letter-panel-words">
            {extra.words.map((w, i) => (
              <button key={i} className="letter-word-chip" onClick={() => speak(w.ko, { rate })}>
                <span className="letter-word-ko">{w.ko}</span>
                <span className="letter-word-ro">{w.ro}</span>
                <span className="letter-word-zh">{w.zh}</span>
              </button>
            ))}
          </div>

          <div className="letter-panel-mini">
            {extra.mini.map((line, i) => (
              <div key={i} className={`letter-mini-line spk-${line.speaker}`}>
                <span className="letter-mini-dot" aria-hidden="true" />
                <span className="letter-mini-ko" onClick={() => speak(line.ko, { rate })}>
                  {line.ko}
                </span>
                <span className="letter-mini-zh">{line.zh}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

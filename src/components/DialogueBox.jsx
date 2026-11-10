import { useState } from 'react'
import { dialogueExtras } from '../data/dialogueExtras'

// 对话卡片：左侧气泡对话（A=女声，B=男声），右侧词汇/讲解/文化小知识side panel（桌面版，空间随便用）
export default function DialogueBox({ dialogue, speak, slow }) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [playing, setPlaying] = useState(false)
  const rate = slow ? 0.6 : 1
  const extra = dialogueExtras[dialogue.id]

  const voiceFor = (speaker) => (speaker === 'A' ? 'F' : 'M')

  const playAll = () => {
    setPlaying(true)
    let i = 0
    const step = () => {
      if (i >= dialogue.lines.length) {
        setPlaying(false)
        return
      }
      const line = dialogue.lines[i]
      i += 1
      speak(line.ko, { rate, voice: voiceFor(line.speaker), onEnd: () => setTimeout(step, 300) })
    }
    step()
  }

  return (
    <div className="dialogue-box">
      <div className="dialogue-head">
        <div>
          <div className="dialogue-title">{dialogue.title}</div>
          <div className="dialogue-situation">{dialogue.situation}</div>
        </div>
        <div className="dialogue-actions">
          <button className="dlg-btn" onClick={playAll} disabled={playing}>
            {playing ? '▶ 播放中…' : '▶ 播放对话'}
          </button>
          <button className="dlg-btn" onClick={() => setShowTranslation((s) => !s)}>
            {showTranslation ? '🙈 隐藏翻译' : '👁 显示翻译'}
          </button>
        </div>
      </div>

      <div className={`dialogue-body ${extra ? '' : 'solo'}`}>
        <div className="dialogue-lines">
          {dialogue.lines.map((line, i) => (
            <div key={i} className={`dialogue-line spk-${line.speaker}`}>
              <div className="dialogue-avatar" aria-hidden="true">
                {line.speaker === 'A' ? '👩🏻' : '👨🏻'}
              </div>
              <div className="dialogue-bubble">
                <span
                  className="dialogue-ko"
                  onClick={() => speak(line.ko, { rate, voice: voiceFor(line.speaker) })}
                >
                  {line.ko}
                </span>
                {showTranslation && (
                  <div className="dialogue-trans">
                    <div className="dialogue-ro">{line.ro}</div>
                    <div className="dialogue-zh">{line.zh}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {extra && (
          <div className="dialogue-side">
            {extra.vocab?.length > 0 && (
              <div className="dialogue-side-block">
                <div className="dialogue-side-heading">🔑 关键词汇</div>
                <div className="dialogue-vocab-list">
                  {extra.vocab.map((v, i) => (
                    <button
                      key={i}
                      className="dialogue-vocab-item"
                      onClick={() => speak(v.ko, { rate, voice: 'F' })}
                    >
                      <span className="dialogue-vocab-ko">{v.ko}</span>
                      <span className="dialogue-vocab-ro">{v.ro}</span>
                      <span className="dialogue-vocab-zh">{v.zh}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {extra.explanation && (
              <div className="dialogue-side-block">
                <div className="dialogue-side-heading">💡 新手讲解</div>
                <p className="dialogue-side-text">{extra.explanation}</p>
              </div>
            )}
            {extra.cultureNote && (
              <div className="dialogue-side-block">
                <div className="dialogue-side-heading">🇰🇷 韩国风味</div>
                <p className="dialogue-side-text">{extra.cultureNote}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'

// 3D 翻转卡片：reverse=false 正面韩文、背面罗马音+释义；reverse=true 正面释义、背面韩文+罗马音
// 底下可以标"记住了/再看看"，用来追踪复习进度
export default function MemoryFlipCard({ item, speak, slow, reverse = false, remembered = false, onMark }) {
  const [flipped, setFlipped] = useState(false)
  const rate = slow ? 0.6 : 1
  const gloss = item.gloss || item.zh
  const say = (e) => {
    e.stopPropagation()
    speak(item.audio || item.ko, { rate })
  }

  return (
    <div className={`mflip-wrap ${remembered ? 'is-remembered' : ''}`}>
      <div className={`mflip ${flipped ? 'is-flipped' : ''}`} onClick={() => setFlipped((f) => !f)}>
        <div className="mflip-inner">
          <div className="mflip-face mflip-front">
            {reverse ? (
              <div className="mflip-zh-front">{gloss}</div>
            ) : (
              <>
                <div className="mflip-ko">{item.ko}</div>
                <button className="mflip-speak" onClick={say} aria-label="播放发音">
                  🔊
                </button>
              </>
            )}
            <div className="mflip-tap">点击翻面</div>
          </div>
          <div className="mflip-face mflip-back">
            {reverse ? (
              <>
                <div className="mflip-back-ko">{item.ko}</div>
                <div className="mflip-ro">{item.ro}</div>
                <button className="mflip-speak on-back" onClick={say} aria-label="播放发音">
                  🔊
                </button>
              </>
            ) : (
              <>
                <div className="mflip-ro">{item.ro}</div>
                <div className="mflip-zh">{gloss}</div>
              </>
            )}
          </div>
        </div>
      </div>
      {onMark && (
        <div className="mflip-actions">
          <button className={`mflip-mark ${remembered ? 'on' : ''}`} onClick={() => onMark(true)}>
            ✅ 记住了
          </button>
          <button className={`mflip-mark ${!remembered ? '' : 'dim'}`} onClick={() => onMark(false)}>
            🔁 再看看
          </button>
        </div>
      )}
    </div>
  )
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { dialogueExtras } from '../data/dialogueExtras'

// 估算一句的最长播放时间（秒），作为 ended 事件丢失时的兜底；宁长勿短，避免打断正常播放
const watchdogSec = (ko, rate) => Math.min(30, (4 + ko.length * 0.5) / rate)

// 对话卡片：左侧气泡对话（A=女声，B=男声），右侧词汇/讲解/文化小知识side panel（桌面版，空间随便用）
export default function DialogueBox({ dialogue, speak, slow }) {
  const [showTranslation, setShowTranslation] = useState(false)
  const [playing, setPlaying] = useState(false)
  const rate = slow ? 0.6 : 1
  const extra = dialogueExtras[dialogue.id]

  // 每次"播放对话"拿一个令牌；令牌变了（被取消/重新播放/卸载）旧的回调全部作废
  const tokenRef = useRef(0)
  const gapTimerRef = useRef(null)
  const watchTimerRef = useRef(null)

  const clearTimers = () => {
    clearTimeout(gapTimerRef.current)
    clearTimeout(watchTimerRef.current)
  }

  const cancelPlayAll = useCallback(() => {
    tokenRef.current += 1
    clearTimeout(gapTimerRef.current)
    clearTimeout(watchTimerRef.current)
    setPlaying(false)
  }, [])

  // 切换台词（dialogue 变了）或组件卸载时，作废正在进行的连播并复位
  useEffect(() => cancelPlayAll, [dialogue.id, cancelPlayAll])

  const voiceFor = (speaker) => (speaker === 'A' ? 'F' : 'M')

  const playAll = () => {
    const my = ++tokenRef.current
    clearTimers()
    setPlaying(true)
    const lines = dialogue.lines
    let i = 0

    const finish = () => {
      if (tokenRef.current !== my) return
      clearTimers()
      setPlaying(false)
    }

    const step = () => {
      if (tokenRef.current !== my) return
      if (i >= lines.length) {
        finish()
        return
      }
      const line = lines[i]
      i += 1
      // 每句只推进一次：ended、浏览器朗读 onend、兜底计时器谁先到算谁
      let advanced = false
      const onEnd = () => {
        if (advanced || tokenRef.current !== my) return
        advanced = true
        clearTimeout(watchTimerRef.current)
        gapTimerRef.current = setTimeout(step, 300)
      }
      // 兜底：音频出错/被别处打断导致 ended 不触发时，不会一直卡在"播放中"
      watchTimerRef.current = setTimeout(onEnd, watchdogSec(line.ko, rate) * 1000)
      try {
        speak(line.ko, { rate, voice: voiceFor(line.speaker), onEnd })
      } catch {
        finish()
      }
    }
    step()
  }

  // 单独点一句/一个词时，先结束连播，否则连播的 ended 被打断后状态会卡住
  const speakOne = (ko, opts) => {
    if (playing) cancelPlayAll()
    speak(ko, opts)
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
                  onClick={() => speakOne(line.ko, { rate, voice: voiceFor(line.speaker) })}
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
                      onClick={() => speakOne(v.ko, { rate, voice: 'F' })}
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

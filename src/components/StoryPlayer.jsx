import { useEffect, useRef, useState } from 'react'
import { storyChapters } from '../data/story'

function NodeView({ node, speak, rate, chosenOption }) {
  if (node.type === 'narration' || node.type === 'end') {
    return <p className="story-narration">{node.text}</p>
  }
  if (node.type === 'dialogue') {
    return (
      <div className={`story-line spk-${node.voice}`}>
        <div className="story-avatar">{node.voice === 'F' ? '👩🏻' : '👨🏻'}</div>
        <div className="story-bubble">
          <div className="story-speaker">
            {node.speaker} <span className="story-speaker-zh">（{node.speakerZh}）</span>
          </div>
          <div className="story-ko" onClick={() => speak(node.ko, { rate, voice: node.voice })}>
            {node.ko}
          </div>
          <div className="story-ro">{node.ro}</div>
          <div className="story-zh">{node.zh}</div>
        </div>
      </div>
    )
  }
  if (node.type === 'choice-result' && chosenOption) {
    return (
      <div className="story-line spk-player">
        <div className="story-avatar">🧑🏻</div>
        <div className="story-bubble player">
          <div className="story-speaker">나（你）</div>
          <div className="story-ko" onClick={() => speak(chosenOption.ko, { rate, voice: 'F' })}>
            {chosenOption.ko}
          </div>
          <div className="story-ro">{chosenOption.ro}</div>
          <div className="story-zh">{chosenOption.zh}</div>
        </div>
      </div>
    )
  }
  return null
}

export default function StoryPlayer({ speak, slow }) {
  const chapter = storyChapters[0]
  const [currentId, setCurrentId] = useState(chapter.startNode)
  const [history, setHistory] = useState([])
  const endRef = useRef(null)
  const rate = slow ? 0.6 : 1
  const currentNode = chapter.nodes[currentId]

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [history, currentId])

  useEffect(() => {
    if (currentNode?.type === 'dialogue') {
      speak(currentNode.ko, { rate, voice: currentNode.voice })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId])

  const advance = () => {
    setHistory((h) => [...h, { id: currentId, node: currentNode }])
    setCurrentId(currentNode.next)
  }

  const choose = (opt) => {
    speak(opt.ko, { rate, voice: 'F' })
    setHistory((h) => [...h, { id: currentId, node: { type: 'choice-result' }, chosenOption: opt }])
    setCurrentId(opt.next)
  }

  const restart = () => {
    setHistory([])
    setCurrentId(chapter.startNode)
  }

  return (
    <div className="story-player">
      <div className="story-chapter-head">
        <div className="story-chapter-title">{chapter.title}</div>
        <div className="story-chapter-subtitle">{chapter.subtitle}</div>
      </div>

      <div className="story-log">
        {history.map((h, i) => (
          <NodeView key={i} node={h.node} speak={speak} rate={rate} chosenOption={h.chosenOption} />
        ))}
        {currentNode.type !== 'choice' && <NodeView node={currentNode} speak={speak} rate={rate} />}
        <div ref={endRef} />
      </div>

      <div className="story-actions">
        {(currentNode.type === 'narration' || currentNode.type === 'dialogue') && (
          <button className="dlg-btn story-continue" onClick={advance}>
            继续 →
          </button>
        )}

        {currentNode.type === 'choice' && (
          <div className="story-choice-box">
            <p className="story-prompt">{currentNode.prompt}</p>
            <div className="story-options">
              {currentNode.options.map((opt, i) => (
                <button key={i} className="story-option" onClick={() => choose(opt)}>
                  <span className="story-option-ko">{opt.ko}</span>
                  <span className="story-option-zh">{opt.zh}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentNode.type === 'end' && (
          <div className="story-end-box">
            <div className="story-end-banner">🌙 第 1 天 · 完</div>
            <p className="hint">第 2 天 · 语言学校开学第一天，敬请期待</p>
            <button className="dlg-btn" onClick={restart}>
              🔄 重新玩一遍第 1 天
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

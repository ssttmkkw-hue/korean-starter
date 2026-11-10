import { useState } from 'react'
import { pickParticle } from '../utils/hangulCompose'

// 句型代入练习：点单词卡片填入句型空格，实时拼出完整韩语句子并朗读——主动练习，不是被动看
export default function PatternDrill({ pattern, speak, slow }) {
  const [selected, setSelected] = useState(null)
  const rate = slow ? 0.6 : 1

  const wordPart = selected ? selected.ko + (pattern.wordSuffix || '') : null
  const particle = selected && pattern.particleType !== 'none' ? pickParticle(wordPart, pattern.particleType) : ''
  const fullSentence = selected ? `${pattern.prefix}${wordPart}${particle}${pattern.suffixLiteral || ''}` : null
  const fullZh = selected ? pattern.zhTemplate.replace('___', selected.zh) : null

  const pick = (opt) => {
    setSelected(opt)
    const w = opt.ko + (pattern.wordSuffix || '')
    const p = pattern.particleType !== 'none' ? pickParticle(w, pattern.particleType) : ''
    const sentence = `${pattern.prefix}${w}${p}${pattern.suffixLiteral || ''}`
    speak(sentence, { rate })
  }

  return (
    <div className="drill-card">
      <p className="drill-note">{pattern.note}</p>

      <div className="drill-sentence" onClick={() => fullSentence && speak(fullSentence, { rate })}>
        <span className="drill-fixed">{pattern.prefix}</span>
        <span className={`drill-blank ${selected ? 'filled' : ''}`}>{selected ? wordPart : '＿＿＿'}</span>
        <span className="drill-fixed">{particle}{pattern.suffixLiteral}</span>
      </div>
      <div className="drill-zh">{fullZh || '点下面的单词卡片，填进空格里试试'}</div>

      <div className="drill-bank">
        {pattern.options.map((opt, i) => (
          <button
            key={i}
            className={`drill-chip ${selected?.ko === opt.ko ? 'active' : ''}`}
            onClick={() => pick(opt)}
          >
            <span className="drill-chip-ko">{opt.ko}</span>
            <span className="drill-chip-zh">{opt.zh}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

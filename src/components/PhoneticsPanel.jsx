import { letterPhonetics } from '../data/letterPhonetics'

// 发音精讲卡片：口型/发音方法 + 与汉语拼音、日语假名、英语的对比 + 更大量的例词
export default function PhoneticsPanel({ item, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const p = letterPhonetics[item.letter]

  return (
    <div className="phon-panel">
      <div className="phon-head" onClick={() => speak(item.demo, { rate })}>
        <div className="phon-jamo">{item.letter}</div>
        <div className="phon-meta">
          <div className="phon-demo">
            读作 <strong>{item.demo}</strong>
          </div>
          <div className="phon-ro">{item.ro}</div>
        </div>
      </div>

      {p && (
        <>
          <div className="phon-block">
            <div className="phon-label">🗣 发音方法 · 口型</div>
            <p className="phon-text">{p.articulation}</p>
          </div>
          <div className="phon-compare">
            <div className="phon-compare-item">
              <div className="phon-label">🇨🇳 对比汉语拼音</div>
              <p className="phon-text">{p.vsChinese}</p>
            </div>
            <div className="phon-compare-item">
              <div className="phon-label">🇯🇵 对比日语假名</div>
              <p className="phon-text">{p.vsJapanese}</p>
            </div>
            <div className="phon-compare-item">
              <div className="phon-label">🇬🇧 对比英语发音</div>
              <p className="phon-text">{p.vsEnglish}</p>
            </div>
          </div>

          <div className="phon-label phon-words-label">📚 常用例词（{p.words.length}个）</div>
          <div className="phon-words">
            {p.words.map((w, i) => (
              <button key={i} className="letter-word-chip" onClick={() => speak(w.ko, { rate })}>
                <span className="letter-word-ko">{w.ko}</span>
                <span className="letter-word-ro">{w.ro}</span>
                <span className="letter-word-zh">{w.zh}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

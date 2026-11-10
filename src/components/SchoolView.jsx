import { useState } from 'react'
import DialogueBox from './DialogueBox'
import SchoolExercises from './SchoolExercises'
import { schoolJa } from '../data/schoolJa'

// 日语对照：用日语来理解这个语法点——一句话对应、两组日韩对照、一条"一样"和一条"不一样"
function JaBox({ ja, speak, rate }) {
  return (
    <div className="ja-box">
      <div className="ja-head">🇯🇵 用日语来理解</div>
      <div className="ja-key">{ja.key}</div>
      <div className="ja-pairs">
        {ja.pairs.map((p, i) => (
          <div key={i} className="ja-pair" onClick={() => speak(p.ko, { rate })}>
            <div className="ja-pair-ja">{p.ja}</div>
            <div className="ja-pair-ko">
              {p.ko} <span className="gr-example-play">🔊</span>
            </div>
            <div className="ja-pair-zh">{p.zh}</div>
          </div>
        ))}
      </div>
      <div className="ja-line same">
        <b>✅ 一样：</b>
        {ja.same}
      </div>
      <div className="ja-line diff">
        <b>⚠️ 不一样：</b>
        {ja.diff}
      </div>
      {ja.extra && (
        <div className="ja-line extra">
          <b>💡 补充：</b>
          {ja.extra}
        </div>
      )}
    </div>
  )
}

function GrammarCard({ g, index, ja, simple, speak, rate }) {
  return (
    <div className="gr-card">
      <div className="gr-head">
        <span className="gr-no">文法 {index + 1}</span>
        <span className="gr-title">{g.title}</span>
      </div>
      <div className="gr-pattern">📐 {g.pattern}</div>
      <p className="gr-summary">{g.summary}</p>

      {ja && <JaBox ja={ja} speak={speak} rate={rate} />}

      {!simple && (
        <>
          <div className="gr-sub">① 形式与规则</div>
          <div className="gr-form">
            {g.form.map((f, i) => (
              <div key={i} className="gr-form-row">
                <div className="gr-form-label">{f.label}</div>
                <div className="gr-form-text">{f.text}</div>
              </div>
            ))}
          </div>

          <div className="gr-sub">② 用法要点</div>
          <ul className="gr-list">
            {g.usage.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>

          {g.compare && (
            <div className="gr-compare">
              <div className="gr-compare-title">⚖️ {g.compare.title}</div>
              <div className="gr-compare-text">{g.compare.text}</div>
            </div>
          )}
        </>
      )}

      <div className="gr-sub">{simple ? '例句（点击听发音）' : '③ 例句（点击听发音）'}</div>
      <div className="gr-examples">
        {g.examples.map((e, i) => (
          <div key={i} className="gr-example" onClick={() => speak(e.ko, { rate })}>
            <div className="gr-example-ko">
              {e.ko} <span className="gr-example-play">🔊</span>
            </div>
            <div className="gr-example-ro">{e.ro}</div>
            <div className="gr-example-zh">{e.zh}</div>
          </div>
        ))}
      </div>

      {!simple && (
        <>
          <div className="gr-sub">④ 常见错误</div>
          <div className="gr-mistakes">
            {g.mistakes.map((m, i) => (
              <div key={i} className="gr-mistake">
                <div className="gr-wrong">✗ {m.wrong}</div>
                <div className="gr-right">✓ {m.right}</div>
                <div className="gr-why">{m.why}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// 一课：学习目标 → 语法（日语对照）→ 单词 → 会话 → 练习 → 小结
export default function SchoolView({ lesson, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const jaList = schoolJa[lesson.id] || []
  const [simple, setSimple] = useState(true)

  return (
    <div className="school">
      <div className="school-head">
        <div className="school-no">제 {lesson.no} 과</div>
        <div className="school-title">
          {lesson.title} <span className="drama-title-zh">{lesson.titleZh}</span>
        </div>
        <p className="school-intro">{lesson.intro}</p>
      </div>

      <div className="lesson-part-title">🎯 学习目标</div>
      <ul className="gr-list goals">
        {lesson.goals.map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </ul>

      <div className="lesson-part-title">📐 本课核心句型</div>
      <div className="school-patterns">
        {lesson.grammar.map((g, i) => (
          <div key={i} className="school-pattern">
            <span className="gr-no">{i + 1}</span>
            {g.pattern}
          </div>
        ))}
      </div>

      <div className="lesson-part-title">📘 语法讲解</div>
      <label className="ja-switch">
        <input type="checkbox" checked={simple} onChange={(e) => setSimple(e.target.checked)} />
        🇯🇵 日语简明模式：只看"日语对照 + 例句"（取消勾选可展开形式规则、用法、常见错误等详细讲解）
      </label>
      <div className="gr-cards">
        {lesson.grammar.map((g, i) => (
          <GrammarCard key={i} g={g} index={i} ja={jaList[i]} simple={simple} speak={speak} rate={rate} />
        ))}
      </div>

      <div className="lesson-part-title">🔤 单词（{lesson.vocab.length}个，点击听发音）</div>
      <div className="lesson-words">
        {lesson.vocab.map((w, i) => (
          <button key={i} className="letter-word-chip" onClick={() => speak(w.ko, { rate })}>
            <span className="letter-word-ko">{w.ko}</span>
            <span className="letter-word-ro">{w.ro}</span>
            <span className="letter-word-zh">{w.zh}</span>
          </button>
        ))}
      </div>

      <div className="lesson-part-title">💬 会话</div>
      <p className="lesson-part-hint">点韩文单句重听，"播放对话"整段听，"显示翻译"看罗马音和中文；A 是女声，B 是男声。</p>
      <div className="lesson-dialogues">
        {lesson.dialogues.map((d) => (
          <DialogueBox key={d.id} dialogue={d} speak={speak} slow={slow} />
        ))}
      </div>

      <div className="lesson-part-title">✏️ 练习</div>
      <SchoolExercises exercises={lesson.exercises} speak={speak} slow={slow} />

      <div className="lesson-part-title">📝 本课小结</div>
      <ul className="gr-list summary">
        {lesson.summary.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  )
}

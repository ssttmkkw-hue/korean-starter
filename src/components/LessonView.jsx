import DialogueBox from './DialogueBox'
import LessonReview from './LessonReview'

// 单节入门课，四个部分：① 先了解 ② 单词 ③ 小对话 ④ 复习
export default function LessonView({ lesson, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const reviewItems = [...lesson.teach, ...lesson.words]

  return (
    <div className="lesson-card">
      <div className="lesson-tagline">{lesson.tagline}</div>

      <div className="lesson-part-title">① 先了解一下</div>
      <p className="lesson-why">{lesson.why}</p>
      <div className="lesson-blocks">
        {lesson.blocks.map((b, i) => (
          <div key={i} className="lesson-block">
            <div className="lesson-block-head">
              <span className="lesson-block-icon">{b.icon}</span>
              {b.heading}
            </div>
            <p className="lesson-block-text">{b.text}</p>
          </div>
        ))}
      </div>

      <div className="lesson-part-title">② 本课单词</div>
      <div className="lesson-teach-label">📖 主角（点击听发音）</div>
      <div className="lesson-teach-list">
        {lesson.teach.map((item, i) => (
          <div key={i} className="lesson-teach-item" onClick={() => speak(item.audio || item.ko, { rate })}>
            <div className="lesson-teach-ko">{item.ko}</div>
            <div className="lesson-teach-mid">
              <span className="lesson-teach-ro">{item.ro}</span>
              <span className="lesson-teach-zh">{item.zh}</span>
            </div>
            <div className="lesson-teach-tip">{item.tip}</div>
          </div>
        ))}
      </div>
      <div className="lesson-teach-label">🧰 相关词汇（用到上面的内容，顺便一起认）</div>
      <div className="lesson-words">
        {lesson.words.map((w, i) => (
          <button key={i} className="letter-word-chip" onClick={() => speak(w.audio || w.ko, { rate })}>
            <span className="letter-word-ko">{w.ko}</span>
            <span className="letter-word-ro">{w.ro}</span>
            <span className="letter-word-zh">{w.zh}</span>
          </button>
        ))}
      </div>

      <div className="lesson-part-title">③ 小对话</div>
      <p className="lesson-part-hint">点韩文可以单句重听，按"播放对话"整段听，"显示翻译"看罗马音和中文。</p>
      <div className="lesson-dialogues">
        {lesson.dialogues.map((d) => (
          <DialogueBox key={d.id} dialogue={d} speak={speak} slow={slow} />
        ))}
      </div>

      <div className="lesson-part-title">④ 复习</div>
      <LessonReview lessonId={lesson.id} items={reviewItems} dialogues={lesson.dialogues} speak={speak} slow={slow} />
    </div>
  )
}

import { dramaNotice } from '../data/dramas'

const CONF = {
  ok: { icon: '✅', label: '在韩国媒体报道中查到原文' },
  varies: { icon: '⚠️', label: '各处引用略有出入，取最常见写法' },
  title: { icon: '📛', label: '官方剧名，不是角色台词' },
}

// 一部韩剧：介绍 → 文化小知识 → 经典台词（含语言点、关键词）→ 仿写练习
export default function DramaView({ drama, speak, slow }) {
  const rate = slow ? 0.6 : 1

  return (
    <div className="drama">
      <div className="drama-head">
        <div className="drama-title">
          {drama.title} <span className="drama-title-zh">{drama.titleZh}</span>
        </div>
        <div className="drama-meta">{drama.meta}</div>
        <div className="drama-meta">
          {drama.writer}　主演：{drama.cast}
        </div>
      </div>

      <div className="drama-blocks">
        <div className="lesson-block">
          <div className="lesson-block-head">📺 剧情简介</div>
          <p className="lesson-block-text">{drama.intro}</p>
        </div>
        <div className="lesson-block">
          <div className="lesson-block-head">🎯 为什么拿它学韩语</div>
          <p className="lesson-block-text">{drama.why}</p>
        </div>
        <div className="lesson-block">
          <div className="lesson-block-head">🇰🇷 文化小知识</div>
          <p className="lesson-block-text">{drama.culture}</p>
        </div>
      </div>

      <div className="lesson-part-title">🎬 经典台词</div>
      <div className="drama-lines">
        {drama.lines.map((l, i) => {
          const c = CONF[l.confidence]
          return (
            <div key={i} className="drama-line">
              <div className="drama-line-top">
                <span className="drama-who">{l.who}</span>
                <span className={`drama-conf ${l.confidence}`}>
                  {c.icon} {c.label}
                </span>
              </div>
              <div className="drama-ko" onClick={() => speak(l.ko, { rate, voice: l.voice })}>
                {l.ko}
                <button
                  className="drama-play"
                  aria-label="播放"
                  onClick={(e) => {
                    e.stopPropagation()
                    speak(l.ko, { rate, voice: l.voice })
                  }}
                >
                  🔊
                </button>
              </div>
              <div className="drama-ro">{l.ro}</div>
              <div className="drama-zh">{l.zh}</div>
              <div className="drama-scene">🎞 {l.scene}</div>

              <div className="drama-points-title">📝 语言点</div>
              <ul className="drama-points">
                {l.points.map((p, k) => (
                  <li key={k}>{p}</li>
                ))}
              </ul>

              <div className="drama-points-title">🔑 关键词</div>
              <div className="lesson-words">
                {l.words.map((w, k) => (
                  <button key={k} className="letter-word-chip" onClick={() => speak(w.ko, { rate })}>
                    <span className="letter-word-ko">{w.ko}</span>
                    <span className="letter-word-ro">{w.ro}</span>
                    <span className="letter-word-zh">{w.zh}</span>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="lesson-part-title">✍️ 仿写练习（本站自己写的，不是原剧台词）</div>
      <p className="lesson-part-hint">用同样的句型换个内容，练到能自己说出来。</p>
      <div className="drama-practice">
        {drama.practice.map((p, i) => (
          <div key={i} className="drama-practice-item" onClick={() => speak(p.ko, { rate })}>
            <div className="drama-practice-ko">{p.ko}</div>
            <div className="drama-practice-ro">{p.ro}</div>
            <div className="drama-practice-zh">{p.zh}</div>
          </div>
        ))}
      </div>

      {drama.sources?.length > 0 && (
        <div className="drama-sources">
          核对来源（检索到的相关报道）：
          {drama.sources.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      )}
      <p className="drama-notice">{dramaNotice}</p>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { exerciseAudio } from '../data/school'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 选择填空：选完立刻判对错并说明原因，同时朗读完整句子
function Choice({ ex, speak, rate, onResult }) {
  const [picked, setPicked] = useState(null)
  const done = picked !== null

  const pick = (i) => {
    if (done) return
    setPicked(i)
    onResult(i === ex.answer)
    speak(exerciseAudio(ex), { rate })
  }

  return (
    <div className="sx-card">
      <div className="sx-q">{ex.q.replace('___', '＿＿＿')}</div>
      <div className="sx-hint">{ex.hint}</div>
      <div className="sx-options">
        {ex.options.map((o, i) => {
          let cls = 'sx-option'
          if (done && i === ex.answer) cls += ' ok'
          else if (done && i === picked) cls += ' bad'
          return (
            <button key={i} className={cls} onClick={() => pick(i)} disabled={done}>
              {o}
            </button>
          )
        })}
      </div>
      {done && (
        <div className={`sx-feedback ${picked === ex.answer ? 'ok' : 'bad'}`}>
          {picked === ex.answer ? '✅ 正确。' : '❌ 再想想。'}
          {ex.why}
        </div>
      )}
    </div>
  )
}

// 排列词序：点词块依次拼成句子，再点"检查"
function Order({ ex, speak, rate, onResult }) {
  const tiles = useMemo(() => shuffle(ex.words.map((w, i) => ({ id: i, w }))), [ex])
  const [chosen, setChosen] = useState([])
  const [result, setResult] = useState(null)

  const sentence = chosen.map((c) => c.w).join(' ')
  const rest = tiles.filter((t) => !chosen.some((c) => c.id === t.id))

  const check = () => {
    const ok = ex.answers.includes(sentence)
    setResult(ok)
    onResult(ok)
    speak(exerciseAudio(ex), { rate })
  }

  const reset = () => {
    setChosen([])
    setResult(null)
  }

  return (
    <div className="sx-card">
      <div className="sx-q">🧩 {ex.zh}</div>
      <div className="sx-hint">点下面的词块，按正确的顺序排成一句韩语</div>
      <div className={`sx-built ${result === true ? 'ok' : result === false ? 'bad' : ''}`}>
        {chosen.length === 0 && <span className="sx-placeholder">（点词块放到这里）</span>}
        {chosen.map((c) => (
          <button key={c.id} className="sx-tile on" onClick={() => result === null && setChosen(chosen.filter((x) => x.id !== c.id))}>
            {c.w}
          </button>
        ))}
      </div>
      <div className="sx-tiles">
        {rest.map((t) => (
          <button key={t.id} className="sx-tile" onClick={() => result === null && setChosen([...chosen, t])}>
            {t.w}
          </button>
        ))}
      </div>
      <div className="sx-actions">
        {result === null ? (
          <button className="lr-btn primary" onClick={check} disabled={rest.length > 0}>
            检查
          </button>
        ) : (
          <button className="lr-btn" onClick={reset}>
            🔄 重排
          </button>
        )}
        {result !== null && (
          <span className={`sx-feedback inline ${result ? 'ok' : 'bad'}`}>
            {result ? '✅ 正确！' : `❌ 参考答案：${ex.answers[0]}`}
          </span>
        )}
      </div>
    </div>
  )
}

// 看中文说韩语：先开口说，再点揭晓
function Reveal({ ex, speak, rate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sx-card">
      <div className="sx-q">🗣 {ex.zh}</div>
      <div className="sx-hint">先自己用韩语说出来，再点揭晓对答案</div>
      {open ? (
        <div className="sx-answer" onClick={() => speak(ex.ko, { rate })}>
          <div className="sx-answer-ko">{ex.ko}</div>
          <div className="sx-answer-ro">{ex.ro}</div>
        </div>
      ) : (
        <button
          className="lr-btn primary"
          onClick={() => {
            setOpen(true)
            speak(ex.ko, { rate })
          }}
        >
          👁 揭晓答案
        </button>
      )}
    </div>
  )
}

const TYPES = [
  { id: 'choice', title: '① 选择填空' },
  { id: 'order', title: '② 排列词序' },
  { id: 'reveal', title: '③ 看中文说韩语' },
]

export default function SchoolExercises({ exercises, speak, slow }) {
  const rate = slow ? 0.6 : 1
  const [round, setRound] = useState(0)
  const [scores, setScores] = useState({})

  const record = (key) => (ok) => setScores((s) => ({ ...s, [key]: ok }))
  const graded = exercises.filter((e) => e.type !== 'reveal')
  const total = graded.length
  const answered = Object.keys(scores).length
  const right = Object.values(scores).filter(Boolean).length

  return (
    <div className="sx" key={round}>
      <div className="sx-score">
        已作答 {answered} / {total} 题，答对 <b>{right}</b> 题
        {answered > 0 && (
          <button
            className="lr-link"
            onClick={() => {
              setScores({})
              setRound((r) => r + 1)
            }}
          >
            全部重做
          </button>
        )}
      </div>
      {TYPES.map((t) => {
        const list = exercises.map((e, i) => ({ e, i })).filter((x) => x.e.type === t.id)
        if (list.length === 0) return null
        return (
          <div key={t.id}>
            <div className="sx-type-title">{t.title}</div>
            <div className="sx-list">
              {list.map(({ e, i }) =>
                t.id === 'choice' ? (
                  <Choice key={i} ex={e} speak={speak} rate={rate} onResult={record(i)} />
                ) : t.id === 'order' ? (
                  <Order key={i} ex={e} speak={speak} rate={rate} onResult={record(i)} />
                ) : (
                  <Reveal key={i} ex={e} speak={speak} rate={rate} />
                ),
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

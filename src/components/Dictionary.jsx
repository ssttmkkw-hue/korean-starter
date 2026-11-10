import { useState } from 'react'
import { categories } from '../data/phrases'
import { wordCategories } from '../data/words'
import { alphabetGroups } from '../data/hangul'
import { syllableTable } from '../data/syllables'
import { dialogueCategories } from '../data/dialogues'
import { patternGroups } from '../data/sentencePatterns'
import { lessons, lessonsIntro } from '../data/lessons'
import { dramas, dramaNotice } from '../data/dramas'
import { tales, heritages } from '../data/folk'
import { schoolLessons, schoolIntro } from '../data/school'
import FlipCard from './FlipCard'
import SyllableTable from './SyllableTable'
import DialogueBox from './DialogueBox'
import LetterPanel from './LetterPanel'
import PatternDrill from './PatternDrill'
import PhoneticsPanel from './PhoneticsPanel'
import StoryPlayer from './StoryPlayer'
import LessonView from './LessonView'
import DramaView from './DramaView'
import FolkView from './FolkView'
import ProverbList from './ProverbList'
import SchoolView from './SchoolView'
import ImmersionPlayer from './ImmersionPlayer'
import SpeakPractice from './SpeakPractice'

const SECTIONS = [
  { id: 'lessons', title: '入门课程 · 첫걸음' },
  { id: 'school', title: '学校课程 · 정규 과정' },
  { id: 'immerse', title: '磨耳朵 · 귀 열기' },
  { id: 'speak', title: '开口说 · 말하기' },
  { id: 'alphabet', title: '字母 · 한글' },
  { id: 'phonetics', title: '发音精讲 · 발음' },
  { id: 'syllables', title: '拼读表 · 가나다' },
  { id: 'words', title: '单词 · 단어' },
  { id: 'phrases', title: '语句 · 문장' },
  { id: 'dialogues', title: '对话 · 회화' },
  { id: 'patterns', title: '造句练习 · 문형' },
  { id: 'story', title: '留学故事 · 이야기' },
  { id: 'dramas', title: '韩剧学韩语 · 드라마' },
  { id: 'folk', title: '传统故事 · 옛이야기' },
]

function normalizeWord(item) {
  return { display: item.ko, audio: item.ko, ro: item.ro, meta: item.zh }
}

export default function Dictionary({ speak, stop, slow, setSlow }) {
  const [section, setSection] = useState('lessons')
  const [immersing, setImmersing] = useState(false)
  const [activeLesson, setActiveLesson] = useState(lessons[0].id)
  const [activeDrama, setActiveDrama] = useState(dramas[0].id)
  const [activeFolk, setActiveFolk] = useState(tales[0].id)
  const [activeSchool, setActiveSchool] = useState(schoolLessons[0].id)
  const [activeAlphabet, setActiveAlphabet] = useState(alphabetGroups[0].id)
  const [activePhonetics, setActivePhonetics] = useState(alphabetGroups[0].id)
  const [activeWordCat, setActiveWordCat] = useState(wordCategories[0].id)
  const [activePhraseCat, setActivePhraseCat] = useState(categories[0].id)
  const [activeDialogueCat, setActiveDialogueCat] = useState(dialogueCategories[0].id)
  const [activePatternGroup, setActivePatternGroup] = useState(patternGroups[0].id)

  const currentLesson = lessons.find((l) => l.id === activeLesson)
  const currentDrama = dramas.find((d) => d.id === activeDrama)
  const currentSchool = schoolLessons.find((l) => l.id === activeSchool)
  const folkTabs = [
    ...tales.map((t) => ({ id: t.id, title: t.title })),
    { id: 'proverbs', title: '속담 谚语' },
    ...heritages.map((h) => ({ id: h.id, title: h.title })),
  ]
  const currentFolkItem = [...tales, ...heritages].find((x) => x.id === activeFolk)
  const currentAlphabetGroup = alphabetGroups.find((g) => g.id === activeAlphabet)
  const currentPhoneticsGroup = alphabetGroups.find((g) => g.id === activePhonetics)
  const currentWordCat = wordCategories.find((c) => c.id === activeWordCat)
  const currentPhraseCat = categories.find((c) => c.id === activePhraseCat)
  const currentDialogueCat = dialogueCategories.find((c) => c.id === activeDialogueCat)
  const currentPatternGroup = patternGroups.find((g) => g.id === activePatternGroup)

  const totalWords = wordCategories.reduce((sum, c) => sum + c.items.length, 0)
  const totalPhrases = categories.reduce((sum, c) => sum + c.phrases.length, 0)
  const totalDialogues = dialogueCategories.reduce((sum, c) => sum + c.dialogues.length, 0)

  return (
    <div className="dictionary">
      <nav className="tabs sections">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`tab section-tab ${s.id === section ? 'active' : ''}`}
            onClick={() => setSection(s.id)}
          >
            {s.title}
            {s.id === 'immerse' && immersing && ' 🎧'}
          </button>
        ))}
      </nav>

      <div className="toolbar">
        <label className="slow-toggle">
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} />
          慢速朗读
        </label>
      </div>

      {section === 'lessons' && (
        <>
          <p className="hint lessons-intro">{lessonsIntro}</p>
          <nav className="tabs">
            {lessons.map((l) => (
              <button
                key={l.id}
                className={`tab ${l.id === activeLesson ? 'active' : ''}`}
                onClick={() => setActiveLesson(l.id)}
              >
                {l.title}
              </button>
            ))}
          </nav>
          <LessonView key={currentLesson.id} lesson={currentLesson} speak={speak} slow={slow} />
        </>
      )}

      {section === 'alphabet' && (
        <>
          <nav className="tabs">
            {alphabetGroups.map((g) => (
              <button
                key={g.id}
                className={`tab ${g.id === activeAlphabet ? 'active' : ''}`}
                onClick={() => setActiveAlphabet(g.id)}
              >
                {g.title}
              </button>
            ))}
          </nav>
          <p className="hint">每个字母配了 6 个高频例词和一段两句小对话，帮你在语境里记住读音。</p>
          <main className="letter-panel-grid">
            {currentAlphabetGroup.items.map((item, i) => (
              <LetterPanel key={i} item={item} speak={speak} slow={slow} />
            ))}
          </main>
        </>
      )}

      {section === 'phonetics' && (
        <>
          <nav className="tabs">
            {alphabetGroups.map((g) => (
              <button
                key={g.id}
                className={`tab ${g.id === activePhonetics ? 'active' : ''}`}
                onClick={() => setActivePhonetics(g.id)}
              >
                {g.title}
              </button>
            ))}
          </nav>
          <p className="hint">
            每个字母详细讲解发音方法和口型，并对比汉语拼音、日语假名、英语发音的异同，例词也比"字母"板块更多。
          </p>
          <main className="phon-grid">
            {currentPhoneticsGroup.items.map((item, i) => (
              <PhoneticsPanel key={i} item={item} speak={speak} slow={slow} />
            ))}
          </main>
        </>
      )}

      {section === 'syllables' && (
        <>
          <p className="hint">
            14 个基础辅音 × 10 个基础元音 = 140 个音节，点击任意一个听发音，是最经典的拼读练习表。
          </p>
          <SyllableTable table={syllableTable} speak={speak} slow={slow} />
        </>
      )}

      {section === 'words' && (
        <>
          <p className="hint">共 {totalWords} 个单词，按主题分类</p>
          <nav className="tabs">
            {wordCategories.map((c) => (
              <button
                key={c.id}
                className={`tab ${c.id === activeWordCat ? 'active' : ''}`}
                onClick={() => setActiveWordCat(c.id)}
              >
                {c.title}
              </button>
            ))}
          </nav>
          <main className="flip-grid">
            {currentWordCat.items.map((w, i) => (
              <FlipCard key={i} item={normalizeWord(w)} speak={speak} slow={slow} />
            ))}
          </main>
        </>
      )}

      {section === 'phrases' && (
        <>
          <p className="hint">共 {totalPhrases} 句常用语，按场景分类</p>
          <nav className="tabs">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`tab ${c.id === activePhraseCat ? 'active' : ''}`}
                onClick={() => setActivePhraseCat(c.id)}
              >
                {c.title}
              </button>
            ))}
          </nav>
          <main className="flip-grid wide">
            {currentPhraseCat.phrases.map((p, i) => (
              <FlipCard key={i} item={normalizeWord(p)} speak={speak} slow={slow} />
            ))}
          </main>
        </>
      )}

      {section === 'dialogues' && (
        <>
          <p className="hint">共 {totalDialogues} 段生活对话，按场景分类，翻译默认隐藏，点按钮统一显示</p>
          <nav className="tabs">
            {dialogueCategories.map((c) => (
              <button
                key={c.id}
                className={`tab ${c.id === activeDialogueCat ? 'active' : ''}`}
                onClick={() => setActiveDialogueCat(c.id)}
              >
                {c.title}
              </button>
            ))}
          </nav>
          <main className="dialogue-list">
            {currentDialogueCat.dialogues.map((d) => (
              <DialogueBox key={d.id} dialogue={d} speak={speak} slow={slow} />
            ))}
          </main>
        </>
      )}

      {section === 'patterns' && (
        <>
          <p className="hint">点单词卡片填进句型空格，句子会实时拼出来并朗读——同一个句型换着词多练几遍就记住了</p>
          <nav className="tabs">
            {patternGroups.map((g) => (
              <button
                key={g.id}
                className={`tab ${g.id === activePatternGroup ? 'active' : ''}`}
                onClick={() => setActivePatternGroup(g.id)}
              >
                {g.title}
              </button>
            ))}
          </nav>
          <main className="drill-list">
            {currentPatternGroup.patterns.map((p) => (
              <PatternDrill key={p.id} pattern={p} speak={speak} slow={slow} />
            ))}
          </main>
        </>
      )}

      {section === 'story' && (
        <>
          <p className="hint">
            第一视角文字游戏：你是刚到韩国的中国留学生，边寄宿边上语言学校。点选项推进剧情，韩文台词会自动朗读。
          </p>
          <StoryPlayer speak={speak} slow={slow} />
        </>
      )}

      <div style={{ display: section === 'immerse' ? 'block' : 'none' }}>
        <ImmersionPlayer speak={speak} stop={stop} slow={slow} onRunningChange={setImmersing} />
      </div>

      <div style={{ display: section === 'speak' ? 'block' : 'none' }}>
        <SpeakPractice speak={speak} stop={stop} slow={slow} active={section === 'speak'} />
      </div>

      {section === 'school' && (
        <>
          <p className="hint lessons-intro">{schoolIntro}</p>
          <nav className="tabs">
            {schoolLessons.map((l) => (
              <button
                key={l.id}
                className={`tab ${l.id === activeSchool ? 'active' : ''}`}
                onClick={() => setActiveSchool(l.id)}
              >
                제{l.no}과 · {l.title}
              </button>
            ))}
          </nav>
          <SchoolView key={currentSchool.id} lesson={currentSchool} speak={speak} slow={slow} />
        </>
      )}

      {section === 'dramas' && (
        <>
          <p className="hint lessons-intro">{dramaNotice}</p>
          <nav className="tabs">
            {dramas.map((d) => (
              <button
                key={d.id}
                className={`tab ${d.id === activeDrama ? 'active' : ''}`}
                onClick={() => setActiveDrama(d.id)}
              >
                {d.title}
              </button>
            ))}
          </nav>
          <DramaView key={currentDrama.id} drama={currentDrama} speak={speak} slow={slow} />
        </>
      )}

      {section === 'folk' && (
        <>
          <p className="hint lessons-intro">
            从韩国的民间故事、谚语、训民正音和传统民谣里学韩语：每篇配讲解、单词、语言点，还可以整段播放。
          </p>
          <nav className="tabs">
            {folkTabs.map((t) => (
              <button
                key={t.id}
                className={`tab ${t.id === activeFolk ? 'active' : ''}`}
                onClick={() => setActiveFolk(t.id)}
              >
                {t.title}
              </button>
            ))}
          </nav>
          {activeFolk === 'proverbs' ? (
            <ProverbList speak={speak} slow={slow} />
          ) : (
            <FolkView key={activeFolk} item={currentFolkItem} speak={speak} slow={slow} />
          )}
        </>
      )}
    </div>
  )
}

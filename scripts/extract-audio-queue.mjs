// 抽取全站所有需要生成语音的韩文文本，输出 {text, voice} 去重队列供 Python 脚本消费
// voice: 'F' = ko-KR-SunHiNeural（女声，默认旁白 + 对话 A）, 'M' = ko-KR-InJoonNeural（男声，对话 B）
import { writeFileSync } from 'fs'
import { alphabetGroups } from '../src/data/hangul.js'
import { syllableTable } from '../src/data/syllables.js'
import { wordCategories } from '../src/data/words.js'
import { categories as phraseCategories } from '../src/data/phrases.js'
import { dialogueCategories } from '../src/data/dialogues.js'
import { letterExtras } from '../src/data/letterExtras.js'
import { dialogueExtras } from '../src/data/dialogueExtras.js'
import { patternGroups } from '../src/data/sentencePatterns.js'
import { letterPhonetics } from '../src/data/letterPhonetics.js'
import { storyChapters } from '../src/data/story.js'
import { lessons } from '../src/data/lessons.js'
import { dramas } from '../src/data/dramas.js'
import { tales, proverbs, heritages } from '../src/data/folk.js'
import { schoolLessons, exerciseAudio } from '../src/data/school.js'
import { schoolJa } from '../src/data/schoolJa.js'
import { buildCorpus } from '../src/data/immersion.js'
import { speakScenarios } from '../src/data/speakScenarios.js'
import { pickParticle } from '../src/utils/hangulCompose.js'

const queue = new Map() // key: `${voice}|${text}` -> {text, voice}

function add(text, voice = 'F') {
  if (!text) return
  const key = `${voice}|${text}`
  if (!queue.has(key)) queue.set(key, { text, voice })
}

for (const g of alphabetGroups) {
  for (const item of g.items) add(item.demo, 'F')
}

for (const row of syllableTable.rows) {
  for (const cell of row.cells) add(cell.syllable, 'F')
}

for (const c of wordCategories) {
  for (const w of c.items) add(w.ko, 'F')
}

for (const c of phraseCategories) {
  for (const p of c.phrases) add(p.ko, 'F')
}

for (const c of dialogueCategories) {
  for (const d of c.dialogues) {
    for (const line of d.lines) add(line.ko, line.speaker === 'A' ? 'F' : 'M')
  }
}

for (const letter of Object.keys(letterExtras)) {
  const extra = letterExtras[letter]
  for (const w of extra.words) add(w.ko, 'F')
  for (const line of extra.mini) add(line.ko, line.speaker === 'A' ? 'F' : 'M')
}

for (const id of Object.keys(dialogueExtras)) {
  const extra = dialogueExtras[id]
  for (const w of extra.vocab) add(w.ko, 'F')
}

for (const letter of Object.keys(letterPhonetics)) {
  for (const w of letterPhonetics[letter].words) add(w.ko, 'F')
}

for (const chapter of storyChapters) {
  for (const nodeId of Object.keys(chapter.nodes)) {
    const node = chapter.nodes[nodeId]
    if (node.type === 'dialogue') add(node.ko, node.voice)
    if (node.type === 'choice') {
      for (const opt of node.options) add(opt.ko, 'F')
    }
  }
}

for (const lesson of lessons) {
  for (const item of lesson.teach) add(item.audio || item.ko, 'F')
  for (const item of lesson.words) add(item.audio || item.ko, 'F')
  for (const d of lesson.dialogues) {
    for (const line of d.lines) add(line.ko, line.speaker === 'A' ? 'F' : 'M')
  }
}

for (const d of dramas) {
  for (const l of d.lines) {
    add(l.ko, l.voice)
    for (const w of l.words) add(w.ko, 'F')
  }
  for (const p of d.practice) add(p.ko, 'F')
}

for (const t of [...tales, ...heritages]) {
  for (const l of t.lines) add(l.ko, l.voice)
  for (const w of t.words) add(w.ko.split(' / ')[0], 'F')
  for (const q of t.questions) {
    add(q.ko, 'F')
    add(q.aKo, 'F')
  }
}
for (const p of proverbs) {
  add(p.ko, 'F')
  for (const w of p.words) add(w.ko, 'F')
}

for (const it of buildCorpus()) add(it.ko, it.voice)

for (const sc of speakScenarios) {
  add(sc.opening.ko, 'F')
  for (const h of sc.starters) add(h.ko, 'F')
}

for (const list of Object.values(schoolJa)) {
  for (const item of list) for (const p of item.pairs) add(p.ko, 'F')
}

for (const l of schoolLessons) {
  for (const w of l.vocab) add(w.ko, 'F')
  for (const g of l.grammar) for (const e of g.examples) add(e.ko, 'F')
  for (const d of l.dialogues) for (const x of d.lines) add(x.ko, x.speaker === 'A' ? 'F' : 'M')
  for (const e of l.exercises) {
    add(exerciseAudio(e), 'F')
    if (e.type === 'order') for (const a of e.answers) add(a, 'F')
  }
}

for (const g of patternGroups) {
  for (const pattern of g.patterns) {
    for (const opt of pattern.options) {
      add(opt.ko, 'F')
      const wordPart = opt.ko + (pattern.wordSuffix || '')
      const particle = pattern.particleType !== 'none' ? pickParticle(wordPart, pattern.particleType) : ''
      const sentence = `${pattern.prefix}${wordPart}${particle}${pattern.suffixLiteral || ''}`
      add(sentence, 'F')
    }
  }
}

const list = [...queue.values()]
writeFileSync(new URL('./audio-queue.json', import.meta.url), JSON.stringify(list, null, 0))
console.log(`queued ${list.length} unique (text, voice) clips`)

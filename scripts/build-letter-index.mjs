// 一次性工具脚本：扫描 words.js / phrases.js / dialogues.js，
// 找出每个字母（초성/중성）在已有内容里对应的例词，供人工挑选后写入 letterExtras.js
import { wordCategories } from '../src/data/words.js'
import { categories as phraseCategories } from '../src/data/phrases.js'
import { dialogueCategories } from '../src/data/dialogues.js'
import { alphabetGroups } from '../src/data/hangul.js'
import { letterExtras } from '../src/data/letterExtras.js'
import { dialogueExtras } from '../src/data/dialogueExtras.js'
import { patternGroups } from '../src/data/sentencePatterns.js'
import { decomposeSyllable } from '../src/utils/hangulCompose.js'

const allLetters = alphabetGroups.flatMap((g) => g.items.map((i) => i.letter))

const pool = []
for (const c of wordCategories) {
  for (const w of c.items) pool.push({ ko: w.ko, ro: w.ro, zh: w.zh, source: 'word' })
}
for (const c of phraseCategories) {
  for (const p of c.phrases) pool.push({ ko: p.ko, ro: p.ro, zh: p.zh, source: 'phrase' })
}
for (const c of dialogueCategories) {
  for (const d of c.dialogues) {
    for (const l of d.lines) pool.push({ ko: l.ko, ro: l.ro, zh: l.zh, source: 'dialogue' })
  }
}
for (const letter of Object.keys(letterExtras)) {
  for (const w of letterExtras[letter].words) pool.push({ ko: w.ko, ro: w.ro, zh: w.zh, source: 'word' })
}
for (const id of Object.keys(dialogueExtras)) {
  for (const w of dialogueExtras[id].vocab) pool.push({ ko: w.ko, ro: w.ro, zh: w.zh, source: 'word' })
}
for (const g of patternGroups) {
  for (const p of g.patterns) {
    for (const o of p.options) pool.push({ ko: o.ko, ro: o.ro, zh: o.zh, source: 'word' })
  }
}

// 去重（按 ko 文本）
const seen = new Set()
const uniquePool = pool.filter((p) => {
  if (seen.has(p.ko)) return false
  seen.add(p.ko)
  return true
})

const index = {}
for (const letter of allLetters) index[letter] = []

for (const item of uniquePool) {
  const chars = [...item.ko.replace(/\s/g, '')]
  const lettersInWord = new Set()
  for (const ch of chars) {
    const d = decomposeSyllable(ch)
    if (!d) continue
    lettersInWord.add(d.cho)
    lettersInWord.add(d.jung)
    if (d.jong) lettersInWord.add(d.jong)
  }
  // 是否以该字母开头（首音节的초성 or 中성），优先级更高
  const first = decomposeSyllable(chars[0])
  for (const letter of lettersInWord) {
    if (!index[letter]) continue
    const isFirst = first && (first.cho === letter || first.jung === letter)
    index[letter].push({ ...item, isFirst, len: chars.length })
  }
}

// 排序：单词优先于短语/对话句，开头出现的优先，短词优先
for (const letter of Object.keys(index)) {
  index[letter].sort(
    (a, b) => (a.source === 'word' ? 0 : 1) - (b.source === 'word' ? 0 : 1) || (b.isFirst - a.isFirst) || (a.len - b.len),
  )
  index[letter] = index[letter].slice(0, 18)
}

console.log(JSON.stringify(index, null, 2))

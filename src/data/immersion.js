// 磨耳朵（语言浴）语料：把站内已有的对话、故事、课文、短句、单词统一成"可连续播放的音频单元"
// 单元类型：word 单词 / phrase 独立短句 / line 对话或故事里的整句 / chunk 从整句里截出来的碎片（2-3 个词）
// 碎片的语音要单独生成（scripts/extract-audio-queue.mjs 会把整个语料都加进队列）

import { wordCategories } from './words.js'
import { categories as phraseCategories } from './phrases.js'
import { dialogueCategories } from './dialogues.js'
import { lessons } from './lessons.js'
import { schoolLessons } from './school.js'
import { storyChapters } from './story.js'
import { tales, proverbs } from './folk.js'

export const SOURCES = [
  { id: 'all', title: '全部混合' },
  { id: 'dialogue', title: '生活对话' },
  { id: 'phrase', title: '短句 · 课文例句' },
  { id: 'tale', title: '故事 · 谚语' },
  { id: 'word', title: '单词' },
]

// 碎片 / 单词 / 整句 三类内容的出现比例
export const GRANULARITY = {
  frag: { title: '碎片为主', chunk: 5, word: 2.5, sent: 2.5 },
  mix: { title: '混合', chunk: 3, word: 2, sent: 5 },
  sent: { title: '整句为主', chunk: 1, word: 1, sent: 8 },
}

// 两条之间的静默时长（秒）范围：随机，营造"断断续续"的感觉
export const GAPS = {
  tight: { title: '紧凑', range: [0.5, 1.2] },
  mid: { title: '适中', range: [1.2, 2.8] },
  loose: { title: '宽松', range: [2.5, 5.5] },
}

// "回声"：整句出现后，它的碎片会隔几条再回来；碎片出现后，整句也会隔几条再回来
export const ECHO = {
  low: { title: '少', p: 0.2 },
  mid: { title: '中', p: 0.45 },
  high: { title: '多', p: 0.75 },
}

const strip = (s) => s.replace(/[.,!?…"“”~·]/g, ' ').replace(/\s+/g, ' ').trim()

// 从整句里截取碎片：先按标点切成小句（碎片不会跨句），
// 3 个词以内的小句本身就是自然的碎片；更长的小句取开头 2 词、结尾 2 词（够长再取中间 2 词）
export function makeChunks(ko) {
  const whole = strip(ko)
  const clauses = ko
    .split(/[.!?,…~]+/)
    .map((c) => c.replace(/["“”·]/g, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean)
  const out = []
  for (const c of clauses) {
    const toks = c.split(' ')
    if (toks.length <= 3) {
      if (c.length >= 3) out.push(c)
    } else {
      out.push(toks.slice(0, 2).join(' '))
      if (toks.length >= 6) {
        const m = Math.floor(toks.length / 2)
        out.push(toks.slice(m - 1, m + 1).join(' '))
      }
      out.push(toks.slice(-2).join(' '))
    }
  }
  return [...new Set(out)].filter((c) => c !== whole && /[가-힣]/.test(c))
}

let cache = null

export function buildCorpus() {
  if (cache) return cache
  const items = []
  const seen = new Set()
  const add = (it) => {
    const ko = it.ko.trim()
    if (!ko || !/[가-힣]/.test(ko)) return
    const id = `${it.voice}|${ko}`
    if (seen.has(id)) return
    seen.add(id)
    items.push({ ...it, ko, id })
  }
  const vo = (sp) => (sp === 'A' ? 'F' : 'M')

  // 生活对话（对话里 A 女声、B 男声）
  for (const c of dialogueCategories) {
    for (const d of c.dialogues) {
      for (const l of d.lines) add({ ko: l.ko, zh: l.zh, voice: vo(l.speaker), type: 'line', src: 'dialogue' })
    }
  }
  for (const les of lessons) {
    for (const d of les.dialogues) {
      for (const l of d.lines) add({ ko: l.ko, zh: l.zh, voice: vo(l.speaker), type: 'line', src: 'dialogue' })
    }
  }
  for (const les of schoolLessons) {
    for (const d of les.dialogues) {
      for (const l of d.lines) add({ ko: l.ko, zh: l.zh, voice: vo(l.speaker), type: 'line', src: 'dialogue' })
    }
  }
  for (const ch of storyChapters) {
    for (const node of Object.values(ch.nodes)) {
      if (node.type === 'dialogue') add({ ko: node.ko, zh: node.zh, voice: node.voice, type: 'line', src: 'dialogue' })
    }
  }

  // 短句 / 课文例句
  for (const c of phraseCategories) {
    for (const p of c.phrases) add({ ko: p.ko, zh: p.zh, voice: 'F', type: 'phrase', src: 'phrase' })
  }
  for (const les of schoolLessons) {
    for (const g of les.grammar) {
      for (const e of g.examples) add({ ko: e.ko, zh: e.zh, voice: 'F', type: 'phrase', src: 'phrase' })
    }
  }

  // 故事与谚语
  for (const t of tales) {
    for (const l of t.lines) add({ ko: l.ko, zh: l.zh, voice: l.voice, type: 'line', src: 'tale' })
  }
  for (const p of proverbs) add({ ko: p.ko, zh: p.zh, voice: 'F', type: 'phrase', src: 'tale' })

  // 单词
  for (const c of wordCategories) {
    for (const w of c.items) add({ ko: w.ko, zh: w.zh, voice: 'F', type: 'word', src: 'word' })
  }

  // 由整句 / 短句生成碎片，并互相登记父子关系，方便"回声"
  const sentences = items.filter((i) => i.type === 'line' || i.type === 'phrase')
  for (const s of sentences) {
    const kids = []
    for (const c of makeChunks(s.ko)) {
      const before = items.length
      add({ ko: c, zh: s.zh, voice: s.voice, type: 'chunk', src: s.src, parentKo: s.ko })
      if (items.length > before) kids.push(items[items.length - 1])
      else {
        const existing = items.find((x) => x.id === `${s.voice}|${c}`)
        if (existing && existing.type === 'chunk') kids.push(existing)
      }
    }
    s.kids = kids
    for (const k of kids) k.parent = k.parent || s
  }

  cache = items
  return items
}

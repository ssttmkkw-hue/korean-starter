import { decomposeSyllable } from './hangulCompose.js'
import { AI_VOICE_ENABLED } from '../config.js'

// 和 ai-message / ai-companion 用的是同一个函数计算代理：POST { messages, max_tokens, temperature } → { reply }
// 不传 model，由代理自己挑可用的模型（指定 qwen3.7-flash 时免费额度已用完，会 503）
const ENDPOINT = 'https://deepseepi-proxy-vrjfvtzrsk.cn-hangzhou.fcapp.run'
const TIMEOUT_MS = 40000

const LEVEL_RULES = `你是一位耐心的韩语口语陪练，对方是【零基础～初级（TOPIK 1级以下）】的中国学习者，母语中文。
你要用【简单、自然、地道】的韩语跟对方对话。严格遵守：
1. 只用 해요체（-아요/-어요）或 합니다体的最常见说法，一次回复最多 2 个短句，每句不超过 12 个词。
2. 只用初级最常见的词汇和语法（이/가、은/는、을/를、에、에서、-고 싶어요、-(으)세요、-ㄹ 거예요、-아/어 주세요 等）；不用汉字词的难词、不用谚语、不用长从句。
3. 每次回复最后尽量抛一个简单的问题，把对话继续下去（除非场景自然结束）。
4. 对方的话来自【语音识别】，可能有错字、断句或同音词；请结合场景猜测对方原意，不要纠结于识别错误，更不要把识别错误当作"语法错误"。
5. 如果对方说的是中文、英文或完全听不懂，就用最简单的韩语礼貌地请对方再说一遍，并在 hints 里给出可以说的话。
6. 绝不在 ko 里夹杂中文、罗马音、括号注释或 emoji。`

function scenarioPrompt(sc) {
  return `${LEVEL_RULES}

【当前场景】${sc.title}（${sc.ko}）
【你扮演】${sc.role}
【情景】${sc.situation}
请始终待在这个角色里，用角色的口吻说话，不要跳出角色去讲课。

【输出格式】只输出一个 JSON 对象，不要 markdown、不要多余文字：
{
  "ko": "你（角色）说的韩语，1~2 个短句",
  "zh": "上面韩语的中文翻译",
  "fix": {
    "status": "ok | minor | wrong",
    "better": "如果对方的话有明显语法/词汇/用词问题，写出更自然的完整韩语说法；没问题则为空字符串",
    "note": "用中文 1~2 句简短说明哪里不自然、为什么（面向初学者，别讲大道理）；没问题则为空字符串"
  },
  "hints": [
    {"ko": "对方下一句可以这样回答（初级、10 词以内）", "zh": "中文意思"},
    {"ko": "另一种回答", "zh": "中文意思"},
    {"ko": "再一种回答", "zh": "中文意思"}
  ]
}
关于 fix：status 为 ok 表示对方说得自然可用；minor 表示可以更自然（比如少了助词、敬语不够、词序别扭）；wrong 表示意思会产生误解或有明显错误。
只有真的有明显问题才纠错，语音识别造成的明显错字不算；对方只是在回答你的问题时别吹毛求疵。hints 必须是对方【对你刚说的话】的自然回答。`
}

function extractJson(text) {
  let s = String(text || '').trim()
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim()
  const start = s.indexOf('{')
  if (start < 0) return null
  let depth = 0
  let inStr = false
  let esc = false
  for (let i = start; i < s.length; i++) {
    const ch = s[i]
    if (inStr) {
      if (esc) esc = false
      else if (ch === '\\') esc = true
      else if (ch === '"') inStr = false
      continue
    }
    if (ch === '"') inStr = true
    else if (ch === '{') depth++
    else if (ch === '}' && --depth === 0) {
      try {
        return JSON.parse(s.slice(start, i + 1))
      } catch {
        return null
      }
    }
  }
  return null
}

async function post(messages, { maxTokens = 600, temperature = 0.8 } = {}) {
  // 兜底：开关关闭时绝不发请求
  if (!AI_VOICE_ENABLED) throw new Error('AI 口语练习暂时关闭')
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: ctrl.signal,
      body: JSON.stringify({ messages, max_tokens: maxTokens, temperature }),
    })
    const raw = await res.text()
    let data
    try {
      data = JSON.parse(raw)
    } catch {
      throw new Error(`HTTP ${res.status}：响应不是 JSON`)
    }
    if (!res.ok) throw new Error(data.err || `HTTP ${res.status}`)
    if (typeof data.reply !== 'string') throw new Error('响应里没有 reply')
    return data.reply
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('AI 响应超时，请再试一次')
    throw e
  } finally {
    clearTimeout(timer)
  }
}

const cleanKo = (s) => String(s || '').replace(/[*_`#]/g, '').trim()

function shape(obj) {
  if (!obj || typeof obj.ko !== 'string' || !cleanKo(obj.ko)) return null
  const fix = obj.fix || {}
  const status = ['ok', 'minor', 'wrong'].includes(fix.status) ? fix.status : 'ok'
  return {
    ko: cleanKo(obj.ko),
    zh: String(obj.zh || '').trim(),
    fix: {
      status: fix.better || fix.note ? status : 'ok',
      better: cleanKo(fix.better),
      note: String(fix.note || '').trim(),
    },
    hints: (Array.isArray(obj.hints) ? obj.hints : [])
      .filter((h) => h && typeof h.ko === 'string' && cleanKo(h.ko))
      .slice(0, 3)
      .map((h) => ({ ko: cleanKo(h.ko), zh: String(h.zh || '').trim() })),
  }
}

// history: [{role:'user'|'assistant', content}]（assistant 的 content 是韩语原句）
export async function askTutor(scenario, history, userText) {
  const messages = [
    { role: 'system', content: scenarioPrompt(scenario) },
    ...history.slice(-10),
    { role: 'user', content: `（语音识别结果）${userText}` },
  ]
  let lastErr
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const raw = await post(messages, { maxTokens: 700, temperature: attempt ? 0.5 : 0.8 })
      const out = shape(extractJson(raw))
      if (out) return out
      lastErr = new Error('AI 回复格式不对，已重试')
    } catch (e) {
      lastErr = e
      if (/不允许|额度|quota/i.test(e.message)) break
    }
  }
  throw lastErr
}

// ---------- 发音/跟读对比：转成字母(자모)后做编辑距离，避免整字不同就判全错 ----------
function toJamo(text) {
  const out = []
  for (const ch of String(text).normalize('NFC')) {
    const d = decomposeSyllable(ch)
    if (d) {
      out.push(d.cho)
      out.push(d.jung)
      if (d.jong) out.push(d.jong)
    } else if (/[a-z0-9]/i.test(ch)) {
      out.push(ch.toLowerCase())
    } else if (/[ㄱ-ㆎ]/.test(ch)) {
      out.push(ch)
    }
  }
  return out
}

function lev(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
    }
  }
  return dp[a.length][b.length]
}

// 返回 0~1 的相似度
export function similarity(spoken, target) {
  const a = toJamo(spoken)
  const b = toJamo(target)
  if (!b.length) return 0
  return Math.max(0, 1 - lev(a, b) / Math.max(a.length, b.length))
}

// 逐字对比：返回目标句每个音节是否被说对（按音节做最长公共子序列）
export function diffSyllables(spoken, target) {
  const a = [...String(spoken).replace(/[^가-힣a-zA-Z0-9]/g, '')]
  const b = [...String(target).replace(/[^가-힣a-zA-Z0-9]/g, '')]
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0))
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }
  const hit = new Set()
  let i = a.length
  let j = b.length
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      hit.add(j - 1)
      i--
      j--
    } else if (dp[i - 1][j] >= dp[i][j - 1]) i--
    else j--
  }
  // 把原句（含标点空格）逐字符输出，音节才有对错
  const result = []
  let k = 0
  for (const ch of String(target)) {
    if (/[가-힣a-zA-Z0-9]/.test(ch)) {
      result.push({ ch, ok: hit.has(k) })
      k++
    } else {
      result.push({ ch, ok: null })
    }
  }
  return result
}

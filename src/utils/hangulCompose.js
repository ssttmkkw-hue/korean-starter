// 根据 Unicode 韩文音节组合算法，由 초성(声母)+중성(元音)+종성(收音) 拼出汉谷音节
// 音절 = 0xAC00 + (초성*21 + 중성)*28 + 종성

export const CHOSUNG = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
export const JUNGSUNG = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']

export const JONGSUNG = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

export function composeSyllable(choIdx, jungIdx, jongIdx = 0) {
  return String.fromCharCode(0xac00 + (choIdx * 21 + jungIdx) * 28 + jongIdx)
}

// 把一个韩文音节字符拆回 { cho, jung, jong }（jamo 字符）；非音节字符返回 null
export function decomposeSyllable(char) {
  const code = char.codePointAt(0)
  if (code < 0xac00 || code > 0xd7a3) return null
  const offset = code - 0xac00
  const cho = Math.floor(offset / 588)
  const jung = Math.floor((offset % 588) / 28)
  const jong = offset % 28
  return { cho: CHOSUNG[cho], jung: JUNGSUNG[jung], jong: JONGSUNG[jong] }
}

// 判断一个词的最后一个音节是否有收音（받침），用来决定助词该用哪个变体
export function hasBatchim(word) {
  const chars = [...word.trim()]
  const last = chars[chars.length - 1]
  const d = decomposeSyllable(last)
  return d ? d.jong !== '' : false
}

// 最后一个音节的收音（没有则返回空字符串）
export function lastJong(word) {
  const chars = [...word.trim()]
  const d = decomposeSyllable(chars[chars.length - 1])
  return d ? d.jong : ''
}

// 根据收音自动选择正确的助词变体，用于句型代入练习：同一个句型换任何词都能拼出语法正确的句子
// type: 'topic'(은/는) | 'subject'(이/가) | 'object'(을/를) | 'copula'(이에요/예요) | 'and'(과/와)
//       | 'direction'(으로/로，无收音或收音是ㄹ时用"로")
export function pickParticle(word, type) {
  const b = hasBatchim(word)
  switch (type) {
    case 'direction':
      return !b || lastJong(word) === 'ㄹ' ? '로' : '으로'
    case 'topic':
      return b ? '은' : '는'
    case 'subject':
      return b ? '이' : '가'
    case 'object':
      return b ? '을' : '를'
    case 'copula':
      return b ? '이에요' : '예요'
    case 'and':
      return b ? '과' : '와'
    default:
      return ''
  }
}

export const CHOSUNG_RO = {
  ㄱ: 'g', ㄴ: 'n', ㄷ: 'd', ㄹ: 'r', ㅁ: 'm', ㅂ: 'b', ㅅ: 's', ㅇ: '', ㅈ: 'j', ㅊ: 'ch', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 'h',
}

export const JUNGSUNG_RO = {
  ㅏ: 'a', ㅑ: 'ya', ㅓ: 'eo', ㅕ: 'yeo', ㅗ: 'o', ㅛ: 'yo', ㅜ: 'u', ㅠ: 'yu', ㅡ: 'eu', ㅣ: 'i',
}

// 가나다표：14 个基础辅音 × 10 个基础元音 = 140 个音节，程序化拼出，保证零错字
import { CHOSUNG, JUNGSUNG, composeSyllable, CHOSUNG_RO, JUNGSUNG_RO } from '../utils/hangulCompose.js'

const BASIC_CONSONANTS = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
const BASIC_VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ']

export const syllableTable = {
  consonants: BASIC_CONSONANTS,
  vowels: BASIC_VOWELS,
  rows: BASIC_CONSONANTS.map((c) => {
    const choIdx = CHOSUNG.indexOf(c)
    return {
      consonant: c,
      cells: BASIC_VOWELS.map((v) => {
        const jungIdx = JUNGSUNG.indexOf(v)
        const syllable = composeSyllable(choIdx, jungIdx)
        return { syllable, ro: CHOSUNG_RO[c] + JUNGSUNG_RO[v] }
      }),
    }
  }),
}

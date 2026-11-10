// 한글 字母基础数据
// letter: 单独字母（자모）, demo: 用于发音示范的可读音节, ro: 罗马音, name: 字母正式名称（辅音专用）

export const vowels = [
  { letter: 'ㅏ', demo: '아', ro: 'a' },
  { letter: 'ㅑ', demo: '야', ro: 'ya' },
  { letter: 'ㅓ', demo: '어', ro: 'eo' },
  { letter: 'ㅕ', demo: '여', ro: 'yeo' },
  { letter: 'ㅗ', demo: '오', ro: 'o' },
  { letter: 'ㅛ', demo: '요', ro: 'yo' },
  { letter: 'ㅜ', demo: '우', ro: 'u' },
  { letter: 'ㅠ', demo: '유', ro: 'yu' },
  { letter: 'ㅡ', demo: '으', ro: 'eu' },
  { letter: 'ㅣ', demo: '이', ro: 'i' },
]

export const compoundVowels = [
  { letter: 'ㅐ', demo: '애', ro: 'ae' },
  { letter: 'ㅒ', demo: '얘', ro: 'yae' },
  { letter: 'ㅔ', demo: '에', ro: 'e' },
  { letter: 'ㅖ', demo: '예', ro: 'ye' },
  { letter: 'ㅘ', demo: '와', ro: 'wa' },
  { letter: 'ㅙ', demo: '왜', ro: 'wae' },
  { letter: 'ㅚ', demo: '외', ro: 'oe' },
  { letter: 'ㅝ', demo: '워', ro: 'wo' },
  { letter: 'ㅞ', demo: '웨', ro: 'we' },
  { letter: 'ㅟ', demo: '위', ro: 'wi' },
  { letter: 'ㅢ', demo: '의', ro: 'ui' },
]

export const consonants = [
  { letter: 'ㄱ', demo: '가', ro: 'g / k', name: '기역 (giyeok)' },
  { letter: 'ㄴ', demo: '나', ro: 'n', name: '니은 (nieun)' },
  { letter: 'ㄷ', demo: '다', ro: 'd / t', name: '디귿 (digeut)' },
  { letter: 'ㄹ', demo: '라', ro: 'r / l', name: '리을 (rieul)' },
  { letter: 'ㅁ', demo: '마', ro: 'm', name: '미음 (mieum)' },
  { letter: 'ㅂ', demo: '바', ro: 'b / p', name: '비읍 (bieup)' },
  { letter: 'ㅅ', demo: '사', ro: 's', name: '시옷 (siot)' },
  { letter: 'ㅇ', demo: '아', ro: '（不发音，收尾读 ng）', name: '이응 (ieung)' },
  { letter: 'ㅈ', demo: '자', ro: 'j', name: '지읒 (jieut)' },
  { letter: 'ㅊ', demo: '차', ro: 'ch', name: '치읓 (chieut)' },
  { letter: 'ㅋ', demo: '카', ro: 'k', name: '키읔 (kieuk)' },
  { letter: 'ㅌ', demo: '타', ro: 't', name: '티읕 (tieut)' },
  { letter: 'ㅍ', demo: '파', ro: 'p', name: '피읖 (pieup)' },
  { letter: 'ㅎ', demo: '하', ro: 'h', name: '히읗 (hieut)' },
]

export const doubleConsonants = [
  { letter: 'ㄲ', demo: '까', ro: 'kk（紧音）' },
  { letter: 'ㄸ', demo: '따', ro: 'tt（紧音）' },
  { letter: 'ㅃ', demo: '빠', ro: 'pp（紧音）' },
  { letter: 'ㅆ', demo: '싸', ro: 'ss（紧音）' },
  { letter: 'ㅉ', demo: '짜', ro: 'jj（紧音）' },
]

export const alphabetGroups = [
  { id: 'vowels', title: '基本元音 · 기본모음', items: vowels },
  { id: 'compound', title: '复合元音 · 복합모음', items: compoundVowels },
  { id: 'consonants', title: '基本辅音 · 기본자음', items: consonants },
  { id: 'double', title: '双辅音 · 쌍자음', items: doubleConsonants },
]

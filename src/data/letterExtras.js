// 每个字母的扩展内容：6 个高频基础例词 + 1 段两句小对话，帮助新手在语境里记住字母
// words 优先从站内已有单词/短语库里挑选（保证准确），少数生僻字母补充了地道常用词

export const letterExtras = {
  // ---- 基本元音 ----
  ㅏ: {
    words: [
      { ko: '사', ro: 'sa', zh: '四' },
      { ko: '밥', ro: 'bap', zh: '饭' },
      { ko: '빵', ro: 'ppang', zh: '面包' },
      { ko: '산', ro: 'san', zh: '山' },
      { ko: '달', ro: 'dal', zh: '月亮' },
      { ko: '딸', ro: 'ttal', zh: '女儿' },
    ],
    mini: [
      { speaker: 'A', ko: '밥 먹었어요?', ro: 'bap meogeosseoyo?', zh: '吃饭了吗？' },
      { speaker: 'B', ko: '네, 먹었어요.', ro: 'ne, meogeosseoyo.', zh: '嗯，吃了。' },
    ],
  },
  ㅑ: {
    words: [
      { ko: '야구', ro: 'yagu', zh: '棒球' },
      { ko: '양말', ro: 'yangmal', zh: '袜子' },
      { ko: '고양이', ro: 'goyangi', zh: '猫' },
      { ko: '야채', ro: 'yachae', zh: '蔬菜' },
      { ko: '이야기', ro: 'iyagi', zh: '故事/聊天' },
      { ko: '향기', ro: 'hyanggi', zh: '香气' },
    ],
    mini: [
      { speaker: 'A', ko: '양말 어디 있어요?', ro: 'yangmal eodi isseoyo?', zh: '袜子在哪里？' },
      { speaker: 'B', ko: '서랍 안에 있어요.', ro: 'seorap ane isseoyo.', zh: '在抽屉里。' },
    ],
  },
  ㅓ: {
    words: [
      { ko: '엄마', ro: 'eomma', zh: '妈妈' },
      { ko: '머리', ro: 'meori', zh: '头' },
      { ko: '얼굴', ro: 'eolgul', zh: '脸' },
      { ko: '커피', ro: 'keopi', zh: '咖啡' },
      { ko: '전화', ro: 'jeonhwa', zh: '电话' },
      { ko: '저녁', ro: 'jeonyeok', zh: '晚上' },
    ],
    mini: [
      { speaker: 'A', ko: '커피 마실래요?', ro: 'keopi masillaeyo?', zh: '要喝咖啡吗？' },
      { speaker: 'B', ko: '네, 좋아요.', ro: 'ne, joayo.', zh: '好啊。' },
    ],
  },
  ㅕ: {
    words: [
      { ko: '형', ro: 'hyeong', zh: '哥哥' },
      { ko: '역', ro: 'yeok', zh: '车站' },
      { ko: '별', ro: 'byeol', zh: '星星' },
      { ko: '열쇠', ro: 'yeolsoe', zh: '钥匙' },
      { ko: '병원', ro: 'byeongwon', zh: '医院' },
      { ko: '여름', ro: 'yeoreum', zh: '夏天' },
    ],
    mini: [
      { speaker: 'A', ko: '여름 좋아해요?', ro: 'yeoreum joahaeyo?', zh: '喜欢夏天吗？' },
      { speaker: 'B', ko: '네, 여름을 제일 좋아해요.', ro: 'ne, yeoreumeul jeil joahaeyo.', zh: '嗯，我最喜欢夏天。' },
    ],
  },
  ㅗ: {
    words: [
      { ko: '코', ro: 'ko', zh: '鼻子' },
      { ko: '손', ro: 'son', zh: '手' },
      { ko: '옷', ro: 'ot', zh: '衣服' },
      { ko: '꽃', ro: 'kkot', zh: '花' },
      { ko: '봄', ro: 'bom', zh: '春天' },
      { ko: '동생', ro: 'dongsaeng', zh: '弟弟妹妹' },
    ],
    mini: [
      { speaker: 'A', ko: '손 아파요?', ro: 'son apayo?', zh: '手疼吗？' },
      { speaker: 'B', ko: '아니요, 괜찮아요.', ro: 'aniyo, gwaenchanhayo.', zh: '不，没事。' },
    ],
  },
  ㅛ: {
    words: [
      { ko: '교실', ro: 'gyosil', zh: '教室' },
      { ko: '요리', ro: 'yori', zh: '烹饪' },
      { ko: '쇼핑', ro: 'syoping', zh: '购物' },
      { ko: '학교', ro: 'hakgyo', zh: '学校' },
      { ko: '월요일', ro: 'woryoil', zh: '星期一' },
      { ko: '금요일', ro: 'geumyoil', zh: '星期五' },
    ],
    mini: [
      { speaker: 'A', ko: '월요일에 시간 있어요?', ro: 'woryoire sigan isseoyo?', zh: '星期一有时间吗？' },
      { speaker: 'B', ko: '아니요, 금요일은 어때요?', ro: 'aniyo, geumyoireun eottaeyo?', zh: '没有，星期五怎么样？' },
    ],
  },
  ㅜ: {
    words: [
      { ko: '물', ro: 'mul', zh: '水' },
      { ko: '누나', ro: 'nuna', zh: '姐姐' },
      { ko: '수박', ro: 'subak', zh: '西瓜' },
      { ko: '우유', ro: 'uyu', zh: '牛奶' },
      { ko: '우산', ro: 'usan', zh: '雨伞' },
      { ko: '주말', ro: 'jumal', zh: '周末' },
    ],
    mini: [
      { speaker: 'A', ko: '물 좀 주세요.', ro: 'mul jom juseyo.', zh: '请给我点水。' },
      { speaker: 'B', ko: '네, 여기 있어요.', ro: 'ne, yeogi isseoyo.', zh: '好的，给你。' },
    ],
  },
  ㅠ: {
    words: [
      { ko: '육', ro: 'yuk', zh: '六' },
      { ko: '휴대폰', ro: 'hyudaepon', zh: '手机' },
      { ko: '컴퓨터', ro: 'keompyuteo', zh: '电脑' },
      { ko: '휴가', ro: 'hyuga', zh: '休假' },
      { ko: '교육', ro: 'gyoyuk', zh: '教育' },
      { ko: '우유', ro: 'uyu', zh: '牛奶' },
    ],
    mini: [
      { speaker: 'A', ko: '휴대폰 어디 있어요?', ro: 'hyudaepon eodi isseoyo?', zh: '手机在哪里？' },
      { speaker: 'B', ko: '가방 안에 있어요.', ro: 'gabang ane isseoyo.', zh: '在包里。' },
    ],
  },
  ㅡ: {
    words: [
      { ko: '은행', ro: 'eunhaeng', zh: '银行' },
      { ko: '음악', ro: 'eumak', zh: '音乐' },
      { ko: '등산', ro: 'deungsan', zh: '爬山' },
      { ko: '크다', ro: 'keuda', zh: '大' },
      { ko: '듣다', ro: 'deutda', zh: '听' },
      { ko: '스무', ro: 'seumu', zh: '二十（岁）' },
    ],
    mini: [
      { speaker: 'A', ko: '음악 듣는 거 좋아해요?', ro: 'eumak deutneun geo joahaeyo?', zh: '喜欢听音乐吗？' },
      { speaker: 'B', ko: '네, 저는 매일 들어요.', ro: 'ne, jeoneun maeil deureoyo.', zh: '嗯，我每天都听。' },
    ],
  },
  ㅣ: {
    words: [
      { ko: '집', ro: 'jip', zh: '家' },
      { ko: '비', ro: 'bi', zh: '雨' },
      { ko: '이모', ro: 'imo', zh: '姨妈' },
      { ko: '김치', ro: 'gimchi', zh: '泡菜' },
      { ko: '김밥', ro: 'gimbap', zh: '紫菜包饭' },
      { ko: '십', ro: 'sip', zh: '十' },
    ],
    mini: [
      { speaker: 'A', ko: '집에 가요?', ro: 'jibe gayo?', zh: '要回家了吗？' },
      { speaker: 'B', ko: '네, 비가 와서요.', ro: 'ne, biga waseoyo.', zh: '嗯，因为下雨了。' },
    ],
  },

  // ---- 复合元音 ----
  ㅐ: {
    words: [
      { ko: '배', ro: 'bae', zh: '肚子' },
      { ko: '책', ro: 'chaek', zh: '书' },
      { ko: '개', ro: 'gae', zh: '狗' },
      { ko: '새', ro: 'sae', zh: '鸟' },
      { ko: '내일', ro: 'naeil', zh: '明天' },
      { ko: '맵다', ro: 'maepda', zh: '辣' },
    ],
    mini: [
      { speaker: 'A', ko: '내일 뭐 해요?', ro: 'naeil mwo haeyo?', zh: '明天做什么？' },
      { speaker: 'B', ko: '책 읽을 거예요.', ro: 'chaek ilgeul geoyeyo.', zh: '打算看书。' },
    ],
  },
  ㅒ: {
    words: [
      { ko: '얘', ro: 'yae', zh: '这孩子（口语）' },
      { ko: '얘기', ro: 'yaegi', zh: '聊天/故事（口语）' },
      { ko: '걔', ro: 'gyae', zh: '那家伙（口语）' },
    ],
    mini: [
      { speaker: 'A', ko: '얘, 이리 와 봐.', ro: 'yae, iri wa bwa.', zh: '喂，过来一下。' },
      { speaker: 'B', ko: '왜 그래요?', ro: 'wae geuraeyo?', zh: '怎么了？' },
    ],
  },
  ㅔ: {
    words: [
      { ko: '네', ro: 'ne', zh: '是/好' },
      { ko: '게임', ro: 'geim', zh: '游戏' },
      { ko: '베개', ro: 'begae', zh: '枕头' },
      { ko: '세탁기', ro: 'setakgi', zh: '洗衣机' },
      { ko: '에어컨', ro: 'eeokeon', zh: '空调' },
      { ko: '넷', ro: 'net', zh: '四个' },
    ],
    mini: [
      { speaker: 'A', ko: '게임 할래요?', ro: 'geim hallaeyo?', zh: '要玩游戏吗？' },
      { speaker: 'B', ko: '네, 좋아요!', ro: 'ne, joayo!', zh: '好啊！' },
    ],
  },
  ㅖ: {
    words: [
      { ko: '계란', ro: 'gyeran', zh: '鸡蛋' },
      { ko: '예쁘다', ro: 'yeppeuda', zh: '漂亮' },
      { ko: '시계', ro: 'sigye', zh: '手表' },
      { ko: '계획', ro: 'gyehoek', zh: '计划' },
      { ko: '계절', ro: 'gyejeol', zh: '季节' },
      { ko: '실례합니다', ro: 'sillyehamnida', zh: '不好意思，打扰了' },
    ],
    mini: [
      { speaker: 'A', ko: '이거 예쁘죠?', ro: 'igeo yeppeujyo?', zh: '这个很漂亮吧？' },
      { speaker: 'B', ko: '네, 정말 예뻐요.', ro: 'ne, jeongmal yeppeoyo.', zh: '嗯，真的很漂亮。' },
    ],
  },
  ㅘ: {
    words: [
      { ko: '과일', ro: 'gwail', zh: '水果' },
      { ko: '사과', ro: 'sagwa', zh: '苹果' },
      { ko: '전화', ro: 'jeonhwa', zh: '电话' },
      { ko: '영화', ro: 'yeonghwa', zh: '电影' },
      { ko: '화요일', ro: 'hwayoil', zh: '星期二' },
      { ko: '와이파이', ro: 'waipai', zh: 'WiFi' },
    ],
    mini: [
      { speaker: 'A', ko: '무슨 과일 좋아해요?', ro: 'museun gwail joahaeyo?', zh: '喜欢什么水果？' },
      { speaker: 'B', ko: '사과를 제일 좋아해요.', ro: 'sagwareul jeil joahaeyo.', zh: '我最喜欢苹果。' },
    ],
  },
  ㅙ: {
    words: [
      { ko: '왜', ro: 'wae', zh: '为什么' },
      { ko: '돼지', ro: 'dwaeji', zh: '猪' },
      { ko: '괜찮아요', ro: 'gwaenchanhayo', zh: '没关系' },
      { ko: '걱정되다', ro: 'geokjeongdoeda', zh: '担心' },
      { ko: '긴장되다', ro: 'ginjangdoeda', zh: '紧张' },
      { ko: '됐어요', ro: 'dwaesseoyo', zh: '好了/算了' },
    ],
    mini: [
      { speaker: 'A', ko: '왜 그래요? 괜찮아요?', ro: 'wae geuraeyo? gwaenchanhayo?', zh: '怎么了？没事吧？' },
      { speaker: 'B', ko: '네, 괜찮아요.', ro: 'ne, gwaenchanhayo.', zh: '嗯，没事。' },
    ],
  },
  ㅚ: {
    words: [
      { ko: '회사', ro: 'hoesa', zh: '公司' },
      { ko: '왼쪽', ro: 'oenjjok', zh: '左边' },
      { ko: '열쇠', ro: 'yeolsoe', zh: '钥匙' },
      { ko: '죄송합니다', ro: 'joesonghamnida', zh: '对不起' },
      { ko: '외롭다', ro: 'oeropda', zh: '孤独' },
      { ko: '회색', ro: 'hoesaek', zh: '灰色' },
    ],
    mini: [
      { speaker: 'A', ko: '회사 어디예요?', ro: 'hoesa eodiyeyo?', zh: '公司在哪里？' },
      { speaker: 'B', ko: '왼쪽으로 가면 있어요.', ro: 'oenjjogeuro gamyeon isseoyo.', zh: '往左走就到了。' },
    ],
  },
  ㅝ: {
    words: [
      { ko: '뭐', ro: 'mwo', zh: '什么' },
      { ko: '공원', ro: 'gongwon', zh: '公园' },
      { ko: '병원', ro: 'byeongwon', zh: '医院' },
      { ko: '고마워요', ro: 'gomawoyo', zh: '谢谢' },
      { ko: '더워요', ro: 'deowoyo', zh: '热' },
      { ko: '월요일', ro: 'woryoil', zh: '星期一' },
    ],
    mini: [
      { speaker: 'A', ko: '오늘 뭐 해요?', ro: 'oneul mwo haeyo?', zh: '今天做什么？' },
      { speaker: 'B', ko: '공원에 가요.', ro: 'gongwone gayo.', zh: '去公园。' },
    ],
  },
  ㅞ: {
    words: [
      { ko: '스웨터', ro: 'seuweteo', zh: '毛衣' },
      { ko: '웨이터', ro: 'weiteo', zh: '服务员' },
      { ko: '웬일이에요', ro: 'wenirieyo', zh: '怎么回事/什么风把你吹来了' },
    ],
    mini: [
      { speaker: 'A', ko: '이 스웨터 어때요?', ro: 'i seuweteo eottaeyo?', zh: '这件毛衣怎么样？' },
      { speaker: 'B', ko: '예쁘네요!', ro: 'yeppeuneyo!', zh: '很好看！' },
    ],
  },
  ㅟ: {
    words: [
      { ko: '귀', ro: 'gwi', zh: '耳朵' },
      { ko: '위', ro: 'wi', zh: '上面' },
      { ko: '뒤', ro: 'dwi', zh: '后面' },
      { ko: '쉬다', ro: 'swida', zh: '休息' },
      { ko: '쉽다', ro: 'swipda', zh: '容易' },
      { ko: '귀엽다', ro: 'gwiyeopda', zh: '可爱' },
    ],
    mini: [
      { speaker: 'A', ko: '오늘 좀 쉬세요.', ro: 'oneul jom swiseyo.', zh: '今天休息一下吧。' },
      { speaker: 'B', ko: '네, 집에서 쉴 거예요.', ro: 'ne, jibeseo swil geoyeyo.', zh: '好，我打算在家休息。' },
    ],
  },
  ㅢ: {
    words: [
      { ko: '흰색', ro: 'huinsaek', zh: '白色' },
      { ko: '의사', ro: 'uisa', zh: '医生' },
      { ko: '의자', ro: 'uija', zh: '椅子' },
      { ko: '편의점', ro: 'pyeonuijeom', zh: '便利店' },
      { ko: '의미', ro: 'uimi', zh: '意义' },
      { ko: '회의', ro: 'hoeui', zh: '会议' },
    ],
    mini: [
      { speaker: 'A', ko: '의자 여기 있어요.', ro: 'uija yeogi isseoyo.', zh: '椅子在这里。' },
      { speaker: 'B', ko: '감사합니다.', ro: 'gamsahamnida.', zh: '谢谢。' },
    ],
  },

  // ---- 基本辅音 ----
  ㄱ: {
    words: [
      { ko: '가족', ro: 'gajok', zh: '家人' },
      { ko: '고기', ro: 'gogi', zh: '肉' },
      { ko: '김치', ro: 'gimchi', zh: '泡菜' },
      { ko: '가방', ro: 'gabang', zh: '包' },
      { ko: '과일', ro: 'gwail', zh: '水果' },
      { ko: '개', ro: 'gae', zh: '狗' },
    ],
    mini: [
      { speaker: 'A', ko: '가족이 몇 명이에요?', ro: 'gajogi myeot myeong-ieyo?', zh: '你家有几口人？' },
      { speaker: 'B', ko: '저는 가족이 넷이에요.', ro: 'jeoneun gajogi neosieyo.', zh: '我家四口人。' },
    ],
  },
  ㄴ: {
    words: [
      { ko: '눈', ro: 'nun', zh: '眼睛' },
      { ko: '누나', ro: 'nuna', zh: '姐姐' },
      { ko: '나무', ro: 'namu', zh: '树' },
      { ko: '내일', ro: 'naeil', zh: '明天' },
      { ko: '누구', ro: 'nugu', zh: '谁' },
      { ko: '노트북', ro: 'noteubuk', zh: '笔记本电脑' },
    ],
    mini: [
      { speaker: 'A', ko: '이거 누구예요?', ro: 'igeo nuguyeyo?', zh: '这是谁？' },
      { speaker: 'B', ko: '제 누나예요.', ro: 'je nunayeyo.', zh: '是我姐姐。' },
    ],
  },
  ㄷ: {
    words: [
      { ko: '달', ro: 'dal', zh: '月亮' },
      { ko: '돈', ro: 'don', zh: '钱' },
      { ko: '동생', ro: 'dongsaeng', zh: '弟弟妹妹' },
      { ko: '다리', ro: 'dari', zh: '腿' },
      { ko: '듣다', ro: 'deutda', zh: '听' },
      { ko: '등산', ro: 'deungsan', zh: '爬山' },
    ],
    mini: [
      { speaker: 'A', ko: '동생 있어요?', ro: 'dongsaeng isseoyo?', zh: '你有弟弟妹妹吗？' },
      { speaker: 'B', ko: '네, 여동생이 한 명 있어요.', ro: 'ne, yeodongsaengi han myeong isseoyo.', zh: '有，一个妹妹。' },
    ],
  },
  ㄹ: {
    words: [
      { ko: '라면', ro: 'ramyeon', zh: '拉面' },
      { ko: '물', ro: 'mul', zh: '水' },
      { ko: '발', ro: 'bal', zh: '脚' },
      { ko: '별', ro: 'byeol', zh: '星星' },
      { ko: '얼굴', ro: 'eolgul', zh: '脸' },
      { ko: '딸', ro: 'ttal', zh: '女儿' },
    ],
    mini: [
      { speaker: 'A', ko: '라면 먹을래요?', ro: 'ramyeon meogeullaeyo?', zh: '要吃拉面吗？' },
      { speaker: 'B', ko: '네, 좋아요!', ro: 'ne, joayo!', zh: '好啊！' },
    ],
  },
  ㅁ: {
    words: [
      { ko: '물', ro: 'mul', zh: '水' },
      { ko: '머리', ro: 'meori', zh: '头' },
      { ko: '모자', ro: 'moja', zh: '帽子' },
      { ko: '먹다', ro: 'meokda', zh: '吃' },
      { ko: '맵다', ro: 'maepda', zh: '辣' },
      { ko: '뭐', ro: 'mwo', zh: '什么' },
    ],
    mini: [
      { speaker: 'A', ko: '뭐 먹을까요?', ro: 'mwo meogeulkkayo?', zh: '吃点什么呢？' },
      { speaker: 'B', ko: '라면 어때요?', ro: 'ramyeon eottaeyo?', zh: '拉面怎么样？' },
    ],
  },
  ㅂ: {
    words: [
      { ko: '밥', ro: 'bap', zh: '饭' },
      { ko: '비', ro: 'bi', zh: '雨' },
      { ko: '봄', ro: 'bom', zh: '春天' },
      { ko: '방', ro: 'bang', zh: '房间' },
      { ko: '병원', ro: 'byeongwon', zh: '医院' },
      { ko: '바다', ro: 'bada', zh: '大海' },
    ],
    mini: [
      { speaker: 'A', ko: '밖에 비가 와요.', ro: 'bakke biga wayo.', zh: '外面在下雨。' },
      { speaker: 'B', ko: '우산 가져가세요.', ro: 'usan gajyeogaseyo.', zh: '带把伞去吧。' },
    ],
  },
  ㅅ: {
    words: [
      { ko: '손', ro: 'son', zh: '手' },
      { ko: '산', ro: 'san', zh: '山' },
      { ko: '사과', ro: 'sagwa', zh: '苹果' },
      { ko: '수박', ro: 'subak', zh: '西瓜' },
      { ko: '삼촌', ro: 'samchon', zh: '叔叔' },
      { ko: '새', ro: 'sae', zh: '鸟' },
    ],
    mini: [
      { speaker: 'A', ko: '손 씻었어요?', ro: 'son ssiseosseoyo?', zh: '洗手了吗？' },
      { speaker: 'B', ko: '네, 씻었어요.', ro: 'ne, ssiseosseoyo.', zh: '嗯，洗了。' },
    ],
  },
  ㅇ: {
    words: [
      { ko: '오', ro: 'o', zh: '五' },
      { ko: '입', ro: 'ip', zh: '嘴' },
      { ko: '옷', ro: 'ot', zh: '衣服' },
      { ko: '역', ro: 'yeok', zh: '车站' },
      { ko: '위', ro: 'wi', zh: '上面' },
      { ko: '앞', ro: 'ap', zh: '前面' },
    ],
    mini: [
      { speaker: 'A', ko: '역 앞에서 만나요.', ro: 'yeok apeseo mannayo.', zh: '车站前面见。' },
      { speaker: 'B', ko: '네, 좋아요.', ro: 'ne, joayo.', zh: '好的。' },
    ],
  },
  ㅈ: {
    words: [
      { ko: '집', ro: 'jip', zh: '家' },
      { ko: '전화', ro: 'jeonhwa', zh: '电话' },
      { ko: '지갑', ro: 'jigap', zh: '钱包' },
      { ko: '점심', ro: 'jeomsim', zh: '中午' },
      { ko: '저녁', ro: 'jeonyeok', zh: '晚上' },
      { ko: '주말', ro: 'jumal', zh: '周末' },
    ],
    mini: [
      { speaker: 'A', ko: '지갑 어디 있어요?', ro: 'jigap eodi isseoyo?', zh: '钱包在哪里？' },
      { speaker: 'B', ko: '가방 안에 있어요.', ro: 'gabang ane isseoyo.', zh: '在包里。' },
    ],
  },
  ㅊ: {
    words: [
      { ko: '차', ro: 'cha', zh: '茶' },
      { ko: '책', ro: 'chaek', zh: '书' },
      { ko: '치킨', ro: 'chikin', zh: '炸鸡' },
      { ko: '치마', ro: 'chima', zh: '裙子' },
      { ko: '책상', ro: 'chaeksang', zh: '书桌' },
      { ko: '축구', ro: 'chukgu', zh: '足球' },
    ],
    mini: [
      { speaker: 'A', ko: '축구 좋아해요?', ro: 'chukgu joahaeyo?', zh: '喜欢足球吗？' },
      { speaker: 'B', ko: '네, 매일 봐요.', ro: 'ne, maeil bwayo.', zh: '嗯，每天都看。' },
    ],
  },
  ㅋ: {
    words: [
      { ko: '코', ro: 'ko', zh: '鼻子' },
      { ko: '커피', ro: 'keopi', zh: '咖啡' },
      { ko: '콜라', ro: 'kolla', zh: '可乐' },
      { ko: '카페', ro: 'kape', zh: '咖啡馆' },
      { ko: '카드', ro: 'kadeu', zh: '信用卡' },
      { ko: '컴퓨터', ro: 'keompyuteo', zh: '电脑' },
    ],
    mini: [
      { speaker: 'A', ko: '커피 마셔요, 콜라 마셔요?', ro: 'keopi masyeoyo, kolla masyeoyo?', zh: '喝咖啡还是可乐？' },
      { speaker: 'B', ko: '저는 커피 마실게요.', ro: 'jeoneun keopi masilgeyo.', zh: '我喝咖啡吧。' },
    ],
  },
  ㅌ: {
    words: [
      { ko: '타다', ro: 'tada', zh: '乘坐' },
      { ko: '토끼', ro: 'tokki', zh: '兔子' },
      { ko: '택시', ro: 'taeksi', zh: '出租车' },
      { ko: '토요일', ro: 'toyoil', zh: '星期六' },
      { ko: '티셔츠', ro: 'tisyeocheu', zh: 'T恤' },
      { ko: '텔레비전', ro: 'tellebijeon', zh: '电视' },
    ],
    mini: [
      { speaker: 'A', ko: '택시 탈까요?', ro: 'taeksi talkkayo?', zh: '要打车吗？' },
      { speaker: 'B', ko: '네, 그게 좋겠어요.', ro: 'ne, geuge jokesseoyo.', zh: '好，那样更好。' },
    ],
  },
  ㅍ: {
    words: [
      { ko: '팔', ro: 'pal', zh: '胳膊' },
      { ko: '피자', ro: 'pija', zh: '披萨' },
      { ko: '편의점', ro: 'pyeonuijeom', zh: '便利店' },
      { ko: '파란색', ro: 'paransaek', zh: '蓝色' },
      { ko: '피곤하다', ro: 'pigonhada', zh: '疲惫' },
      { ko: '피부', ro: 'pibu', zh: '皮肤' },
    ],
    mini: [
      { speaker: 'A', ko: '많이 피곤해요?', ro: 'mani pigonhaeyo?', zh: '很累吗？' },
      { speaker: 'B', ko: '네, 좀 피곤해요.', ro: 'ne, jom pigonhaeyo.', zh: '嗯，有点累。' },
    ],
  },
  ㅎ: {
    words: [
      { ko: '형', ro: 'hyeong', zh: '哥哥' },
      { ko: '학교', ro: 'hakgyo', zh: '学校' },
      { ko: '하늘', ro: 'haneul', zh: '天空' },
      { ko: '학생', ro: 'haksaeng', zh: '学生' },
      { ko: '할인', ro: 'harin', zh: '打折' },
      { ko: '현금', ro: 'hyeongeum', zh: '现金' },
    ],
    mini: [
      { speaker: 'A', ko: '학생이에요?', ro: 'haksaeng-ieyo?', zh: '你是学生吗？' },
      { speaker: 'B', ko: '네, 대학생이에요.', ro: 'ne, daehaksaeng-ieyo.', zh: '是，我是大学生。' },
    ],
  },

  // ---- 双辅音 ----
  ㄲ: {
    words: [
      { ko: '꽃', ro: 'kkot', zh: '花' },
      { ko: '어깨', ro: 'eokkae', zh: '肩膀' },
      { ko: '토끼', ro: 'tokki', zh: '兔子' },
      { ko: '코끼리', ro: 'kokkiri', zh: '大象' },
      { ko: '떡볶이', ro: 'tteokbokki', zh: '辣炒年糕' },
      { ko: '밖', ro: 'bak', zh: '外面' },
    ],
    mini: [
      { speaker: 'A', ko: '이 꽃 얼마예요?', ro: 'i kkot eolmayeyo?', zh: '这花多少钱？' },
      { speaker: 'B', ko: '오천 원이에요.', ro: 'ocheon won-ieyo.', zh: '五千韩元。' },
    ],
  },
  ㄸ: {
    words: [
      { ko: '딸', ro: 'ttal', zh: '女儿' },
      { ko: '딸기', ro: 'ttalgi', zh: '草莓' },
      { ko: '뛰다', ro: 'ttwida', zh: '跑' },
      { ko: '떡볶이', ro: 'tteokbokki', zh: '辣炒年糕' },
      { ko: '뜨겁다', ro: 'tteugeopda', zh: '烫' },
      { ko: '똑똑하다', ro: 'ttokttokhada', zh: '聪明' },
    ],
    mini: [
      { speaker: 'A', ko: '딸기 좋아해요?', ro: 'ttalgi joahaeyo?', zh: '喜欢草莓吗？' },
      { speaker: 'B', ko: '네, 진짜 좋아해요!', ro: 'ne, jinjja joahaeyo!', zh: '嗯，超喜欢！' },
    ],
  },
  ㅃ: {
    words: [
      { ko: '빵', ro: 'ppang', zh: '面包' },
      { ko: '빨간색', ro: 'ppalgansaek', zh: '红色' },
      { ko: '빠르다', ro: 'ppareuda', zh: '快' },
      { ko: '아빠', ro: 'appa', zh: '爸爸' },
      { ko: '예쁘다', ro: 'yeppeuda', zh: '漂亮' },
      { ko: '기쁘다', ro: 'gippeuda', zh: '高兴' },
    ],
    mini: [
      { speaker: 'A', ko: '이 빵 진짜 맛있어요.', ro: 'i ppang jinjja masisseoyo.', zh: '这面包真好吃。' },
      { speaker: 'B', ko: '저도 하나 먹어 볼래요.', ro: 'jeodo hana meogeo bollaeyo.', zh: '我也想吃一个试试。' },
    ],
  },
  ㅆ: {
    words: [
      { ko: '쓰다', ro: 'sseuda', zh: '写/使用' },
      { ko: '씻다', ro: 'ssitda', zh: '洗' },
      { ko: '싸다', ro: 'ssada', zh: '便宜' },
      { ko: '비싸다', ro: 'bissada', zh: '贵' },
      { ko: '맛있다', ro: 'masitda', zh: '好吃' },
      { ko: '재미있다', ro: 'jaemiitda', zh: '有趣' },
    ],
    mini: [
      { speaker: 'A', ko: '이거 너무 비싸요.', ro: 'igeo neomu bissayo.', zh: '这个太贵了。' },
      { speaker: 'B', ko: '저건 좀 싸요.', ro: 'jeogeon jom ssayo.', zh: '那个便宜一些。' },
    ],
  },
  ㅉ: {
    words: [
      { ko: '짜다', ro: 'jjada', zh: '咸' },
      { ko: '왼쪽', ro: 'oenjjok', zh: '左边' },
      { ko: '오른쪽', ro: 'oreunjjok', zh: '右边' },
      { ko: '진짜', ro: 'jinjja', zh: '真的' },
      { ko: '짜장면', ro: 'jjajangmyeon', zh: '炸酱面' },
      { ko: '찍다', ro: 'jjikda', zh: '拍照' },
    ],
    mini: [
      { speaker: 'A', ko: '이 김치 좀 짜요.', ro: 'i gimchi jom jjayo.', zh: '这泡菜有点咸。' },
      { speaker: 'B', ko: '진짜요? 저는 괜찮은데요.', ro: 'jinjjayo? jeoneun gwaenchaneundeyo.', zh: '真的吗？我觉得还好。' },
    ],
  },
}

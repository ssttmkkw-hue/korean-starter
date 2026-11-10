// 入门课程：从零设计的建议学习路线，强调"先囫囵学会，再慢慢补细节"
// 每节课都是独立的，不需要按顺序、不需要先学完字母——这是理念的一部分，不是缺省行为
//
// 每课四段：
//   intro    相关介绍（why 是设计思路；blocks 是用法/文化/易错点小块）
//   teach    本课主角（核心条目）；words 是相关扩展词，两者合起来就是复习范围
//   dialogues 小对话（A=女声，B=男声）
//   复习环节由 LessonReview 组件自动用 teach+words+dialogues 生成多种模式
// 字母类条目：ko 显示字母，audio 指定拼读音节；gloss 是复习时用的简短释义（没有就用 zh）
// 同一课里 ko 和 gloss 都不要重复（复习配对游戏靠它们区分）

export const lessonsIntro =
  '这套课程只是个建议路线，不是打卡任务：不用按顺序学，也不需要先学完字母才能往下走——每一课都是独立的，挑感兴趣的看就行，能记多少算多少，混个眼熟也是学会的一种方式。每课分四段：先了解、认单词、听小对话、最后用多种方式复习。'

export const lessons = [
  {
    id: 'l1',
    title: '第 1 课 · 先学会打招呼，别管字母',
    tagline: '语言是先会用、再懂原理',
    why: '大部分人一开始被 40 个字母吓到，还没张嘴就先放弃了。其实完全不用这样——这一课跳过字母，直接学 4 句就算一个字母都不认识、照着音也能模仿说出口的话。等哪天好奇"这句话到底怎么拼出来的"，再去查字母表也不迟。',
    blocks: [
      {
        icon: '💬',
        heading: '这几句什么时候用',
        text: '안녕하세요 是"你好"，早中晚见面都能说；要注意告别不是同一句，要换成 안녕히 가세요 / 안녕히 계세요。감사합니다 是"谢谢"，正式又稳妥，对谁都不会出错，买完东西、问完路顺口说一句，对方印象会很好。네 / 아니요 是最基本的"是 / 不是"。',
      },
      {
        icon: '🙇',
        heading: '小礼仪：微微点头就够了',
        text: '韩国人打招呼常常配上点头或鞠躬，对长辈、陌生人、店员更明显。你不用鞠得很深，微微低头加上一句 안녕하세요 就非常得体了。',
      },
      {
        icon: '✨',
        heading: '为什么结尾都是 -요 / -니다',
        text: '这几句的结尾（-세요 / -니다 / -요）都是敬语形式，对陌生人、老师、店员用这一类准没错。关系很熟的朋友之间才会说更随意的 "안녕""고마워"（叫"반말"）。初学阶段先只用敬语版本就好。',
      },
    ],
    teach: [
      { ko: '안녕하세요', ro: 'annyeong-haseyo', zh: '你好', tip: '见面时说，早中晚都能用（告别要换句）' },
      { ko: '감사합니다', ro: 'gamsahamnida', zh: '谢谢', tip: '正式场合、任何人都能用，不会出错' },
      { ko: '네', ro: 'ne', zh: '是 / 好的', tip: '点头附和、答应对方都用这个字' },
      { ko: '아니요', ro: 'aniyo', zh: '不是', tip: '"네"的反义词，两个搭配着记' },
    ],
    words: [
      { ko: '안녕히 가세요', ro: 'annyeonghi gaseyo', zh: '再见（对要离开的人说）' },
      { ko: '안녕히 계세요', ro: 'annyeonghi gyeseyo', zh: '再见（对留下的人说）' },
      { ko: '고마워요', ro: 'gomawoyo', zh: '谢谢（口语）' },
      { ko: '천만에요', ro: 'cheonmaneyo', zh: '不客气' },
      { ko: '미안해요', ro: 'mianhaeyo', zh: '对不起（口语）' },
      { ko: '죄송합니다', ro: 'joesonghamnida', zh: '对不起（正式）' },
      { ko: '반갑습니다', ro: 'bangapseumnida', zh: '很高兴认识你' },
      { ko: '실례합니다', ro: 'sillyehamnida', zh: '不好意思，打扰了' },
    ],
    dialogues: [
      {
        id: 'l1-d1',
        title: '街上初次见面',
        situation: '在路上遇到新邻居',
        lines: [
          { speaker: 'A', ko: '안녕하세요.', ro: 'annyeonghaseyo.', zh: '你好。' },
          { speaker: 'B', ko: '안녕하세요. 반갑습니다.', ro: 'annyeonghaseyo. bangapseumnida.', zh: '你好，很高兴认识你。' },
          { speaker: 'A', ko: '네, 반갑습니다.', ro: 'ne, bangapseumnida.', zh: '嗯，我也很高兴认识你。' },
        ],
      },
      {
        id: 'l1-d2',
        title: '买完东西道谢',
        situation: '在便利店结完账',
        lines: [
          { speaker: 'A', ko: '여기 있어요.', ro: 'yeogi isseoyo.', zh: '给您。' },
          { speaker: 'B', ko: '감사합니다.', ro: 'gamsahamnida.', zh: '谢谢。' },
          { speaker: 'A', ko: '안녕히 가세요.', ro: 'annyeonghi gaseyo.', zh: '慢走。' },
          { speaker: 'B', ko: '안녕히 계세요.', ro: 'annyeonghi gyeseyo.', zh: '再见（请留步）。' },
        ],
      },
      {
        id: 'l1-d3',
        title: '不小心碰到别人',
        situation: '在拥挤的地铁里',
        lines: [
          { speaker: 'A', ko: '죄송합니다.', ro: 'joesonghamnida.', zh: '对不起。' },
          { speaker: 'B', ko: '괜찮아요.', ro: 'gwaenchanhayo.', zh: '没关系。（第7课会细讲）' },
          { speaker: 'A', ko: '감사합니다.', ro: 'gamsahamnida.', zh: '谢谢。' },
        ],
      },
    ],
  },
  {
    id: 'l2',
    title: '第 2 课 · 先认 5 个最眼熟的字母就够了',
    tagline: '不用一次认全 40 个',
    why: '不需要一口气学完所有字母。这 5 个是韩语单词里出现频率最高的几个（ㅏㅣㄱㄴㅇ），先把这几个的样子和声音对上号，接下来看什么词都会觉得"咦这个我认识"，成就感才是学下去的动力。剩下的字母，等这几个混熟了自然会想多学几个——不着急。',
    blocks: [
      {
        icon: '🧩',
        heading: '韩文是"拼块"的',
        text: '韩文字母不是一个个排成一行，而是辅音和元音拼成一个方块：ㄱ + ㅏ = 가，ㄴ + ㅏ = 나，ㅇ + ㅣ = 이，ㄴ + ㅣ = 니。每个方块就是一个音节，读法就是"辅音音 + 元音音"。看懂这个规律，比硬背字母表更重要。',
      },
      {
        icon: '⭕',
        heading: 'ㅇ 是个"隐身字母"',
        text: 'ㅇ 在音节开头时完全不发音，只是占位，让方块看起来完整（아 = 啊，이 = 衣）；只有放在音节下面当收音时才发"ng"的鼻音。所以看到词首的圈，直接略过它读后面的元音就行。',
      },
      {
        icon: '👀',
        heading: '先混眼熟，别急着背',
        text: '这一课的目标不是"记住"，而是"看到时有印象"。读下面的对话时，试着在句子里找 ㅏ ㅣ ㄱ ㄴ ㅇ，找到一个就算赢一次。',
      },
    ],
    teach: [
      { ko: 'ㅏ', audio: '아', gloss: 'a（啊）', ro: 'a', zh: '嘴巴自然张大，像"啊"', tip: '例词：가족(家人) 里就有这个音' },
      { ko: 'ㅣ', audio: '이', gloss: 'i（衣）', ro: 'i', zh: '嘴角咧开，像"衣"', tip: '例词：김치(泡菜) 里就有这个音' },
      { ko: 'ㄱ', audio: '가', gloss: 'g/k（哥）', ro: 'g/k', zh: '舌根抵住上颚再放开', tip: '例词：가방(包) 的第一个音' },
      { ko: 'ㄴ', audio: '나', gloss: 'n（呢）', ro: 'n', zh: '舌尖抵住上齿龈，鼻音', tip: '例词：누나(姐姐) 的第一个音' },
      { ko: 'ㅇ', audio: '아', gloss: '不发音的占位', ro: '（词首不发音）', zh: '在字首只是占位，不发音', tip: '例词：아니요 开头那个圈就是它' },
    ],
    words: [
      { ko: '나이', ro: 'nai', zh: '年龄' },
      { ko: '아이', ro: 'ai', zh: '孩子' },
      { ko: '아기', ro: 'agi', zh: '婴儿' },
      { ko: '나', ro: 'na', zh: '我（朋友间的说法）' },
      { ko: '이', ro: 'i', zh: '二；这' },
      { ko: '아니', ro: 'ani', zh: '不（随意说法）' },
    ],
    dialogues: [
      {
        id: 'l2-d1',
        title: '问年龄',
        situation: '听听看，里面藏着你认识的字母',
        lines: [
          { speaker: 'A', ko: '나이가 몇 살이에요?', ro: 'naiga myeot sarieyo?', zh: '你多大了？' },
          { speaker: 'B', ko: '스무 살이에요.', ro: 'seumu sarieyo.', zh: '我二十岁。' },
          { speaker: 'A', ko: '아, 저도 스무 살이에요.', ro: 'a, jeodo seumu sarieyo.', zh: '啊，我也是二十岁。' },
        ],
      },
      {
        id: 'l2-d2',
        title: '看到一个宝宝',
        situation: '在公园里',
        lines: [
          { speaker: 'A', ko: '저 아이는 누구예요?', ro: 'jeo aineun nuguyeyo?', zh: '那个孩子是谁？' },
          { speaker: 'B', ko: '우리 아기예요.', ro: 'uri agiyeyo.', zh: '是我们家的宝宝。' },
          { speaker: 'A', ko: '아, 귀여워요!', ro: 'a, gwiyeowoyo!', zh: '啊，好可爱！' },
        ],
      },
      {
        id: 'l2-d3',
        title: '约着一起走',
        situation: '下课后',
        lines: [
          { speaker: 'A', ko: '같이 가요?', ro: 'gachi gayo?', zh: '一起走吗？' },
          { speaker: 'B', ko: '네, 가요!', ro: 'ne, gayo!', zh: '好，走吧！' },
        ],
      },
    ],
  },
  {
    id: 'l3',
    title: '第 3 课 · 用一个句型自我介绍',
    tagline: '记一个模板，比死背单词表有用',
    why: '与其孤立地背单词，不如现在就能说一句完整的话。"저는 ___예요"（我是___）这一个句子模板，换上名字、身份，就是一句地道的自我介绍。语法为什么这么变先不用管，把这句话整个刻进肌肉记忆就行——想多练几个词代入，去"造句练习"板块能玩到更多。',
    blocks: [
      {
        icon: '🔄',
        heading: '예요 还是 이에요？看最后一个字',
        text: '"我是 OO"的结尾有两种：OO 的最后一个字下面有收音（比如 학생 的 ㅇ）就用 이에요；没有收音（比如 의사）就用 예요。这个规律站内"造句练习"板块会自动帮你拼，你只要多看几遍就有感觉。',
      },
      {
        icon: '🙋',
        heading: '저 和 나 都是"我"',
        text: '저 是谦称，对老师、陌生人、长辈、店员说话时用；나 是随意的说法，只在朋友之间用。自我介绍时一律用 저는 准没错。',
      },
      {
        icon: '📋',
        heading: '万能自我介绍三步',
        text: '① 안녕하세요 → ② 저는 ○○이에요（名字、身份、年龄都能往里放）→ ③ 만나서 반가워요。三句话就是一个完整的自我介绍，在哪个场合都能用。',
      },
    ],
    teach: [
      { ko: '저는 왕밍이에요', ro: 'jeoneun wangming-ieyo', zh: '我是王明', tip: '"저는 OO예요/이에요" = 我是OO' },
      { ko: '저는 학생이에요', ro: 'jeoneun haksaeng-ieyo', zh: '我是学生', tip: '换成身份也是同一个句型' },
      { ko: '스무 살', ro: 'seumu sal', zh: '20岁', tip: '年龄直接放进"저는 ___이에요"里说' },
      { ko: '만나서 반가워요', ro: 'mannaseo bangawoyo', zh: '见到你很高兴', tip: '自我介绍完，接这句收尾很自然' },
    ],
    words: [
      { ko: '저', ro: 'jeo', zh: '我（谦称）' },
      { ko: '이름', ro: 'ireum', zh: '名字' },
      { ko: '학생', ro: 'haksaeng', zh: '学生' },
      { ko: '선생님', ro: 'seonsaengnim', zh: '老师' },
      { ko: '회사원', ro: 'hoesawon', zh: '公司职员' },
      { ko: '중국 사람', ro: 'jungguk saram', zh: '中国人' },
      { ko: '한국 사람', ro: 'hanguk saram', zh: '韩国人' },
      { ko: '몇 살', ro: 'myeot sal', zh: '几岁' },
    ],
    dialogues: [
      {
        id: 'l3-d1',
        title: '互相自我介绍',
        situation: '语言交换活动上',
        lines: [
          { speaker: 'A', ko: '안녕하세요. 저는 민수예요.', ro: 'annyeonghaseyo. jeoneun minsuyeyo.', zh: '你好，我是民秀。' },
          { speaker: 'B', ko: '안녕하세요. 저는 왕밍이에요.', ro: 'annyeonghaseyo. jeoneun wangming-ieyo.', zh: '你好，我是王明。' },
          { speaker: 'A', ko: '만나서 반가워요.', ro: 'mannaseo bangawoyo.', zh: '见到你很高兴。' },
          { speaker: 'B', ko: '저도 반가워요.', ro: 'jeodo bangawoyo.', zh: '我也很高兴。' },
        ],
      },
      {
        id: 'l3-d2',
        title: '问名字和年龄',
        situation: '新同学之间',
        lines: [
          { speaker: 'A', ko: '이름이 뭐예요?', ro: 'ireumi mwoyeyo?', zh: '你叫什么名字？' },
          { speaker: 'B', ko: '저는 왕밍이에요.', ro: 'jeoneun wangming-ieyo.', zh: '我是王明。' },
          { speaker: 'A', ko: '몇 살이에요?', ro: 'myeot sarieyo?', zh: '你几岁？' },
          { speaker: 'B', ko: '스무 살이에요.', ro: 'seumu sarieyo.', zh: '二十岁。' },
        ],
      },
      {
        id: 'l3-d3',
        title: '问国籍和身份',
        situation: '在学校走廊',
        lines: [
          { speaker: 'A', ko: '중국 사람이에요?', ro: 'jungguk saramieyo?', zh: '你是中国人吗？' },
          { speaker: 'B', ko: '네, 중국 사람이에요. 학생이에요.', ro: 'ne, jungguk saramieyo. haksaeng-ieyo.', zh: '是的，我是中国人，是学生。' },
          { speaker: 'A', ko: '저도 학생이에요.', ro: 'jeodo haksaeng-ieyo.', zh: '我也是学生。' },
        ],
      },
    ],
  },
  {
    id: 'l4',
    title: '第 4 课 · 4 句在韩国活下来的话',
    tagline: '先囫囵学会，用的时候自然就懂了',
    why: '点餐、买东西、问路，这四句能应付大部分场合，属于"先整句背下来，以后自然拆解明白"的类型——不用现在就搞懂每个字为什么这么拼，先能张嘴说出来，比什么都强。',
    blocks: [
      {
        icon: '👉',
        heading: '"OO 주세요"：指着说就行',
        text: '주세요 是"请给我"。不会说东西的名字也没关系：指着东西说 이거 주세요（请给我这个）就能点餐、买东西。这是最省力、也最管用的一句。',
      },
      {
        icon: '💴',
        heading: '问价钱：얼마예요?',
        text: '얼마 是"多少"，얼마예요? 就是"多少钱？"。回答你会听到数字加 원（韩元），比如 오천 원（5000 韩元）。数字在第 6 课专门学。',
      },
      {
        icon: '🆘',
        heading: '真遇到麻烦怎么办',
        text: '도와주세요 是"请帮帮我"。在韩国紧急情况可以打 112（报警）和 119（火警 / 急救）。会说 도와주세요，再加上手势和指向，基本就能求助成功。',
      },
    ],
    teach: [
      { ko: '물 주세요', ro: 'mul juseyo', zh: '请给我水', tip: '"OO 주세요"是万能句型，换别的词也行' },
      { ko: '이거 얼마예요?', ro: 'igeo eolmayeyo?', zh: '这个多少钱？', tip: '买东西问价钱必备' },
      { ko: '화장실이 어디예요?', ro: 'hwajangsiri eodiyeyo?', zh: '洗手间在哪里？', tip: '"OO이/가 어디예요?" = OO在哪' },
      { ko: '도와주세요', ro: 'dowajuseyo', zh: '请帮帮我', tip: '真遇到麻烦，这句话最直接' },
    ],
    words: [
      { ko: '이거', ro: 'igeo', zh: '这个' },
      { ko: '저거', ro: 'jeogeo', zh: '那个' },
      { ko: '얼마', ro: 'eolma', zh: '多少（钱）' },
      { ko: '어디', ro: 'eodi', zh: '哪里' },
      { ko: '영수증', ro: 'yeongsujeung', zh: '收据' },
      { ko: '메뉴판', ro: 'menyupan', zh: '菜单' },
      { ko: '화장실', ro: 'hwajangsil', zh: '洗手间' },
      { ko: '지하철역', ro: 'jihacheollyeok', zh: '地铁站' },
    ],
    dialogues: [
      {
        id: 'l4-d1',
        title: '便利店买东西',
        situation: '指着商品问价钱',
        lines: [
          { speaker: 'A', ko: '어서 오세요.', ro: 'eoseo oseyo.', zh: '欢迎光临。' },
          { speaker: 'B', ko: '이거 얼마예요?', ro: 'igeo eolmayeyo?', zh: '这个多少钱？' },
          { speaker: 'A', ko: '이천 원이에요.', ro: 'icheon won-ieyo.', zh: '两千韩元。' },
          { speaker: 'B', ko: '이거 주세요. 감사합니다.', ro: 'igeo juseyo. gamsahamnida.', zh: '请给我这个，谢谢。' },
        ],
      },
      {
        id: 'l4-d2',
        title: '找洗手间',
        situation: '在商场里',
        lines: [
          { speaker: 'A', ko: '저기요, 화장실이 어디예요?', ro: 'jeogiyo, hwajangsiri eodiyeyo?', zh: '不好意思，洗手间在哪里？' },
          { speaker: 'B', ko: '저기예요.', ro: 'jeogiyeyo.', zh: '在那边。' },
          { speaker: 'A', ko: '감사합니다.', ro: 'gamsahamnida.', zh: '谢谢。' },
        ],
      },
      {
        id: 'l4-d3',
        title: '遇到麻烦求助',
        situation: '发现钱包不见了',
        lines: [
          { speaker: 'A', ko: '도와주세요!', ro: 'dowajuseyo!', zh: '请帮帮我！' },
          { speaker: 'B', ko: '네, 무슨 일이에요?', ro: 'ne, museun irieyo?', zh: '好的，发生什么事了？' },
          { speaker: 'A', ko: '지갑이 없어요.', ro: 'jigabi eopseoyo.', zh: '我的钱包不见了。' },
        ],
      },
    ],
  },
  {
    id: 'l5',
    title: '第 5 课 · 再认 5 个字母，凑够常用元音',
    tagline: '继续不用学完，够用就先用着',
    why: '接着第2课，把剩下最常见的3个元音（ㅓㅗㅜ）和2个辅音（ㅅㅁ）也认一认。这5个加上第2课那5个，日常单词里出现的字母你已经认得快一半了——但记住，这不是任务，认几个算几个，随时可以先跳过去玩别的板块。',
    blocks: [
      {
        icon: '⚖️',
        heading: 'ㅓ 和 ㅗ 最容易搞混',
        text: '两个音听起来都有点"哦"，区别在嘴唇：ㅗ 要把嘴唇往前撅圆；ㅓ 嘴唇完全放松、不圆，嘴巴张得更大。发 ㅓ 之前先想象自己在无奈地叹一口气"呃"，嘴形就对了。',
      },
      {
        icon: '🔡',
        heading: '现在你已经能拼出不少字了',
        text: '学了这 10 个字母（ㅏㅣㄱㄴㅇ + ㅓㅗㅜㅅㅁ），已经能读下面这些词：고기（肉）、나무（树）、오이（黄瓜）、어머니（妈妈）、이모（姨妈）。试着先自己拼一遍，再点开听发音对答案。',
      },
      {
        icon: '🔚',
        heading: '字母也会躲在方块的底部',
        text: '字母不只出现在方块的上面和右边，也可以放在底下，叫"收音"。比如 삼（三）= ㅅ + ㅏ + 底下的 ㅁ。收音的读法先不用管，现阶段只要认出"这个方块底下多了一个字母"就行。',
      },
    ],
    teach: [
      { ko: 'ㅓ', audio: '어', gloss: 'eo（嘴巴张大不圆唇）', ro: 'eo', zh: '嘴巴张开、嘴唇不圆，像含糊的"喔"', tip: '和ㅗ最容易搞混，区别就是嘴唇圆不圆；例词：커피(咖啡)' },
      { ko: 'ㅗ', audio: '오', gloss: 'o（嘴唇撅圆）', ro: 'o', zh: '嘴唇往前撅圆，像"哦"', tip: '例词：고기(肉) 里就有这个音' },
      { ko: 'ㅜ', audio: '우', gloss: 'u（乌）', ro: 'u', zh: '嘴唇收得更圆更小，像"乌"', tip: '例词：물(水) 里就有这个音' },
      { ko: 'ㅅ', audio: '사', gloss: 's（思）', ro: 's', zh: '舌尖接近上齿龈，摩擦出声', tip: '例词：사과(苹果) 的第一个音' },
      { ko: 'ㅁ', audio: '마', gloss: 'm（母）', ro: 'm', zh: '双唇闭合再张开，鼻音', tip: '例词：모자(帽子) 的第一个音' },
    ],
    words: [
      { ko: '고기', ro: 'gogi', zh: '肉' },
      { ko: '나무', ro: 'namu', zh: '树' },
      { ko: '소', ro: 'so', zh: '牛' },
      { ko: '오이', ro: 'oi', zh: '黄瓜' },
      { ko: '어머니', ro: 'eomeoni', zh: '妈妈（正式）' },
      { ko: '이모', ro: 'imo', zh: '姨妈' },
      { ko: '누나', ro: 'nuna', zh: '姐姐（男生称呼）' },
      { ko: '어서', ro: 'eoseo', zh: '快；请（어서 오세요）' },
    ],
    dialogues: [
      {
        id: 'l5-d1',
        title: '一起吃什么',
        situation: '午饭时间',
        lines: [
          { speaker: 'A', ko: '뭐 먹을래요?', ro: 'mwo meogeullaeyo?', zh: '想吃什么？' },
          { speaker: 'B', ko: '고기 먹어요!', ro: 'gogi meogeoyo!', zh: '吃肉吧！' },
          { speaker: 'A', ko: '좋아요!', ro: 'joayo!', zh: '好啊！' },
        ],
      },
      {
        id: 'l5-d2',
        title: '介绍家人',
        situation: '朋友看到你的家人照片',
        lines: [
          { speaker: 'A', ko: '이분은 누구예요?', ro: 'ibuneun nuguyeyo?', zh: '这位是谁？' },
          { speaker: 'B', ko: '우리 어머니예요.', ro: 'uri eomeoniyeyo.', zh: '是我妈妈。' },
          { speaker: 'A', ko: '아, 안녕하세요!', ro: 'a, annyeonghaseyo!', zh: '啊，您好！' },
        ],
      },
      {
        id: 'l5-d3',
        title: '走进餐厅',
        situation: '餐厅门口',
        lines: [
          { speaker: 'A', ko: '어서 오세요!', ro: 'eoseo oseyo!', zh: '欢迎光临！' },
          { speaker: 'B', ko: '안녕하세요. 두 명이에요.', ro: 'annyeonghaseyo. du myeong-ieyo.', zh: '你好，两位。' },
          { speaker: 'A', ko: '이쪽으로 오세요.', ro: 'ijjogeuro oseyo.', zh: '请往这边走。' },
        ],
      },
    ],
  },
  {
    id: 'l6',
    title: '第 6 课 · 数字 1-10，打电话报价格都用得上',
    tagline: '一套数字，用途比想象中广',
    why: '韩语数字有两套系统，这一课先学"汉字词"这一套（일이삼사오…），因为它专门用在电话号码、价格、日期、房间号这些场合，使用频率极高，而且规律和中文数字几乎一一对应，背起来比想象中快。另一套"固有词"数字（하나둘셋…）专门用来数东西、说年龄，以后再学也不迟。',
    blocks: [
      {
        icon: '🔢',
        heading: '为什么有两套数字',
        text: '汉字词数字（일 이 삼…）来自汉语，读音和中文很像，用在号码、价格、日期、楼层；固有词数字（하나 둘 셋…）是韩语自己的，用在数东西、说几点、说年龄。同一个场合用哪套是固定的，不能混用——这是韩语的特色，慢慢适应就好。',
      },
      {
        icon: '☎️',
        heading: '电话号码怎么念',
        text: '手机号以 010 开头，念作 공일공。注意：电话号码里的 0 通常念 공 而不是 영。一个个数字顺着念就行，比如 010-1234-5678 念作 공일공 일이삼사 오육칠팔。',
      },
      {
        icon: '💰',
        heading: '价格怎么说',
        text: '价格是数字加 원（韩元）。1000 说 천 원（不说"일천"），5000 说 오천 원，10000 说 만 원。听到 천 / 만 就知道是"千 / 万"，先把这两个词认住，看价签就够用了。',
      },
    ],
    teach: [
      { ko: '일', ro: 'il', zh: '一', tip: '电话号码里的"1"就读这个' },
      { ko: '이', ro: 'i', zh: '二', tip: '和中文"二"发音很接近' },
      { ko: '삼', ro: 'sam', zh: '三', tip: '和中文"三"几乎一样' },
      { ko: '사', ro: 'sa', zh: '四', tip: '和中文"四"很接近' },
      { ko: '오', ro: 'o', zh: '五', tip: '和中文"五"发音接近' },
      { ko: '육', ro: 'yuk', zh: '六', tip: '这个和中文差得稍远，多听几遍' },
      { ko: '칠', ro: 'chil', zh: '七', tip: '和中文"七"接近' },
      { ko: '팔', ro: 'pal', zh: '八', tip: '和中文"八"接近' },
      { ko: '구', ro: 'gu', zh: '九', tip: '和中文"九"接近' },
      { ko: '십', ro: 'sip', zh: '十', tip: '和中文"十"接近' },
    ],
    words: [
      { ko: '영', ro: 'yeong', zh: '零' },
      { ko: '공', ro: 'gong', zh: '零（电话号码里）' },
      { ko: '백', ro: 'baek', zh: '百' },
      { ko: '천', ro: 'cheon', zh: '千' },
      { ko: '만', ro: 'man', zh: '万' },
      { ko: '원', ro: 'won', zh: '韩元' },
      { ko: '번호', ro: 'beonho', zh: '号码' },
      { ko: '전화번호', ro: 'jeonhwabeonho', zh: '电话号码' },
      { ko: '층', ro: 'cheung', zh: '楼层' },
    ],
    dialogues: [
      {
        id: 'l6-d1',
        title: '问价钱',
        situation: '在小店里',
        lines: [
          { speaker: 'A', ko: '이거 얼마예요?', ro: 'igeo eolmayeyo?', zh: '这个多少钱？' },
          { speaker: 'B', ko: '오천 원이에요.', ro: 'ocheon won-ieyo.', zh: '五千韩元。' },
          { speaker: 'A', ko: '이거 주세요.', ro: 'igeo juseyo.', zh: '请给我这个。' },
        ],
      },
      {
        id: 'l6-d2',
        title: '交换电话号码',
        situation: '新认识的朋友',
        lines: [
          { speaker: 'A', ko: '전화번호가 뭐예요?', ro: 'jeonhwabeonhoga mwoyeyo?', zh: '你的电话号码是多少？' },
          { speaker: 'B', ko: '공일공, 일이삼사, 오육칠팔이에요.', ro: 'gong-il-gong, il-i-sam-sa, o-yuk-chil-pal-ieyo.', zh: '010-1234-5678。' },
          { speaker: 'A', ko: '감사합니다.', ro: 'gamsahamnida.', zh: '谢谢。' },
        ],
      },
      {
        id: 'l6-d3',
        title: '问楼层',
        situation: '在电梯里',
        lines: [
          { speaker: 'A', ko: '몇 층이에요?', ro: 'myeot cheung-ieyo?', zh: '几层？' },
          { speaker: 'B', ko: '삼 층이에요.', ro: 'sam cheung-ieyo.', zh: '三层。' },
          { speaker: 'A', ko: '아, 감사합니다.', ro: 'a, gamsahamnida.', zh: '啊，谢谢。' },
        ],
      },
    ],
  },
  {
    id: 'l7',
    title: '第 7 课 · 6 句接话神器，聊天不冷场',
    tagline: '学几句"反应型"短句，比学语法划算',
    why: '真正聊天时，大部分时间不是你在长篇大论，而是快速接一句反应。这几句"反应型"短语不需要理解语法，学会往哪儿用比学会怎么拼更重要——买东西、吃饭、聊天，随时能接上一句，气氛就不会尴尬。',
    blocks: [
      {
        icon: '🎭',
        heading: '괜찮아요：一句多用',
        text: '괜찮아요 的意思跟着语境走：别人道歉时说"没关系"；别人问你"还好吗"时说"我没事"；别人给你加菜递东西时说"不用了，谢谢"。同一句话，靠表情和语气区分，这是最值得练熟的一句。',
      },
      {
        icon: '📈',
        heading: '语调决定是问还是答',
        text: '韩语很多句子文字完全一样，靠句尾语调区分：괜찮아요? 句尾上扬是问"还好吗？"，괜찮아요. 句尾平落是答"没事"。听别人说话时，多留意句尾是升还是降。',
      },
      {
        icon: '🍽️',
        heading: '强调词让话更生动',
        text: '"정말 맛있어요"（真好吃）比单说 맛있어요 更有感情；"너무 좋아요"（太好了）也很常用。下面"相关词汇"里的 정말、진짜、너무 这类词，往短句前面一加，反应立刻丰富起来。',
      },
    ],
    teach: [
      { ko: '좋아요', ro: 'joayo', zh: '好 / 喜欢', tip: '对方提议什么，觉得可以就说这句' },
      { ko: '맛있어요', ro: 'masisseoyo', zh: '好吃', tip: '吃饭时最常说的一句夸奖' },
      { ko: '괜찮아요', ro: 'gwaenchanhayo', zh: '没关系 / 还好', tip: '道歉、关心、婉拒都能用这句接' },
      { ko: '더 주세요', ro: 'deo juseyo', zh: '请再给我一点', tip: '"더"=更多，接在"주세요"前面就行' },
      { ko: '싫어요', ro: 'sirheoyo', zh: '不喜欢 / 不要', tip: '"좋아요"的反义词，要礼貌地婉拒时语气放软' },
      { ko: '맞아요', ro: 'majayo', zh: '对 / 没错', tip: '赞同对方说的话时用' },
    ],
    words: [
      { ko: '정말', ro: 'jeongmal', zh: '真的（很）' },
      { ko: '진짜', ro: 'jinjja', zh: '真的（口语）' },
      { ko: '너무', ro: 'neomu', zh: '太；非常' },
      { ko: '조금', ro: 'jogeum', zh: '一点点' },
      { ko: '많이', ro: 'mani', zh: '很多地' },
      { ko: '아주', ro: 'aju', zh: '很；非常' },
      { ko: '또', ro: 'tto', zh: '又；再' },
      { ko: '같이', ro: 'gachi', zh: '一起' },
    ],
    dialogues: [
      {
        id: 'l7-d1',
        title: '尝尝这个',
        situation: '朋友推荐你吃一道菜',
        lines: [
          { speaker: 'A', ko: '같이 먹을래요?', ro: 'gachi meogeullaeyo?', zh: '要一起吃吗？' },
          { speaker: 'B', ko: '좋아요! 이거 맛있어요?', ro: 'joayo! igeo masisseoyo?', zh: '好啊！这个好吃吗？' },
          { speaker: 'A', ko: '네, 정말 맛있어요!', ro: 'ne, jeongmal masisseoyo!', zh: '嗯，真的很好吃！' },
        ],
      },
      {
        id: 'l7-d2',
        title: '没关系的',
        situation: '对方不好意思地道歉',
        lines: [
          { speaker: 'A', ko: '죄송해요.', ro: 'joesonghaeyo.', zh: '对不起。' },
          { speaker: 'B', ko: '괜찮아요.', ro: 'gwaenchanhayo.', zh: '没关系。' },
          { speaker: 'A', ko: '정말 괜찮아요?', ro: 'jeongmal gwaenchanhayo?', zh: '真的没关系吗？' },
          { speaker: 'B', ko: '네, 괜찮아요.', ro: 'ne, gwaenchanhayo.', zh: '嗯，没事。' },
        ],
      },
      {
        id: 'l7-d3',
        title: '请老板再加一份',
        situation: '在小餐馆',
        lines: [
          { speaker: 'A', ko: '사장님, 김치 더 주세요.', ro: 'sajangnim, gimchi deo juseyo.', zh: '老板，请再给我一点泡菜。' },
          { speaker: 'B', ko: '네, 알겠습니다.', ro: 'ne, algetseumnida.', zh: '好的，知道了。' },
          { speaker: 'B', ko: '많이 드세요.', ro: 'mani deuseyo.', zh: '请多吃点。' },
        ],
      },
    ],
  },
  {
    id: 'l8',
    title: '第 8 课 · 再认 5 个字母，把常用的补齐',
    tagline: '这批认完，常见字母大部分都眼熟了',
    why: '再学5个：一个公认最难的元音（ㅡ）、一个y系元音（ㅕ），加上3个常用辅音（ㅂㄷㅈ）。ㅡ确实不好发，嘴唇完全不动就对了，发不准也没关系，能听懂比能读准更优先——这条在整个学习过程里都成立。',
    blocks: [
      {
        icon: '😐',
        heading: 'ㅡ：嘴唇一动都不要动',
        text: 'ㅡ 是公认最难发的韩语元音：中文、日语、英语都没有。诀窍是对着镜子，嘴唇保持扁平不动，既不撅圆也不咧开，从喉咙深处挤出一个"额"。发不准完全没关系，对方基本都能听懂。',
      },
      {
        icon: '🎚️',
        heading: 'ㄱ ㄷ ㅂ ㅈ：词首偏清、词中偏浊',
        text: '这四个辅音有个有趣的现象：放在词开头时听起来偏"k t p ch"，夹在元音中间时会自然变浊，听起来偏"g d b j"。比如 바다 里的 ㅂ 听着像 b，ㄷ 听着像 d。想系统了解，去"发音精讲"板块看详细对比。',
      },
      {
        icon: '🏆',
        heading: '15 个字母，已经能认出一大批词',
        text: '加上前两次学的，你现在认识 15 个字母了：ㅏㅣㄱㄴㅇ ㅓㅗㅜㅅㅁ ㅡㅕㅂㄷㅈ。下面这些词全部只用这 15 个字母拼成：바다、바지、아버지、여자、남자、주스、사자、어디、지도、모자。每个都试着先读一遍。',
      },
    ],
    teach: [
      { ko: 'ㅡ', audio: '으', gloss: 'eu（嘴唇不动）', ro: 'eu', zh: '嘴唇扁平完全不动，从喉咙挤出"额"', tip: '中日英三种语言都没有这个音，练的时候多照镜子看嘴唇' },
      { ko: 'ㅕ', audio: '여', gloss: 'yeo（衣+喔）', ro: 'yeo', zh: 'y+ㅓ，先"衣"再滑到"喔"', tip: '例词：여름(夏天) 开头就是这个音' },
      { ko: 'ㅂ', audio: '바', gloss: 'b/p（波）', ro: 'b/p', zh: '双唇先闭合再张开', tip: '例词：바다(大海) 的第一个音' },
      { ko: 'ㄷ', audio: '다', gloss: 'd/t（的）', ro: 'd/t', zh: '舌尖抵住上齿龈再放开', tip: '例词：달(月亮) 的第一个音' },
      { ko: 'ㅈ', audio: '자', gloss: 'j（资）', ro: 'j', zh: '舌面抵住硬颚前部', tip: '例词：집(家) 的第一个音' },
    ],
    words: [
      { ko: '바다', ro: 'bada', zh: '大海' },
      { ko: '바지', ro: 'baji', zh: '裤子' },
      { ko: '아버지', ro: 'abeoji', zh: '爸爸（正式）' },
      { ko: '여자', ro: 'yeoja', zh: '女人' },
      { ko: '남자', ro: 'namja', zh: '男人' },
      { ko: '주스', ro: 'juseu', zh: '果汁' },
      { ko: '사자', ro: 'saja', zh: '狮子' },
      { ko: '어디', ro: 'eodi', zh: '哪里' },
      { ko: '지도', ro: 'jido', zh: '地图' },
      { ko: '모자', ro: 'moja', zh: '帽子' },
    ],
    dialogues: [
      {
        id: 'l8-d1',
        title: '找地图',
        situation: '在游客中心',
        lines: [
          { speaker: 'A', ko: '지도 어디 있어요?', ro: 'jido eodi isseoyo?', zh: '地图在哪里？' },
          { speaker: 'B', ko: '저기 있어요.', ro: 'jeogi isseoyo.', zh: '在那边。' },
          { speaker: 'A', ko: '감사합니다.', ro: 'gamsahamnida.', zh: '谢谢。' },
        ],
      },
      {
        id: 'l8-d2',
        title: '下雨天',
        situation: '出门前',
        lines: [
          { speaker: 'A', ko: '비가 와요.', ro: 'biga wayo.', zh: '下雨了。' },
          { speaker: 'B', ko: '우산 있어요?', ro: 'usan isseoyo?', zh: '你有伞吗？' },
          { speaker: 'A', ko: '아니요, 없어요.', ro: 'aniyo, eopseoyo.', zh: '没有。' },
        ],
      },
      {
        id: 'l8-d3',
        title: '点果汁',
        situation: '在咖啡店',
        lines: [
          { speaker: 'A', ko: '주스 주세요.', ro: 'juseu juseyo.', zh: '请给我果汁。' },
          { speaker: 'B', ko: '네, 알겠습니다.', ro: 'ne, algetseumnida.', zh: '好的，知道了。' },
        ],
      },
    ],
  },
  {
    id: 'l9',
    title: '第 9 课 · 时间词，约人聊天必备',
    tagline: '5个词，聊计划够用了',
    why: '约时间、聊计划的时候，"今天""明天""现在"这几个词的出现频率高到夸张，随口一句话里可能就带一个。比起系统学时态语法，先把这几个高频词攥在手里，实际交流里能用上的机会反而更多。',
    blocks: [
      {
        icon: '📅',
        heading: '昨天、今天、明天：一套三个',
        text: '어제（昨天）、오늘（今天）、내일（明天）放在一起记，一套三个，往后加上 지금（现在）和 주말（周末），聊计划、约时间的词就基本够了。',
      },
      {
        icon: '🚫',
        heading: '容易错：这些词后面不加"에"',
        text: '说"某个时间点做某事"时，时间词后面常加 에（比如 주말에 = 在周末）。但 오늘 / 내일 / 어제 / 지금 后面不加 에，直接说"오늘 뭐 해요?"（今天做什么？）。这是中文母语者最常顺手加错的地方。',
      },
      {
        icon: '🗓️',
        heading: '聊周末的万能搭话',
        text: '주말에 뭐 해요?（周末做什么？）是韩国人最常用的闲聊开场之一，对方回答之后你再接一句"좋아요"就能把话聊下去。下面的小对话就是这个套路。',
      },
    ],
    teach: [
      { ko: '오늘', ro: 'oneul', zh: '今天', tip: '几乎每天聊天都会用到' },
      { ko: '내일', ro: 'naeil', zh: '明天', tip: '约见面常说"내일 봐요"（明天见）' },
      { ko: '어제', ro: 'eoje', zh: '昨天', tip: '和"오늘""내일"放一起记，一套三个' },
      { ko: '지금', ro: 'jigeum', zh: '现在', tip: '"지금 뭐 해요?"（现在在干嘛）很常用' },
      { ko: '주말', ro: 'jumal', zh: '周末', tip: '"주말에 뭐 해요?"是很自然的搭话方式' },
    ],
    words: [
      { ko: '아침', ro: 'achim', zh: '早上' },
      { ko: '점심', ro: 'jeomsim', zh: '中午' },
      { ko: '저녁', ro: 'jeonyeok', zh: '晚上' },
      { ko: '밤', ro: 'bam', zh: '夜里' },
      { ko: '이번 주', ro: 'ibeon ju', zh: '这周' },
      { ko: '다음 주', ro: 'daeum ju', zh: '下周' },
      { ko: '매일', ro: 'maeil', zh: '每天' },
      { ko: '요즘', ro: 'yojeum', zh: '最近' },
    ],
    dialogues: [
      {
        id: 'l9-d1',
        title: '聊今天和明天',
        situation: '朋友之间闲聊',
        lines: [
          { speaker: 'A', ko: '오늘 뭐 해요?', ro: 'oneul mwo haeyo?', zh: '今天做什么？' },
          { speaker: 'B', ko: '오늘은 집에 있어요.', ro: 'oneureun jibe isseoyo.', zh: '今天在家。' },
          { speaker: 'A', ko: '내일은요?', ro: 'naeireunyo?', zh: '明天呢？' },
          { speaker: 'B', ko: '내일은 학교에 가요.', ro: 'naeireun hakgyoe gayo.', zh: '明天去学校。' },
        ],
      },
      {
        id: 'l9-d2',
        title: '约周末',
        situation: '下课后',
        lines: [
          { speaker: 'A', ko: '주말에 시간 있어요?', ro: 'jumare sigan isseoyo?', zh: '周末有时间吗？' },
          { speaker: 'B', ko: '네, 있어요.', ro: 'ne, isseoyo.', zh: '有。' },
          { speaker: 'A', ko: '그럼 토요일에 만나요.', ro: 'geureom toyoire mannayo.', zh: '那星期六见面吧。' },
          { speaker: 'B', ko: '좋아요!', ro: 'joayo!', zh: '好啊！' },
        ],
      },
      {
        id: 'l9-d3',
        title: '昨天做了什么',
        situation: '周一早上',
        lines: [
          { speaker: 'A', ko: '지금 뭐 해요?', ro: 'jigeum mwo haeyo?', zh: '现在在做什么？' },
          { speaker: 'B', ko: '지금 밥 먹어요.', ro: 'jigeum bap meogeoyo.', zh: '现在在吃饭。' },
          { speaker: 'A', ko: '어제는 뭐 했어요?', ro: 'eojeneun mwo haesseoyo?', zh: '昨天做了什么？' },
          { speaker: 'B', ko: '어제는 영화 봤어요.', ro: 'eojeneun yeonghwa bwasseoyo.', zh: '昨天看了电影。' },
        ],
      },
    ],
  },
  {
    id: 'l10',
    title: '第 10 课 · 6 句救命句，听不懂时怎么办',
    tagline: '真正开口讲话前，最该先学会的反而是这几句',
    why: '现实是：真去韩国张嘴说话，大概率听不懂对方在说什么——这很正常。这一课教你怎么"撑住场面"：听不懂就说，语速太快就求慢一点，没听清就请对方再说一遍。学会这几句，比背再多单词都实用，因为它们能帮你把对话继续下去，而不是卡在原地。',
    blocks: [
      {
        icon: '🧘',
        heading: '先放平心态：听不懂是常态',
        text: '刚开始说韩语，对方一开口语速飞快，你大概率什么都听不清——这几乎是所有学习者的必经阶段，不是你不行。关键不是"全听懂"，而是学会怎么让对话继续下去。',
      },
      {
        icon: '🪜',
        heading: '撑场面的三步套路',
        text: '① 先说 잠시만요（请稍等）争取一点反应时间 → ② 再说 천천히 말해 주세요（请说慢一点）或 다시 한번 말해 주세요（请再说一遍）→ ③ 听懂了就回一句 알겠어요，让对方放心。这三步套路比背十个单词更救急。',
      },
      {
        icon: '🖊️',
        heading: '终极备用招：让对方写下来',
        text: '实在听不懂，可以把手机递过去，说 적어 주세요（请写下来）。现在大家都习惯用手机打字沟通，这一招在问路、问价格、订房时都管用，一点都不丢脸。',
      },
    ],
    teach: [
      { ko: '몰라요', ro: 'mollayo', zh: '不知道', tip: '听不懂问题时，先老实说这句' },
      { ko: '알겠어요', ro: 'algesseoyo', zh: '知道了 / 明白了', tip: '听懂之后，回一句让对方安心' },
      { ko: '천천히 말해 주세요', ro: 'cheoncheonhi malhae juseyo', zh: '请说慢一点', tip: '语速太快跟不上，直接说这句' },
      { ko: '다시 한번 말해 주세요', ro: 'dasi hanbeon malhae juseyo', zh: '请再说一遍', tip: '没听清，比瞎猜靠谱多了' },
      { ko: '잠시만요', ro: 'jamsimanyo', zh: '请稍等', tip: '需要点时间反应，先说这句争取时间' },
      { ko: '한국어를 잘 못해요', ro: 'hangugeoreul jal mothaeyo', zh: '我韩语不太好', tip: '先坦白自己的水平，对方会自动放慢语速' },
    ],
    words: [
      { ko: '한국어', ro: 'hangugeo', zh: '韩语' },
      { ko: '중국어', ro: 'jungugeo', zh: '汉语' },
      { ko: '영어', ro: 'yeongeo', zh: '英语' },
      { ko: '뜻', ro: 'tteut', zh: '意思' },
      { ko: '뭐라고요?', ro: 'mworagoyo?', zh: '你说什么？' },
      { ko: '무슨 뜻이에요?', ro: 'museun tteusieyo?', zh: '是什么意思？' },
      { ko: '적어 주세요', ro: 'jeogeo juseyo', zh: '请写下来' },
      { ko: '천천히', ro: 'cheoncheonhi', zh: '慢慢地' },
    ],
    dialogues: [
      {
        id: 'l10-d1',
        title: '没听清路',
        situation: '向路人问路',
        lines: [
          { speaker: 'A', ko: '저쪽으로 쭉 가세요.', ro: 'jeojjogeuro jjuk gaseyo.', zh: '往那边一直走。' },
          { speaker: 'B', ko: '죄송합니다. 다시 한번 말해 주세요.', ro: 'joesonghamnida. dasi hanbeon malhae juseyo.', zh: '对不起，请再说一遍。' },
          { speaker: 'A', ko: '저쪽으로 쭉 가세요.', ro: 'jeojjogeuro jjuk gaseyo.', zh: '往那边一直走。' },
          { speaker: 'B', ko: '아, 알겠어요. 감사합니다.', ro: 'a, algesseoyo. gamsahamnida.', zh: '啊，明白了，谢谢。' },
        ],
      },
      {
        id: 'l10-d2',
        title: '对方说得太快',
        situation: '在店里被店员连珠炮式介绍',
        lines: [
          { speaker: 'A', ko: '이건 신상품이고, 지금 세일 중이에요.', ro: 'igeon sinsangpumigo, jigeum seil jung-ieyo.', zh: '这是新品，现在正在打折。' },
          { speaker: 'B', ko: '천천히 말해 주세요. 한국어를 잘 못해요.', ro: 'cheoncheonhi malhae juseyo. hangugeoreul jal mothaeyo.', zh: '请说慢一点，我韩语不太好。' },
          { speaker: 'A', ko: '아, 죄송해요.', ro: 'a, joesonghaeyo.', zh: '啊，不好意思。' },
        ],
      },
      {
        id: 'l10-d3',
        title: '问这是什么意思',
        situation: '看不懂菜单上的字',
        lines: [
          { speaker: 'A', ko: '이게 무슨 뜻이에요?', ro: 'ige museun tteusieyo?', zh: '这是什么意思？' },
          { speaker: 'B', ko: '"맛있다"라는 뜻이에요.', ro: '"masitda"raneun tteusieyo.', zh: '是"好吃"的意思。' },
          { speaker: 'A', ko: '아, 알겠어요. 고마워요.', ro: 'a, algesseoyo. gomawoyo.', zh: '啊，明白了，谢谢。' },
        ],
      },
    ],
  },
]

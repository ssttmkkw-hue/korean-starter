// 传统故事 · 谚语 · 经典文本
// 民间故事（전래동화）没有唯一"原文"，这里是本站依传统情节用简易韩语（해요체）重新改写的，并非某本童书的节选；
// 谚语（속담）、훈민정음、아리랑 等属传统/公有领域文本，各版本字句可能略有不同。
// 每行 voice：'F' 女声 / 'M' 男声；who 为空表示旁白（해설）

export const folkNotice =
  '说明：① 民间故事没有唯一的原文，这里是本站按传统情节用简单韩语重新改写的，各种童书版本情节细节略有不同；② 谚语、훈민정음、아리랑 是传统/公有领域文本，通行写法略有差异；③ 语音是机器合成；④ 故事里的拟声拟态词（앙앙、뚝、폴짝……）是韩语的一大特色，值得多留意。'

export const tales = [
  {
    id: 'tiger-gotgam',
    title: '호랑이와 곶감',
    titleZh: '老虎和柿饼',
    badge: '本站改写 · 传统故事',
    tag: '人们熟知的"怕的是柿饼"故事，常用来说明"误会会让强者逃跑"。',
    intro:
      '饥饿的老虎下山进了村，听到一个妈妈哄哭闹的宝宝："老虎来了！"宝宝照哭不误，可一说"给你柿饼"，宝宝立刻不哭了。老虎心想：柿饼是不是比我还可怕？正好这时一个偷牛贼把老虎当成牛跳了上去……',
    culture:
      '开头那句 "옛날 옛적에 호랑이 담배 피우던 시절에" 是韩国故事最经典的开场白，字面是"老虎抽烟的年代"，意思就是"很久很久以前"。곶감 是把柿子晒干做成的柿饼，是韩国传统零食。老虎在韩国民间故事里出现得极多，既可怕又常常有点傻气。',
    lines: [
      { ko: '옛날 옛적, 호랑이가 담배 피우던 시절에 있었던 이야기예요.', ro: 'yennal yeotjeok, horangiga dambae piudeon sijeore isseotdeon iyagiyeyo.', zh: '很久很久以前，老虎还会抽烟的年代发生的故事。', voice: 'F', who: '' },
      { ko: '배고픈 호랑이가 먹이를 찾아 마을로 내려왔어요.', ro: 'baegopeun horangiga meogireul chaja maeullo naeryeowasseoyo.', zh: '饥饿的老虎为了找食物，下山来到村子里。', voice: 'F', who: '' },
      { ko: '어느 집에서 아기가 앙앙 울고 있었어요.', ro: 'eoneu jibeseo agiga angang ulgo isseosseoyo.', zh: '某户人家里，宝宝正在哇哇大哭。', voice: 'F', who: '' },
      { ko: '아가야, 뚝! 호랑이 온다!', ro: 'agaya, ttuk! horangi onda!', zh: '宝宝，别哭了！老虎来啦！', voice: 'F', who: '엄마' },
      { ko: '그래도 아기는 계속 울었어요.', ro: 'geuraedo agineun gyesok ureosseoyo.', zh: '可宝宝还是一直哭。', voice: 'F', who: '' },
      { ko: '아가야, 곶감 줄게.', ro: 'agaya, gotgam julge.', zh: '宝宝，给你柿饼。', voice: 'F', who: '엄마' },
      { ko: '그러자 아기가 울음을 뚝 그쳤어요.', ro: 'geureoja agiga ureumeul ttuk geuchyeosseoyo.', zh: '这时宝宝一下子止住了哭声。', voice: 'F', who: '' },
      { ko: '곶감? 곶감이 나보다 더 무서운 건가?', ro: 'gotgam? gotgami naboda deo museoun geonga?', zh: '柿饼？柿饼比我还可怕吗？', voice: 'M', who: '호랑이' },
      { ko: '그때 소도둑이 호랑이를 소인 줄 알고 등에 올라탔어요.', ro: 'geuttae sododuki horangireul soin jul algo deunge ollatasseoyo.', zh: '这时偷牛贼把老虎当成了牛，跳到了它的背上。', voice: 'F', who: '' },
      { ko: '으악! 곶감이 나를 잡았다! 살려 줘!', ro: 'euak! gotgami nareul jabatda! sallyeo jwo!', zh: '啊！柿饼抓住我了！救命啊！', voice: 'M', who: '호랑이' },
      { ko: '호랑이는 곶감이 무서워서 산으로 도망갔어요.', ro: 'horangineun gotgami museowoseo saneuro domanggasseoyo.', zh: '老虎因为害怕柿饼，逃回山里去了。', voice: 'F', who: '' },
    ],
    words: [
      { ko: '옛날', ro: 'yennal', zh: '从前' },
      { ko: '호랑이', ro: 'horangi', zh: '老虎' },
      { ko: '마을', ro: 'maeul', zh: '村子' },
      { ko: '곶감', ro: 'gotgam', zh: '柿饼' },
      { ko: '울다', ro: 'ulda', zh: '哭' },
      { ko: '무섭다', ro: 'museopda', zh: '可怕；害怕' },
      { ko: '소도둑', ro: 'sododuk', zh: '偷牛贼' },
      { ko: '도망가다', ro: 'domangada', zh: '逃跑' },
      { ko: '그치다', ro: 'geuchida', zh: '停止（哭声、雨）' },
    ],
    points: [
      { head: '-던 / -었던：回忆过去', text: '"담배 피우던 시절"（抽烟的年代）、"있었던 이야기"（发生过的故事）：-던、-었던 放在名词前，表示"过去经常/曾经发生的"，讲故事时特别常用。' },
      { head: '-ㄴ/는 줄 알다：以为……', text: '"호랑이를 소인 줄 알고"= 以为老虎是牛。"-인 줄 알다"表示"以为是……（其实不是）"，也可以接动词：-는 줄 알았어요。' },
      { head: '-(으)ㄹ게：我来……／给你……', text: '"곶감 줄게" = 我给你柿饼。-(으)ㄹ게 是说话人对听话人许诺要做某事，口语里很常用。' },
      { head: '拟声拟态词（의성어·의태어）', text: '앙앙（哇哇哭）、뚝（一下子停住）、으악（啊的惊叫）……韩语里这类词极其丰富，故事里几乎每段都有，记住它们能让表达生动很多。' },
    ],
    questions: [
      { ko: '호랑이는 왜 마을에 내려왔어요?', ro: 'horangineun wae maeure naeryeowasseoyo?', zh: '老虎为什么下山来村子？', aKo: '배고파서 먹이를 찾으러 왔어요.', aRo: 'baegopaseo meogireul chajeureo wasseoyo.', aZh: '因为饿了，来找食物。' },
      { ko: '아기는 언제 울음을 그쳤어요?', ro: 'agineun eonje ureumeul geuchyeosseoyo?', zh: '宝宝什么时候停止了哭？', aKo: '곶감을 준다는 말을 듣고 그쳤어요.', aRo: 'gotgameul jundaneun mareul deutgo geuchyeosseoyo.', aZh: '听到要给柿饼就不哭了。' },
      { ko: '호랑이는 왜 도망갔어요?', ro: 'horangineun wae domanggasseoyo?', zh: '老虎为什么逃跑？', aKo: '소도둑 때문에 곶감이 자기를 잡은 줄 알았어요.', aRo: 'sododuk ttaemune gotgami jagireul jabeun jul arasseoyo.', aZh: '因为偷牛贼，它以为是柿饼抓住了自己。' },
    ],
  },
  {
    id: 'sun-moon',
    title: '해와 달이 된 오누이',
    titleZh: '变成太阳和月亮的兄妹',
    badge: '本站改写 · 传统故事',
    tag: '解释"为什么天上有太阳和月亮"的传说，也是最经典的"兄妹逃脱老虎"故事。',
    intro:
      '山村里住着母亲和一对兄妹。母亲卖完年糕深夜回家，路上遇到老虎，被要走了年糕，最后连人也被吃掉。老虎又扮成母亲去骗两个孩子，兄妹发现不对，爬到树上向天神祈祷，天上降下一根结实的绳子，他们升上了天……',
    culture:
      '오누이 是"哥哥和妹妹/姐姐和弟弟"的合称（男孩的姐妹和女孩的兄弟都可以）。해님、달님 的"-님"是对自然事物的亲切尊称，小孩子说话时特别常用。关于谁变成太阳，各版本不同，最常见的是妹妹变成太阳，哥哥变成月亮；传说老虎掉进了高粱地（수수밭），所以高粱秆上有红色的斑。',
    lines: [
      { ko: '옛날 어느 산골에 어머니와 오누이가 살았어요.', ro: 'yennal eoneu sangore eomeoniwa onuiga salasseoyo.', zh: '从前在某个山村里，住着母亲和一对兄妹。', voice: 'F', who: '' },
      { ko: '어머니는 떡을 팔고 밤늦게 산길을 넘어 돌아오고 있었어요.', ro: 'eomeonineun tteogeul palgo bamneutge sangireul neomeo doraogo isseosseoyo.', zh: '母亲卖完年糕，深夜正翻过山路往家走。', voice: 'F', who: '' },
      { ko: '떡 하나 주면 안 잡아먹지!', ro: 'tteok hana jumyeon an jabameokji!', zh: '给我一块年糕，我就不吃你！', voice: 'M', who: '호랑이' },
      { ko: '호랑이는 떡을 다 먹고도 어머니를 잡아먹었어요.', ro: 'horangineun tteogeul da meokgodo eomeonireul jabameogeosseoyo.', zh: '老虎吃光了年糕，还是把母亲吃掉了。', voice: 'F', who: '' },
      { ko: '얘들아, 엄마 왔다. 문 열어 주렴.', ro: 'yaedeura, eomma watda. mun yeoreo juryeom.', zh: '孩子们，妈妈回来了，开开门吧。', voice: 'M', who: '호랑이 (엄마인 척)' },
      { ko: '오누이는 엄마 손이 아닌 것을 알고, 뒷문으로 도망쳐 나무 위로 올라갔어요.', ro: 'onuineun eomma soni anin geoseul algo, dwinmuneuro domanchyeo namu wiro ollagasseoyo.', zh: '兄妹发现那不是妈妈的手，从后门逃走，爬到了树上。', voice: 'F', who: '' },
      { ko: '하느님, 저희를 살려 주세요. 튼튼한 동아줄을 내려 주세요!', ro: 'haneunim, jeohuireul sallyeo juseyo. teunteunhan dongajureul naeryeo juseyo!', zh: '天神啊，请救救我们，请放下一根结实的绳子！', voice: 'F', who: '오누이' },
      { ko: '그러자 하늘에서 튼튼한 동아줄이 내려왔어요.', ro: 'geureoja haneureseo teunteunhan dongajuri naeryeowasseoyo.', zh: '这时天上降下了一根结实的绳子。', voice: 'F', who: '' },
      { ko: '오누이는 줄을 타고 하늘로 올라가 동생은 해님이, 오빠는 달님이 되었어요.', ro: 'onuineun jureul tago haneullo ollaga dongsaengeun haenimi, oppaneun dalnimi doeeosseoyo.', zh: '兄妹顺着绳子升上天，妹妹成了太阳，哥哥成了月亮。', voice: 'F', who: '' },
      { ko: '한편 호랑이도 하늘에 빌었지만, 썩은 동아줄이 내려와 수수밭에 떨어졌어요.', ro: 'hanpyeon horangido haneure bireotjiman, sseogeun dongaju naeryeowa susubate tteoreojyeosseoyo.', zh: '另一边老虎也向天祈祷，可降下来的是一根烂绳子，它掉进了高粱地里。', voice: 'F', who: '' },
    ],
    words: [
      { ko: '오누이', ro: 'onui', zh: '兄妹；姐弟' },
      { ko: '산골', ro: 'sangol', zh: '山村' },
      { ko: '떡', ro: 'tteok', zh: '年糕' },
      { ko: '잡아먹다', ro: 'jabameokda', zh: '捉来吃掉' },
      { ko: '도망치다', ro: 'domanchida', zh: '逃跑' },
      { ko: '하느님', ro: 'haneunim', zh: '天神；上帝' },
      { ko: '동아줄', ro: 'dongajul', zh: '结实的粗绳' },
      { ko: '썩다', ro: 'sseokda', zh: '腐烂' },
      { ko: '수수밭', ro: 'susubat', zh: '高粱地' },
      { ko: '해님 / 달님', ro: 'haenim / dalnim', zh: '太阳公公 / 月亮婆婆（亲切说法）' },
    ],
    points: [
      { head: '-(으)러 가다／오다：为了做某事而去／来', text: '"떡을 팔러 가다"= 去卖年糕。动作目的用 -(으)러，后面只能接"去、来、出去"等移动动词。（故事里用的是 -고 连接，可以对比。）' },
      { head: '-(이/가) 되다：变成', text: '"해님이 되었어요"= 变成了太阳。"되다"前面的名词要带 이/가，不是 을/를，中文母语者容易写错。' },
      { head: '-고도：即使……也', text: '"떡을 다 먹고도"= 就算把年糕都吃光了还……。-고도 表示"做了前一件事之后，结果仍然是后一件事（出乎预料）"。' },
      { head: '-는 척：假装', text: '标题里的"엄마인 척"= 假装是妈妈。"名词+인 척 / 动词+-는 척"= 假装……，生活里常用。' },
    ],
    questions: [
      { ko: '호랑이는 어머니에게 뭐라고 했어요?', ro: 'horangineun eomeoniege mworago haesseoyo?', zh: '老虎对母亲说了什么？', aKo: '떡 하나 주면 안 잡아먹겠다고 했어요.', aRo: 'tteok hana jumyeon an jabameokgetdago haesseoyo.', aZh: '它说给一块年糕就不吃她。' },
      { ko: '오누이는 어디로 도망갔어요?', ro: 'onuineun eodiro domanggasseoyo?', zh: '兄妹逃到了哪里？', aKo: '나무 위로 올라갔어요.', aRo: 'namu wiro ollagasseoyo.', aZh: '爬到树上去了。' },
      { ko: '오누이는 나중에 무엇이 되었어요?', ro: 'onuineun najunge mueosi doeeosseoyo?', zh: '兄妹后来变成了什么？', aKo: '하늘로 올라가 해와 달이 되었어요.', aRo: 'haneullo ollaga haewa dari doeeosseoyo.', aZh: '升上天空，变成了太阳和月亮。' },
    ],
  },
  {
    id: 'heungbu',
    title: '흥부와 놀부',
    titleZh: '兴夫和孬夫',
    badge: '本站改写 · 传统故事',
    tag: '"善有善报，恶有恶报"的经典故事，源自传统说唱艺术 판소리。',
    intro:
      '贪心的哥哥놀부把父母的财产独占，赶走了善良的弟弟흥부。흥부照顾了一只断了腿的燕子，第二年燕子衔来一颗葫芦籽，长出的大葫芦里滚出金银财宝。놀부眼红，故意弄断燕子的腿，结果他的葫芦里跑出来的是一群도깨비……',
    culture:
      '《흥부가》是韩国传统说唱艺术"판소리"现存五部作品之一（另外四部是 춘향가、심청가、수궁가、적벽가）。제비（燕子）在韩国是吉祥的鸟，每年农历三月三（삼짇날）燕子回来，被看作春天到来的标志。故事末尾的도깨비，正好和前面《도깨비》那部剧里的 도깨비 是同一类民间精怪。',
    lines: [
      { ko: '옛날에 욕심 많은 형 놀부와 마음씨 착한 동생 흥부가 살았어요.', ro: 'yennare yoksim manheun hyeong nolbuwa maeumssi chakan dongsaeng heungbuga salasseoyo.', zh: '从前有贪心的哥哥놀부，和心地善良的弟弟흥부。', voice: 'F', who: '' },
      { ko: '놀부는 부모님의 재산을 혼자 차지하고 흥부를 집에서 내쫓았어요.', ro: 'nolbuneun bumonimui jaesaneul honja chajihago heungbureul jibeseo naejjochasseoyo.', zh: '놀부独占了父母的财产，把흥부赶出了家门。', voice: 'F', who: '' },
      { ko: '흥부는 아이들이 많았지만 늘 가난했어요.', ro: 'heungbuneun aideuri manatjiman neul gananhaesseoyo.', zh: '흥부孩子很多，却总是很穷。', voice: 'F', who: '' },
      { ko: '어느 날 흥부는 다리가 부러진 제비를 보고 정성껏 치료해 주었어요.', ro: 'eoneu nal heungbuneun dariga bureojin jebireul bogo jeongseonggeot chiryohae jueosseoyo.', zh: '一天，흥부看到一只腿断了的燕子，悉心为它治疗。', voice: 'F', who: '' },
      { ko: '다음 해 봄, 제비가 박씨 하나를 물어다 주었어요.', ro: 'daeum hae bom, jebiga bakssi hanareul mureoda jueosseoyo.', zh: '第二年春天，燕子衔来一颗葫芦籽。', voice: 'F', who: '' },
      { ko: '박씨를 심었더니 커다란 박이 열렸어요.', ro: 'bakssireul simeotdeoni keodaran bagi yeollyeosseoyo.', zh: '种下葫芦籽，结出了巨大的葫芦。', voice: 'F', who: '' },
      { ko: '박을 타자 금은보화가 와르르 쏟아져 나왔어요.', ro: 'bageul taja geumeunbohwaga wareureu ssodajyeo nawasseoyo.', zh: '一锯开葫芦，金银财宝哗啦啦地倒了出来。', voice: 'F', who: '' },
      { ko: '그 소식을 들은 놀부는 일부러 제비의 다리를 부러뜨렸어요.', ro: 'geu sosigeul deureun nolbuneun ilbureo jebiui darireul bureotteuryeosseoyo.', zh: '听到消息的놀부，故意弄断了燕子的腿。', voice: 'F', who: '' },
      { ko: '하지만 놀부의 박에서는 도깨비들이 나와 재산을 모두 빼앗아 갔어요.', ro: 'hajiman nolbuui bageseoneun dokkaebideuri nawa jaesaneul modu ppaeasa gasseoyo.', zh: '但놀부的葫芦里跑出来的是도깨비，把他的家产全抢走了。', voice: 'F', who: '' },
      { ko: '마음씨 착한 흥부는 그런 형도 용서하고 함께 살았어요.', ro: 'maeumssi chakan heungbuneun geureon hyeongdo yongseohago hamkke salasseoyo.', zh: '心地善良的흥부，连这样的哥哥也原谅了，和他一起生活。', voice: 'F', who: '' },
    ],
    words: [
      { ko: '욕심', ro: 'yoksim', zh: '贪心' },
      { ko: '마음씨', ro: 'maeumssi', zh: '心地' },
      { ko: '착하다', ro: 'chakada', zh: '善良' },
      { ko: '재산', ro: 'jaesan', zh: '财产' },
      { ko: '가난하다', ro: 'gananhada', zh: '贫穷' },
      { ko: '제비', ro: 'jebi', zh: '燕子' },
      { ko: '박', ro: 'bak', zh: '葫芦（瓢）' },
      { ko: '도깨비', ro: 'dokkaebi', zh: '鬼怪（民间精怪）' },
      { ko: '용서하다', ro: 'yongseohada', zh: '原谅' },
    ],
    points: [
      { head: '-(으)ㄴ 过去修饰：断了的燕子', text: '"다리가 부러진 제비"= 腿断了的燕子。动词变形容词性修饰语：过去/完成用 -(으)ㄴ，进行/现在用 -는，将来用 -(으)ㄹ。' },
      { head: '-았/었더니：发现了结果', text: '"박씨를 심었더니 박이 열렸어요"= 种了籽，结果长出了葫芦。-았/었더니 表示"做了前面的事，于是（亲眼看到）出现了后面的结果"。' },
      { head: '-자：一……就……', text: '"박을 타자 금은보화가 쏟아져 나왔어요"= 一锯开葫芦，财宝就倒了出来。-자 表示前一动作刚发生，后一件事立刻发生。' },
      { head: '-지만：虽然……但是', text: '"아이들이 많았지만 늘 가난했어요"= 孩子虽多，却总是很穷。-지만 是最基础的转折连接。' },
    ],
    questions: [
      { ko: '흥부는 제비를 어떻게 도와줬어요?', ro: 'heungbuneun jebireul eotteoke dowajwosseoyo?', zh: '흥부是怎么帮燕子的？', aKo: '부러진 다리를 치료해 주었어요.', aRo: 'bureojin darireul chiryohae jueosseoyo.', aZh: '给它治疗了断掉的腿。' },
      { ko: '제비는 봄에 무엇을 가져왔어요?', ro: 'jebineun bome mueoseul gajyeowasseoyo?', zh: '燕子春天带来了什么？', aKo: '박씨를 가져왔어요.', aRo: 'bakssireul gajyeowasseoyo.', aZh: '带来了葫芦籽。' },
      { ko: '놀부의 박에서는 무엇이 나왔어요?', ro: 'nolbuui bageseoneun mueosi nawasseoyo?', zh: '놀부的葫芦里跑出了什么？', aKo: '도깨비들이 나왔어요.', aRo: 'dokkaebideuri nawasseoyo.', aZh: '跑出了도깨비们。' },
    ],
  },
  {
    id: 'rabbit-turtle',
    title: '토끼와 자라',
    titleZh: '兔子和鳖（별주부전）',
    badge: '本站改写 · 传统故事',
    tag: '《별주부전》（《水宫歌》）：兔子用机智从龙宫逃脱的故事。',
    intro:
      '龙宫的龙王得了重病，医官说只有吃兔子的肝才能痊愈。忠心的鳖自告奋勇去陆地，用"龙宫有好吃的、还能当官"骗来兔子。到了龙宫兔子才发现上当，却急中生智，说自己的肝可以取出来，现在放在森林里没带来……',
    culture:
      '这个故事的主角在原作里是"자라"（鳖），后来很多童书写成了"거북"（龟），所以你会见到两种说法。它同样出自판소리，名为《수궁가》（水宫歌），和《흥부가》同属五部现存판소리之一。"간"（肝）在韩语里也常指"胆量"，比如 "간이 크다"（胆子大）、"간이 콩알만 해지다"（吓得胆都缩成豆粒大）。',
    lines: [
      { ko: '깊은 바닷속 용궁의 용왕님이 큰 병에 걸렸어요.', ro: 'gipeun badasok yonggungui yongwangnimi keun byeonge geollyeosseoyo.', zh: '深深的海底龙宫里，龙王得了重病。', voice: 'F', who: '' },
      { ko: '토끼의 간을 먹어야 낫습니다.', ro: 'tokkiui ganeul meogeoya natseumnida.', zh: '必须吃兔子的肝才能痊愈。', voice: 'M', who: '의원' },
      { ko: '충성스러운 자라가 토끼를 데려오겠다고 나섰어요.', ro: 'chungseongseureoun jaraga tokkireul deryeooegetdago naseosseoyo.', zh: '忠心的鳖自告奋勇说要把兔子带来。', voice: 'F', who: '' },
      { ko: '토끼 선생님, 용궁에 가면 맛있는 음식도 많고 높은 벼슬도 할 수 있어요.', ro: 'tokki seonsaengnim, yonggunge gamyeon masinneun eumsikdo manko nopeun byeoseuldo hal su isseoyo.', zh: '兔子先生，去龙宫有好多好吃的，还能当大官呢。', voice: 'M', who: '자라' },
      { ko: '토끼는 자라의 등에 업혀 바다를 건넜어요.', ro: 'tokkineun jaraui deunge eopyeo badareul geonneosseoyo.', zh: '兔子趴在鳖的背上渡过了大海。', voice: 'F', who: '' },
      { ko: '용궁에 도착하자 토끼는 그제야 속았다는 것을 알았어요.', ro: 'yonggunge dochakhaja tokkineun geujeya sogatdaneun geoseul arasseoyo.', zh: '一到龙宫，兔子这才知道上当了。', voice: 'F', who: '' },
      { ko: '용왕님, 저는 간을 꺼냈다 넣었다 할 수 있는데, 지금 숲에 두고 왔어요!', ro: 'yongwangnim, jeoneun ganeul kkeonaetda neoeotda hal su inneunde, jigeum supe dugo wasseoyo!', zh: '龙王陛下，我的肝可以取出来再放回去，可现在放在森林里没带来！', voice: 'F', who: '토끼' },
      { ko: '용왕은 그 말을 믿고 토끼를 육지로 돌려보냈어요.', ro: 'yongwangeun geu mareul mitgo tokkireul yukjiro dollyeobonaesseoyo.', zh: '龙王信了这话，把兔子送回了陆地。', voice: 'F', who: '' },
      { ko: '육지에 닿자마자 토끼는 폴짝 뛰어 숲으로 달아났어요.', ro: 'yukjie dajamaja tokkineun poljjak ttwieo supeuro daranasseoyo.', zh: '一到陆地，兔子噌地一跳，逃进了森林。', voice: 'F', who: '' },
      { ko: '위기에 빠졌을 때도 침착하게 생각하면 길이 보인다는 이야기예요.', ro: 'wigie ppajyeosseul ttaedo chimchakhage saenggakhamyeon giri boindaneun iyagiyeyo.', zh: '这个故事告诉人们：身陷险境时，冷静思考就能找到出路。', voice: 'F', who: '' },
    ],
    words: [
      { ko: '용궁', ro: 'yonggung', zh: '龙宫' },
      { ko: '용왕', ro: 'yongwang', zh: '龙王' },
      { ko: '간', ro: 'gan', zh: '肝' },
      { ko: '자라', ro: 'jara', zh: '鳖' },
      { ko: '거북', ro: 'geobuk', zh: '龟' },
      { ko: '충성스럽다', ro: 'chungseongseureopda', zh: '忠心的' },
      { ko: '속다', ro: 'sokda', zh: '上当' },
      { ko: '침착하다', ro: 'chimchakhada', zh: '沉着冷静' },
      { ko: '위기', ro: 'wigi', zh: '危机' },
    ],
    points: [
      { head: '-아/어야：必须……才……', text: '"토끼의 간을 먹어야 낫습니다"= 必须吃兔子的肝才能好。-아/어야 表示"只有做了前面的，后面才成立"，后面常接 되다、하다、낫다 等。' },
      { head: '-겠다고：转述自己的决心', text: '"데려오겠다고 나섰어요"= 说要去带回来而站了出来。-겠다고 是把"我要……"的决心转述出来，常见于叙述。' },
      { head: '-자마자：一……就……', text: '"닿자마자"= 一碰到（陆地）就……。和 -자 相近，但更强调"立刻、马上"。' },
      { head: '-두고 오다：落在……没带来', text: '"숲에 두고 왔어요"= 放在森林里没带来。"두고 오다／두고 가다"= 把东西留在某处，生活中经常用来说"忘带"。' },
    ],
    questions: [
      { ko: '용왕님은 왜 토끼가 필요했어요?', ro: 'yongwangnimeun wae tokkiga piryohaesseoyo?', zh: '龙王为什么需要兔子？', aKo: '병을 낫게 하려고 토끼의 간이 필요했어요.', aRo: 'byeongeul natge haryeogo tokkiui gani piryohaesseoyo.', aZh: '为了治好病，需要兔子的肝。' },
      { ko: '토끼는 어떻게 도망쳤어요?', ro: 'tokkineun eotteoke domanchyeosseoyo?', zh: '兔子是怎么逃走的？', aKo: '간을 숲에 두고 왔다고 거짓말했어요.', aRo: 'ganeul supe dugo watdago geojinmalhaesseoyo.', aZh: '它谎称肝放在了森林里。' },
      { ko: '이 이야기가 주는 교훈은 뭐예요?', ro: 'i iyagiga juneun gyohuneun mwoyeyo?', zh: '这个故事给人的教训是什么？', aKo: '어려울 때도 침착하게 생각해야 해요.', aRo: 'eoryeoul ttaedo chimchakhage saenggakhaeya haeyo.', aZh: '困难的时候也要冷静地思考。' },
    ],
  },
]

// 속담（谚语）：短、好记、结构固定，是学地道表达的捷径
export const proverbIntro =
  '谚语是韩国人聊天里经常顺口带出的一句话，很多和中文成语对得上，学起来特别有成就感。它们大多用"-ㄴ다/-는다"这种平述体结尾，是谚语固有的口气。点卡片听发音，打开"自测"可以先猜意思再点开看。'

export const proverbs = [
  { ko: '가는 말이 고우면 오는 말이 곱다', ro: 'ganeun mari goumyeon oneun mari gopda', zh: '你对别人说话客气，别人对你也客气。', literal: '去的话好听，来的话也好听', equiv: '你敬我一尺，我敬你一丈', use: '劝人说话要客气、别先发火时用。', words: [{ ko: '말', ro: 'mal', zh: '话' }, { ko: '곱다', ro: 'gopda', zh: '好听；漂亮' }] },
  { ko: '시작이 반이다', ro: 'sijagi banida', zh: '开了头就等于成功了一半。', literal: '开始就是一半', equiv: '万事开头难；良好的开端是成功的一半', use: '鼓励自己或别人"先动手再说"。', words: [{ ko: '시작', ro: 'sijak', zh: '开始' }, { ko: '반', ro: 'ban', zh: '一半' }] },
  { ko: '티끌 모아 태산', ro: 'tikkeul moa taesan', zh: '积少成多。', literal: '聚起灰尘成泰山', equiv: '积少成多；聚沙成塔', use: '劝人存钱、每天一点点学习时最常说。', words: [{ ko: '티끌', ro: 'tikkeul', zh: '灰尘；一点点' }, { ko: '태산', ro: 'taesan', zh: '泰山；大山' }] },
  { ko: '누워서 떡 먹기', ro: 'nuwoseo tteok meokgi', zh: '非常容易。', literal: '躺着吃年糕', equiv: '易如反掌', use: '形容一件事特别简单。', words: [{ ko: '눕다', ro: 'nupda', zh: '躺' }, { ko: '떡', ro: 'tteok', zh: '年糕' }] },
  { ko: '원숭이도 나무에서 떨어진다', ro: 'wonsungido namueseo tteoreojinda', zh: '再厉害的人也会有失手的时候。', literal: '猴子也会从树上掉下来', equiv: '人有失手，马有失蹄', use: '安慰犯了错的人。', words: [{ ko: '원숭이', ro: 'wonsungi', zh: '猴子' }, { ko: '떨어지다', ro: 'tteoreojida', zh: '掉落' }] },
  { ko: '호랑이도 제 말 하면 온다', ro: 'horangido je mal hamyeon onda', zh: '刚说到某人，那个人就出现了。', literal: '老虎也是，一提到它就来了', equiv: '说曹操，曹操到', use: '正在聊的人突然走进来时用。', words: [{ ko: '제', ro: 'je', zh: '自己的（제 말＝说到他）' }, { ko: '오다', ro: 'oda', zh: '来' }] },
  { ko: '낮말은 새가 듣고 밤말은 쥐가 듣는다', ro: 'nanmareun saega deutgo bammareun jwiga deutneunda', zh: '说话要小心，隔墙有耳。', literal: '白天的话鸟听见，夜里的话老鼠听见', equiv: '隔墙有耳；要想人不知，除非己莫为', use: '提醒别人背后说话要谨慎。', words: [{ ko: '새', ro: 'sae', zh: '鸟' }, { ko: '쥐', ro: 'jwi', zh: '老鼠' }, { ko: '듣다', ro: 'deutda', zh: '听' }] },
  { ko: '소 잃고 외양간 고친다', ro: 'so ilko oeyanggan gochinda', zh: '事情出了问题才补救，已经晚了。', literal: '丢了牛才修牛棚', equiv: '亡羊补牢（韩语里偏"为时已晚"的意味）', use: '批评做事不防患于未然。', words: [{ ko: '소', ro: 'so', zh: '牛' }, { ko: '잃다', ro: 'ilta', zh: '丢失' }, { ko: '고치다', ro: 'gochida', zh: '修理' }] },
  { ko: '세 살 버릇 여든까지 간다', ro: 'se sal beoreut yeodeunkkaji ganda', zh: '从小养成的习惯会跟一辈子。', literal: '三岁的习惯到八十岁', equiv: '三岁看大，七岁看老', use: '说孩子要从小教好习惯。', words: [{ ko: '버릇', ro: 'beoreut', zh: '习惯；毛病' }, { ko: '여든', ro: 'yeodeun', zh: '八十' }] },
  { ko: '우물 안 개구리', ro: 'umul an gaeguri', zh: '见识狭窄，不知道外面的世界。', literal: '井里的青蛙', equiv: '井底之蛙', use: '提醒自己多出去看看。', words: [{ ko: '우물', ro: 'umul', zh: '井' }, { ko: '개구리', ro: 'gaeguri', zh: '青蛙' }] },
  { ko: '하늘의 별 따기', ro: 'haneurui byeol ttagi', zh: '非常困难，几乎不可能。', literal: '摘天上的星星', equiv: '难于上青天', use: '形容很难实现的事，比如抢到热门演唱会的票。', words: [{ ko: '하늘', ro: 'haneul', zh: '天空' }, { ko: '별', ro: 'byeol', zh: '星星' }, { ko: '따다', ro: 'tada', zh: '摘' }] },
  { ko: '백지장도 맞들면 낫다', ro: 'baekjijangdo matdeulmyeon natda', zh: '再小的事，大家合力做也会更轻松。', literal: '一张白纸也是两个人抬更轻松', equiv: '众人拾柴火焰高', use: '请人帮忙、鼓励合作时说。', words: [{ ko: '백지장', ro: 'baekjijang', zh: '白纸' }, { ko: '맞들다', ro: 'matdeulda', zh: '合力抬' }, { ko: '낫다', ro: 'natda', zh: '更好' }] },
  { ko: '말 한마디로 천 냥 빚을 갚는다', ro: 'mal hanmadiro cheon nyang bijeul gamneunda', zh: '一句话说得好，能化解大麻烦。', literal: '一句话还上千两的债', equiv: '一句话能抵千金；会说话很重要', use: '夸人会说话，或劝人好好说话。', words: [{ ko: '한마디', ro: 'hanmadi', zh: '一句话' }, { ko: '빚', ro: 'bit', zh: '债' }, { ko: '갚다', ro: 'gapda', zh: '偿还' }] },
  { ko: '가랑비에 옷 젖는 줄 모른다', ro: 'garangbie ot jeonneun jul moreunda', zh: '小事不断积累，影响会不知不觉变大。', literal: '毛毛雨下着，衣服湿了也没发觉', equiv: '积少成多（多用于花钱、坏习惯）', use: '提醒小额花销、小坏习惯也会积累成大问题。', words: [{ ko: '가랑비', ro: 'garangbi', zh: '毛毛雨' }, { ko: '젖다', ro: 'jeotda', zh: '被打湿' }] },
]

// 经典文本：训民正音、阿里郎、月亮歌（公有领域，各版本字句略有出入）
export const heritages = [
  {
    id: 'hunmin',
    title: '훈민정음과 한글',
    titleZh: '训民正音与韩文的诞生',
    badge: '现代韩语译文 · 各版本字句略有不同',
    tag: '韩国人几乎都能背几句的"韩文为什么诞生"。',
    intro:
      '15世纪，世宗大王创造了韩文，并在 1446 年以《훈민정음》（训民正音，意为"教导百姓的正确字音"）为名颁布。书里的序文说明了创制的原因。原文是中古韩语，开头是 "나랏말싸미 듕귁에 달아……"，下面是通行的现代韩语译文。',
    culture:
      '韩文每年 10 月 9 日是"한글날"（韩文日）。当初创造了 28 个字母，现在常用的是 24 个（14 个辅音 + 10 个元音），也就是你在"字母"板块学的那些。辅音的形状模仿发音器官：ㄱ 像舌根抵住上颚、ㄴ 像舌尖抵上齿龈、ㅁ 像嘴唇、ㅅ 像牙齿、ㅇ 像喉咙；元音则取自"天（·）、地（ㅡ）、人（ㅣ）"。',
    lines: [
      { ko: '나라의 말이 중국과 달라 한자와 서로 통하지 않으므로', ro: 'naraui mari junggukgwa dalla hanjawa seoro tonghaji aneumeuro', zh: '我国的语言与中国不同，和汉字互不相通，因此……', voice: 'M', who: '' },
      { ko: '어리석은 백성이 하고 싶은 말이 있어도 끝내 자기 뜻을 펴지 못하는 사람이 많다.', ro: 'eoriseogeun baekseongi hago sipeun mari isseodo kkeutnae jagi tteuseul pyeoji motaneun sarami manta.', zh: '愚昧的百姓即使有想说的话，终究无法表达自己心意的人也很多。', voice: 'M', who: '' },
      { ko: '새로 스물여덟 글자를 만드니, 모든 사람이 쉽게 익혀 날마다 쓰는 데 편하게 하고자 할 따름이다.', ro: 'sairo seumulyeodeol geuljareul mandeuni, modeun sarami swipge ikhyeo nalmada sseuneun de pyeonhage hagoja hal ttaramida.', zh: '所以新造了二十八个字，只是希望人人都能轻松学会，每天用起来方便。', voice: 'M', who: '' },
    ],
    words: [
      { ko: '글자', ro: 'geulja', zh: '字；文字' },
      { ko: '백성', ro: 'baekseong', zh: '百姓' },
      { ko: '만들다', ro: 'mandeulda', zh: '制作；创造' },
      { ko: '익히다', ro: 'ikhida', zh: '学会；熟悉' },
      { ko: '편하다', ro: 'pyeonhada', zh: '方便；舒服' },
      { ko: '따름', ro: 'ttareum', zh: '仅仅；而已' },
      { ko: '한글날', ro: 'hangeullal', zh: '韩文日（10月9日）' },
    ],
    points: [
      { head: '-(으)니：（文）既然／所以', text: '"새로 만드니"= 因此新造了……。-(으)니 在书面和古风文字里表示"因为/于是"，现代口语多用 -아서/-어서 或 -(으)니까。' },
      { head: '-고자：为了／想要', text: '"편하게 하고자"= 想让（大家）方便。-고자 表示意图，比 -려고 更书面、更郑重，多见于文告和演讲。' },
      { head: '-ㄹ 따름이다：只不过是……', text: '"할 따름이다"= 不过是……罢了。是很书面的"仅此而已"，口语里一般说 -ㄹ 뿐이에요。' },
      { head: '这是"现代译文"', text: '原文是 15 世纪的中古韩语，字形和语法都和现在很不一样；这里给的是通行的现代韩语译文，所以各版本字句略有出入。' },
    ],
    questions: [
      { ko: '한글은 누가 만들었어요?', ro: 'hangeureun nuga mandeureosseoyo?', zh: '韩文是谁创造的？', aKo: '세종대왕이 만들었어요.', aRo: 'sejongdaewangi mandeureosseoyo.', aZh: '世宗大王创造的。' },
      { ko: '한글날은 언제예요?', ro: 'hangeullareun eonjeyeyo?', zh: '韩文日是什么时候？', aKo: '시월 구일이에요.', aRo: 'siwol guirieyo.', aZh: '十月九日。（注意：10月读作"시월"，不是"십월"）' },
      { ko: '지금 한글은 모두 몇 자예요?', ro: 'jigeum hangeureun modu myeot jayeyo?', zh: '现在的韩文一共有多少个字母？', aKo: '스물네 자예요. 자음 열네 개, 모음 열 개예요.', aRo: 'seumulne jayeyo. jaeum yeolne gae, moeum yeol gaeyeyo.', aZh: '二十四个。辅音十四个，元音十个。' },
    ],
  },
  {
    id: 'songs',
    title: '아리랑 · 달 노래',
    titleZh: '阿里郎与月亮歌',
    badge: '传统民谣 · 各地版本字句略有不同',
    tag: '最能代表韩国的传统民谣，和一首人人会唱的传统童谣。',
    intro:
      '아리랑 是韩国最有代表性的传统民谣，"아리랑 아라리요"是没有实际意思的衬词，唱出来就是旋律和情绪。"달아 달아 밝은 달아"是代代相传的童谣，歌词里的"이태백"（李太白）就是中国唐代诗人李白，传说他醉酒时想捞水中的月亮而落水。',
    culture:
      '아리랑 在 2012 年被联合国教科文组织列入人类非物质文化遗产名录。各地有各自的版本，最有名的是 정선 아리랑、진도 아리랑、밀양 아리랑，这里是流传最广的"본조 아리랑"一带的唱法。歌词里的"십 리"约 4 公里（1 리 ≈ 393 米）；"님"是诗歌里对心上人的雅称。',
    lines: [
      { ko: '아리랑 아리랑 아라리요', ro: 'arirang arirang arariyo', zh: '（衬词：阿里郎，阿里郎，啊啦哩哟）', voice: 'F', who: '' },
      { ko: '아리랑 고개로 나를 넘겨 주소', ro: 'arirang gogaero nareul neomgyeo juso', zh: '请带我翻过阿里郎山岭。', voice: 'F', who: '' },
      { ko: '나를 버리고 가시는 님은', ro: 'nareul beorigo gasineun nimeun', zh: '抛下我离去的郎君啊，', voice: 'F', who: '' },
      { ko: '십 리도 못 가서 발병 난다', ro: 'simnido mot gaseo balbyeong nanda', zh: '走不出十里就会脚痛。', voice: 'F', who: '' },
      { ko: '달아 달아 밝은 달아', ro: 'dara dara balgeun dara', zh: '月亮啊月亮啊，明亮的月亮，', voice: 'F', who: '' },
      { ko: '이태백이 놀던 달아', ro: 'itaebaegi noldeon dara', zh: '李太白曾经赏玩的月亮啊。', voice: 'F', who: '' },
    ],
    words: [
      { ko: '고개', ro: 'gogae', zh: '山岭；（也指头、脖子）' },
      { ko: '님', ro: 'nim', zh: '心上人（诗歌用语）' },
      { ko: '버리다', ro: 'beorida', zh: '抛弃；扔掉' },
      { ko: '발병', ro: 'balbyeong', zh: '脚痛；脚上起泡' },
      { ko: '밝다', ro: 'bakda', zh: '明亮' },
      { ko: '달', ro: 'dal', zh: '月亮' },
      { ko: '놀다', ro: 'nolda', zh: '玩；游玩' },
    ],
    points: [
      { head: '-(으)시는：对长辈/心上人的敬意', text: '"가시는 님"= 离去的郎君。动词加 -(으)시- 表示尊敬对象的动作，再加 -는 修饰名词。歌词里也用来表达敬重或思念。' },
      { head: '-아/어 주소：古风的"请……"', text: '"넘겨 주소"= 请带我翻过去。-소 是"하오체"的命令/请求，现在日常口语已不用，多见于民谣、古装剧（比如《爱的迫降》里리정혁的口吻）。' },
      { head: '-도 못 가서：连……都走不到就……', text: '"십 리도 못 가서"= 走不出十里就……。"-도 못 V"表示连很低的标准都没达到。' },
      { head: '呼语 -아／-야', text: '"달아 달아"= 月亮啊月亮啊。名词后面加 -아/-야 是呼唤的说法，和故事里的"얘들아"、"아가야"是同一个用法。' },
    ],
    questions: [],
  },
]

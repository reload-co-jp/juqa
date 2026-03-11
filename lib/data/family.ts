export const families: Family[] = [
  {
    id: 1,
    name: "バラ科",
    description: "バラ目に属する双子葉植物の科。世界中に約3000種が分布する。",
    characteristics: [
      "花弁5枚",
      "葉に鋸歯あり",
      "果実は多様（さくらんぼ・梨・りんごなど）",
    ],
    classification: "被子植物",
  },
  {
    id: 2,
    name: "ムクロジ科",
    description:
      "カエデ亜科を含む科。日本では秋の紅葉で知られるカエデ類が有名。",
    characteristics: [
      "対生する葉",
      "翼果（プロペラ型の実）",
      "手のひら状に裂ける葉が多い",
    ],
    classification: "被子植物",
  },
  {
    id: 3,
    name: "クスノキ科",
    description: "熱帯・亜熱帯に多い常緑樹の科。芳香性の精油を含む種が多い。",
    characteristics: [
      "常緑の光沢ある葉",
      "3本の葉脈が目立つ",
      "樟脳の独特な香り",
    ],
    classification: "被子植物",
  },
  {
    id: 4,
    name: "ニレ科",
    description: "温帯を中心に分布する落葉樹の科。街路樹として広く利用される。",
    characteristics: [
      "葉の基部が非対称",
      "単葉で鋸歯あり",
      "小さな翼果をつける",
    ],
    classification: "被子植物",
  },
  {
    id: 5,
    name: "イチョウ科",
    description:
      "現存する最古の樹木グループの一つ。イチョウ1種のみからなる科。",
    characteristics: ["扇形の葉", "葉脈が二又分岐", "雌雄異株"],
    classification: "裸子植物",
  },
  {
    id: 6,
    name: "ブナ科",
    description:
      "北半球の温帯に広く分布する落葉・常緑樹の科。どんぐりで知られる。",
    characteristics: ["どんぐり（堅果と殻斗）", "単葉", "風媒花"],
    classification: "被子植物",
  },
  {
    id: 7,
    name: "ヒノキ科",
    description:
      "常緑針葉樹の科。日本では建築材として重要なヒノキ・スギが含まれる。",
    characteristics: ["鱗片状または針状の葉", "球果（まつぼっくり型）", "常緑"],
    classification: "裸子植物",
  },
  {
    id: 8,
    name: "マツ科",
    description: "針葉樹の代表的な科。世界中の温帯・寒帯に分布する。",
    characteristics: ["束生する針葉", "大型の球果", "樹脂（松やに）を多く含む"],
    classification: "裸子植物",
  },
  {
    id: 9,
    name: "キク科",
    description: "双子葉植物の中で最大の科の一つ。頭状花序が特徴。",
    characteristics: [
      "頭状花序",
      "舌状花と筒状花からなる",
      "冠毛（綿毛）を持つ種が多い",
    ],
    classification: "被子植物",
  },
  {
    id: 10,
    name: "マメ科",
    description: "豆を実らせる植物の科。根粒菌と共生し窒素固定を行う。",
    characteristics: ["蝶形花", "さや状の果実", "3出複葉または羽状複葉"],
    classification: "被子植物",
  },
  {
    id: 11,
    name: "スミレ科",
    description: "春に小さな可憐な花を咲かせる植物の科。",
    characteristics: [
      "5枚の花弁（下の1枚に距あり）",
      "葉は単葉",
      "閉鎖花をつける",
    ],
    classification: "被子植物",
  },
  {
    id: 12,
    name: "ツユクサ科",
    description: "熱帯・亜熱帯を中心に分布する一年草・多年草の科。",
    characteristics: [
      "3枚の花弁",
      "葉鞘（さや）で茎を抱く",
      "朝に開花し午後にしぼむ",
    ],
    classification: "被子植物",
  },
  {
    id: 13,
    name: "モクレン科",
    description:
      "被子植物の中でも原始的なグループ。早春に葉より先に大きな花を咲かせる種が多い。",
    characteristics: [
      "葉より先に大きな花を咲かせる",
      "花弁と萼片が区別しにくい",
      "果実は集合果",
    ],
    classification: "被子植物",
  },
  {
    id: 14,
    name: "ツバキ科",
    description:
      "東アジアを中心に分布する常緑樹の科。美しい花と光沢のある葉が特徴。",
    characteristics: [
      "常緑で光沢のある厚い葉",
      "花弁は5枚以上",
      "雄しべが多数",
    ],
    classification: "被子植物",
  },
  {
    id: 15,
    name: "アジサイ科",
    description: "東アジアに多い落葉低木の科。梅雨の時期に咲く花で知られる。",
    characteristics: [
      "装飾花（萼片が花弁状）を持つ",
      "対生する葉",
      "花色が土壌pHで変化",
    ],
    classification: "被子植物",
  },
  {
    id: 16,
    name: "シソ科",
    description:
      "世界中に約7000種が分布する大きな科。多くの種が芳香性の精油を含む。",
    characteristics: [
      "茎が四角形",
      "唇形花（上唇・下唇に分かれる）",
      "葉が対生",
    ],
    classification: "被子植物",
  },
  {
    id: 17,
    name: "イチイ科",
    description:
      "北半球に広く分布する常緑針葉樹の科。球果を作らず赤い仮種皮をもつ種子をつける。",
    characteristics: [
      "赤い仮種皮に包まれた種子",
      "平らな針状葉が左右に並ぶ",
      "葉・種子は有毒（仮種皮のみ食べられる）",
    ],
    classification: "裸子植物",
  },
  {
    id: 18,
    name: "ケシ科",
    description:
      "世界中に約800種が分布する科。独特な形の花と乳液を含む種が多い。高山植物から薬用植物まで幅広い。",
    characteristics: [
      "花弁は4枚（2枚ずつ対になる）",
      "独特な形の花（距をもつ種が多い）",
      "果実は蒴果（さくか）",
    ],
    classification: "被子植物",
  },
  {
    id: 19,
    name: "リンドウ科",
    description:
      "温帯から高山帯に分布する草本の科。秋に青紫の花を咲かせる種が多く、晴天でのみ開花する。",
    characteristics: [
      "筒状の花（4〜5裂）",
      "晴天でのみ開花する（日光で開く）",
      "葉は対生で全縁",
    ],
    classification: "被子植物",
  },
  {
    id: 20,
    name: "ドクダミ科",
    description:
      "東アジアに分布する草本の小さな科。独特の強い臭気をもち、薬用植物として知られる。",
    characteristics: [
      "強い独特の臭気",
      "白い4枚の総苞片（花弁に見える）が十字型",
      "ハート型の葉",
    ],
    classification: "被子植物",
  },
  {
    id: 21,
    name: "イネ科",
    description:
      "世界中に約10000種が分布する大科。穀物（コメ・ムギ・トウモロコシ）を含む最も重要な植物群の一つ。",
    characteristics: [
      "中空の茎（稈）と節",
      "細長い葉と葉鞘",
      "風媒花（穂状の花序）",
    ],
    classification: "被子植物",
  },
  {
    id: 22,
    name: "ユリ科",
    description:
      "北半球を中心に分布する球根植物の科。大きく美しい花をつける種が多く、観賞植物として広く利用される。",
    characteristics: [
      "6枚の花被片（花弁3＋萼片3）",
      "球根（鱗茎）をもつ",
      "葉脈が平行",
    ],
    classification: "被子植物",
  },
  {
    id: 23,
    name: "オオバコ科",
    description:
      "世界中に分布する草本の科。踏まれても強く、道端・草地に広く生える種が多い。",
    characteristics: [
      "根生葉のみで平行脈が目立つ",
      "穂状の花序",
      "踏み荒らされた場所に適応",
    ],
    classification: "被子植物",
  },
  {
    id: 24,
    name: "ミズキ科",
    description:
      "北半球の温帯に広く分布する落葉樹の科。水平に段状に広がる枝ぶりと白い小花が特徴。",
    characteristics: [
      "水平に段状に広がる枝",
      "白い小花が散房花序に集まる",
      "秋に青黒い実をつける",
    ],
    classification: "被子植物",
  },
  {
    id: 25,
    name: "キンポウゲ科",
    description:
      "北半球の温帯・寒帯に多く分布する草本の科。春に咲く山野草を多く含む。",
    characteristics: [
      "花弁状の萼片をもつ種が多い",
      "葉は掌状または羽状に切れ込む",
      "果実は集合果（痩果の集まり）",
    ],
    classification: "被子植物",
  },
  {
    id: 26,
    name: "シュロソウ科",
    description:
      "北半球に分布する多年草の科。湿った山地や高山帯に生える種が多い。",
    characteristics: [
      "根生葉が密生し、葉脈が平行",
      "花は小さく花被片6枚",
      "湿地・高山・山地に生育",
    ],
    classification: "被子植物",
  },
  {
    id: 27,
    name: "キジカクシ科",
    description:
      "世界中に広く分布する単子葉植物の科。観賞植物として利用される種が多い。",
    characteristics: [
      "葉脈が平行",
      "花被片6枚（花弁3＋萼片3が同形）",
      "根茎や球根をもつ種が多い",
    ],
    classification: "被子植物",
  },
  {
    id: 28,
    name: "カツラ科",
    description:
      "東アジアに固有の落葉高木の科。カツラ属のみを含む単型科で、秋の甘い香りで知られる。",
    characteristics: [
      "ハート形の対生葉",
      "落葉時にカラメルのような甘い香り",
      "雌雄異株",
    ],
    classification: "被子植物",
  },
  {
    id: 29,
    name: "スズカケノキ科",
    description:
      "北半球の温帯に分布する落葉高木の科。大きな葉と球状の果実、まだら模様の樹皮が特徴。",
    characteristics: [
      "大きな掌状の葉",
      "球状の集合果が垂れ下がる",
      "樹皮が白〜褐色のまだら模様に剥げる",
    ],
    classification: "被子植物",
  },
  {
    id: 30,
    name: "ヤナギ科",
    description:
      "北半球の温帯・寒帯に広く分布する落葉樹の科。湿地や川沿いに生える種が多い。",
    characteristics: ["細長い葉が多い", "雌雄異株", "種子に綿毛をもち風散布"],
    classification: "被子植物",
  },
  {
    id: 31,
    name: "モッコク科",
    description:
      "東・東南アジアに分布する常緑樹の科。日本の庭木の「三大名木」のひとつとされる。",
    characteristics: [
      "厚くて光沢のある常緑葉",
      "白い小花で芳香あり",
      "秋に赤い実をつける",
    ],
    classification: "被子植物",
  },
  {
    id: 32,
    name: "モクセイ科",
    description:
      "熱帯〜温帯に広く分布する木本・草本の科。芳香のある花をつける種が多い。",
    characteristics: [
      "対生する葉",
      "花弁は4枚が合着した筒状",
      "芳香のある花が多い",
    ],
    classification: "被子植物",
  },
  {
    id: 33,
    name: "レンプクソウ科",
    description:
      "北半球を中心に分布する木本・草本の科。ガマズミ属・ニワトコ属などを含む。",
    characteristics: [
      "対生する葉",
      "白い小花が散房・円錐花序に集まる",
      "秋に赤〜黒い液果をつける",
    ],
    classification: "被子植物",
  },
  {
    id: 34,
    name: "アブラナ科",
    description:
      "世界中に広く分布する草本の科。十字形の4枚の花弁が特徴で、菜の花類・大根・キャベツなど有用植物が多い。",
    characteristics: [
      "花弁4枚が十字形に並ぶ",
      "雄しべ6本（外側2本が短い）",
      "果実は角果（長角果または短角果）",
    ],
    classification: "被子植物",
  },
  {
    id: 35,
    name: "セリ科",
    description:
      "世界中に広く分布する草本の科。複散形花序と独特の香りをもつ種が多く、食用・薬用植物を含む。",
    characteristics: [
      "白〜淡黄色の小花が複散形花序に集まる",
      "葉は羽状または掌状に深く切れ込む",
      "茎は中空で独特の香りをもつ種が多い",
    ],
    classification: "被子植物",
  },
  {
    id: 36,
    name: "ナデシコ科",
    description:
      "世界中の温帯に広く分布する草本の科。花弁5枚で先端が切れ込む種が多く、道端・草地に生える雑草も多い。",
    characteristics: [
      "花弁5枚（先端が切れ込む種が多い）",
      "茎の節が膨らむ",
      "対生する単葉",
    ],
    classification: "被子植物",
  },
  {
    id: 37,
    name: "アヤメ科",
    description:
      "北半球の温帯を中心に分布する多年草の科。球根または根茎をもち、美しい花を咲かせる観賞植物が多い。",
    characteristics: [
      "花被片6枚（外花被3枚・内花被3枚）",
      "葉は剣状・扇状に二列に並ぶ",
      "根茎または球根をもつ",
    ],
    classification: "被子植物",
  },
  {
    id: 38,
    name: "ヒガンバナ科",
    description:
      "世界中の熱帯・温帯に分布する球根植物の科。独特の形の花と球根（鱗茎）をもつ種が多い。",
    characteristics: [
      "球根（鱗茎）をもつ",
      "花被片6枚",
      "葉と花が同時に出ない種が多い",
    ],
    classification: "被子植物",
  },
]

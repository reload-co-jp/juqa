export type Family = {
  id: number
  name: string
  description: string
  characteristics: string[]
}

export type Plant = {
  id: number
  japanese_name: string
  scientific_name: string
  family_id: number
  genus: string
  description: string[]
  identification: string[]
  distribution: string
  image_url: string
  similar_plant_ids: number[]
}

export type Quiz = {
  id: number
  type: "photo" | "feature" | "identification"
  question: string
  answer: string
  choices: string[]
  plant_id: number | null
}

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
  },
  {
    id: 5,
    name: "イチョウ科",
    description:
      "現存する最古の樹木グループの一つ。イチョウ1種のみからなる科。",
    characteristics: ["扇形の葉", "葉脈が二又分岐", "雌雄異株"],
  },
  {
    id: 6,
    name: "ブナ科",
    description:
      "北半球の温帯に広く分布する落葉・常緑樹の科。どんぐりで知られる。",
    characteristics: ["どんぐり（堅果と殻斗）", "単葉", "風媒花"],
  },
  {
    id: 7,
    name: "ヒノキ科",
    description:
      "常緑針葉樹の科。日本では建築材として重要なヒノキ・スギが含まれる。",
    characteristics: ["鱗片状または針状の葉", "球果（まつぼっくり型）", "常緑"],
  },
  {
    id: 8,
    name: "マツ科",
    description: "針葉樹の代表的な科。世界中の温帯・寒帯に分布する。",
    characteristics: ["束生する針葉", "大型の球果", "樹脂（松やに）を多く含む"],
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
  },
  {
    id: 10,
    name: "マメ科",
    description: "豆を実らせる植物の科。根粒菌と共生し窒素固定を行う。",
    characteristics: ["蝶形花", "さや状の果実", "3出複葉または羽状複葉"],
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
  },
]

export const plants: Plant[] = [
  {
    id: 1,
    japanese_name: "ソメイヨシノ",
    scientific_name: "Cerasus × yedoensis",
    family_id: 1,
    genus: "サクラ属",
    description: [
      "春に淡いピンクの花を咲かせる。日本全国の代表的な花見の木。",
      "葉は楕円形でギザギザ（鋸歯）がある。花が散ると同時に葉が出る。",
      "江戸時代末期に作出されたエドヒガンとオオシマザクラの雑種と考えられている。",
    ],
    identification: [
      "花が葉より先に咲く",
      "樹皮に横縞（皮目）がある",
      "花弁は5枚で先端がわずかに切れ込む",
      "花びらの色は白〜淡いピンク",
    ],
    distribution: "全国（植栽）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/2020-04-07_Prunus_%C3%97_yedoensis_Tambasasayama%2CHyogo%28%E4%B8%B9%E6%B3%A2%E7%AF%A0%E5%B1%B1%E5%B8%82%E7%AF%A0%E5%B1%B1%E5%B7%9D%E3%81%AE%E3%82%BD%E3%83%A1%E3%82%A4%E3%83%A8%E3%82%B7%E3%83%8E%29DSCF2986%E2%98%86%E5%BD%A1.jpg",
    similar_plant_ids: [16, 17],
  },
  {
    id: 2,
    japanese_name: "イロハモミジ",
    scientific_name: "Acer palmatum",
    family_id: 2,
    genus: "カエデ属",
    description: [
      "秋に鮮やかな紅葉を見せる日本を代表する紅葉樹。",
      "葉は5〜7裂し、手のひら状に深く切れ込む。",
      "春に小さな赤い花を咲かせる。",
    ],
    identification: [
      "葉が5〜7裂の手のひら型",
      "対生する葉",
      "プロペラ型の翼果（種子）",
      "秋に赤〜橙色に紅葉",
    ],
    distribution: "本州〜九州の山地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Acer_palmatum0.jpg",
    similar_plant_ids: [19],
  },
  {
    id: 3,
    japanese_name: "クスノキ",
    scientific_name: "Cinnamomum camphora",
    family_id: 3,
    genus: "ニッケイ属",
    description: [
      "常緑の大木で、独特の樟脳の香りが特徴。神社の御神木として多く見られる。",
      "葉は光沢があり、裏面の葉脈の交点にダニ室（ダマティア）がある。",
      "成長が速く、大きなものは幹回りが数メートルにもなる。",
    ],
    identification: [
      "葉を揉むと樟脳の香り",
      "葉脈が3本（三行脈）",
      "常緑で光沢のある葉",
      "樹皮は縦に裂ける",
    ],
    distribution: "本州（関東以西）〜沖縄",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tsuboi-Hachimangu_Kusunoki(Osaka_midorino_hyakusen).jpg",
    similar_plant_ids: [],
  },
  {
    id: 4,
    japanese_name: "ケヤキ",
    scientific_name: "Zelkova serrata",
    family_id: 4,
    genus: "ケヤキ属",
    description: [
      "街路樹や公園樹として最も多く植えられる落葉高木。",
      "箒を逆さにしたような樹形が特徴。秋には黄〜橙色に紅葉する。",
      "木材は硬く、家具や建築材として重用される。",
    ],
    identification: [
      "葉は単葉で先端が尖り、鋸歯がある",
      "葉の基部がやや非対称",
      "滑らかな樹皮が剥がれてまだら模様になる",
      "秋に黄橙色に紅葉",
    ],
    distribution: "全国",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Zelkova_serrata_Noma_keyaki01.jpg",
    similar_plant_ids: [],
  },
  {
    id: 5,
    japanese_name: "イチョウ",
    scientific_name: "Ginkgo biloba",
    family_id: 5,
    genus: "イチョウ属",
    description: [
      "扇形の葉と銀杏（ぎんなん）で知られる裸子植物。生きた化石とも呼ばれる。",
      "雌雄異株で、雌株が銀杏の実をつける。秋に美しく黄葉する。",
      "病害虫に強く、大気汚染にも比較的耐性がある。",
    ],
    identification: [
      "扇形の葉（中央にV字の切れ込みあり）",
      "葉脈が二又分岐（二叉脈）",
      "秋に黄色く紅葉（黄葉）",
      "雌株は秋に銀杏の実をつける",
    ],
    distribution: "全国（植栽）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/GINKGOBAUM-2.jpg",
    similar_plant_ids: [],
  },
  {
    id: 6,
    japanese_name: "コナラ",
    scientific_name: "Quercus serrata",
    family_id: 6,
    genus: "コナラ属",
    description: [
      "里山の代表的な落葉高木。どんぐりをつけるナラの一種。",
      "薪炭材として古くから利用されてきた。秋に黄〜褐色に紅葉する。",
      "クヌギと並んでカブトムシ・クワガタが集まる樹木として知られる。",
    ],
    identification: [
      "葉は倒卵形〜楕円形で波状の鋸歯",
      "どんぐりは小さくほぼ球形",
      "樹皮は灰褐色で縦に裂ける",
      "葉の裏は白っぽい",
    ],
    distribution: "全国の山地・丘陵地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Quercus_serrata3.jpg",
    similar_plant_ids: [7, 20],
  },
  {
    id: 7,
    japanese_name: "クヌギ",
    scientific_name: "Quercus acutissima",
    family_id: 6,
    genus: "コナラ属",
    description: [
      "コナラと並ぶ里山の代表的な落葉高木。大きなどんぐりで有名。",
      "樹液が出やすく、夏にカブトムシやクワガタが集まる。",
      "薪炭材・シイタケの原木として広く利用される。",
    ],
    identification: [
      "葉は細長く、先端が針状の鋸歯",
      "大きなどんぐり（殻斗が総苞片で覆われる）",
      "樹皮は深く縦に裂け、コルク質",
      "葉の表面がコナラより細長い",
    ],
    distribution: "全国の低山",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lasdon_Arboretum_-_Quercus_acutissima_-_IMG_1516.jpg",
    similar_plant_ids: [6, 20],
  },
  {
    id: 8,
    japanese_name: "ヒノキ",
    scientific_name: "Chamaecyparis obtusa",
    family_id: 7,
    genus: "ヒノキ属",
    description: [
      "日本固有の常緑針葉樹。建築材・工芸材として最も重要な樹木の一つ。",
      "葉は鱗片状で、裏面にY字型の白い気孔帯がある。",
      "独特の芳香があり、「ヒノキ風呂」としても親しまれる。",
    ],
    identification: [
      "葉の裏にY字（蝶型）の白い模様",
      "球果は直径約1cmの球形",
      "樹皮は赤褐色で縦に薄く剥がれる",
      "葉を揉むとヒノキの香り",
    ],
    distribution: "本州〜九州の山地",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chamaecyparis_obtusa_01.jpg/960px-Chamaecyparis_obtusa_01.jpg",
    similar_plant_ids: [9],
  },
  {
    id: 9,
    japanese_name: "スギ",
    scientific_name: "Cryptomeria japonica",
    family_id: 7,
    genus: "スギ属",
    description: [
      "日本固有の常緑針葉樹で、日本で最も広く植林されている樹木。",
      "真っすぐに伸びる樹形と赤褐色の樹皮が特徴。花粉症の原因としても知られる。",
      "日本書紀にも記されるほど古くから利用されてきた。",
    ],
    identification: [
      "針状の葉が螺旋状につく",
      "球果は直径2〜3cmで表面にとげ状の突起",
      "樹皮は赤褐色で縦に薄く剥がれる",
      "ヒノキより葉が針状で細い",
    ],
    distribution: "全国（植林）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Taro-sugi_20111002.jpg",
    similar_plant_ids: [8],
  },
  {
    id: 10,
    japanese_name: "クロマツ",
    scientific_name: "Pinus thunbergii",
    family_id: 8,
    genus: "マツ属",
    description: [
      "海岸に多く分布する常緑針葉樹。日本の海岸風景を代表する松の一種。",
      "防風・防砂林として植えられることが多い。盆栽の素材としても人気。",
      "アカマツと並んで日本を代表するマツ。",
    ],
    identification: [
      "針葉が2本束（複葉）で長さ7〜12cm",
      "樹皮は黒灰色で厚くゴツゴツしている",
      "球果は卵形で長さ3〜6cm",
      "アカマツより樹皮が黒い",
    ],
    distribution: "本州〜九州の海岸沿い",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Japanese_Black_Pine%2C_National_Garden%2C_Tokyo.jpg",
    similar_plant_ids: [22],
  },
  {
    id: 11,
    japanese_name: "タンポポ",
    scientific_name: "Taraxacum spp.",
    family_id: 9,
    genus: "タンポポ属",
    description: [
      "春から秋にかけて黄色い花を咲かせる多年草。道端や公園で最もよく見られる野草の一つ。",
      "綿毛（冠毛）のついた種子が風で飛散する。根はたんぽぽ茶に利用される。",
      "日本タンポポと外来種（セイヨウタンポポ）がある。",
    ],
    identification: [
      "黄色い頭状花序",
      "根生葉のみ（茎がない）でギザギザの葉",
      "綿毛（白い球形）で種子を飛ばす",
      "総苞片が反り返るのはセイヨウタンポポ",
    ],
    distribution: "全国の草地・道端",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/DandelionFlower.jpg",
    similar_plant_ids: [24],
  },
  {
    id: 12,
    japanese_name: "シロツメクサ",
    scientific_name: "Trifolium repens",
    family_id: 10,
    genus: "シャジクソウ属",
    description: [
      "白い球状の花と三つ葉が特徴のヨーロッパ原産の多年草。クローバーとも呼ばれる。",
      "四つ葉のクローバーは幸運の象徴として知られる。蜜が豊富でミツバチが集まる。",
      "根粒菌と共生し、土壌の窒素を固定する。",
    ],
    identification: [
      "3枚の小葉からなる複葉（稀に4枚）",
      "白い球状の頭状花序",
      "葉に白い斑紋（V字型）がある",
      "地面を這うように成長する",
    ],
    distribution: "全国の草地・道端",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Trifolium_repens_-_white_clover_on_way_from_Govindghat_to_Gangria_at_Valley_of_Flowers_National_Park_-_during_LGFC_-_VOF_2019_(1).jpg",
    similar_plant_ids: [],
  },
  {
    id: 13,
    japanese_name: "ヨモギ",
    scientific_name: "Artemisia indica var. maximowiczii",
    family_id: 9,
    genus: "ヨモギ属",
    description: [
      "春の野草として古くから食用・薬用に利用されてきた多年草。草餅に使われる。",
      "独特の強い香りがある。秋に細かい花を咲かせる。花粉症の原因にもなる。",
      "日本各地の道端・土手・野原に生える。",
    ],
    identification: [
      "独特の強い香り（よもぎの香）",
      "葉の裏が白い綿毛に覆われる",
      "羽状に深く裂けた葉",
      "秋に穂状の細かい花をつける",
    ],
    distribution: "全国の草地・道端",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mugwort_imported_from_iNaturalist_photo_180771010_on_26_August_2024.jpg",
    similar_plant_ids: [],
  },
  {
    id: 14,
    japanese_name: "スミレ",
    scientific_name: "Viola mandshurica",
    family_id: 11,
    genus: "スミレ属",
    description: [
      "春に紫色の小さな花を咲かせる多年草。身近な場所に生える親しみやすい野草。",
      "花は5枚の花弁を持ち、下の1枚に距（きょ）がある。",
      "種は蟻によって運ばれる（蟻散布）。",
    ],
    identification: [
      "紫色の5花弁の花",
      "下の花弁に蜜標（ネクターガイド）の線",
      "細長い葉（スミレの特徴）",
      "春のみ咲く（閉鎖花も後で咲く）",
    ],
    distribution: "全国の日当たりの良い草地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Viola_mandshurica_(200704).jpg",
    similar_plant_ids: [33],
  },
  {
    id: 15,
    japanese_name: "ツユクサ",
    scientific_name: "Commelina communis",
    family_id: 12,
    genus: "ツユクサ属",
    description: [
      "夏から秋にかけて青い花を咲かせる一年草。朝開いて午後にはしぼむ。",
      "2枚の大きな青い花弁と1枚の小さな白い花弁が特徴。染料として古くから利用された。",
      "道端や畑の畦など、身近な場所に多く生える。",
    ],
    identification: [
      "鮮やかな青い花弁2枚と白い花弁1枚",
      "朝に開花し午後にしぼむ",
      "葉鞘で茎を抱く",
      "茎は地面を這い節から根を出す",
    ],
    distribution: "全国の道端・畑",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tagblume_Commelina_communis_stack25_2019-08-05-RM-8050218-PSD.jpg",
    similar_plant_ids: [],
  },
  {
    id: 16,
    japanese_name: "ウメ",
    scientific_name: "Prunus mume",
    family_id: 1,
    genus: "サクラ属",
    description: [
      "早春（1〜3月）に葉より先に白〜ピンクの花を咲かせる落葉小高木。中国原産で奈良時代以前に渡来。",
      "梅干し・梅酒・梅シロップなど食用として幅広く利用される。",
      "甘い香りが特徴で、古来より詩歌に多く詠まれてきた。",
    ],
    identification: [
      "花が葉より先に咲く（1〜3月、サクラより早い）",
      "花弁が丸く開く（サクラより丸みがある）",
      "樹皮がざらざらして縦に裂ける",
      "枝の先が短い棘状になることがある",
    ],
    distribution: "全国（栽培・植栽）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Prunus_mume.JPG",
    similar_plant_ids: [1, 17],
  },
  {
    id: 17,
    japanese_name: "ヤマザクラ",
    scientific_name: "Cerasus jamasakura",
    family_id: 1,
    genus: "サクラ属",
    description: [
      "日本固有の野生の桜。山地の落葉広葉樹林に自生し、古来より「花の王」として愛でられてきた。",
      "花と赤みを帯びた若葉が同時に展開するのが最大の特徴。",
      "木材は版木・家具・楽器に利用される。ソメイヨシノより長命。",
    ],
    identification: [
      "花と赤みを帯びた若葉が同時に展開する",
      "花びらは白〜淡いピンク（ソメイヨシノより白い傾向）",
      "樹皮に横縞があり水平に剥がれる",
      "ソメイヨシノより花期がやや遅い",
    ],
    distribution: "全国の山地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Branches_of_Cerasus_jamasakura_at_Mount_Obukuma_Saga.JPG",
    similar_plant_ids: [1, 16],
  },
  {
    id: 18,
    japanese_name: "ノイバラ",
    scientific_name: "Rosa multiflora",
    family_id: 1,
    genus: "バラ属",
    description: [
      "山野に自生する野生のバラ。初夏に白い5弁花を多数咲かせる。",
      "秋に小さな赤い果実（ローズヒップ）が実る。枝に鋭いトゲがある。",
      "バラ栽培の台木として利用される。生垣にも植えられる。",
    ],
    identification: [
      "白い5弁花（径2cm程度）が多数集まって咲く",
      "枝に鋭いトゲがある",
      "秋に小さな赤い実（ローズヒップ）がなる",
      "葉は奇数羽状複葉（5〜9枚の小葉）",
    ],
    distribution: "全国の山野・道端",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/2020-05-20_08_05_42_Multiflora_Rose_flowers_along_a_walking_path_within_Horsepen_Run_Stream_Valley_Park_in_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg",
    similar_plant_ids: [],
  },
  {
    id: 19,
    japanese_name: "トウカエデ",
    scientific_name: "Acer buergerianum",
    family_id: 2,
    genus: "カエデ属",
    description: [
      "中国原産の落葉高木。街路樹として最も多く用いられるカエデの一種。",
      "葉は3裂し、イロハモミジより切れ込みが浅い。秋に橙〜赤に紅葉する。",
      "排気ガスや乾燥に強く、都市環境に適している。",
    ],
    identification: [
      "葉は3裂（イロハモミジの5〜7裂より浅い）",
      "葉の先端3つが前向きに揃う（鴨の足型）",
      "対生する葉",
      "秋に橙〜赤に紅葉",
    ],
    distribution: "全国（街路樹として植栽）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Morris_Arboretum_Acer_buergerianum.JPG",
    similar_plant_ids: [2],
  },
  {
    id: 20,
    japanese_name: "シラカシ",
    scientific_name: "Quercus myrsinifolia",
    family_id: 6,
    genus: "コナラ属",
    description: [
      "関東以西に多い常緑高木。カシ類の中でも特に多く見られる種。",
      "葉は細長く光沢があり、一年中青々とした葉を保つ。防風・生垣・街路樹に利用される。",
      "里山や神社の鎮守の森によく見られる。",
    ],
    identification: [
      "常緑で細長い葉（葉先が尖る）",
      "葉の上半分にだけ鋸歯がある",
      "細長いどんぐり（長さ1〜1.5cm）",
      "コナラより葉が細長く光沢がある",
    ],
    distribution: "本州（関東以西）〜九州",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Chinese_evergreen_oak_(Quercus_myrsinifolia)_(22245673008).jpg",
    similar_plant_ids: [6, 7],
  },
  {
    id: 21,
    japanese_name: "スダジイ",
    scientific_name: "Castanopsis sieboldii",
    family_id: 6,
    genus: "シイ属",
    description: [
      "暖温帯を代表する常緑高木。シイの実（可食のどんぐり）で知られる。",
      "神社の境内や暖地の照葉樹林を代表する樹木。古い木は巨木になる。",
      "実は炒ったり生でも食べられる。樹形が大きく、御神木にもなる。",
    ],
    identification: [
      "常緑で葉の裏が金褐色〜黄褐色（光にかざすと金色に見える）",
      "葉先が尖り、基部近くまで全縁（鋸歯がほとんどない）",
      "どんぐりが殻（斗）に包まれる（椎の実）",
      "樹皮は暗灰色で縦に裂ける",
    ],
    distribution: "本州（関東以西）〜沖縄の暖温帯",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Castanopsis_sieboldii2.jpg",
    similar_plant_ids: [6],
  },
  {
    id: 22,
    japanese_name: "アカマツ",
    scientific_name: "Pinus densiflora",
    family_id: 8,
    genus: "マツ属",
    description: [
      "日本を代表するマツの一種。山地・丘陵地に広く分布する常緑針葉樹。",
      "松茸の共生樹として知られ、松茸山はアカマツ林が多い。",
      "樹皮が赤褐色を帯びることが名前の由来。クロマツより内陸・山地に多い。",
    ],
    identification: [
      "針葉が2本束で長さ5〜12cm（クロマツより細くやわらかい）",
      "樹皮が赤褐色（クロマツは黒灰色）",
      "球果は卵形で長さ3〜5cm",
      "クロマツより樹皮が薄く、上部ほど赤みが強い",
    ],
    distribution: "全国の山地・丘陵地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Pinus_densiflora_Towada.jpg",
    similar_plant_ids: [10],
  },
  {
    id: 23,
    japanese_name: "セイタカアワダチソウ",
    scientific_name: "Solidago altissima",
    family_id: 9,
    genus: "アキノキリンソウ属",
    description: [
      "北米原産の帰化植物。秋に黄色い花穂を多数つける多年草。戦後急速に全国へ広まった。",
      "荒地・土手・道端に大群生することが多い。かつて花粉症の原因と誤解されたが虫媒花。",
      "根茎から広がる旺盛な繁殖力で、在来植物を圧迫することがある。",
    ],
    identification: [
      "秋に黄色い花穂を多数つける（高さ1〜2m）",
      "葉は細長く、三行脈（主脈と2本の側脈が目立つ）",
      "茎は直立してあまり分岐しない",
      "根茎から群落を形成する",
    ],
    distribution: "全国の荒地・道端・土手",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Solidago_altissima_161401409.jpg",
    similar_plant_ids: [],
  },
  {
    id: 24,
    japanese_name: "ハルジオン",
    scientific_name: "Erigeron philadelphicus",
    family_id: 9,
    genus: "ムカシヨモギ属",
    description: [
      "北米原産の帰化植物。春から初夏にかけて白〜淡いピンクの花を咲かせる。",
      "ヒメジョオンと混同されやすいが、蕾が垂れ下がることで区別できる。",
      "道端・草地・公園に広く分布する一〜二年草。",
    ],
    identification: [
      "白〜淡いピンクの頭状花序（舌状花が非常に細い）",
      "蕾が下を向いて垂れる（ヒメジョオンは垂れない）",
      "茎が中空（折ると空洞がある）",
      "根生葉が地面に広がり、茎葉は茎を抱く",
    ],
    distribution: "全国の道端・草地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Philadelphia_Fleabane.jpg",
    similar_plant_ids: [11],
  },
  {
    id: 25,
    japanese_name: "フジ",
    scientific_name: "Wisteria floribunda",
    family_id: 10,
    genus: "フジ属",
    description: [
      "春に芳香のある紫〜白の花穂を垂らすつる性落葉木本。日本固有種。",
      "樹木に絡みついて高く登り、花房は長さ30〜90cmにも達する。",
      "古来より詩歌に詠まれ、藤棚として庭園に植えられる。家紋にも多く使われる。",
    ],
    identification: [
      "長い花穂（穂状花序）が垂れ下がる（春）",
      "花は薄紫〜白で蝶形",
      "奇数羽状複葉（11〜19枚の小葉）",
      "つる性でほかの木に絡みつく",
    ],
    distribution: "全国の山地・公園（植栽も多い）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Wisteria_floribunda5.jpg",
    similar_plant_ids: [],
  },
  {
    id: 26,
    japanese_name: "ネムノキ",
    scientific_name: "Albizia julibrissin",
    family_id: 10,
    genus: "ネムノキ属",
    description: [
      "夏に紅白の糸状の花を咲かせる落葉高木。夜になると葉が閉じることでも知られる。",
      "葉は2回羽状複葉で、夜や曇りの日には葉が閉じる（就眠運動）。",
      "川沿いや山地に多い。庭木・公園樹としても植えられる。",
    ],
    identification: [
      "夏に糸状のピンク・白の花が咲く（ブラシ状）",
      "2回羽状複葉（細かい小葉が多数）で夜に閉じる",
      "秋に平たい豆果（さや）ができる",
      "幹は灰白色でなめらか",
    ],
    distribution: "全国の川沿い・山地",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Albizia_julibrissin_in_Hyogo-ku%2C_Kobe%2CJapan_DSCF1040.jpg/960px-Albizia_julibrissin_in_Hyogo-ku%2C_Kobe%2CJapan_DSCF1040.jpg",
    similar_plant_ids: [],
  },
  {
    id: 27,
    japanese_name: "ハクモクレン",
    scientific_name: "Magnolia denudata",
    family_id: 13,
    genus: "モクレン属",
    description: [
      "中国原産の落葉高木。早春に葉より先に白い大きな花を咲かせる。",
      "花は上を向いて咲き、コブシより花が大きい（径10〜15cm）。",
      "仏教と縁が深く、寺院・公園・庭に広く植えられる。",
    ],
    identification: [
      "葉より先に白い大きな花（径10〜15cm）",
      "花は上を向いて咲く",
      "花弁が9枚（萼片3枚＋花弁6枚）",
      "花の下に小さな葉がない（コブシにはある）",
    ],
    distribution: "全国（植栽）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Yulan_1.JPG",
    similar_plant_ids: [28],
  },
  {
    id: 28,
    japanese_name: "コブシ",
    scientific_name: "Magnolia kobus",
    family_id: 13,
    genus: "モクレン属",
    description: [
      "日本固有の落葉高木。早春に白い花を咲かせる。ハクモクレンに似るが自生種。",
      "花の下に小さな葉が1枚つくことでハクモクレンと区別できる。",
      "秋に赤い果実が握りこぶし状になることが名前の由来。山地の落葉広葉樹林に自生。",
    ],
    identification: [
      "白い花の下に小さな葉が1枚つく（ハクモクレンにはない）",
      "花はハクモクレンより小さい（径6〜10cm）",
      "花弁は6枚",
      "秋に赤い果実が握りこぶし状になる",
    ],
    distribution: "全国の山地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Magnolia_kobus_borealis.jpg",
    similar_plant_ids: [27],
  },
  {
    id: 29,
    japanese_name: "ヤブツバキ",
    scientific_name: "Camellia japonica",
    family_id: 14,
    genus: "ツバキ属",
    description: [
      "日本の野生のツバキ。常緑高木で冬〜春に赤い花を咲かせる。",
      "花は花弁が落ちずに丸ごと落下する。この「首から落ちる」様子が武士に忌まれることもあった。",
      "椿油は古くから食用・美容・機械油として利用されてきた。",
    ],
    identification: [
      "赤い5弁花（冬〜春、12〜4月）",
      "葉は厚く光沢があり常緑",
      "花が丸ごと落ちる（サザンカは花弁が1枚ずつ落ちる）",
      "雄しべが白い柱状にまとまる（筒状）",
    ],
    distribution: "本州〜沖縄の山地・海岸",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Camellia_japonica_NBG.jpg",
    similar_plant_ids: [30],
  },
  {
    id: 30,
    japanese_name: "サザンカ",
    scientific_name: "Camellia sasanqua",
    family_id: 14,
    genus: "ツバキ属",
    description: [
      "日本固有の常緑低木〜小高木。晩秋〜冬に白・ピンク・赤い花を咲かせる。",
      "ツバキと似るが花期が異なり（10〜12月）、花弁が1枚ずつ散る点で区別できる。",
      "生垣や庭木として広く利用される。童謡「たき火」に詠まれる。",
    ],
    identification: [
      "晩秋〜冬に開花（ツバキは冬〜春）",
      "花弁が1枚ずつ散る（ツバキは花ごと落ちる）",
      "葉の縁の鋸歯がツバキより鋭く細かい",
      "葉はツバキより小さくやや光沢が少ない",
    ],
    distribution: "九州・四国（自生）、全国（植栽）",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Camellia_sasanqua1.jpg",
    similar_plant_ids: [29],
  },
  {
    id: 31,
    japanese_name: "アジサイ",
    scientific_name: "Hydrangea macrophylla",
    family_id: 15,
    genus: "アジサイ属",
    description: [
      "梅雨の時期に青・紫・ピンクの花を咲かせる落葉低木。日本固有種。",
      "花の色は土壌のpHによって変わる（酸性＝青、アルカリ性＝赤・ピンク）。",
      "庭木・公園樹として広く植えられる。ガクアジサイが原種とされる。",
    ],
    identification: [
      "球状の花序（装飾花が全面に密集）",
      "花色が青〜紫〜ピンク（土壌により変化）",
      "葉は大きく対生、鋸歯あり、厚くてつやがある",
      "梅雨時期（6〜7月）に開花",
    ],
    distribution: "全国（植栽）",
    image_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Hydrangea_of_Shimoda_%E4%B8%8B%E7%94%B0%E3%81%AE%E3%81%82%E3%81%98%E3%81%95%E3%81%84_%282630826953%29.jpg/960px-Hydrangea_of_Shimoda_%E4%B8%8B%E7%94%B0%E3%81%AE%E3%81%82%E3%81%98%E3%81%95%E3%81%84_%282630826953%29.jpg",
    similar_plant_ids: [32],
  },
  {
    id: 32,
    japanese_name: "ガクアジサイ",
    scientific_name: "Hydrangea macrophylla f. normalis",
    family_id: 15,
    genus: "アジサイ属",
    description: [
      "アジサイの原種とされる落葉低木。花序の外側だけに装飾花がつく「額縁」型が特徴。",
      "海岸近くの崖や山地に自生する。アジサイより野性的な印象。",
      "アジサイの品種改良の基になった種。",
    ],
    identification: [
      "花序の外側だけに装飾花がある（額縁型、ガク咲き）",
      "中心部に小さな両性花が密集する",
      "アジサイより葉が小さく光沢がある",
      "海岸近くの岩場にも自生",
    ],
    distribution: "関東以西の海岸・山地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Hydrangea_macrophylla_forma_normalis_01.JPG",
    similar_plant_ids: [31],
  },
  {
    id: 33,
    japanese_name: "タチツボスミレ",
    scientific_name: "Viola grypoceras",
    family_id: 11,
    genus: "スミレ属",
    description: [
      "日本で最も一般的なスミレの一種。春に青紫の花を咲かせる多年草。",
      "茎があり立ち上がる点でスミレ（根生葉のみ）と区別できる。",
      "山地から低地の林縁・道端まで広く分布する。",
    ],
    identification: [
      "青紫の5弁花（スミレより青みが強い）",
      "茎があり立ち上がる（スミレは根生葉のみで茎がない）",
      "葉はハート型（スミレより幅広い）",
      "側面の花弁に毛がある",
    ],
    distribution: "全国の林縁・道端・草地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Viola_grypoceras2.JPG",
    similar_plant_ids: [14],
  },
  {
    id: 34,
    japanese_name: "ホトケノザ",
    scientific_name: "Lamium amplexicaule",
    family_id: 16,
    genus: "オドリコソウ属",
    description: [
      "早春から初夏にかけて赤紫の花を咲かせる一〜二年草。春の七草（コオニタビラコとは別種）の一つとして名前が挙がることがある。",
      "葉が茎を抱くように対生する形が仏像の台座（蓮座）に似ることが名前の由来。",
      "道端・畑・荒地に生え、早春に花粉を供給する重要な植物。",
    ],
    identification: [
      "赤紫の唇形花（上唇と下唇に分かれる）",
      "葉が茎を抱く扇形〜半円形",
      "茎が四角形（シソ科の特徴）",
      "早春の道端・畑に多く見られる",
    ],
    distribution: "全国の道端・畑・荒地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lamium_amplexicaule_(52878370216).jpg",
    similar_plant_ids: [35],
  },
  {
    id: 35,
    japanese_name: "ヒメオドリコソウ",
    scientific_name: "Lamium purpureum",
    family_id: 16,
    genus: "オドリコソウ属",
    description: [
      "ヨーロッパ原産の帰化植物。早春から初夏に赤紫の小さな花を咲かせる一〜二年草。",
      "ホトケノザに似るが、上部の葉が赤みを帯びることで区別できる。",
      "道端・畑・荒地に生える。春の身近な野草の代表。",
    ],
    identification: [
      "赤紫の小さな唇形花",
      "上部の葉が赤みを帯びる（ホトケノザは緑のまま）",
      "葉は三角状卵形で鋸歯あり",
      "ホトケノザより全体的に大きく、葉が茎を抱かない",
    ],
    distribution: "全国の道端・畑・荒地",
    image_url:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Lamium_purpureum_-_Tutermaa.jpg",
    similar_plant_ids: [34],
  },
]

export const quizzes: Quiz[] = [
  {
    id: 1,
    type: "feature",
    question: "どんぐりがなる科は？",
    answer: "ブナ科",
    choices: ["ブナ科", "マメ科", "バラ科", "キク科"],
    plant_id: null,
  },
  {
    id: 2,
    type: "feature",
    question: "春に花が葉より先に咲く特徴を持つ桜は？",
    answer: "ソメイヨシノ",
    choices: ["ソメイヨシノ", "ヤマザクラ", "カスミザクラ", "オオシマザクラ"],
    plant_id: 1,
  },
  {
    id: 3,
    type: "feature",
    question: "銀杏（ぎんなん）が実る科は？",
    answer: "イチョウ科",
    choices: ["イチョウ科", "マツ科", "ヒノキ科", "ブナ科"],
    plant_id: 5,
  },
  {
    id: 4,
    type: "feature",
    question: "クロマツの針葉は何本が束になっている？",
    answer: "2本",
    choices: ["2本", "3本", "5本", "1本"],
    plant_id: 10,
  },
  {
    id: 5,
    type: "identification",
    question: "葉が5〜7裂の手のひら型に深く切れ込んでいる樹木は？",
    answer: "イロハモミジ",
    choices: ["イロハモミジ", "ケヤキ", "クスノキ", "コナラ"],
    plant_id: 2,
  },
  {
    id: 6,
    type: "identification",
    question: "葉を揉むと樟脳の香りがする樹木は？",
    answer: "クスノキ",
    choices: ["クスノキ", "ヒノキ", "スギ", "クロマツ"],
    plant_id: 3,
  },
  {
    id: 7,
    type: "identification",
    question: "葉の裏にY字（蝶型）の白い模様があるのは？",
    answer: "ヒノキ",
    choices: ["ヒノキ", "スギ", "クロマツ", "イチョウ"],
    plant_id: 8,
  },
  {
    id: 8,
    type: "identification",
    question: "樹皮が黒灰色でゴツゴツした松は？",
    answer: "クロマツ",
    choices: ["クロマツ", "アカマツ", "ヒノキ", "スギ"],
    plant_id: 10,
  },
  {
    id: 9,
    type: "feature",
    question: "根生葉のみで茎がなく、綿毛で種を飛ばす野草は？",
    answer: "タンポポ",
    choices: ["タンポポ", "ヨモギ", "スミレ", "ツユクサ"],
    plant_id: 11,
  },
  {
    id: 10,
    type: "identification",
    question: "朝に開花し午後にしぼむ、鮮やかな青い花を持つ野草は？",
    answer: "ツユクサ",
    choices: ["ツユクサ", "スミレ", "シロツメクサ", "ヨモギ"],
    plant_id: 15,
  },
  {
    id: 11,
    type: "identification",
    question: "花が丸ごと落ちるのはどちら？",
    answer: "ヤブツバキ",
    choices: ["ヤブツバキ", "サザンカ", "アジサイ", "ウメ"],
    plant_id: 29,
  },
  {
    id: 12,
    type: "feature",
    question: "梅雨の時期に咲き、土壌のpHで花色が変わる植物は？",
    answer: "アジサイ",
    choices: ["アジサイ", "フジ", "サザンカ", "ヤブツバキ"],
    plant_id: 31,
  },
  {
    id: 13,
    type: "identification",
    question: "早春に白い花が咲き、花の下に小さな葉が1枚つくのは？",
    answer: "コブシ",
    choices: ["コブシ", "ハクモクレン", "ウメ", "ヤマザクラ"],
    plant_id: 28,
  },
  {
    id: 14,
    type: "feature",
    question: "夜になると葉が閉じる「就眠運動」をする樹木は？",
    answer: "ネムノキ",
    choices: ["ネムノキ", "フジ", "クスノキ", "アジサイ"],
    plant_id: 26,
  },
  {
    id: 15,
    type: "identification",
    question: "花と赤みを帯びた若葉が同時に展開する桜は？",
    answer: "ヤマザクラ",
    choices: ["ヤマザクラ", "ソメイヨシノ", "ウメ", "コブシ"],
    plant_id: 17,
  },
  {
    id: 16,
    type: "identification",
    question: "樹皮が赤褐色で山地に多い松は？",
    answer: "アカマツ",
    choices: ["アカマツ", "クロマツ", "ヒノキ", "スギ"],
    plant_id: 22,
  },
  {
    id: 17,
    type: "identification",
    question: "蕾が下向きに垂れることでヒメジョオンと区別できる野草は？",
    answer: "ハルジオン",
    choices: ["ハルジオン", "タンポポ", "ヨモギ", "セイタカアワダチソウ"],
    plant_id: 24,
  },
  {
    id: 18,
    type: "feature",
    question: "マメ科で、春に紫の花穂を垂らすつる性の植物は？",
    answer: "フジ",
    choices: ["フジ", "ネムノキ", "シロツメクサ", "ノイバラ"],
    plant_id: 25,
  },
  {
    id: 19,
    type: "identification",
    question: "常緑で細長い葉を持ち、どんぐりをつけるカシの仲間は？",
    answer: "シラカシ",
    choices: ["シラカシ", "コナラ", "クヌギ", "スダジイ"],
    plant_id: 20,
  },
  {
    id: 20,
    type: "feature",
    question: "シソ科の特徴として正しいのは？",
    answer: "茎が四角形",
    choices: ["茎が四角形", "葉が針状", "どんぐりがなる", "葉が扇形"],
    plant_id: null,
  },
]

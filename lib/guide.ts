export type GuideNode = {
  id: string
  question: string
  hint: string
  yes: string
  no: string
}

export type GuideResult = {
  id: string
  family: string
  description: string
  examples: string[]
}

export const guideNodes: GuideNode[] = [
  { id: "q1", question: "葉は針状または鱗片状ですか？", hint: "マツやヒノキのような細い葉や鱗のような葉", yes: "q2", no: "q3" },
  { id: "q2", question: "葉は束（2〜5本まとめて）になっていますか？", hint: "根元で複数の葉が束になっているか確認", yes: "r-pine", no: "q2b" },
  { id: "q2b", question: "葉は鱗片状（うろこ状）に並んでいますか？", hint: "ヒノキのような平らな鱗状の葉か", yes: "r-cypress", no: "r-conifer" },
  { id: "q3", question: "どんぐり（殻斗に包まれた堅果）がなりますか？", hint: "秋にどんぐりを落とす木か", yes: "r-beech", no: "q4" },
  { id: "q4", question: "葉が手のひら型（掌状）に深く切れ込んでいますか？", hint: "カエデのように5〜7裂した葉か", yes: "r-maple", no: "q5" },
  { id: "q5", question: "葉は扇形で、葉脈が二又分岐していますか？", hint: "イチョウのような扇形の葉か", yes: "r-ginkgo", no: "q6" },
  { id: "q6", question: "葉に鋸歯（ギザギザ）があり、春に白〜ピンクの花が咲きますか？", hint: "バラ科の特徴。サクラやウメなど", yes: "r-rose", no: "q7" },
  { id: "q7", question: "葉を揉むと樟脳の香りがしますか？", hint: "クスノキ科の特徴", yes: "r-laurel", no: "q8" },
  { id: "q8", question: "花が黄色い頭状花序（菊の花型）ですか？", hint: "タンポポやヨモギのような花か", yes: "r-aster", no: "q9" },
  { id: "q9", question: "花が蝶形で、さや状の実がなりますか？", hint: "マメ科の特徴。クローバーなど", yes: "r-legume", no: "r-other" },
]

export const guideResults: GuideResult[] = [
  { id: "r-pine", family: "マツ科", description: "針葉が束になるのはマツ科の特徴です。", examples: ["クロマツ", "アカマツ", "ゴヨウマツ"] },
  { id: "r-cypress", family: "ヒノキ科", description: "鱗片状の葉を持つ常緑針葉樹です。", examples: ["ヒノキ", "スギ", "サワラ"] },
  { id: "r-conifer", family: "針葉樹（その他）", description: "針葉樹の可能性がありますが、より詳しい特徴を確認してください。", examples: ["モミ", "ツガ"] },
  { id: "r-beech", family: "ブナ科", description: "どんぐりをつける樹木です。里山に多く分布します。", examples: ["コナラ", "クヌギ", "カシ", "ブナ"] },
  { id: "r-maple", family: "ムクロジ科（カエデ属）", description: "手のひら型の葉と秋の紅葉が特徴です。", examples: ["イロハモミジ", "ヤマモミジ", "ウリカエデ"] },
  { id: "r-ginkgo", family: "イチョウ科", description: "扇形の葉を持つ、現存する最古の樹木グループです。", examples: ["イチョウ"] },
  { id: "r-rose", family: "バラ科", description: "鋸歯のある葉と美しい花が特徴の大きな科です。", examples: ["ソメイヨシノ", "ウメ", "モモ", "リンゴ"] },
  { id: "r-laurel", family: "クスノキ科", description: "芳香性の精油を含む常緑樹が多い科です。", examples: ["クスノキ", "ヤブニッケイ"] },
  { id: "r-aster", family: "キク科", description: "頭状花序が特徴の、植物界最大の科の一つです。", examples: ["タンポポ", "ヨモギ", "ノギク"] },
  { id: "r-legume", family: "マメ科", description: "蝶形花とさや状の実が特徴の科です。", examples: ["シロツメクサ", "フジ", "ネムノキ"] },
  { id: "r-other", family: "その他", description: "特定が難しい場合は、複数の特徴を組み合わせて確認してください。", examples: ["ケヤキ（ニレ科）", "スミレ（スミレ科）", "ツユクサ（ツユクサ科）"] },
]

import { plants } from "lib/data"
import { SEASONS, hasAutumnColor, plantById } from "lib/plants"
import { comparisonDefs, type Comparison } from "lib/comparisons"

export type { Comparison } from "lib/comparisons"
export { COMPARISON_CATEGORIES } from "lib/comparisons"

/**
 * 特徴別ページの定義。抽出条件はすべて既存の植物データ
 * （tags / flower_colors / description）に基づく。
 */
export type FeatureCollection = {
  slug: string
  title: string
  heading: string
  lead: string
  group: "花の色" | "実・種子" | "葉・樹木" | "見られる場所"
  basis: string
  filter: (plant: Plant) => boolean
}

const color = (c: FlowerColor) => (p: Plant) =>
  (p.flower_colors ?? []).includes(c)
const tag = (t: PlantTag) => (p: Plant) => p.tags.includes(t)

export const featureCollections: FeatureCollection[] = [
  {
    slug: "white-flowers",
    title: "白い花を咲かせる植物",
    heading: "白い花を咲かせる植物",
    lead: "街路樹の花木から山の草花まで、白い花をつける植物を集めました。",
    group: "花の色",
    basis: "花の色に「白」が登録されている植物",
    filter: color("白"),
  },
  {
    slug: "red-flowers",
    title: "赤い花を咲かせる植物",
    heading: "赤い花を咲かせる植物",
    lead: "赤い花をつける樹木や草花の一覧です。",
    group: "花の色",
    basis: "花の色に「赤」が登録されている植物",
    filter: color("赤"),
  },
  {
    slug: "pink-flowers",
    title: "ピンクの花を咲かせる植物",
    heading: "ピンクの花を咲かせる植物",
    lead: "サクラの仲間をはじめ、ピンク色の花をつける植物の一覧です。",
    group: "花の色",
    basis: "花の色に「ピンク」が登録されている植物",
    filter: color("ピンク"),
  },
  {
    slug: "yellow-flowers",
    title: "黄色い花を咲かせる植物",
    heading: "黄色い花を咲かせる植物",
    lead: "道ばたの草花から花木まで、黄色い花をつける植物の一覧です。",
    group: "花の色",
    basis: "花の色に「黄」が登録されている植物",
    filter: color("黄"),
  },
  {
    slug: "purple-flowers",
    title: "紫の花を咲かせる植物",
    heading: "紫の花を咲かせる植物",
    lead: "紫色の花をつける植物の一覧です。",
    group: "花の色",
    basis: "花の色に「紫」が登録されている植物",
    filter: color("紫"),
  },
  {
    slug: "blue-flowers",
    title: "青い花を咲かせる植物",
    heading: "青い花を咲かせる植物",
    lead: "青い花をつける植物の一覧です。",
    group: "花の色",
    basis: "花の色に「青」が登録されている植物",
    filter: color("青"),
  },
  {
    slug: "orange-flowers",
    title: "オレンジ色の花を咲かせる植物",
    heading: "オレンジ色の花を咲かせる植物",
    lead: "オレンジ（橙）色の花をつける植物の一覧です。",
    group: "花の色",
    basis: "花の色に「橙」が登録されている植物",
    filter: color("橙"),
  },
  {
    slug: "acorn-trees",
    title: "どんぐりができる木",
    heading: "どんぐりができる木",
    lead: "殻斗（かくと）に包まれた堅果、どんぐりをつける木の一覧です。",
    group: "実・種子",
    basis: "特徴タグ「どんぐり」が付いている植物",
    filter: tag("どんぐり"),
  },
  {
    slug: "pod-plants",
    title: "豆（さや）ができる植物",
    heading: "豆（さや）ができる植物",
    lead: "さやに入った豆をつける植物の一覧です。",
    group: "実・種子",
    basis: "特徴タグ「豆」が付いている植物",
    filter: tag("豆"),
  },
  {
    slug: "cone-trees",
    title: "松ぼっくり（球果）ができる木",
    heading: "松ぼっくり（球果）ができる木",
    lead: "松ぼっくりのような球果をつける木の一覧です。",
    group: "実・種子",
    basis: "特徴タグ「松ぼっくり」が付いている植物",
    filter: tag("松ぼっくり"),
  },
  {
    slug: "autumn-leaves",
    title: "紅葉・黄葉する植物",
    heading: "紅葉・黄葉する植物",
    lead: "秋に葉が赤や黄に色づく植物の一覧です。",
    group: "葉・樹木",
    basis: "解説文に紅葉・黄葉の記述がある植物",
    filter: hasAutumnColor,
  },
  {
    slug: "evergreen",
    title: "常緑の植物（常緑樹など）",
    heading: "常緑の植物",
    lead: "冬でも葉を落とさない常緑樹・常緑植物の一覧です。",
    group: "葉・樹木",
    basis: "特徴タグ「常緑」が付いている植物",
    filter: tag("常緑"),
  },
  {
    slug: "deciduous",
    title: "落葉する植物（落葉樹など）",
    heading: "落葉する植物",
    lead: "秋から冬に葉を落とす落葉樹・落葉植物の一覧です。",
    group: "葉・樹木",
    basis: "特徴タグ「落葉」が付いている植物",
    filter: tag("落葉"),
  },
  {
    slug: "conifers",
    title: "針葉樹",
    heading: "針葉樹",
    lead: "針のように細い葉をもつ木の一覧です。",
    group: "葉・樹木",
    basis: "特徴タグ「針葉」が付いている植物",
    filter: tag("針葉"),
  },
  {
    slug: "street-trees",
    title: "街路樹として見られる木",
    heading: "街路樹として見られる木",
    lead: "街なかの通りに植えられていることが多い木の一覧です。",
    group: "見られる場所",
    basis: "特徴タグ「街路樹」が付いている植物",
    filter: tag("街路樹"),
  },
  {
    slug: "weeds",
    title: "身近な雑草",
    heading: "身近な雑草",
    lead: "道ばたや空き地など、身近な場所で見かける草の一覧です。",
    group: "見られる場所",
    basis: "特徴タグ「雑草」が付いている植物",
    filter: tag("雑草"),
  },
]

/** 薄いページを作らないための最小件数 */
const MIN_PLANTS = 5

export const featurePlants = (c: FeatureCollection) => plants.filter(c.filter)

export const activeFeatureCollections = featureCollections.filter(
  (c) => featurePlants(c).length >= MIN_PLANTS
)

export const seasonPlants = (key: string) => {
  const s = SEASONS.find((x) => x.key === key)
  return s ? plants.filter((p) => p.tags.includes(s.tag)) : []
}

/* ---------- 比較ページ（定義は lib/comparisons.ts） ---------- */

export const comparisons: Comparison[] = comparisonDefs.filter((c) => plantById.has(c.a) && plantById.has(c.b))

export const comparisonTitle = (c: Comparison) => {
  const a = plantById.get(c.a)!
  const b = plantById.get(c.b)!
  return `${a.japanese_name}と${b.japanese_name}の違い`
}

export const comparisonsForPlant = (plantId: number) =>
  comparisons.filter((c) => c.a === plantId || c.b === plantId)

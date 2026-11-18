import { families, plants } from "lib/data"
import { wikimediaThumb } from "lib/utils"

export const familyById = new Map(families.map((f) => [f.id, f]))
export const plantById = new Map(plants.map((p) => [p.id, p]))

export const getFamily = (plant: Plant) => familyById.get(plant.family_id)

export const plantsOfFamily = (familyId: number) =>
  plants.filter((p) => p.family_id === familyId)

/* ---------- 画像 ---------- */

type PlantImageLike = { url: string; local_url?: string; caption: string }

/** 一覧用のサムネイル（scripts/generate-thumbnails.mjs が生成） */
export const thumbPath = (localUrl: string) =>
  localUrl.replace("/images/plants/", "/images/plants/thumbs/")

export const plantThumb = (plant: Plant) =>
  plant.local_image_url
    ? thumbPath(plant.local_image_url)
    : wikimediaThumb(plant.image_url, 480)

export const plantPhoto = (plant: Plant) =>
  plant.local_image_url ?? wikimediaThumb(plant.image_url, 800)

export const imageThumb = (img: PlantImageLike) =>
  img.local_url ? thumbPath(img.local_url) : wikimediaThumb(img.url, 480)

export const imagePhoto = (img: PlantImageLike) =>
  img.local_url ?? wikimediaThumb(img.url, 800)

/** 代表画像を先頭にした画像リスト（重複なし） */
export const plantImages = (plant: Plant): PlantImageLike[] => {
  if (!plant.image_url) return plant.images
  if (plant.images.some((img) => img.url === plant.image_url))
    return plant.images
  return [
    { url: plant.image_url, local_url: plant.local_image_url, caption: "代表写真" },
    ...plant.images,
  ]
}

/** Special:FilePath URL から Wikimedia Commons のファイル解説ページ（ライセンス記載）を得る */
export const commonsFilePage = (url: string): string | null => {
  const m = url.match(/commons\.wikimedia\.org\/wiki\/Special:FilePath\/(.+)$/)
  if (m) return `https://commons.wikimedia.org/wiki/File:${m[1]}`
  const up = url.match(/upload\.wikimedia\.org\/wikipedia\/commons\/(?:thumb\/)?[0-9a-f]\/[0-9a-f]{2}\/([^/?#]+)/)
  if (up) return `https://commons.wikimedia.org/wiki/File:${up[1]}`
  return null
}

export const commonsFileName = (url: string): string | null => {
  const page = commonsFilePage(url)
  if (!page) return null
  try {
    return decodeURIComponent(page.replace(/^.*\/File:/, "")).replace(/_/g, " ")
  } catch {
    return null
  }
}

/* ---------- 属性 ---------- */

export const SEASONS = [
  { key: "spring", tag: "春開花", label: "春", months: "3〜5月" },
  { key: "summer", tag: "夏開花", label: "夏", months: "6〜8月" },
  { key: "autumn", tag: "秋開花", label: "秋", months: "9〜11月" },
  { key: "winter", tag: "冬開花", label: "冬", months: "12〜2月" },
] as const satisfies readonly {
  key: string
  tag: PlantTag
  label: string
  months: string
}[]

export type Season = (typeof SEASONS)[number]

export const seasonOfMonth = (month: number): Season =>
  month >= 3 && month <= 5
    ? SEASONS[0]
    : month >= 6 && month <= 8
      ? SEASONS[1]
      : month >= 9 && month <= 11
        ? SEASONS[2]
        : SEASONS[3]

export const bloomSeasons = (plant: Plant) =>
  SEASONS.filter((s) => plant.tags.includes(s.tag))

export const bloomText = (plant: Plant) => {
  const s = bloomSeasons(plant)
  return s.length > 0 ? s.map((x) => x.label).join("・") : null
}

const FORM_LABEL: Partial<Record<PlantTag, string>> = {
  高木: "高木（樹木）",
  低木: "低木（樹木）",
  草本: "草本（草花）",
}

export const growthForms = (plant: Plant) =>
  (["高木", "低木", "草本"] as PlantTag[])
    .filter((t) => plant.tags.includes(t))
    .map((t) => FORM_LABEL[t] as string)

export const isTree = (plant: Plant) =>
  plant.tags.includes("高木") || plant.tags.includes("低木")

export const leafHabit = (plant: Plant) =>
  (["常緑", "落葉"] as PlantTag[]).filter((t) => plant.tags.includes(t))

export const LEAF_TAGS: PlantTag[] = [
  "針葉",
  "手のひら葉",
  "ギザギザ",
  "厚い葉",
  "光沢",
]
export const FLOWER_TAGS: PlantTag[] = ["花弁5枚", "小花集合", "ラッパ型"]
export const FRUIT_TAGS: PlantTag[] = ["どんぐり", "豆", "松ぼっくり"]
export const HABITAT_TAGS: PlantTag[] = ["街路樹", "公園", "山", "雑草"]

export const TAG_LABEL: Partial<Record<PlantTag, string>> = {
  針葉: "針のような葉",
  手のひら葉: "手のひら形の葉",
  ギザギザ: "縁がギザギザ（鋸歯）",
  厚い葉: "厚みのある葉",
  光沢: "光沢のある葉",
  花弁5枚: "花弁5枚",
  小花集合: "小さな花が集まって咲く",
  ラッパ型: "ラッパ形の花",
  どんぐり: "どんぐり",
  豆: "豆（さや）",
  松ぼっくり: "松ぼっくり（球果）",
  街路樹: "街路樹",
  公園: "公園・庭",
  山: "山地",
  雑草: "道ばた・空き地（雑草）",
}

export const tagsIn = (plant: Plant, group: PlantTag[]) =>
  group.filter((t) => plant.tags.includes(t))

export const labelsIn = (plant: Plant, group: PlantTag[]) =>
  tagsIn(plant, group).map((t) => TAG_LABEL[t] ?? t)

/** 解説文に「紅葉」「黄葉」の記述がある植物 */
export const hasAutumnColor = (plant: Plant) => {
  const text = plant.description.join("")
  return /紅葉|黄葉/.test(text) && !/紅葉しない|紅葉せず|黄葉しない/.test(text)
}

/* ---------- 関連植物 ---------- */

export const similarPlants = (plant: Plant) =>
  plant.similar_plant_ids
    .map((id) => plantById.get(id))
    .filter((p): p is Plant => Boolean(p))

export const sameGenusPlants = (plant: Plant) =>
  plants.filter(
    (p) =>
      p.id !== plant.id &&
      p.genus === plant.genus &&
      !plant.similar_plant_ids.includes(p.id)
  )

/**
 * 同じ季節に咲き、花色が重なる植物。
 * 重なる花色の数 → 同じ形態か で並べる。
 */
export const sameSeasonColorPlants = (plant: Plant, exclude: Set<number>) => {
  const seasons = bloomSeasons(plant).map((s) => s.tag)
  const colors = plant.flower_colors ?? []
  if (seasons.length === 0 || colors.length === 0) return []
  const forms = new Set(tagsIn(plant, ["高木", "低木", "草本"]))
  return plants
    .filter(
      (p) =>
        p.id !== plant.id &&
        !exclude.has(p.id) &&
        p.tags.some((t) => (seasons as PlantTag[]).includes(t)) &&
        (p.flower_colors ?? []).some((c) => colors.includes(c))
    )
    .map((p) => ({
      p,
      score:
        (p.flower_colors ?? []).filter((c) => colors.includes(c)).length * 2 +
        (p.tags.some((t) => forms.has(t)) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.p.id - b.p.id)
    .map((x) => x.p)
}

/* ---------- 検索 ---------- */

export const toKatakana = (s: string) =>
  s.replace(/[ぁ-ゖ]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) + 0x60)
  )

export const matchesQuery = (plant: Plant, query: string) => {
  const q = query.trim()
  if (!q) return true
  const kana = toKatakana(q)
  const lower = q.toLowerCase()
  const family = getFamily(plant)
  return (
    plant.japanese_name.includes(kana) ||
    plant.scientific_name.toLowerCase().includes(lower) ||
    plant.genus.includes(kana) ||
    (family?.name.includes(kana) ?? false)
  )
}

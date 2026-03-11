type Family = {
  id: number
  name: string
  description: string
  characteristics: string[]
  classification: "裸子植物" | "被子植物"
}

type PlantTag =
  | "春開花"
  | "夏開花"
  | "秋開花"
  | "冬開花"
  | "常緑"
  | "落葉"
  | "針葉"
  | "手のひら葉"
  | "ギザギザ"
  | "厚い葉"
  | "光沢"
  | "花弁5枚"
  | "小花集合"
  | "ラッパ型"
  | "どんぐり"
  | "豆"
  | "松ぼっくり"
  | "高木"
  | "低木"
  | "草本"
  | "街路樹"
  | "山"
  | "公園"
  | "雑草"

type Plant = {
  id: number
  japanese_name: string
  scientific_name: string
  family_id: number
  genus: string
  description: string[]
  identification: string[]
  distribution: string
  image_url: string
  images: { url: string; caption: string }[]
  tags: PlantTag[]
  similar_plant_ids: number[]
}

type Quiz = {
  id: number
  type: "photo" | "feature" | "identification"
  question: string
  answer: string
  choices: string[]
  plant_id: number | null
}

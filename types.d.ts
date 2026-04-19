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
  | "北海道"
  | "本州"
  | "四国"
  | "九州"
  | "沖縄"

type FlowerColor =
  | "白"
  | "黄"
  | "ピンク"
  | "赤"
  | "青"
  | "紫"
  | "橙"

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
  local_image_url?: string
  images: { url: string; local_url?: string; caption: string }[]
  tags: PlantTag[]
  flower_colors?: FlowerColor[]
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

import { columns } from "lib/columns"
import { families, plants } from "lib/data"

export const siteUrl = "https://juqa.reload.co.jp"
export const siteName = "ジュカ！ (JuQa)"
export const publisher = {
  "@type": "Organization",
  name: "Reload, Inc.",
  url: "https://reload.co.jp",
}

export const siteDescription =
  "街路樹・公園・山で見かける日本の植物を、写真・科・見分け方・開花時期から体系的に学べる植物学習サイト。"

export const plantSummary = (plant: Plant, family?: Family) => ({
  name: plant.japanese_name,
  scientificName: plant.scientific_name,
  family: family?.name ?? "",
  genus: plant.genus,
  distribution: plant.distribution,
  tags: plant.tags,
  description: plant.description,
  identification: plant.identification,
})

export const plantAioSummaryText = (plant: Plant, family?: Family) => {
  const familyText = family ? `${family.name}の` : ""
  const tags = plant.tags.length > 0 ? ` 主なタグは${plant.tags.join("、")}。` : ""
  return `${plant.japanese_name}（${plant.scientific_name}）は${familyText}植物。${plant.description[0]} 見分け方は${plant.identification[0]} 分布は${plant.distribution}。${tags}`
}

export const familyAioSummaryText = (family: Family, familyPlants: Plant[]) => {
  const examples = familyPlants.slice(0, 8).map((plant) => plant.japanese_name)
  return `${family.name}は${family.classification}の科。${family.description} 主な特徴は${family.characteristics.join("、")}。収録植物は${familyPlants.length}種${examples.length > 0 ? `（${examples.join("、")}など）` : ""}。`
}

export const llmsTxt = () => {
  const featuredColumns = columns
    .slice(0, 12)
    .map((column) => `- [${column.title}](${siteUrl}${column.href}/): ${column.description}`)
    .join("\n")

  return `# ${siteName}

> ${siteDescription}

## 主要ページ

- [ホーム](${siteUrl}/): サイトトップ
- [植物一覧](${siteUrl}/plants/): ${plants.length}種の植物を科・タグ・キーワードで絞り込み検索できる一覧
- [科一覧](${siteUrl}/families/): ${families.length}科の特徴と所属植物の一覧
- [見分けガイド](${siteUrl}/guide/): 花の色・葉の形などから植物を絞り込む決定木ガイド
- [クイズ](${siteUrl}/quiz/): 植物の知識を試すクイズ
- [写真クイズ](${siteUrl}/quiz/photo/): 写真から植物を当てるクイズ
- [開花カレンダー](${siteUrl}/flowers/): 季節ごとの開花植物一覧
- [コラム](${siteUrl}/columns/): 植物の見分け方・豆知識の解説記事
- [AI向け全文要約](${siteUrl}/llms-full.txt): 収録植物・科・コラムの機械可読サマリー

## コラム記事

${featuredColumns}

## サイト情報

- 運営: Reload, Inc. (https://reload.co.jp)
- 収録植物数: ${plants.length}種
- 収録科数: ${families.length}科
- 対象: 街路樹・公園・山で見かける日本の植物
- 言語: 日本語
`
}

export const llmsFullTxt = () => {
  const familyById = new Map(families.map((family) => [family.id, family]))

  const plantLines = plants
    .map((plant) => {
      const family = familyById.get(plant.family_id)
      return `## ${plant.japanese_name}

- URL: ${siteUrl}/plants/${plant.id}/
- 学名: ${plant.scientific_name}
- 科: ${family?.name ?? "不明"}
- 属: ${plant.genus}
- 分布: ${plant.distribution}
- タグ: ${plant.tags.join("、") || "なし"}
- 解説: ${plant.description.join(" ")}
- 見分け方: ${plant.identification.join(" ")}
`
    })
    .join("\n")

  const familyLines = families
    .map((family) => {
      const familyPlants = plants.filter((plant) => plant.family_id === family.id)
      return `## ${family.name}

- URL: ${siteUrl}/families/${family.id}/
- 分類: ${family.classification}
- 解説: ${family.description}
- 特徴: ${family.characteristics.join(" ")}
- 収録植物: ${familyPlants.map((plant) => plant.japanese_name).join("、") || "なし"}
`
    })
    .join("\n")

  const columnLines = columns
    .map(
      (column) => `- [${column.title}](${siteUrl}${column.href}/): ${column.description} タグ: ${column.tags.join("、")}`,
    )
    .join("\n")

  return `# ${siteName} AI向け全文要約

${siteDescription}

- canonical: ${siteUrl}/
- plants: ${plants.length}
- families: ${families.length}
- columns: ${columns.length}
- language: ja

# 植物

${plantLines}

# 科

${familyLines}

# コラム

${columnLines}
`
}

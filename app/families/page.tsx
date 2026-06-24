import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { wikimediaThumb } from "lib/utils"
import { PageHeader, Tag } from "components/elements/layout"
import { siteUrl } from "lib/seo"

const pageUrl = `${siteUrl}/families/`
const description = `植物を科ごとに分類した一覧です。バラ科・キク科など${families.length}科の特徴と所属する植物を確認できます。`

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "科一覧",
      description,
      numberOfItems: families.length,
      inLanguage: "ja",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${pageUrl}#itemlist` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#itemlist`,
      name: "科一覧",
      numberOfItems: families.length,
      itemListElement: families.map((family, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/families/${family.id}/`,
        item: {
          "@type": "Taxon",
          name: family.name,
          description: family.description,
        },
      })),
    },
  ],
}

export const metadata: Metadata = {
  title: "科一覧",
  description,
  keywords: ["科一覧", "植物の科", "バラ科", "キク科", "植物分類", "植物図鑑"],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "科一覧",
    description,
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "科一覧",
    description,
  },
}

// APG IV 系統樹に基づくグループ定義
// 目レベルの並び順を意識して科を配置
const phylogeneticGroups = [
  {
    id: "gymnosperms",
    name: "裸子植物",
    label: "Gymnosperms",
    description:
      "種子をむき出しで実らせる維管束植物。球果（まつぼっくり）や肉質の種皮をもつ種が多く、被子植物より古い系統。",
    accent: "#4a7a5a",
    bg: "#1a2e20",
    // イチョウ目 → マツ目（マツ科・ヒノキ科・イチイ科・マキ科）
    familyIds: [5, 8, 7, 17, 58],
  },
  {
    id: "magnoliids",
    name: "基部被子植物・モクレン類",
    label: "Basal Angiosperms & Magnoliids",
    description:
      "被子植物の中で最も早く分岐した系統。ANA グレード（マツブサ科など）と、バラ類・単子葉植物とは独立に進化したモクレン類（クスノキ科・モクレン科など）を含む。",
    accent: "#7a7a3a",
    bg: "#2a2a10",
    // ANA grade: マツブサ目 → Piperales: センリョウ科・ドクダミ科
    // Laurales: ロウバイ科・クスノキ科 → Magnoliales: モクレン科
    familyIds: [45, 53, 20, 48, 3, 13],
  },
  {
    id: "monocots",
    name: "単子葉植物",
    label: "Monocots",
    description:
      "発芽時の子葉が1枚。葉脈が平行脈で、花被片が3の倍数になる種が多い。サトイモ目 → ツユクサ目・イネ目 → ユリ目 → キジカクシ目の順に並べた。",
    accent: "#3a6a8a",
    bg: "#0e2030",
    // サトイモ目 → ツユクサ目・イネ目 → ユリ目 → キジカクシ目
    familyIds: [54, 12, 21, 22, 26, 27, 37, 38],
  },
  {
    id: "basal-eudicots",
    name: "真正双子葉植物（基部）",
    label: "Basal Eudicots",
    description:
      "花粉に3つの溝（三溝粉）をもつ真正双子葉植物のうち、バラ類・キク類より先に分岐したグループ。キンポウゲ目・プロテア目・ツゲ目・ユキノシタ目・ナデシコ目を含む。",
    accent: "#7a4a8a",
    bg: "#200e30",
    // Ranunculales: キンポウゲ科・ケシ科・メギ科
    // Proteales: スズカケノキ科 → Buxales: ツゲ科
    // Saxifragales: カツラ科・マンサク科・ユキノシタ科・ベンケイソウ科
    // Caryophyllales: ナデシコ科
    familyIds: [25, 18, 42, 29, 56, 28, 49, 50, 40, 36],
  },
  {
    id: "rosids",
    name: "バラ類",
    label: "Rosids",
    description:
      "真正双子葉植物の主要系統の一つ。花弁が離生する種が多い。ファビッド系（ニシキギ目・ヤナギ目・マメ目・バラ目・ブナ目）とマルビッド系（フウロソウ目・フトモモ目・ムクロジ目・アオイ目・アブラナ目）に大別される。",
    accent: "#8a3a4a",
    bg: "#2e0e16",
    // Fabids: Celastrales → Malpighiales → Fabales → Rosales → Fagales
    // Malvids: Geraniales → Myrtales → Crossosomatales → Sapindales → Malvales → Brassicales
    familyIds: [64, 30, 11, 10, 1, 4, 62, 6, 55, 51, 63, 46, 2, 66, 43, 34],
  },
  {
    id: "asterids",
    name: "キク類",
    label: "Asterids",
    description:
      "真正双子葉植物のもう一つの主要系統。合弁花（花弁が合着）をもつ種が多い。ミズキ目・ツツジ目・ラミアッド系（ガリア目・リンドウ目・シソ目・ハゼリソウ目）・カンパニュラッド系（モチノキ目・キク目・セリ目・マツムシソウ目）を含む。",
    accent: "#3a7a5a",
    bg: "#0e2818",
    // Cornales → Ericales
    // Lamiids: Garryales → Gentianales → Lamiales → Boraginales
    // Campanulids: Aquifoliales → Asterales → Apiales → Dipsacales
    familyIds: [24, 15, 14, 31, 44, 65, 39, 47, 61, 60, 19, 16, 32, 23, 52, 59, 9, 41, 35, 57, 33],
  },
]

const FamiliesPage: FC = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader backHref="/" backLabel="トップ" title="科一覧" />

      {/* 目次 */}
      <nav
        style={{
          background: "#2a2a2a",
          borderRadius: "10px",
          padding: "1rem 1.25rem",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "0.72rem",
            color: "#666",
            marginBottom: "0.6rem",
            letterSpacing: "0.05em",
          }}
        >
          グループ
        </div>
        <ol
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
          }}
        >
          {phylogeneticGroups.map((group, i) => {
            const count = group.familyIds.length
            return (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0.5rem" }}
                >
                  <span style={{ fontSize: "0.7rem", color: "#555", minWidth: "1rem" }}>
                    {i + 1}.
                  </span>
                  <span style={{ fontSize: "0.875rem", color: group.accent, fontWeight: "bold" }}>
                    {group.name}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#666" }}>
                    {group.label}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#555", marginLeft: "auto" }}>
                    {count}科
                  </span>
                </a>
              </li>
            )
          })}
        </ol>
      </nav>

      <div>
        {phylogeneticGroups.map((group) => {
          const groupFamilies = group.familyIds
            .map((id) => families.find((f) => f.id === id))
            .filter((f): f is Family => f !== undefined)

          return (
            <div key={group.name} style={{ marginBottom: "2rem" }}>
              {/* グループヘッダー */}
              <div
                id={group.id}
                style={{
                  background: group.bg,
                  border: `1px solid ${group.accent}`,
                  borderRadius: "10px",
                  padding: "0.875rem 1.25rem",
                  marginBottom: "0.75rem",
                  scrollMarginTop: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.75rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                      color: group.accent,
                    }}
                  >
                    {group.name}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#666" }}>
                    {group.label}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "0.75rem",
                      color: "#777",
                    }}
                  >
                    {groupFamilies.length}科
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.75rem",
                    color: "#888",
                    lineHeight: 1.6,
                  }}
                >
                  {group.description}
                </p>
              </div>

              {/* 科カード一覧 */}
              {groupFamilies.map((family) => {
                const familyPlants = plants.filter(
                  (p) => p.family_id === family.id,
                )
                return (
                  <Link
                    key={family.id}
                    href={`/families/${family.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        background: "#2d2d2d",
                        borderRadius: "8px",
                        padding: "1rem",
                        marginBottom: "0.75rem",
                        borderLeft: `3px solid ${group.accent}`,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              color: group.accent,
                              fontWeight: "bold",
                              fontSize: "1rem",
                              marginBottom: "0.25rem",
                            }}
                          >
                            {family.name}
                          </div>
                          <div style={{ color: "#999", fontSize: "0.8rem" }}>
                            {family.description.slice(0, 120)}
                            {family.description.length > 120 ? "..." : ""}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                            marginLeft: "0.75rem",
                          }}
                        >
                          <Tag variant="muted" style={{ whiteSpace: "nowrap" }}>
                            {family.classification}
                          </Tag>
                          <Tag style={{ whiteSpace: "nowrap" }}>
                            {familyPlants.length}種
                          </Tag>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                      >
                        {familyPlants.map((plant) => (
                          <div
                            key={plant.id}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <img
                              src={plant.local_image_url ?? wikimediaThumb(plant.image_url ?? "", 160)}
                              alt={plant.japanese_name}
                              loading="lazy"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                            <span style={{ color: "#ccc", fontSize: "0.5rem" }}>
                              {plant.japanese_name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FamiliesPage

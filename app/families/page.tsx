import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { plantThumb } from "lib/plants"
import { color } from "lib/theme"
import { Breadcrumbs, JsonLd, PageIntro } from "components/elements/layout"
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
  title: "科から探す — 植物の科一覧",
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

const groupedIds = new Set(phylogeneticGroups.flatMap((g) => g.familyIds))
const ungrouped = families.filter((f) => !groupedIds.has(f.id)).map((f) => f.id)
const allGroups = [
  ...phylogeneticGroups,
  ...(ungrouped.length
    ? [
        {
          id: "others",
          name: "その他の科",
          label: "Others",
          description: "上記のグループに未整理の科です。",
          accent: "#6b6b5a",
          bg: "",
          familyIds: ungrouped,
        },
      ]
    : []),
]

const FamiliesPage: FC = () => {
  return (
    <div>
      <JsonLd data={jsonLd} />
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "科から探す" }]} currentUrl={pageUrl} />
      <PageIntro
        eyebrow="FAMILIES"
        title="科から探す"
        lead={`収録している${families.length}科を、APG IV 分類体系の系統順にグループ分けしました。同じ科の植物は花や実のつくりに共通点があります。`}
      />

      <nav aria-label="グループ" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}>
        {allGroups.map((group) => (
          <a key={group.id} href={`#${group.id}`} className="chip">
            <span aria-hidden="true" style={{ width: "0.6rem", height: "0.6rem", borderRadius: "50%", background: group.accent }} />
            {group.name}
            <span style={{ fontSize: "0.72rem", color: color.muted }}>{group.familyIds.length}科</span>
          </a>
        ))}
      </nav>

      {allGroups.map((group) => {
        const groupFamilies = group.familyIds
          .map((id) => families.find((f) => f.id === id))
          .filter((f): f is Family => f !== undefined)
        return (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} style={{ marginBottom: "3rem", scrollMarginTop: "7rem" }}>
            <div style={{ borderLeft: `4px solid ${group.accent}`, paddingLeft: "1rem", marginBottom: "1.25rem" }}>
              <h2 id={`${group.id}-title`} className="serif" style={{ margin: 0, fontSize: "1.35rem" }}>
                {group.name}
                <span style={{ fontSize: "0.8rem", color: color.muted, fontFamily: "var(--font-sans)", marginLeft: "0.6rem", fontWeight: 400 }}>
                  {group.label}・{groupFamilies.length}科
                </span>
              </h2>
              <p style={{ margin: "0.35rem 0 0", fontSize: "0.88rem", color: color.muted, maxWidth: "48rem" }}>{group.description}</p>
            </div>
            <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {groupFamilies.map((family) => {
                const familyPlants = plants.filter((p) => p.family_id === family.id)
                return (
                  <li key={family.id}>
                    <Link href={`/families/${family.id}`} className="card-link">
                      <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(4, Math.max(1, familyPlants.length))}, 1fr)`, gap: "2px", background: color.surfaceAlt, aspectRatio: "4 / 1", overflow: "hidden" }}>
                        {familyPlants.slice(0, 4).map((plant) => (
                          <div key={plant.id} className="card-photo" style={{ aspectRatio: "auto", height: "100%" }}>
                            <img src={plantThumb(plant)} alt="" loading="lazy" width={120} height={120} />
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: "0.85rem 1rem 1rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.5rem" }}>
                          <h3 style={{ margin: 0, fontSize: "1.05rem", color: color.ink }}>{family.name}</h3>
                          <span style={{ fontSize: "0.78rem", color: color.primary, fontWeight: 700, whiteSpace: "nowrap" }}>{familyPlants.length}種</span>
                        </div>
                        <p style={{ margin: "0.35rem 0 0", fontSize: "0.8rem", color: color.muted, lineHeight: 1.7, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {family.description}
                        </p>
                        <p style={{ margin: "0.4rem 0 0", fontSize: "0.75rem", color: color.inkSoft }}>
                          {familyPlants.slice(0, 4).map((p) => p.japanese_name).join("・")}
                          {familyPlants.length > 4 && " など"}
                        </p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export default FamiliesPage

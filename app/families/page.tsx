import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { wikimediaThumb } from "lib/utils"
import { PageHeader, Tag } from "components/elements/layout"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/families/`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": pageUrl,
  url: pageUrl,
  name: "科一覧",
  description: "植物を科ごとに分類した一覧です。バラ科・キク科など38科の特徴と所属する植物を確認できます。",
  numberOfItems: families.length,
  inLanguage: "ja",
  isPartOf: { "@id": `${siteUrl}/#website` },
}

export const metadata: Metadata = {
  title: "科一覧",
  description: "植物を科ごとに分類した一覧です。バラ科・キク科など38科の特徴と所属する植物を確認できます。",
  keywords: ["科一覧", "植物の科", "バラ科", "キク科", "植物分類", "植物図鑑"],
  openGraph: {
    title: "科一覧",
    description: "植物を科ごとに分類した一覧です。バラ科・キク科など38科の特徴と所属する植物を確認できます。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "科一覧",
    description: "植物を科ごとに分類した一覧です。バラ科・キク科など38科の特徴と所属する植物を確認できます。",
  },
}

const FamiliesPage: FC = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader backHref="/" backLabel="トップ" title="科一覧" />

      <div>
        {families.map((family) => {
          const familyPlants = plants.filter((p) => p.family_id === family.id)
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
                  borderLeft: "3px solid #5a9a5c",
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
                        color: "#7cbe8c",
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
                        src={wikimediaThumb(plant.image_url ?? "", 160)}
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
    </div>
  )
}

export default FamiliesPage

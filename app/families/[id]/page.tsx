import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { wikimediaThumb } from "lib/utils"
import { PageHeader, SectionCard, Tag } from "components/elements/layout"

const siteUrl = "https://juqa.reload.co.jp"

export function generateStaticParams() {
  return families.map((family) => ({ id: String(family.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const family = families.find((f) => f.id === Number(id))
  if (!family) return {}

  const familyPlants = plants.filter((p) => p.family_id === family.id)
  const pageUrl = `${siteUrl}/families/${family.id}/`
  const description = `${family.name}（${family.classification}）の特徴と所属する植物${familyPlants.length}種を紹介します。${family.description}`

  return {
    title: `${family.name}の特徴と植物一覧`,
    description,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${family.name}の特徴と植物一覧`,
      description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${family.name}の特徴と植物一覧`,
      description,
    },
  }
}

type Props = {
  params: Promise<{ id: string }>
}

const FamilyDetailPage: FC<Props> = async ({ params }) => {
  const { id } = await params
  const family = families.find((f) => f.id === Number(id))

  if (!family) {
    return (
      <div style={{ color: "#e0e0e0", margin: "0 auto" }}>
        <PageHeader backHref="/families" backLabel="科一覧" />
        <p style={{ marginTop: "1rem" }}>科が見つかりませんでした。</p>
      </div>
    )
  }

  const familyPlants = plants.filter((p) => p.family_id === family.id)
  const pageUrl = `${siteUrl}/families/${family.id}/`

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Taxon",
        "@id": pageUrl,
        name: family.name,
        description: family.description,
        url: pageUrl,
        taxonRank: "https://www.wikidata.org/entity/Q35409",
        hasPart: familyPlants.map((p) => ({
          "@type": "Taxon",
          name: p.japanese_name,
          scientificName: p.scientific_name,
          url: `${siteUrl}/plants/${p.id}/`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "科一覧",
            item: `${siteUrl}/families/`,
          },
          { "@type": "ListItem", position: 3, name: family.name, item: pageUrl },
        ],
      },
    ],
  }

  return (
    <div style={{ margin: "0 auto", color: "#e0e0e0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader backHref="/families" backLabel="科一覧" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.5rem",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.4rem", color: "#7cbe8c" }}>
          {family.name}
        </h1>
        <Tag variant="muted">{family.classification}</Tag>
      </div>
      <p
        style={{
          margin: "0 0 1.25rem",
          color: "#999",
          fontSize: "0.9rem",
          lineHeight: "1.6",
        }}
      >
        {family.description}
      </p>

      <SectionCard title="主な特徴">
        <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.7" }}>
          {family.characteristics.map((c, i) => (
            <li
              key={i}
              style={{
                color: "#e0e0e0",
                fontSize: "0.9rem",
                marginBottom: "0.4rem",
              }}
            >
              {c}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title={`この科の植物（${familyPlants.length}種）`}>
        {familyPlants.length === 0 ? (
          <p style={{ margin: 0, color: "#999", fontSize: "0.9rem" }}>
            データがありません。
          </p>
        ) : (
          <div>
            {familyPlants.map((plant) => (
              <Link
                key={plant.id}
                href={`/plants/${plant.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    padding: "0.6rem 0",
                    borderBottom: "1px solid #3a3a3a",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  {plant.image_url ? (
                    <img
                      src={wikimediaThumb(plant.image_url, 80)}
                      alt={plant.japanese_name}
                      loading="lazy"
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        flexShrink: 0,
                        background: "#2a3d2b",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "6px",
                        flexShrink: 0,
                        background: "#2a3d2b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.25rem",
                      }}
                    >
                      🌿
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#7cbe8c", fontSize: "0.95rem" }}>
                      {plant.japanese_name}
                    </div>
                    <div
                      style={{
                        color: "#999",
                        fontSize: "0.78rem",
                        fontStyle: "italic",
                      }}
                    >
                      {plant.scientific_name}
                    </div>
                  </div>
                  <span style={{ color: "#7cbe8c", fontSize: "0.8rem", flexShrink: 0 }}>
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  )
}

export default FamilyDetailPage

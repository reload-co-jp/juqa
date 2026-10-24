import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { plants, families, mergedPlantIds } from "lib/data"
import { redirect } from "next/navigation"
import {
  Breadcrumbs,
  PageHeader,
  SectionCard,
  Tag,
} from "components/elements/layout"
import { columns } from "lib/columns"
import { readdirSync, readFileSync } from "fs"
import path from "path"
import PlantPhotoGallery from "components/elements/PlantPhotoGallery"
import { plantAioSummaryText, plantSummary, publisher, siteUrl } from "lib/seo"

// コラム本文中の /plants/{id} リンクから植物→コラムの逆引きを作る（ビルド時のみ実行）
const columnsDir = path.join(process.cwd(), "app/columns")
const columnPlantIds = new Map(
  readdirSync(columnsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const source = readFileSync(
        path.join(columnsDir, d.name, "page.tsx"),
        "utf8"
      )
      const ids = [...source.matchAll(/\/plants\/(\d+)/g)].map((m) =>
        Number(m[1])
      )
      return [`/columns/${d.name}`, new Set(ids)] as const
    })
)

export function generateStaticParams() {
  return [...plants.map((p) => p.id), ...Object.keys(mergedPlantIds)].map(
    (id) => ({ id: String(id) })
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const mergedTo = mergedPlantIds[Number(id)]
  if (mergedTo)
    return {
      robots: { index: false },
      alternates: { canonical: `${siteUrl}/plants/${mergedTo}/` },
    }
  const plant = plants.find((p) => p.id === Number(id))
  if (!plant) return {}

  const family = families.find((f) => f.id === plant.family_id)
  const description = `${plant.japanese_name}（${plant.scientific_name}）は${family ? `${family.name}の` : ""}植物です。${plant.description[0]}`
  const pageUrl = `${siteUrl}/plants/${plant.id}/`
  const images = plant.image_url ? [{ url: plant.image_url }] : []

  return {
    title: `${plant.japanese_name}（${plant.scientific_name}）`,
    description,
    keywords: [
      plant.japanese_name,
      plant.scientific_name,
      plant.genus,
      ...(family ? [family.name] : []),
      ...plant.tags,
      "植物図鑑",
      "見分け方",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${plant.japanese_name}（${plant.scientific_name}）`,
      description,
      url: pageUrl,
      images,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${plant.japanese_name}（${plant.scientific_name}）`,
      description,
      images: plant.image_url ? [plant.image_url] : [],
    },
  }
}

type Props = {
  params: Promise<{ id: string }>
}

const PlantDetailPage: FC<Props> = async ({ params }) => {
  const { id } = await params
  const mergedTo = mergedPlantIds[Number(id)]
  if (mergedTo) redirect(`/plants/${mergedTo}`)
  const plant = plants.find((p) => p.id === Number(id))

  if (!plant) {
    return (
      <div style={{ color: "#e0e0e0", margin: "0 auto" }}>
        <PageHeader backHref="/plants" backLabel="植物一覧" />
        <p style={{ marginTop: "1rem" }}>植物が見つかりませんでした。</p>
      </div>
    )
  }

  const family = families.find((f) => f.id === plant.family_id)
  const similarPlants = plant.similar_plant_ids
    .map((sid) => plants.find((p) => p.id === sid))
    .filter(Boolean)

  const sameFamilyPlants = plants.filter(
    (p) =>
      p.family_id === plant.family_id &&
      p.id !== plant.id &&
      !plant.similar_plant_ids.includes(p.id)
  )
  const relatedColumns = columns.filter((c) =>
    columnPlantIds.get(c.href)?.has(plant.id)
  )

  const pageUrl = `${siteUrl}/plants/${plant.id}/`
  const aioSummary = plantAioSummaryText(plant, family)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${plant.japanese_name}（${plant.scientific_name}）`,
        description: aioSummary,
        inLanguage: "ja",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#taxon` },
        about: { "@id": `${pageUrl}#taxon` },
        publisher,
      },
      {
        "@type": "Taxon",
        "@id": `${pageUrl}#taxon`,
        name: plant.japanese_name,
        scientificName: plant.scientific_name,
        description: plant.description.join(" "),
        url: pageUrl,
        ...(plant.image_url ? { image: plant.image_url } : {}),
        taxonRank: "https://www.wikidata.org/entity/Q7432",
        additionalProperty: [
          { "@type": "PropertyValue", name: "科", value: family?.name ?? "" },
          { "@type": "PropertyValue", name: "属", value: plant.genus },
          { "@type": "PropertyValue", name: "分布", value: plant.distribution },
          {
            "@type": "PropertyValue",
            name: "見分け方",
            value: plant.identification.join(" "),
          },
          {
            "@type": "PropertyValue",
            name: "タグ",
            value: plant.tags.join("、"),
          },
        ],
        ...(family
          ? {
              parentTaxon: {
                "@type": "Taxon",
                name: family.name,
                url: `${siteUrl}/families/${family.id}/`,
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${plant.japanese_name}は何科の植物ですか？`,
            acceptedAnswer: {
              "@type": "Answer",
              text: family
                ? `${plant.japanese_name}は${family.name}の植物です。`
                : `${plant.japanese_name}の科は未設定です。`,
            },
          },
          {
            "@type": "Question",
            name: `${plant.japanese_name}の見分け方は？`,
            acceptedAnswer: {
              "@type": "Answer",
              text: plant.identification.join(" "),
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "ホーム",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "植物一覧",
            item: `${siteUrl}/plants/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: plant.japanese_name,
            item: pageUrl,
          },
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

      <Breadcrumbs
        items={[
          { href: "/", label: "ホーム" },
          { href: "/plants", label: "植物一覧" },
          { label: plant.japanese_name },
        ]}
      />

      <script
        type="application/json"
        id="plant-summary-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(plantSummary(plant, family)),
        }}
      />

      {/* Images */}

      <PlantPhotoGallery
        images={
          plant.image_url &&
          !plant.images.some((img) => img.url === plant.image_url)
            ? [
                {
                  url: plant.image_url,
                  local_url: plant.local_image_url,
                  caption: "メイン",
                },
                ...plant.images,
              ]
            : plant.images
        }
        plantName={plant.japanese_name}
      />

      {/* Header */}
      <div style={{ marginBottom: "1rem" }}>
        <h1 style={{ margin: 0, fontSize: "1.4rem", color: "#7cbe8c" }}>
          {plant.japanese_name}
        </h1>
        <p
          style={{
            margin: "0.25rem 0",
            color: "#999",
            fontStyle: "italic",
            fontSize: "0.9rem",
          }}
        >
          {plant.scientific_name}
        </p>
        <div
          style={{
            marginTop: "0.5rem",
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {family ? (
            <Link
              href={`/families/${family.id}`}
              style={{ textDecoration: "none" }}
            >
              <Tag>{family.name}</Tag>
            </Link>
          ) : (
            <Tag>—</Tag>
          )}
          <Tag variant="muted">{plant.genus}</Tag>
        </div>
        {plant.tags.length > 0 && (
          <div
            style={{
              marginTop: "0.5rem",
              display: "flex",
              gap: "0.4rem",
              flexWrap: "wrap",
            }}
          >
            {plant.tags.map((tag) => (
              <Link
                key={tag}
                href={`/plants?tags=${encodeURIComponent(tag)}`}
                style={{
                  background: "#1a2e1a",
                  color: "#a0d0a2",
                  borderRadius: "4px",
                  padding: "0.15rem 0.5rem",
                  fontSize: "0.75rem",
                  border: "1px solid #2d4d2d",
                  textDecoration: "none",
                }}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      <SectionCard title="要点">
        <p
          style={{
            margin: 0,
            color: "#e0e0e0",
            fontSize: "0.95rem",
            lineHeight: "1.8",
          }}
        >
          {aioSummary}
        </p>
      </SectionCard>

      <SectionCard title="解説">
        <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.7" }}>
          {plant.description.map((d, i) => (
            <li
              key={i}
              style={{
                color: "#e0e0e0",
                fontSize: "0.9rem",
                marginBottom: "0.4rem",
              }}
            >
              {d}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="見分け方のポイント">
        <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.7" }}>
          {plant.identification.map((item, i) => (
            <li
              key={i}
              style={{
                color: "#e0e0e0",
                fontSize: "0.9rem",
                marginBottom: "0.4rem",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="分布">
        <p style={{ margin: 0, color: "#a0d0a2", fontSize: "0.9rem" }}>
          {plant.distribution}
        </p>
      </SectionCard>

      {similarPlants.length > 0 && (
        <SectionCard title="似ている植物">
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {similarPlants.map((sp) =>
              sp ? (
                <Link
                  key={sp.id}
                  href={`/plants/${sp.id}`}
                  style={{
                    background: "#1e3d1f",
                    color: "#7cbe8c",
                    borderRadius: "4px",
                    padding: "0.3rem 0.75rem",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                  }}
                >
                  {sp.japanese_name}
                </Link>
              ) : null
            )}
          </div>
        </SectionCard>
      )}

      {family && sameFamilyPlants.length > 0 && (
        <SectionCard title={`同じ${family.name}の植物`}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {sameFamilyPlants.slice(0, 12).map((sp) => (
              <Link
                key={sp.id}
                href={`/plants/${sp.id}`}
                style={{
                  background: "#2a2a2a",
                  color: "#cfe8d1",
                  borderRadius: "4px",
                  padding: "0.3rem 0.75rem",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                }}
              >
                {sp.japanese_name}
              </Link>
            ))}
          </div>
        </SectionCard>
      )}

      {relatedColumns.length > 0 && (
        <SectionCard title="関連コラム">
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: "1.8" }}>
            {relatedColumns.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  style={{ color: "#7cbe8c", fontSize: "0.9rem" }}
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {family && (
        <div style={{ marginBottom: "1rem" }}>
          <Link
            href={`/families/${family.id}`}
            style={{
              color: "#7cbe8c",
              textDecoration: "none",
              fontSize: "0.85rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            🌳 {family.name}の詳細を見る →
          </Link>
        </div>
      )}
    </div>
  )
}

export default PlantDetailPage

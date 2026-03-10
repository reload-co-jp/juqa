import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { plants, families } from "lib/data"
import { PageHeader, SectionCard, Tag } from "components/elements/layout"

export function generateStaticParams() {
  return plants.map((plant) => ({ id: String(plant.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const plant = plants.find((p) => p.id === Number(id))
  if (!plant) return {}

  const description = plant.description[0]
  const images = plant.image_url ? [{ url: plant.image_url }] : []

  return {
    title: plant.japanese_name,
    description,
    openGraph: {
      title: plant.japanese_name,
      description,
      images,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: plant.japanese_name,
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

  return (
    <div style={{ margin: "0 auto", color: "#e0e0e0" }}>
      <PageHeader backHref="/plants" backLabel="植物一覧" />

      {/* Image */}
      <div
        style={{
          borderRadius: "8px",
          height: "50dvh",
          marginBottom: "1rem",
          overflow: "hidden",
          background: "#2a3d2b",
          position: "relative",
        }}
      >
        {plant.image_url ? (
          <img
            src={plant.image_url}
            alt={plant.japanese_name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              color: "#a0d0a2",
              fontWeight: "bold",
            }}
          >
            🌿 {plant.japanese_name}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Header */}
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ margin: 0, fontSize: "1.4rem", color: "#7cbe8c" }}>
          {plant.japanese_name}
        </h2>
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
          <Tag>{family?.name ?? "—"}</Tag>
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
              <span
                key={tag}
                style={{
                  background: "#1a2e1a",
                  color: "#a0d0a2",
                  borderRadius: "4px",
                  padding: "0.15rem 0.5rem",
                  fontSize: "0.75rem",
                  border: "1px solid #2d4d2d",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

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

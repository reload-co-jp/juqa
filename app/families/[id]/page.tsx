import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { PageHeader, SectionCard, Tag } from "components/elements/layout"

export function generateStaticParams() {
  return families.map((family) => ({ id: String(family.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const family = families.find((f) => f.id === Number(id))
  if (!family) return {}

  return {
    title: family.name,
    description: family.description,
    openGraph: {
      title: family.name,
      description: family.description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: family.name,
      description: family.description,
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

  return (
    <div style={{ margin: "0 auto", color: "#e0e0e0" }}>
      <PageHeader backHref="/families" backLabel="科一覧" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.5rem",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.4rem", color: "#7cbe8c" }}>
          {family.name}
        </h2>
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
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <span style={{ color: "#7cbe8c", fontSize: "0.95rem" }}>
                      {plant.japanese_name}
                    </span>
                    <span
                      style={{
                        color: "#999",
                        fontSize: "0.78rem",
                        fontStyle: "italic",
                        marginLeft: "0.5rem",
                      }}
                    >
                      {plant.scientific_name}
                    </span>
                  </div>
                  <span style={{ color: "#7cbe8c", fontSize: "0.8rem" }}>
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

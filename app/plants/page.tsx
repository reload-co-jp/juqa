"use client"

import { FC, useState } from "react"
import Link from "next/link"
import { plants, families } from "lib/data"
import { PageHeader, Tag } from "components/elements/layout"

const PlantsPage: FC = () => {
  const [selectedFamilyId, setSelectedFamilyId] = useState<number | null>(null)

  const filteredPlants =
    selectedFamilyId === null
      ? plants
      : plants.filter((p) => p.family_id === selectedFamilyId)

  return (
    <div style={{ margin: "0 auto" }}>
      <PageHeader backHref="/" backLabel="トップ" title="植物一覧" />

      <div style={{ marginBottom: "1rem" }}>
        <select
          value={selectedFamilyId ?? ""}
          onChange={(e) =>
            setSelectedFamilyId(
              e.target.value === "" ? null : Number(e.target.value)
            )
          }
          style={{
            background: "#2d2d2d",
            color: "#e0e0e0",
            border: "1px solid #5a9a5c",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            fontSize: "0.9rem",
            width: "100%",
          }}
        >
          <option value="">すべての科</option>
          {families.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {filteredPlants.map((plant) => {
          const family = families.find((f) => f.id === plant.family_id)
          return (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              style={{
                textDecoration: "none",
                maxWidth: "22rem",
                width: "100%",
              }}
            >
              <div
                style={{
                  background: "#2d2d2d",
                  borderRadius: "8px",
                  overflow: "hidden",
                  borderLeft: "3px solid #5a9a5c",
                }}
              >
                <div
                  style={{
                    height: "240px",
                    background: "#2a3d2b",
                    overflow: "hidden",
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
                        fontSize: "2rem",
                      }}
                    >
                      🌿
                    </div>
                  )}
                </div>
                <div style={{ padding: "0.75rem" }}>
                  <div
                    style={{
                      color: "#7cbe8c",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {plant.japanese_name}
                  </div>
                  <div
                    style={{
                      color: "#999",
                      fontSize: "0.8rem",
                      fontStyle: "italic",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {plant.scientific_name}
                  </div>
                  <Tag>{family?.name ?? "—"}</Tag>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default PlantsPage

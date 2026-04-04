"use client"

import { FC } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { plants } from "lib/data"
import { wikimediaThumb } from "lib/utils"
import { PageHeader } from "components/elements/layout"

const SEASONS: { tag: PlantTag; label: string; color: string; bg: string }[] =
  [
    { tag: "春開花", label: "春", color: "#f4a7b9", bg: "#3d1f2a" },
    { tag: "夏開花", label: "夏", color: "#7ecdc8", bg: "#1a3535" },
    { tag: "秋開花", label: "秋", color: "#e8a04a", bg: "#3d2a10" },
    { tag: "冬開花", label: "冬", color: "#8ab4d8", bg: "#1a2535" },
  ]

const getCurrentSeasonTag = (): PlantTag => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return "春開花"
  if (month >= 6 && month <= 8) return "夏開花"
  if (month >= 9 && month <= 11) return "秋開花"
  return "冬開花"
}

const FlowersContent: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTag =
    (searchParams.get("season") as PlantTag) ?? getCurrentSeasonTag()
  const selected = SEASONS.find((s) => s.tag === selectedTag) ?? null

  const selectSeason = (tag: PlantTag) => {
    router.replace(`?season=${encodeURIComponent(tag)}`, { scroll: false })
  }

  const seasonPlants = selected
    ? plants.filter((p) => p.tags.includes(selected.tag))
    : []

  return (
    <div>
      <PageHeader backHref="/" backLabel="トップ" title="開花カレンダー" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        {SEASONS.map(({ tag, label, color, bg }) => {
          const active = selectedTag === tag
          const count = plants.filter((p) => p.tags.includes(tag)).length
          return (
            <button
              key={tag}
              onClick={() => selectSeason(tag)}
              style={{
                background: active ? bg : "#2d2d2d",
                border: `2px solid ${active ? color : "#444"}`,
                borderRadius: "8px",
                padding: "0.75rem 0.5rem",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: active ? color : "#aaa",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                {label}
              </div>
              <div style={{ color: "#777", fontSize: "0.75rem", marginTop: "0.2rem" }}>
                {count}種
              </div>
            </button>
          )
        })}
      </div>

      {selected ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "0.75rem",
          }}
        >
          {seasonPlants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#2d2d2d",
                  borderRadius: "6px",
                  overflow: "hidden",
                  borderBottom: `2px solid ${selected.color}`,
                }}
              >
                <div
                  style={{
                    height: "120px",
                    background: "#2a3d2b",
                    overflow: "hidden",
                  }}
                >
                  {plant.image_url ? (
                    <img
                      src={wikimediaThumb(plant.image_url, 400)}
                      alt={plant.japanese_name}
                      loading="lazy"
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
                      }}
                    >
                      🌸
                    </div>
                  )}
                </div>
                <div style={{ padding: "0.5rem 0.6rem" }}>
                  <div
                    style={{
                      color: "#e0e0e0",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {plant.japanese_name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

const FlowersPage: FC = () => (
  <Suspense>
    <FlowersContent />
  </Suspense>
)

export default FlowersPage

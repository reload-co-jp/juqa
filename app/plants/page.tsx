"use client"

import { FC, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { plants, families, type PlantTag } from "lib/data"
import { PageHeader, Tag } from "components/elements/layout"

const TAG_GROUPS: { label: string; tags: PlantTag[] }[] = [
  { label: "季節", tags: ["春開花", "夏開花", "秋開花", "常緑", "落葉"] },
  { label: "葉", tags: ["針葉", "手のひら葉", "ギザギザ", "厚い葉", "光沢"] },
  { label: "花", tags: ["花弁5枚", "小花集合", "ラッパ型"] },
  { label: "実", tags: ["どんぐり", "豆", "松ぼっくり"] },
  { label: "樹形", tags: ["高木", "低木", "草本"] },
  { label: "環境", tags: ["街路樹", "山", "公園", "雑草"] },
]

const PlantsContent: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get("q") ?? ""
  const selectedFamilyId = searchParams.get("family") ? Number(searchParams.get("family")) : null
  const selectedTags = new Set<PlantTag>((searchParams.get("tags") ?? "").split(",").filter(Boolean) as PlantTag[])

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    }
    router.replace(`?${params.toString()}`, { scroll: false })
  }

  const setSearchQuery = (value: string) => updateParams({ q: value })
  const setSelectedFamilyId = (id: number | null) => updateParams({ family: id === null ? null : String(id) })
  const toggleTag = (tag: PlantTag) => {
    const next = new Set(selectedTags)
    if (next.has(tag)) { next.delete(tag) } else { next.add(tag) }
    updateParams({ tags: [...next].join(",") || null })
  }

  const filteredPlants = plants.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.replace(/[\u3041-\u3096]/g, (c) =>
        String.fromCharCode(c.charCodeAt(0) + 0x60)
      )
      if (
        !p.japanese_name.includes(q) &&
        !p.scientific_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false
    }
    if (selectedFamilyId !== null && p.family_id !== selectedFamilyId)
      return false
    if (
      selectedTags.size > 0 &&
      ![...selectedTags].every((t) => p.tags.includes(t))
    )
      return false
    return true
  })

  return (
    <div style={{ margin: "0 auto" }}>
      <PageHeader backHref="/" backLabel="トップ" title="植物一覧" />

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="名前で検索（和名・学名）"
          style={{
            background: "#2d2d2d",
            color: "#e0e0e0",
            border: "1px solid #444",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            fontSize: "0.9rem",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      </div>

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
            border: "1px solid #444",
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
          background: "#2d2d2d",
          borderRadius: "8px",
          border: "1px solid #444",
          padding: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        {TAG_GROUPS.map((group) => (
          <div
            key={group.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{ color: "#999", fontSize: "0.75rem", minWidth: "2.5rem" }}
            >
              {group.label}
            </span>
            {group.tags.map((tag) => {
              const active = selectedTags.has(tag)
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    background: active ? "#5a9a5c" : "#1a1a1a",
                    color: active ? "#fff" : "#aaa",
                    border: `1px solid ${active ? "#5a9a5c" : "#444"}`,
                    borderRadius: "4px",
                    padding: "0.15rem 0.5rem",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        ))}
        {selectedTags.size > 0 && (
          <button
            onClick={() => updateParams({ tags: null })}
            style={{
              background: "none",
              color: "#999",
              border: "none",
              fontSize: "0.75rem",
              cursor: "pointer",
              marginTop: "0.25rem",
              padding: 0,
            }}
          >
            ✕ タグをリセット
          </button>
        )}
      </div>

      <div
        style={{ color: "#999", fontSize: "0.8rem", marginBottom: "0.75rem" }}
      >
        {filteredPlants.length}件
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
                  borderRadius: "2px",
                  overflow: "hidden",
                  borderBottom: "2px solid #5a9a5c",
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

const PlantsPage: FC = () => (
  <Suspense>
    <PlantsContent />
  </Suspense>
)

export default PlantsPage

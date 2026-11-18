"use client"

import { FC, useSyncExternalStore } from "react"
import Link from "next/link"
import { plants } from "lib/data"
import { wikimediaThumb } from "lib/utils"

const randomIndex = Math.floor(Math.random() * plants.length)
const noopSubscribe = () => () => {}

const RandomPlant: FC = () => {
  // SSR は先頭、hydration 後にランダムへ切り替える（hydration エラー回避）
  const plant =
    plants[
      useSyncExternalStore(
        noopSubscribe,
        () => randomIndex,
        () => 0
      )
    ]

  return (
    <Link
      href={`/plants/${plant.id}`}
      style={{ display: "block", textDecoration: "none", marginBottom: "2rem" }}
    >
      <div
        style={{
          background: "var(--c-surface)",
          borderRadius: "12px",
          padding: "1.25rem",
          borderLeft: "4px solid var(--c-primary)",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <img
          src={plant.local_image_url ?? wikimediaThumb(plant.image_url, 160)}
          alt={plant.japanese_name}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
            flexShrink: 0,
            background: "var(--c-bg)",
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--c-primary)",
              marginBottom: "0.25rem",
              letterSpacing: "0.05em",
            }}
          >
            🌿 ピックアップ
          </div>
          <div
            style={{
              color: "var(--c-ink)",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "0.25rem",
            }}
          >
            {plant.japanese_name}
          </div>
          <div
            style={{
              color: "var(--c-subtle)",
              fontSize: "0.8rem",
              fontStyle: "italic",
              marginBottom: "0.5rem",
            }}
          >
            {plant.scientific_name}
          </div>
          <div
            style={{
              color: "var(--c-muted)",
              fontSize: "0.85rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {plant.description[0]}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RandomPlant

"use client"

import { FC, useState, useEffect } from "react"
import Link from "next/link"
import { plants } from "lib/data"

const RandomPlant: FC = () => {
  const [plant, setPlant] = useState<Plant | null>(null)

  useEffect(() => {
    setPlant(plants[Math.floor(Math.random() * plants.length)])
  }, [])

  if (!plant) return <div style={{ marginBottom: "2rem", height: "106px" }} />

  return (
    <Link
      href={`/plants/${plant.id}`}
      style={{ display: "block", textDecoration: "none", marginBottom: "2rem" }}
    >
      <div
        style={{
          background: "#2d2d2d",
          borderRadius: "12px",
          padding: "1.25rem",
          borderLeft: "4px solid #7cbe8c",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <img
          src={plant.image_url}
          alt={plant.japanese_name}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
            flexShrink: 0,
            background: "#1e1e1e",
          }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#7cbe8c",
              marginBottom: "0.25rem",
              letterSpacing: "0.05em",
            }}
          >
            🌿 ピックアップ
          </div>
          <div
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              marginBottom: "0.25rem",
            }}
          >
            {plant.japanese_name}
          </div>
          <div
            style={{
              color: "#888",
              fontSize: "0.8rem",
              fontStyle: "italic",
              marginBottom: "0.5rem",
            }}
          >
            {plant.scientific_name}
          </div>
          <div
            style={{
              color: "#aaa",
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

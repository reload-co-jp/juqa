"use client"

import { FC, useState } from "react"

type PlantImage = {
  url: string
  caption: string
}

type Props = {
  images: PlantImage[]
  plantName: string
}

const PlantPhotoGallery: FC<Props> = ({ images, plantName }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) return null

  const current = images[activeIndex]

  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* メイン画像 */}
      <div
        style={{
          borderRadius: "8px",
          height: "50dvh",
          overflow: "hidden",
          background: "#2a3d2b",
          position: "relative",
        }}
      >
        <img
          key={activeIndex}
          src={current.url}
          alt={`${plantName} - ${current.caption}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
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
        <div
          style={{
            position: "absolute",
            bottom: "0.5rem",
            right: "0.75rem",
            color: "#e0e0e0",
            fontSize: "0.75rem",
            background: "rgba(0,0,0,0.5)",
            padding: "0.15rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          {current.caption}
        </div>
      </div>

      {/* サムネイル */}
      {images.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "0.5rem",
            overflowX: "auto",
          }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                flexShrink: 0,
                width: "64px",
                height: "64px",
                padding: 0,
                border: `2px solid ${i === activeIndex ? "#5a9a5c" : "transparent"}`,
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                background: "#2a3d2b",
                position: "relative",
              }}
            >
              <img
                src={img.url}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: i === activeIndex ? 1 : 0.6,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(0,0,0,0.55)",
                  color: "#e0e0e0",
                  fontSize: "0.6rem",
                  textAlign: "center",
                  padding: "0.1rem",
                }}
              >
                {img.caption}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default PlantPhotoGallery

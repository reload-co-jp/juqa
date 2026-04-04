"use client"

import { FC, useState, useEffect } from "react"
import { wikimediaThumb } from "lib/utils"

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
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxOpen])

  if (images.length === 0) return null

  const current = images[activeIndex]

  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* メイン画像 */}
      <button
        aria-label={`${plantName}の画像を全画面表示`}
        onClick={() => setLightboxOpen(true)}
        style={{
          display: "block",
          width: "100%",
          padding: 0,
          border: "none",
          borderRadius: "8px",
          height: "50dvh",
          overflow: "hidden",
          background: "#2a3d2b",
          position: "relative",
          cursor: "zoom-in",
        }}
      >
        <img
          key={activeIndex}
          src={wikimediaThumb(current.url, 800)}
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
      </button>

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
                src={wikimediaThumb(img.url, 160)}
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

      {/* ライトボックス */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${plantName}の画像プレビュー`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 背景（クリックで閉じる） */}
          <button
            aria-label="プレビューを閉じる"
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              border: "none",
              cursor: "zoom-out",
            }}
          />
          {/* 画像 */}
          <img
            src={current.url}
            alt={`${plantName} - ${current.caption}`}
            style={{
              position: "relative",
              maxWidth: "100dvw",
              maxHeight: "100dvh",
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
          {/* 閉じるボタン */}
          <button
            aria-label="プレビューを閉じる"
            onClick={() => setLightboxOpen(false)}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              background: "rgba(0,0,0,0.6)",
              border: "none",
              borderRadius: "50%",
              width: "2.5rem",
              height: "2.5rem",
              color: "#fff",
              fontSize: "1.25rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          {/* キャプション */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#ccc",
              fontSize: "0.8rem",
              background: "rgba(0,0,0,0.5)",
              padding: "0.25rem 0.75rem",
              borderRadius: "4px",
              pointerEvents: "none",
            }}
          >
            {current.caption}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlantPhotoGallery

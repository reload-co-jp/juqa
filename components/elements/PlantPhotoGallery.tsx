"use client"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { commonsFilePage, imagePhoto, imageThumb } from "lib/plants"
import { wikimediaThumb } from "lib/utils"

type PlantImage = {
  url: string
  local_url?: string
  caption: string
}

type Props = {
  images: PlantImage[]
  plantName: string
}

const PlantPhotoGallery: FC<Props> = ({ images, plantName }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)

  const move = useCallback(
    (d: number) => setActiveIndex((i) => (i + d + images.length) % images.length),
    [images.length]
  )

  useEffect(() => {
    if (!lightboxOpen) return
    closeRef.current?.focus()
    const opener = openerRef.current
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowRight") move(1)
      if (e.key === "ArrowLeft") move(-1)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus()
    }
  }, [lightboxOpen, move])

  if (images.length === 0) return null

  const current = images[activeIndex]
  const source = commonsFilePage(current.url)

  return (
    <div>
      <button
        ref={openerRef}
        type="button"
        aria-label={`${plantName}の写真（${current.caption}）を拡大表示`}
        onClick={() => setLightboxOpen(true)}
        style={{
          display: "block",
          width: "100%",
          padding: 0,
          border: "none",
          borderRadius: "16px",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          background: "var(--c-surface-alt)",
          position: "relative",
          cursor: "zoom-in",
        }}
      >
        <img
          key={activeIndex}
          src={imagePhoto(current)}
          alt={`${plantName}の${current.caption}`}
          width={800}
          height={600}
          fetchPriority={activeIndex === 0 ? "high" : undefined}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <span
          style={{
            position: "absolute",
            left: "0.75rem",
            bottom: "0.75rem",
            background: "rgba(255,255,255,0.92)",
            color: "var(--c-ink)",
            fontSize: "0.78rem",
            padding: "0.15rem 0.65rem",
            borderRadius: "999px",
          }}
        >
          {current.caption}
          {images.length > 1 && ` ${activeIndex + 1} / ${images.length}`}
        </span>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "0.75rem",
            bottom: "0.75rem",
            background: "rgba(255,255,255,0.92)",
            color: "var(--c-ink)",
            fontSize: "0.78rem",
            padding: "0.15rem 0.65rem",
            borderRadius: "999px",
          }}
        >
          ⤢ 拡大
        </span>
      </button>

      {images.length > 1 && (
        <ul
          aria-label="写真を選ぶ"
          style={{
            listStyle: "none",
            margin: "0.6rem 0 0",
            padding: 0,
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
          }}
        >
          {images.map((img, i) => (
            <li key={`${img.url}-${i}`} style={{ flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-pressed={i === activeIndex}
                aria-label={`${img.caption}の写真を表示`}
                style={{
                  width: "4.5rem",
                  padding: 0,
                  border: `2px solid ${i === activeIndex ? "var(--c-primary)" : "transparent"}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "var(--c-surface)",
                  display: "block",
                }}
              >
                <img
                  src={imageThumb(img)}
                  alt=""
                  loading="lazy"
                  width={72}
                  height={54}
                  style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", display: "block" }}
                />
                <span
                  style={{
                    display: "block",
                    fontSize: "0.65rem",
                    color: "var(--c-muted)",
                    padding: "0.1rem 0.2rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {img.caption}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <p style={{ margin: "0.5rem 0 0", fontSize: "0.72rem", color: "var(--c-muted)" }}>
        写真の出典：
        {source ? (
          <a href={source} target="_blank" rel="noreferrer">
            Wikimedia Commons（作者・ライセンスはリンク先に記載）
          </a>
        ) : (
          "Wikimedia Commons"
        )}
      </p>

      {lightboxOpen && (
        // 背景クリックで閉じる（キーボードは Esc と閉じるボタンで操作可能）
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${plantName}の写真`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(15,20,16,0.94)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false)
          }}
        >
          <img
            src={wikimediaThumb(current.url, 1600)}
            alt={`${plantName}の${current.caption}`}
            style={{ maxWidth: "100vw", maxHeight: "86vh", objectFit: "contain" }}
          />
          <button
            ref={closeRef}
            type="button"
            aria-label="閉じる"
            onClick={() => setLightboxOpen(false)}
            style={lightboxBtn({ top: "1rem", right: "1rem" })}
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button type="button" aria-label="前の写真" onClick={() => move(-1)} style={lightboxBtn({ left: "0.75rem", top: "50%" })}>
                ‹
              </button>
              <button type="button" aria-label="次の写真" onClick={() => move(1)} style={lightboxBtn({ right: "0.75rem", top: "50%" })}>
                ›
              </button>
            </>
          )}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#ddd",
              fontSize: "0.8rem",
              textAlign: "center",
              width: "calc(100% - 2rem)",
            }}
          >
            {current.caption}
            {source && (
              <>
                {" ・ "}
                <a href={source} target="_blank" rel="noreferrer" style={{ color: "#cfe3cf" }}>
                  出典：Wikimedia Commons
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const lightboxBtn = (pos: React.CSSProperties): React.CSSProperties => ({
  position: "absolute",
  ...pos,
  background: "rgba(255,255,255,0.15)",
  border: "none",
  borderRadius: "50%",
  width: "2.75rem",
  height: "2.75rem",
  color: "#fff",
  fontSize: "1.4rem",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: pos.top === "50%" ? "translateY(-50%)" : undefined,
})

export default PlantPhotoGallery

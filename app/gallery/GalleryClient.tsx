"use client"

import { FC, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { families, plants } from "lib/data"
import { commonsFilePage, imageThumb } from "lib/plants"
import { wikimediaThumb } from "lib/utils"
import { color } from "lib/theme"

type Photo = { key: string; plant: Plant; url: string; local_url?: string; caption: string }

const CATEGORIES = [
  { key: "", label: "すべて" },
  { key: "flower", label: "花", test: (c: string) => /花|つぼみ|苞/.test(c) },
  { key: "leaf", label: "葉・枝", test: (c: string) => /葉|枝|芽/.test(c) && !/花/.test(c) },
  { key: "fruit", label: "実・種子", test: (c: string) => /実|果|種子|球果|どんぐり|ローズヒップ/.test(c) },
  { key: "whole", label: "全体・群生", test: (c: string) => /全体|群|樹皮|自生地|様子|木/.test(c) && !/花|実|果/.test(c) },
] as const

const allPhotos: Photo[] = plants.flatMap((plant) => {
  const seen = new Set<string>()
  return plant.images
    .filter((img) => (seen.has(img.url) ? false : (seen.add(img.url), true)))
    .map((img, i) => ({ key: `${plant.id}-${i}`, plant, ...img }))
})

const STEP = 60
const usedFamilies = families
  .filter((f) => plants.some((p) => p.family_id === f.id))
  .sort((a, b) => a.name.localeCompare(b.name, "ja"))

const GalleryClient: FC = () => {
  const router = useRouter()
  const params = useSearchParams()
  const cat = params.get("type") ?? ""
  const familyId = Number(params.get("family")) || null
  const [limit, setLimit] = useState(STEP)
  const [open, setOpen] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const photos = useMemo(() => {
    const c = CATEGORIES.find((x) => x.key === cat)
    return allPhotos.filter(
      (p) => (!familyId || p.plant.family_id === familyId) && (!c || !("test" in c) || c.test(p.caption))
    )
  }, [cat, familyId])

  const filterKey = `${cat}|${familyId}`
  const [limitKey, setLimitKey] = useState(filterKey)
  if (limitKey !== filterKey) {
    setLimitKey(filterKey)
    setLimit(STEP)
  }

  useEffect(() => {
    if (open === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % photos.length))
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length))
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, photos.length])

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    const qs = next.toString()
    router.replace(qs ? `?${qs}` : "/gallery", { scroll: false })
  }

  const current = open !== null ? photos[open] : null

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem" }}>
        <div role="group" aria-label="写真の種類" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {CATEGORIES.map((c) => (
            <button key={c.key} type="button" className="chip" aria-pressed={cat === c.key} onClick={() => update("type", c.key)}>
              {c.label}
            </button>
          ))}
        </div>
        <label htmlFor="gallery-family" className="sr-only">
          科で絞り込む
        </label>
        <select
          id="gallery-family"
          className="input"
          style={{ width: "auto", minHeight: "2.25rem", fontSize: "0.85rem" }}
          value={familyId ?? ""}
          onChange={(e) => update("family", e.target.value)}
        >
          <option value="">すべての科</option>
          {usedFamilies.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
        <span role="status" style={{ fontSize: "0.85rem", color: color.muted }}>
          {photos.length}枚
        </span>
      </div>

      <ul className="grid-cards grid-cards--sm" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {photos.slice(0, limit).map((p, i) => (
          <li key={p.key}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${p.plant.japanese_name}（${p.caption}）の写真を拡大`}
              style={{ display: "block", width: "100%", padding: 0, border: "none", background: color.surfaceAlt, borderRadius: "10px", overflow: "hidden", cursor: "zoom-in", position: "relative" }}
            >
              <img src={imageThumb(p)} alt={`${p.plant.japanese_name}の${p.caption}`} loading="lazy" decoding="async" width={240} height={240} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }} />
              <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "1.25rem 0.6rem 0.45rem", background: "linear-gradient(transparent, rgba(0,0,0,0.6))", color: "#fff", fontSize: "0.78rem", textAlign: "left" }}>
                {p.plant.japanese_name}
                <span style={{ opacity: 0.8, marginLeft: "0.4rem", fontSize: "0.7rem" }}>{p.caption}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {limit < photos.length && (
        <p style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button type="button" className="btn btn--secondary" onClick={() => setLimit((l) => l + STEP)}>
            もっと見る（残り{photos.length - limit}枚）
          </button>
        </p>
      )}

      {current && (
        // 背景クリックで閉じる（キーボードは Esc と閉じるボタンで操作可能）
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.plant.japanese_name}の写真`}
          onClick={(e) => e.target === e.currentTarget && setOpen(null)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,20,16,0.95)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        >
          <img
            src={current.local_url ?? wikimediaThumb(current.url, 1200)}
            alt={`${current.plant.japanese_name}の${current.caption}`}
            style={{ maxWidth: "100%", maxHeight: "72vh", objectFit: "contain", borderRadius: "6px" }}
          />
          <div style={{ color: "#eee", textAlign: "center", marginTop: "1rem" }}>
            <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
              {current.plant.japanese_name}
              <span style={{ fontWeight: 400, fontSize: "0.85rem", marginLeft: "0.5rem", opacity: 0.8 }}>{current.caption}</span>
            </p>
            <p style={{ margin: "0.6rem 0 0", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", fontSize: "0.85rem" }}>
              <Link
                href={`/plants/${current.plant.id}`}
                className="btn"
                style={{ minHeight: "2.4rem" }}
                data-track="select_item"
                data-track-item-list-name="gallery"
                data-track-item-id={String(current.plant.id)}
              >
                {current.plant.japanese_name}の詳細を見る
              </Link>
              {commonsFilePage(current.url) && (
                <a href={commonsFilePage(current.url)!} target="_blank" rel="noreferrer" style={{ color: "#cfe3cf", alignSelf: "center" }}>
                  出典：Wikimedia Commons
                </a>
              )}
            </p>
          </div>
          <button ref={closeRef} type="button" aria-label="閉じる" onClick={() => setOpen(null)} style={navBtn({ top: "1rem", right: "1rem" })}>
            ✕
          </button>
          <button type="button" aria-label="前の写真" onClick={() => setOpen((i) => (i! - 1 + photos.length) % photos.length)} style={navBtn({ left: "0.5rem", top: "40%" })}>
            ‹
          </button>
          <button type="button" aria-label="次の写真" onClick={() => setOpen((i) => (i! + 1) % photos.length)} style={navBtn({ right: "0.5rem", top: "40%" })}>
            ›
          </button>
        </div>
      )}
    </div>
  )
}

const navBtn = (pos: React.CSSProperties): React.CSSProperties => ({
  position: "absolute",
  ...pos,
  width: "2.75rem",
  height: "2.75rem",
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,0.15)",
  color: "#fff",
  fontSize: "1.4rem",
  cursor: "pointer",
})

export default GalleryClient

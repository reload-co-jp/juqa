"use client"

import { FC, useEffect } from "react"
import { trackEvent } from "lib/analytics"

/**
 * `data-track="event_name"` と `data-track-*` 属性を持つ要素のクリックを GA4 イベントとして送る。
 * サーバーコンポーネント側は属性を付けるだけで計測できる。
 */
export const ClickTracker: FC = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]")
      if (!el) return
      const params: Record<string, string> = {}
      for (const [key, value] of Object.entries(el.dataset)) {
        if (key === "track" || !key.startsWith("track") || value === undefined) continue
        const name = key.slice(5).replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
        params[name] = value
      }
      trackEvent(el.dataset.track!, params)
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])
  return null
}

/** マウント時に 1 回イベントを送る */
export const TrackOnMount: FC<{ name: string; params?: Record<string, string | number> }> = ({
  name,
  params,
}) => {
  const key = JSON.stringify(params ?? {})
  useEffect(() => {
    trackEvent(name, JSON.parse(key))
  }, [name, key])
  return null
}

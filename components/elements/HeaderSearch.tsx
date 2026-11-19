"use client"

import { FC, FormEvent, useId, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { trackEvent } from "lib/analytics"

const isPlantsPage = (pathname: string | null) =>
  pathname === "/plants" || pathname === "/plants/"

export const HeaderSearch: FC<{
  variant?: "header" | "hero"
  placeholder?: string
}> = ({ variant = "header", placeholder = "植物名で検索" }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isComposing = useRef(false)
  const inputId = useId()
  const live = variant === "header" && isPlantsPage(pathname)
  const currentQuery = live ? (searchParams.get("q") ?? "") : ""
  const [query, setQuery] = useState(currentQuery)
  const [syncedQuery, setSyncedQuery] = useState(currentQuery)
  // URL の検索語が変わったら入力欄に反映する（描画中の state 調整）
  if (variant === "header" && syncedQuery !== currentQuery) {
    setSyncedQuery(currentQuery)
    setQuery(currentQuery)
  }

  const go = (raw: string, submit: boolean) => {
    const next = raw.trim()
    if (submit && next) trackEvent("search", { search_term: next, source: variant })
    if (!next) {
      if (live) router.replace("/plants")
      return
    }
    const url = `/plants?q=${encodeURIComponent(next)}`
    if (live) router.replace(url, { scroll: false })
    else if (submit) router.push(url)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    go(query, true)
  }

  const hero = variant === "hero"

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      style={{ display: "flex", gap: "0.4rem", alignItems: "center", width: "100%" }}
    >
      <label htmlFor={inputId} className="sr-only">
        植物名で検索
      </label>
      <input
        id={inputId}
        type="search"
        className="input"
        value={query}
        enterKeyHint="search"
        onChange={(e) => {
          setQuery(e.target.value)
          if (!isComposing.current && live) go(e.target.value, false)
        }}
        onCompositionStart={() => {
          isComposing.current = true
        }}
        onCompositionEnd={(e) => {
          isComposing.current = false
          setQuery(e.currentTarget.value)
          if (live) go(e.currentTarget.value, false)
        }}
        placeholder={placeholder}
        style={
          hero
            ? { minHeight: "3.25rem", fontSize: "1rem", borderRadius: "999px", paddingLeft: "1.25rem", border: "none" }
            : { minHeight: "2.4rem", fontSize: "0.9rem", borderRadius: "999px", paddingLeft: "1rem" }
        }
      />
      <button
        type="submit"
        className="btn"
        style={
          hero
            ? { minHeight: "3.25rem", padding: "0 1.5rem" }
            : { minHeight: "2.4rem", padding: "0 0.9rem", fontSize: "0.85rem" }
        }
      >
        検索
      </button>
    </form>
  )
}

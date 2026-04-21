"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const HeaderSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isComposing = useRef(false)
  const currentQuery = pathname === "/plants" ? searchParams.get("q") ?? "" : ""
  const [query, setQuery] = useState(currentQuery)

  useEffect(() => {
    setQuery(currentQuery)
  }, [currentQuery])

  const submitSearch = (rawQuery: string) => {
    const nextQuery = rawQuery.trim()
    if (!nextQuery) {
      if (pathname === "/plants") {
        router.push("/plants")
      }
      return
    }
    router.push(`/plants?q=${encodeURIComponent(nextQuery)}`)
  }

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    submitSearch(query)
  }

  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        width: "min(100%, 26rem)",
      }}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          if (!isComposing.current && pathname === "/plants") {
            submitSearch(e.target.value)
          }
        }}
        onCompositionStart={() => {
          isComposing.current = true
        }}
        onCompositionEnd={(e) => {
          isComposing.current = false
          setQuery(e.currentTarget.value)
          if (pathname === "/plants") {
            submitSearch(e.currentTarget.value)
          }
        }}
        placeholder="植物名で検索"
        aria-label="植物名で検索"
        style={{
          flex: 1,
          minWidth: 0,
          padding: "0.45rem 0.7rem",
          borderRadius: "6px",
          border: "1px solid rgba(190, 236, 197, 0.55)",
          background: "#17231a",
          color: "#f4fbf5",
          colorScheme: "dark",
          boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.35)",
          caretColor: "#b7e7c0",
          fontSize: "0.85rem",
        }}
      />
      <button
        type="submit"
        style={{
          background: "#1f3b25",
          color: "#fff",
          border: "1px solid rgba(190, 236, 197, 0.38)",
          padding: "0.45rem 0.85rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "0.85rem",
          whiteSpace: "nowrap",
        }}
      >
        検索
      </button>
    </form>
  )
}

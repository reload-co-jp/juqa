"use client"

import { FC, Suspense, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { plants, families } from "lib/data"
import { TAG_GROUPS } from "lib/tags"
import { regionTagsFromDistribution } from "lib/region"
import { FLOWER_COLORS, flowerColorsFromPlant } from "lib/flower-color"
import { SEASONS, getFamily, matchesQuery } from "lib/plants"
import { trackEvent } from "lib/analytics"
import { color, flowerSwatch, radius } from "lib/theme"
import { EmptyState } from "components/elements/layout"
import { PlantGrid } from "components/elements/PlantCard"

const PER_PAGE = 48

const SORTS = [
  { value: "", label: "おすすめ順（収録順）" },
  { value: "name", label: "名前順（五十音）" },
  { value: "family", label: "科ごと" },
  { value: "new", label: "新しく収録した順" },
] as const

const FORM_TAGS: PlantTag[] = ["高木", "低木", "草本"]
const SEASON_TAGS: PlantTag[] = SEASONS.map((s) => s.tag)
const OTHER_GROUPS = TAG_GROUPS.map((g) => ({
  ...g,
  tags: g.tags.filter((t) => !FORM_TAGS.includes(t) && !SEASON_TAGS.includes(t)),
})).filter((g) => g.tags.length > 0)

const sortedFamilies = [...families].sort((a, b) => a.name.localeCompare(b.name, "ja"))

const sortPlants = (list: Plant[], sort: string) => {
  const arr = [...list]
  if (sort === "name") arr.sort((a, b) => a.japanese_name.localeCompare(b.japanese_name, "ja"))
  else if (sort === "family")
    arr.sort(
      (a, b) =>
        (getFamily(a)?.name ?? "").localeCompare(getFamily(b)?.name ?? "", "ja") ||
        a.japanese_name.localeCompare(b.japanese_name, "ja")
    )
  else if (sort === "new") arr.sort((a, b) => b.id - a.id)
  return arr
}

const labelStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 700,
  color: color.muted,
  margin: "0 0 0.4rem",
  display: "block",
}

const ChipToggle: FC<{
  active: boolean
  onClick: () => void
  children: React.ReactNode
}> = ({ active, onClick, children }) => (
  <button type="button" className="chip" aria-pressed={active} onClick={onClick}>
    {children}
  </button>
)

const PlantsContent: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get("q") ?? ""
  const [inputValue, setInputValue] = useState(searchQuery)
  const isComposing = useRef(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isComposing.current) setInputValue(searchQuery)
  }, [searchQuery])

  const familyParam = searchParams.get("family")
  const selectedFamilyId = familyParam ? Number(familyParam) : null
  const selectedTags = new Set<PlantTag>(
    (searchParams.get("tags") ?? "").split(",").filter(Boolean) as PlantTag[]
  )
  const selectedFlowerColors = new Set<FlowerColor>(
    (searchParams.get("colors") ?? "").split(",").filter(Boolean) as FlowerColor[]
  )
  const sort = searchParams.get("sort") ?? ""
  const page = Math.max(1, Number(searchParams.get("page") ?? 1) || 1)

  const updateParams = (updates: Record<string, string | null>, keepPage = false) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(updates)) {
      if (value === null || value === "") params.delete(key)
      else params.set(key, value)
    }
    if (!keepPage) params.delete("page")
    const qs = params.toString()
    router.replace(qs ? `?${qs}` : "/plants", { scroll: false })
  }

  // 検索ワードの計測（入力が落ち着いてから送る）
  useEffect(() => {
    if (!searchQuery.trim()) return
    const t = setTimeout(
      () => trackEvent("search", { search_term: searchQuery.trim(), source: "plants" }),
      1200
    )
    return () => clearTimeout(t)
  }, [searchQuery])

  const toggleIn = <T extends string>(set: Set<T>, value: T, key: string) => {
    const next = new Set(set)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    updateParams({ [key]: [...next].join(",") || null })
  }

  const filteredPlants = useMemo(
    () =>
      sortPlants(
        plants.filter((p) => {
          if (searchQuery && !matchesQuery(p, searchQuery)) return false
          if (selectedFamilyId !== null && p.family_id !== selectedFamilyId) return false
          if (selectedFlowerColors.size > 0) {
            const fc = flowerColorsFromPlant(p)
            if (![...selectedFlowerColors].some((c) => fc.includes(c))) return false
          }
          if (selectedTags.size > 0) {
            const allTags = [...p.tags, ...regionTagsFromDistribution(p.distribution)]
            // 同じ種類（季節・形態）の中は「いずれか」、種類どうしは「すべて」
            const seasons = [...selectedTags].filter((t) => SEASON_TAGS.includes(t))
            const forms = [...selectedTags].filter((t) => FORM_TAGS.includes(t))
            const others = [...selectedTags].filter(
              (t) => !SEASON_TAGS.includes(t) && !FORM_TAGS.includes(t)
            )
            if (seasons.length && !seasons.some((t) => allTags.includes(t))) return false
            if (forms.length && !forms.some((t) => allTags.includes(t))) return false
            if (!others.every((t) => allTags.includes(t))) return false
          }
          return true
        }),
        sort
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams]
  )

  const totalPages = Math.max(1, Math.ceil(filteredPlants.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pagePlants = filteredPlants.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  const selectedFamily = families.find((f) => f.id === selectedFamilyId)
  const otherSelectedCount = [...selectedTags].filter(
    (t) => !SEASON_TAGS.includes(t) && !FORM_TAGS.includes(t)
  ).length

  const activeFilters: { label: string; clear: () => void }[] = [
    ...(searchQuery ? [{ label: `「${searchQuery}」`, clear: () => { setInputValue(""); updateParams({ q: null }) } }] : []),
    ...(selectedFamily ? [{ label: selectedFamily.name, clear: () => updateParams({ family: null }) }] : []),
    ...[...selectedFlowerColors].map((c) => ({
      label: `花の色：${c}`,
      clear: () => toggleIn(selectedFlowerColors, c, "colors"),
    })),
    ...[...selectedTags].map((t) => ({ label: t, clear: () => toggleIn(selectedTags, t, "tags") })),
  ]

  const goPage = (n: number) => {
    updateParams({ page: n > 1 ? String(n) : null }, true)
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        style={{
          background: color.surface,
          border: `1px solid ${color.border}`,
          borderRadius: radius.lg,
          padding: "1.25rem",
          marginBottom: "1.5rem",
          display: "grid",
          gap: "1.1rem",
        }}
      >
        <div className="search-row">
          <div>
            <label htmlFor="plant-q" style={labelStyle}>
              名前で検索（和名・学名・属名・科名）
            </label>
            <input
              id="plant-q"
              type="search"
              className="input"
              value={inputValue}
              enterKeyHint="search"
              onChange={(e) => {
                setInputValue(e.target.value)
                if (!isComposing.current) updateParams({ q: e.target.value })
              }}
              onCompositionStart={() => {
                isComposing.current = true
              }}
              onCompositionEnd={(e) => {
                isComposing.current = false
                updateParams({ q: (e.target as HTMLInputElement).value })
              }}
              placeholder="例：さくら、カエデ属、Quercus"
            />
          </div>
          <div>
            <label htmlFor="plant-family" style={labelStyle}>
              科
            </label>
            <select
              id="plant-family"
              className="input"
              value={selectedFamilyId ?? ""}
              onChange={(e) => updateParams({ family: e.target.value || null })}
            >
              <option value="">すべての科</option>
              {sortedFamilies.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={labelStyle}>開花時期</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {SEASONS.map((s) => (
              <ChipToggle
                key={s.tag}
                active={selectedTags.has(s.tag)}
                onClick={() => toggleIn(selectedTags, s.tag, "tags")}
              >
                {s.label}
                <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>{s.months}</span>
              </ChipToggle>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={labelStyle}>花の色</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {FLOWER_COLORS.map((c) => (
              <ChipToggle
                key={c}
                active={selectedFlowerColors.has(c)}
                onClick={() => toggleIn(selectedFlowerColors, c, "colors")}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "0.8rem",
                    height: "0.8rem",
                    borderRadius: "50%",
                    background: flowerSwatch[c],
                    border: "1px solid rgba(0,0,0,0.2)",
                  }}
                />
                {c}
              </ChipToggle>
            ))}
          </div>
        </fieldset>

        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={labelStyle}>樹木・草花</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {FORM_TAGS.map((t) => (
              <ChipToggle key={t} active={selectedTags.has(t)} onClick={() => toggleIn(selectedTags, t, "tags")}>
                {t === "草本" ? "草本（草花）" : `${t}（樹木）`}
              </ChipToggle>
            ))}
          </div>
        </fieldset>

        <details className="filter-more" open={otherSelectedCount > 0 || undefined}>
          <summary className="text-link" style={{ display: "inline-block" }}>
            ＋ 葉・実・生育場所・地域で絞り込む
            {otherSelectedCount > 0 && `（${otherSelectedCount}件選択中）`}
          </summary>
          <div style={{ display: "grid", gap: "0.9rem", marginTop: "0.9rem" }}>
            {OTHER_GROUPS.map((group) => (
              <fieldset key={group.label} style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={labelStyle}>{group.label}</legend>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {group.tags.map((t) => (
                    <ChipToggle key={t} active={selectedTags.has(t)} onClick={() => toggleIn(selectedTags, t, "tags")}>
                      {t}
                    </ChipToggle>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </details>
      </form>

      <div
        ref={resultsRef}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
          scrollMarginTop: "7rem",
        }}
      >
        <p role="status" aria-live="polite" style={{ margin: 0, fontSize: "0.9rem", color: color.inkSoft }}>
          <strong style={{ fontSize: "1.2rem", color: color.ink }}>{filteredPlants.length}</strong> 種
          {filteredPlants.length > PER_PAGE &&
            `（${(currentPage - 1) * PER_PAGE + 1}〜${Math.min(currentPage * PER_PAGE, filteredPlants.length)}件目）`}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label htmlFor="plant-sort" style={{ fontSize: "0.8rem", color: color.muted }}>
            並び順
          </label>
          <select
            id="plant-sort"
            className="input"
            style={{ width: "auto", minHeight: "2.4rem", fontSize: "0.88rem" }}
            value={sort}
            onChange={(e) => updateParams({ sort: e.target.value || null })}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem", alignItems: "center" }}>
          {activeFilters.map((f) => (
            <button
              key={f.label}
              type="button"
              className="chip chip--active"
              onClick={f.clear}
              aria-label={`${f.label} の条件を外す`}
            >
              {f.label} <span aria-hidden="true">×</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setInputValue("")
              router.replace("/plants", { scroll: false })
            }}
            className="text-link"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0.5rem" }}
          >
            すべての条件を解除
          </button>
        </div>
      )}

      {filteredPlants.length === 0 ? (
        <EmptyState title="条件に合う植物が見つかりませんでした">
          <p style={{ margin: "0 0 1rem", fontSize: "0.9rem", color: color.muted }}>
            条件を減らすか、ひらがな・カタカナ・学名など別の書き方でも検索してみてください。
          </p>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {activeFilters.length > 0 && (
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setInputValue("")
                  router.replace("/plants", { scroll: false })
                }}
              >
                条件をすべて解除
              </button>
            )}
            <Link href="/guide" className="btn btn--secondary">
              見分け方ガイドで探す
            </Link>
            <Link href="/families" className="btn btn--secondary">
              科から探す
            </Link>
          </div>
        </EmptyState>
      ) : (
        <PlantGrid plants={pagePlants} showFeature listName="plants_list" priorityCount={4} />
      )}

      {totalPages > 1 && (
        <nav aria-label="ページ送り" style={{ marginTop: "2rem" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", gap: "0.4rem", justifyContent: "center", flexWrap: "wrap" }}>
            <li>
              <button type="button" className="chip" disabled={currentPage === 1} onClick={() => goPage(currentPage - 1)}>
                ← 前へ
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <li key={n}>
                <button
                  type="button"
                  className="chip"
                  aria-current={n === currentPage ? "page" : undefined}
                  onClick={() => goPage(n)}
                  style={{ minWidth: "2.5rem", justifyContent: "center" }}
                >
                  {n}
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="chip" disabled={currentPage === totalPages} onClick={() => goPage(currentPage + 1)}>
                次へ →
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  )
}

const PlantsClient: FC = () => (
  <Suspense fallback={<PlantGrid plants={plants} showFeature />}>
    <PlantsContent />
  </Suspense>
)

export default PlantsClient

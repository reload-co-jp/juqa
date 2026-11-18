"use client"

import { FC, Suspense, useSyncExternalStore } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { plants } from "lib/data"
import { SEASONS, seasonOfMonth } from "lib/plants"
import { color, seasonColor } from "lib/theme"
import { PlantGrid } from "components/elements/PlantCard"

const noop = () => () => {}
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)

const CalendarView: FC<{ seasonKey: string; month: number | null; onSelect: (key: string) => void }> = ({
  seasonKey,
  month,
  onSelect,
}) => {
  const season = SEASONS.find((s) => s.key === seasonKey) ?? SEASONS[0]
  const list = plants.filter((p) => p.tags.includes(season.tag))
  return (
    <div>
      <div
        role="tablist"
        aria-label="季節を選ぶ"
        style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "0.5rem", marginBottom: "0.75rem" }}
      >
        {SEASONS.map((s) => {
          const active = s.key === season.key
          const sc = seasonColor[s.label]
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls="calendar-panel"
              onClick={() => onSelect(s.key)}
              style={{
                padding: "0.8rem 0.25rem",
                borderRadius: "12px",
                border: `2px solid ${active ? sc.fg : color.border}`,
                background: active ? sc.bg : color.surface,
                cursor: "pointer",
                font: "inherit",
                textAlign: "center",
              }}
            >
              <span className="serif" style={{ display: "block", fontSize: "1.3rem", fontWeight: 700, color: active ? sc.fg : color.ink }}>
                {s.label}
              </span>
              <span style={{ display: "block", fontSize: "0.72rem", color: color.muted }}>
                {s.months}・{plants.filter((p) => p.tags.includes(s.tag)).length}種
              </span>
            </button>
          )
        })}
      </div>
      <ol
        aria-label="月と季節の対応"
        style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: "2px", fontSize: "0.7rem", textAlign: "center" }}
      >
        {MONTHS.map((m) => {
          const s = seasonOfMonth(m)
          const sc = seasonColor[s.label]
          const inSeason = s.key === season.key
          return (
            <li
              key={m}
              aria-current={m === month ? "date" : undefined}
              style={{
                padding: "0.3rem 0",
                background: inSeason ? sc.bg : color.surfaceAlt,
                color: inSeason ? sc.fg : color.subtle,
                fontWeight: m === month ? 700 : 400,
                outline: m === month ? `2px solid ${sc.fg}` : undefined,
                outlineOffset: "-2px",
                borderRadius: "4px",
              }}
            >
              {m}月
            </li>
          )
        })}
      </ol>
      <div id="calendar-panel" role="tabpanel">
        <h2 className="serif" style={{ fontSize: "1.3rem", margin: "0 0 0.25rem" }}>
          {season.label}（{season.months}）に咲く植物
        </h2>
        <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: color.muted }}>
          {list.length}種 ・ <Link href={`/seasons/${season.key}`}>樹木・草花に分けた一覧ページ</Link>
        </p>
        <PlantGrid plants={list} listName={`calendar_${season.key}`} small />
      </div>
    </div>
  )
}

const FlowersContent: FC = () => {
  const router = useRouter()
  const params = useSearchParams()
  const month = useSyncExternalStore(noop, () => new Date().getMonth() + 1, () => null)
  const param = params.get("season")
  // 旧URL（?season=春開花）と新しいキー（?season=spring）の両方に対応
  const fromParam = SEASONS.find((s) => s.key === param || s.tag === param)
  const key = fromParam?.key ?? (month ? seasonOfMonth(month).key : SEASONS[0].key)
  return (
    <CalendarView
      seasonKey={key}
      month={month}
      onSelect={(k) => router.replace(`?season=${k}`, { scroll: false })}
    />
  )
}

const FlowersClient: FC = () => (
  <Suspense fallback={<CalendarView seasonKey={SEASONS[0].key} month={null} onSelect={() => {}} />}>
    <FlowersContent />
  </Suspense>
)

export default FlowersClient

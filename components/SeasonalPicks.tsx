"use client"

import { FC, useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { PlantCard } from "components/elements/PlantCard"
import { SEASONS, seasonOfMonth } from "lib/plants"
import { color } from "lib/theme"

type Props = {
  /** 季節キー → 表示する植物 */
  picks: Record<string, Plant[]>
  counts: Record<string, number>
  /** ビルド時点の季節（JS 無効時・初回描画用） */
  fallbackKey: string
}

const noopSubscribe = () => () => {}

/**
 * 「今の季節に見られる植物」。静的書き出しのため、閲覧時の日付で季節を決め直す。
 */
export const SeasonalPicks: FC<Props> = ({ picks, counts, fallbackKey }) => {
  const currentKey = useSyncExternalStore(
    noopSubscribe,
    () => seasonOfMonth(new Date().getMonth() + 1).key,
    () => fallbackKey
  )
  const [chosen, setChosen] = useState<string | null>(null)
  const key = chosen ?? currentKey
  const season = SEASONS.find((s) => s.key === key) ?? SEASONS[0]
  const month = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getMonth() + 1,
    () => null
  )

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        role="group"
        aria-label="季節を選ぶ"
      >
        {SEASONS.map((s) => (
          <button
            key={s.key}
            type="button"
            className="chip"
            aria-pressed={s.key === key}
            onClick={() => setChosen(s.key)}
          >
            {s.label}
            <span style={{ fontSize: "0.72rem", opacity: 0.8 }}>{s.months}</span>
          </button>
        ))}
        {month && chosen === null && (
          <span style={{ fontSize: "0.8rem", color: color.muted }}>
            いまは{month}月。{season.label}に咲く植物を表示中
          </span>
        )}
      </div>
      <ul className="scroll-row" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {(picks[season.key] ?? []).map((plant) => (
          <li key={plant.id}>
            <PlantCard plant={plant} listName={`home_season_${season.key}`} />
          </li>
        ))}
      </ul>
      <p style={{ margin: "1rem 0 0", textAlign: "right" }}>
        <Link href={`/seasons/${season.key}`} className="text-link">
          {season.label}に咲く植物 {counts[season.key]}種をすべて見る →
        </Link>
      </p>
    </div>
  )
}

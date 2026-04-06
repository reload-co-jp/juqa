import { FC } from "react"
import type { Region } from "lib/region"

type Props = {
  regions: Region[]
}

const ACTIVE_COLOR = "#7cbe8c"
const INACTIVE_COLOR = "#3a3a3a"
const STROKE_COLOR = "#555"

// Simplified SVG paths for Japan's 5 major regions
// viewBox: 0 0 200 220
const REGION_PATHS: { region: Region; d: string; labelX: number; labelY: number }[] = [
  {
    region: "北海道",
    d: "M 85 5 L 130 5 L 148 25 L 155 40 L 140 55 L 120 60 L 100 55 L 80 45 L 72 30 Z",
    labelX: 113,
    labelY: 35,
  },
  {
    region: "本州",
    d: "M 30 70 L 55 62 L 80 65 L 110 68 L 140 72 L 160 85 L 165 100 L 150 115 L 130 120 L 110 115 L 95 105 L 80 95 L 65 85 L 45 80 Z",
    labelX: 100,
    labelY: 93,
  },
  {
    region: "四国",
    d: "M 80 128 L 110 122 L 135 128 L 138 145 L 120 155 L 95 155 L 78 145 Z",
    labelX: 108,
    labelY: 141,
  },
  {
    region: "九州",
    d: "M 30 118 L 60 115 L 75 120 L 78 140 L 72 158 L 55 168 L 35 165 L 20 150 L 18 132 Z",
    labelX: 48,
    labelY: 143,
  },
  {
    region: "沖縄",
    d: "M 10 190 L 28 188 L 32 198 L 28 208 L 10 210 L 6 200 Z",
    labelX: 19,
    labelY: 200,
  },
]

const JapanMap: FC<Props> = ({ regions }) => {
  const activeSet = new Set(regions)

  return (
    <svg
      viewBox="0 0 200 220"
      style={{ width: "100%", maxWidth: "200px", height: "auto" }}
      aria-label="日本地図"
    >
      {REGION_PATHS.map(({ region, d, labelX, labelY }) => {
        const active = activeSet.has(region)
        return (
          <g key={region}>
            <path
              d={d}
              fill={active ? ACTIVE_COLOR : INACTIVE_COLOR}
              stroke={STROKE_COLOR}
              strokeWidth="1.5"
              opacity={active ? 1 : 0.5}
            />
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="9"
              fill={active ? "#fff" : "#888"}
              fontWeight={active ? "bold" : "normal"}
            >
              {region}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default JapanMap

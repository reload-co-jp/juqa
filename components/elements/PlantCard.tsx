import { FC } from "react"
import Link from "next/link"
import { bloomText, getFamily, plantThumb } from "lib/plants"
import { color, seasonColor } from "lib/theme"

type Props = {
  plant: Plant
  /** 簡単な特徴（見分け方の先頭）を表示する */
  showFeature?: boolean
  /** GA4 計測用のリスト名 */
  listName?: string
  /** 画像を優先読み込みする（ファーストビュー用） */
  priority?: boolean
  headingLevel?: "h2" | "h3" | "div"
}

export const PlantCard: FC<Props> = ({
  plant,
  showFeature = false,
  listName,
  priority = false,
  headingLevel = "h3",
}) => {
  const family = getFamily(plant)
  const bloom = bloomText(plant)
  const H = headingLevel
  return (
    <Link
      href={`/plants/${plant.id}`}
      className="card-link"
      data-track={listName ? "select_item" : undefined}
      data-track-item-list-name={listName}
      data-track-item-id={listName ? String(plant.id) : undefined}
      data-track-item-name={listName ? plant.japanese_name : undefined}
    >
      <div className="card-photo">
        <img
          src={plantThumb(plant)}
          alt={`${plant.japanese_name}の写真`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={480}
          height={360}
        />
      </div>
      <div style={{ padding: "0.75rem 0.9rem 0.95rem" }}>
        <H
          style={{
            margin: 0,
            fontSize: "1rem",
            fontWeight: 700,
            color: color.ink,
            lineHeight: 1.4,
          }}
        >
          {plant.japanese_name}
        </H>
        <p
          lang="la"
          style={{
            margin: "0.1rem 0 0",
            fontSize: "0.75rem",
            fontStyle: "italic",
            color: color.muted,
            lineHeight: 1.5,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {plant.scientific_name}
        </p>
        <p
          style={{
            margin: "0.5rem 0 0",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.3rem 0.5rem",
            fontSize: "0.75rem",
            color: color.inkSoft,
            alignItems: "center",
          }}
        >
          {family && <span>{family.name}</span>}
          {bloom && (
            <span
              style={{
                color: seasonColor[bloom[0]]?.fg ?? color.muted,
                background: seasonColor[bloom[0]]?.bg ?? color.surfaceAlt,
                borderRadius: "999px",
                padding: "0 0.5rem",
              }}
            >
              {bloom}に開花
            </span>
          )}
        </p>
        {showFeature && plant.identification[0] && (
          <p
            style={{
              margin: "0.45rem 0 0",
              fontSize: "0.78rem",
              color: color.muted,
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {plant.identification[0]}
          </p>
        )}
      </div>
    </Link>
  )
}

export const PlantGrid: FC<{
  plants: Plant[]
  showFeature?: boolean
  listName?: string
  small?: boolean
  priorityCount?: number
}> = ({ plants, showFeature, listName, small, priorityCount = 0 }) => (
  <ul
    className={`grid-cards${small ? " grid-cards--sm" : ""}`}
    style={{ listStyle: "none", padding: 0, margin: 0 }}
  >
    {plants.map((plant, i) => (
      <li key={plant.id}>
        <PlantCard
          plant={plant}
          showFeature={showFeature}
          listName={listName}
          priority={i < priorityCount}
        />
      </li>
    ))}
  </ul>
)

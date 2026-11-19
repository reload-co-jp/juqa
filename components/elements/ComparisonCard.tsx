import { FC } from "react"
import Link from "next/link"
import { type Comparison, comparisonTitle } from "lib/collections"
import { plantById, plantThumb } from "lib/plants"

/** 比較ページへのカード（2種の写真＋タイトル） */
export const ComparisonCard: FC<{ c: Comparison; showLead?: boolean }> = ({ c, showLead = true }) => {
  const a = plantById.get(c.a)!
  const b = plantById.get(c.b)!
  return (
    <Link
      href={`/compare/${c.slug}`}
      className="card-link"
      data-track="select_content"
      data-track-content-type="comparison"
      data-track-item-id={c.slug}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
        {[a, b].map((p) => (
          <div key={p.id} className="card-photo card-photo--square">
            <img src={plantThumb(p)} alt="" loading="lazy" width={200} height={200} />
          </div>
        ))}
      </div>
      <div style={{ padding: "0.7rem 0.9rem 0.95rem" }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.5 }}>{comparisonTitle(c)}</p>
        {showLead && (
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.78rem", color: "var(--c-muted)", lineHeight: 1.6 }}>{c.lead}</p>
        )}
      </div>
    </Link>
  )
}

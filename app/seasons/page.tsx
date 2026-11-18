import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs, JsonLd, PageIntro } from "components/elements/layout"
import { seasonPlants } from "lib/collections"
import { SEASONS, plantThumb } from "lib/plants"
import { siteUrl } from "lib/seo"
import { color, seasonColor } from "lib/theme"

const pageUrl = `${siteUrl}/seasons/`
const description =
  "春・夏・秋・冬、それぞれの季節に花を咲かせる植物を写真つきで紹介します。季節の散歩や山歩きで出会う花を調べられます。"

export const metadata: Metadata = {
  title: "季節の植物 — 春夏秋冬に咲く花",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: "季節の植物 — 春夏秋冬に咲く花", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "季節の植物", description },
}

export default function SeasonsPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": pageUrl,
          url: pageUrl,
          name: "季節の植物",
          description,
          inLanguage: "ja",
          isPartOf: { "@id": `${siteUrl}/#website` },
        }}
      />
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "季節の植物" }]} currentUrl={pageUrl} />
      <PageIntro
        eyebrow="SEASONS"
        title="季節の植物"
        lead="収録植物の開花時期（季節単位のデータ）から、季節ごとに花を咲かせる植物をまとめました。開花の時期は地域や年によって前後します。"
      />
      <ul className="grid-2 grid-2--stack" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {SEASONS.map((s) => {
          const list = seasonPlants(s.key)
          const sc = seasonColor[s.label]
          return (
            <li key={s.key}>
              <Link href={`/seasons/${s.key}`} className="card-link">
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px" }}>
                  {list.filter((p) => p.flower_colors?.length).slice(0, 4).map((p) => (
                    <div key={p.id} className="card-photo card-photo--square">
                      <img src={plantThumb(p)} alt="" loading="lazy" width={160} height={160} />
                    </div>
                  ))}
                </div>
                <div style={{ padding: "1rem 1.2rem 1.2rem" }}>
                  <p style={{ margin: 0, display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                    <span className="serif" style={{ fontSize: "1.4rem", fontWeight: 700, color: sc.fg }}>
                      {s.label}に咲く花
                    </span>
                    <span style={{ fontSize: "0.8rem", color: color.muted }}>{s.months}</span>
                  </p>
                  <p style={{ margin: "0.3rem 0 0", fontSize: "0.85rem", color: color.inkSoft }}>
                    {list.length}種 ・ {list.slice(0, 5).map((p) => p.japanese_name).join("、")} など
                  </p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
      <p style={{ marginTop: "2rem", fontSize: "0.9rem" }}>
        写真で季節を切り替えながら眺めるなら <Link href="/flowers">開花カレンダー</Link> もどうぞ。
      </p>
    </div>
  )
}

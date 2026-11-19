import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs, JsonLd, LinkCard, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { activeFeatureCollections, comparisons, featurePlants } from "lib/collections"
import { families, plants } from "lib/data"
import { SEASONS } from "lib/plants"
import { siteUrl } from "lib/seo"

const pageUrl = `${siteUrl}/explore/`
const description =
  "名前・特徴・科・季節・写真から植物を探す方法の一覧。見分け方ガイドや似ている植物の比較ページもまとめています。"

export const metadata: Metadata = {
  title: "植物を探す",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: "植物を探す", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "植物を探す", description },
}

const ways = [
  { href: "/plants", icon: "🔤", title: "名前から探す", description: `和名・学名・属名・科名で${plants.length}種を検索。花の色や開花時期で絞り込めます。` },
  { href: "/features", icon: "🍂", title: "特徴から探す", description: "花の色・実・紅葉・常緑樹など、見た目の特徴ごとの一覧。" },
  { href: "/families", icon: "🌳", title: "科から探す", description: `${families.length}科を系統順に整理。仲間ごとの共通点がわかります。` },
  { href: "/seasons", icon: "🌸", title: "季節から探す", description: "春・夏・秋・冬に花を咲かせる植物。" },
  { href: "/gallery", icon: "📷", title: "写真から探す", description: "花・葉・実の写真を眺めて図鑑へ。" },
  { href: "/guide", icon: "🧭", title: "見分け方ガイド", description: "質問に「はい・いいえ」で答えて科を絞り込む。" },
  { href: "/compare", icon: "⚖️", title: "似ている植物を比べる", description: `${comparisons.length}組の比較ページと、自由に2種を選べる比較表。` },
]

export default function ExplorePage() {
  return (
    <div>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", "@id": pageUrl, url: pageUrl, name: "植物を探す", description, inLanguage: "ja", isPartOf: { "@id": `${siteUrl}/#website` } }} />
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "植物を探す" }]} currentUrl={pageUrl} />
      <PageIntro eyebrow="FIND" title="植物を探す" lead={description} />
      <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {ways.map((w) => (
          <li key={w.href}>
            <LinkCard {...w} track="explore" />
          </li>
        ))}
      </ul>
      <Section labelledBy="quick">
        <SectionHeading id="quick" title="よく使う切り口" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {SEASONS.map((s) => (
            <Link key={s.key} href={`/seasons/${s.key}`} className="chip">
              {s.label}に咲く花
            </Link>
          ))}
          {activeFeatureCollections.map((c) => (
            <Link key={c.slug} href={`/features/${c.slug}`} className="chip">
              {c.heading}
              <span style={{ fontSize: "0.72rem", color: "var(--c-muted)" }}>{featurePlants(c).length}</span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs, JsonLd, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { activeFeatureCollections, featurePlants } from "lib/collections"
import { plantThumb } from "lib/plants"
import { siteUrl } from "lib/seo"
import { color } from "lib/theme"

const pageUrl = `${siteUrl}/features/`
const description =
  "花の色、どんぐり・松ぼっくり、紅葉、常緑樹・落葉樹、街路樹など、特徴から植物を探せる一覧です。"

export const metadata: Metadata = {
  title: "特徴から植物を探す — 花の色・実・葉",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: "特徴から植物を探す", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "特徴から植物を探す", description },
}

const groups = [...new Set(activeFeatureCollections.map((c) => c.group))]

export default function FeaturesPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": pageUrl,
          url: pageUrl,
          name: "特徴から植物を探す",
          description,
          inLanguage: "ja",
          isPartOf: { "@id": `${siteUrl}/#website` },
        }}
      />
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "特徴から探す" }]} currentUrl={pageUrl} />
      <PageIntro eyebrow="FEATURES" title="特徴から植物を探す" lead={description} />
      {groups.map((g) => (
        <Section key={g} labelledBy={`g-${g}`} style={{ margin: "0 0 2.5rem" }}>
          <SectionHeading id={`g-${g}`} title={g} />
          <ul className="grid-cards grid-cards--sm" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {activeFeatureCollections
              .filter((c) => c.group === g)
              .map((c) => {
                const list = featurePlants(c)
                const cover = list.find((p) => p.local_image_url) ?? list[0]
                return (
                  <li key={c.slug}>
                    <Link href={`/features/${c.slug}`} className="card-link">
                      <div className="card-photo" style={{ aspectRatio: "16 / 10" }}>
                        <img src={plantThumb(cover)} alt="" loading="lazy" width={320} height={200} />
                      </div>
                      <div style={{ padding: "0.7rem 0.9rem 0.9rem" }}>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.5, color: color.ink }}>{c.heading}</p>
                        <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: color.muted }}>{list.length}種</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </Section>
      ))}
      <p style={{ fontSize: "0.9rem" }}>
        条件を組み合わせて探すなら <Link href="/plants">植物図鑑の絞り込み検索</Link> が便利です。
      </p>
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { Breadcrumbs, JsonLd, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { comparisons, comparisonTitle } from "lib/collections"
import { plantById, plantThumb } from "lib/plants"
import { siteUrl } from "lib/seo"
import CompareClient from "./CompareClient"

const pageUrl = `${siteUrl}/compare/`
const description =
  "ヤブツバキとサザンカ、ソメイヨシノとヤマザクラなど、よく似た植物の違いを写真と表で比較します。好きな2種を選んで比べることもできます。"

export const metadata: Metadata = {
  title: "似ている植物の違いを比較",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: "似ている植物の違いを比較", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "似ている植物の違いを比較", description },
}

export default function CompareIndexPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": pageUrl,
          url: pageUrl,
          name: "似ている植物の違いを比較",
          description,
          inLanguage: "ja",
          isPartOf: { "@id": `${siteUrl}/#website` },
          hasPart: comparisons.map((c) => ({ "@type": "Article", headline: comparisonTitle(c), url: `${siteUrl}/compare/${c.slug}/` })),
        }}
      />
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "植物を比較する" }]} currentUrl={pageUrl} />
      <PageIntro eyebrow="COMPARE" title="似ている植物を比較する" lead={description} />

      <Section labelledBy="pairs" style={{ marginTop: 0 }}>
        <SectionHeading id="pairs" title="よく比べられる組み合わせ" />
        <ul className="grid-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {comparisons.map((c) => {
            const a = plantById.get(c.a)!
            const b = plantById.get(c.b)!
            return (
              <li key={c.slug}>
                <Link href={`/compare/${c.slug}`} className="card-link">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                    {[a, b].map((p) => (
                      <div key={p.id} className="card-photo card-photo--square">
                        <img src={plantThumb(p)} alt="" loading="lazy" width={200} height={200} />
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "0.7rem 0.9rem 0.95rem" }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "0.92rem", lineHeight: 1.5 }}>{comparisonTitle(c)}</p>
                    <p style={{ margin: "0.25rem 0 0", fontSize: "0.78rem", color: "var(--c-muted)", lineHeight: 1.6 }}>{c.lead}</p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section labelledBy="free-compare">
        <SectionHeading id="free-compare" title="好きな2種を選んで比べる" lead="収録しているすべての植物から2種を選んで比較できます。" />
        <Suspense fallback={null}>
          <CompareClient />
        </Suspense>
      </Section>
    </div>
  )
}

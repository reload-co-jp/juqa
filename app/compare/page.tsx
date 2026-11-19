import type { Metadata } from "next"
import { Suspense } from "react"
import { Breadcrumbs, JsonLd, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { ComparisonCard } from "components/elements/ComparisonCard"
import { COMPARISON_CATEGORIES, comparisons, comparisonTitle } from "lib/collections"
import { siteUrl } from "lib/seo"
import CompareClient from "./CompareClient"

const pageUrl = `${siteUrl}/compare/`
const description =
  `梅と桜、ツバキとサザンカ、アヤメとカキツバタなど、よく似た植物${comparisons.length}組の違いと見分け方を、写真とポイント表で解説します。好きな2種を選んで比べることもできます。`

export const metadata: Metadata = {
  title: "似ている植物の違いを比較",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: "似ている植物の違いを比較", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "似ている植物の違いを比較", description },
}

const groups = COMPARISON_CATEGORIES.map((g) => ({ ...g, items: comparisons.filter((c) => c.category === g.id) })).filter(
  (g) => g.items.length > 0
)

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

      <nav aria-label="カテゴリ" style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
        {groups.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="chip">
            {g.label}（{g.items.length}）
          </a>
        ))}
      </nav>

      {groups.map((g, i) => (
        <Section key={g.id} labelledBy={`${g.id}-h`} id={g.id} style={i === 0 ? { marginTop: "1.5rem" } : undefined}>
          <SectionHeading id={`${g.id}-h`} title={`${g.label}の違い`} />
          <ul className="grid-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {g.items.map((c) => (
              <li key={c.slug}>
                <ComparisonCard c={c} />
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section labelledBy="free-compare">
        <SectionHeading id="free-compare" title="好きな2種を選んで比べる" lead="収録しているすべての植物から2種を選んで比較できます。" />
        <Suspense fallback={null}>
          <CompareClient />
        </Suspense>
      </Section>
    </div>
  )
}

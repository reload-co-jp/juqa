import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs, JsonLd, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { ComparisonTable } from "components/elements/ComparisonTable"
import { TrackOnMount } from "components/Analytics"
import { comparisons, comparisonTitle } from "lib/collections"
import { getFamily, plantById, plantThumb } from "lib/plants"
import { publisher, siteUrl } from "lib/seo"
import { color } from "lib/theme"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

const load = (slug: string) => {
  const c = comparisons.find((x) => x.slug === slug)
  if (!c) return null
  return { c, a: plantById.get(c.a)!, b: plantById.get(c.b)! }
}

const describe = (a: Plant, b: Plant, lead: string) =>
  `${lead}${a.japanese_name}と${b.japanese_name}を、写真・花・葉・開花時期・生育環境・見分け方のポイントで横並びに比較します。`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const d = load(slug)
  if (!d) return {}
  const title = `${comparisonTitle(d.c)}・見分け方を比較`
  const description = describe(d.a, d.b, d.c.lead)
  const url = `${siteUrl}/compare/${d.c.slug}/`
  const image = d.a.local_image_url ? `${siteUrl}${d.a.local_image_url}` : undefined
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", ...(image ? { images: [{ url: image }] } : {}) },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, ...(image ? { images: [image] } : {}) },
  }
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params
  const d = load(slug)
  if (!d) notFound()
  const { c, a, b } = d
  const url = `${siteUrl}/compare/${c.slug}/`
  const title = comparisonTitle(c)
  const others = comparisons.filter((x) => x.slug !== c.slug)
  const sameFamily = a.family_id === b.family_id
  const sameGenus = a.genus === b.genus
  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": url,
          url,
          mainEntityOfPage: url,
          headline: title,
          description: describe(a, b, c.lead),
          inLanguage: "ja",
          ...(a.local_image_url ? { image: `${siteUrl}${a.local_image_url}` } : {}),
          about: [a, b].map((p) => ({
            "@type": "Taxon",
            name: p.japanese_name,
            scientificName: p.scientific_name,
            url: `${siteUrl}/plants/${p.id}/`,
          })),
          publisher,
          author: publisher,
        }}
      />
      <TrackOnMount name="view_comparison" params={{ comparison: c.slug }} />
      <Breadcrumbs
        items={[{ href: "/", label: "ホーム" }, { href: "/compare", label: "植物を比較する" }, { label: title }]}
        currentUrl={url}
      />
      <PageIntro eyebrow="COMPARE" title={title} lead={describe(a, b, c.lead)}>
        <p style={{ margin: "0.75rem 0 0", fontSize: "0.88rem", color: color.inkSoft }}>
          {sameGenus
            ? `どちらも${getFamily(a)?.name ?? ""}${a.genus}の植物です。`
            : sameFamily
              ? `どちらも${getFamily(a)?.name}の植物で、${a.japanese_name}は${a.genus}、${b.japanese_name}は${b.genus}に分類されます。`
              : `${a.japanese_name}は${getFamily(a)?.name ?? "—"}、${b.japanese_name}は${getFamily(b)?.name ?? "—"}の植物です。`}
        </p>
      </PageIntro>

      <ComparisonTable a={a} b={b} />

      <p style={{ margin: "1rem 0 0", fontSize: "0.78rem", color: color.muted }}>
        ※ 表は JuQa! に収録している各植物のデータから作成しています。データがない項目は「情報なし」と表示しています。
      </p>

      <Section labelledBy="other-compare">
        <SectionHeading id="other-compare" title="ほかの似ている植物の比較" href="/compare" more="比較ページ一覧" />
        <ul className="grid-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {others.slice(0, 8).map((x) => {
            const pa = plantById.get(x.a)!
            const pb = plantById.get(x.b)!
            return (
              <li key={x.slug}>
                <Link href={`/compare/${x.slug}`} className="card-link">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                    {[pa, pb].map((p) => (
                      <div key={p.id} className="card-photo card-photo--square">
                        <img src={plantThumb(p)} alt="" loading="lazy" width={200} height={200} />
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: 0, padding: "0.7rem 0.9rem 0.9rem", fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.5 }}>
                    {comparisonTitle(x)}
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>
    </article>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Breadcrumbs, JsonLd, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { ComparisonCard } from "components/elements/ComparisonCard"
import { ComparisonTable } from "components/elements/ComparisonTable"
import { TrackOnMount } from "components/Analytics"
import { COMPARISON_CATEGORIES, comparisons, comparisonTitle } from "lib/collections"
import { getFamily, plantById, plantPhoto } from "lib/plants"
import { publisher, siteUrl } from "lib/seo"
import { color, radius } from "lib/theme"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

const load = (slug: string) => {
  const c = comparisons.find((x) => x.slug === slug)
  if (!c) return null
  return { c, a: plantById.get(c.a)!, b: plantById.get(c.b)! }
}

/** 「〇〇と〇〇の違い。（結論）」を 120 字程度に収める */
const describe = (title: string, summary: string) => {
  const full = `${title}。${summary}`
  if (full.length <= 120) return full
  const cut = full.slice(0, 120)
  const end = cut.lastIndexOf("。")
  return end > 40 ? cut.slice(0, end + 1) : `${cut.slice(0, 119)}…`
}

const ogImage = (p: Plant) => (p.local_image_url ? `${siteUrl}${p.local_image_url}` : undefined)

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const d = load(slug)
  if (!d) return {}
  const title = `${comparisonTitle(d.c)}は？見分け方を写真で比較`
  const description = describe(comparisonTitle(d.c), d.c.summary)
  const url = `${siteUrl}/compare/${d.c.slug}/`
  const image = ogImage(d.a)
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", ...(image ? { images: [{ url: image }] } : {}) },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, ...(image ? { images: [image] } : {}) },
  }
}

const relationText = (a: Plant, b: Plant) => {
  const fa = getFamily(a)?.name
  const fb = getFamily(b)?.name
  if (a.genus === b.genus) return `どちらも${fa ?? ""}${a.genus}の植物で、近い仲間です。`
  if (a.family_id === b.family_id)
    return `どちらも${fa}の植物ですが、${a.japanese_name}は${a.genus}、${b.japanese_name}は${b.genus}と属が分かれます。`
  return `${a.japanese_name}は${fa ?? "—"}、${b.japanese_name}は${fb ?? "—"}で、分類上は別の科の植物です。`
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params
  const d = load(slug)
  if (!d) notFound()
  const { c, a, b } = d
  const url = `${siteUrl}/compare/${c.slug}/`
  const title = comparisonTitle(c)
  const description = describe(title, c.summary)

  // 同じ植物を含む比較 → 同じカテゴリの比較 の順に関連づける
  const others = comparisons.filter((x) => x.slug !== c.slug)
  const sharing = others.filter((x) => [x.a, x.b].some((id) => id === c.a || id === c.b))
  const sameCategory = others.filter((x) => x.category === c.category && !sharing.includes(x))
  const related = [...sharing, ...sameCategory].slice(0, 8)
  const categoryLabel = COMPARISON_CATEGORIES.find((x) => x.id === c.category)?.label

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
          description,
          abstract: c.summary,
          inLanguage: "ja",
          ...(ogImage(a) ? { image: [ogImage(a), ogImage(b)].filter(Boolean) } : {}),
          about: [a, b].map((p) => ({
            "@type": "Taxon",
            name: p.japanese_name,
            scientificName: p.scientific_name,
            url: `${siteUrl}/plants/${p.id}/`,
          })),
          isPartOf: { "@id": `${siteUrl}/#website` },
          publisher,
          author: publisher,
        }}
      />
      <TrackOnMount name="view_comparison" params={{ comparison: c.slug }} />
      <Breadcrumbs
        items={[{ href: "/", label: "ホーム" }, { href: "/compare", label: "植物を比較する" }, { label: title }]}
        currentUrl={url}
      />
      <PageIntro eyebrow={`COMPARE${categoryLabel ? ` ・ ${categoryLabel}` : ""}`} title={`${title}・見分け方`} lead={c.lead}>
        <p style={{ margin: "0.5rem 0 0", fontSize: "0.88rem", color: color.inkSoft }}>{relationText(a, b)}</p>
      </PageIntro>

      {/* 2種の写真 */}
      <div className="grid-2" style={{ gap: "0.75rem" }}>
        {[a, b].map((p, i) => (
          <figure key={p.id} style={{ margin: 0 }}>
            <Link href={`/plants/${p.id}`} style={{ display: "block", textDecoration: "none", color: color.ink }}>
              <div className="card-photo" style={{ borderRadius: radius.lg }}>
                <img
                  src={plantPhoto(p)}
                  alt={`${p.japanese_name}の写真`}
                  width={800}
                  height={600}
                  fetchPriority={i === 0 ? "high" : undefined}
                  loading={i === 0 ? undefined : "lazy"}
                />
              </div>
              <figcaption style={{ marginTop: "0.5rem" }}>
                <span className="serif" style={{ fontSize: "1.15rem", fontWeight: 700 }}>
                  {p.japanese_name}
                </span>
                <span lang="la" style={{ marginLeft: "0.5rem", fontStyle: "italic", fontSize: "0.8rem", color: color.muted }}>
                  {p.scientific_name}
                </span>
              </figcaption>
            </Link>
          </figure>
        ))}
      </div>

      {/* 結論 */}
      <Section labelledBy="answer" style={{ margin: "2rem 0" }}>
        <div
          style={{
            background: color.primaryTint,
            borderLeft: `4px solid ${color.primary}`,
            borderRadius: radius.md,
            padding: "1.1rem 1.25rem",
          }}
        >
          <h2 id="answer" style={{ margin: 0, fontSize: "1rem", color: color.primary }}>
            見分け方の結論
          </h2>
          <p style={{ margin: "0.4rem 0 0", lineHeight: 1.9 }}>{c.summary}</p>
        </div>
      </Section>

      {/* 違いのポイント */}
      <Section labelledBy="points" style={{ margin: "2rem 0" }}>
        <SectionHeading id="points" title={`${a.japanese_name}と${b.japanese_name}の違いのポイント`} />
        <div style={{ overflowX: "auto" }}>
          <table className="compare-table">
            <caption className="sr-only">
              {title}のポイント
            </caption>
            <thead>
              <tr>
                <td aria-hidden="true" />
                {[a, b].map((p) => (
                  <th key={p.id} scope="col" className="serif" style={{ fontSize: "1.05rem" }}>
                    {p.japanese_name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.points.map((pt) => (
                <tr key={pt.label}>
                  <th scope="row">{pt.label}</th>
                  <td>{pt.a}</td>
                  <td>{pt.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {c.tips && c.tips.length > 0 && (
          <div style={{ marginTop: "1.25rem" }}>
            <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.95rem" }}>見分けるときの注意</h3>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", color: color.inkSoft, lineHeight: 1.85 }}>
              {c.tips.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* 収録データでの比較 */}
      <Section labelledBy="data" style={{ margin: "2.5rem 0" }}>
        <SectionHeading
          id="data"
          title="図鑑データで比べる"
          lead="科・形態・花・葉・開花時期・生育環境を、JuQa! に収録している各植物のデータから並べています。"
        />
        <ComparisonTable a={a} b={b} photos={false} />
        <p style={{ margin: "1rem 0 0", fontSize: "0.78rem", color: color.muted }}>
          ※ データがない項目は「情報なし」と表示しています。
        </p>
      </Section>

      <Section labelledBy="other-compare">
        <SectionHeading id="other-compare" title="あわせて見たい比較" href="/compare" more="比較ページ一覧" />
        <ul className="grid-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {related.map((x) => (
            <li key={x.slug}>
              <ComparisonCard c={x} showLead={false} />
            </li>
          ))}
        </ul>
      </Section>
    </article>
  )
}

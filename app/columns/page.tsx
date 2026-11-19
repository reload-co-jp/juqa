import type { Metadata } from "next"
import { Breadcrumbs, JsonLd, LinkCard, PageIntro } from "components/elements/layout"
import { columns } from "lib/columns"
import { columnImage } from "lib/column-meta"
import { siteUrl } from "lib/seo"

const pageUrl = `${siteUrl}/columns/`
const description =
  "植物の見分け方、分類の基礎、季節の花、植物と文化など、植物をもっと楽しむための読み物コラムの一覧です。"

export const metadata: Metadata = {
  title: "植物コラム",
  description,
  keywords: ["植物コラム", "植物の豆知識", "植物の見分け方", "植物解説"],
  alternates: { canonical: pageUrl },
  openGraph: { title: "植物コラム | ジュカ！", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "植物コラム | ジュカ！", description },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "植物コラム",
      description,
      inLanguage: "ja",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${pageUrl}#itemlist` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#itemlist`,
      numberOfItems: columns.length,
      itemListElement: columns.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}${c.href}/`,
        name: c.title,
      })),
    },
  ],
}

const Page = () => (
  <div>
    <JsonLd data={jsonLd} />
    <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "植物コラム" }]} currentUrl={pageUrl} />
    <PageIntro eyebrow="COLUMNS" title="植物コラム" lead={description} />
    <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {columns.map((col) => {
        const img = columnImage(col.href)
        return (
          <li key={col.href}>
            <LinkCard
              href={col.href}
              title={col.title}
              description={col.description}
              image={img?.src}
              imageAlt={img?.alt}
              icon={img ? undefined : col.emoji}
              meta={col.tags.join("・")}
            />
          </li>
        )
      })}
    </ul>
  </div>
)

export default Page

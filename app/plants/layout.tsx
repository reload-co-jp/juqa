import type { Metadata } from "next"
import { families, plants } from "lib/data"
import { siteUrl } from "lib/seo"

const pageUrl = `${siteUrl}/plants/`
const description = `街路樹・公園・山で見かける植物を${plants.length}種掲載。科・タグ・キーワードで絞り込み検索できます。`
const familyById = new Map(families.map((family) => [family.id, family]))

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "植物一覧",
      description,
      numberOfItems: plants.length,
      inLanguage: "ja",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${pageUrl}#itemlist` },
    },
    {
      "@type": "ItemList",
      "@id": `${pageUrl}#itemlist`,
      name: "植物一覧",
      numberOfItems: plants.length,
      itemListElement: plants.slice(0, 100).map((plant, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/plants/${plant.id}/`,
        item: {
          "@type": "Taxon",
          name: plant.japanese_name,
          scientificName: plant.scientific_name,
          parentTaxon: familyById.get(plant.family_id)?.name,
        },
      })),
    },
  ],
}

export const metadata: Metadata = {
  title: "植物一覧",
  description,
  keywords: ["植物一覧", "植物図鑑", "街路樹", "樹木", "草花", "植物検索", "科で検索"],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "植物一覧",
    description,
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "植物一覧",
    description,
  },
}

export default function PlantsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}

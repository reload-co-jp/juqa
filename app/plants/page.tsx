import PlantsClient from "./PlantsClient"
import type { Metadata } from "next"
import { families, plants } from "lib/data"
import { siteUrl } from "lib/seo"
import { Breadcrumbs, PageIntro } from "components/elements/layout"

const pageUrl = `${siteUrl}/plants/`
const description = `街路樹・公園・山で見かける植物${plants.length}種の植物図鑑。和名・学名での検索や、科・花の色・開花時期・樹木／草花などの条件で絞り込めます。`
const familyById = new Map(families.map((family) => [family.id, family]))

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": pageUrl,
      url: pageUrl,
      name: "植物図鑑（植物一覧）",
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
      itemListElement: plants.map((plant, index) => ({
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
  title: "植物図鑑 — 植物一覧と検索",
  description,
  keywords: [
    "植物一覧",
    "植物図鑑",
    "街路樹",
    "樹木",
    "草花",
    "植物検索",
    "科で検索",
  ],
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

export default function PlantsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "植物図鑑" }]} currentUrl={pageUrl} />
      <PageIntro
        eyebrow="ENCYCLOPEDIA"
        title="植物図鑑"
        lead={`街路樹・公園・山で出会う${plants.length}種・${families.length}科を収録。名前や特徴、開花時期から植物を探せます。`}
      />
      <PlantsClient />
    </>
  )
}

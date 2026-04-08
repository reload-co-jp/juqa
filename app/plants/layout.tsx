import type { Metadata } from "next"
import { plants } from "lib/data"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/plants/`

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": pageUrl,
  url: pageUrl,
  name: "植物一覧",
  description: "街路樹・公園・山で見かける植物を一覧表示します。科・タグ・キーワードで絞り込み検索できます。",
  numberOfItems: plants.length,
  inLanguage: "ja",
  isPartOf: { "@id": `${siteUrl}/#website` },
}

export const metadata: Metadata = {
  title: "植物一覧",
  description: "街路樹・公園・山で見かける100種の植物を一覧表示します。科・タグ・キーワードで絞り込み検索できます。",
  keywords: ["植物一覧", "植物図鑑", "街路樹", "樹木", "草花", "植物検索", "科で検索"],
  openGraph: {
    title: "植物一覧",
    description: "街路樹・公園・山で見かける100種の植物を一覧表示します。科・タグ・キーワードで絞り込み検索できます。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "植物一覧",
    description: "街路樹・公園・山で見かける100種の植物を一覧表示します。科・タグ・キーワードで絞り込み検索できます。",
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

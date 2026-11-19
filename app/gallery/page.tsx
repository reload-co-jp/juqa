import type { Metadata } from "next"
import { Suspense } from "react"
import { Breadcrumbs, JsonLd, PageIntro } from "components/elements/layout"
import { plants } from "lib/data"
import { siteUrl } from "lib/seo"
import GalleryClient from "./GalleryClient"

const pageUrl = `${siteUrl}/gallery/`
const total = plants.reduce((n, p) => n + p.images.length, 0)
const description = `収録植物の写真${total}枚を一覧できるフォトギャラリー。花・葉・実などの写真から、植物図鑑の詳細ページへ移動できます。`

export const metadata: Metadata = {
  title: "植物のフォトギャラリー",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: "植物のフォトギャラリー", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "植物のフォトギャラリー", description },
}

export default function GalleryPage() {
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": pageUrl,
          url: pageUrl,
          name: "植物のフォトギャラリー",
          description,
          inLanguage: "ja",
          isPartOf: { "@id": `${siteUrl}/#website` },
        }}
      />
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "フォトギャラリー" }]} currentUrl={pageUrl} />
      <PageIntro
        eyebrow="GALLERY"
        title="フォトギャラリー"
        lead="花・葉・実の写真を眺めて、気になる植物を見つけてください。写真をタップすると拡大表示し、そこから図鑑へ移動できます。写真はすべて Wikimedia Commons のもので、作者・ライセンスは各写真の出典リンクに記載されています。"
      />
      <Suspense fallback={null}>
        <GalleryClient />
      </Suspense>
    </div>
  )
}

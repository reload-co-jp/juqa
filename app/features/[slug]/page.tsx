import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CollectionView } from "components/elements/CollectionView"
import { activeFeatureCollections, featurePlants } from "lib/collections"
import { siteUrl } from "lib/seo"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return activeFeatureCollections.map((c) => ({ slug: c.slug }))
}

const find = (slug: string) => activeFeatureCollections.find((c) => c.slug === slug)

const describe = (c: (typeof activeFeatureCollections)[number], list: Plant[]) =>
  `${c.lead}${list.slice(0, 4).map((p) => p.japanese_name).join("・")}など${list.length}種を、写真と見分け方のポイントつきで紹介します。`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const c = find(slug)
  if (!c) return {}
  const list = featurePlants(c)
  const title = `${c.title}一覧（${list.length}種）`
  const description = describe(c, list)
  const url = `${siteUrl}/features/${c.slug}/`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
  }
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params
  const c = find(slug)
  if (!c) notFound()
  const list = featurePlants(c)
  const siblings = activeFeatureCollections.filter((x) => x.slug !== c.slug)
  return (
    <CollectionView
      path={`/features/${c.slug}/`}
      crumbs={[{ href: "/", label: "ホーム" }, { href: "/features", label: "特徴から探す" }, { label: c.heading }]}
      eyebrow={`FEATURE ・ ${c.group}`}
      title={c.heading}
      lead={describe(c, list)}
      basis={c.basis}
      plants={list}
      listName={`feature_${c.slug}`}
      related={[
        ...siblings.filter((x) => x.group === c.group),
        ...siblings.filter((x) => x.group !== c.group).slice(0, 4),
      ].map((x) => ({ href: `/features/${x.slug}`, label: x.heading }))}
    />
  )
}

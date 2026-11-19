import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CollectionView } from "components/elements/CollectionView"
import { seasonPlants } from "lib/collections"
import { SEASONS } from "lib/plants"
import { siteUrl } from "lib/seo"

type Props = { params: Promise<{ season: string }> }

export function generateStaticParams() {
  return SEASONS.map((s) => ({ season: s.key }))
}

const describe = (s: (typeof SEASONS)[number], n: number, names: string[]) =>
  `${s.label}（${s.months}ごろ）に花を咲かせる植物${n}種を写真つきで紹介。${names.join("・")}など、樹木と草花に分けて一覧できます。`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { season } = await params
  const s = SEASONS.find((x) => x.key === season)
  if (!s) return {}
  const list = seasonPlants(s.key)
  const title = `${s.label}に咲く花・植物一覧（${list.length}種）`
  const description = describe(s, list.length, list.slice(0, 4).map((p) => p.japanese_name))
  const url = `${siteUrl}/seasons/${s.key}/`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary", title, description },
  }
}

export default async function SeasonPage({ params }: Props) {
  const { season } = await params
  const s = SEASONS.find((x) => x.key === season)
  if (!s) notFound()
  const list = seasonPlants(s.key)
  return (
    <CollectionView
      path={`/seasons/${s.key}/`}
      crumbs={[{ href: "/", label: "ホーム" }, { href: "/seasons", label: "季節の植物" }, { label: `${s.label}に咲く花` }]}
      eyebrow={`SEASON ・ ${s.months}`}
      title={`${s.label}に咲く花・植物`}
      lead={describe(s, list.length, list.slice(0, 4).map((p) => p.japanese_name))}
      basis={`開花時期に「${s.label}」が登録されている植物（季節単位のデータのため、月ごとの開花は地域・年により前後します）`}
      plants={list}
      listName={`season_${s.key}`}
      related={[
        ...SEASONS.filter((x) => x.key !== s.key).map((x) => ({ href: `/seasons/${x.key}`, label: `${x.label}に咲く花` })),
        { href: `/flowers?season=${encodeURIComponent(s.tag)}`, label: "開花カレンダー" },
        { href: `/quiz/photo`, label: "写真クイズに挑戦" },
      ]}
    />
  )
}

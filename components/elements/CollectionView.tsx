import { FC, ReactNode } from "react"
import Link from "next/link"
import { Breadcrumbs, Crumb, JsonLd, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { PlantGrid } from "components/elements/PlantCard"
import { isTree } from "lib/plants"
import { siteUrl } from "lib/seo"
import { color, radius } from "lib/theme"

type Props = {
  path: string
  crumbs: Crumb[]
  eyebrow: string
  title: string
  lead: ReactNode
  basis: string
  plants: Plant[]
  listName: string
  related?: { href: string; label: string }[]
  children?: ReactNode
}

export const collectionJsonLd = (path: string, title: string, description: string, plants: Plant[]) => {
  const url = `${siteUrl}${path}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        url,
        name: title,
        description,
        inLanguage: "ja",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${url}#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#itemlist`,
        name: title,
        numberOfItems: plants.length,
        itemListElement: plants.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${siteUrl}/plants/${p.id}/`,
          name: p.japanese_name,
        })),
      },
    ],
  }
}

/** 季節別・特徴別など、条件で抽出した植物一覧ページの共通レイアウト */
export const CollectionView: FC<Props> = ({
  path,
  crumbs,
  eyebrow,
  title,
  lead,
  basis,
  plants,
  listName,
  related = [],
  children,
}) => {
  const trees = plants.filter(isTree)
  const herbs = plants.filter((p) => !isTree(p))
  const split = trees.length >= 3 && herbs.length >= 3
  return (
    <div>
      <JsonLd data={collectionJsonLd(path, title, typeof lead === "string" ? lead : title, plants)} />
      <Breadcrumbs items={crumbs} currentUrl={`${siteUrl}${path}`} />
      <PageIntro eyebrow={eyebrow} title={title} lead={lead}>
        <p style={{ margin: "0.75rem 0 0", fontSize: "0.8rem", color: color.muted }}>
          収録 <strong style={{ color: color.ink }}>{plants.length}</strong> 種 ・ 抽出条件：{basis}
        </p>
      </PageIntro>
      {children}
      {split ? (
        <>
          <Section labelledBy="trees" style={{ marginTop: "1rem" }}>
            <SectionHeading id="trees" title={`樹木（${trees.length}種）`} />
            <PlantGrid plants={trees} showFeature listName={listName} priorityCount={4} />
          </Section>
          <Section labelledBy="herbs">
            <SectionHeading id="herbs" title={`草花（${herbs.length}種）`} />
            <PlantGrid plants={herbs} showFeature listName={listName} />
          </Section>
        </>
      ) : (
        <PlantGrid plants={plants} showFeature listName={listName} priorityCount={4} />
      )}
      {related.length > 0 && (
        <nav
          aria-label="関連する一覧"
          style={{ marginTop: "3rem", background: color.primaryTint, borderRadius: radius.lg, padding: "1.25rem" }}
        >
          <h2 style={{ fontSize: "1rem", margin: "0 0 0.75rem" }}>ほかの切り口で探す</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="chip">
                {r.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  )
}

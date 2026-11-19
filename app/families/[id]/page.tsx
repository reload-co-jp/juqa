import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import {
  Breadcrumbs,
  JsonLd,
  PageHeader,
  PageIntro,
  Section,
  SectionHeading,
} from "components/elements/layout"
import { PlantGrid } from "components/elements/PlantCard"
import { columns } from "lib/columns"
import { SEASONS } from "lib/plants"
import { color, radius } from "lib/theme"
import { familyAioSummaryText, publisher, siteUrl } from "lib/seo"

export function generateStaticParams() {
  return families.map((family) => ({ id: String(family.id) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const family = families.find((f) => f.id === Number(id))
  if (!family) return {}

  const familyPlants = plants.filter((p) => p.family_id === family.id)
  const pageUrl = `${siteUrl}/families/${family.id}/`
  const description = `${family.name}（${family.classification}）の特徴と所属する植物${familyPlants.length}種を紹介します。${family.description}`

  return {
    title: `${family.name}の特徴と植物一覧`,
    description,
    keywords: [
      family.name,
      family.classification,
      ...familyPlants.slice(0, 8).map((p) => p.japanese_name),
      "植物図鑑",
      "植物の科",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title: `${family.name}の特徴と植物一覧`,
      description,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${family.name}の特徴と植物一覧`,
      description,
    },
  }
}

type Props = {
  params: Promise<{ id: string }>
}

const FamilyDetailPage: FC<Props> = async ({ params }) => {
  const { id } = await params
  const family = families.find((f) => f.id === Number(id))

  if (!family) {
    return (
      <div>
        <PageHeader backHref="/families" backLabel="科から探す" />
        <p style={{ marginTop: "1rem" }}>科が見つかりませんでした。</p>
      </div>
    )
  }

  const familyPlants = plants.filter((p) => p.family_id === family.id)
  const pageUrl = `${siteUrl}/families/${family.id}/`
  const aioSummary = familyAioSummaryText(family, familyPlants)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${family.name}の特徴と植物一覧`,
        description: aioSummary,
        inLanguage: "ja",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#taxon` },
        about: { "@id": `${pageUrl}#taxon` },
        publisher,
      },
      {
        "@type": "Taxon",
        "@id": `${pageUrl}#taxon`,
        name: family.name,
        description: family.description,
        url: pageUrl,
        taxonRank: "https://www.wikidata.org/entity/Q35409",
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "分類",
            value: family.classification,
          },
          {
            "@type": "PropertyValue",
            name: "特徴",
            value: family.characteristics.join(" "),
          },
          {
            "@type": "PropertyValue",
            name: "収録植物数",
            value: String(familyPlants.length),
          },
        ],
        childTaxon: familyPlants.map((p) => ({
          "@type": "Taxon",
          name: p.japanese_name,
          scientificName: p.scientific_name,
          url: `${siteUrl}/plants/${p.id}/`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${family.name}はどんな植物の科ですか？`,
            acceptedAnswer: {
              "@type": "Answer",
              text: aioSummary,
            },
          },
        ],
      },
    ],
  }

  const forms = (["高木", "低木", "草本"] as PlantTag[])
    .map((t) => ({ t, n: familyPlants.filter((p) => p.tags.includes(t)).length }))
    .filter((x) => x.n > 0)
  const seasonsCount = SEASONS.map((x) => ({
    ...x,
    n: familyPlants.filter((p) => p.tags.includes(x.tag)).length,
  })).filter((x) => x.n > 0)
  const relatedColumns = columns.filter((c) => c.title.includes(family.name) || (c.tags as readonly string[]).includes(family.name))

  return (
    <div>
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { href: "/", label: "ホーム" },
          { href: "/families", label: "科から探す" },
          { label: family.name },
        ]}
        currentUrl={pageUrl}
      />
      <PageIntro eyebrow={`${family.classification} ・ FAMILY`} title={`${family.name}の特徴と植物一覧`} lead={family.description} />

      <div className="split split--wide" style={{ marginBottom: "1rem" }}>
        <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: "1.5rem" }}>
          <h2 className="serif" style={{ fontSize: "1.2rem", margin: "0 0 0.75rem" }}>主な特徴</h2>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.9 }}>
            {family.characteristics.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          <p style={{ margin: "1rem 0 0", fontSize: "0.88rem", color: color.muted, lineHeight: 1.9 }}>{aioSummary}</p>
        </div>
        <div style={{ background: color.primaryTint, borderRadius: radius.lg, padding: "1.25rem", fontSize: "0.88rem" }}>
          <h2 style={{ fontSize: "0.95rem", margin: "0 0 0.6rem" }}>収録データの内訳</h2>
          <p style={{ margin: 0 }}>
            収録植物 <strong style={{ fontSize: "1.2rem" }}>{familyPlants.length}</strong> 種
          </p>
          {forms.length > 0 && <p style={{ margin: "0.4rem 0 0" }}>形態：{forms.map((f) => `${f.t} ${f.n}種`).join("・")}</p>}
          {seasonsCount.length > 0 && <p style={{ margin: "0.4rem 0 0" }}>開花：{seasonsCount.map((f) => `${f.label} ${f.n}種`).join("・")}</p>}
          <p style={{ margin: "0.8rem 0 0", display: "grid", gap: "0.3rem" }}>
            <Link href={`/plants?family=${family.id}`}>図鑑で{family.name}を絞り込む →</Link>
            <Link href={`/gallery?family=${family.id}`}>{family.name}の写真ギャラリー →</Link>
            {relatedColumns.map((c) => (
              <Link key={c.href} href={c.href}>コラム：{c.title} →</Link>
            ))}
          </p>
        </div>
      </div>

      <Section labelledBy="family-plants">
        <SectionHeading id="family-plants" title={`${family.name}の植物（${familyPlants.length}種）`} />
        {familyPlants.length === 0 ? (
          <p style={{ color: color.muted }}>データがありません。</p>
        ) : (
          <PlantGrid plants={familyPlants} showFeature listName={`family_${family.id}`} />
        )}
      </Section>
      <p style={{ fontSize: "0.85rem" }}>
        <Link href="/families">← 科の一覧へ戻る</Link>
      </p>
    </div>
  )
}

export default FamilyDetailPage

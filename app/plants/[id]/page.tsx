import type { Metadata } from "next"
import { FC, ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { plants, families, mergedPlantIds } from "lib/data"
import {
  Breadcrumbs,
  JsonLd,
  PageHeader,
  Section,
  SectionHeading,
  Tag,
} from "components/elements/layout"
import { PlantGrid } from "components/elements/PlantCard"
import PlantPhotoGallery from "components/elements/PlantPhotoGallery"
import { TrackOnMount } from "components/Analytics"
import { InArticleAd } from "components/elements/InArticleAd"
import { columnImage, columnsForPlant } from "lib/column-meta"
import {
  activeFeatureCollections,
  comparisonTitle,
  comparisonsForPlant,
} from "lib/collections"
import {
  FLOWER_TAGS,
  FRUIT_TAGS,
  HABITAT_TAGS,
  LEAF_TAGS,
  bloomSeasons,
  growthForms,
  labelsIn,
  leafHabit,
  plantById,
  plantImages,
  sameGenusPlants,
  sameSeasonColorPlants,
  similarPlants,
} from "lib/plants"
import { plantAioSummaryText, plantSummary, publisher, siteUrl } from "lib/seo"
import { color, flowerSwatch, radius, seasonColor } from "lib/theme"

type Props = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return [...plants.map((p) => p.id), ...Object.keys(mergedPlantIds)].map(
    (id) => ({ id: String(id) })
  )
}

const ogImageOf = (plant: Plant) =>
  plant.local_image_url ? `${siteUrl}${plant.local_image_url}` : plant.image_url

const metaDescription = (plant: Plant, family?: Family) => {
  const base = `${plant.japanese_name}（${plant.scientific_name}）は${family ? `${family.name}${plant.genus}の` : ""}植物。${plant.description[0]}`
  const point = plant.identification[0] ? `見分け方：${plant.identification[0]}。` : ""
  return `${base}${point}`.slice(0, 160)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const mergedTo = mergedPlantIds[Number(id)]
  if (mergedTo)
    return {
      robots: { index: false },
      alternates: { canonical: `${siteUrl}/plants/${mergedTo}/` },
    }
  const plant = plantById.get(Number(id))
  if (!plant) return {}

  const family = families.find((f) => f.id === plant.family_id)
  const description = metaDescription(plant, family)
  const pageUrl = `${siteUrl}/plants/${plant.id}/`
  const title = `${plant.japanese_name}（${plant.scientific_name}）の特徴と見分け方`
  const image = plant.image_url ? ogImageOf(plant) : undefined

  return {
    title,
    description,
    keywords: [
      plant.japanese_name,
      plant.scientific_name,
      plant.genus,
      ...(family ? [family.name] : []),
      ...plant.tags,
      "植物図鑑",
      "見分け方",
    ],
    alternates: { canonical: pageUrl },
    openGraph: {
      title,
      description,
      url: pageUrl,
      images: image ? [{ url: image, alt: `${plant.japanese_name}の写真` }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  }
}

const InfoRow: FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <tr>
    <th scope="row">{label}</th>
    <td>{children}</td>
  </tr>
)

const chipLink: React.CSSProperties = { minHeight: "2rem", fontSize: "0.8rem" }

const PlantDetailPage: FC<Props> = async ({ params }) => {
  const { id } = await params
  const mergedTo = mergedPlantIds[Number(id)]
  if (mergedTo) redirect(`/plants/${mergedTo}`)
  const plant = plantById.get(Number(id))

  if (!plant) {
    return (
      <div>
        <PageHeader backHref="/plants" backLabel="植物図鑑" />
        <p style={{ marginTop: "1rem" }}>植物が見つかりませんでした。</p>
      </div>
    )
  }

  const family = families.find((f) => f.id === plant.family_id)
  const pageUrl = `${siteUrl}/plants/${plant.id}/`
  const aioSummary = plantAioSummaryText(plant, family)

  const seasons = bloomSeasons(plant)
  const forms = growthForms(plant)
  const habit = leafHabit(plant)
  const leafLabels = labelsIn(plant, LEAF_TAGS)
  const flowerLabels = labelsIn(plant, FLOWER_TAGS)
  const fruitLabels = labelsIn(plant, FRUIT_TAGS)
  const habitatLabels = labelsIn(plant, HABITAT_TAGS)
  const flowerColors = plant.flower_colors ?? []

  // 関連植物（重複しないように順に除外していく）
  const shown = new Set<number>([plant.id])
  const take = (list: Plant[], n: number) => {
    const out = list.filter((p) => !shown.has(p.id)).slice(0, n)
    out.forEach((p) => shown.add(p.id))
    return out
  }
  const similar = take(similarPlants(plant), 8)
  const genus = take(sameGenusPlants(plant), 4)
  const familyAll = plants.filter((p) => p.family_id === plant.family_id && p.id !== plant.id)
  const sameFamily = take(familyAll, 4)
  const seasonColorMates = take(sameSeasonColorPlants(plant, shown), 4)

  const relatedColumns = columnsForPlant(plant.id)
  const relatedComparisons = comparisonsForPlant(plant.id)
  const relatedCollections = activeFeatureCollections.filter((c) => c.filter(plant))
  const images = plantImages(plant)

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${plant.japanese_name}（${plant.scientific_name}）`,
        description: aioSummary,
        inLanguage: "ja",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${pageUrl}#taxon` },
        about: { "@id": `${pageUrl}#taxon` },
        ...(plant.image_url
          ? { primaryImageOfPage: { "@type": "ImageObject", url: ogImageOf(plant) } }
          : {}),
        publisher,
      },
      {
        "@type": "Taxon",
        "@id": `${pageUrl}#taxon`,
        name: plant.japanese_name,
        scientificName: plant.scientific_name,
        description: plant.description.join(" "),
        url: pageUrl,
        ...(plant.image_url ? { image: ogImageOf(plant) } : {}),
        taxonRank: "https://www.wikidata.org/entity/Q7432",
        additionalProperty: [
          { "@type": "PropertyValue", name: "科", value: family?.name ?? "" },
          { "@type": "PropertyValue", name: "属", value: plant.genus },
          { "@type": "PropertyValue", name: "分布", value: plant.distribution },
          {
            "@type": "PropertyValue",
            name: "見分け方",
            value: plant.identification.join(" "),
          },
          {
            "@type": "PropertyValue",
            name: "タグ",
            value: plant.tags.join("、"),
          },
          ...(seasons.length
            ? [{ "@type": "PropertyValue", name: "開花時期", value: seasons.map((s) => s.label).join("・") }]
            : []),
          ...(flowerColors.length
            ? [{ "@type": "PropertyValue", name: "花の色", value: flowerColors.join("・") }]
            : []),
        ],
        ...(family
          ? {
              parentTaxon: {
                "@type": "Taxon",
                name: family.name,
                taxonRank: "https://www.wikidata.org/entity/Q35409",
                url: `${siteUrl}/families/${family.id}/`,
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${plant.japanese_name}は何科の植物ですか？`,
            acceptedAnswer: {
              "@type": "Answer",
              text: family
                ? `${plant.japanese_name}は${family.name}${plant.genus}の植物です。`
                : `${plant.japanese_name}の科は未設定です。`,
            },
          },
          {
            "@type": "Question",
            name: `${plant.japanese_name}の見分け方は？`,
            acceptedAnswer: {
              "@type": "Answer",
              text: plant.identification.join(" "),
            },
          },
        ],
      },
    ],
  }

  return (
    <article>
      <JsonLd data={jsonLd} />
      <script
        type="application/json"
        id="plant-summary-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(plantSummary(plant, family)),
        }}
      />
      <TrackOnMount
        name="view_item"
        params={{ item_id: plant.id, item_name: plant.japanese_name, item_category: family?.name ?? "" }}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "ホーム" },
          { href: "/plants", label: "植物図鑑" },
          ...(family ? [{ href: `/families/${family.id}`, label: family.name }] : []),
          { label: plant.japanese_name },
        ]}
        currentUrl={pageUrl}
      />

      {/* ---------- First view ---------- */}
      <div className="split">
        <PlantPhotoGallery images={images} plantName={plant.japanese_name} />

        <div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: color.muted }}>
            {family ? (
              <Link href={`/families/${family.id}`}>{family.name}</Link>
            ) : (
              "科：不明"
            )}
            {" ・ "}
            {plant.genus}
            {family && ` ・ ${family.classification}`}
          </p>
          <h1
            className="serif"
            style={{
              margin: "0.25rem 0 0",
              fontSize: "clamp(2rem, 6vw, 3rem)",
              lineHeight: 1.25,
              color: color.ink,
            }}
          >
            {plant.japanese_name}
          </h1>
          <p
            lang="la"
            style={{ margin: "0.35rem 0 0", fontStyle: "italic", color: color.inkSoft, fontSize: "1.05rem" }}
          >
            {plant.scientific_name}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", margin: "1rem 0 0" }}>
            {seasons.map((s) => (
              <Link
                key={s.key}
                href={`/seasons/${s.key}`}
                className="chip"
                style={{ ...chipLink, background: seasonColor[s.label].bg, color: seasonColor[s.label].fg, borderColor: "transparent" }}
              >
                {s.label}に開花
              </Link>
            ))}
            {forms.map((f) => (
              <Tag key={f} variant="muted" style={{ alignSelf: "center" }}>
                {f}
              </Tag>
            ))}
            {habit.map((h) => (
              <Tag key={h} variant="muted" style={{ alignSelf: "center" }}>
                {h}
              </Tag>
            ))}
          </div>

          <p
            style={{
              margin: "1.25rem 0 0",
              padding: "1rem 1.1rem",
              background: color.primaryTint,
              borderRadius: radius.md,
              fontSize: "0.95rem",
              lineHeight: 1.9,
              color: color.inkSoft,
            }}
          >
            {plant.description[0]}
          </p>

          <h2 className="serif" style={{ fontSize: "1.1rem", margin: "1.75rem 0 0.25rem" }}>
            基本情報
          </h2>
          <table className="info-table">
            <tbody>
              <InfoRow label="和名">{plant.japanese_name}</InfoRow>
              <InfoRow label="学名">
                <i lang="la">{plant.scientific_name}</i>
              </InfoRow>
              {family && (
                <InfoRow label="分類">
                  {family.classification} ・{" "}
                  <Link href={`/families/${family.id}`}>{family.name}</Link> ・ {plant.genus}
                </InfoRow>
              )}
              {forms.length > 0 && <InfoRow label="形態">{[...forms, ...habit].join("・")}</InfoRow>}
              {plant.distribution && <InfoRow label="分布">{plant.distribution}</InfoRow>}
              {habitatLabels.length > 0 && <InfoRow label="見られる場所">{habitatLabels.join("・")}</InfoRow>}
              {seasons.length > 0 && (
                <InfoRow label="開花時期">
                  {seasons.map((s) => `${s.label}（${s.months}）`).join("・")}
                </InfoRow>
              )}
              {flowerColors.length > 0 && (
                <InfoRow label="花の色">
                  <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.6rem" }}>
                    {flowerColors.map((c) => (
                      <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                        <span
                          aria-hidden="true"
                          style={{ width: "0.85rem", height: "0.85rem", borderRadius: "50%", background: flowerSwatch[c], border: "1px solid rgba(0,0,0,0.2)" }}
                        />
                        {c}
                      </span>
                    ))}
                  </span>
                </InfoRow>
              )}
              {flowerLabels.length > 0 && <InfoRow label="花の特徴">{flowerLabels.join("・")}</InfoRow>}
              {leafLabels.length > 0 && <InfoRow label="葉の特徴">{leafLabels.join("・")}</InfoRow>}
              {fruitLabels.length > 0 && <InfoRow label="実・種子">{fruitLabels.join("・")}</InfoRow>}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- Description ---------- */}
      <div className="split split--wide" style={{ marginTop: "3rem" }}>
        <div>
          <Section style={{ margin: "0 0 2.5rem" }} labelledBy="about-title">
            <SectionHeading id="about-title" title={`${plant.japanese_name}とは`} />
            <div className="prose" style={{ fontSize: "1rem", lineHeight: 2, color: color.inkSoft }}>
              {plant.description.map((d, i) => (
                <p key={i}>{d}</p>
              ))}
            </div>
          </Section>

          <InArticleAd />

          <Section
            style={{
              margin: "0 0 2.5rem",
              background: color.surface,
              border: `1px solid ${color.border}`,
              borderRadius: radius.lg,
              padding: "1.5rem",
            }}
            labelledBy="id-title"
          >
            <SectionHeading id="id-title" eyebrow="IDENTIFICATION" title="見分けるポイント" />
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.75rem" }}>
              {plant.identification.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "50%",
                      background: color.primary,
                      color: "#fff",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "0.15rem",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ lineHeight: 1.8 }}>{item}</span>
                </li>
              ))}
            </ol>
            {relatedComparisons.length > 0 && (
              <div style={{ marginTop: "1.25rem", paddingTop: "1rem", borderTop: `1px solid ${color.border}` }}>
                <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", color: color.muted }}>似た植物との違いを比べる</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {relatedComparisons.map((c) => (
                    <Link key={c.slug} href={`/compare/${c.slug}`} className="chip" data-track="select_content" data-track-content-type="comparison" data-track-item-id={c.slug}>
                      {comparisonTitle(c)} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </Section>
        </div>

        {/* ---------- Side: related content ---------- */}
        <aside aria-label="関連コンテンツ" style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
          {relatedColumns.length > 0 && (
            <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: "1.1rem" }}>
              <h2 style={{ fontSize: "0.95rem", margin: "0 0 0.75rem" }}>この植物が登場するコラム</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
                {relatedColumns.slice(0, 5).map((c) => {
                  const img = columnImage(c.href)
                  return (
                    <li key={c.href}>
                      <Link href={c.href} style={{ display: "flex", gap: "0.65rem", textDecoration: "none", color: color.ink, alignItems: "center" }}>
                        {img && (
                          <img src={img.src} alt="" width={64} height={48} loading="lazy" style={{ width: "4rem", height: "3rem", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />
                        )}
                        <span style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>{c.title}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          <div style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: "1.1rem" }}>
            <h2 style={{ fontSize: "0.95rem", margin: "0 0 0.75rem" }}>さらに調べる</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem", fontSize: "0.88rem" }}>
              {family && (
                <li>
                  <Link href={`/families/${family.id}`}>{family.name}の特徴と植物一覧</Link>
                </li>
              )}
              {seasons.map((s) => (
                <li key={s.key}>
                  <Link href={`/seasons/${s.key}`}>{s.label}に咲く植物</Link>
                </li>
              ))}
              {relatedCollections.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link href={`/features/${c.slug}`}>{c.heading}</Link>
                </li>
              ))}
              <li>
                <Link href="/guide">見分け方ガイドで科を絞り込む</Link>
              </li>
              <li>
                <Link href={`/gallery?family=${plant.family_id}`}>
                  {family ? `${family.name}の写真ギャラリー` : "フォトギャラリー"}
                </Link>
              </li>
              <li>
                <Link href={`/compare?a=${plant.id}`}>ほかの植物と比較する</Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* ---------- Related plants ---------- */}
      {similar.length > 0 && (
        <Section labelledBy="similar-title">
          <SectionHeading id="similar-title" eyebrow="RELATED" title="似ている植物" lead="見た目が似ていて、間違えやすい植物です。" />
          <PlantGrid plants={similar} showFeature listName="related_similar" small />
        </Section>
      )}
      {genus.length > 0 && (
        <Section labelledBy="genus-title">
          <SectionHeading id="genus-title" title={`同じ${plant.genus}の植物`} />
          <PlantGrid plants={genus} listName="related_genus" small />
        </Section>
      )}
      {family && sameFamily.length > 0 && (
        <Section labelledBy="family-title">
          <SectionHeading
            id="family-title"
            title={`同じ${family.name}の植物`}
            href={`/families/${family.id}`}
            more={`${family.name}の全${familyAll.length + 1}種`}
          />
          <PlantGrid plants={sameFamily} listName="related_family" small />
        </Section>
      )}
      {seasonColorMates.length > 0 && (
        <Section labelledBy="season-mates-title">
          <SectionHeading
            id="season-mates-title"
            title="同じ季節に、似た色の花を咲かせる植物"
            lead={`${seasons.map((s) => s.label).join("・")}に開花し、花の色（${flowerColors.join("・")}）が共通する植物です。`}
          />
          <PlantGrid plants={seasonColorMates} listName="related_season_color" small />
        </Section>
      )}

      <p style={{ margin: "2rem 0 0", fontSize: "0.85rem" }}>
        <Link href="/plants">← 植物図鑑の一覧へ戻る</Link>
      </p>
    </article>
  )
}

export default PlantDetailPage

import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { Suspense } from "react"
import { plants, families, mergedPlantIds } from "lib/data"
import { columns } from "lib/columns"
import { columnImage } from "lib/column-meta"
import {
  activeFeatureCollections,
  comparisons,
  comparisonTitle,
  featurePlants,
} from "lib/collections"
import { SEASONS, plantById, plantThumb, seasonOfMonth } from "lib/plants"
import { siteDescription, siteName, siteUrl } from "lib/seo"
import { color, radius } from "lib/theme"
import { HeaderSearch } from "components/elements/HeaderSearch"
import { LinkCard, Section, SectionHeading } from "components/elements/layout"
import { PlantGrid } from "components/elements/PlantCard"
import { SeasonalPicks } from "components/SeasonalPicks"

export const metadata: Metadata = {
  title: { absolute: `${siteName} — 植物を知る、散歩が変わる。植物図鑑` },
  description: `いつもの景色に、植物の名前を。街路樹や公園、山で出会う植物${plants.length}種を写真・科・季節・特徴から探して、見分けて、学べる植物図鑑です。`,
  alternates: { canonical: `${siteUrl}/` },
  openGraph: {
    title: `${siteName} — 植物を知る、散歩が変わる。`,
    description: siteDescription,
    url: `${siteUrl}/`,
    type: "website",
    images: [{ url: `${siteUrl}/images/plants/4-0.webp`, alt: "ケヤキの大木" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — 植物を知る、散歩が変わる。`,
    description: siteDescription,
    images: [`${siteUrl}/images/plants/4-0.webp`],
  },
}

const buildSeason = seasonOfMonth(new Date().getMonth() + 1)

const seasonPicks = Object.fromEntries(
  SEASONS.map((s) => [
    s.key,
    plants
      .filter((p) => p.tags.includes(s.tag) && (p.flower_colors?.length ?? 0) > 0)
      .map((p) => ({
        p,
        n: p.tags.filter((t) => t.endsWith("開花")).length,
      }))
      .sort((a, b) => a.n - b.n || a.p.id - b.p.id)
      .slice(0, 8)
      .map((x) => x.p),
  ])
)
const seasonCounts = Object.fromEntries(
  SEASONS.map((s) => [s.key, plants.filter((p) => p.tags.includes(s.tag)).length])
)

/** トップで紹介する比較ページ（身近で検索されやすい組み合わせ） */
const homeComparisons = [
  "yabutsubaki-sazanka",
  "ume-someiyoshino",
  "irohamomiji-toukaede",
  "akamatsu-kuromatsu",
]
  .map((slug) => comparisons.find((c) => c.slug === slug))
  .filter((c): c is (typeof comparisons)[number] => Boolean(c))

/** 比較ページで取り上げている、身近で代表的な植物 */
const featuredPlants = [
  ...new Set(homeComparisons.flatMap((c) => [c.a, c.b])),
]
  .slice(0, 8)
  .map((id) => plantById.get(id))
  .filter((p): p is Plant => Boolean(p))

const mergedIds = new Set(Object.keys(mergedPlantIds).map(Number))
const recentPlants = [...plants]
  .filter((p) => !mergedIds.has(p.id))
  .sort((a, b) => b.id - a.id)
  .slice(0, 8)

const heroPhotos = [
  { id: 4, src: "/images/plants/4-0.webp", alt: "ケヤキの大木" },
  { id: 17, src: "/images/plants/thumbs/17-0.webp", alt: "ヤマザクラの花" },
  { id: 29, src: "/images/plants/thumbs/29-0.webp", alt: "ヤブツバキの花" },
]

const findWays = [
  {
    href: "/plants",
    icon: "🔤",
    title: "名前から探す",
    description: "和名・学名・属名・科名で検索。ひらがな入力にも対応。",
  },
  {
    href: "/features",
    icon: "🍂",
    title: "特徴から探す",
    description: "花の色、どんぐり、紅葉、常緑樹など特徴別に一覧できます。",
  },
  {
    href: "/families",
    icon: "🌳",
    title: "科から探す",
    description: `${families.length}科を系統順に整理。仲間の共通点がわかります。`,
  },
  {
    href: "/seasons",
    icon: "🌸",
    title: "季節から探す",
    description: "春・夏・秋・冬、それぞれの季節に花を咲かせる植物。",
  },
  {
    href: "/gallery",
    icon: "📷",
    title: "写真から探す",
    description: "花・葉・実などの写真を眺めて、気になる植物を見つける。",
  },
  {
    href: "/guide",
    icon: "🧭",
    title: "質問に答えて見分ける",
    description: "葉や実の特徴に「はい・いいえ」で答えて科を絞り込む。",
  },
]

const learnLinks = [
  {
    href: "/guide",
    title: "見分け方ガイド",
    description: "目の前の植物を、葉・実・花の特徴から段階的に絞り込みます。",
    image: "/images/plants/thumbs/2-2.webp",
    imageAlt: "イロハモミジの葉",
  },
  {
    href: "/quiz/photo",
    title: "写真クイズ",
    description: "写真を見て名前を当てる4択クイズ。季節・科・テーマ別に出題します。",
    image: "/images/plants/thumbs/133-0.webp",
    imageAlt: "ハナミズキの花",
  },
  {
    href: "/flowers",
    title: "開花カレンダー",
    description: "季節ごとに花を咲かせる植物を、写真つきで見られます。",
    image: "/images/plants/thumbs/31-0.webp",
    imageAlt: "ガクアジサイの花",
  },
  {
    href: "/gallery",
    title: "フォトギャラリー",
    description: "収録植物の写真を一覧。花・葉・実の写真から図鑑へ移動できます。",
    image: "/images/plants/thumbs/6-0.webp",
    imageAlt: "コナラの葉とどんぐり",
  },
]

const Stat: FC<{ value: string | number; label: string }> = ({ value, label }) => (
  <div>
    <div
      className="serif"
      style={{ fontSize: "1.6rem", fontWeight: 700, color: color.primaryStrong, lineHeight: 1.2 }}
    >
      {value}
    </div>
    <div style={{ fontSize: "0.75rem", color: color.muted }}>{label}</div>
  </div>
)

const Page: FC = () => {
  const latestColumns = columns.slice(0, 3)
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        aria-labelledby="hero-title"
        className="split"
        style={{ alignItems: "center", padding: "2.5rem 0 1rem" }}
      >
        <div>
          <p
            style={{
              margin: "0 0 0.75rem",
              color: color.primary,
              fontWeight: 700,
              letterSpacing: "0.14em",
              fontSize: "0.8rem",
            }}
          >
            JuQa! 植物図鑑 ─ 植物を知る、散歩が変わる。
          </p>
          <h1
            id="hero-title"
            className="serif"
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 6vw, 3.4rem)",
              lineHeight: 1.3,
              color: color.ink,
              letterSpacing: "0.02em",
            }}
          >
            いつもの景色に、
            <br />
            植物の名前を。
          </h1>
          <p
            style={{
              margin: "1rem 0 1.5rem",
              color: color.inkSoft,
              fontSize: "1rem",
              lineHeight: 1.9,
            }}
          >
            街路樹や公園、山で出会う植物を
            <br className="sp-hide" />
            探して、見分けて、学ぶ。
          </p>
          <div
            style={{
              background: color.surface,
              border: `1px solid ${color.border}`,
              borderRadius: "999px",
              padding: "0.35rem",
              maxWidth: "32rem",
            }}
          >
            <Suspense fallback={null}>
              <HeaderSearch variant="hero" placeholder="例：さくら、モミジ、Quercus" />
            </Suspense>
          </div>
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.82rem", color: color.muted }}>
            たとえば：
            {[1, 2, 5, 29].map((id, i) => {
              const p = plantById.get(id)
              if (!p) return null
              return (
                <span key={id}>
                  {i > 0 && "、"}
                  <Link href={`/plants/${p.id}`}>{p.japanese_name}</Link>
                </span>
              )
            })}
          </p>
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.75rem" }}>
            <Stat value={plants.length} label="収録植物" />
            <Stat value={families.length} label="科" />
            <Stat value={columns.length} label="コラム" />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "0.6rem",
            aspectRatio: "4 / 3.3",
          }}
        >
          {heroPhotos.map((photo, i) => (
            <Link
              key={photo.id}
              href={`/plants/${photo.id}`}
              style={{
                gridRow: i === 0 ? "1 / 3" : undefined,
                borderRadius: i === 0 ? "20px 6px 6px 20px" : i === 1 ? "6px 20px 6px 6px" : "6px 6px 20px 6px",
                overflow: "hidden",
                position: "relative",
                background: color.surfaceAlt,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={i === 0 ? 800 : 480}
                height={i === 0 ? 1066 : 480}
                fetchPriority={i === 0 ? "high" : undefined}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "0.6rem",
                  bottom: "0.6rem",
                  background: "rgba(255,255,255,0.9)",
                  color: color.ink,
                  fontSize: "0.72rem",
                  padding: "0.1rem 0.55rem",
                  borderRadius: "999px",
                }}
              >
                {plantById.get(photo.id)?.japanese_name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Season ---------- */}
      <Section labelledBy="season-title">
        <SectionHeading
          id="season-title"
          eyebrow="SEASON"
          title="今の季節に見られる植物"
          lead="開花時期のデータ（季節単位）から、いまの季節に花を咲かせる植物を選んでいます。"
        />
        <SeasonalPicks picks={seasonPicks} counts={seasonCounts} fallbackKey={buildSeason.key} />
      </Section>

      {/* ---------- Find ---------- */}
      <Section labelledBy="find-title">
        <SectionHeading id="find-title" eyebrow="FIND" title="植物を探す" href="/explore" more="探し方の一覧" />
        <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {findWays.map((w) => (
            <li key={w.href}>
              <LinkCard {...w} track="home_find" />
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {activeFeatureCollections.slice(0, 10).map((c) => (
            <Link key={c.slug} href={`/features/${c.slug}`} className="chip">
              {c.heading}
              <span style={{ fontSize: "0.72rem", color: color.muted }}>{featurePlants(c).length}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------- Encyclopedia ---------- */}
      <Section labelledBy="featured-title">
        <SectionHeading
          id="featured-title"
          eyebrow="PICK UP"
          title="まず覚えたい身近な植物"
          lead="街や公園でよく出会い、似た仲間との見分けを比較ページで解説している植物です。"
          href="/plants"
          more={`図鑑の全${plants.length}種`}
        />
        <PlantGrid plants={featuredPlants} listName="home_featured" />
      </Section>

      <Section labelledBy="recent-title">
        <SectionHeading
          id="recent-title"
          eyebrow="NEW"
          title="新しく収録した植物"
          href="/plants?sort=new"
          more="新着順で見る"
        />
        <PlantGrid plants={recentPlants} listName="home_recent" small />
      </Section>

      {/* ---------- Compare ---------- */}
      <Section labelledBy="compare-title">
        <SectionHeading
          id="compare-title"
          eyebrow="COMPARE"
          title="似ている植物を比べる"
          href="/compare"
          more="比較ページ一覧"
        />
        <ul className="grid-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {homeComparisons.map((c) => {
            const a = plantById.get(c.a)!
            const b = plantById.get(c.b)!
            return (
              <li key={c.slug}>
                <Link href={`/compare/${c.slug}`} className="card-link">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>
                    {[a, b].map((p) => (
                      <div key={p.id} className="card-photo card-photo--square">
                        <img src={plantThumb(p)} alt={`${p.japanese_name}の写真`} loading="lazy" width={240} height={240} />
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "0.8rem 0.9rem 1rem" }}>
                    <p style={{ margin: 0, fontWeight: 700, color: color.ink, fontSize: "0.95rem", lineHeight: 1.5 }}>
                      {comparisonTitle(c)}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>

      {/* ---------- Learn ---------- */}
      <Section
        labelledBy="learn-title"
        style={{
          background: color.primaryTint,
          borderRadius: radius.lg,
          padding: "2rem clamp(1rem, 3vw, 2rem)",
        }}
      >
        <SectionHeading id="learn-title" eyebrow="LEARN" title="植物をもっと知る" />
        <h3 style={{ fontSize: "1rem", margin: "0 0 0.75rem", color: color.inkSoft }}>植物コラム</h3>
        <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: "0 0 0.75rem" }}>
          {latestColumns.map((c) => {
            const img = columnImage(c.href)
            return (
              <li key={c.href}>
                <LinkCard
                  href={c.href}
                  title={c.title}
                  description={c.description}
                  image={img?.src}
                  imageAlt={img?.alt}
                  meta={c.tags.join("・")}
                />
              </li>
            )
          })}
        </ul>
        <p style={{ textAlign: "right", margin: "0 0 2rem" }}>
          <Link href="/columns" className="text-link">
            コラムをすべて読む（{columns.length}本） →
          </Link>
        </p>
        <h3 style={{ fontSize: "1rem", margin: "0 0 0.75rem", color: color.inkSoft }}>見分ける・遊ぶ・眺める</h3>
        <ul className="grid-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {learnLinks.map((l) => (
            <li key={l.href}>
              <LinkCard {...l} track="home_learn" />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

export default Page

import type { Metadata } from "next"
import { Breadcrumbs, LinkCard, PageIntro, Section, SectionHeading } from "components/elements/layout"
import { columns } from "lib/columns"
import { columnImage } from "lib/column-meta"
import { siteUrl } from "lib/seo"

const pageUrl = `${siteUrl}/quiz/`
const description =
  "写真クイズ・見分け方ガイド・Q&A形式の豆知識コラムなど、遊びながら植物を覚えられるコンテンツをまとめました。"

export const metadata: Metadata = {
  title: "学ぶ・クイズ",
  description,
  alternates: { canonical: pageUrl },
  openGraph: { title: "学ぶ・クイズ", description, url: pageUrl, type: "website" },
  twitter: { card: "summary", title: "学ぶ・クイズ", description },
}

const notes = ["/columns/tree-identification-notes", "/columns/wildflower-field-notes", "/columns/plant-trivia-notes"]

export default function QuizHubPage() {
  const noteColumns = columns.filter((c) => notes.includes(c.href))
  const basics = columns.filter((c) => (c.tags as readonly string[]).includes("基礎知識") || (c.tags as readonly string[]).includes("見分け方")).slice(0, 6)
  return (
    <div>
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "学ぶ・クイズ" }]} currentUrl={pageUrl} />
      <PageIntro eyebrow="LEARN" title="学ぶ・クイズ" lead={description} />
      <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <LinkCard href="/quiz/photo" title="写真クイズ" description="写真を見て植物の名前を当てる4択クイズ。季節・科・生育場所などのテーマから選べます。" image="/images/plants/thumbs/133-0.webp" imageAlt="ハナミズキの花" meta="5問 ・ テーマ別" track="quiz_hub" />
        </li>
        <li>
          <LinkCard href="/guide" title="見分け方ガイド" description="葉・実・花の特徴に「はい・いいえ」で答えると、植物の科を絞り込めます。" image="/images/plants/thumbs/2-2.webp" imageAlt="イロハモミジの葉" meta="質問に答えて絞り込み" track="quiz_hub" />
        </li>
        <li>
          <LinkCard href="/compare" title="似ている植物の比較" description="ツバキとサザンカなど、間違えやすい植物の違いを表で確認できます。" image="/images/plants/thumbs/30-0.webp" imageAlt="サザンカの花" meta="比較表" track="quiz_hub" />
        </li>
      </ul>
      {noteColumns.length > 0 && (
        <Section labelledBy="notes">
          <SectionHeading id="notes" title="Q&Aで覚える豆知識" lead="これまでのクイズの問題と答えを、読み返しやすいメモにまとめたコラムです。" />
          <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {noteColumns.map((c) => (
              <li key={c.href}>
                <LinkCard href={c.href} title={c.title} description={c.description} icon={c.emoji} />
              </li>
            ))}
          </ul>
        </Section>
      )}
      <Section labelledBy="basics">
        <SectionHeading id="basics" title="基礎から学ぶコラム" href="/columns" more="コラム一覧" />
        <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {basics.map((c) => {
            const img = columnImage(c.href)
            return (
              <li key={c.href}>
                <LinkCard href={c.href} title={c.title} description={c.description} image={img?.src} imageAlt={img?.alt} />
              </li>
            )
          })}
        </ul>
      </Section>
    </div>
  )
}

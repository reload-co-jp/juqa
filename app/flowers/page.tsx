import type { Metadata } from "next"
import FlowersClient from "./FlowersClient"
import { Breadcrumbs, PageIntro } from "components/elements/layout"

export const metadata: Metadata = {
  title: "開花カレンダー",
  description:
    "春・夏・秋・冬の季節ごとに開花する植物を一覧で確認できます。季節の花や樹木の開花時期を調べよう。",
  keywords: ["開花カレンダー", "開花時期", "季節の花", "春の花", "夏の花", "秋の花", "冬の花", "樹木"],
  alternates: {
    canonical: "https://juqa.reload.co.jp/flowers/",
  },
  openGraph: {
    title: "開花カレンダー | ジュカ！ (JuQa)",
    description:
      "春・夏・秋・冬の季節ごとに開花する植物を一覧で確認できます。季節の花や樹木の開花時期を調べよう。",
    url: "https://juqa.reload.co.jp/flowers/",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "開花カレンダー",
    description: "春・夏・秋・冬の季節ごとに開花する植物を一覧で確認できます。季節の花や樹木の開花時期を調べよう。",
  },
}

export default function FlowersPage() {
  return (
    <div>
      <Breadcrumbs
        items={[{ href: "/", label: "ホーム" }, { href: "/seasons", label: "季節の植物" }, { label: "開花カレンダー" }]}
        currentUrl="https://juqa.reload.co.jp/flowers/"
      />
      <PageIntro
        eyebrow="CALENDAR"
        title="開花カレンダー"
        lead="季節を切り替えて、その時期に花を咲かせる植物を写真で確認できます。最初は今月の季節を表示します。開花時期のデータは季節単位で、実際の開花は地域や年によって前後します。"
      />
      <FlowersClient />
    </div>
  )
}

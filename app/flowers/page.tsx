import type { Metadata } from "next"
import FlowersClient from "./FlowersClient"

export const metadata: Metadata = {
  title: "開花カレンダー",
  description:
    "春・夏・秋・冬の季節ごとに開花する植物を一覧で確認できます。季節の花や樹木の開花時期を調べよう。",
  openGraph: {
    title: "開花カレンダー | ジュカ！ (JuQa)",
    description:
      "春・夏・秋・冬の季節ごとに開花する植物を一覧で確認できます。季節の花や樹木の開花時期を調べよう。",
    url: "https://juqa.reload.co.jp/flowers/",
    type: "website",
  },
}

export default function FlowersPage() {
  return <FlowersClient />
}

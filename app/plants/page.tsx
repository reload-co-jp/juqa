import type { Metadata } from "next"
import { plants } from "lib/data"
import PlantsClient from "./PlantsClient"

export const metadata: Metadata = {
  title: "植物一覧",
  description: `街路樹・山の植物を${plants.length}種収録。科・タグ・キーワードで絞り込んで植物を探せます。`,
  openGraph: {
    title: "植物一覧 | ジュカ！ (JuQa)",
    description: `街路樹・山の植物を${plants.length}種収録。科・タグ・キーワードで絞り込んで植物を探せます。`,
    url: "https://juqa.reload.co.jp/plants/",
    type: "website",
  },
}

export default function PlantsPage() {
  return <PlantsClient />
}

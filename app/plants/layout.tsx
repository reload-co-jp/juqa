import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "植物一覧",
  description: "街路樹・公園・山で見かける100種の植物を一覧表示します。科・タグ・キーワードで絞り込み検索できます。",
  openGraph: {
    title: "植物一覧",
    description: "街路樹・公園・山で見かける100種の植物を一覧表示します。科・タグ・キーワードで絞り込み検索できます。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "植物一覧",
    description: "街路樹・公園・山で見かける100種の植物を一覧表示します。科・タグ・キーワードで絞り込み検索できます。",
  },
}

export default function PlantsLayout({ children }: { children: React.ReactNode }) {
  return children
}

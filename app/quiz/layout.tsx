import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "クイズ",
  description: "植物の特徴から名前を当てるクイズです。街路樹・公園・山の植物を楽しく覚えましょう。",
  keywords: ["植物クイズ", "植物当てクイズ", "樹木クイズ", "植物学習", "植物の特徴"],
  openGraph: {
    title: "クイズ",
    description: "植物の特徴から名前を当てるクイズです。街路樹・公園・山の植物を楽しく覚えましょう。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "クイズ",
    description: "植物の特徴から名前を当てるクイズです。街路樹・公園・山の植物を楽しく覚えましょう。",
  },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}

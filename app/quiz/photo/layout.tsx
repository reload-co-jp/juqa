import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "写真クイズ",
  description: "植物の写真から名前を当てるクイズです。見た目の特徴を手がかりに植物を識別する力を鍛えましょう。",
  openGraph: {
    title: "写真クイズ",
    description: "植物の写真から名前を当てるクイズです。見た目の特徴を手がかりに植物を識別する力を鍛えましょう。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "写真クイズ",
    description: "植物の写真から名前を当てるクイズです。見た目の特徴を手がかりに植物を識別する力を鍛えましょう。",
  },
}

export default function PhotoQuizLayout({ children }: { children: React.ReactNode }) {
  return children
}

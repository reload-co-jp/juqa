import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "見分け方ガイド",
  description: "花の色・葉の形など特徴を選択していくことで、目の前の植物を絞り込める見分け方ガイドです。",
  openGraph: {
    title: "見分け方ガイド",
    description: "花の色・葉の形など特徴を選択していくことで、目の前の植物を絞り込める見分け方ガイドです。",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "見分け方ガイド",
    description: "花の色・葉の形など特徴を選択していくことで、目の前の植物を絞り込める見分け方ガイドです。",
  },
}

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return children
}

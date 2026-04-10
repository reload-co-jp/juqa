import type { Metadata } from "next"
import GuideClient from "./GuideClient"

export const metadata: Metadata = {
  title: "見分け方ガイド",
  description:
    "質問に答えながら植物の科を絞り込める対話型ガイド。葉の形・花の色などの特徴から植物を同定できます。",
  openGraph: {
    title: "見分け方ガイド | ジュカ！ (JuQa)",
    description:
      "質問に答えながら植物の科を絞り込める対話型ガイド。葉の形・花の色などの特徴から植物を同定できます。",
    url: "https://juqa.reload.co.jp/guide/",
    type: "website",
  },
}

export default function GuidePage() {
  return <GuideClient />
}

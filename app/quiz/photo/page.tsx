import type { Metadata } from "next"
import PhotoQuizClient from "./PhotoQuizClient"

export const metadata: Metadata = {
  title: "写真クイズ",
  description:
    "植物の写真を見て名前を当てるクイズ。実際の植物画像から種類を識別する力を養えます。",
  openGraph: {
    title: "写真クイズ | ジュカ！ (JuQa)",
    description:
      "植物の写真を見て名前を当てるクイズ。実際の植物画像から種類を識別する力を養えます。",
    url: "https://juqa.reload.co.jp/quiz/photo/",
    type: "website",
  },
}

export default function PhotoQuizPage() {
  return <PhotoQuizClient />
}

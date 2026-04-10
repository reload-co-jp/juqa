import type { Metadata } from "next"
import QuizClient from "./QuizClient"

export const metadata: Metadata = {
  title: "植物クイズ",
  description:
    "植物の名前・特徴・見分け方を問うクイズに挑戦しよう。ランダムに出題される4問で植物の知識を試せます。",
  openGraph: {
    title: "植物クイズ | ジュカ！ (JuQa)",
    description:
      "植物の名前・特徴・見分け方を問うクイズに挑戦しよう。ランダムに出題される4問で植物の知識を試せます。",
    url: "https://juqa.reload.co.jp/quiz/",
    type: "website",
  },
}

export default function QuizPage() {
  return <QuizClient />
}

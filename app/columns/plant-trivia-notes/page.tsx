import type { Metadata } from "next"
import { QuizKnowledgeArticle } from "components/elements/QuizKnowledgeArticle"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/plant-trivia-notes/`

export const metadata: Metadata = {
  title: "植物の特徴と豆知識メモ",
  description:
    "科の特徴、花のふるまい、植物名の由来など、クイズに入っていた知識を読み物としてまとめた植物豆知識コラムです。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "植物の特徴と豆知識メモ | ジュカ！",
    description:
      "科の特徴、花のふるまい、植物名の由来など、クイズに入っていた知識を読み物としてまとめた植物豆知識コラムです。",
    url: pageUrl,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "植物の特徴と豆知識メモ | ジュカ！",
    description:
      "どんぐりのなる科、就眠運動、ヒマワリの向きなど、覚えておきたい植物の豆知識を短く整理しました。",
  },
}

export default function Page() {
  return (
    <QuizKnowledgeArticle
      emoji="📖"
      title="植物の特徴と豆知識メモ"
      subtitle="単なる正誤問題だった知識も、背景と一緒に読むと植物の見え方が少し変わってきます。"
      intro={[
        "植物の学びは、名前を覚えるだけではなかなか続きません。",
        "どんぐりがなる科、ヒマワリの向き、夜に葉を閉じる木、秋の七草の由来のように、特徴の理由や暮らしとのつながりまで知ると、記憶に残りやすくなります。",
        "ここでは、クイズに入っていた雑学寄りの内容を、科の特徴と季節のふるまいという軸でまとめました。",
      ]}
      sections={[
        {
          title: "科でまとめて覚える",
          description:
            "個別の植物だけでなく、どの科にどんな共通点があるかを知ると、初めて見る植物にも応用しやすくなります。",
          quizIds: [1, 3, 18, 20],
        },
        {
          title: "季節と花のふるまい",
          description:
            "花色の変化、就眠運動、天気で開閉する花など、観察していて面白い植物のふるまいを集めました。",
          quizIds: [12, 14, 23, 24],
        },
        {
          title: "名前や行事と結びつく知識",
          description:
            "秋の七草や苦味の由来のように、文化や言葉とつながる知識は覚える助けになります。",
          quizIds: [26, 30, 36],
        },
      ]}
      relatedLinks={[
        { href: "/columns/phylogenetic-tree", label: "植物を系統樹で覚えやすく" },
        { href: "/columns/rosaceae-plants", label: "バラ科の植物たち" },
      ]}
    />
  )
}

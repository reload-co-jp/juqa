import { createColumnMetadata } from "components/elements/ColumnComponents"
import { QuizKnowledgeArticle } from "components/elements/QuizKnowledgeArticle"

export const metadata = createColumnMetadata({
  path: "/columns/tree-identification-notes/",
  title: "木の見分けメモ",
  description:
    "桜・マツ・ナラ・モミジなど、街や山で見かける木を見分けるときの観察ポイントをQ&A形式でまとめた豆知識コラムです。",
  twitterDescription:
    "街や山で見かける木の見分けポイントを、短いQ&Aで読み返せるように整理しました。",
})

export default function Page() {
  return (
    <QuizKnowledgeArticle
      emoji="🌳"
      title="木の見分けメモ"
      subtitle="葉・樹皮・樹形のちがいに注目すると、街路樹も山の木もぐっと覚えやすくなります。"
      intro={[
        "木の名前が覚えにくいのは、花の時期だけでなく葉や樹皮も見ないと区別できないことが多いからです。",
        "一方で、毎回すべてを覚える必要はありません。モミジなら葉の裂け方、マツなら針葉の束の本数、ナラならどんぐりや葉裏の色など、まず見る場所を決めるだけでかなり見分けやすくなります。",
        "ここでは、これまでのクイズに入っていた木本中心の内容を、現地で思い出しやすいメモとしてまとめました。",
      ]}
      sections={[
        {
          title: "春に見分けたい木",
          description:
            "花の咲く順番や若葉の色、香りなど、春の短い時期に役立つポイントを集めました。",
          quizIds: [2, 5, 6, 11, 13, 15, 18, 31, 32],
        },
        {
          title: "針葉樹とどんぐりの木",
          description:
            "針葉のつき方、樹皮、実の形に注目すると、似た仲間どうしの区別がしやすくなります。",
          quizIds: [3, 4, 7, 8, 16, 19, 21, 34, 41, 42, 43, 47, 49],
        },
        {
          title: "葉の大きさと樹形で覚える",
          description:
            "大きな葉、段状の枝ぶり、掌状複葉など、遠目でも気づきやすい特徴を中心に整理しました。",
          quizIds: [44, 45, 46, 48],
        },
      ]}
      relatedLinks={[
        { href: "/columns/conifer", label: "針葉樹林の簡単な見分け方" },
        { href: "/columns/tree-vs-herb", label: "木と草のちがい" },
      ]}
    />
  )
}

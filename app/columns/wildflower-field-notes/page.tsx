import type { Metadata } from "next"
import { QuizKnowledgeArticle } from "components/elements/QuizKnowledgeArticle"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/wildflower-field-notes/`

export const metadata: Metadata = {
  title: "山野草と雑草の見分けメモ",
  description:
    "タンポポ、ツユクサ、カタクリ、ドクダミなど、身近な草花や山野草を見分けるときの豆知識をQ&A形式でまとめたコラムです。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "山野草と雑草の見分けメモ | ジュカ！",
    description:
      "タンポポ、ツユクサ、カタクリ、ドクダミなど、身近な草花や山野草を見分けるときの豆知識をQ&A形式でまとめたコラムです。",
    url: pageUrl,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "山野草と雑草の見分けメモ | ジュカ！",
    description:
      "道端の雑草から高山植物まで、覚えておきたい草花の見分けポイントを短く整理しました。",
  },
}

export default function Page() {
  return (
    <QuizKnowledgeArticle
      emoji="🌸"
      title="山野草と雑草の見分けメモ"
      subtitle="小さな草花ほど、咲く時期や育つ場所、蕾や実の形が見分けの手がかりになります。"
      intro={[
        "草花は木より小さいぶん、ぱっと見ではどれも似て見えます。",
        "でも、朝だけ咲く、湿地に群生する、白い総苞片を持つ、綿毛を飛ばすなど、それぞれに強い個性があります。",
        "ここでは道端の雑草から山の花まで、覚えておくと散歩や登山が少し楽しくなるポイントをまとめました。",
      ]}
      sections={[
        {
          title: "身近な春の草花",
          description:
            "早春の野原や道端で出会いやすい草花は、蕾の向きや葉の出方がよいヒントになります。",
          quizIds: [9, 10, 17, 25, 27, 29, 30, 40],
        },
        {
          title: "山や湿地で見つける花",
          description:
            "高山帯、湿地、林内の半日陰など、育つ場所と花の姿をセットで覚えると印象に残ります。",
          quizIds: [22, 23, 33, 35, 37, 39],
        },
        {
          title: "秋まで覚えておきたい草",
          description:
            "七草や薬草のように、季節行事や名前の由来と一緒に覚えると忘れにくくなります。",
          quizIds: [26, 28, 36, 38],
        },
      ]}
      relatedLinks={[
        { href: "/columns/spring-mountain-flowers", label: "春の登山で見られる花特集" },
      ]}
    />
  )
}

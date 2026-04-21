import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/2/20/Prunus_%C3%97_yedoensis_in_bloom%2C_Morris_Arboretum_01.jpg"
const title = "春の花の花言葉"
const description =
  "桜、梅、スミレ、タンポポ、カタクリ、藤、シロツメクサなど、春に出会う花の花言葉を、植物の特徴や季節感と一緒にやさしく紹介します。"

export const metadata = createColumnMetadata({
  path: "/columns/spring-flower-meanings/",
  title,
  description,
  keywords: ["春の花", "花言葉", "桜", "梅", "スミレ", "タンポポ", "カタクリ"],
  ogImage,
  ogImageAlt: "春に咲くソメイヨシノの花",
  twitterDescription:
    "春の花の花言葉を、桜・梅・スミレ・タンポポ・カタクリなど身近な植物から紹介します。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/spring-flower-meanings/",
  title,
  description,
  ogImage,
})

const body: React.CSSProperties = {
  color: "#ccc",
  fontSize: "0.875rem",
  lineHeight: 1.85,
  margin: "0 0 0.875rem",
}

const flowerMeanings = [
  {
    name: "桜",
    href: "/plants/1",
    meaning: "精神の美、優美な女性",
    note: "咲き始めから散り際までが短く、春そのものを感じさせる花です。",
  },
  {
    name: "梅",
    href: "/plants/16",
    meaning: "高潔、忍耐、忠実",
    note: "寒さの残る時期に咲くため、凛とした強さのイメージがあります。",
  },
  {
    name: "スミレ",
    href: "/plants/14",
    meaning: "小さな幸せ、誠実、謙虚",
    note: "足元にそっと咲く姿から、控えめでまっすぐな印象につながります。",
  },
  {
    name: "タンポポ",
    href: "/plants/11",
    meaning: "真心の愛、別離",
    note: "明るい黄色い花と、風に乗って飛ぶ綿毛の両方が意味に重なります。",
  },
  {
    name: "カタクリ",
    href: "/plants/42",
    meaning: "初恋、寂しさに耐える",
    note: "春の短い時期だけ姿を見せる、はかなさのある山野草です。",
  },
  {
    name: "フジ",
    href: "/plants/25",
    meaning: "優しさ、歓迎、決して離れない",
    note: "垂れ下がる花房と、つるで巻きつく性質が印象的です。",
  },
  {
    name: "シロツメクサ",
    href: "/plants/12",
    meaning: "約束、幸運、私を思って",
    note: "花冠や四つ葉探しの記憶と結びつきやすい身近な草花です。",
  },
] as const

export default function Page() {
  return (
    <ColumnArticle
      emoji="🌸"
      title={title}
      subtitle="花言葉を知ると、いつもの春の花が少しだけ物語を持ちます"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="春に咲くソメイヨシノの花"
    >
      <ColumnIntro>
        {[
          "春の散歩道では、桜、梅、スミレ、タンポポなど、名前を知っている花に何度も出会います。",
          "それだけでも十分楽しいのですが、花言葉を知ると、同じ花が少し違って見えてきます。咲く時期、花の姿、昔からのイメージが、短い言葉にぎゅっと詰まっているからです。",
          "このコラムでは、春に出会いやすい花を中心に、花言葉と植物としての特徴を合わせて紹介します。",
        ].map((text) => (
          <p
            key={text}
            style={{
              margin: 0,
              color: "#bbb",
              fontSize: "0.9rem",
              lineHeight: 1.9,
            }}
          >
            {text}
          </p>
        ))}
      </ColumnIntro>

      <Section title="花言葉は、花の姿と人の記憶から生まれる">
        <p style={body}>
          花言葉は、植物そのものの性質だけで決まるものではありません。花の色、咲く季節、香り、育つ場所、文学や行事での扱われ方が重なって広まってきた言葉です。
        </p>
        <p style={body}>
          そのため、同じ花でも国や時代によって意味が変わることがあります。正解をひとつだけ覚えるより、「なぜその意味になったのか」を考えると、植物の見方としても面白くなります。
        </p>
      </Section>

      <Section title="春の花と言葉の一覧">
        <p style={body}>
          まずは、身近な春の花を一覧で見てみましょう。植物名を押すと、このサイトの植物ページに移動できます。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {flowerMeanings.map((flower) => (
            <div
              key={flower.name}
              style={{
                background: "#242424",
                border: "1px solid #3a3a3a",
                borderRadius: "8px",
                padding: "0.9rem",
              }}
            >
              <div
                style={{
                  alignItems: "baseline",
                  display: "flex",
                  gap: "0.65rem",
                  marginBottom: "0.35rem",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href={flower.href}
                  style={{
                    color: "#7cbe8c",
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {flower.name} →
                </Link>
                <span style={{ color: "#e0e0e0", fontSize: "0.82rem" }}>
                  {flower.meaning}
                </span>
              </div>
              <div style={{ color: "#aaa", fontSize: "0.82rem", lineHeight: 1.7 }}>
                {flower.note}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="桜と梅は、春の始まり方が違う">
        <p style={body}>
          <Link href="/plants/16" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ウメ
          </Link>
          は、まだ寒さが残る時期に香り高い花を咲かせます。そのため「高潔」や「忍耐」のように、寒さの中で咲く強さを感じさせる言葉がよく似合います。
        </p>
        <p style={body}>
          一方、
          <Link href="/plants/1" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ソメイヨシノ
          </Link>
          に代表される桜は、春本番を一気に知らせる花です。満開の華やかさと散る早さが重なり、「精神の美」や「優美」といった、はかなさを含む言葉につながっています。
        </p>
      </Section>

      <Section title="足元の花には、控えめな言葉が多い">
        <p style={body}>
          <Link href="/plants/14" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            スミレ
          </Link>
          は、道端や草地の低い場所に咲く小さな花です。派手に目立つより、気づいた人にだけ見つかるような姿から、「謙虚」や「小さな幸せ」といった花言葉がしっくりきます。
        </p>
        <p style={body}>
          <Link href="/plants/11" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            タンポポ
          </Link>
          は明るい黄色の花が印象的ですが、花のあとには綿毛になって風で飛んでいきます。そのため、前向きな愛情だけでなく「別離」のような意味も重ねられます。
        </p>
      </Section>

      <Section title="山の春の花は、短い季節を映す">
        <p style={body}>
          山で出会う
          <Link href="/plants/42" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            カタクリ
          </Link>
          は、春の短い間だけ花を咲かせ、初夏には地上部が目立たなくなります。このような植物はスプリングエフェメラルとも呼ばれ、短い季節にだけ姿を見せるはかなさがあります。
        </p>
        <p style={body}>
          花言葉の「初恋」や「寂しさに耐える」は、うつむき気味に咲く姿や、短い春にだけ出会える特別感とよく重なります。
          春の山野草については
          <Link href="/columns/spring-mountain-flowers" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            春の登山で見られる花特集
          </Link>
          でも紹介しています。
        </p>
      </Section>

      <Section title="花言葉は、観察の入口として楽しむ">
        <p style={body}>
          花言葉は、植物を覚えるための決まりごとではありません。むしろ、花を見るきっかけを増やしてくれる入口です。
        </p>
        <p style={body}>
          「この花はなぜこの言葉なのだろう」と考えると、咲く時期、花の向き、香り、実や綿毛の形まで自然に観察したくなります。そこから植物の見分け方にもつながっていきます。
        </p>
        <div
          style={{
            background: "#1e3d1f",
            border: "1px solid #5a9a5c",
            borderRadius: "8px",
            color: "#a0d0a2",
            fontSize: "0.82rem",
            lineHeight: 1.75,
            marginTop: "1rem",
            padding: "0.75rem 0.9rem",
          }}
        >
          花言葉は地域や文脈で意味が変わることがあります。贈り物に使うときは、厳密な意味よりも、相手に伝えたい気持ちと花の雰囲気を大切にすると選びやすくなります。
        </div>
      </Section>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1.5rem",
          fontSize: "0.8rem",
        }}
      >
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
        <Link href="/columns/mothers-day-flowers" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：母の日に花を贈るのはなぜ →
        </Link>
      </div>
    </ColumnArticle>
  )
}

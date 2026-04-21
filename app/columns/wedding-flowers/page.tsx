import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage = "https://upload.wikimedia.org/wikipedia/commons/b/b3/Wedding_bouquet.jpg"
const title = "結婚式でつかう花たち"
const description =
  "結婚式のブーケや会場装花でよく使われるバラ、ユリ、アジサイ、スズラン、カスミソウ、ランなどを、意味や季節感、使われ方の違いからやさしく紹介します。"

export const metadata = createColumnMetadata({
  path: "/columns/wedding-flowers/",
  title,
  description,
  keywords: ["結婚式", "ブーケ", "ウェディングフラワー", "バラ", "ユリ", "アジサイ", "スズラン"],
  ogImage,
  ogImageAlt: "結婚式のブーケ",
  twitterDescription:
    "結婚式でよく使われる花を、ブーケ・装花・季節感・花言葉の視点から紹介します。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/wedding-flowers/",
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

const flowerCards = [
  {
    name: "バラ",
    href: "/plants/196",
    role: "主役になりやすい定番花",
    text: "花形と色の幅が広く、クラシックにも華やかにも使えます。",
  },
  {
    name: "ユリ",
    href: "/plants/54",
    role: "凛とした印象をつくる花",
    text: "大きな花と香りがあり、挙式会場や和装にもよく合います。",
  },
  {
    name: "アジサイ",
    href: "/plants/31",
    role: "ボリュームを出しやすい花",
    text: "小花が集まった丸い形で、梅雨から初夏の結婚式に季節感を添えます。",
  },
  {
    name: "スズラン",
    href: "/plants/123",
    role: "清楚で物語性のある花",
    text: "小さな白い鐘形の花が、控えめで上品な印象をつくります。",
  },
] as const

export default function Page() {
  return (
    <ColumnArticle
      emoji="💍"
      title={title}
      subtitle="ブーケの花は、見た目だけでなく季節や意味も一緒に選ばれます"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="結婚式のブーケ"
    >
      <ColumnIntro>
        {[
          "結婚式の会場に入ると、まず目に入るのはドレスや指輪だけではありません。ブーケ、祭壇、テーブル、髪飾りなど、あちこちに花が使われています。",
          "花は空間を華やかにするだけでなく、ふたりらしさや季節感、祝福の気持ちを伝える役割も持っています。",
          "このコラムでは、結婚式でよく使われる花を、ブーケでの見え方、花言葉、季節感、扱いやすさという視点から見ていきます。",
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

      <Section title="結婚式の花は、場面ごとに役割が違う">
        <p style={body}>
          結婚式で使う花は、花嫁が持つブーケだけではありません。挙式会場の祭壇、披露宴のテーブル、ウェルカムスペース、ヘアアクセサリー、贈呈用の花束など、使われる場所によって求められる役割が変わります。
        </p>
        <p style={body}>
          ブーケでは手元で美しく見えること、会場装花では遠くから見ても華やかなこと、贈呈用では持ち帰りやすいことが大切です。同じ花でも、使う場所によって印象が大きく変わります。
        </p>
      </Section>

      <Section title="定番の花たち">
        <p style={body}>
          結婚式でよく使われる花には、見た目の美しさだけでなく、扱いやすさや意味の伝わりやすさがあります。
        </p>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
          }}
        >
          {flowerCards.map((flower) => (
            <div
              key={flower.name}
              style={{
                background: "#242424",
                border: "1px solid #3a3a3a",
                borderRadius: "8px",
                padding: "0.9rem",
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
              <div style={{ color: "#e0e0e0", fontSize: "0.82rem", marginTop: "0.35rem" }}>
                {flower.role}
              </div>
              <div style={{ color: "#aaa", fontSize: "0.8rem", lineHeight: 1.7, marginTop: "0.35rem" }}>
                {flower.text}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="バラは、色と形で雰囲気を変えられる">
        <p style={body}>
          <Link href="/plants/196" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            バラ
          </Link>
          は、結婚式の花としてもっとも選ばれやすい花のひとつです。白なら清らかで上品に、ピンクならやわらかく、赤なら印象的で華やかになります。
        </p>
        <p style={body}>
          つぼみの多いバラは可憐に、開いたバラは豪華に見えます。丸いラウンドブーケにも、流れるようなキャスケードブーケにも使いやすく、会場の雰囲気に合わせやすいのが魅力です。
        </p>
        <p style={body}>
          バラ科の特徴については
          <Link href="/columns/rosaceae-plants" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            バラ科の植物たち
          </Link>
          でも紹介しています。
        </p>
      </Section>

      <Section title="白い花は、清楚さと祝福を表しやすい">
        <p style={body}>
          結婚式では白い花がよく使われます。白はドレスと合わせやすく、空間を明るく見せ、清楚な印象をつくりやすい色です。
          <Link href="/plants/54" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ヤマユリ
          </Link>
          のようなユリの仲間は、大きな花と香りで存在感があります。
        </p>
        <p style={body}>
          <Link href="/plants/123" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            スズラン
          </Link>
          は小さな鐘形の花が連なり、控えめで上品な印象です。ブーケに入ると主張しすぎず、近くで見たときにかわいらしさが伝わります。
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
          ユリやスズランは美しい一方で、香りが強いものや有毒部位を持つものもあります。実際の装花では、会場の広さやゲストへの配慮も含めて選ばれます。
        </div>
      </Section>

      <Section title="季節感を出すなら、アジサイや桜も候補になる">
        <p style={body}>
          春の結婚式では
          <Link href="/plants/1" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ソメイヨシノ
          </Link>
          のような桜のイメージを取り入れると、季節がはっきり伝わります。会場装花やペーパーアイテムのモチーフとしても使いやすい植物です。
        </p>
        <p style={body}>
          初夏には
          <Link href="/plants/31" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            アジサイ
          </Link>
          がよく合います。小さな花が集まったように見える丸い形は、ブーケにボリュームを出しやすく、青や紫、白、淡いピンクなど色の幅もあります。
        </p>
        <p style={body}>
          季節の花を入れると、写真を見返したときにも「この時期の式だった」と思い出しやすくなります。花は、日付の記憶を風景として残してくれる存在です。
        </p>
      </Section>

      <Section title="脇役の花が、ブーケ全体を整える">
        <p style={body}>
          カスミソウ、グリーン、実もの、細かな小花は、主役の花を引き立てる脇役です。目立たないようでいて、入るか入らないかでブーケのやわらかさや空気感が大きく変わります。
        </p>
        <p style={body}>
          たとえばバラだけでまとめると力強く華やかになりますが、カスミソウや淡いグリーンを添えると、軽やかで親しみやすい印象になります。結婚式の花選びでは、主役の花だけでなく余白をつくる植物も大切です。
        </p>
      </Section>

      <Section title="花選びは、意味よりもふたりらしさを大切に">
        <p style={body}>
          結婚式の花には花言葉や縁起のよいイメージがありますが、それだけで決める必要はありません。好きな色、思い出の花、季節に合う花、会場に似合う花を選ぶことも大切です。
        </p>
        <p style={body}>
          花言葉が気になる場合は、
          <Link href="/columns/spring-flower-meanings" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            春の花の花言葉
          </Link>
          のように意味を調べながら、最終的には「ふたりがどう見せたいか」で選ぶと自然です。
        </p>
        <p style={body}>
          ブーケは、当日の数時間だけのものに見えて、写真や記憶の中に長く残ります。だからこそ、見た目の美しさと、その花に込めたい気持ちの両方を大切にしたいですね。
        </p>
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

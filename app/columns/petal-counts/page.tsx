import type { Metadata } from "next"
import Link from "next/link"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/petal-counts/`
const ogImage = "https://upload.wikimedia.org/wikipedia/commons/a/a2/Rosa_multiflora.jpg"

export const metadata: Metadata = {
  title: "花びらの枚数で見る植物の分類",
  description:
    "花びらが5枚、4枚、3の倍数……その違いには意味があります。サクラ、ツユクサ、ヤマユリ、アジサイなどを例に、花びらの枚数の見方をやさしく解説します。",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "花びらの枚数で見る植物の分類 | ジュカ！",
    description:
      "花びらが5枚、4枚、3の倍数……その違いには意味があります。サクラ、ツユクサ、ヤマユリ、アジサイなどを例に、花びらの枚数の見方をやさしく解説します。",
    url: pageUrl,
    type: "article",
    images: [{ url: ogImage, alt: "ノイバラの花" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "花びらの枚数で見る植物の分類 | ジュカ！",
    description:
      "5枚花、4枚花、3の倍数の花。その違いから植物を見るコツをやさしく解説します。",
    images: [ogImage],
  },
}

const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div
    style={{
      background: "#2d2d2d",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
    }}
  >
    <h2
      style={{
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#7cbe8c",
        margin: "0 0 1rem",
      }}
    >
      {title}
    </h2>
    {children}
  </div>
)

const body: React.CSSProperties = {
  color: "#ccc",
  fontSize: "0.875rem",
  lineHeight: 1.85,
  margin: "0 0 0.875rem",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": pageUrl,
  url: pageUrl,
  headline: "花びらの枚数で見る植物の分類",
  description:
    "花びらが5枚、4枚、3の倍数……その違いには意味があります。サクラ、ツユクサ、ヤマユリ、アジサイなどを例に、花びらの枚数の見方をやさしく解説します。",
  image: ogImage,
  inLanguage: "ja",
  isPartOf: { "@id": `${siteUrl}/columns/` },
  publisher: {
    "@type": "Organization",
    name: "Reload, Inc.",
    url: "https://reload.co.jp",
  },
}

export default function Page() {
  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", color: "#e0e0e0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/"
          style={{ color: "#7cbe8c", fontSize: "0.85rem", textDecoration: "none" }}
        >
          ← トップへ
        </Link>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(90,154,92,0.2)",
            border: "1px solid #5a9a5c",
            borderRadius: "20px",
            padding: "0.2rem 0.75rem",
            fontSize: "0.7rem",
            color: "#a0d0a2",
            marginBottom: "0.75rem",
          }}
        >
          🌸 コラム
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            margin: "0 0 0.5rem",
            lineHeight: 1.3,
          }}
        >
          花びらの枚数で見る植物の分類
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          5枚、4枚、3の倍数。花びらの数は、植物を見る入口になります
        </p>
      </div>

      <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <img
          src={ogImage}
          alt="ノイバラの花"
          style={{ width: "100%", height: "240px", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            background: "#2a2a2a",
            padding: "0.4rem 0.75rem",
            fontSize: "0.7rem",
            color: "#666",
          }}
        >
          Photo: Wikimedia Commons
        </div>
      </div>

      <div
        style={{
          borderLeft: "3px solid #5a9a5c",
          paddingLeft: "1.25rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {[
          "花を見たとき、多くの人はまず色や大きさに目がいきます。でも、落ち着いて数えてみると、花びらの枚数には案外はっきりした傾向があります。",
          "たとえば<Link href=\"/plants/1\" style=\"color:#7cbe8c;text-decoration:none;\">ソメイヨシノ</Link>や<Link href=\"/plants/16\" style=\"color:#7cbe8c;text-decoration:none;\">ウメ</Link>、<Link href=\"/plants/18\" style=\"color:#7cbe8c;text-decoration:none;\">ノイバラ</Link>は5枚、<Link href=\"/plants/15\" style=\"color:#7cbe8c;text-decoration:none;\">ツユクサ</Link>や<Link href=\"/plants/54\" style=\"color:#7cbe8c;text-decoration:none;\">ヤマユリ</Link>は3の倍数に見える花を持っています。",
          "もちろん例外もあります。ですが『この花は何枚が基本なんだろう』と考える癖がつくと、見分け方だけでなく分類の感覚まで少しずつ育っていきます。",
        ].map((text, i) => (
          <p
            key={i}
            style={{
              margin: 0,
              color: "#bbb",
              fontSize: "0.9rem",
              lineHeight: 1.9,
            }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}
      </div>

      <Section title="5枚花はとても多い">
        <p style={body}>
          双子葉類の花では、5枚を基本にした構造がとてもよく見られます。
          <Link href="/plants/1" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ソメイヨシノ
          </Link>
          や
          <Link href="/plants/16" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ウメ
          </Link>
          、
          <Link href="/plants/18" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ノイバラ
          </Link>
          のようなバラ科の花を見ると、その典型がわかりやすいです。
        </p>
        <p style={body}>
          「花びら5枚」はそれだけでバラ科と断定できるわけではありませんが、まず疑ってみるきっかけにはなります。
          花弁の数に加えて、おしべが多いか、葉にギザギザがあるかも一緒に見ると、かなり精度が上がります。
        </p>
      </Section>

      <Section title="4枚花は『十字』に見えることがある">
        <p style={body}>
          4枚花も珍しくありません。たとえば
          <Link href="/plants/50" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            クサノオウ
          </Link>
          は4枚の花弁を持ち、横からではなく正面から見ると十字形のように広がって見えます。
        </p>
        <p style={body}>
          4枚だから即この科、という単純な見方はできませんが、「5枚ではない」という気づきは大事です。
          花弁の枚数は、見分けを始めるときの分岐点として役立ちます。
        </p>
      </Section>

      <Section title="3の倍数なら単子葉類を疑う">
        <p style={body}>
          単子葉類の花は、3枚または6枚のように3の倍数でまとまることが多いです。
          <Link href="/plants/15" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ツユクサ
          </Link>
          は3枚、
          <Link href="/plants/42" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            カタクリ
          </Link>
          や
          <Link href="/plants/54" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ヤマユリ
          </Link>
          は6枚に見える花を持っています。
        </p>
        <p style={body}>
          このとき注意したいのは、6枚がすべて「花びら」とは限らないことです。ユリの仲間では花弁と萼片の見た目がほぼ同じで、まとめて花被片と呼ぶこともあります。
          それでも、3の倍数というパターンは分類を考える大きな手がかりになります。
        </p>
      </Section>

      <Section title="花びらに見えて、花びらではないこともある">
        <p style={body}>
          花を数えるときに、いちばん引っかかりやすいのがここです。
          <Link href="/plants/31" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            アジサイ
          </Link>
          の大きく目立つ部分は、実際には萼が花びらのように見えているものです。
          また
          <Link href="/plants/40" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ドクダミ
          </Link>
          の白い4枚も花弁ではなく、総苞片です。
        </p>
        <p style={body}>
          「何枚あるか」を数える前に、「これは本当に花弁なのか」を確かめることが大切です。
          ここがわかると、アジサイやドクダミの見え方ががらっと変わります。
        </p>
      </Section>

      <Section title="枚数だけで決めつけず、ほかの特徴と組み合わせる">
        <p style={body}>
          花びらの枚数はとても便利な入口ですが、それだけで答えが出るわけではありません。八重咲きの
          <Link href="/plants/196" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            バラ
          </Link>
          のように、人の手で花弁数が増えている園芸植物もあります。
        </p>
        <p style={body}>
          だからこそ、枚数は「最初の仮説」として使うのがおすすめです。葉の形、花のつき方、香り、生える場所まで合わせて見ると、植物の分類が少しずつ立体的に見えてきます。
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
        <Link href="/columns/rosaceae-plants" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          バラ科の植物たち →
        </Link>
      </div>
    </div>
  )
}

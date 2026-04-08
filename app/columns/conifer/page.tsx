import type { Metadata } from "next"
import Link from "next/link"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/conifer/`
const ogImage =
  "https://commons.wikimedia.org/wiki/Special:FilePath/Taro-sugi_20111002.jpg"

export const metadata: Metadata = {
  title: "針葉樹林の簡単な見分け方",
  keywords: ["針葉樹", "見分け方", "スギ", "ヒノキ", "アカマツ", "クロマツ", "ハイマツ", "針葉樹林", "樹木識別"],
  description:
    "スギ・ヒノキ・アカマツ・クロマツ・ハイマツなど、針葉樹林でよく見る木を簡単に見分けるコツを解説。葉の形・樹皮・松ぼっくりなど現地で使えるポイントをまとめました。",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "針葉樹林の簡単な見分け方 | ジュカ！",
    description:
      "スギ・ヒノキ・アカマツ・クロマツ・ハイマツなど、針葉樹林でよく見る木を簡単に見分けるコツを解説。葉の形・樹皮・松ぼっくりなど現地で使えるポイントをまとめました。",
    url: pageUrl,
    type: "article",
    images: [{ url: ogImage, alt: "針葉樹（スギ）の森" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "針葉樹林の簡単な見分け方 | ジュカ！",
    description:
      "スギ・ヒノキ・アカマツ・クロマツ・ハイマツなど、針葉樹林でよく見る木を簡単に見分けるコツを解説。",
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
        marginBottom: "1rem",
        margin: "0 0 1rem",
      }}
    >
      {title}
    </h2>
    {children}
  </div>
)

const TreeCard = ({
  name,
  href,
  points,
  tip,
}: {
  name: string
  href: string
  points: string[]
  tip: string
}) => (
  <div
    style={{
      background: "#242424",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "0.75rem",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <Link
        href={href}
        style={{
          fontWeight: "bold",
          color: "#7cbe8c",
          fontSize: "1rem",
          textDecoration: "none",
        }}
      >
        {name} →
      </Link>
    </div>
    <ul
      style={{
        margin: "0 0 0.5rem",
        paddingLeft: "1.2rem",
        color: "#ccc",
        fontSize: "0.875rem",
        lineHeight: 1.8,
      }}
    >
      {points.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
    <div
      style={{
        background: "#1e3d1f",
        borderRadius: "6px",
        padding: "0.5rem 0.75rem",
        color: "#a0d0a2",
        fontSize: "0.8rem",
      }}
    >
      💡 {tip}
    </div>
  </div>
)

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": pageUrl,
  url: pageUrl,
  headline: "針葉樹林の簡単な見分け方",
  description:
    "スギ・ヒノキ・アカマツ・クロマツ・ハイマツなど、針葉樹林でよく見る木を簡単に見分けるコツを解説。葉の形・樹皮・松ぼっくりなど現地で使えるポイントをまとめました。",
  image: ogImage,
  inLanguage: "ja",
  isPartOf: { "@id": `${siteUrl}/columns/` },
  publisher: {
    "@type": "Organization",
    name: "Reload, Inc.",
    url: "https://reload.co.jp",
  },
}

const Page = () => {
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
          🌲 コラム
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
          針葉樹林の簡単な見分け方
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          スギ・ヒノキ・マツ…よく似た針葉樹を「これだけ」で見分けるコツ
        </p>
      </div>

      {/* Hero image */}
      <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <img
          src={ogImage}
          alt="針葉樹（スギ）の森"
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

      {/* Intro */}
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
          "山道を歩いていると、あたり一面に背の高い緑の木が続いていることがある。みんな似たような感じで、これがスギなのかヒノキなのか、マツなのかぜんぜんわからない——そんな経験はないだろうか。",
          "実は、ちゃんと見れば針葉樹には「種類ごとのくせ」がある。葉っぱの形、幹の色、松ぼっくりの形。そのくせさえ覚えてしまえば、山の中でも「あ、あれはヒノキだ」と気づけるようになる。",
          "むずかしい知識はいらない。まずは2〜3種類、顔見知りになるところから始めよう。",
        ].map((text, i) => (
          <p
            key={i}
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
      </div>

      <Section title="まず「葉の形」で2グループに分ける">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          針葉樹の見分けは、まず葉の形で大きく2つに分けるのが早道です。
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
          }}
        >
          {[
            {
              label: "針状の葉",
              desc: "細くとがった葉が枝に直接つく。マツ・スギ・モミ・ツガなど。",
              color: "#1e3d1f",
              border: "#5a9a5c",
            },
            {
              label: "鱗片状の葉",
              desc: "魚のうろこ状の葉が枝をびっしり覆う。ヒノキ・サワラなど。",
              color: "#1a2d3a",
              border: "#4a7a9c",
            },
          ].map((g) => (
            <div
              key={g.label}
              style={{
                background: g.color,
                border: `1px solid ${g.border}`,
                borderRadius: "8px",
                padding: "0.875rem",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#e0e0e0",
                  marginBottom: "0.4rem",
                }}
              >
                {g.label}
              </div>
              <div style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.6 }}>
                {g.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="スギとヒノキ — 最もよく見る2種">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          日本の人工林の大半を占める2種。裏山や植林地でよく出会います。
        </p>
        <TreeCard
          name="スギ"
          href="/plants/9"
          points={[
            "葉は細い針状で、枝にらせん状についている",
            "枝を折ると甘い香りがする（スギの香り）",
            "樹皮は赤みがかった褐色で、縦に長く細く剥がれる",
            "松ぼっくりは丸く小さめ（直径2〜3cm）でトゲがある",
          ]}
          tip="枝を折って「甘い香り」がすればスギ。香りの強さが決め手。"
        />
        <TreeCard
          name="ヒノキ"
          href="/plants/8"
          points={[
            "葉は鱗片状で枝をびっしり覆う（触るとやわらかい）",
            "枝の先端をよく見ると、葉の裏にY字・X字の白い気孔線がある",
            "樹皮は赤褐色で縦に長く、幅広く剥がれる",
            "松ぼっくりはサッカーボール型で小さい（直径1〜1.5cm）",
          ]}
          tip="葉の裏のY字模様がヒノキの目印。枝の先を裏返して確認してみよう。"
        />
        <div
          style={{
            background: "#2a2a2a",
            borderRadius: "8px",
            padding: "1rem",
            fontSize: "0.8rem",
            color: "#aaa",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "#e0e0e0" }}>まとめて覚えるなら：</strong>
          葉が「針っぽい → スギ」、葉が「うろこっぽい → ヒノキ」と覚えるのが簡単。
          遠目には両者は似ていますが、樹皮もスギの方がやや赤くてザラザラ感があります。
        </div>
      </Section>

      <Section title="マツ類 — 「葉の束の数」で判別">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          マツの仲間は針葉が必ず「束」になっているのが特徴。その束の枚数で種類が分かります。
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          {[
            { num: "2本束", species: "アカマツ・クロマツ", color: "#3a2a1e", border: "#7a5a3a" },
            { num: "5本束", species: "ゴヨウマツ・ハイマツ", color: "#1e2a3a", border: "#3a5a7a" },
            { num: "多数束", species: "カラマツ（落葉）", color: "#2a1e3a", border: "#5a3a7a" },
          ].map((b) => (
            <div
              key={b.num}
              style={{
                background: b.color,
                border: `1px solid ${b.border}`,
                borderRadius: "8px",
                padding: "0.75rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "1rem", color: "#e0e0e0", marginBottom: "0.3rem" }}>
                {b.num}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#aaa" }}>{b.species}</div>
            </div>
          ))}
        </div>
        <TreeCard
          name="アカマツ"
          href="/plants/22"
          points={[
            "針葉は2本束で細くやわらかい（長さ5〜12cm）",
            "幹の上部が赤みがかったオレンジ色になる（「赤松」の由来）",
            "里山・丘陵地に多い。松茸が生えるのはアカマツ林",
          ]}
          tip="幹の色が赤っぽければアカマツ。上を見上げると一目瞭然。"
        />
        <TreeCard
          name="クロマツ"
          href="/plants/10"
          points={[
            "針葉は2本束で硬くてよく刺さる（長さ7〜12cm）",
            "幹は灰黒色で亀甲状に割れる（「黒松」の由来）",
            "海岸の防風林・公園に多い。葉がアカマツより硬い",
          ]}
          tip="海辺・海岸に生えているマツはほぼクロマツ。葉を触ってチクチクすれば確定。"
        />
        <TreeCard
          name="ハイマツ"
          href="/plants/101"
          points={[
            "針葉は5本束（ゴヨウマツの仲間）",
            "低く這うように広がる（高山の強風に適応）",
            "高山帯（森林限界付近）にだけ生える",
          ]}
          tip="高山（標高2000m以上）で這っているマツ＝ハイマツ。他にはない環境が目印。"
        />
      </Section>

      <Section title="一覧で整理">
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.8rem",
              color: "#ccc",
            }}
          >
            <thead>
              <tr>
                {["樹種", "葉の形", "識別ポイント", "よく見る場所"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.5rem 0.75rem",
                      textAlign: "left",
                      borderBottom: "1px solid #444",
                      color: "#7cbe8c",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "スギ",
                  href: "/plants/9",
                  leaf: "針状（らせん状）",
                  point: "甘い香り・赤褐色の縦剥れ樹皮",
                  place: "植林地・山",
                },
                {
                  name: "ヒノキ",
                  href: "/plants/8",
                  leaf: "鱗片状",
                  point: "葉裏のY字気孔線",
                  place: "植林地・山",
                },
                {
                  name: "アカマツ",
                  href: "/plants/22",
                  leaf: "針状・2本束",
                  point: "幹上部が赤橙色",
                  place: "里山・丘陵地",
                },
                {
                  name: "クロマツ",
                  href: "/plants/10",
                  leaf: "針状・2本束（硬い）",
                  point: "灰黒色の亀甲状樹皮・海岸に多い",
                  place: "海岸・公園",
                },
                {
                  name: "ハイマツ",
                  href: "/plants/101",
                  leaf: "針状・5本束",
                  point: "這い性・高山帯のみ",
                  place: "高山帯",
                },
              ].map((row, i) => (
                <tr
                  key={row.name}
                  style={{ background: i % 2 === 0 ? "#262626" : "#222" }}
                >
                  <td
                    style={{
                      padding: "0.6rem 0.75rem",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    <Link
                      href={row.href}
                      style={{ color: "#7cbe8c", textDecoration: "none" }}
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.leaf}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.point}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.place}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="覚えておきたい豆知識">
        {[
          {
            title: "カラマツは「落葉する針葉樹」",
            body: "針葉樹のほとんどは常緑ですが、カラマツだけは秋に葉が黄金色になって落葉します。冬に葉のない針葉樹を見かけたらカラマツです。高原や山地の植林地でよく見られます。",
          },
          {
            title: "スギ花粉はスギ林から",
            body: "春の花粉症の主犯であるスギ花粉は、人工のスギ林から大量に飛散します。花粉の季節に赤みがかった靄がかかったように見える針葉樹林があれば、それがスギ花粉です。",
          },
          {
            title: "松ぼっくりのサイズも手がかり",
            body: "マツ類の球果（松ぼっくり）のサイズは種によって大きく異なります。アカマツ・クロマツは5〜6cm程度、ハイマツは3〜4cmと小さめ。大きな松ぼっくりはチョウセンゴヨウなど5本束のマツに多い傾向があります。",
          },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              borderLeft: "3px solid #5a9a5c",
              paddingLeft: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: "0.875rem",
                color: "#e0e0e0",
                marginBottom: "0.3rem",
              }}
            >
              {item.title}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.7 }}>
              {item.body}
            </div>
          </div>
        ))}
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
        <Link href="/plants?tags=%E9%87%9D%E8%91%89" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          針葉タグの植物を一覧で見る →
        </Link>
        <Link href="/columns/tree-vs-herb" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：木と草のちがい →
        </Link>
      </div>
    </div>
  )
}

export default Page

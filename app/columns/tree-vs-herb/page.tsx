import type { Metadata } from "next"
import Link from "next/link"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/tree-vs-herb/`
const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/4/49/Cherry_Blossoms_in_Yokosuka%2C_Japan.JPG"

export const metadata: Metadata = {
  title: "木と草のちがい",
  description:
    "サクラは木でタンポポは草——でも、その「ちがい」って何？木質化・越冬・茎の構造など、植物学的な観点からやさしく解説します。",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "木と草のちがい | ジュカ！",
    description:
      "サクラは木でタンポポは草——でも、その「ちがい」って何？木質化・越冬・茎の構造など、植物学的な観点からやさしく解説します。",
    url: pageUrl,
    type: "article",
    images: [{ url: ogImage, alt: "木と草の比較" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "木と草のちがい | ジュカ！",
    description:
      "サクラは木でタンポポは草——でも、その「ちがい」って何？木質化・越冬・茎の構造など、植物学的な観点からやさしく解説します。",
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
  headline: "木と草のちがい",
  description:
    "サクラは木でタンポポは草——でも、その「ちがい」って何？木質化・越冬・茎の構造など、植物学的な観点からやさしく解説します。",
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

      {/* Header */}
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
          🌿 コラム
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
          木と草のちがい
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          「サクラは木、タンポポは草」——そのちがいの正体を探ってみよう
        </p>
      </div>

      {/* Hero image */}
      <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <img
          src={ogImage}
          alt="横須賀のサクラ（木本植物の例）"
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
          "「あれって木？草？」——公園を歩いていると、ふとそんな疑問が浮かぶことがある。アジサイは木なのか草なのか。あんなに大きなタケは木じゃないの？",
          "子どものころから「木と草は別もの」と感覚でわかっているつもりでも、いざ「何がちがうの？」と聞かれると意外と答えに詰まる。",
          "答えは茎の「硬さ」にある。たったそれだけのちがいが、サクラとタンポポを分けている。知ってしまえばなんでもないことが、植物の見方をちょっと変えてくれる。",
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

      {/* 一番の違い */}
      <Section title="いちばんの違いは「茎が残るか」">
        <p style={body}>
          木と草の根本的なちがいは、<strong style={{ color: "#e0e0e0" }}>茎が木質化（もくしつか）するかどうか</strong>です。
        </p>
        <p style={body}>
          木質化とは、茎の細胞壁にリグニンという物質が蓄積されて硬くなること。
          木（木本植物）は年を追うごとに茎が太く硬くなり、冬が来ても幹や枝が残ります。
          一方、草（草本植物）の茎は柔らかいまま。多くの草は冬に地上部が枯れ、翌春に新しい茎を出します。
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            marginTop: "0.5rem",
          }}
        >
          {[
            {
              label: "木（木本植物）",
              points: ["茎が木質化して硬くなる", "幹・枝が冬を越す", "年輪が形成される", "高木・低木・つる木"],
              color: "#1e2d1e",
              border: "#5a9a5c",
              example: { name: "ソメイヨシノ", href: "/plants/1" },
            },
            {
              label: "草（草本植物）",
              points: ["茎は柔らかいまま", "多くは地上部が枯れて冬越し", "年輪はできない", "一年草・二年草・多年草"],
              color: "#2a1e1e",
              border: "#9a5c5c",
              example: { name: "タンポポ", href: "/plants/11" },
            },
          ].map((g) => (
            <div
              key={g.label}
              style={{
                background: g.color,
                border: `1px solid ${g.border}`,
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#e0e0e0",
                  marginBottom: "0.5rem",
                }}
              >
                {g.label}
              </div>
              <ul
                style={{
                  margin: "0 0 0.75rem",
                  paddingLeft: "1.1rem",
                  color: "#aaa",
                  fontSize: "0.8rem",
                  lineHeight: 1.8,
                }}
              >
                {g.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <div style={{ fontSize: "0.75rem", color: "#777" }}>
                例：
                <Link
                  href={g.example.href}
                  style={{ color: "#7cbe8c", textDecoration: "none", marginLeft: "0.3rem" }}
                >
                  {g.example.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 現地での見分け方 */}
      <Section title="現地で見分けるには">
        <p style={body}>
          理屈はわかっても、目の前の植物がどちらか迷うことがあります。
          現地では次の3点を確かめると判断しやすくなります。
        </p>
        {[
          {
            step: "1",
            title: "茎・幹を触ってみる",
            desc: "根元の茎を指で押してみましょう。硬くてびくともしない → 木。柔らかく少し沈む感触 → 草。太さではなく「硬さ」で判断するのがポイントです。",
          },
          {
            step: "2",
            title: "冬の様子を想像する",
            desc: "「この植物、冬はどうなる？」と考えてみましょう。骨格となる幹や枝が残るものは木、地上部がまるごと枯れてしまうものは草です。多年草は根だけ生きて翌春に再び芽吹きます。",
          },
          {
            step: "3",
            title: "茎の断面を想像する",
            desc: "木の茎（幹）を横に切ると年輪が見えます。草の茎には年輪はありません。太くても年輪のないものはタケ（竹）のように草の仲間です。",
          },
        ].map((item) => (
          <div
            key={item.step}
            style={{
              display: "flex",
              gap: "0.875rem",
              marginBottom: "1rem",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: "1.75rem",
                height: "1.75rem",
                background: "#5a9a5c",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {item.step}
            </div>
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                  color: "#e0e0e0",
                  marginBottom: "0.25rem",
                }}
              >
                {item.title}
              </div>
              <p style={{ ...body, margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </Section>

      {/* 意外な分類 */}
      <Section title="「えっ、これが草？」「これが木？」">
        <p style={body}>
          日常の感覚と植物学上の分類がずれることがあります。思わず「へえ」となる例をいくつか紹介します。
        </p>

        <h3 style={{ fontSize: "0.9rem", color: "#e0e0e0", margin: "0 0 0.75rem" }}>
          🌿 実は「草」なもの
        </h3>
        {[
          {
            name: "タケ（竹）",
            href: null,
            desc: "あんなに太くて硬いのに、タケは草の仲間（イネ科）。茎（竹の節）は木質化するものの、年輪を作らず、構造的には草本に分類されます。地上部が枯れることなく地下茎で広がります。",
          },
          {
            name: "バナナ",
            href: null,
            desc: "南国の大きなバナナの「木」に見える幹は、実は葉の付け根（葉鞘）が重なったもの。本物の木質化した幹ではないため、草本植物です。世界最大の草本植物の一つと言われます。",
          },
          {
            name: "クズ",
            href: "/plants/43",
            desc: "秋の七草の一つで、野山や道端を覆う大型のつる植物。根は多年草の草本ですが、地上のつる部分は毎年伸びては枯れます。",
          },
        ].map((item) => (
          <div
            key={item.name}
            style={{
              borderLeft: "3px solid #9a5c5c",
              paddingLeft: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "0.875rem", color: "#e0e0e0", marginBottom: "0.25rem" }}>
              {item.href ? (
                <Link href={item.href} style={{ color: "#7cbe8c", textDecoration: "none" }}>
                  {item.name} →
                </Link>
              ) : item.name}
            </div>
            <p style={{ ...body, margin: 0 }}>{item.desc}</p>
          </div>
        ))}

        <h3 style={{ fontSize: "0.9rem", color: "#e0e0e0", margin: "1rem 0 0.75rem" }}>
          🌳 実は「木」なもの
        </h3>
        {[
          {
            name: "アジサイ",
            href: "/plants/31",
            desc: "梅雨の花として親しまれるアジサイは低木。冬に葉が落ちても、木質化した幹と枝は残ります。毎年同じ株から新しい枝が伸びて花を咲かせます。",
          },
          {
            name: "フジ",
            href: "/plants/25",
            desc: "春に紫の花房を垂らすフジは木本のつる植物（木質つる性）。幹は木質化していて樹齢を重ねると太くなります。草のように見えることがありますが、れっきとした木です。",
          },
          {
            name: "ススキ",
            href: "/plants/41",
            desc: "秋の野原の代名詞ですが、ススキは草本。毎年地下の根茎から新しい茎を出します。背が高くても茎は木質化せず、秋冬には枯れた茎が残るだけです（木ではない）。",
          },
        ].map((item) => (
          <div
            key={item.name}
            style={{
              borderLeft: "3px solid #5a9a5c",
              paddingLeft: "0.875rem",
              marginBottom: "1rem",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: "0.875rem", color: "#e0e0e0", marginBottom: "0.25rem" }}>
              {item.href ? (
                <Link href={item.href} style={{ color: "#7cbe8c", textDecoration: "none" }}>
                  {item.name} →
                </Link>
              ) : item.name}
            </div>
            <p style={{ ...body, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </Section>

      {/* 木の3タイプ */}
      <Section title="木はさらに3つに分かれる">
        <p style={body}>
          木本植物はさらに樹高や形態で3つに分類されます。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              label: "高木",
              height: "おおむね5m以上",
              desc: "森や街路でよく見る大きな木。サクラ・スギ・ケヤキなど。",
              example: { name: "ソメイヨシノ", href: "/plants/1" },
            },
            {
              label: "低木",
              height: "おおむね5m未満",
              desc: "人の背丈くらいまでの木。アジサイ・ツツジ・ウメなど。",
              example: { name: "アジサイ", href: "/plants/31" },
            },
            {
              label: "つる性木本",
              height: "他の木などに絡まって成長",
              desc: "茎は木質化しているが自立せず、他のものを利用して伸びる。フジ・ノバラなど。",
              example: { name: "フジ", href: "/plants/25" },
            },
          ].map((t) => (
            <div
              key={t.label}
              style={{
                background: "#242424",
                borderRadius: "8px",
                padding: "0.875rem",
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
              }}
            >
              <div style={{ flexShrink: 0 }}>
                <div
                  style={{
                    background: "#1e3d1f",
                    borderRadius: "6px",
                    padding: "0.25rem 0.6rem",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    color: "#7cbe8c",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.label}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#777", marginBottom: "0.2rem" }}>
                  {t.height}
                </div>
                <div style={{ fontSize: "0.8rem", color: "#ccc", lineHeight: 1.7, marginBottom: "0.3rem" }}>
                  {t.desc}
                </div>
                <Link
                  href={t.example.href}
                  style={{ fontSize: "0.75rem", color: "#7cbe8c", textDecoration: "none" }}
                >
                  例：{t.example.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 草の3タイプ */}
      <Section title="草の寿命による分類">
        <p style={body}>
          草本植物は寿命のサイクルでも分けられます。
        </p>
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
                {["種類", "サイクル", "特徴", "例"].map((h) => (
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
                  type: "一年草",
                  cycle: "1年以内",
                  desc: "種→発芽→開花→結実→枯死を1年で完了",
                  ex: "ヒマワリ・アサガオ・エノコログサ",
                  href: null,
                },
                {
                  type: "二年草",
                  cycle: "1〜2年",
                  desc: "1年目に葉だけ出し、2年目に花を咲かせて枯れる",
                  ex: "センブリ・ハマダイコン",
                  href: null,
                },
                {
                  type: "多年草",
                  cycle: "複数年",
                  desc: "地下部（根・球根・地下茎）が生き続けて毎年再生",
                  ex: "タンポポ・ススキ",
                  href: "/plants/11",
                },
              ].map((row, i) => (
                <tr key={row.type} style={{ background: i % 2 === 0 ? "#262626" : "#222" }}>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333", fontWeight: "bold", color: "#e0e0e0" }}>
                    {row.type}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333", whiteSpace: "nowrap" }}>
                    {row.cycle}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.desc}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.href ? (
                      <Link href={row.href} style={{ color: "#7cbe8c", textDecoration: "none" }}>
                        {row.ex} →
                      </Link>
                    ) : row.ex}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* まとめ */}
      <div
        style={{
          background: "#1e3d1f",
          border: "1px solid #5a9a5c",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1rem", fontWeight: "bold", color: "#7cbe8c", margin: "0 0 0.75rem" }}>
          まとめ
        </h2>
        <ul
          style={{
            margin: 0,
            paddingLeft: "1.2rem",
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 2,
          }}
        >
          <li>木と草のちがいは<strong style={{ color: "#e0e0e0" }}>茎が木質化するかどうか</strong></li>
          <li>木は冬でも幹・枝が残り、草の地上部は多くが枯れる</li>
          <li>タケ・バナナは「草」、アジサイ・フジは「木」</li>
          <li>木は高木・低木・つる性木本の3種、草は寿命で一年草・二年草・多年草に分かれる</li>
        </ul>
      </div>

      <div style={{ textAlign: "center", padding: "1rem 0 1.5rem", fontSize: "0.8rem" }}>
        <Link
          href="/columns/conifer"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：針葉樹林の簡単な見分け方 →
        </Link>
      </div>
    </div>
  )
}

export default Page

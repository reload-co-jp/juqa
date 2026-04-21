import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/c/c7/Hanafuda_January_Hikari.svg"
const title = "花札に描かれている植物"
const description =
  "花札の12か月に描かれている松、梅、桜、藤、菖蒲、牡丹、萩、芒、菊、紅葉、柳、桐を、季節感と植物の特徴からやさしく読み解きます。"

export const metadata = createColumnMetadata({
  path: "/columns/hanafuda-plants/",
  title,
  description,
  keywords: ["花札", "植物", "松", "梅", "桜", "藤", "菖蒲", "菊", "紅葉", "桐"],
  ogImage,
  ogImageAlt: "花札の松に鶴",
  twitterDescription:
    "花札の12か月に登場する植物を、季節感と見分け方のヒントから紹介します。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/hanafuda-plants/",
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

const monthPlants = [
  { month: "1月", plant: "松", motif: "松に鶴", href: "/plants/22" },
  { month: "2月", plant: "梅", motif: "梅に鶯", href: "/plants/16" },
  { month: "3月", plant: "桜", motif: "桜に幕", href: "/plants/1" },
  { month: "4月", plant: "藤", motif: "藤に不如帰", href: "/plants/25" },
  { month: "5月", plant: "菖蒲", motif: "菖蒲に八橋", href: "/plants/95" },
  { month: "6月", plant: "牡丹", motif: "牡丹に蝶" },
  { month: "7月", plant: "萩", motif: "萩に猪" },
  { month: "8月", plant: "芒", motif: "芒に月・雁", href: "/plants/41" },
  { month: "9月", plant: "菊", motif: "菊に盃" },
  { month: "10月", plant: "紅葉", motif: "紅葉に鹿", href: "/plants/2" },
  { month: "11月", plant: "柳", motif: "柳に小野道風", href: "/plants/75" },
  { month: "12月", plant: "桐", motif: "桐に鳳凰" },
] as const

const seasonalGroups = [
  {
    title: "春を告げる花木",
    months: ["1月", "2月", "3月", "4月"],
    note: "松で新年のめでたさを置き、梅、桜、藤へと春の花が続きます。",
  },
  {
    title: "初夏から秋へ移る草花",
    months: ["5月", "6月", "7月", "8月", "9月"],
    note: "水辺の菖蒲、華やかな牡丹、秋の七草にも数えられる萩や芒、重陽の菊へ季節が進みます。",
  },
  {
    title: "晩秋と年の終わりの木",
    months: ["10月", "11月", "12月"],
    note: "紅葉、柳、桐は、秋の深まりから年末へ向かう空気を強く感じさせる組み合わせです。",
  },
] as const

export default function Page() {
  return (
    <ColumnArticle
      emoji="🎴"
      title={title}
      subtitle="札の絵柄を追うと、日本の一年の植物暦が見えてきます"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="花札の松に鶴"
    >
      <ColumnIntro>
        {[
          "花札は、遊びの道具であると同時に、12か月の季節感を小さな札に閉じ込めた植物図鑑のような存在です。",
          "1月の松、2月の梅、3月の桜……と見ていくと、札の並びは単なる絵柄ではなく、花や木で一年を覚えるための暦になっています。",
          "このコラムでは、花札に描かれている植物を月ごとに整理しながら、なぜその植物がその月に置かれているのかを見ていきます。",
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

      <Section title="花札の12か月と植物">
        <p style={body}>
          花札には、各月にひとつずつ代表的な植物が割り当てられています。まずは全体を一覧で見てみましょう。
        </p>
        <div
          style={{
            display: "grid",
            gap: "0.65rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(11rem, 1fr))",
          }}
        >
          {monthPlants.map((item) => (
            <div
              key={item.month}
              style={{
                background: "#242424",
                border: "1px solid #3a3a3a",
                borderRadius: "8px",
                padding: "0.85rem",
              }}
            >
              <div style={{ color: "#7cbe8c", fontSize: "0.78rem", marginBottom: "0.25rem" }}>
                {item.month}
              </div>
              <div style={{ color: "#e0e0e0", fontSize: "0.95rem", fontWeight: "bold" }}>
                {"href" in item ? (
                  <Link href={item.href} style={{ color: "#e0e0e0", textDecoration: "none" }}>
                    {item.plant} →
                  </Link>
                ) : (
                  item.plant
                )}
              </div>
              <div style={{ color: "#999", fontSize: "0.78rem", lineHeight: 1.6 }}>
                {item.motif}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="春は、めでたさから花盛りへ">
        <p style={body}>
          1月の松は、冬でも青々とした葉を保つ常緑樹です。花札では鶴と組み合わされ、新年のめでたさや長寿のイメージを担っています。
          松としては
          <Link href="/plants/22" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            アカマツ
          </Link>
          や
          <Link href="/plants/10" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            クロマツ
          </Link>
          のような針葉樹を思い浮かべるとわかりやすいです。
        </p>
        <p style={body}>
          2月は
          <Link href="/plants/16" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ウメ
          </Link>
          、3月は
          <Link href="/plants/1" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            サクラ
          </Link>
          、4月は
          <Link href="/plants/25" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            フジ
          </Link>
          です。まだ寒い時期に咲く梅、春本番の桜、初夏に向かって垂れ下がる藤の花房へと、季節がなめらかに進んでいきます。
        </p>
      </Section>

      <Section title="初夏から秋は、水辺と草原の植物が目立つ">
        <p style={body}>
          5月の菖蒲は、端午の節句とも結びつく植物です。札では「菖蒲に八橋」として描かれますが、植物としては
          <Link href="/plants/95" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            アヤメ
          </Link>
          や
          <Link href="/plants/94" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            カキツバタ
          </Link>
          の仲間を見分ける入口にもなります。
        </p>
        <p style={body}>
          6月は牡丹、7月は萩、8月は
          <Link href="/plants/41" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ススキ
          </Link>
          、9月は菊です。花札の月名は現在の花の見頃と少しずれることもありますが、旧暦の季節感や和歌・絵画の題材としての印象を重ねて見ると理解しやすくなります。
        </p>
        <p style={body}>
          とくに芒は、月や雁と一緒に描かれることで、花そのものよりも秋の野原の空気を表しています。植物名を覚えるだけでなく、植物がつくる景色ごと覚えるのが花札らしい楽しみ方です。
        </p>
      </Section>

      <Section title="秋の終わりには、紅葉・柳・桐が並ぶ">
        <p style={body}>
          10月は紅葉です。花札では鹿と一緒に描かれ、秋の山を象徴する組み合わせになっています。身近な紅葉としては
          <Link href="/plants/2" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            イロハモミジ
          </Link>
          が代表的です。
        </p>
        <p style={body}>
          11月は柳で、小野道風と蛙の絵柄がよく知られています。柳は水辺の木としての印象が強く、
          <Link href="/plants/75" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            シダレヤナギ
          </Link>
          の枝が垂れる姿を思い浮かべると、札の雰囲気がつかみやすくなります。
        </p>
        <p style={body}>
          12月は桐です。桐に鳳凰という絵柄は、年の終わりを華やかに締めくくる特別な札として扱われます。桐は植物としてだけでなく、家紋や意匠にもよく使われるため、花札の中でも装飾的な意味が強い植物です。
        </p>
      </Section>

      <Section title="花札は、植物の名前より『季節の記憶』を描いている">
        <p style={body}>
          花札に描かれている植物は、正確な植物分類を示す図鑑ではありません。たとえば菖蒲の絵柄を見て、アヤメなのかカキツバタなのかを厳密に決めるよりも、水辺の初夏の景色として受け取るほうが自然です。
        </p>
        <p style={body}>
          それでも、札の植物をひとつずつ知っていくと、日本でどの植物が季節の象徴として親しまれてきたのかが見えてきます。花札は、遊びながら植物の暦を覚えられる、とてもよくできた文化の道具です。
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
          花札を手に取ったら、役だけでなく植物にも注目してみてください。札の順番を追うだけで、松の新年から桐の年末まで、一年の植物の物語が見えてきます。
        </div>
      </Section>

      <Section title="季節でまとめると覚えやすい">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {seasonalGroups.map((group) => (
            <div
              key={group.title}
              style={{
                background: "#242424",
                borderRadius: "8px",
                padding: "0.9rem",
              }}
            >
              <div
                style={{
                  color: "#e0e0e0",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.35rem",
                }}
              >
                {group.title}
              </div>
              <div style={{ color: "#7cbe8c", fontSize: "0.78rem", marginBottom: "0.35rem" }}>
                {group.months.join(" / ")}
              </div>
              <div style={{ color: "#aaa", fontSize: "0.82rem", lineHeight: 1.7 }}>
                {group.note}
              </div>
            </div>
          ))}
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
        <Link href="/columns/plant-trivia-notes" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：植物の特徴と豆知識メモ →
        </Link>
      </div>
    </ColumnArticle>
  )
}

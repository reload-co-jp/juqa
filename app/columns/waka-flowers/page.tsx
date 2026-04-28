import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Prunus_mume.JPG"
const title = "和歌で詠まれた花たち"
const description =
  "梅、桜、藤、菖蒲、萩、芒など、和歌でくり返し詠まれてきた花や草木を、季節感と植物の特徴からやさしく読み解きます。"

export const metadata = createColumnMetadata({
  path: "/columns/waka-flowers/",
  title,
  description,
  keywords: ["和歌", "花", "梅", "桜", "藤", "萩", "芒", "古典", "植物文化"],
  ogImage,
  ogImageAlt: "梅の花",
  twitterDescription:
    "和歌でよく詠まれた花や草木を、季節感と植物の見え方から紹介します。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/waka-flowers/",
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

const wakaFlowers = [
  {
    name: "梅",
    href: "/plants/16",
    season: "早春",
    key: "香りと気品",
    note: "まだ寒い時期に咲く花として、待ちわびた春のしるしになりました。",
  },
  {
    name: "桜",
    href: "/plants/1",
    season: "春",
    key: "盛りと散り際",
    note: "満開の華やかさと、すぐ散ってしまうはかなさの両方が強く意識されます。",
  },
  {
    name: "藤",
    href: "/plants/25",
    season: "晩春",
    key: "垂れる姿",
    note: "房のように下がる花が、風や衣のイメージと重ねられやすい花です。",
  },
  {
    name: "菖蒲",
    href: "/plants/95",
    season: "初夏",
    key: "水辺の景色",
    note: "水辺や湿地と結びつき、景色ごと詠まれやすい植物です。",
  },
  {
    name: "芒",
    href: "/plants/41",
    season: "秋",
    key: "風と月",
    note: "花そのものより、月光や秋風の中で揺れる姿が歌の中心になります。",
  },
] as const

export default function Page() {
  return (
    <ColumnArticle
      emoji="📜"
      title={title}
      subtitle="花の名を知ると、古い歌の景色が少しだけ立ち上がってきます"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="梅の花"
    >
      <ColumnIntro>
        {[
          "和歌には、たくさんの花や草木が出てきます。名前だけ見ると難しそうですが、実際には季節の知らせや、その場の空気を伝えるために植物が選ばれていることが多いです。",
          "たとえば梅は香りで春を告げ、桜は盛りと散り際で心の動きを映し、芒は秋風や月の景色と結びつきます。花の名前は、ただの飾りではなく、歌の気配そのものです。",
          "このコラムでは、和歌でくり返し詠まれてきた花や草木を、植物の特徴と季節感から読みやすく整理します。",
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

      <Section title="和歌の花は、季節の入口として使われる">
        <p style={body}>
          和歌で植物が大切なのは、花そのものが美しいからだけではありません。どの季節なのか、どんな場所なのか、どんな気持ちなのかを、短い言葉で一気に伝えられるからです。
        </p>
        <p style={body}>
          梅と書けば早春の冷たい空気が、桜と書けば盛りの春と散り際の気配が、芒と書けば月の出る秋の野が思い浮かびます。植物名は、歌の情景を開く合図のような役割を持っています。
        </p>
      </Section>

      <Section title="まず覚えたい、和歌の花たち">
        <p style={body}>
          和歌でよく詠まれる植物を、季節と印象のキーワードで並べると覚えやすくなります。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {wakaFlowers.map((flower) => (
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
                  display: "flex",
                  gap: "0.65rem",
                  alignItems: "baseline",
                  flexWrap: "wrap",
                  marginBottom: "0.35rem",
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
                <span style={{ color: "#e0e0e0", fontSize: "0.8rem" }}>
                  {flower.season} / {flower.key}
                </span>
              </div>
              <div style={{ color: "#aaa", fontSize: "0.82rem", lineHeight: 1.7 }}>
                {flower.note}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="梅は、春を待つ心とよく結びつく">
        <p style={body}>
          <Link href="/plants/16" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ウメ
          </Link>
          は、まだ寒さが残るうちに咲き、香りが先に春を知らせる花です。そのため和歌では、見た目だけでなく香りや、春を待つ心と一緒に詠まれることが多くなります。
        </p>
        <p style={body}>
          桜より先に咲くことで、「春の最初のしるし」として扱われやすいのも梅の特徴です。花そのものの華やかさより、静かな気品や気配が前に出る花だと言えます。
        </p>
      </Section>

      <Section title="桜は、咲くことと散ることの両方が歌になる">
        <p style={body}>
          <Link href="/plants/1" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ソメイヨシノ
          </Link>
          に代表される桜は、和歌では春の中心に置かれる花です。ただし、そこで大切なのは「きれいに咲いている」ことだけではありません。
        </p>
        <p style={body}>
          満開の盛りも、風に散る瞬間も、花が終わったあとに残る余韻も、すべて歌の題材になります。和歌の桜は、見ごろの花というより、「移ろっていく春そのもの」を映す植物です。
        </p>
      </Section>

      <Section title="藤や菖蒲は、景色の中で映える花">
        <p style={body}>
          <Link href="/plants/25" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            フジ
          </Link>
          は、房のように垂れる姿が大きな特徴です。風に揺れる様子や、長く下がる形が、衣や髪、たおやかな動きと重ねられやすく、晩春のやさしい景色をつくります。
        </p>
        <p style={body}>
          一方、
          <Link href="/plants/95" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            アヤメ
          </Link>
          や
          <Link href="/plants/94" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            カキツバタ
          </Link>
          のような菖蒲の仲間は、水辺や湿地と結びついた景色の中で印象づけられます。和歌では花だけを切り出すより、橋や水面、初夏の空気と一緒に読まれることが多い植物です。
        </p>
      </Section>

      <Section title="秋の歌では、芒や萩が風や月を呼び込む">
        <p style={body}>
          秋の和歌では、花そのものの色よりも、風に揺れる姿や月との取り合わせが大切になります。
          <Link href="/plants/41" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ススキ
          </Link>
          はその代表で、穂が風を受けてなびくことで、目に見えない秋の気配を見せてくれます。
        </p>
        <p style={body}>
          萩もまた秋を代表する植物ですが、こちらは細い枝と小さな花のやさしさが印象的です。秋の植物は、梅や桜のように花の盛りを強く押し出すというより、少し寂しい空気や余白のある景色を歌に運び込みます。
        </p>
      </Section>

      <Section title="花の名前を知ると、古典の読み方がやさしくなる">
        <p style={body}>
          和歌に出てくる花は、古典の知識がないとわからない特別な記号ではありません。実際の植物の咲く時期や姿を知っていれば、歌の景色はかなり素直に読めるようになります。
        </p>
        <p style={body}>
          まずは梅なら早春、桜なら盛春、藤なら晩春、芒なら秋の月、というように、植物ごとの季節の置き場所を覚えるのがおすすめです。そこから、香り、散り際、風、水辺といった印象を足していくと、和歌の言葉がぐっと立体的に見えてきます。
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
          花の名前を暗記するより、「どの季節に、どんな見え方をする花か」をつかむほうが、和歌も植物も一緒に覚えやすくなります。
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
        <Link href="/columns/hanafuda-plants" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：花札に描かれている植物 →
        </Link>
      </div>
    </ColumnArticle>
  )
}

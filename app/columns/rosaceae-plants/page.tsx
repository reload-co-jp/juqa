import { PlantCard } from "components/elements/ColumnComponents"
import type { Metadata } from "next"
import Link from "next/link"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/rosaceae-plants/`
const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/6/61/Rosa_canina1.jpg"

export const metadata: Metadata = {
  title: "バラ科の植物たち",
  keywords: [
    "バラ科",
    "サクラ",
    "ウメ",
    "リンゴ",
    "ビワ",
    "ノイバラ",
    "ハマナス",
    "バラ科の見分け方",
    "Rosaceae",
  ],
  description:
    "サクラ・ウメ・リンゴ・ビワ・ノイバラ……実は身の回りに多いバラ科の植物。共通の特徴（5枚の花弁・花托・ギザギザ葉）を覚えると、野山でも食卓でも「バラ科っぽい」とすぐ気づけるようになります。",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "バラ科の植物たち | ジュカ！",
    description:
      "サクラ・ウメ・リンゴ・ビワ・ノイバラ……実は身の回りに多いバラ科の植物。共通の特徴（5枚の花弁・花托・ギザギザ葉）を覚えると、野山でも食卓でも「バラ科っぽい」とすぐ気づけるようになります。",
    url: pageUrl,
    type: "article",
    images: [{ url: ogImage, alt: "ノイバラ（バラ科）の花" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "バラ科の植物たち | ジュカ！",
    description:
      "サクラ・リンゴ・ビワ・ノイバラ……身近な植物の多くがバラ科。共通の特徴を覚えれば野山で「あ、バラ科だ」とすぐわかる。",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": pageUrl,
  url: pageUrl,
  headline: "バラ科の植物たち",
  description:
    "サクラ・ウメ・リンゴ・ビワ・ノイバラ……実は身の回りに多いバラ科の植物。共通の特徴（5枚の花弁・花托・ギザギザ葉）を覚えると、野山でも食卓でも「バラ科っぽい」とすぐ気づけるようになります。",
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
          style={{
            color: "#7cbe8c",
            fontSize: "0.85rem",
            textDecoration: "none",
          }}
        >
          ← トップへ
        </Link>
      </div>

      {/* ヘッダー */}
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
          🌹 コラム
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
          バラ科の植物たち
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          サクラもリンゴもビワも同じ仲間——意外と身近な「バラ科」を知ろう
        </p>
      </div>

      {/* ヒーロー画像 */}
      <div
        style={{
          marginBottom: "2rem",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <img
          src={ogImage}
          alt="ノイバラ（バラ科）の花"
          style={{
            width: "100%",
            height: "240px",
            objectFit: "cover",
            display: "block",
          }}
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

      {/* イントロ */}
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
          "春には桜、梅。夏にはバラ。秋にはリンゴやナシ。食卓にはビワやアンズ……。気づいていないかもしれないが、これらはすべて「バラ科」という同じグループの植物だ。",
          "バラ科は世界に約3000種が分布する大きな仲間で、花木・果樹・山野草を含む非常に多様なグループ。しかし、よく観察すると「5枚の花弁」「多数のおしべ」「ギザギザの葉」といった共通点が見えてくる。",
          "このコラムではバラ科の共通の特徴をおさえつつ、身近な花木・果樹・野山の草花に分けて代表種を紹介する。一度覚えると、街でも山でも「あ、これもバラ科だ」と気づく瞬間が増えてくる。",
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

      {/* バラ科の共通の特徴 */}
      <Section title="バラ科に共通する3つの特徴">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          「バラ科かも？」と思ったらこの3点をチェックしよう。すべて揃えば、ほぼバラ科と判断できる。
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {[
            {
              label: "花弁は5枚（または5の倍数）",
              desc: "サクラもバラもウメも、花びらの数は基本5枚。八重咲き品種は5の倍数に変化していることが多い。",
              color: "#3d1f2a",
              border: "#7a4a5a",
            },
            {
              label: "おしべが多数ある",
              desc: "花の中心をよく見ると、おしべが20〜100本と非常に多い。これもバラ科の大きな特徴。",
              color: "#1e3d1f",
              border: "#5a9a5c",
            },
            {
              label: "葉にギザギザ（鋸歯）がある",
              desc: "葉の縁が細かくギザギザしているものが多い。葉柄のつけ根に「托葉」と呼ばれる小さな付属物があることも多い。",
              color: "#2a2a1a",
              border: "#7a7a4a",
            },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                background: f.color,
                border: `1px solid ${f.border}`,
                borderRadius: "8px",
                padding: "0.875rem",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color: "#e0e0e0",
                  marginBottom: "0.3rem",
                }}
              >
                {f.label}
              </div>
              <div
                style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.6 }}
              >
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 花木の代表 */}
      <Section title="花木の代表たち — サクラ・ウメ・モモ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          日本の春を彩る花木のほとんどがバラ科。サクラ属の仲間だけで日本に100種以上が自生または栽培されている。
        </p>
        <PlantCard
          name="ソメイヨシノ"
          href="/plants/1"
          points={[
            "葉より先に花が咲く（3〜4月）",
            "花弁は5枚、淡いピンク〜白色",
            "樹皮に横縞（皮目）がある",
            "江戸時代末期に作出されたエドヒガンとオオシマザクラの雑種",
          ]}
          tip="花が葉より先に咲いていればソメイヨシノかエドヒガン系。桜の多くは葉と同時か葉の後に咲く。"
        />
        <PlantCard
          name="ウメ"
          href="/plants/16"
          points={[
            "サクラより早く咲く（1〜3月）",
            "花は枝に直接つき、花柄がほとんどない",
            "花に甘い香りがある",
            "果実は梅干し・梅酒に使われる核果",
          ]}
          tip="梅かサクラか迷ったら「香り」を確認。よい香りがすればウメ。咲く時期も早い。"
        />
        <PlantCard
          name="ヤマザクラ"
          href="/plants/17"
          points={[
            "花と赤みがかった若葉が同時に展開する",
            "花弁は白〜淡いピンク",
            "山地の自然林に自生する野生のサクラ",
            "ソメイヨシノより遅めに開花",
          ]}
          tip="花と赤い葉が同時に出ていればヤマザクラ。ソメイヨシノとの見分けの決め手。"
        />
        <PlantCard
          name="ハナモモ"
          href="/plants/174"
          points={[
            "鮮やかな桃色・白・絞り模様の花が咲く（3〜4月）",
            "ひなまつりの飾りとして有名",
            "花が多数並んで咲き、ボリュームがある",
            "果実は食用のモモとは品種が異なる観賞用",
          ]}
          tip="濃いピンクで花がびっしりついているサクラ科の木はハナモモの可能性が高い。"
        />
      </Section>

      {/* 果樹 */}
      <Section title="食卓に並ぶ果樹 — リンゴ・ナシ・ビワ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          スーパーで見かける果物の多くがバラ科。果実の構造も共通点があり、ほとんどは「偽果」（花托が発達したもの）だ。
        </p>
        <PlantCard
          name="リンゴ"
          href="/plants/170"
          points={[
            "春に白〜淡いピンクの5弁花を咲かせる",
            "果実は花托が発達した偽果（ナシ・カリンも同様）",
            "葉は楕円形で細かい鋸歯がある",
            "冷涼な気候を好み、長野・青森が主産地",
          ]}
          tip="リンゴの「お尻」のくぼみにある小さな突起はがくの名残。バラ科の果実によく見られる。"
        />
        <PlantCard
          name="ビワ"
          href="/plants/171"
          points={[
            "冬（11〜2月）に白い小花が集まった円錐花序を出す（バラ科では珍しい冬開花）",
            "大きな革質の葉（長さ15〜30cm）で裏面に褐色の毛が密生する",
            "初夏（5〜6月）に橙黄色の楕円形の核果をつける",
            "常緑で葉が厚く光沢がある",
          ]}
          tip="冬に白い花が咲く常緑の大きな葉の木はビワ。バラ科のなかでも異色の冬開花組。"
        />
        <PlantCard
          name="アンズ"
          href="/plants/173"
          points={[
            "ウメよりやや遅く咲く（3月頃）",
            "花はウメに似た5弁の白〜淡いピンク",
            "果実はジャムや杏仁豆腐の原料",
            "種（仁）に香りがあり、漢方薬（杏仁）にも使われる",
          ]}
          tip="ウメに似た花で果実がオレンジ色になればアンズ。種の周りに独特の甘い香りがある。"
        />
      </Section>

      {/* 野山で見られる仲間 */}
      <Section title="野山で出会う仲間 — ノイバラ・ハマナス・ヤマブキ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          栽培植物だけではない。山野草・低木にもバラ科の仲間は多く、トゲをもつものが目立つ。
        </p>
        <PlantCard
          name="ノイバラ"
          href="/plants/18"
          points={[
            "5〜6月に白い小さな5弁花を咲かせる野生のバラ",
            "茎にトゲがあり、他の植物に絡みついて伸びる",
            "秋に赤い小さな実（偽果）をつける",
            "園芸バラの台木（接ぎ木の土台）として広く使われる",
          ]}
          tip="道端や林縁でトゲのある低木に小さな白い5弁花がついていればノイバラ。"
        />
        <PlantCard
          name="ハマナス"
          href="/plants/172"
          points={[
            "海岸の砂地に生える低木",
            "花は大きくて鮮やかなピンク色（5〜8月）、香りが強い",
            "秋に赤いトマトのような丸い実をつける（ビタミンCが豊富）",
            "北海道・東北の海岸に自生する",
          ]}
          tip="海岸近くでピンクの大きな5弁花とトゲのある低木を見かけたらハマナス。実は食べられる。"
        />
        <PlantCard
          name="ヤマブキ"
          href="/plants/113"
          points={[
            "鮮やかな黄色い5弁花を咲かせる（4〜5月）",
            "細い枝が垂れ下がり、やわらかい印象",
            "「七重八重 花は咲けども 山吹の…」と古歌にも詠まれる",
            "八重咲き品種（ヤエヤマブキ）は実をつけない",
          ]}
          tip="黄色い花を咲かせる「バラ科の低木」はほぼヤマブキ。バラ科で黄色い花は珍しい。"
        />
        <PlantCard
          name="ナナカマド"
          href="/plants/74"
          points={[
            "5〜6月に白い小花が集まった複散房花序を出す",
            "秋に橙赤色の小さな実が鈴なりになる",
            "羽状複葉（小葉が対になって並ぶ）が特徴的",
            "木が堅く、七回かまどに入れても燃え残るという伝説が名前の由来",
          ]}
          tip="秋に橙赤色の小さな実が房なりについている落葉高木はナナカマド。山でよく見かける。"
        />
      </Section>

      {/* 一覧表 */}
      <Section title="バラ科の代表種を一覧で整理">
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
                {["種名", "グループ", "花の色・時期", "識別ポイント"].map(
                  (h) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "ソメイヨシノ",
                  href: "/plants/1",
                  group: "花木",
                  flower: "白〜淡ピンク・3〜4月",
                  point: "葉より先に開花",
                },
                {
                  name: "ウメ",
                  href: "/plants/16",
                  group: "花木・果樹",
                  flower: "白〜ピンク・1〜3月",
                  point: "香りが強い・花柄が短い",
                },
                {
                  name: "ヤマザクラ",
                  href: "/plants/17",
                  group: "花木",
                  flower: "白〜淡ピンク・4月",
                  point: "花と赤い若葉が同時",
                },
                {
                  name: "ハナモモ",
                  href: "/plants/174",
                  group: "花木",
                  flower: "濃ピンク〜白・3〜4月",
                  point: "花が枝いっぱいに密集",
                },
                {
                  name: "リンゴ",
                  href: "/plants/170",
                  group: "果樹",
                  flower: "白〜淡ピンク・4〜5月",
                  point: "果実のお尻ながく残る",
                },
                {
                  name: "ビワ",
                  href: "/plants/171",
                  group: "果樹",
                  flower: "白・11〜2月（冬）",
                  point: "常緑・大きな革質葉",
                },
                {
                  name: "アンズ",
                  href: "/plants/173",
                  group: "果樹",
                  flower: "白〜淡ピンク・3月",
                  point: "果実がオレンジ色",
                },
                {
                  name: "ノイバラ",
                  href: "/plants/18",
                  group: "野生低木",
                  flower: "白・5〜6月",
                  point: "トゲあり・赤い小果実",
                },
                {
                  name: "ハマナス",
                  href: "/plants/172",
                  group: "野生低木",
                  flower: "濃ピンク・5〜8月",
                  point: "海岸砂地・赤く丸い実",
                },
                {
                  name: "ヤマブキ",
                  href: "/plants/113",
                  group: "野生低木",
                  flower: "黄・4〜5月",
                  point: "バラ科で黄花は珍しい",
                },
                {
                  name: "ナナカマド",
                  href: "/plants/74",
                  group: "落葉高木",
                  flower: "白・5〜6月",
                  point: "羽状複葉・橙赤色の実",
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
                  <td
                    style={{
                      padding: "0.6rem 0.75rem",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    {row.group}
                  </td>
                  <td
                    style={{
                      padding: "0.6rem 0.75rem",
                      borderBottom: "1px solid #333",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.flower}
                  </td>
                  <td
                    style={{
                      padding: "0.6rem 0.75rem",
                      borderBottom: "1px solid #333",
                    }}
                  >
                    {row.point}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 豆知識 */}
      <Section title="覚えておきたい豆知識">
        {[
          {
            title: "リンゴもナシも「偽果」",
            body: "リンゴやナシの食べる部分は果実そのものではなく、花托（かたく）という花の土台が発達したもの。本当の果実は中心の「芯」の部分。バラ科では花托が実に変化するものが多い。",
          },
          {
            title: "「バラ科」は食用植物の宝庫",
            body: "イチゴ・モモ・サクランボ・スモモ・アンズ・リンゴ・ナシ・ビワ・カリンなど、多くの果物がバラ科に属する。食用のバラ科植物は農業上も非常に重要なグループだ。",
          },
          {
            title: "バラのトゲは「刺」ではなく「皮刺」",
            body: "バラのとがった突起は、茎の表皮が変化した「皮刺（ひし）」と呼ばれる。サボテンの「刺」（葉が変化したもの）とは異なり、引っ張ると剥がれやすい。ノイバラやハマナスにも同じ皮刺がある。",
          },
          {
            title: "サクラとウメの見分け方",
            body: "慣れない人がよく迷うサクラとウメの見分け方。花びらを見ると、先が丸くてくぼんでいればサクラ、先が丸くてくぼみがなければウメ。花の時期はウメが早く（1〜3月）、サクラが後（3〜4月）。",
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

      {/* 関連リンク */}
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
        <Link
          href="/families/1"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          バラ科の植物一覧を見る →
        </Link>
        <Link
          href="/columns/spring-mountain-flowers"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：春の登山で見られる花特集 →
        </Link>
        <Link
          href="/columns"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          コラム一覧へ →
        </Link>
      </div>
    </div>
  )
}

export default Page

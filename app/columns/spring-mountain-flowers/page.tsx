import type { Metadata } from "next"
import Link from "next/link"
import { plants } from "lib/data"

const getPlantImageUrl = (href: string): string | undefined => {
  const id = Number(href.split("/").pop())
  return plants.find((p) => p.id === id)?.image_url
}

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/spring-mountain-flowers/`
const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/e/eb/Erythronium_japonicum_2006_005.jpg"

export const metadata: Metadata = {
  title: "春の登山で見られる花特集",
  keywords: ["春の山野草", "登山", "スプリングエフェメラル", "カタクリ", "ニリンソウ", "ショウジョウバカマ", "春の花", "山野草"],
  description:
    "春の登山で出会える花々を特集。カタクリ・ニリンソウ・ショウジョウバカマなど、山にしか咲かない花を見分けるコツや、スプリングエフェメラルの魅力を解説します。",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "春の登山で見られる花特集 | ジュカ！",
    description:
      "春の登山で出会える花々を特集。カタクリ・ニリンソウ・ショウジョウバカマなど、山にしか咲かない花を見分けるコツや、スプリングエフェメラルの魅力を解説します。",
    url: pageUrl,
    type: "article",
    images: [{ url: ogImage, alt: "カタクリの花" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "春の登山で見られる花特集 | ジュカ！",
    description:
      "カタクリ・ニリンソウなど、春の山でしか出会えない花の見分け方と魅力を解説します。",
    images: [ogImage],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": pageUrl,
  url: pageUrl,
  headline: "春の登山で見られる花特集",
  description:
    "春の登山で出会える花々を特集。カタクリ・ニリンソウ・ショウジョウバカマなど、山にしか咲かない花を見分けるコツや、スプリングエフェメラルの魅力を解説します。",
  image: ogImage,
  inLanguage: "ja",
  isPartOf: { "@id": `${siteUrl}/columns/` },
  publisher: {
    "@type": "Organization",
    name: "Reload, Inc.",
    url: "https://reload.co.jp",
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

const FlowerCard = ({
  name,
  href,
  bloomTime,
  habitat,
  points,
  tip,
}: {
  name: string
  href: string
  bloomTime: string
  habitat: string
  points: string[]
  tip: string
}) => {
  const imageUrl = getPlantImageUrl(href)
  return (
  <div
    style={{
      background: "#242424",
      borderRadius: "8px",
      overflow: "hidden",
      marginBottom: "0.75rem",
    }}
  >
    {imageUrl && (
      <Link href={href} style={{ display: "block" }}>
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Link>
    )}
    <div style={{ padding: "1rem" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexWrap: "wrap",
        marginBottom: "0.75rem",
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
      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
        <span
          style={{
            background: "#1e3d1f",
            color: "#a0d0a2",
            borderRadius: "4px",
            padding: "0.1rem 0.5rem",
            fontSize: "0.72rem",
          }}
        >
          {bloomTime}
        </span>
        <span
          style={{
            background: "#2a2a3a",
            color: "#9090c0",
            borderRadius: "4px",
            padding: "0.1rem 0.5rem",
            fontSize: "0.72rem",
          }}
        >
          {habitat}
        </span>
      </div>
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
  </div>
  )
}

const Page = () => {
  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", color: "#e0e0e0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* パンくず */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/"
          style={{ color: "#7cbe8c", fontSize: "0.85rem", textDecoration: "none" }}
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
          春の登山で見られる花特集
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          雪解けとともに山が色づく——登山道で出会える春の花を一挙紹介
        </p>
      </div>

      {/* ヒーロー画像 */}
      <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <img
          src={ogImage}
          alt="カタクリの花"
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
          "「この花、なんだろう？」——春の山道を歩いていると、足元に見慣れない花が咲いていることがある。里では見かけない、山ならではの色とかたち。名前も知らずに通り過ぎてしまうのはちょっともったいない。",
          "実は春の山には、短い季節だけに命を燃やす花たちがいる。「スプリング・エフェメラル（春の妖精）」と呼ばれる植物がその代表で、雪が解けた直後に咲き始め、木々が葉を茂らせる前にあっという間に地上から姿を消す。",
          "登山ルートや標高によって出会える花は変わってくる。この記事では、日本の春の山でよく見られる花を場所・時期別に紹介する。次の登山の「お供」にしてみてほしい。",
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

      {/* スプリングエフェメラルとは */}
      <Section title="スプリング・エフェメラルとは">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          「エフェメラル（ephemeral）」とは「はかない・一時的な」という意味。スプリング・エフェメラルは、春だけ地上に現れ、夏には地下に引っ込んでしまう植物のことを指します。
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          {[
            {
              label: "なぜ春だけ？",
              desc: "落葉樹の葉が茂る前の短い期間、林床に光が差し込む。その光を最大限に利用して一気に花を咲かせ、種を作る。",
              color: "#1e3a1e",
              border: "#4a8a4a",
            },
            {
              label: "夏に消えるのは？",
              desc: "葉が生い茂ると林床が暗くなる。光合成できなくなる前に地上部を枯らし、栄養を球根や地下茎に蓄えて翌春に備える。",
              color: "#1a2d3a",
              border: "#3a6a8a",
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
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          つまり「春にしか会えない花」は、見られる時期がとても短い。3月下旬〜5月上旬の登山シーズン初期が狙い目です。
        </p>
      </Section>

      {/* 低山・里山（標高500m以下）の花 */}
      <Section title="低山・里山（〜500m）で出会える花">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          3月下旬〜4月中旬、ふもとの山では早くも春の花が咲き始めます。
        </p>
        <FlowerCard
          name="カタクリ"
          href="/plants/42"
          bloomTime="3〜4月"
          habitat="落葉広葉樹林の林床"
          points={[
            "紫紅色の花弁が反り返り、下向きに咲く独特の姿",
            "葉に紫褐色の雲状の斑点がある",
            "葉は2枚のみ。花後に葉も枯れ地上から消える",
            "群生地では一面に紫の絨毯が広がる",
          ]}
          tip="斜面に広がる落葉樹林の林床を探そう。雪解け後の3月末〜4月が見頃。"
        />
        <FlowerCard
          name="タチツボスミレ"
          href="/plants/33"
          bloomTime="3〜5月"
          habitat="林縁・道端・草地"
          points={[
            "淡紫色の5弁花で、距（きょ）が白いのが特徴",
            "茎が立ち上がり、葉は心形",
            "日当たりの良い林縁や山道の脇に多い",
            "スミレの中で最も広く分布する普通種",
          ]}
          tip="登山口周辺の道端でよく見かける。紫色の小さな花を探すとすぐ見つかる。"
        />
        <FlowerCard
          name="ヤマザクラ"
          href="/plants/17"
          bloomTime="3〜4月"
          habitat="山地の落葉広葉樹林"
          points={[
            "花と葉がほぼ同時に展開（ソメイヨシノは花が先）",
            "葉は赤みを帯びて開く",
            "花は白〜淡紅色で5弁",
            "自生する野生の桜。山の中腹にポツポツと白く咲く",
          ]}
          tip="里のソメイヨシノが散り始める頃、山の中腹で咲き出す。葉が一緒に出るのが見分けのポイント。"
        />
        <FlowerCard
          name="エンレイソウ"
          href="/plants/163"
          bloomTime="4〜6月"
          habitat="落葉広葉樹林の林床"
          points={[
            "大きな3枚の葉が輪生し、中央から花茎が1本出る",
            "暗紫褐色の花弁3枚と緑色の萼片3枚が交互につく",
            "「延齢草」と書き、薬用植物として古くから知られる",
            "カタクリ・ニリンソウと同じ時期に林床に咲く",
          ]}
          tip="林床で3枚の大きな葉が車輪状に広がっていたらエンレイソウ。中央に暗い色の小さな花をつける。"
        />
      </Section>

      {/* 中山帯（500〜1500m）の花 */}
      <Section title="中山帯（500〜1500m）で出会える花">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          4月〜5月、標高500〜1500m前後の登山道では多彩な春の花に出会えます。
        </p>
        <FlowerCard
          name="ニリンソウ"
          href="/plants/65"
          bloomTime="4〜5月"
          habitat="山地の林縁・谷沿い"
          points={[
            "白い花を2輪（まれに1〜3輪）咲かせる",
            "花弁に見えるのは萼片で5〜7枚",
            "谷沿いや湿った林縁に大群落を作る",
            "若葉は山菜になるが、毒草のトリカブトと混同注意",
          ]}
          tip="沢沿いの湿った場所を歩いていると白い花の群落に出会う。2輪の花茎が特徴的。"
        />
        <FlowerCard
          name="キクザキイチゲ"
          href="/plants/66"
          bloomTime="3〜5月"
          habitat="山地の林内"
          points={[
            "菊に似た白〜淡青紫色の花を1輪咲かせる",
            "萼片は細く8〜13枚、花弁はない",
            "雪解け直後から咲き始めるスプリングエフェメラル",
            "北海道・東北・中部の山地に多い",
          ]}
          tip="東北や北海道の山では雪解け直後から林内に咲く。青紫がかった花色が目を引く。"
        />
        <FlowerCard
          name="ショウジョウバカマ"
          href="/plants/67"
          bloomTime="3〜5月"
          habitat="山地の湿地・林縁・沢沿い"
          points={[
            "桃〜淡紫色の小花を穂状に咲かせる",
            "根生葉はへら形で光沢があり、ロゼット状に広がる",
            "沢沿いや雪解け直後の湿地に多い",
            "葉の先端にムカゴをつけることがある",
          ]}
          tip="沢沿いや雪田周辺を歩くと、ピンク色の小さな穂が地面から伸びているのを見つけられる。"
        />
        <FlowerCard
          name="ヤマエンゴサク"
          href="/plants/165"
          bloomTime="3〜5月"
          habitat="山地の落葉林の林床"
          points={[
            "紫〜紅紫色の筒状花で先端が唇形、後方に細長い距がある",
            "葉は羽状または掌状に深く切れ込む",
            "カタクリ・ニリンソウと同じ林床に群生することが多い",
            "夏には地上部が消えるスプリングエフェメラル",
          ]}
          tip="紫色の小さな筒状花が林床に集まっていたらヤマエンゴサク。距（後ろに突き出た袋）を確認しよう。"
        />
        <FlowerCard
          name="イカリソウ"
          href="/plants/167"
          bloomTime="4〜5月"
          habitat="山地の林縁・林床"
          points={[
            "花弁4枚に長い距が4本突き出し、船の錨（いかり）のような形",
            "花色は白・淡紫・紫・黄など変異が多い",
            "葉はハート形の小葉からなる複葉",
            "強壮薬として古くから利用されてきた",
          ]}
          tip="独特の錨形の花は他の植物と混同しにくい。林縁の日陰でぶら下がるように咲いているのを探そう。"
        />
        <FlowerCard
          name="チゴユリ"
          href="/plants/168"
          bloomTime="4〜6月"
          habitat="山地の落葉林の林床"
          points={[
            "白い小さな筒状の花を茎の先に1〜2輪、下向きに咲かせる",
            "茎は上部で2本に分岐するのが特徴",
            "葉は広卵形で互生し、平行脈がはっきりしている",
            "秋に黒い小さな実をつける",
          ]}
          tip="林床でひっそりと下向きに咲く白い小花。茎がY字に分岐しているのが見分けのポイント。"
        />
      </Section>

      {/* 亜高山帯（1500〜2500m）の花 */}
      <Section title="亜高山帯・高山（1500m〜）で出会える花">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          5月〜6月、残雪が残る高標高帯では、標高ならではの花に出会えます。
        </p>
        <FlowerCard
          name="イワカガミ"
          href="/plants/130"
          bloomTime="5〜7月"
          habitat="亜高山帯〜高山帯"
          points={[
            "桃〜紅紫色の花が下向きに咲く（花弁の先が細かく裂ける）",
            "葉は光沢があり丸みを帯びた常緑性（鏡に例えた名前の由来）",
            "岩場や稜線の草地に生える",
            "高山帯ではコイワカガミ（やや小型）が多い",
          ]}
          tip="稜線の岩場や登山道脇の斜面で、光沢のある丸い葉を見つけたらイワカガミ。桃色の花が添えていれば確定。"
        />
        <FlowerCard
          name="フクジュソウ"
          href="/plants/116"
          bloomTime="2〜4月（山地では雪解け後）"
          habitat="山地の林縁・斜面"
          points={[
            "鮮やかな黄色い花で、花が先に咲いて葉があとから出る",
            "花弁は光沢があり、日光を集めて虫を温める",
            "羽状に細かく分かれた葉",
            "山地では雪の下から顔を出すように咲く",
          ]}
          tip="山の南斜面で早春に黄色い花を見つけたらフクジュソウの可能性が高い。葉より花が先に出るのが目印。"
        />
        <FlowerCard
          name="サンカヨウ"
          href="/plants/164"
          bloomTime="5〜7月"
          habitat="亜高山帯の林縁・沢沿い"
          points={[
            "白い6弁花を数輪咲かせる",
            "雨に濡れると花弁が透明になる幻想的な性質をもつ",
            "大きな掌状の葉を2枚つけるのが特徴",
            "果実は藍色〜黒紫色の液果",
          ]}
          tip="雨の日の登山で出会えるかもしれない。濡れた白い花が透き通るように見えたらサンカヨウ。"
        />
        <FlowerCard
          name="シラネアオイ"
          href="/plants/166"
          bloomTime="5〜7月"
          habitat="亜高山帯〜高山帯の林縁・草地"
          points={[
            "淡紫〜紫色の大きな花（直径5〜8cm）で、花弁に見えるのは萼片4枚",
            "日本固有の1属1種。「高山植物の女王」と称される",
            "掌状に深く裂けるアオイに似た大きな葉が特徴",
            "北海道・東北・中部の高山帯に分布",
          ]}
          tip="大きな紫色の花が他の高山植物とは一線を画す存在感。葉の形がアオイ（葵）に似ていることも覚えておこう。"
        />
      </Section>

      {/* 標高別カレンダー */}
      <Section title="標高別の見頃カレンダー">
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
                {["花名", "標高目安", "見頃時期", "よく見る環境"].map((h) => (
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
                { name: "フクジュソウ", href: "/plants/116", alt: "〜500m", time: "2〜4月", env: "山地の南斜面" },
                { name: "タチツボスミレ", href: "/plants/33", alt: "〜700m", time: "3〜5月", env: "林縁・道端" },
                { name: "カタクリ", href: "/plants/42", alt: "〜1000m", time: "3〜4月", env: "落葉林の林床" },
                { name: "ヤマエンゴサク", href: "/plants/165", alt: "〜1000m", time: "3〜5月", env: "落葉林の林床" },
                { name: "ヤマザクラ", href: "/plants/17", alt: "〜1200m", time: "3〜4月", env: "山地の林" },
                { name: "エンレイソウ", href: "/plants/163", alt: "〜1500m", time: "4〜6月", env: "落葉林の林床" },
                { name: "イカリソウ", href: "/plants/167", alt: "〜1500m", time: "4〜5月", env: "山地の林縁・林床" },
                { name: "チゴユリ", href: "/plants/168", alt: "〜1500m", time: "4〜6月", env: "落葉林の林床" },
                { name: "キクザキイチゲ", href: "/plants/66", alt: "〜1500m", time: "3〜5月", env: "雪解け後の林内" },
                { name: "ニリンソウ", href: "/plants/65", alt: "〜1500m", time: "4〜5月", env: "谷沿い・湿地" },
                { name: "ショウジョウバカマ", href: "/plants/67", alt: "〜2000m", time: "3〜5月", env: "沢沿い・湿地" },
                { name: "イワカガミ", href: "/plants/130", alt: "1500m〜", time: "5〜7月", env: "岩場・稜線" },
                { name: "サンカヨウ", href: "/plants/164", alt: "1500m〜", time: "5〜7月", env: "亜高山帯の沢沿い" },
                { name: "シラネアオイ", href: "/plants/166", alt: "1500m〜", time: "5〜7月", env: "亜高山帯の林縁" },
              ].map((row, i) => (
                <tr
                  key={row.name}
                  style={{ background: i % 2 === 0 ? "#262626" : "#222" }}
                >
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    <Link href={row.href} style={{ color: "#7cbe8c", textDecoration: "none" }}>
                      {row.name}
                    </Link>
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.alt}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.time}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.env}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 注意事項 */}
      <Section title="山の花を楽しむときの注意点">
        {[
          {
            title: "採取は禁止——目で楽しむのがルール",
            body: "国立・国定公園内では植物の採取は法律で禁止されています。山の花は写真に収めるだけにして、その場に残しましょう。踏み荒らしにも注意が必要です。",
          },
          {
            title: "山菜と毒草の混同に注意",
            body: "ニリンソウの若葉はトリカブトと、フクジュソウはキクザキイチゲの葉と混同されることがあります。どちらも重篤な食中毒を起こす毒草です。食べる目的での採取は、確実に同定できる人と一緒に行いましょう。",
          },
          {
            title: "天気の変化に備える",
            body: "春の山は天候が変わりやすく、稜線では風も強い。花に見とれて道を外れたり、防寒具を忘れたりしないよう、装備はしっかり整えましょう。",
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
        <Link href="/plants?tags=%E6%98%A5%E9%96%8B%E8%8A%B1" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          春開花タグの植物を一覧で見る →
        </Link>
        <Link href="/plants?tags=%E5%B1%B1" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          山タグの植物を一覧で見る →
        </Link>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
      </div>
    </div>
  )
}

export default Page

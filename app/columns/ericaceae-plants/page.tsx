import type { Metadata } from "next"
import Link from "next/link"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/ericaceae-plants/`
const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/9/9c/Rhododendron_japonicum_01.jpg"

export const metadata: Metadata = {
  title: "ツツジ科の植物たち",
  keywords: [
    "ツツジ科",
    "ツツジ",
    "シャクナゲ",
    "アセビ",
    "ドウダンツツジ",
    "ブルーベリー",
    "Ericaceae",
    "ツツジの見分け方",
  ],
  description:
    "ヤマツツジ・サツキ・シャクナゲ・アセビ・ドウダンツツジ……春の山を彩るツツジ科の植物。漏斗形の花・10本のおしべ・酸性土壌を好む性質など、共通の特徴を覚えると見分け方が広がります。",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "ツツジ科の植物たち | ジュカ！",
    description:
      "ヤマツツジ・サツキ・シャクナゲ・アセビ・ドウダンツツジ……春の山を彩るツツジ科の植物。漏斗形の花・10本のおしべ・酸性土壌を好む性質など、共通の特徴を覚えると見分け方が広がります。",
    url: pageUrl,
    type: "article",
    images: [{ url: ogImage, alt: "レンゲツツジ（ツツジ科）の花" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ツツジ科の植物たち | ジュカ！",
    description:
      "ヤマツツジ・サツキ・シャクナゲ・アセビ……春の山で出会う花の多くがツツジ科。漏斗形の花と10本のおしべが目印。",
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

const PlantCard = ({
  name,
  href,
  id,
  points,
  tip,
}: {
  name: string
  href: string
  id: string
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
        gap: "1rem",
        marginBottom: "0.5rem",
      }}
    >
      <img
        src={`/images/plants/${id}-0.webp`}
        alt={name}
        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
      />
      <Link
        href={href}
        style={{
          fontWeight: "bold",
          color: "#7cbe8c",
          fontSize: "1.1rem",
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
  headline: "ツツジ科の植物たち",
  description:
    "ヤマツツジ・サツキ・シャクナゲ・アセビ・ドウダンツツジ……春の山を彩るツツジ科の植物。漏斗形の花・10本のおしべ・酸性土壌を好む性質など、共通の特徴を覚えると見分け方が広がります。",
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
          🌺 コラム
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
          ツツジ科の植物たち
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          春山を彩るツツジ・シャクナゲ・アセビ——その共通点を知ろう
        </p>
      </div>

      {/* ヒーロー画像 */}
      <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <img
          src={ogImage}
          alt="レンゲツツジ（ツツジ科）の花"
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
          "春の里山や高山を歩いていると、ピンクや白、朱赤の花を咲かせる低木によく出会います。「ツツジかな、サツキかな？」と迷いながら眺めた経験はないでしょうか。実はそれらのほとんどが「ツツジ科」という大きなグループに属する植物です。",
          "ツツジ科には世界で約4000種が含まれ、日本でも山の低木から高山の岩場まで幅広く分布しています。ツツジ・シャクナゲ・アセビ・ドウダンツツジ・サツキはもちろん、北国の食用植物であるブルーベリーやコケモモも同じ仲間です。",
          "このコラムでは、ツツジ科の共通する特徴をおさえつつ、代表的な種を花の形・咲く場所・葉の様子で整理します。一度覚えると、山歩きのたびに「あ、ツツジ科だ」と気づく楽しさが増してきます。",
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

      {/* ツツジ科の共通の特徴 */}
      <Section title="ツツジ科に共通する特徴">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          「ツツジ科かも？」と思ったら、以下の3点をチェックしてみましょう。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              label: "漏斗形（ろうとがた）または釣鐘形の花",
              desc: "花びらが合わさって筒状になる「合弁花」が多く、先端が5つに分かれます。ラッパ状に広がるものや、釣り下がった小さな壺形のものなど形はさまざまですが、花びらが独立しているバラ科とは区別できます。",
              color: "#2a1e3d",
              border: "#6a4a9a",
            },
            {
              label: "おしべは10本（花弁の数の2倍）",
              desc: "花弁が5枚なら、おしべは通常10本あります。おしべの先端（葯・やく）に穴が開いていて、そこから花粉が出る「孔開裂」という仕組みをもつ種が多いのも特徴です。",
              color: "#1e3d1f",
              border: "#5a9a5c",
            },
            {
              label: "酸性土壌を好む木本（もくほん）が多い",
              desc: "ツツジ科の多くは酸性の土壌でよく育ちます。火山地帯の山や、腐葉土が積もった林床に多いのはこのためです。また、常緑のものは葉が厚くて革質（かわ質）になる傾向があります。",
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
              <div style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.6 }}>
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ツツジ属の代表 */}
      <Section title="ツツジ属の代表たち — ヤマツツジ・ミツバツツジ・サツキ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          ツツジ科の中で最大のグループがツツジ属（Rhododendron）です。シャクナゲも同じ属に含まれ、日本だけで数十種が自生しています。
        </p>
        <PlantCard
          name="ヤマツツジ"
          href="/plants/209"
          id="209"
          points={[
            "日本で最も広く自生するツツジ（4〜6月開花）",
            "朱赤色〜橙赤色の漏斗形の花を咲かせる",
            "葉は2型（大きい春葉と越冬する小さい秋葉）をもつ半常緑性",
            "おしべは5本（ミツバツツジの10本と区別できる）",
          ]}
          tip="野山で朱赤色のツツジを見かけたらまずヤマツツジを疑いましょう。おしべが5本なのも識別のポイントです。"
        />
        <PlantCard
          name="ミツバツツジ"
          href="/plants/199"
          id="199"
          points={[
            "花が咲いてから葉が展開する（春、4〜5月）",
            "枝先に3枚の葉が輪生状に集まるのが名前の由来",
            "淡紫紅色の花を咲かせ、おしべは10本",
            "山地の明るい林縁や尾根によく生える",
          ]}
          tip="葉より先に紫がかったピンクの花が咲き、枝先に3枚葉が集まっていればミツバツツジです。"
        />
        <PlantCard
          name="サツキ"
          href="/plants/153"
          id="153"
          points={[
            "5〜6月に開花し、ツツジより約1ヶ月遅い（「皐月＝5月」が名の由来）",
            "葉は小さく硬くて光沢があり、縁に細かい毛が生える",
            "自然では渓谷沿いの岩場に生える半常緑低木",
            "公園の刈込み生垣として全国で広く植えられている",
          ]}
          tip="ツツジとサツキは似ていますが、開花時期で区別できます。ゴールデンウィーク頃が満開ならツツジ、梅雨前後ならサツキです。"
        />
        <PlantCard
          name="レンゲツツジ"
          href="/plants/200"
          id="200"
          points={[
            "5〜6月に橙赤色の大きな花を咲かせる",
            "高原・草原・山地の明るい場所に群生する",
            "葉・茎・花にグラヤノトキシンという毒素を含む（牛馬は食べない）",
            "霧ヶ峰・尾瀬・蔵王など高原の景観植物として有名",
          ]}
          tip="高原で橙赤色の大きなツツジが群生していたらレンゲツツジです。美しいですが、毒があるので口にしないようにしましょう。"
        />
      </Section>

      {/* シャクナゲ */}
      <Section title="シャクナゲの仲間 — 山岳を彩る大型花">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          シャクナゲ類はツツジ属の中でも特に花が大きく、常緑で厚い葉をもつグループです。山岳地帯の「花の女王」とも称されます。
        </p>
        <PlantCard
          name="ホンシャクナゲ"
          href="/plants/207"
          points={[
            "5〜6月に淡いピンク〜白の大きな花を咲かせる",
            "葉は長さ10〜20cmの大型革質で、裏面に淡褐色の綿毛が密生",
            "日本のシャクナゲ類の代表的な種",
            "「シャクナゲ」として流通する植物のほとんどがこの種かその近縁種",
          ]}
          tip="大きな革質の葉と房状に集まった大輪の花がシャクナゲの目印。山中腹の常緑低木として存在感があります。"
        />
        <PlantCard
          name="ハクサンシャクナゲ"
          href="/plants/206"
          points={[
            "亜高山帯〜高山帯に分布し、7〜8月と遅い時期に開花",
            "白〜淡紅色の花を咲かせ、日本産シャクナゲ類で最も遅く咲く",
            "ホンシャクナゲよりも高所に生え、葉がやや小さい",
            "白山（石川県）が名前の由来",
          ]}
          tip="夏山の稜線や亜高山帯でシャクナゲに出会ったらハクサンシャクナゲの可能性が高いです。開花は真夏です。"
        />
      </Section>

      {/* アセビ・ドウダンツツジ */}
      <Section title="壺形の花を咲かせる仲間 — アセビ・ドウダンツツジ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          ツツジ属以外にも、壺（つぼ）や釣り鐘のような形の小さな花を垂らすグループがツツジ科には多くいます。
        </p>
        <PlantCard
          name="アセビ"
          href="/plants/114"
          points={[
            "早春（2〜4月）に白い小さな壺形の花を房状に垂らす",
            "葉は濃緑色で光沢があり、革質・常緑",
            "全草に有毒成分（アセボトキシン）を含み、馬が食べると酔う（「馬酔木」の字の由来）",
            "山地の林縁によく自生し、庭木としても広く植えられる",
          ]}
          tip="早春に白い小さな壺形の花が下向きに並んでいたらアセビです。花の形が特徴的なので覚えやすいでしょう。"
        />
        <PlantCard
          name="ドウダンツツジ"
          href="/plants/128"
          points={[
            "4月頃に白い釣鐘形の小花を枝いっぱいに垂らす",
            "秋には鮮やかに紅葉する（赤・橙・黄）",
            "落葉性の低木で、刈込みに強く生垣や庭木に多用される",
            "「灯台躑躅」の名の由来は、枝の分岐がかつての照明器具「結び灯台」に似ることから",
          ]}
          tip="春に白い釣鐘型の花が垂れ下がり、秋に鮮やかに紅葉する生垣の木はドウダンツツジです。街中でもよく見かけます。"
        />
        <PlantCard
          name="ツリガネツツジ"
          href="/plants/213"
          points={[
            "5〜6月に橙黄色〜橙赤色の釣鐘型の花を咲かせる（別名：サラサドウダン）",
            "ドウダンツツジと同属だが、花が橙色〜赤色で鮮やか",
            "北海道〜九州の山地に自生する落葉低木",
            "花弁の縁が赤く染まる模様が「更紗（さらさ）染め」のようなことが別名の由来",
          ]}
          tip="山地でドウダンツツジに似た形でオレンジ色の花が咲いていたらツリガネツツジ（サラサドウダン）です。"
        />
      </Section>

      {/* 食用植物 */}
      <Section title="食べられるツツジ科 — スノキ・コケモモ・ブルーベリー">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          ツツジ科には毒をもつ種がある一方、おいしい果実をつける食用植物も数多くあります。スノキ属（Vaccinium）の仲間がその代表です。
        </p>
        <PlantCard
          name="スノキ"
          href="/plants/214"
          points={[
            "6〜7月に白〜淡紅色の壺形の小花を咲かせる",
            "7〜8月に青黒色の小さな液果をつける（食べられる）",
            "山地の林縁や明るい草地に自生する落葉低木",
            "ブルーベリーと同じスノキ属（Vaccinium）に属する",
          ]}
          tip="山道で小さな青黒い実をつけた低木があったらスノキの可能性があります。甘酸っぱく食べられます。"
        />
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
              fontWeight: "bold",
              color: "#7cbe8c",
              fontSize: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            ブルーベリー（栽培種）
          </div>
          <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 0.5rem" }}>
            スーパーでおなじみのブルーベリーもツツジ科スノキ属の植物です。北アメリカ原産で、日本では長野・群馬などで広く栽培されています。白い壺形の小花を咲かせ、夏に青紫色の実をつけます。アントシアニンが豊富で、目の健康によいとされています。
          </p>
          <div
            style={{
              background: "#1e3d1f",
              borderRadius: "6px",
              padding: "0.5rem 0.75rem",
              color: "#a0d0a2",
              fontSize: "0.8rem",
            }}
          >
            💡 ブルーベリーの花はアセビやドウダンツツジによく似た壺形。ツツジ科の特徴がよく現れています。
          </div>
        </div>
      </Section>

      {/* 豆知識 */}
      <Section title="覚えておきたい豆知識">
        {[
          {
            title: "ツツジとサツキの見分け方",
            body: "見た目がよく似るツツジとサツキですが、開花時期が違います。ツツジは4〜5月（葉と花がほぼ同時）、サツキは5〜6月（花が先か葉と同時）。また、サツキは葉が小さく縁に毛が目立ち、花の模様（斑）が入ることが多いです。",
          },
          {
            title: "ギンリョウソウもツツジ科",
            body: "山の暗い林床でときどき見かける、葉緑素をもたない白くて半透明な植物「ギンリョウソウ」。幽霊のように見えることから「幽霊草」とも呼ばれますが、実はツツジ科の仲間です。光合成をせず、菌類から栄養を得る「菌従属栄養植物」です。",
          },
          {
            title: "ツツジ科の毒と薬",
            body: "ツツジ科には毒をもつ種が多くあります。レンゲツツジのグラヤノトキシン、アセビのアセボトキシンなどは人や家畜に有害です。一方でアセビは古くから殺虫剤や薬草として利用されてきた歴史もあります。",
          },
          {
            title: "高山植物にもツツジ科が多い",
            body: "ハクサンシャクナゲやアカヤシオなど、高山・亜高山帯の植生にもツツジ科は多く見られます。これはツツジ科の多くが酸性で栄養の乏しい土壌に適応しているためです。火山灰土や岩の割れ目など、過酷な環境でも生き延びる強さをもっています。",
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

      {/* 代表種一覧 */}
      <Section title="ツツジ科の代表種を一覧で整理">
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
                {["画像", "種名", "花の形・色", "開花期", "識別ポイント"].map((h) => (
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
                { name: "ヤマツツジ", href: "/plants/209", id: "209", flower: "漏斗形・朱赤", season: "4〜6月", point: "おしべ5本・山野草原" },
                { name: "ミツバツツジ", href: "/plants/199", id: "199", flower: "漏斗形・淡紫紅", season: "4〜5月", point: "枝先に3枚葉・葉より先に開花" },
                { name: "サツキ", href: "/plants/153", id: "153", flower: "漏斗形・ピンク〜赤", season: "5〜6月", point: "ツツジより約1ヶ月遅い" },
                { name: "レンゲツツジ", href: "/plants/200", id: "200", flower: "漏斗形・橙赤", season: "5〜6月", point: "高原群生・有毒" },
                { name: "ホンシャクナゲ", href: "/plants/207", id: "207", flower: "漏斗形・淡ピンク〜白", season: "5〜6月", point: "大型革質葉・大輪の花房" },
                { name: "ハクサンシャクナゲ", href: "/plants/206", id: "206", flower: "漏斗形・白〜淡紅", season: "7〜8月", point: "亜高山帯・夏咲き" },
                { name: "アセビ", href: "/plants/114", id: "114", flower: "壺形・白", season: "2〜4月", point: "早春開花・有毒・常緑" },
                { name: "ドウダンツツジ", href: "/plants/128", id: "128", flower: "釣鐘形・白", season: "4月", point: "秋の紅葉が鮮やか" },
                { name: "ツリガネツツジ", href: "/plants/213", id: "213", flower: "釣鐘形・橙赤", season: "5〜6月", point: "花が橙色でドウダンと区別" },
                { name: "スノキ", href: "/plants/214", id: "214", flower: "壺形・白", season: "6〜7月", point: "青黒い食用果実" },
              ].map((row, i) => (
                <tr
                  key={row.name}
                  style={{ background: i % 2 === 0 ? "#262626" : "#222" }}
                >
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    <img
                      src={`/images/plants/${row.id}-0.webp`}
                      alt={row.name}
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    <Link
                      href={row.href}
                      style={{ color: "#7cbe8c", textDecoration: "none" }}
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.flower}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333", whiteSpace: "nowrap" }}>
                    {row.season}
                  </td>
                  <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #333" }}>
                    {row.point}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          href="/families/44"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          ツツジ科の植物一覧を見る →
        </Link>
        <Link
          href="/columns/rosaceae-plants"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：バラ科の植物たち →
        </Link>
        <Link
          href="/columns/spring-mountain-flowers"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：春の登山で見られる花特集 →
        </Link>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
      </div>
    </div>
  )
}

export default Page

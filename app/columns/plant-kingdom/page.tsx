import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/3/31/Diversity_of_plants_%28Streptophyta%29_version_2.png"
const title = "植物界とは何か——キノコや昆布との境界線"
const description =
  "「植物」と一言でいっても、キノコや昆布は植物界に含まれない。生物分類の「界」という考え方から、植物界の定義と植物っぽいのに植物ではない仲間たちをやさしく解説します。"

export const metadata = createColumnMetadata({
  path: "/columns/plant-kingdom/",
  title,
  description,
  ogImage,
  ogImageAlt: "コケ・シダ・裸子植物・被子植物など植物界の多様性を示すコラージュ画像",
  twitterDescription:
    "キノコや昆布はなぜ植物じゃない？生物分類の「界」から植物界の条件をやさしく解説。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/plant-kingdom/",
  title,
  description,
  ogImage,
})

const Page = () => {
  return (
    <ColumnArticle
      emoji="🍃"
      title={title}
      subtitle="「植物っぽい」と「植物」の境界線を生物分類から整理する"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="コケ・シダ・裸子植物・被子植物など植物界の多様性を示すコラージュ画像"
    >
      <ColumnIntro>
        {[
          "きのこ狩りや海藻拾いをしていて、「これも植物だよね？」と考えたことはないだろうか。見た目は地面から生えていたり、緑色をしていたりして、いかにも植物らしい。だが生物学の分類では、キノコも昆布も植物界には含まれない。",
          "実は生き物は「界（かい）」という大きなグループに分けられており、植物とみなされるかどうかはこの界の定義で決まる。光合成をする・細胞壁を持つといった条件をすべて満たす仲間だけが「植物界」に属する。",
          "このコラムでは、界という分類の考え方と植物界の条件を整理したうえで、キノコや海藻がなぜ植物界に入らないのかを解説する。最後に植物界の中身である4大グループにも触れる。",
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
      </ColumnIntro>

      {/* 界とは何か */}
      <Section title="「界」とは——生物を分ける最も大きなグループ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          生物の分類は「界・門・綱・目・科・属・種」という階層で細かくなっていく。「科」や「属」は植物図鑑でもおなじみだが、「界」はそのさらに上、最も大きなグループ分けにあたる。
        </p>
        <div
          style={{
            background: "#1e2a1e",
            border: "1px solid #3a5a3a",
            borderRadius: "8px",
            padding: "1rem",
            fontSize: "0.8rem",
            color: "#aaa",
            lineHeight: 1.8,
          }}
        >
          <div style={{ color: "#7cbe8c", fontWeight: "bold", marginBottom: "0.5rem" }}>
            覚え方のコツ
          </div>
          現在の生物学では、真核生物（核を持つ細胞からなる生物）の中に「動物界」「植物界」「菌界」「原生生物界」などいくつもの界がある。同じ界に属する生き物は、体の作り方や栄養の取り方の基本方針が共通している。
        </div>
      </Section>

      {/* 植物界の条件 */}
      <Section title="植物界の条件——4つの特徴">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1.25rem",
          }}
        >
          植物界に属する生き物には、共通する特徴がいくつかある。すべて満たして初めて「植物」と呼べる。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              title: "葉緑体を持ち、光合成で自ら栄養を作る",
              desc: "太陽の光と二酸化炭素・水から自分でデンプンを合成する「独立栄養」の生き物。他の生き物を食べたり分解したりして栄養を得ることはない。",
            },
            {
              title: "細胞壁がセルロースでできている",
              desc: "細胞の周りをセルロースという丈夫な繊維で囲んでいる。同じ「細胞壁を持つ」仲間でも、キノコの細胞壁はキチン質という別の成分でできている。",
            },
            {
              title: "多細胞で、自分では移動しない",
              desc: "根を張るか岩や地面に固着し、動物のように自分の意思で動き回ることはない。多くの単細胞藻類はこの条件を満たさないため植物界に含まれない。",
            },
            {
              title: "陸上に適応した仲間が中心",
              desc: "コケ植物以降のグループは、乾燥を防ぐクチクラ層や、ガス交換を行う気孔など、陸上生活に必要な仕組みを備えている。",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#242424",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                  color: "#e0e0e0",
                  marginBottom: "0.4rem",
                }}
              >
                {item.title}
              </div>
              <p
                style={{
                  color: "#ccc",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 植物っぽいけど植物ではない仲間 */}
      <Section title="「植物っぽい」のに植物ではない仲間たち">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          日常会話では「植物」と呼ばれがちでも、生物学的には植物界に含まれない仲間は意外と多い。条件のどこかが欠けているのが理由だ。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              title: "キノコ・カビ（菌界）",
              desc: "光合成をせず、周囲の有機物を分解して栄養を得る「従属栄養」の生き物。細胞壁の成分もセルロースではなくキチン質で、動物に近い性質を持つ。",
            },
            {
              title: "昆布・ワカメなどの海藻（褐藻・紅藻の仲間）",
              desc: "光合成はするが、植物界とは別の系統に分類される。多くは陸上植物とは独立に光合成能力を獲得したグループで、クチクラ層や気孔も持たない。",
            },
            {
              title: "地衣類（コケに似た斑紋）",
              desc: "岩や樹皮に張りつく地衣類は、菌類と藻類が共生した複合体。名前に「コケ」とつくものもあるが、コケ植物とは全く別の存在。",
            },
            {
              title: "単細胞の藻類（原生生物界）",
              desc: "クラミドモナスなど水中を漂う単細胞の藻類は光合成をするが、単細胞かつ自ら動き回るため「多細胞で動かない」という条件を満たさない。",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                borderLeft: "3px solid #5a9a5c",
                paddingLeft: "0.875rem",
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
                {item.desc}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: "#1e3d1f",
            borderRadius: "6px",
            padding: "0.75rem 1rem",
            color: "#a0d0a2",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            marginTop: "1rem",
          }}
        >
          💡 迷ったら「光合成するか」「細胞壁の成分は何か」「動くか動かないか」の3点をチェックする。すべて植物界の条件に合えば植物、どれか外れれば別の界の生き物だ。
        </div>
      </Section>

      {/* 植物界の中身 */}
      <Section title="植物界の中身——4大グループ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          条件を満たした植物界の中は、さらに「コケ植物」「シダ植物」「裸子植物」「被子植物」という4つの大きなグループに分かれる。身近な庭木や街路樹の多くは、このうち裸子植物か被子植物のどちらかに属する。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              title: "裸子植物——種子はあるが果実に包まれない",
              href: "/plants/5",
              name: "イチョウ",
              desc: "マツ科・ヒノキ科・イチョウ科などが含まれる。種子で乾燥に強い繁殖ができるようになった一方、種子は果実に包まれず「裸」のまま実る。",
            },
            {
              title: "被子植物——種子が果実に包まれる、現在最も繁栄したグループ",
              href: "/plants/1",
              name: "ソメイヨシノ",
              desc: "花を咲かせ、種子を果実で保護する仕組みを持つ。双子葉類・単子葉類にさらに分かれ、現在の植物の大多数を占める。",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#242424",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                  color: "#e0e0e0",
                  marginBottom: "0.4rem",
                }}
              >
                {item.title}
              </div>
              <Link
                href={item.href}
                style={{
                  display: "inline-block",
                  background: "#1e3d1f",
                  color: "#7cbe8c",
                  borderRadius: "4px",
                  padding: "0.1rem 0.5rem",
                  fontSize: "0.75rem",
                  textDecoration: "none",
                  marginBottom: "0.5rem",
                }}
              >
                {item.name} →
              </Link>
              <p
                style={{
                  color: "#ccc",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            color: "#aaa",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            margin: "1rem 0 0",
          }}
        >
          コケ植物・シダ植物を含めた4グループの詳しい進化の流れは、下記の関連コラム「植物を系統樹で覚えやすく」で解説している。
        </p>
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
        <Link href="/plants" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          植物一覧を見る →
        </Link>
        <Link
          href="/columns/phylogenetic-tree"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：植物を系統樹で覚えやすく →
        </Link>
        <Link
          href="/columns/tree-vs-herb"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：木と草のちがい →
        </Link>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
      </div>
    </ColumnArticle>
  )
}

export default Page

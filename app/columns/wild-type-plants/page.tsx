import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/d/d7/Rosa_multiflora_flower_UMFS.jpg"
const title = "原種とはなにか"
const description =
  "園芸品種や栽培品種の話で出てくる「原種」とは何か。野生種・在来種・品種改良との違いを、ノイバラやガクアジサイを例にやさしく解説します。"

export const metadata = createColumnMetadata({
  path: "/columns/wild-type-plants/",
  title,
  description,
  keywords: [
    "原種",
    "野生種",
    "在来種",
    "園芸品種",
    "栽培品種",
    "品種改良",
    "植物学",
  ],
  ogImage,
  ogImageAlt: "白い花を咲かせるノイバラ",
  twitterDescription:
    "園芸品種や栽培品種の話で出てくる「原種」とは何か。野生種・在来種・品種改良との違いを、身近な植物で整理します。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/wild-type-plants/",
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

const note: React.CSSProperties = {
  background: "#242424",
  borderLeft: "3px solid #5a9a5c",
  borderRadius: "8px",
  color: "#aaa",
  fontSize: "0.82rem",
  lineHeight: 1.8,
  margin: "0.75rem 0 0",
  padding: "0.875rem 1rem",
}

const Page = () => {
  return (
    <ColumnArticle
      emoji="🌱"
      title={title}
      subtitle="園芸品種の「もとの姿」を知ると、花や果物の見え方が変わります"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="白い花を咲かせるノイバラ"
    >
      <ColumnIntro>
        {[
          "園芸店のラベルや植物図鑑で、「この花の原種は山地に自生する」といった説明を見かけることがあります。",
          "なんとなく「古い植物」「自然にある植物」という印象はあっても、野生種や在来種との違いまで考えると少し迷います。",
          "原種は、品種改良された植物のもとになった野生の種を指す言葉です。人が選び、交配し、育てやすくした植物を理解するための出発点になります。",
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

      <Section title="原種は「改良前のもとになった種」">
        <p style={body}>
          原種とは、園芸品種や栽培品種のもとになった、自然界に存在する植物の種を指します。
          バラなら、庭で見る大輪のバラそのものではなく、野山に自生する野生バラの仲間が原種です。
        </p>
        <p style={body}>
          たとえば
          <Link href="/plants/18" style={{ color: "#7cbe8c", textDecoration: "none" }}>
            ノイバラ
          </Link>
          は、日本に自生する野生のバラです。花は白く小さめで、花びらも基本は5枚。
          派手さは控えめですが、園芸バラの台木に使われるなど、人の栽培とも深く関わってきました。
        </p>
        <p style={note}>
          ポイントは「原始的で劣っている」という意味ではないことです。
          原種は、品種改良で大きく変わる前の性質を残す、観察の基準になる植物です。
        </p>
      </Section>

      <Section title="園芸品種との違い">
        <p style={body}>
          園芸品種は、人が観賞しやすい形や色を選んで増やした植物です。
          花を大きくする、色を濃くする、八重咲きにする、実を甘くするなど、目的に合わせて特徴が強調されます。
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
            gap: "0.75rem",
            marginTop: "0.5rem",
          }}
        >
          {[
            {
              label: "原種",
              points: ["自然界に分布する", "花や実は素朴な形が多い", "環境への適応が見えやすい"],
            },
            {
              label: "園芸品種・栽培品種",
              points: ["人が選抜・交配して作る", "見た目や収量が強調される", "名前が品種名として管理される"],
            },
          ].map((group) => (
            <div
              key={group.label}
              style={{
                background: "#242424",
                border: "1px solid #3a3a3a",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  color: "#e0e0e0",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                {group.label}
              </div>
              <ul
                style={{
                  color: "#aaa",
                  fontSize: "0.8rem",
                  lineHeight: 1.8,
                  margin: 0,
                  paddingLeft: "1.1rem",
                }}
              >
                {group.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="在来種・野生種とは少し違う">
        <p style={body}>
          原種と似た言葉に、野生種と在来種があります。
          野生種は、人に栽培されず自然の中で世代をつないでいる植物。
          在来種は、昔からその地域に自然分布している植物です。
        </p>
        <p style={body}>
          原種は「何かの改良品種のもとになった」という関係を含む言葉です。
          つまり、すべての原種は野生種として語られることが多いですが、すべての野生種が園芸品種の原種として扱われるわけではありません。
        </p>
        <p style={note}>
          「原種」「野生種」「在来種」は重なる部分があります。
          読むときは、何の品種のもとになった話なのか、どの地域の自生を指すのかを分けると混乱しにくくなります。
        </p>
      </Section>

      <Section title="身近な例で見る原種">
        {[
          {
            name: "ガクアジサイ",
            href: "/plants/32",
            desc: "アジサイの原種とされる落葉低木です。花序の外側だけに装飾花が並ぶ姿が特徴で、丸く大きく咲く園芸アジサイとは印象が違います。",
          },
          {
            name: "ヤマザクラ",
            href: "/plants/17",
            desc: "日本に自生する野生の桜です。ソメイヨシノのように同じ性質の株を大量に増やしたものとは違い、木ごとに花色や咲く時期の個性があります。",
          },
          {
            name: "ノイバラ",
            href: "/plants/18",
            desc: "野生バラの一つです。大輪で多弁の園芸バラを見る前にノイバラを知ると、バラ科らしい5枚花の基本形がよくわかります。",
          },
        ].map((item) => (
          <div
            key={item.name}
            style={{
              borderLeft: "3px solid #5a9a5c",
              marginBottom: "1rem",
              paddingLeft: "0.875rem",
            }}
          >
            <Link
              href={item.href}
              style={{
                color: "#7cbe8c",
                fontSize: "0.9rem",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              {item.name} →
            </Link>
            <p style={{ ...body, margin: "0.35rem 0 0" }}>{item.desc}</p>
          </div>
        ))}
      </Section>

      <Section title="原種を知ると観察が深くなる">
        <p style={body}>
          原種を知ると、品種改良で何が変えられたのかが見えてきます。
          花びらが増えたのか、色が派手になったのか、実が大きくなったのか。
          園芸植物の美しさは、自然の性質を人が選び続けた結果でもあります。
        </p>
        <p style={body}>
          反対に、原種には生きる場所に合わせた姿が残っています。
          小さな花、地味な色、鋭いとげ、細い葉も、その植物が野外で生きるための形です。
          原種を見ることは、植物の「もとの設計」を見ることに近いと言えます。
        </p>
      </Section>
    </ColumnArticle>
  )
}

export default Page

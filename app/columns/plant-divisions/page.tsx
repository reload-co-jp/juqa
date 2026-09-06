import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Fern_detail.jpg"
const title = "植物界の「門」を一覧で整理する"
const description =
  "植物界の中はさらに「門」という単位に分かれている。コケ植物3門・シダ植物3門・裸子植物4門・被子植物1門など、植物界を構成する主要な門を代表植物つきで一覧解説します。"

export const metadata = createColumnMetadata({
  path: "/columns/plant-divisions/",
  title,
  description,
  ogImage,
  ogImageAlt: "シダの葉の拡大写真",
  twitterDescription:
    "植物界は何門ある？コケ3門・シダ3門・裸子植物4門・被子植物1門を代表植物つきで一覧解説。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/plant-divisions/",
  title,
  description,
  ogImage,
})

const Page = () => {
  return (
    <ColumnArticle
      emoji="🗂️"
      title={title}
      subtitle="コケ・シダ・裸子植物・被子植物——植物界の門を一覧でまとめて紹介"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="シダの葉の拡大写真"
    >
      <ColumnIntro>
        {[
          "「植物界」がどんな生き物のグループか分かると、次に気になるのは「では植物界の中はどう分かれているのか」ではないだろうか。コケもシダもマツもサクラも同じ植物界だが、明らかに姿は違う。",
          "実は植物界の中には「門（もん）」という分類の単位があり、10前後のグループに分かれている。コケだけでも3つの門、裸子植物も4つの門に分かれるなど、思った以上に細かく分類されている。",
          "このコラムでは植物界を構成する主要な門を、コケ植物・シダ植物・裸子植物・被子植物の順に一覧で整理し、それぞれの代表的な植物とあわせて紹介する。",
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

      {/* 門とは */}
      <Section title="「門」とは——界の次に大きい分類階級">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          生物の分類階級は「界・門・綱・目・科・属・種」の順に細かくなる。「門」は「界」のすぐ下に位置し、体のつくりの基本設計（維管束があるか、種子を作るかなど）が大きく変わる境目にあたる。
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
          植物の門には「〜植物門」という名前がつく（例：シダ植物門）。英語では動物と違い伝統的に division と呼ばれることが多いが、意味は動物界の「門（phylum）」とほぼ同じ階級と考えてよい。
        </div>
      </Section>

      {/* コケ植物の3門 */}
      <Section title="コケ植物——3つの門に分かれる">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          ひとまとめに「コケ植物」と呼ばれるグループも、実は体のつくりが異なる3つの門で構成されている。維管束（水や養分を運ぶ管）を持たず、乾燥に弱いという共通点がある。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              title: "蘚類門（せんるいもん）——茎と葉の区別があるコケ",
              desc: "スギゴケやミズゴケなどが含まれる。茎のような部分と葉のような部分がはっきり分かれ、体を立ち上げるように育つものが多い。",
            },
            {
              title: "苔類門（たいるいもん）——平たく広がるコケ",
              desc: "ゼニゴケなどが含まれる。体が平たいシート状（葉状体）に広がるものが多く、地面に張りつくように生育する。",
            },
            {
              title: "ツノゴケ類門——角のような胞子体を伸ばすコケ",
              desc: "胞子を作る部分が細長い角（つの）のように伸びるのが特徴。3つの門の中では最も種類が少なく、見かける機会も少ない。",
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
              <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: 1.7, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* シダ植物の3門 */}
      <Section title="シダ植物——維管束を獲得した3つの門">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          シダ植物は維管束を獲得し、コケ植物より大きく育てるようになったグループ。こちらも見た目の違う3つの門に分かれる。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              title: "ヒカゲノカズラ植物門——小さな鱗状の葉が並ぶ",
              desc: "ヒカゲノカズラやイワヒバなどが含まれる。細い茎に小さな鱗片状の葉が密に並ぶ、古いタイプの維管束植物。",
            },
            {
              title: "トクサ植物門——節のある筒状の茎",
              desc: "スギナ（ツクシの本体）やトクサが含まれる。茎に節があり、そこから輪状に葉や枝が出る独特の姿をしている。",
            },
            {
              title: "シダ植物門——大きな葉を広げる、いわゆる「シダ」",
              desc: "ワラビ・ゼンマイ・ノキシノブなど、一般に「シダ」と呼ばれる仲間の大部分がここに含まれる。葉の裏に胞子のうを作って増える。",
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
              <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: 1.7, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 裸子植物の4門 */}
      <Section title="裸子植物——種子を獲得した4つの門">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          種子という乾燥に強い繁殖方法を獲得した裸子植物は、現在4つの門に分かれて生き残っている。身近な庭木・街路樹にも多い。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              title: "球果植物門——松ぼっくりを作るなじみ深い針葉樹",
              href: "/plants/22",
              name: "アカマツ",
              desc: "マツ科・ヒノキ科・スギ科などが含まれる、裸子植物の中で最も種類が多い門。球果（松ぼっくり）を作るものが多い。",
            },
            {
              title: "イチョウ植物門——現生1種だけの「生きた化石」",
              href: "/plants/5",
              name: "イチョウ",
              desc: "現在はイチョウ1種のみが属する門。約2億年前から大きく姿を変えていないとされる。",
            },
            {
              title: "ソテツ植物門——ヤシに似た姿の熱帯性グループ",
              href: null,
              name: null,
              desc: "太い幹の先に大きな葉を放射状につける。見た目はヤシに似るが、種子植物としては裸子植物に分類される。",
            },
            {
              title: "グネツム植物門——被子植物に近い特徴を持つ変わり種",
              href: null,
              name: null,
              desc: "維管束の構造など、被子植物に似た特徴をあわせ持つ珍しいグループ。マオウ（漢方薬エフェドリンの原料）などが含まれる。",
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
              {item.href && (
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
              )}
              <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: 1.7, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 被子植物 */}
      <Section title="被子植物——現在は1つの門にまとめるのが主流">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          花を咲かせ、種子を果実で包む被子植物は、現在の植物の大多数を占める最も繁栄したグループ。門としては「被子植物門」1つにまとめられることが多いが、内部はさらに双子葉類・単子葉類などに細かく分かれていく。
        </p>
        <div
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
            被子植物門
          </div>
          <Link
            href="/plants/1"
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
            ソメイヨシノ →
          </Link>
          <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: 1.7, margin: 0 }}>
            サクラ・タンポポ・イネ・ユリなど、身の回りで見かける草花や樹木のほとんどが被子植物門に属する。門より下の「綱」「科」レベルで見分けるほうが実用的なため、詳しくは関連コラムで解説している。
          </p>
        </div>
      </Section>

      {/* まとめ表 */}
      <Section title="植物界の門・まとめ">
        <ul
          style={{
            margin: 0,
            paddingLeft: "1.2rem",
            color: "#ccc",
            fontSize: "0.85rem",
            lineHeight: 2,
          }}
        >
          <li>コケ植物：蘚類門・苔類門・ツノゴケ類門（3門）</li>
          <li>シダ植物：ヒカゲノカズラ植物門・トクサ植物門・シダ植物門（3門）</li>
          <li>裸子植物：球果植物門・イチョウ植物門・ソテツ植物門・グネツム植物門（4門）</li>
          <li>被子植物：被子植物門（1門にまとめる説が主流）</li>
        </ul>
        <p
          style={{
            color: "#aaa",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            margin: "1rem 0 0",
          }}
        >
          合わせて10〜11の門があることになる。ただし門の数え方は研究者や分類体系によって多少異なる場合がある。
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
          href="/columns/plant-kingdom"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：植物界とは何か →
        </Link>
        <Link
          href="/columns/phylogenetic-tree"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：植物を系統樹で覚えやすく →
        </Link>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
      </div>
    </ColumnArticle>
  )
}

export default Page

import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const ogImage =
  "https://upload.wikimedia.org/wikipedia/commons/d/de/Tree_of_life_by_Haeckel.jpg"
const title = "植物を系統樹で覚えやすく"
const description = "植物の進化の歴史を示す「系統樹」を頭に入れると、見知らぬ植物でも「この仲間っぽい」と気づける。コケ・シダ・裸子植物・被子植物の大きな流れと、双子葉類・単子葉類の違いをやさしく解説します。"

export const metadata = createColumnMetadata({
  path: "/columns/phylogenetic-tree/",
  title,
  description,
  ogImage,
  ogImageAlt: "ヘッケルの描いた生命の樹（1879年）",
  twitterDescription: "系統樹を知ると植物が覚えやすくなる。コケ→シダ→裸子植物→被子植物の進化の流れを図解でわかりやすく解説。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/phylogenetic-tree/",
  title,
  description,
  ogImage,
})

const TreeNode = ({
  label,
  sub,
  examples,
  color,
  border,
  indent = 0,
}: {
  label: string
  sub?: string
  examples?: { name: string; href: string }[]
  color: string
  border: string
  indent?: number
}) => (
  <div
    style={{
      marginLeft: `${indent * 1.5}rem`,
      marginBottom: "0.75rem",
      position: "relative",
    }}
  >
    {indent > 0 && (
      <div
        style={{
          position: "absolute",
          left: "-1rem",
          top: "0.9rem",
          width: "0.75rem",
          height: "1px",
          background: "#555",
        }}
      />
    )}
    <div
      style={{
        background: color,
        border: `1px solid ${border}`,
        borderRadius: "8px",
        padding: "0.75rem 1rem",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "0.9rem",
          color: "#e0e0e0",
          marginBottom: sub || examples ? "0.3rem" : 0,
        }}
      >
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: "0.78rem", color: "#aaa", marginBottom: examples ? "0.4rem" : 0 }}>
          {sub}
        </div>
      )}
      {examples && examples.length > 0 && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {examples.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              style={{
                background: "#1e3d1f",
                color: "#7cbe8c",
                borderRadius: "4px",
                padding: "0.1rem 0.5rem",
                fontSize: "0.75rem",
                textDecoration: "none",
              }}
            >
              {e.name} →
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
)

const Page = () => {
  return (
    <ColumnArticle
      emoji="🌿"
      title={title}
      subtitle="「進化の枝分かれ」を知ると、植物の見分け方が一気に整理される"
      jsonLd={jsonLd}
      heroImage={ogImage}
      heroAlt="ヘッケルの描いた生命の樹（1879年）"
      heroCredit="Photo: Wikimedia Commons（Ernst Haeckel, 1879年）"
    >
      <ColumnIntro>
        {[
          "植物の名前を覚えようとして、なかなか頭に入らない——そんな経験はないだろうか。バラ科やキク科という「科」の名前を暗記しようとすると、ただのリストになってしまい、どうしても記憶に残りにくい。",
          "そこで役立つのが「系統樹」の考え方だ。系統樹とは植物の進化の歴史を木の枝のように示した図で、「共通の祖先からどのように枝分かれしたか」を表している。枝が近い植物ほど特徴が似ているので、系統樹を頭に入れておくと、初めて見る植物でも「この仲間だな」と推測しやすくなる。",
          "このコラムでは、植物界の大きな流れを「コケ植物」「シダ植物」「裸子植物」「被子植物」という4つのステップで整理し、それぞれの代表的な特徴と覚え方のコツを解説する。",
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

      {/* 系統樹とは */}
      <Section title="系統樹とは——植物の「家系図」">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          系統樹（けいとうじゅ）とは、生き物の進化の歴史を示した図のこと。木の幹が共通の祖先で、枝が分岐するたびに新しいグループが生まれたことを示す。枝が近いほど「最近まで共通の祖先を持っていた」、つまり特徴が似ている可能性が高い。
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
          系統樹を「植物の家系図」として読む。同じ科（例：バラ科）に属する植物は、同じ枝から分かれた「いとこ同士」。科が近いほど、花の作りや葉の形など、どこかに共通点が見つかりやすい。
        </div>
      </Section>

      {/* 大きな4つのグループ */}
      <Section title="植物界の大きな4ステップ">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1.25rem",
          }}
        >
          植物の系統樹で最も重要な分岐は次の4つのグループへの進化だ。陸上に進出した植物は、水の利用方法と繁殖の方法を徐々に改良しながら多様化してきた。
        </p>
        <div style={{ position: "relative" }}>
          <TreeNode
            label="コケ植物"
            sub="維管束なし・胞子で繁殖・水辺や湿地に多い"
            color="#1a2a1a"
            border="#3a5a3a"
          />
          <div
            style={{
              marginLeft: "0.75rem",
              borderLeft: "2px solid #444",
              paddingLeft: "0.25rem",
            }}
          >
            <TreeNode
              label="シダ植物"
              sub="維管束あり・胞子で繁殖・林床に多い"
              color="#1a2a1a"
              border="#3a5a3a"
              indent={1}
            />
            <div
              style={{
                marginLeft: "1.5rem",
                borderLeft: "2px solid #444",
                paddingLeft: "0.25rem",
              }}
            >
              <TreeNode
                label="裸子植物"
                sub="種子で繁殖・花被なし・球果（まつぼっくり）をつける"
                examples={[
                  { name: "クロマツ", href: "/plants/10" },
                  { name: "ヒノキ", href: "/plants/8" },
                  { name: "イチョウ", href: "/plants/5" },
                ]}
                color="#1a2a2a"
                border="#3a5a6a"
                indent={1}
              />
              <TreeNode
                label="被子植物"
                sub="種子が果実に包まれる・花弁をもつ・最も多様なグループ"
                examples={[
                  { name: "ソメイヨシノ", href: "/plants/1" },
                  { name: "タンポポ", href: "/plants/11" },
                  { name: "ヤマユリ", href: "/plants/54" },
                ]}
                color="#1a2a1e"
                border="#3a6a5a"
                indent={1}
              />
            </div>
          </div>
        </div>
        <p
          style={{
            color: "#aaa",
            fontSize: "0.8rem",
            lineHeight: 1.7,
            margin: "1rem 0 0",
          }}
        >
          ※ この4つのグループは「どうやって繁殖するか」「水をどう運ぶか」という2つの観点で大きく変わる。覚えるときは「胞子 → 種子（裸）→ 種子（包まれる）」という流れで整理しよう。
        </p>
      </Section>

      {/* 裸子植物 */}
      <Section title="裸子植物——種子はあるが花弁がない">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          裸子植物は「種子」という画期的な仕組みを獲得した植物グループだ。種子の中に栄養分と胚が入っているため、乾燥した環境でも繁殖できる。ただし、花弁はなく、種子は果実に包まれず「裸」のまま球果（まつぼっくり）などの上に乗っている。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              title: "マツ科（アカマツ・クロマツ）",
              href1: "/plants/22",
              name1: "アカマツ",
              href2: "/plants/10",
              name2: "クロマツ",
              desc: "2本または5本の針葉が束になる。大型の球果（松ぼっくり）をつける。日本の山林を代表する針葉樹。",
              tip: "針葉が「束」になっているのがマツ科の見分け方。1束2〜5本で種によって決まっている。",
            },
            {
              title: "ヒノキ科（ヒノキ・スギ）",
              href1: "/plants/8",
              name1: "ヒノキ",
              href2: "/plants/9",
              name2: "スギ",
              desc: "鱗片状または短い針状の葉を持つ。建材として重要で、日本中に植林されている。球果は小型でまるい。",
              tip: "葉が鱗のように茎に張り付いていればヒノキ科が多い。スギは葉が短い錐形でトゲトゲしている。",
            },
            {
              title: "イチョウ科（イチョウ）",
              href1: "/plants/5",
              name1: "イチョウ",
              href2: null,
              name2: null,
              desc: "扇形の葉と二又に分岐する葉脈が特徴。現生するイチョウ科は1属1種のみ。約2億年前から形を変えていない「生きた化石」。",
              tip: "扇形の葉は他の植物にはほぼない。葉脈が二又に分岐するのも独特。秋の黄葉も美しい。",
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
                  fontSize: "0.9rem",
                  color: "#e0e0e0",
                  marginBottom: "0.4rem",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href={item.href1}
                  style={{
                    background: "#1e3d1f",
                    color: "#7cbe8c",
                    borderRadius: "4px",
                    padding: "0.1rem 0.5rem",
                    fontSize: "0.75rem",
                    textDecoration: "none",
                  }}
                >
                  {item.name1} →
                </Link>
                {item.href2 && (
                  <Link
                    href={item.href2}
                    style={{
                      background: "#1e3d1f",
                      color: "#7cbe8c",
                      borderRadius: "4px",
                      padding: "0.1rem 0.5rem",
                      fontSize: "0.75rem",
                      textDecoration: "none",
                    }}
                  >
                    {item.name2} →
                  </Link>
                )}
              </div>
              <p
                style={{
                  color: "#ccc",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  margin: "0 0 0.5rem",
                }}
              >
                {item.desc}
              </p>
              <div
                style={{
                  background: "#1e3d1f",
                  borderRadius: "6px",
                  padding: "0.4rem 0.75rem",
                  color: "#a0d0a2",
                  fontSize: "0.78rem",
                }}
              >
                💡 {item.tip}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 被子植物の分岐 */}
      <Section title="被子植物の中の大きな分かれ目——双子葉類と単子葉類">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          被子植物は現在の植物の大多数を占めるグループだが、さらに大きく「双子葉類（そうしようるい）」と「単子葉類（たんしようるい）」に分かれる。この2つを区別できると、初見の植物でもどちらに属するか見当がつくようになる。
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
              label: "双子葉類",
              points: ["葉脈が網状（網の目）", "花弁が4枚または5枚", "茎に年輪ができる", "子葉が2枚"],
              examples: [
                { name: "ソメイヨシノ", href: "/plants/1" },
                { name: "タンポポ", href: "/plants/11" },
                { name: "ハクモクレン", href: "/plants/27" },
              ],
              color: "#1e2a1e",
              border: "#3a6a3a",
            },
            {
              label: "単子葉類",
              points: ["葉脈が平行（まっすぐ）", "花弁が3枚または6枚", "茎に年輪がない", "子葉が1枚"],
              examples: [
                { name: "ヤマユリ", href: "/plants/54" },
                { name: "ツユクサ", href: "/plants/15" },
              ],
              color: "#1a2a2a",
              border: "#3a5a6a",
            },
          ].map((col) => (
            <div
              key={col.label}
              style={{
                background: col.color,
                border: `1px solid ${col.border}`,
                borderRadius: "8px",
                padding: "0.875rem",
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
                {col.label}
              </div>
              <ul
                style={{
                  margin: "0 0 0.5rem",
                  paddingLeft: "1.1rem",
                  color: "#bbb",
                  fontSize: "0.78rem",
                  lineHeight: 1.8,
                }}
              >
                {col.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                {col.examples.map((e) => (
                  <Link
                    key={e.href}
                    href={e.href}
                    style={{
                      background: "#1e3d1f",
                      color: "#7cbe8c",
                      borderRadius: "4px",
                      padding: "0.1rem 0.4rem",
                      fontSize: "0.7rem",
                      textDecoration: "none",
                    }}
                  >
                    {e.name}
                  </Link>
                ))}
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
          }}
        >
          💡 野外で手っ取り早く確認するには「葉脈」を見よう。網目状なら双子葉類、平行なら単子葉類と判断できることが多い。ただし例外もあるので、他の特徴も合わせて判断しよう。
        </div>
      </Section>

      {/* 被子植物の中の「原始的なグループ」 */}
      <Section title="被子植物の中でも「古いグループ」を知る">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          被子植物の系統樹の根元近くには、「より原始的な特徴を残すグループ」がある。これらは花の構造が複雑で多数の花弁をもつものが多く、進化の初期の姿を想像させてくれる。
        </p>
        {[
          {
            title: "モクレン科——被子植物の「祖先に近い」グループ",
            href1: "/plants/27",
            name1: "ハクモクレン",
            desc: "花弁と萼片の区別が曖昧で、花びらの数が多い。雄しべ・雌しべも螺旋状に多数並ぶ。これは被子植物が進化した初期の花の形に近い特徴とされる。",
          },
          {
            title: "ドクダミ科——独特な臭気を持つ古いグループ",
            href1: "/plants/40",
            name1: "ドクダミ",
            desc: "白い十字型に見える4枚は花弁ではなく「総苞片」と呼ばれる葉の変形。本当の花は中心の黄色い穂の部分。系統的に被子植物の比較的初期に分岐したグループに属する。",
          },
        ].map((item) => (
          <div
            key={item.title}
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
                fontSize: "0.875rem",
                color: "#e0e0e0",
                marginBottom: "0.4rem",
              }}
            >
              {item.title}
            </div>
            <Link
              href={item.href1}
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
              {item.name1} →
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
      </Section>

      {/* APG分類体系 */}
      <Section title="現代の分類——APG体系とは">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          現代の植物分類は「APG体系（被子植物系統グループ）」と呼ばれる、DNA解析に基づいた分類体系を採用している。従来の形態（見た目）だけによる分類から、遺伝情報による分類へと変わったことで、見た目の似ていない植物が同じ科に含まれたり、逆に別の科に移動したりする例が増えた。
        </p>
        {[
          {
            title: "カエデはムクロジ科に統合された",
            body: "かつて独立したカエデ科だったカエデ類は、DNA解析によりムクロジ科の一部であることが判明し、統合された。見た目は全く違うが、遺伝的には近縁だったのだ。",
          },
          {
            title: "「科」の名前が変わることもある",
            body: "APG体系の更新（最新はAPG IV, 2016年）によって、科の範囲や名前が変更されることがある。古い図鑑と新しい図鑑で科名が違う場合は、APG体系への対応の違いが原因のことが多い。",
          },
          {
            title: "形が似ているから同じ科、とは限らない",
            body: "サボテン（サボテン科）とトウダイグサ科の多肉植物は見た目がそっくりだが、全く別の系統。これを「収束進化」という。系統樹を見ると、似た環境に適応した別々のグループが同じ形に進化したことがわかる。",
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

      {/* 系統樹を活かした覚え方 */}
      <Section title="系統樹を使った植物の覚え方・実践編">
        <p
          style={{
            color: "#ccc",
            fontSize: "0.875rem",
            lineHeight: 1.8,
            margin: "0 0 1rem",
          }}
        >
          系統樹を頭に入れたら、実際の植物観察でどう活かすか。次のような手順で考えると、知らない植物でも仲間を絞り込みやすくなる。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              step: "1",
              title: "まず「草か木か」「常緑か落葉か」を確認",
              desc: "木本・草本の区別は系統樹でも重要。針葉樹は裸子植物が多く、草本の大多数は被子植物（特に単子葉類）。",
            },
            {
              step: "2",
              title: "葉脈を見て「双子葉か単子葉か」を判断",
              desc: "網状脈なら双子葉類（バラ科・キク科・マメ科など）、平行脈なら単子葉類（イネ科・ユリ科など）の可能性が高い。",
            },
            {
              step: "3",
              title: "花の構造から「科」を推測",
              desc: "花弁5枚・おしべ多数ならバラ科を疑う。頭状花序（小花が集まる）ならキク科。蝶形花ならマメ科。花の作りは科ごとに一定のパターンがある。",
            },
            {
              step: "4",
              title: "「同じ科の植物」と比べて確認",
              desc: "科が分かれば、同じ科の知っている植物と比較できる。葉の形・香り・果実の形など、科の共通特徴が当てはまるか確認しよう。",
            },
          ].map((item) => (
            <div
              key={item.step}
              style={{
                display: "flex",
                gap: "0.875rem",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  background: "#5a9a5c",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "1.75rem",
                  height: "1.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                  flexShrink: 0,
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
                <div style={{ fontSize: "0.8rem", color: "#aaa", lineHeight: 1.7 }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
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
          href="/plants"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          植物一覧を見る →
        </Link>
        <Link
          href="/columns/rosaceae-plants"
          style={{ color: "#7cbe8c", textDecoration: "none" }}
        >
          関連コラム：バラ科の植物たち →
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

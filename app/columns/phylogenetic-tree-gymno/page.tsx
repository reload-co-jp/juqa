import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const title = "裸子植物4グループを系統で整理する"
const description =
  "マツ・ヒノキ・イチョウ・イチイ——同じ「裸子植物」でも系統的には大きく離れているグループがある。球果植物（マツ科・ヒノキ科）、独立系統のイチョウ、球果を持たないイチイ科・マキ科まで、系統の分岐と見分けのポイントを解説する。"

export const metadata = createColumnMetadata({
  path: "/columns/phylogenetic-tree-gymno/",
  title,
  description,
  keywords: ["裸子植物", "マツ科", "ヒノキ科", "イチョウ", "イチイ科", "系統樹", "針葉樹"],
  twitterDescription:
    "イチョウは「球果を作らない裸子植物」——裸子植物の4つのグループを系統の分岐から整理する。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/phylogenetic-tree-gymno/",
  title,
  description,
})

const PlantLink = ({ href, name }: { href: string; name: string }) => (
  <Link
    href={href}
    style={{
      background: "#1e3d1f",
      color: "#7cbe8c",
      borderRadius: "4px",
      padding: "0.1rem 0.5rem",
      fontSize: "0.75rem",
      textDecoration: "none",
    }}
  >
    {name} →
  </Link>
)

const BranchNode = ({
  label,
  sub,
  color,
  border,
  indent = 0,
  plants,
}: {
  label: string
  sub?: string
  color: string
  border: string
  indent?: number
  plants?: { name: string; href: string }[]
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
      <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#e0e0e0", marginBottom: sub || plants ? "0.3rem" : 0 }}>
        {label}
      </div>
      {sub && (
        <div style={{ fontSize: "0.78rem", color: "#aaa", marginBottom: plants ? "0.4rem" : 0 }}>
          {sub}
        </div>
      )}
      {plants && plants.length > 0 && (
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {plants.map((p) => (
            <PlantLink key={p.href} href={p.href} name={p.name} />
          ))}
        </div>
      )}
    </div>
  </div>
)

const GroupCard = ({
  title: cardTitle,
  feature,
  tip,
  plants,
}: {
  title: string
  feature: string
  tip: string
  plants: { name: string; href: string }[]
}) => (
  <div
    style={{
      background: "#242424",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "0.75rem",
    }}
  >
    <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#e0e0e0", marginBottom: "0.4rem" }}>
      {cardTitle}
    </div>
    <p style={{ color: "#ccc", fontSize: "0.8rem", lineHeight: 1.7, margin: "0 0 0.5rem" }}>
      {feature}
    </p>
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
      {plants.map((p) => (
        <PlantLink key={p.href} href={p.href} name={p.name} />
      ))}
    </div>
    <div
      style={{
        background: "#1e3d1f",
        borderRadius: "6px",
        padding: "0.4rem 0.75rem",
        color: "#a0d0a2",
        fontSize: "0.78rem",
      }}
    >
      💡 {tip}
    </div>
  </div>
)

const CompareRow = ({
  item,
  matuGroup,
  icho,
  ichii,
}: {
  item: string
  matuGroup: string
  icho: string
  ichii: string
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: "0.5rem",
      marginBottom: "0.5rem",
      fontSize: "0.78rem",
    }}
  >
    <div style={{ color: "#aaa", fontWeight: "bold" }}>{item}</div>
    <div style={{ color: "#ccc" }}>{matuGroup}</div>
    <div style={{ color: "#ccc" }}>{icho}</div>
    <div style={{ color: "#ccc" }}>{ichii}</div>
  </div>
)

const Page = () => {
  return (
    <ColumnArticle
      emoji="🌲"
      title={title}
      subtitle="「球果を作るか」「葉の形」——裸子植物のグループ判別は2つの問いから始まる"
      jsonLd={jsonLd}
    >
      <ColumnIntro>
        {[
          "マツもイチョウも「裸子植物」と分類されるが、系統的には大きく異なるグループだ。マツとヒノキは「球果植物」という共通の大グループに属するが、イチョウは約2億年以上前に独立した系統で現在も1種だけが生き残る。",
          "裸子植物の最も大きな特徴は「種子が果実に包まれない（裸のまま）」点だが、そのなかでも種子の包まれ方・葉の形・球果の有無によってグループが分かれる。",
          "このコラムでは裸子植物を「球果植物（マツ科・ヒノキ科）」「イチョウ科」「イチイ科・マキ科」の大きな流れで整理し、それぞれの見分け方を解説する。",
        ].map((text, i) => (
          <p key={i} style={{ margin: 0, color: "#bbb", fontSize: "0.9rem", lineHeight: 1.9 }}>
            {text}
          </p>
        ))}
      </ColumnIntro>

      <Section title="裸子植物の系統——4つの大グループ">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1.25rem" }}>
          現生の裸子植物は大きく4つのグループに分けられる。球果植物（マツ目・ヒノキ目など）が最も種類が多く、残りはそれぞれ独立した古い系統だ。
        </p>
        <div style={{ position: "relative" }}>
          <BranchNode
            label="イチョウ目（イチョウ科）"
            sub="現生は1属1種のみ・古生代から姿がほぼ変わらない「生きた化石」"
            color="#1a2a1a"
            border="#3a5a3a"
            plants={[{ name: "イチョウ", href: "/plants/5" }]}
          />
          <div style={{ marginLeft: "0.75rem", borderLeft: "2px solid #444", paddingLeft: "0.25rem" }}>
            <BranchNode
              label="球果植物（マツ目・ヒノキ目など）"
              sub="球果（まつぼっくり型）に種子がつく・針葉樹の大多数"
              color="#1a2a2a"
              border="#3a5a6a"
              indent={1}
              plants={[
                { name: "クロマツ", href: "/plants/10" },
                { name: "アカマツ", href: "/plants/22" },
                { name: "ヒノキ", href: "/plants/8" },
                { name: "スギ", href: "/plants/9" },
              ]}
            />
            <BranchNode
              label="イチイ目（イチイ科・マキ科など）"
              sub="球果を作らない・種子に肉質の仮種皮または花托をもつ"
              color="#1e2a1e"
              border="#3a6a5a"
              indent={1}
              plants={[
                { name: "イチイ", href: "/plants/36" },
                { name: "イヌマキ", href: "/plants/147" },
              ]}
            />
          </div>
        </div>
        <p style={{ color: "#aaa", fontSize: "0.8rem", lineHeight: 1.7, margin: "1rem 0 0" }}>
          ※ ソテツ目・グネツム目など他のグループも存在するが、日本の山野・街路で見かける裸子植物の大部分はこの3グループに属する。
        </p>
      </Section>

      <Section title="球果植物——まつぼっくり型の種子容器を持つグループ">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          球果植物は「球果（きゅうか）」という木質化した鱗片状の器官に種子がつくグループだ。いわゆる「まつぼっくり」が球果の代表例。葉は針状・鱗片状・線形など種によって異なり、そこで科を区別できる。
        </p>
        <GroupCard
          title="マツ科——針葉が束になる"
          feature="最大の特徴は「複数の針葉が束（ふくろ）になって出る」点。アカマツとクロマツは2本束、ゴヨウマツは5本束、カラマツは多数が短枝に集まる。球果は種によって大きさが異なり、マツ属は比較的大型。樹脂（松やに）を多く含む。"
          plants={[
            { name: "クロマツ", href: "/plants/10" },
            { name: "アカマツ", href: "/plants/22" },
          ]}
          tip="葉が「束」になっているか確認する。2本なら日本のマツ（アカマツ・クロマツ）、5本ならゴヨウマツ。束になっていない針葉樹はマツ科でも別属（モミ・トウヒ等）か別科の可能性がある。"
        />
        <GroupCard
          title="ヒノキ科——鱗片状の葉と小型球果"
          feature="葉が鱗のように茎に密着して並ぶ「鱗片葉」または短い針状の葉が特徴。球果はマツ科と比べて小型で丸いものが多い。スギ・ヒノキ・サワラ・ネズコ・ヒムロなどを含む。建材として重要な種が多く、日本の人工林の主役。"
          plants={[
            { name: "ヒノキ", href: "/plants/8" },
            { name: "スギ", href: "/plants/9" },
          ]}
          tip="葉が鱗のように茎に張り付いてY字状に広がればヒノキ科の可能性が高い。スギは錐形の短い葉がトゲトゲしているが同じ科。葉を揉むと独特の香りがするのも特徴。"
        />
      </Section>

      <Section title="イチョウ科——2億年以上変わらない「生きた化石」">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          イチョウ科は現在も生きている種がイチョウ1種のみという、極めて小さな科だ。最古の化石記録は約2億7000万年前に遡り、現在のイチョウと形がほとんど変わっていないことから「生きた化石」と呼ばれる。裸子植物の他グループとも離れた独立した系統に位置する。
        </p>
        <GroupCard
          title="イチョウ科——扇形の葉と二叉の葉脈"
          feature="扇形の葉と「二叉（にまた）分岐する葉脈」が最大の特徴。他の植物には見られない独特の形だ。雌雄異株（オスとメスが別々の木）で、メス木には秋に銀杏の実（種子）がなる。秋には黄色く紅葉する。縄文時代以前から日本に自生していたとされる。"
          plants={[{ name: "イチョウ", href: "/plants/5" }]}
          tip="扇形で先端が切れ込み、葉脈が平行に二又に分かれれば即イチョウ。他の植物と間違えようがない。秋の黄葉と銀杏の実の臭いも判別材料になる。"
        />
      </Section>

      <Section title="イチイ科・マキ科——球果を持たない裸子植物">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          「裸子植物＝まつぼっくり」というイメージを壊すのがこのグループだ。イチイ科とマキ科は球果を作らず、種子が肉質の「仮種皮」や「花托」に包まれる独特の形をとる。見た目が球果植物と大きく異なるため、裸子植物と気づかれにくい。
        </p>
        <GroupCard
          title="イチイ科——赤い仮種皮に包まれた種子"
          feature="球果を作らず、種子が赤い肉質の「仮種皮（かしゅひ）」にカップ状に包まれる。平らな針状の葉が茎の左右に2列に並ぶ。葉と種子（仮種皮以外）には有毒のタキシンを含む。常緑針葉樹で生垣・庭木として広く利用される。"
          plants={[{ name: "イチイ", href: "/plants/36" }]}
          tip="赤いカップ状の肉質に包まれた種子がついていればイチイ科。松ぼっくりのような球果がなく、真っ赤な小さな実に見える。葉や種子には毒があるが、赤い仮種皮（外側の肉部分）だけは無毒で食べられる。"
        />
        <GroupCard
          title="マキ科——紫色の花托に包まれた種子"
          feature="球果を作らず、種子が紫〜赤色の肉質「花托」に乗った形をとる。葉は針葉樹の中では幅広い扁平な線形〜披針形。雌雄異株。庭木・生垣として古くから利用される。イヌマキ・ラカンマキなどが代表種。"
          plants={[{ name: "イヌマキ", href: "/plants/147" }]}
          tip="紫色の丸い実に乗った緑の球がついていればマキ科。「実の下に花托がある」という独特の構造。葉は針葉樹にしては平らで幅広く、光沢がある。"
        />
      </Section>

      <Section title="まとめ：裸子植物の見分け早見">
        <div style={{ marginBottom: "0.75rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "0.78rem",
            }}
          >
            <div style={{ color: "#7cbe8c", fontWeight: "bold" }}>確認ポイント</div>
            <div style={{ color: "#7cbe8c", fontWeight: "bold" }}>球果植物</div>
            <div style={{ color: "#7cbe8c", fontWeight: "bold" }}>イチョウ</div>
            <div style={{ color: "#7cbe8c", fontWeight: "bold" }}>イチイ・マキ</div>
          </div>
          <CompareRow item="球果の有無" matuGroup="あり（まつぼっくり型）" icho="なし" ichii="なし" />
          <CompareRow item="葉の形" matuGroup="針状・鱗片状" icho="扇形" ichii="平らな針状・線形" />
          <CompareRow item="種子の包み方" matuGroup="球果の鱗片に裸でつく" icho="外種皮が肉質" ichii="仮種皮・花托が肉質" />
          <CompareRow item="代表科" matuGroup="マツ科・ヒノキ科" icho="イチョウ科（1種）" ichii="イチイ科・マキ科" />
          <CompareRow item="紅葉" matuGroup="常緑（カラマツは落葉）" icho="黄色く紅葉・落葉" ichii="常緑" />
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
          💡 野外での最初のチェックポイント：「球果（まつぼっくり型）があるか」「葉が扇形か」「赤い肉質の種子（仮種皮）があるか」の3問で大グループが絞れる。
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
        <Link href="/plants" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          植物一覧を見る →
        </Link>
        <Link href="/columns/phylogenetic-tree" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：植物を系統樹で覚えやすく →
        </Link>
        <Link href="/columns/conifer" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：針葉樹林の簡単な見分け方 →
        </Link>
        <Link href="/columns/phylogenetic-tree-dicot" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：双子葉類の系統を辿る →
        </Link>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
      </div>
    </ColumnArticle>
  )
}

export default Page

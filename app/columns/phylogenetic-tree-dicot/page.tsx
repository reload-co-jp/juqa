import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const title = "双子葉類の系統を辿る——離弁花と合弁花の分岐"
const description =
  "被子植物の大部分を占める双子葉類。その中でも「原始的グループ」「離弁花類」「合弁花類」という系統の分岐を知ると、初めて見た花でも仲間を絞り込めるようになる。モクレン科・バラ科・マメ科・キク科・シソ科などを系統の流れで整理する。"

export const metadata = createColumnMetadata({
  path: "/columns/phylogenetic-tree-dicot/",
  title,
  description,
  keywords: ["双子葉類", "離弁花", "合弁花", "系統樹", "植物分類", "見分け方"],
  twitterDescription:
    "モクレン科が「原始的」な理由、バラ科とキク科の根本的な違い——系統の分岐から双子葉類を整理する。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/phylogenetic-tree-dicot/",
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

const Page = () => {
  return (
    <ColumnArticle
      emoji="🌸"
      title={title}
      subtitle="「花びらがくっついているか離れているか」——それだけで植物の系統の大きな流れが見えてくる"
      jsonLd={jsonLd}
    >
      <ColumnIntro>
        {[
          "被子植物の中で最も種類が多いのが双子葉類だ。バラ、タンポポ、マメ、シソ、モクレン——これらはすべて双子葉類に属するが、系統的にはまったく異なる「枝」から生まれている。",
          "双子葉類の系統を整理するうえで最も重要な分岐は「花弁が離れているか（離弁花）、くっついているか（合弁花）」だ。この違いは進化の段階を反映していて、合弁花類のほうが比較的新しいグループとされる。さらに、これらの「真正双子葉類」よりも前に分岐した「原始的な双子葉類」も存在する。",
          "このコラムでは、双子葉類の中の主要な系統分岐を、原始的グループ→離弁花類→合弁花類という流れで辿る。",
        ].map((text, i) => (
          <p key={i} style={{ margin: 0, color: "#bbb", fontSize: "0.9rem", lineHeight: 1.9 }}>
            {text}
          </p>
        ))}
      </ColumnIntro>

      <Section title="双子葉類の系統——大きな3つの流れ">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1.25rem" }}>
          双子葉類の系統樹では、大きく3つのグループへの分岐が重要だ。下の図は簡略化した系統の流れで、上ほど「古くに分岐したグループ」を示す。
        </p>
        <div style={{ position: "relative" }}>
          <BranchNode
            label="原始的な双子葉類（基部被子植物に近いグループ）"
            sub="花被片が多数・螺旋状につく・花弁と萼の境界が曖昧"
            color="#1a2a1a"
            border="#3a5a3a"
            plants={[
              { name: "ハクモクレン", href: "/plants/27" },
              { name: "コブシ", href: "/plants/28" },
              { name: "ドクダミ", href: "/plants/40" },
            ]}
          />
          <div style={{ marginLeft: "0.75rem", borderLeft: "2px solid #444", paddingLeft: "0.25rem" }}>
            <BranchNode
              label="真正双子葉類・離弁花グループ"
              sub="花弁が1枚ずつ独立して並ぶ・4〜5枚が多い"
              color="#1a2a2a"
              border="#3a5a6a"
              indent={1}
              plants={[
                { name: "ソメイヨシノ", href: "/plants/1" },
                { name: "フジ", href: "/plants/25" },
                { name: "ナズナ", href: "/plants/83" },
              ]}
            />
            <BranchNode
              label="真正双子葉類・合弁花グループ"
              sub="花弁の基部がくっついて筒状や壺状になる"
              color="#1e2a1e"
              border="#3a6a5a"
              indent={1}
              plants={[
                { name: "タンポポ", href: "/plants/11" },
                { name: "ホトケノザ", href: "/plants/34" },
                { name: "リンドウ", href: "/plants/38" },
              ]}
            />
          </div>
        </div>
        <p style={{ color: "#aaa", fontSize: "0.8rem", lineHeight: 1.7, margin: "1rem 0 0" }}>
          ※ 現代のAPG分類では「離弁花類」「合弁花類」という区分は正式な分類群ではなく、系統の傾向として理解する。実際は複数の目（Order）にまたがる。
        </p>
      </Section>

      <Section title="原始的な双子葉類——花びらが「多数・螺旋状」のグループ">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          被子植物の系統樹の根元近くに位置するグループは、花の構造が「整然としていない」特徴を持つ。花弁と萼の区別が曖昧で、花被片が螺旋状に多数並ぶ。これは被子植物が進化した初期の形に近いと考えられている。
        </p>
        <GroupCard
          title="モクレン科——多数の花被片が螺旋状"
          feature="花弁と萼片の区別が曖昧で、花被片が螺旋状に多数並ぶ。雄しべ・雌しべも螺旋状に多数つく。早春に葉より先に花を咲かせる種が多い。被子植物の中で最も原始的なグループの一つとされる。"
          plants={[
            { name: "ハクモクレン", href: "/plants/27" },
            { name: "コブシ", href: "/plants/28" },
            { name: "ホオノキ", href: "/plants/60" },
            { name: "タイサンボク", href: "/plants/73" },
          ]}
          tip="葉より先に大きな白い花を咲かせ、花びらと萼の見分けがつかなければモクレン科を疑う。花びらの枚数が6・9・12など3の倍数になることが多い。"
        />
        <GroupCard
          title="ドクダミ科——花弁のない独特のグループ"
          feature="白い4枚の「花弁」に見えるのは実は総苞片（葉の変形）で、本当の花は中央の黄色い穂にある小さな花。系統的には被子植物の比較的初期に分岐したグループに属し、花の構造が特殊。"
          plants={[
            { name: "ドクダミ", href: "/plants/40" },
            { name: "ハンゲショウ", href: "/plants/52" },
          ]}
          tip="「白い十字の花」に見えるが、正確には花弁がない。臭気が強く、葉がハート形。総苞片の枚数（4枚）はアブラナ科の花弁と同じだが全く別の系統。"
        />
      </Section>

      <Section title="離弁花グループ——花弁が1枚ずつ独立">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          花弁が基部まで完全に独立して並ぶグループ。「花びらをつまんで1枚ずつ取れる」かどうかが確認しやすい目安になる。バラ科・マメ科・アブラナ科などが代表的。
        </p>
        <GroupCard
          title="バラ科——花弁5枚・おしべ多数"
          feature="花弁5枚が離れて並び、おしべが多数（たいてい20本以上）。葉にギザギザ（鋸歯）があり、果実は多様（さくらんぼ・梨・いちご・バラの実など）。日本で最もよく見かける科の一つ。"
          plants={[
            { name: "ソメイヨシノ", href: "/plants/1" },
            { name: "ウメ", href: "/plants/16" },
            { name: "ヤマザクラ", href: "/plants/17" },
            { name: "ノイバラ", href: "/plants/18" },
          ]}
          tip="「花弁5枚・おしべ多数・葉に鋸歯」が揃えばバラ科の可能性が高い。食用になる実（梨・リンゴ・サクランボ・ビワ・イチゴ）のほとんどがバラ科。"
        />
        <GroupCard
          title="マメ科——蝶形花と「さや」"
          feature="花弁5枚だが、形が蝶のような「蝶形花」をつける。果実は「さや」に包まれた豆（莢果）。葉は3出複葉または羽状複葉が多い。根に根粒菌が共生して窒素固定を行う。"
          plants={[
            { name: "シロツメクサ", href: "/plants/12" },
            { name: "フジ", href: "/plants/25" },
            { name: "ネムノキ", href: "/plants/26" },
          ]}
          tip="花の形を横から見ると「旗弁1枚＋翼弁2枚＋竜骨弁2枚」に分かれる蝶形花が特徴。「さや」が実れば確定に近い。クローバー・大豆・枝豆もマメ科。"
        />
        <GroupCard
          title="アブラナ科——花弁4枚が十字形に"
          feature="花弁がちょうど4枚、十字形に並ぶ（Crucifer＝十字架の意）。雄しべは6本（外側2本が短い）。果実は細長い「角果」になる。菜の花・大根・キャベツ・ワサビなどを含む。"
          plants={[
            { name: "ナズナ", href: "/plants/83" },
          ]}
          tip="花弁が4枚で十字形なら即アブラナ科を疑う。「菜の花＝アブラナ科」の形が基本パターン。"
        />
        <GroupCard
          title="ケシ科——花弁4枚・乳液"
          feature="花弁4枚（2枚ずつ対になる配置）。茎や葉を傷つけると乳液が出る種が多い。高山植物にも多く見られる。コマクサはこのグループの代表。"
          plants={[
            { name: "クサノオウ", href: "/plants/50" },
          ]}
          tip="花弁4枚でも十字形に整列しないならケシ科の可能性がある。アブラナ科と混同しやすいが、乳液の有無と雄しべの本数（多数）で区別できる。"
        />
      </Section>

      <Section title="合弁花グループ——花弁の基部がくっつく">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          花弁が根もとで合着して筒状・壺状・唇形などの形になるグループ。「花びらが1枚ずつ取れない」のが目安になる。キク科・シソ科・リンドウ科など多くの重要な科が含まれる。
        </p>
        <GroupCard
          title="キク科——小花が集まった「頭状花序」"
          feature="1つの「花」に見えるが、実は多数の小花が集まった「頭状花序」。外側に舌状花（花弁が舌のように広がる）、中央に筒状花（管のような小花）が並ぶ。冠毛（綿毛）を持つ種が多い。被子植物の中でも最大クラスの科。"
          plants={[
            { name: "タンポポ", href: "/plants/11" },
            { name: "ヨモギ", href: "/plants/13" },
            { name: "セイタカアワダチソウ", href: "/plants/23" },
          ]}
          tip="タンポポやヒマワリの「花」をよく見ると、中心部に無数の小さな花が集まっているのがわかる。これが頭状花序。キク科の見分け方は「花序がひとかたまりに見える」点。"
        />
        <GroupCard
          title="シソ科——四角い茎と唇形花"
          feature="茎を断面で見ると四角形。花弁は5枚だが基部でくっついて上唇・下唇に分かれた「唇形花」になる。葉は対生し、多くの種が芳香を持つ。バジル・ミント・シソ・ラベンダーもシソ科。"
          plants={[
            { name: "ホトケノザ", href: "/plants/34" },
            { name: "ヒメオドリコソウ", href: "/plants/35" },
          ]}
          tip="茎をつまんで「角がある」と感じたらシソ科を疑う。葉を揉んで香りが出るものも多い。唇形花は上下に分かれているのが特徴。"
        />
        <GroupCard
          title="リンドウ科——晴天でのみ開く筒状花"
          feature="花弁が基部でくっついた筒状〜鐘状の花。晴天でのみ開き、曇りの日は閉じている。葉は対生で全縁。秋の山野を代表する植物グループ。"
          plants={[
            { name: "リンドウ", href: "/plants/38" },
          ]}
          tip="青紫の筒状花で、晴れた日にしか開いていなければリンドウ科の可能性が高い。花弁が4〜5裂する筒状花が基本形。"
        />
        <GroupCard
          title="オオバコ科——穂状の花序・踏まれ強"
          feature="花弁が4枚合着した小さな花が穂状に集まる。根生葉のみで葉脈が平行に目立つ（単子葉類と誤認されやすい）。踏み固められた道端に強い。ゴマノハグサ科からAPG分類でオオイヌノフグリなどが統合された。"
          plants={[
            { name: "オオバコ", href: "/plants/45" },
            { name: "オオイヌノフグリ", href: "/plants/55" },
          ]}
          tip="オオバコは葉脈が平行に見えるが双子葉類。葉の基部を確認すると根生葉が網状脈を持つ。踏み跡に沿って群生するのも特徴。"
        />
      </Section>

      <Section title="実践：野外で双子葉類の系統グループを絞り込む手順">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              step: "1",
              title: "花弁の枚数を数える",
              desc: "4枚ならアブラナ科かケシ科。5枚ならバラ科・マメ科・スミレ科などが候補。3の倍数ならモクレン科など原始的グループか単子葉類。",
            },
            {
              step: "2",
              title: "花弁が「くっついているか離れているか」確認",
              desc: "根もとで合着して筒状・唇形になっていれば合弁花グループ（キク科・シソ科・リンドウ科など）。1枚ずつ独立していれば離弁花グループ（バラ科・マメ科・アブラナ科など）。",
            },
            {
              step: "3",
              title: "茎・葉・香りを確認",
              desc: "茎が四角形→シソ科。葉が羽状複葉でさや→マメ科。葉に強い臭気→ドクダミ科。頭状花序→キク科。これらの組み合わせで科が絞れる。",
            },
            {
              step: "4",
              title: "花より先に咲く・多数の花被片→原始的グループを疑う",
              desc: "早春に葉より先に大きな花が咲き、花弁と萼の区別が曖昧ならモクレン科。白い十字形に見えるが香りが独特ならドクダミ科。",
            },
          ].map((item) => (
            <div key={item.step} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
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
                <div style={{ fontWeight: "bold", fontSize: "0.875rem", color: "#e0e0e0", marginBottom: "0.25rem" }}>
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
        <Link href="/columns/phylogenetic-tree-monocot" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：単子葉類の系統を辿る →
        </Link>
        <Link href="/columns/rosaceae-plants" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：バラ科の植物たち →
        </Link>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
      </div>
    </ColumnArticle>
  )
}

export default Page

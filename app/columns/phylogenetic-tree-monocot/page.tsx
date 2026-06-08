import Link from "next/link"
import {
  ColumnArticle,
  ColumnIntro,
  Section,
  createColumnJsonLd,
  createColumnMetadata,
} from "components/elements/ColumnComponents"

const title = "単子葉類の系統を辿る——葉脈だけで判断しない"
const description =
  "「葉脈が平行なら単子葉類」——それだけでは判断できない場面がある。サトイモ科・ツユクサ科・イネ科・ユリ科・アヤメ科・ヒガンバナ科まで、単子葉類の主要グループの系統的な分岐と見分け方を解説する。"

export const metadata = createColumnMetadata({
  path: "/columns/phylogenetic-tree-monocot/",
  title,
  description,
  keywords: ["単子葉類", "ユリ科", "イネ科", "アヤメ科", "系統樹", "植物分類", "見分け方"],
  twitterDescription:
    "サトイモ科が単子葉の「古いグループ」、アヤメ科とヒガンバナ科の系統的な違い——単子葉類の分岐を系統で整理する。",
})

const jsonLd = createColumnJsonLd({
  path: "/columns/phylogenetic-tree-monocot/",
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
      emoji="🌿"
      title={title}
      subtitle="花被片が「3の倍数」——その共通点から単子葉類の各グループを系統で読み解く"
      jsonLd={jsonLd}
    >
      <ColumnIntro>
        {[
          "被子植物の約25%を占める単子葉類。イネ・ユリ・ツユクサ・アヤメ・ヒガンバナ——いずれも「葉脈が平行」という共通点を持つが、系統的な距離は意外に遠いものもある。",
          "単子葉類の系統樹を眺めると、「サトイモ科が古いグループ」「イネ科とツユクサ科は比較的近縁」「ユリ科・アヤメ科・ヒガンバナ科はユリ目という同じ大グループ」など、見た目だけではわからない関係が浮かびあがる。",
          "このコラムでは、単子葉類の主要グループを系統の分岐に沿って整理し、野外での見分け方のポイントを解説する。",
        ].map((text, i) => (
          <p key={i} style={{ margin: 0, color: "#bbb", fontSize: "0.9rem", lineHeight: 1.9 }}>
            {text}
          </p>
        ))}
      </ColumnIntro>

      <Section title="単子葉類の系統——主要グループの分岐">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1.25rem" }}>
          単子葉類はひとつの単系統群（共通の祖先から派生した閉じたグループ）だが、内部でいくつかの大きな分岐がある。最も基底的（古くに分岐）なグループにサトイモ科があり、そこから多様なグループに分かれていった。
        </p>
        <div style={{ position: "relative" }}>
          <BranchNode
            label="基底的単子葉類"
            sub="仏炎苞と肉穂花序が特徴・湿地・水辺に多い"
            color="#1a2a1a"
            border="#3a5a3a"
            plants={[
              { name: "ミズバショウ", href: "/plants/140" },
              { name: "マムシグサ", href: "/plants/138" },
            ]}
          />
          <div style={{ marginLeft: "0.75rem", borderLeft: "2px solid #444", paddingLeft: "0.25rem" }}>
            <BranchNode
              label="コメリナ類（ツユクサ・イネなど）"
              sub="葉鞘が茎を包む・小さな花が多い・草本中心"
              color="#1a2a2a"
              border="#3a5a6a"
              indent={1}
              plants={[
                { name: "ツユクサ", href: "/plants/15" },
                { name: "ススキ", href: "/plants/41" },
                { name: "エノコログサ", href: "/plants/53" },
              ]}
            />
            <BranchNode
              label="ユリ目（ユリ・アヤメ・ヒガンバナなど）"
              sub="花被片6枚・球根または根茎をもつ・観賞価値が高い"
              color="#1e2a1e"
              border="#3a6a5a"
              indent={1}
              plants={[
                { name: "カタクリ", href: "/plants/42" },
                { name: "ヤマユリ", href: "/plants/54" },
                { name: "カキツバタ", href: "/plants/94" },
                { name: "スイセン", href: "/plants/98" },
              ]}
            />
          </div>
        </div>
        <p style={{ color: "#aaa", fontSize: "0.8rem", lineHeight: 1.7, margin: "1rem 0 0" }}>
          ※ 単子葉類の共通特徴は「子葉1枚・葉脈平行・花被片3の倍数・茎の維管束が散在・根が須根系」。ただし例外もあるため複数の特徴で判断する。
        </p>
      </Section>

      <Section title="基底的グループ——サトイモ科">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          単子葉類の系統樹の根元近くに位置するのがサトイモ科だ。「仏炎苞（ぶつえんほう）」と呼ばれる大きな苞葉が花序を包む独特の構造を持ち、見た目は他の単子葉類と大きく異なる。
        </p>
        <GroupCard
          title="サトイモ科——仏炎苞に包まれた肉穂花序"
          feature="大きな苞葉（仏炎苞）が筒状になって花序を包み、内部に肉穂花序（肉質の棒状の軸に小花が密生）をもつ。ミズバショウの白い「花弁」に見える部分は実は仏炎苞。サトイモ・コンニャク・マムシグサなどを含む。"
          plants={[
            { name: "ミズバショウ", href: "/plants/140" },
            { name: "マムシグサ", href: "/plants/138" },
          ]}
          tip="白や緑の大きな「包み」（仏炎苞）の中に棒状の花序があればサトイモ科。ミズバショウの白は「花弁」ではなく苞葉なので、本当の花は黄色い棒状の部分。"
        />
      </Section>

      <Section title="コメリナ類——ツユクサ科とイネ科">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          コメリナ類は単子葉類の中でも多様なグループで、ツユクサ科・イネ科・カヤツリグサ科などを含む。葉の基部が茎を包む「葉鞘」が発達することが共通点の一つだ。
        </p>
        <GroupCard
          title="ツユクサ科——3枚の花弁と朝の開花"
          feature="花弁は3枚で鮮やかな青（または白・ピンク）。葉の基部は茎を抱く葉鞘をもつ。朝に開花して午後にしぼむ「一日花」が多い。ツユクサ・ヤブミョウガ・ムラサキツユクサなどを含む。"
          plants={[
            { name: "ツユクサ", href: "/plants/15" },
            { name: "ヤブミョウガ", href: "/plants/48" },
          ]}
          tip="朝の草むらで鮮やかな青い3弁花を見たらツユクサ科。花弁3枚で「上に2枚・下に1枚」という非対称な配置が特徴的。"
        />
        <GroupCard
          title="イネ科——中空の茎と風媒花の穂"
          feature="茎（稈）が中空で節があり、細長い葉は葉鞘で茎を包む。花は小さく花弁がなく風媒花。穂状の花序をつける。コメ・ムギ・トウモロコシ・タケ・ススキなど、人類にとって最重要な科の一つ。"
          plants={[
            { name: "ススキ", href: "/plants/41" },
            { name: "エノコログサ", href: "/plants/53" },
          ]}
          tip="茎が丸く中空で節があり（「稈」という）、葉が細長く平行脈ならほぼイネ科。花は目立たず穂状。秋の野原でなびく草の多くはイネ科かカヤツリグサ科のどちらか。"
        />
      </Section>

      <Section title="ユリ目——花被片6枚の美しい花たち">
        <p style={{ color: "#ccc", fontSize: "0.875rem", lineHeight: 1.8, margin: "0 0 1rem" }}>
          ユリ目はユリ科・アヤメ科・ヒガンバナ科などを含む大グループ。花被片が6枚（3枚の内花被片＋3枚の外花被片）という特徴を共有することが多く、球根または根茎をもつ種が多い。観賞植物として利用される種が豊富。
        </p>
        <GroupCard
          title="ユリ科——6枚の花被片・大きな球根"
          feature="外花被片と内花被片の合計6枚が均等に広がる大きな花。球根（鱗茎）をもち、雄しべ6本・雌しべ1本。葉脈は平行。高山から里山まで幅広く分布し、日本固有種も多い。"
          plants={[
            { name: "カタクリ", href: "/plants/42" },
            { name: "ヤマユリ", href: "/plants/54" },
          ]}
          tip="花被片6枚が均等に開き、全部同じ形（内外の区別が見た目でわからない）ならユリ科が有力。カタクリは反り返った6枚が特徴的。"
        />
        <GroupCard
          title="アヤメ科——内外の花被片が形の違う6枚"
          feature="花被片6枚だが、外花被片（外側3枚）と内花被片（内側3枚）で形・大きさが異なる。根茎または球根をもつ。葉は剣状で二列に扇状に広がる。カキツバタ・アヤメ・ハナショウブ・クロッカス・グラジオラスなどを含む。"
          plants={[
            { name: "カキツバタ", href: "/plants/94" },
            { name: "アヤメ", href: "/plants/95" },
          ]}
          tip="花被片が6枚でも、外側3枚が垂れ下がり内側3枚が立ち上がる「別々の形」ならアヤメ科。ユリ科との違いは「外と内の花被片が形で異なる点」。葉が剣状で扇形に並ぶのも目安。"
        />
        <GroupCard
          title="ヒガンバナ科——球根・葉と花が別の時期に出る"
          feature="球根（鱗茎）をもち、葉と花が別々の時期に出る種が多い（ヒガンバナは花の時期に葉がなく、スイセンは花後に葉が枯れる）。花被片6枚で、雄しべ・雌しべが花外に大きく突き出る種もある。"
          plants={[
            { name: "スイセン", href: "/plants/98" },
          ]}
          tip="ヒガンバナは秋に葉のない茎から突然花が咲く——これが「葉と花が別の時期」の典型例。スイセンは春に白黄の花が先、葉はその後も残る。球根を持ち彼岸ごろに咲くものはヒガンバナ科が多い。"
        />
        <GroupCard
          title="シュロソウ科——根生葉が密生する山地の草"
          feature="根元から葉が密生し（根生葉）、葉脈は平行で目立つ。花は小さく花被片6枚。ショウジョウバカマ・コバイケイソウなど湿った山地や高山に生える種が多い。"
          plants={[
            { name: "ショウジョウバカマ", href: "/plants/67" },
          ]}
          tip="根元に葉が密生し、葉脈が顕著に平行で、高山・山地の湿地に生えていたらシュロソウ科を疑う。ショウジョウバカマは葉の先から不定芽で増えるという珍しい性質がある。"
        />
      </Section>

      <Section title="実践：単子葉類のグループを野外で絞り込む手順">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            {
              step: "1",
              title: "「仏炎苞」があるか確認",
              desc: "大きな苞葉が花序を包んでいればサトイモ科。葉は大きく矢じり形のものが多い。湿地・水辺に多い。",
            },
            {
              step: "2",
              title: "茎が中空で節があるか確認",
              desc: "茎を折って中空で節があれば（稈）イネ科。カヤツリグサ科は中実で断面が三角形（「カヤツリグサ科は三角」と覚える）。",
            },
            {
              step: "3",
              title: "花被片の枚数と形を確認",
              desc: "6枚で均等ならユリ科。6枚だが外3枚と内3枚で形が異なれば（外が垂れる）アヤメ科。3枚の鮮やかな花弁で朝しか咲かなければツユクサ科。",
            },
            {
              step: "4",
              title: "葉と花が同時に出ているか確認",
              desc: "葉のない茎から花だけ出ていたり、花後に葉が出たりする場合はヒガンバナ科の特徴。スイセン・ヒガンバナ・ハマオモトなどが該当。",
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
        <Link href="/columns/phylogenetic-tree-dicot" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：双子葉類の系統を辿る →
        </Link>
        <Link href="/columns/phylogenetic-tree-gymno" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          関連コラム：裸子植物4グループを系統で整理する →
        </Link>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
      </div>
    </ColumnArticle>
  )
}

export default Page

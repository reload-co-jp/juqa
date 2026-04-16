import type { Metadata } from "next"
import Link from "next/link"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/`

export const metadata: Metadata = {
  title: "コラム",
  description:
    "植物の見分け方や豆知識をやさしく解説するコラム一覧です。",
  keywords: ["植物コラム", "植物の豆知識", "植物の見分け方", "植物解説"],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "コラム | ジュカ！",
    description:
      "植物の見分け方や豆知識をやさしく解説するコラム一覧です。",
    url: pageUrl,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "コラム | ジュカ！",
    description: "植物の見分け方や豆知識をやさしく解説するコラム一覧です。",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": pageUrl,
  url: pageUrl,
  name: "コラム",
  description: "植物の見分け方や豆知識をやさしく解説するコラム一覧です。",
  inLanguage: "ja",
  isPartOf: { "@id": `${siteUrl}/#website` },
}

const columns = [
  {
    href: "/columns/rosaceae-plants",
    emoji: "🌹",
    title: "バラ科の植物たち",
    description:
      "サクラ・ウメ・リンゴ・ビワ・ノイバラ……実は身の回りに多いバラ科の植物。5枚の花弁・多数のおしべ・ギザギザの葉という共通の特徴を知ると「バラ科っぽい」と気づけるようになります。",
    tags: ["バラ科", "花木", "果樹"],
  },
  {
    href: "/columns/spring-mountain-flowers",
    emoji: "🌸",
    title: "春の登山で見られる花特集",
    description:
      "カタクリ・ニリンソウ・ショウジョウバカマなど、春の山でしか出会えないスプリングエフェメラルを中心に、標高別の見頃カレンダーとともに解説します。",
    tags: ["春の花", "登山", "山野草"],
  },
  {
    href: "/columns/conifer",
    emoji: "🌲",
    title: "針葉樹林の簡単な見分け方",
    description:
      "スギ・ヒノキ・アカマツ・クロマツ・ハイマツなど、針葉樹林でよく見る木を見分けるコツを解説。葉の形・樹皮・松ぼっくりなど現地で使えるポイント。",
    tags: ["見分け方", "針葉樹", "木本"],
  },
  {
    href: "/columns/tree-vs-herb",
    emoji: "🌿",
    title: "木と草のちがい",
    description:
      "サクラは木でタンポポは草——でも、その「ちがい」って何？木質化・越冬・茎の構造など、植物学的な観点からやさしく解説します。",
    tags: ["基礎知識", "木本", "草本"],
  },
  {
    href: "/columns/phylogenetic-tree",
    emoji: "🌿",
    title: "植物を系統樹で覚えやすく",
    description:
      "「進化の枝分かれ」を頭に入れると、植物の見分け方が一気に整理される。コケ→シダ→裸子植物→被子植物の流れと、双子葉類・単子葉類の違いをやさしく解説します。",
    tags: ["基礎知識", "系統分類", "進化"],
  },
  {
    href: "/columns/ericaceae-plants",
    emoji: "🌺",
    title: "ツツジ科の植物たち",
    description:
      "ヤマツツジ・サツキ・シャクナゲ・アセビ・ドウダンツツジ……春の山を彩るツツジ科の植物。漏斗形の花と10本のおしべ、酸性土壌を好む性質など共通の特徴を解説します。",
    tags: ["ツツジ科", "花木", "山野草"],
  },
  {
    href: "/columns/tree-identification-notes",
    emoji: "🌳",
    title: "木の見分けメモ",
    description:
      "桜・マツ・ナラ・モミジなど、街や山で見かける木を見分けるときの観察ポイントをQ&A形式で整理。葉、樹皮、樹形のどこを見るかがつかめます。",
    tags: ["見分け方", "樹木", "街路樹"],
  },
  {
    href: "/columns/wildflower-field-notes",
    emoji: "🌸",
    title: "山野草と雑草の見分けメモ",
    description:
      "タンポポ、ツユクサ、ドクダミ、カタクリ、コマクサなど、身近な草花から山の花までをQ&A形式で整理。季節や育つ場所から覚えやすくします。",
    tags: ["山野草", "雑草", "見分け方"],
  },
  {
    href: "/columns/plant-trivia-notes",
    emoji: "📖",
    title: "植物の特徴と豆知識メモ",
    description:
      "どんぐりがなる科、就眠運動、ヒマワリの向き、秋の七草など、クイズに入っていた植物の雑学を読み物としてまとめた豆知識コラムです。",
    tags: ["豆知識", "基礎知識", "植物学習"],
  },
]

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

      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            margin: "0 0 0.5rem",
          }}
        >
          コラム
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          植物の見分け方や豆知識を解説します
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {columns.map((col) => (
          <Link
            key={col.href}
            href={col.href}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#2d2d2d",
                borderRadius: "12px",
                padding: "1.25rem 1.5rem",
                border: "1px solid #333",
                transition: "border-color 0.15s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    lineHeight: 1,
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}
                >
                  {col.emoji}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#e0e0e0",
                      marginBottom: "0.4rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {col.title}
                  </div>
                  <p
                    style={{
                      color: "#aaa",
                      fontSize: "0.8rem",
                      lineHeight: 1.7,
                      margin: "0 0 0.75rem",
                    }}
                  >
                    {col.description}
                  </p>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {col.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: "#1e3d1f",
                          color: "#7cbe8c",
                          borderRadius: "4px",
                          padding: "0.15rem 0.5rem",
                          fontSize: "0.72rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    color: "#555",
                    fontSize: "1rem",
                    flexShrink: 0,
                    marginLeft: "auto",
                    alignSelf: "center",
                  }}
                >
                  →
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page

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

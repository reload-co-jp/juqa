import { FC } from "react"
import Link from "next/link"

const cards = [
  {
    href: "/plants",
    emoji: "🌿",
    title: "植物一覧",
    description: "15種の植物を科ごとに整理して学ぼう",
  },
  {
    href: "/families",
    emoji: "🌳",
    title: "科一覧",
    description: "12の科の特徴と代表的な植物を確認しよう",
  },
  {
    href: "/guide",
    emoji: "🔍",
    title: "見分け方",
    description: "質問に答えて植物の科を絞り込もう",
  },
  {
    href: "/quiz",
    emoji: "📝",
    title: "クイズ",
    description: "覚えた知識をクイズで試してみよう",
  },
]

const Page: FC = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <p
        style={{ color: "#8ab89e", marginBottom: "1.5rem", fontSize: "0.9rem" }}
      >
        街路樹や山で見かける植物を体系的に覚えるための学習アプリです。
      </p>
      <div>
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#2d2d2d",
                borderRadius: "8px",
                padding: "1.25rem 1rem",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderLeft: "4px solid #5a9a5c",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "2rem" }}>{card.emoji}</span>
              <div>
                <div
                  style={{
                    color: "#7cbe8c",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  {card.title}
                </div>
                <div style={{ color: "#999", fontSize: "0.85rem" }}>
                  {card.description}
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

import { FC } from "react"
import Link from "next/link"
import { plants, families } from "lib/data"

const cards = [
  {
    href: "/plants",
    emoji: "🌿",
    title: "植物をみる",
    description: `${plants.length}種の植物を科ごとに整理して学ぼう`,
  },
  {
    href: "/families",
    emoji: "🌳",
    title: "科から探す",
    description: `${families.length}の科の特徴と代表的な植物を確認しよう`,
  },
  {
    href: "/guide",
    emoji: "🔍",
    title: "植物の見方ガイド",
    description: "質問に答えて植物の科を絞り込もう",
  },
  {
    href: "/quiz",
    emoji: "📝",
    title: "植物クイズ",
    description: "覚えた知識をクイズで試してみよう",
  },
]

const Page: FC = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a3d1c 0%, #2d5a30 50%, #1e4a3a 100%)",
          borderRadius: "12px",
          padding: "2.5rem 1.5rem",
          marginBottom: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-1rem",
            right: "-1rem",
            fontSize: "8rem",
            opacity: 0.08,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          🌿
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(90, 154, 92, 0.3)",
              border: "1px solid #5a9a5c",
              borderRadius: "20px",
              padding: "0.2rem 0.75rem",
              fontSize: "0.75rem",
              color: "#a0d0a2",
              marginBottom: "1rem",
              letterSpacing: "0.05em",
            }}
          >
            🌱 植物学習アプリ
          </div>

          <h1
            style={{
              margin: "0 0 0.5rem",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            ジュカ！ <small>(JuQa)</small>
          </h1>

          <p
            style={{
              margin: "0 0 1.5rem",
              color: "#a0d0a2",
              fontSize: "0.95rem",
              lineHeight: "1.6",
            }}
          >
            街路樹や山で見かける植物を、
            <br />
            体系的に覚えるための学習アプリ。
          </p>

          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {[
              { value: plants.length, label: "種の植物" },
              { value: families.length, label: "の科" },
            ].map(({ value, label }) => (
              <div key={label}>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "#7cbe8c",
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    color: "#a0d0a2",
                    fontSize: "0.85rem",
                    marginLeft: "0.25rem",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              display: "block",
              maxWidth: "34rem",
              textDecoration: "none",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "#2d2d2d",
                borderRadius: "8px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1rem",
                borderLeft: "4px solid #5a9a5c",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "3rem" }}>{card.emoji}</div>
              <div>
                <div
                  style={{
                    color: "#7cbe8c",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textAlign: "center",
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

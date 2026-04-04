import { FC } from "react"
import Link from "next/link"
import { plants, families } from "lib/data"
import { wikimediaThumb } from "lib/utils"
import RandomPlant from "components/RandomPlant"

const month = new Date().getMonth() + 1
const seasonTag: PlantTag =
  month >= 3 && month <= 5
    ? "春開花"
    : month >= 6 && month <= 8
      ? "夏開花"
      : month >= 9 && month <= 11
        ? "秋開花"
        : "冬開花"
const heroPlants = plants
  .filter((p) => p.tags.includes(seasonTag))
  .sort(() => Math.random() - 0.5)
  .slice(0, 4)

const gridPlants = [...plants].reverse().slice(0, 12)

const navCards = [
  {
    href: "/plants",
    emoji: "🌿",
    title: "植物をみる",
    description: `${plants.length}種`,
  },
  {
    href: "/families",
    emoji: "🌳",
    title: "科から探す",
    description: `${families.length}の科`,
  },
  {
    href: "/guide",
    emoji: "🔍",
    title: "見分けガイド",
    description: "絞り込み",
  },
  {
    href: "/quiz",
    emoji: "📝",
    title: "クイズ",
    description: "知識を試す",
  },
  {
    href: "/quiz/photo",
    emoji: "📷",
    title: "写真クイズ",
    description: "写真で判定",
  },
  {
    href: "/flowers",
    emoji: "🌸",
    title: "開花カレンダー",
    description: "季節の花",
  },
  {
    href: "/columns/conifer",
    emoji: "🌲",
    title: "針葉樹の見分け方",
    description: "コラム",
  },
]

const Page: FC = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <style>{`
        .hero-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
        @media (max-width: 50rem) {
          .hero-photos {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 1fr;
          }
        }
      `}</style>
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f2a10 0%, #1a3d1c 60%, #1e4a3a 100%)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "right",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "2rem",
          minHeight: "100px",
          gap: 0,
        }}
      >
        {/* Left: text */}
        <div
          style={{
            padding: "2.5rem 2rem",
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(90,154,92,0.25)",
              border: "1px solid #5a9a5c",
              borderRadius: "20px",
              padding: "0.2rem 0.75rem",
              fontSize: "0.7rem",
              color: "#a0d0a2",
              letterSpacing: "0.05em",
              width: "fit-content",
            }}
          >
            🌱 植物学習アプリ
          </div>
          <div>
            <h1
              style={{
                margin: "0 0 0.4rem",
                fontSize: "2.2rem",
                fontWeight: "900",
                color: "#fff",
                letterSpacing: "0.04em",
                lineHeight: 1.1,
              }}
            >
              ジュカ！
            </h1>
            <p
              style={{
                margin: 0,
                color: "#8cbf8e",
                fontSize: "0.85rem",
                lineHeight: 1.6,
              }}
            >
              街路樹や山の植物を
              <br />
              体系的に学ぼう
            </p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { value: plants.length, label: "種" },
              { value: families.length, label: "科" },
            ].map(({ value, label }) => (
              <div key={label}>
                <span
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: "bold",
                    color: "#7cbe8c",
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    color: "#6a9a6c",
                    fontSize: "0.85rem",
                    marginLeft: "0.2rem",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: photo grid */}
        <div
          className="hero-photos"
          style={{
            minWidth: 0,
            flexGrow: 0,
          }}
        >
          {heroPlants.map((plant) => (
            <div
              key={plant.id}
              style={{
                position: "relative",
                overflow: "hidden",
                minWidth: 0,
                maxHeight: "12rem",
                maxWidth: "12rem",
              }}
            >
              <img
                src={wikimediaThumb(
                  plant.images.find((i) => i.caption == "花")?.url ??
                    plant.image_url,
                  160
                )}
                alt={plant.japanese_name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.75) saturate(1.1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Pickup */}
      <RandomPlant />

      {/* Photo grid */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#ccc",
              letterSpacing: "0.05em",
            }}
          >
            🌿 植物フォトギャラリー
          </h2>
          <Link
            href="/plants"
            style={{
              fontSize: "0.8rem",
              color: "#7cbe8c",
              textDecoration: "none",
            }}
          >
            すべて見る →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.5rem",
          }}
        >
          {gridPlants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "10px",
                  overflow: "hidden",
                  aspectRatio: "1",
                  background: "#1e1e1e",
                }}
              >
                <img
                  src={wikimediaThumb(plant.image_url, 160)}
                  alt={plant.japanese_name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    filter: "brightness(0.85)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
                    padding: "1.5rem 0.5rem 0.5rem",
                  }}
                >
                  <div
                    style={{
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      lineHeight: 1.2,
                    }}
                  >
                    {plant.japanese_name}
                  </div>
                  <div
                    style={{
                      color: "#aaa",
                      fontSize: "0.6rem",
                      fontStyle: "italic",
                      marginTop: "0.1rem",
                    }}
                  >
                    {plant.scientific_name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Nav cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.75rem",
        }}
      >
        {navCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#242424",
                borderRadius: "10px",
                padding: "1rem 0.75rem",
                border: "1px solid #333",
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
                cursor: "pointer",
              }}
            >
              <div style={{ fontSize: "1.5rem" }}>{card.emoji}</div>
              <div
                style={{
                  color: "#e0e0e0",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  lineHeight: 1.3,
                }}
              >
                {card.title}
              </div>
              <div style={{ color: "#666", fontSize: "0.72rem" }}>
                {card.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page

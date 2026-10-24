import type { Metadata } from "next"
import { FC } from "react"
import Link from "next/link"
import { plants, families } from "lib/data"
import { wikimediaThumb } from "lib/utils"
import { columns } from "lib/columns"
import { TAG_GROUPS } from "lib/tags"
import RandomPlant from "components/RandomPlant"

export const metadata: Metadata = {
  title: "ジュカ！ (JuQa) — 植物学習アプリ",
  description:
    "街路樹や山で見かける植物を体系的に覚えるための学習サイト。植物図鑑・クイズ・見分けガイド・開花カレンダーを収録。",
  alternates: {
    canonical: "https://juqa.reload.co.jp/",
  },
}

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
const seasonPlants = plants
  .filter((p) => p.tags.includes(seasonTag) && !heroPlants.includes(p))
  .slice(0, 8)
const latestColumns = columns.slice(0, 4)
const featureGroups = TAG_GROUPS.filter((g) =>
  ["葉", "花", "実", "樹形"].includes(g.label)
)

const purposes = [
  {
    title: "探す",
    lead: "名前・科・季節から植物を調べる",
    links: [
      { href: "/plants", label: "植物図鑑", note: `${plants.length}種` },
      { href: "/families", label: "科から探す", note: `${families.length}科` },
      { href: "/flowers", label: "開花時期から探す", note: "季節別" },
    ],
  },
  {
    title: "見分ける",
    lead: "特徴をたどって名前にたどり着く",
    links: [
      { href: "/guide", label: "見分け方ガイド", note: "質問に答えて絞り込み" },
      { href: "/quiz/photo", label: "写真クイズ", note: "写真で名前を当てる" },
    ],
  },
  {
    title: "学ぶ",
    lead: "分類や名前の由来を読み物で",
    links: [
      { href: "/columns", label: "植物コラム", note: `${columns.length}本` },
      { href: "/families", label: "分類の基礎", note: "科の特徴" },
    ],
  },
]

const sectionTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "1.05rem",
  fontWeight: "bold",
  color: "#e0e0e0",
  letterSpacing: "0.05em",
}
const moreLink: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#7cbe8c",
  textDecoration: "none",
}
const card: React.CSSProperties = {
  background: "#242424",
  borderRadius: "10px",
  border: "1px solid #333",
}

const SectionHeader: FC<{ title: string; href?: string; more?: string }> = ({
  title,
  href,
  more = "すべて見る →",
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.75rem",
    }}
  >
    <h2 style={sectionTitle}>{title}</h2>
    {href && (
      <Link href={href} style={moreLink}>
        {more}
      </Link>
    )}
  </div>
)

const PlantTile: FC<{ plant: Plant }> = ({ plant }) => (
  <Link
    href={`/plants/${plant.id}`}
    style={{
      position: "relative",
      display: "block",
      borderRadius: "10px",
      overflow: "hidden",
      aspectRatio: "1",
      background: "#1e1e1e",
      textDecoration: "none",
    }}
  >
    <img
      src={plant.local_image_url ?? wikimediaThumb(plant.image_url, 320)}
      alt={`${plant.japanese_name}の写真`}
      width={240}
      height={240}
      loading="lazy"
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
          fontSize: "0.8rem",
          fontWeight: "bold",
          lineHeight: 1.2,
        }}
      >
        {plant.japanese_name}
      </div>
      <div
        style={{
          color: "#bbb",
          fontSize: "0.65rem",
          fontStyle: "italic",
          marginTop: "0.1rem",
        }}
      >
        {plant.scientific_name}
      </div>
    </div>
  </Link>
)

const Page: FC = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <style>{`
        .hero-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
        }
        .purposes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .plant-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }
        .column-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }
        @media (max-width: 50rem) {
          .hero-photos {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: 1fr;
          }
          .purposes,
          .column-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 30rem) {
          .plant-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      {/* Hero */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #0f2a10 0%, #1a3d1c 60%, #1e4a3a 100%)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "right",
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            padding: "2rem 1.5rem",
            display: "flex",
            flexGrow: 1,
            flexBasis: "20rem",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
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
                color: "#a0d0a2",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              街路樹や山の植物を、探して・見分けて・学ぶ植物図鑑
            </p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { value: plants.length, label: "種を収録" },
              { value: families.length, label: "科" },
              { value: columns.length, label: "本のコラム" },
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
                    color: "#8cbf8e",
                    fontSize: "0.8rem",
                    marginLeft: "0.2rem",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <form
            action="/plants/"
            method="get"
            role="search"
            style={{ display: "flex", gap: "0.5rem", maxWidth: "28rem" }}
          >
            <label
              htmlFor="hero-search"
              style={{ position: "absolute", left: "-9999px" }}
            >
              植物名・学名で検索
            </label>
            <input
              id="hero-search"
              type="search"
              name="q"
              placeholder="植物名・学名で検索"
              style={{
                flex: 1,
                minWidth: 0,
                padding: "0.7rem 0.9rem",
                borderRadius: "8px",
                border: "1px solid #5a9a5c",
                background: "#10200f",
                color: "#fff",
                fontSize: "1rem",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "0.7rem 1.1rem",
                borderRadius: "8px",
                border: "none",
                background: "#7cbe8c",
                color: "#10200f",
                fontWeight: "bold",
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              検索
            </button>
          </form>
        </div>

        <div className="hero-photos" style={{ minWidth: 0, flexGrow: 0 }}>
          {heroPlants.map((plant) => (
            <Link
              key={plant.id}
              href={`/plants/${plant.id}`}
              style={{
                position: "relative",
                overflow: "hidden",
                minWidth: 0,
                maxHeight: "12rem",
                maxWidth: "12rem",
                aspectRatio: "1",
                display: "block",
              }}
            >
              <img
                src={
                  plant.images.find((i) => i.caption == "花")?.local_url ??
                  plant.images.find((i) => i.caption == "花")?.url ??
                  plant.local_image_url ??
                  wikimediaThumb(plant.image_url, 320)
                }
                alt={`${plant.japanese_name}の写真`}
                width={192}
                height={192}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.8) saturate(1.1)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: "0.4rem",
                  bottom: "0.3rem",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                  textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                }}
              >
                {plant.japanese_name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Purposes */}
      <section style={{ marginBottom: "2rem" }}>
        <div className="purposes">
          {purposes.map((purpose) => (
            <div key={purpose.title} style={{ ...card, padding: "1rem" }}>
              <h2 style={{ ...sectionTitle, color: "#7cbe8c" }}>
                {purpose.title}
              </h2>
              <p
                style={{
                  margin: "0.25rem 0 0.75rem",
                  color: "#999",
                  fontSize: "0.8rem",
                }}
              >
                {purpose.lead}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {purpose.links.map((link) => (
                  <li key={link.label} style={{ borderTop: "1px solid #333" }}>
                    <Link
                      href={link.href}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.65rem 0",
                        textDecoration: "none",
                        color: "#e0e0e0",
                        fontSize: "0.95rem",
                        fontWeight: "bold",
                      }}
                    >
                      {link.label}
                      <span
                        style={{
                          color: "#888",
                          fontSize: "0.75rem",
                          fontWeight: "normal",
                        }}
                      >
                        {link.note} →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Season */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHeader
          title={`${seasonTag.replace("開花", "")}に咲く植物`}
          href={`/flowers?season=${encodeURIComponent(seasonTag)}`}
          more="開花カレンダー →"
        />
        <div className="plant-grid">
          {seasonPlants.map((plant) => (
            <PlantTile key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHeader
          title="特徴から探す"
          href="/guide"
          more="見分け方ガイド →"
        />
        <div style={{ ...card, padding: "0.75rem 1rem" }}>
          {featureGroups.map((group) => (
            <div
              key={group.label}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0",
              }}
            >
              <span
                style={{ color: "#999", fontSize: "0.8rem", width: "2.5rem" }}
              >
                {group.label}
              </span>
              {group.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/plants?tags=${encodeURIComponent(tag)}`}
                  style={{
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    border: "1px solid #5a9a5c",
                    color: "#cfe8d1",
                    fontSize: "0.85rem",
                    textDecoration: "none",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Pickup */}
      <RandomPlant />

      {/* Columns */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHeader title="植物コラム" href="/columns" />
        <div className="column-grid">
          {latestColumns.map((col) => (
            <Link
              key={col.href}
              href={col.href}
              style={{
                ...card,
                padding: "0.85rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: "1.25rem" }}>{col.emoji}</span>
              <span
                style={{
                  color: "#e0e0e0",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                {col.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Photo gallery */}
      <section style={{ marginBottom: "2rem" }}>
        <SectionHeader title="植物フォトギャラリー" href="/plants" />
        <div className="plant-grid">
          {gridPlants.map((plant) => (
            <PlantTile key={plant.id} plant={plant} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Page

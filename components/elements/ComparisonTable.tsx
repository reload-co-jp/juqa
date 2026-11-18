import { FC, ReactNode } from "react"
import Link from "next/link"
import {
  FLOWER_TAGS,
  HABITAT_TAGS,
  LEAF_TAGS,
  bloomSeasons,
  getFamily,
  growthForms,
  labelsIn,
  leafHabit,
  plantThumb,
} from "lib/plants"
import { color } from "lib/theme"

const NONE = <span style={{ color: "var(--c-subtle)" }}>情報なし</span>

const join = (xs: string[]) => (xs.length ? xs.join("・") : NONE)

const rows: { label: string; render: (p: Plant) => ReactNode }[] = [
  {
    label: "科・属",
    render: (p) => {
      const f = getFamily(p)
      return (
        <>
          {f ? <Link href={`/families/${f.id}`}>{f.name}</Link> : "—"} ・ {p.genus}
        </>
      )
    },
  },
  { label: "形態", render: (p) => join([...growthForms(p), ...leafHabit(p)]) },
  {
    label: "花の特徴",
    render: (p) =>
      join([
        ...(p.flower_colors?.length ? [`${p.flower_colors.join("・")}色`] : []),
        ...labelsIn(p, FLOWER_TAGS),
      ]),
  },
  { label: "葉の特徴", render: (p) => join(labelsIn(p, LEAF_TAGS)) },
  {
    label: "開花時期",
    render: (p) => join(bloomSeasons(p).map((s) => `${s.label}（${s.months}）`)),
  },
  {
    label: "生育環境",
    render: (p) => (
      <>
        {labelsIn(p, HABITAT_TAGS).join("・") || null}
        {p.distribution && (
          <span style={{ display: "block", color: color.muted, fontSize: "0.85em" }}>分布：{p.distribution}</span>
        )}
        {!p.distribution && !labelsIn(p, HABITAT_TAGS).length && NONE}
      </>
    ),
  },
  {
    label: "主な見分け方",
    render: (p) =>
      p.identification.length ? (
        <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.75 }}>
          {p.identification.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      ) : (
        NONE
      ),
  },
]

/** 2種の植物を横並びで比較する表。データがない項目は「情報なし」と表示する */
export const ComparisonTable: FC<{ a: Plant; b: Plant }> = ({ a, b }) => (
  <div style={{ overflowX: "auto" }}>
    <table className="compare-table">
      <caption className="sr-only">
        {a.japanese_name}と{b.japanese_name}の比較
      </caption>
      <thead>
        <tr>
          <td aria-hidden="true" />
          {[a, b].map((p) => (
            <th key={p.id} scope="col">
              <Link href={`/plants/${p.id}`} style={{ textDecoration: "none", color: color.ink, display: "block" }}>
                <img
                  src={plantThumb(p)}
                  alt={`${p.japanese_name}の写真`}
                  width={320}
                  height={240}
                  style={{ width: "100%", aspectRatio: "4 / 3", objectFit: "cover", borderRadius: "10px", display: "block" }}
                />
                <span className="serif" style={{ display: "block", fontSize: "1.2rem", marginTop: "0.5rem" }}>
                  {p.japanese_name}
                </span>
                <span lang="la" style={{ display: "block", fontStyle: "italic", fontWeight: 400, fontSize: "0.8rem", color: color.muted }}>
                  {p.scientific_name}
                </span>
              </Link>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row">{r.label}</th>
            <td>{r.render(a)}</td>
            <td>{r.render(b)}</td>
          </tr>
        ))}
        <tr>
          <th scope="row">解説</th>
          {[a, b].map((p) => (
            <td key={p.id} style={{ color: color.inkSoft, lineHeight: 1.8 }}>
              {p.description[0]}
              <Link href={`/plants/${p.id}`} style={{ display: "block", marginTop: "0.4rem", fontSize: "0.85rem", fontWeight: 700 }}>
                {p.japanese_name}の詳細 →
              </Link>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
)

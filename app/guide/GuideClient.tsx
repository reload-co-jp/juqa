"use client"

import { FC, useState } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { guideNodes, guideResults } from "lib/guide"
import { trackEvent } from "lib/analytics"
import { color, radius } from "lib/theme"
import { Breadcrumbs, PageIntro } from "components/elements/layout"
import { PlantCard } from "components/elements/PlantCard"

type HistoryEntry = {
  nodeId: string
  answer: "yes" | "no"
  question: string
}

/** 質問ツリーで最も長い経路の質問数（進行状況の表示に使う） */
const depthFrom = (id: string): number => {
  const node = guideNodes.find((n) => n.id === id)
  if (!node) return 0
  return 1 + Math.max(depthFrom(node.yes), depthFrom(node.no))
}
const MAX_DEPTH = depthFrom("q1")

/** 結果の科名（「ムクロジ科（カエデ属）」など）から収録植物を探す */
const candidatesFor = (result: (typeof guideResults)[number]) => {
  const familyName = result.family.replace(/（.*）/, "")
  const family = families.find((f) => f.name === familyName)
  const genus = result.family.match(/（(.+属)）/)?.[1]
  const byExample = result.examples
    .map((ex) => ex.replace(/（.*）/, ""))
    .map((name) => plants.find((p) => p.japanese_name === name))
    .filter((p): p is Plant => Boolean(p))
  const byFamily = family
    ? plants.filter((p) => p.family_id === family.id && (!genus || p.genus === genus))
    : []
  const list = [...new Map([...byExample, ...byFamily].map((p) => [p.id, p])).values()]
  return { family, list }
}

const GuideClient: FC = () => {
  const [currentId, setCurrentId] = useState("q1")
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const currentNode = guideNodes.find((n) => n.id === currentId)
  const currentResult = guideResults.find((r) => r.id === currentId)

  const handleAnswer = (answer: "yes" | "no") => {
    if (!currentNode) return
    const nextId = answer === "yes" ? currentNode.yes : currentNode.no
    if (history.length === 0) trackEvent("guide_start", {})
    setHistory((prev) => [...prev, { nodeId: currentId, answer, question: currentNode.question }])
    setCurrentId(nextId)
    if (nextId.startsWith("r-")) {
      const r = guideResults.find((x) => x.id === nextId)
      trackEvent("guide_complete", { result: r?.family ?? nextId, steps: history.length + 1 })
    }
  }

  const handleBack = () => {
    if (history.length === 0) return
    const prev = history[history.length - 1]
    setCurrentId(prev.nodeId)
    setHistory((h) => h.slice(0, -1))
  }

  const handleReset = () => {
    setCurrentId("q1")
    setHistory([])
  }

  const step = history.length + 1
  const progress = currentResult ? 100 : Math.min(95, (history.length / MAX_DEPTH) * 100)

  return (
    <div>
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { href: "/explore", label: "植物を探す" }, { label: "見分け方ガイド" }]} />
      <PageIntro
        eyebrow="IDENTIFICATION GUIDE"
        title="見分け方ガイド"
        lead="目の前の植物について、葉・実・花の特徴を「はい・いいえ」で答えていくと、どの科の仲間かを絞り込めます。"
      />

      <div className="split split--wide">
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: color.muted, marginBottom: "0.3rem" }}>
              <span>{currentResult ? "結果" : `質問 ${step}`}</span>
              <span>最大{MAX_DEPTH}問</span>
            </div>
            <div role="progressbar" aria-label="進行状況" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} style={{ background: color.surfaceAlt, borderRadius: "999px", height: "6px" }}>
              <div style={{ width: `${progress}%`, height: "6px", borderRadius: "999px", background: color.primary, transition: "width .3s" }} />
            </div>
          </div>

          {currentResult ? (
            <ResultView result={currentResult} />
          ) : currentNode ? (
            <section
              aria-live="polite"
              style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: "1.75rem 1.5rem" }}
            >
              <p style={{ margin: 0, color: color.primary, fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em" }}>Q{step}</p>
              <h2 className="serif" style={{ margin: "0.3rem 0 0.6rem", fontSize: "clamp(1.25rem, 3.5vw, 1.6rem)", lineHeight: 1.5 }}>
                {currentNode.question}
              </h2>
              <p style={{ margin: 0, color: color.muted, fontSize: "0.9rem" }}>ヒント：{currentNode.hint}</p>
              <div className="grid-2" style={{ marginTop: "1.5rem" }}>
                <button type="button" className="btn" onClick={() => handleAnswer("yes")} style={{ minHeight: "3.5rem", fontSize: "1.05rem" }}>
                  はい
                </button>
                <button type="button" className="btn btn--secondary" onClick={() => handleAnswer("no")} style={{ minHeight: "3.5rem", fontSize: "1.05rem" }}>
                  いいえ
                </button>
              </div>
            </section>
          ) : (
            <p style={{ color: color.muted }}>エラーが発生しました。</p>
          )}

          <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {history.length > 0 && (
              <button type="button" className="btn btn--secondary" onClick={handleBack}>
                ← ひとつ前に戻る
              </button>
            )}
            {history.length > 0 && (
              <button type="button" className="btn btn--secondary" onClick={handleReset}>
                最初からやり直す
              </button>
            )}
          </div>
        </div>

        <aside aria-label="これまでの回答" style={{ background: color.primaryTint, borderRadius: radius.lg, padding: "1.1rem", alignSelf: "start" }}>
          <h2 style={{ fontSize: "0.95rem", margin: "0 0 0.6rem" }}>これまでの回答</h2>
          {history.length === 0 ? (
            <p style={{ margin: 0, fontSize: "0.85rem", color: color.muted }}>まだ回答していません。</p>
          ) : (
            <ol style={{ margin: 0, paddingLeft: "1.2rem", display: "grid", gap: "0.45rem", fontSize: "0.85rem" }}>
              {history.map((entry, i) => (
                <li key={i}>
                  <span style={{ fontWeight: 700, color: entry.answer === "yes" ? color.primary : color.accent, marginRight: "0.35rem" }}>
                    {entry.answer === "yes" ? "はい" : "いいえ"}
                  </span>
                  {entry.question}
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
    </div>
  )
}

const ResultView: FC<{ result: (typeof guideResults)[number] }> = ({ result }) => {
  const { family, list } = candidatesFor(result)
  return (
    <section aria-live="polite">
      <div style={{ background: color.surface, border: `2px solid ${color.primary}`, borderRadius: radius.lg, padding: "1.5rem" }}>
        <p style={{ margin: 0, color: color.muted, fontSize: "0.85rem" }}>この植物は、おそらく…</p>
        <h2 className="serif" style={{ margin: "0.25rem 0 0.5rem", fontSize: "2rem", color: color.primaryStrong }}>
          {result.family}
        </h2>
        <p style={{ margin: 0, lineHeight: 1.9 }}>{result.description}</p>
        {family && (
          <p style={{ margin: "0.75rem 0 0" }}>
            <Link href={`/families/${family.id}`} className="text-link">
              {family.name}の特徴をくわしく見る →
            </Link>
          </p>
        )}
        {!family && (
          <p style={{ margin: "0.75rem 0 0", fontSize: "0.9rem" }}>
            代表的な植物：{result.examples.join("、")}
          </p>
        )}
      </div>
      {list.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3 className="serif" style={{ fontSize: "1.15rem", margin: "0 0 0.75rem" }}>
            候補の植物（{list.length}種）
          </h3>
          <ul className="grid-cards grid-cards--sm" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {list.slice(0, 12).map((p) => (
              <li key={p.id}>
                <PlantCard plant={p} listName="guide_result" />
              </li>
            ))}
          </ul>
          {family && list.length > 12 && (
            <p style={{ marginTop: "0.75rem" }}>
              <Link href={`/plants?family=${family.id}`} className="text-link">
                {family.name}の植物をすべて見る →
              </Link>
            </p>
          )}
        </div>
      )}
    </section>
  )
}

export default GuideClient

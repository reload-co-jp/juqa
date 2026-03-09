"use client"

import { FC, useState } from "react"
import { guideNodes, guideResults } from "lib/guide"
import { PageHeader, SectionCard, Button } from "components/elements/layout"

type HistoryEntry = {
  nodeId: string
  answer: "yes" | "no"
  question: string
}

const GuidePage: FC = () => {
  const [currentId, setCurrentId] = useState("q1")
  const [history, setHistory] = useState<HistoryEntry[]>([])

  const isResult = currentId.startsWith("r-")
  const currentNode = guideNodes.find((n) => n.id === currentId)
  const currentResult = guideResults.find((r) => r.id === currentId)

  const handleAnswer = (answer: "yes" | "no") => {
    if (!currentNode) return
    const nextId = answer === "yes" ? currentNode.yes : currentNode.no
    setHistory((prev) => [
      ...prev,
      { nodeId: currentId, answer, question: currentNode.question },
    ])
    setCurrentId(nextId)
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

  return (
    <div style={{ margin: "0 auto", color: "#e0e0e0" }}>
      <PageHeader backHref="/" backLabel="トップ" title="見分け方ガイド" />

      {history.length > 0 && (
        <SectionCard title="これまでの回答" style={{ fontSize: "0.8rem" }}>
          {history.map((entry, i) => (
            <div
              key={i}
              style={{
                color: "#999",
                marginBottom: "0.2rem",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  color: entry.answer === "yes" ? "#7cbe8c" : "#e07070",
                }}
              >
                {entry.answer === "yes" ? "はい" : "いいえ"}
              </span>
              <span>{entry.question}</span>
            </div>
          ))}
        </SectionCard>
      )}

      {isResult && currentResult ? (
        <div>
          <div
            style={{
              background: "#1e3d1f",
              borderRadius: "8px",
              padding: "1.25rem 1rem",
              marginBottom: "1rem",
              borderLeft: "4px solid #5a9a5c",
            }}
          >
            <div
              style={{
                color: "#999",
                fontSize: "0.8rem",
                marginBottom: "0.5rem",
              }}
            >
              この植物はおそらく…
            </div>
            <div
              style={{
                color: "#7cbe8c",
                fontSize: "1.4rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              {currentResult.family}
            </div>
            <p
              style={{
                color: "#e0e0e0",
                fontSize: "0.9rem",
                margin: "0 0 0.75rem",
                lineHeight: "1.6",
              }}
            >
              {currentResult.description}
            </p>
            <div
              style={{
                color: "#999",
                fontSize: "0.8rem",
                marginBottom: "0.25rem",
              }}
            >
              代表的な植物：
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {currentResult.examples.map((ex) => (
                <span
                  key={ex}
                  style={{
                    background: "#2d4a2d",
                    color: "#a0d0a2",
                    borderRadius: "4px",
                    padding: "0.2rem 0.6rem",
                    fontSize: "0.8rem",
                  }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            {history.length > 0 && (
              <Button
                variant="secondary"
                onClick={handleBack}
                style={{ flex: 1, padding: "0.75rem", fontSize: "0.9rem" }}
              >
                ← 前の質問に戻る
              </Button>
            )}
            <Button
              onClick={handleReset}
              style={{ flex: 1, padding: "0.75rem", fontSize: "0.9rem" }}
            >
              最初からやり直す
            </Button>
          </div>
        </div>
      ) : currentNode ? (
        <div>
          <SectionCard style={{ padding: "1.25rem 1rem" }}>
            <div
              style={{
                color: "#5a9a5c",
                fontSize: "0.78rem",
                marginBottom: "0.75rem",
                fontWeight: "bold",
              }}
            >
              質問 {history.length + 1}
            </div>
            <p
              style={{
                color: "#c8e8ca",
                fontSize: "1rem",
                margin: "0 0 0.75rem",
                lineHeight: "1.6",
                fontWeight: "bold",
              }}
            >
              {currentNode.question}
            </p>
            <p
              style={{
                color: "#999",
                fontSize: "0.82rem",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              ヒント：{currentNode.hint}
            </p>
          </SectionCard>

          <div
            style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}
          >
            <Button
              onClick={() => handleAnswer("yes")}
              style={{ flex: 1, padding: "1rem", fontSize: "1rem" }}
            >
              はい
            </Button>
            <button
              onClick={() => handleAnswer("no")}
              style={{
                flex: 1,
                background: "#8a4a4a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "1rem",
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              いいえ
            </button>
          </div>

          {history.length > 0 && (
            <Button
              variant="secondary"
              onClick={handleBack}
              style={{ width: "100%", padding: "0.6rem", fontSize: "0.85rem" }}
            >
              ← 前の質問に戻る
            </Button>
          )}
        </div>
      ) : (
        <p style={{ color: "#999" }}>エラーが発生しました。</p>
      )}
    </div>
  )
}

export default GuidePage

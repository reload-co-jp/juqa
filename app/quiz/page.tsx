"use client"

import { FC, useState } from "react"
import Link from "next/link"
import { quizzes, plants } from "lib/data"
import {
  PageHeader,
  SectionCard,
  Tag,
  Button,
} from "components/elements/layout"

type ShuffledQuiz = Quiz & { shuffledChoices: string[] }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const QuizPage: FC = () => {
  const [shuffledQuizzes, setShuffledQuizzes] = useState<ShuffledQuiz[]>(() =>
    shuffle(quizzes).map((q) => ({ ...q, shuffledChoices: shuffle(q.choices) }))
  )
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const quiz = shuffledQuizzes[current]
  const isCorrect = selected === quiz.answer
  const plant =
    quiz.plant_id !== null ? plants.find((p) => p.id === quiz.plant_id) : null

  const handleSelect = (choice: string) => {
    if (selected !== null) return
    setSelected(choice)
    if (choice === quiz.answer) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 >= shuffledQuizzes.length) {
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  const handleReset = () => {
    setShuffledQuizzes(
      shuffle(quizzes).map((q) => ({
        ...q,
        shuffledChoices: shuffle(q.choices),
      }))
    )
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  const typeLabel: Record<string, string> = {
    photo: "写真問題",
    feature: "特徴問題",
    identification: "見分け問題",
  }

  if (finished) {
    const percent = Math.round((score / shuffledQuizzes.length) * 100)
    return (
      <div style={{ margin: "0 auto", color: "#e0e0e0" }}>
        <PageHeader backHref="/" backLabel="トップ" title="クイズ結果" />

        <SectionCard style={{ padding: "2rem 1rem", textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
            {percent >= 80 ? "🌟" : percent >= 50 ? "🌿" : "📚"}
          </div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#7cbe8c",
              marginBottom: "0.25rem",
            }}
          >
            {score} / {shuffledQuizzes.length}
          </div>
          <div
            style={{ color: "#999", fontSize: "0.9rem", marginBottom: "1rem" }}
          >
            正解率 {percent}%
          </div>
          <div style={{ color: "#e0e0e0", fontSize: "0.9rem" }}>
            {percent >= 80
              ? "素晴らしい！植物の知識が豊富です。"
              : percent >= 50
                ? "まずまずです。もう少し学んでみましょう。"
                : "もっと学習してから再挑戦してみよう！"}
          </div>
        </SectionCard>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Button onClick={handleReset} style={{ flex: 1 }}>
            もう一度挑戦する
          </Button>
          <Link
            href="/"
            style={{
              flex: 1,
              background: "#2d2d2d",
              color: "#e0e0e0",
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "0.875rem",
              fontSize: "0.95rem",
              textDecoration: "none",
              textAlign: "center",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ margin: "0 auto", color: "#e0e0e0" }}>
      <PageHeader backHref="/" backLabel="トップ" title="クイズ" />

      {/* Progress */}
      <div style={{ marginBottom: "0.75rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "0.35rem",
            fontSize: "0.8rem",
            color: "#999",
          }}
        >
          <span>
            問題 {current + 1} / {shuffledQuizzes.length}
          </span>
          <span style={{ color: "#7cbe8c" }}>正解: {score}</span>
        </div>
        <div
          style={{ background: "#3a3a3a", borderRadius: "4px", height: "4px" }}
        >
          <div
            style={{
              background: "#5a9a5c",
              height: "4px",
              borderRadius: "4px",
              width: `${((current + (selected ? 1 : 0)) / shuffledQuizzes.length) * 100}%`,
              transition: "width 0.3s",
            }}
          />
        </div>
      </div>

      {/* Question card */}
      <SectionCard style={{ padding: "1.25rem 1rem" }}>
        <Tag style={{ display: "inline-block", marginBottom: "0.5rem" }}>
          {typeLabel[quiz.type] ?? quiz.type}
        </Tag>
        <p
          style={{
            color: "#e0e0e0",
            fontSize: "1rem",
            margin: 0,
            lineHeight: "1.6",
            fontWeight: "bold",
          }}
        >
          {quiz.question}
        </p>
      </SectionCard>

      {/* Choices */}
      <div style={{ marginBottom: "1rem" }}>
        {quiz.shuffledChoices.map((choice) => {
          let bg = "#2d2d2d"
          let border = "1px solid #444"
          let color = "#e0e0e0"

          if (selected !== null) {
            if (choice === quiz.answer) {
              bg = "#1e3d1f"
              border = "1px solid #5a9a5c"
              color = "#7cbe8c"
            } else if (choice === selected) {
              bg = "#3d1e1e"
              border = "1px solid #8a4a4a"
              color = "#e07070"
            }
          }

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              style={{
                width: "100%",
                background: bg,
                color,
                border,
                borderRadius: "8px",
                padding: "0.875rem 1rem",
                fontSize: "0.95rem",
                cursor: selected !== null ? "default" : "pointer",
                textAlign: "left",
                marginBottom: "0.5rem",
                display: "block",
                transition: "background 0.15s",
              }}
            >
              {choice}
            </button>
          )
        })}
      </div>

      {/* Answer feedback */}
      {selected !== null && (
        <div>
          <div
            style={{
              background: isCorrect ? "#1e3d1f" : "#3d1e1e",
              borderRadius: "8px",
              padding: "0.875rem 1rem",
              marginBottom: "1rem",
              borderLeft: `4px solid ${isCorrect ? "#5a9a5c" : "#8a4a4a"}`,
            }}
          >
            <div
              style={{
                color: isCorrect ? "#7cbe8c" : "#e07070",
                fontWeight: "bold",
                marginBottom: "0.25rem",
                fontSize: "0.95rem",
              }}
            >
              {isCorrect ? "正解！" : `不正解。正解は「${quiz.answer}」です。`}
            </div>
            {plant && (
              <div style={{ fontSize: "0.82rem", color: "#999" }}>
                関連植物：
                <Link
                  href={`/plants/${plant.id}`}
                  style={{
                    color: "#7cbe8c",
                    textDecoration: "none",
                    marginLeft: "0.25rem",
                  }}
                >
                  {plant.japanese_name} →
                </Link>
              </div>
            )}
          </div>

          <Button onClick={handleNext} style={{ width: "100%" }}>
            {current + 1 >= shuffledQuizzes.length
              ? "結果を見る"
              : "次の問題へ →"}
          </Button>
        </div>
      )}
    </div>
  )
}

export default QuizPage

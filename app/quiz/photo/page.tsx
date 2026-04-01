"use client"

import { FC, useState, useRef } from "react"
import Link from "next/link"
import { plants } from "lib/data"
import { shuffle } from "lib/utils"
import { PageHeader, SectionCard, Button } from "components/elements/layout"

type PhotoQuiz = {
  id: number
  plant_id: number
  question: string
  answer: string
  shuffledChoices: string[]
}

function generatePhotoQuizzes(count: number): PhotoQuiz[] {
  const shuffled = shuffle(plants)
  const selected = shuffled.slice(0, count)
  const others = shuffled.slice(count)
  return selected.map((plant, i) => {
    const distractors = others
      .slice(i * 3, i * 3 + 3)
      .map((p) => p.japanese_name)
    return {
      id: plant.id,
      plant_id: plant.id,
      question: "この植物は何？",
      answer: plant.japanese_name,
      shuffledChoices: shuffle([plant.japanese_name, ...distractors]),
    }
  })
}

const PhotoQuizPage: FC = () => {
  const [shuffledQuizzes, setShuffledQuizzes] = useState<PhotoQuiz[]>(() =>
    generatePhotoQuizzes(4)
  )
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const loadedCountRef = useRef(0)

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
    const newAnswers = [...answers, selected!]
    if (current + 1 >= shuffledQuizzes.length) {
      setAnswers(newAnswers)
      setFinished(true)
    } else {
      setAnswers(newAnswers)
      setCurrent((c) => c + 1)
      setSelected(null)
      setImageLoaded(false)
      loadedCountRef.current = 0
    }
  }

  const handleReset = () => {
    setShuffledQuizzes(generatePhotoQuizzes(4))
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setScore(0)
    setFinished(false)
    setImageLoaded(false)
    loadedCountRef.current = 0
  }

  const handleImageLoad = (total: number) => {
    loadedCountRef.current += 1
    if (loadedCountRef.current >= total) {
      setImageLoaded(true)
    }
  }

  if (finished) {
    const percent = Math.round((score / shuffledQuizzes.length) * 100)
    return (
      <div style={{ margin: "0 auto", color: "#e0e0e0" }}>
        <PageHeader backHref="/" backLabel="トップ" title="写真クイズ結果" />

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
              ? "素晴らしい！写真で植物を見分ける力がありますね。"
              : percent >= 50
                ? "まずまずです。もっと植物の写真を観察してみましょう。"
                : "実際に植物を観察して、もう一度挑戦してみよう！"}
          </div>
        </SectionCard>

        {/* Review */}
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              fontSize: "0.85rem",
              color: "#999",
              marginBottom: "0.5rem",
            }}
          >
            問題の振り返り
          </div>
          {shuffledQuizzes.map((q, i) => {
            const userAnswer = answers[i]
            const correct = userAnswer === q.answer
            const reviewPlant =
              q.plant_id !== null
                ? plants.find((p) => p.id === q.plant_id)
                : null
            return (
              <SectionCard
                key={q.id}
                style={{
                  padding: "0.875rem 1rem",
                  marginBottom: "0.5rem",
                  borderLeft: `4px solid ${correct ? "#5a9a5c" : "#8a4a4a"}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      color: correct ? "#7cbe8c" : "#e07070",
                      flexShrink: 0,
                      marginTop: "0.1rem",
                    }}
                  >
                    {correct ? "○" : "✕"}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#999",
                        marginBottom: "0.3rem",
                      }}
                    >
                      問題 {i + 1}
                    </div>
                    {reviewPlant &&
                      (reviewPlant.images.length > 1 ? (
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "0.3rem",
                            marginBottom: "0.4rem",
                          }}
                        >
                          {reviewPlant.images.map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt={img.caption}
                              style={{
                                width: "100%",
                                maxHeight: "400px",
                                aspectRatio: "1",
                                objectFit: "cover",
                                borderRadius: "4px",
                                display: "block",
                              }}
                            />
                          ))}
                        </div>
                      ) : (
                        <img
                          src={reviewPlant.image_url}
                          alt="植物の写真"
                          style={{
                            width: "100%",
                            maxHeight: "120px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            display: "block",
                            marginBottom: "0.4rem",
                          }}
                        />
                      ))}
                    <div style={{ fontSize: "0.82rem", color: "#999" }}>
                      正解：
                      <span style={{ color: "#7cbe8c", marginLeft: "0.25rem" }}>
                        {q.answer}
                      </span>
                      {!correct && (
                        <span style={{ marginLeft: "0.75rem" }}>
                          あなたの回答：
                          <span
                            style={{ color: "#e07070", marginLeft: "0.25rem" }}
                          >
                            {userAnswer}
                          </span>
                        </span>
                      )}
                    </div>
                    {reviewPlant && (
                      <div style={{ marginTop: "0.3rem", fontSize: "0.78rem" }}>
                        <Link
                          href={`/plants/${reviewPlant.id}`}
                          style={{ color: "#5a9a5c", textDecoration: "none" }}
                        >
                          {reviewPlant.japanese_name} の詳細 →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SectionCard>
            )
          })}
        </div>

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
      <PageHeader backHref="/" backLabel="トップ" title="写真クイズ" />

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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".5rem",
          justifyContent: "center",
        }}
      >
        {/* Question card */}
        <SectionCard style={{ padding: "1rem" }}>
          {plant && (
            <div key={current} style={{ position: "relative" }}>
              {!imageLoaded && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#3a3a3a",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      border: "3px solid #555",
                      borderTop: "3px solid #7cbe8c",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              )}
              {plant.images.length > 1 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "0.5rem",
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  {plant.images.map((img, i) => (
                    <img
                      key={i}
                      src={img.url}
                      alt={img.caption}
                      onLoad={() => handleImageLoad(plant.images.length)}
                      style={{
                        width: "100%",
                        maxHeight: "400px",
                        aspectRatio: "1",
                        objectFit: "cover",
                        borderRadius: "6px",
                        display: "block",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={plant.image_url}
                  alt="植物の写真"
                  onLoad={() => handleImageLoad(1)}
                  style={{
                    width: "100%",
                    maxHeight: "400px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: "block",
                    opacity: imageLoaded ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                />
              )}
            </div>
          )}
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
        <div style={{ marginBottom: "1rem", flexGrow: 1 }}>
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
                詳しく見る：
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

export default PhotoQuizPage

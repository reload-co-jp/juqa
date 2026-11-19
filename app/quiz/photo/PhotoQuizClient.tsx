"use client"

import { FC, useState } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { shuffle } from "lib/utils"
import { SEASONS, getFamily, imagePhoto, imageThumb, plantImages } from "lib/plants"
import { trackEvent } from "lib/analytics"
import { color, radius } from "lib/theme"
import { Breadcrumbs, PageIntro, Tag } from "components/elements/layout"

type PhotoQuiz = {
  plant: Plant
  choices: string[]
}

type Genre = {
  id: string
  group: string
  label: string
  description: string
  filter: (plant: Plant) => boolean
}

const QUIZ_COUNT = 5

const familyGenres: Genre[] = families
  .map((f) => ({ f, n: plants.filter((p) => p.family_id === f.id).length }))
  .filter((x) => x.n >= 8)
  .sort((a, b) => b.n - a.n)
  .slice(0, 6)
  .map(({ f }) => ({
    id: `family-${f.id}`,
    group: "科別",
    label: f.name,
    description: `${f.name}の仲間どうしで見分ける上級編`,
    filter: (p: Plant) => p.family_id === f.id,
  }))

const genres: Genre[] = [
  { id: "all", group: "おまかせ", label: "すべての植物", description: "収録しているすべての植物から出題", filter: () => true },
  ...SEASONS.map((s) => ({
    id: `season-${s.key}`,
    group: "季節別",
    label: `${s.label}の花`,
    description: `${s.label}（${s.months}）に花を咲かせる植物から出題`,
    filter: (p: Plant) => p.tags.includes(s.tag),
  })),
  ...familyGenres,
  { id: "mountain-plants", group: "テーマ別", label: "山の植物", description: "山地で見かけやすい植物を中心に出題", filter: (p) => p.tags.includes("山") },
  { id: "street-trees", group: "テーマ別", label: "街路樹", description: "街や公園で見かける木を見分ける", filter: (p) => p.tags.includes("街路樹") },
  { id: "weeds", group: "テーマ別", label: "身近な雑草", description: "道ばたや空き地の草花から出題", filter: (p) => p.tags.includes("雑草") },
  { id: "conifers", group: "テーマ別", label: "針葉樹", description: "針葉を持つ樹木だけで挑戦", filter: (p) => p.tags.includes("針葉") },
  { id: "acorns", group: "テーマ別", label: "どんぐり", description: "どんぐりをつける仲間を集中的に出題", filter: (p) => p.tags.includes("どんぐり") },
].filter((g) => plants.filter(g.filter).length >= QUIZ_COUNT)

const groups = [...new Set(genres.map((g) => g.group))]

function generate(pool: Plant[]): PhotoQuiz[] {
  const withPhoto = shuffle(pool.filter((p) => plantImages(p).length > 0))
  const selected = withPhoto.slice(0, QUIZ_COUNT)
  return selected.map((plant) => {
    // まず同じプールから、足りなければ全植物から誤答を選ぶ
    const others = shuffle(withPhoto.filter((p) => p.id !== plant.id))
    const extra = shuffle(plants.filter((p) => p.id !== plant.id && !others.includes(p)))
    const distractors = [...others, ...extra].slice(0, 3).map((p) => p.japanese_name)
    return { plant, choices: shuffle([plant.japanese_name, ...distractors]) }
  })
}

const PhotoQuizClient: FC = () => {
  const [genre, setGenre] = useState<Genre | null>(null)
  const [quizzes, setQuizzes] = useState<PhotoQuiz[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [finished, setFinished] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const start = (g: Genre) => {
    setGenre(g)
    setQuizzes(generate(plants.filter(g.filter)))
    setCurrent(0)
    setSelected(null)
    setAnswers([])
    setFinished(false)
    setPhotoIndex(0)
    trackEvent("quiz_start", { quiz_type: "photo", quiz_genre: g.id })
    window.scrollTo({ top: 0 })
  }

  const backToGenres = () => {
    setGenre(null)
    setQuizzes([])
  }

  const score = answers.filter((a, i) => quizzes[i] && a === quizzes[i].plant.japanese_name).length

  /* ---------- ジャンル選択 ---------- */
  if (!genre || quizzes.length === 0) {
    return (
      <div>
        <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { href: "/quiz", label: "学ぶ・クイズ" }, { label: "写真クイズ" }]} />
        <PageIntro
          eyebrow="PHOTO QUIZ"
          title="写真クイズ"
          lead={`写真を見て植物の名前を4つの選択肢から当てる、全${QUIZ_COUNT}問のクイズです。答えたあとに見分け方のポイントも確認できます。テーマを選んでスタートしてください。`}
        />
        {groups.map((group) => (
          <section key={group} aria-labelledby={`g-${group}`} style={{ marginBottom: "2rem" }}>
            <h2 id={`g-${group}`} className="serif" style={{ fontSize: "1.15rem", margin: "0 0 0.75rem" }}>
              {group}
            </h2>
            <ul className="grid-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {genres
                .filter((g) => g.group === group)
                .map((g) => (
                  <li key={g.id}>
                    <button
                      type="button"
                      onClick={() => start(g)}
                      className="card-link"
                      style={{ width: "100%", textAlign: "left", padding: "1rem 1.1rem", cursor: "pointer", font: "inherit" }}
                    >
                      <span style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", alignItems: "center" }}>
                        <span style={{ fontWeight: 700, fontSize: "1rem", color: color.ink }}>{g.label}</span>
                        <Tag variant="muted">{plants.filter(g.filter).length}種</Tag>
                      </span>
                      <span style={{ display: "block", marginTop: "0.35rem", fontSize: "0.83rem", color: color.muted, lineHeight: 1.7 }}>
                        {g.description}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    )
  }

  /* ---------- 結果 ---------- */
  if (finished) {
    const percent = Math.round((score / quizzes.length) * 100)
    return (
      <div className="container-narrow" style={{ paddingTop: "1.5rem" }}>
        <section
          aria-labelledby="result-title"
          style={{ background: color.surface, border: `1px solid ${color.border}`, borderRadius: radius.lg, padding: "2rem 1.25rem", textAlign: "center" }}
        >
          <Tag>{genre.label}</Tag>
          <h1 id="result-title" className="serif" style={{ fontSize: "1.4rem", margin: "0.75rem 0 0" }}>
            結果
          </h1>
          <p className="serif" style={{ fontSize: "3rem", fontWeight: 700, color: color.primary, margin: "0.25rem 0 0", lineHeight: 1.2 }}>
            {score} / {quizzes.length}
          </p>
          <p style={{ color: color.muted, margin: "0.25rem 0 0.75rem" }}>正解率 {percent}%</p>
          <p style={{ margin: 0 }}>
            {percent >= 80
              ? "すばらしい！写真で植物を見分ける力がありますね。"
              : percent >= 50
                ? "まずまずです。間違えた植物の見分け方を確認してみましょう。"
                : "見分けるポイントを確認して、もう一度挑戦してみましょう。"}
          </p>
        </section>

        <h2 className="serif" style={{ fontSize: "1.15rem", margin: "2rem 0 0.75rem" }}>
          ふりかえり
        </h2>
        <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.6rem" }}>
          {quizzes.map((q, i) => {
            const correct = answers[i] === q.plant.japanese_name
            const img = plantImages(q.plant)[0]
            return (
              <li
                key={q.plant.id}
                style={{ display: "flex", gap: "0.85rem", alignItems: "center", background: color.surface, border: `1px solid ${color.border}`, borderLeft: `4px solid ${correct ? color.primary : color.error}`, borderRadius: radius.md, padding: "0.6rem" }}
              >
                <img src={imageThumb(img)} alt="" width={72} height={72} style={{ width: "4.5rem", height: "4.5rem", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                <div style={{ fontSize: "0.88rem", minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 700, color: correct ? color.primary : color.error }}>
                    {correct ? "○ 正解" : "× 不正解"}
                    <span style={{ color: color.ink, marginLeft: "0.5rem" }}>{q.plant.japanese_name}</span>
                  </p>
                  {!correct && <p style={{ margin: 0, color: color.muted, fontSize: "0.8rem" }}>あなたの回答：{answers[i]}</p>}
                  <Link href={`/plants/${q.plant.id}`} style={{ fontSize: "0.8rem" }}>
                    見分け方を確認する →
                  </Link>
                </div>
              </li>
            )
          })}
        </ol>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          <button type="button" className="btn" onClick={() => start(genre)} style={{ flex: 1 }}>
            同じテーマでもう一度
          </button>
          <button type="button" className="btn btn--secondary" onClick={backToGenres} style={{ flex: 1 }}>
            テーマを選び直す
          </button>
        </div>
      </div>
    )
  }

  /* ---------- 出題 ---------- */
  const quiz = quizzes[current]
  const plant = quiz.plant
  const images = plantImages(plant)
  const photo = images[Math.min(photoIndex, images.length - 1)]
  const answer = plant.japanese_name
  const isCorrect = selected === answer
  const family = getFamily(plant)

  const choose = (choice: string) => {
    if (selected !== null) return
    setSelected(choice)
    trackEvent("quiz_answer", { quiz_type: "photo", quiz_genre: genre.id, correct: choice === answer ? 1 : 0, item_id: plant.id })
  }

  const next = () => {
    const newAnswers = [...answers, selected!]
    setAnswers(newAnswers)
    if (current + 1 >= quizzes.length) {
      const s = newAnswers.filter((a, i) => a === quizzes[i].plant.japanese_name).length
      trackEvent("quiz_complete", { quiz_type: "photo", quiz_genre: genre.id, score: s, total: quizzes.length })
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setPhotoIndex(0)
    }
    window.scrollTo({ top: 0 })
  }

  return (
    <div style={{ paddingTop: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem", flexWrap: "wrap" }}>
        <Tag>写真クイズ：{genre.label}</Tag>
        <button type="button" onClick={backToGenres} className="text-link" style={{ background: "none", border: "none", cursor: "pointer" }}>
          テーマを変更
        </button>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: color.muted, marginBottom: "0.3rem" }}>
          <span>
            第{current + 1}問 / 全{quizzes.length}問
          </span>
          <span>正解 {score + (selected && isCorrect ? 1 : 0)}</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={quizzes.length}
          aria-valuenow={current + (selected ? 1 : 0)}
          aria-label="進行状況"
          style={{ background: color.surfaceAlt, borderRadius: "999px", height: "6px" }}
        >
          <div style={{ background: color.primary, height: "6px", borderRadius: "999px", width: `${((current + (selected ? 1 : 0)) / quizzes.length) * 100}%`, transition: "width .3s" }} />
        </div>
      </div>

      <div className="split" style={{ gap: "1.5rem" }}>
        <div>
          <div style={{ borderRadius: radius.lg, overflow: "hidden", background: color.surfaceAlt, aspectRatio: "4 / 3" }}>
            <img
              key={`${plant.id}-${photoIndex}`}
              src={imagePhoto(photo)}
              alt="出題の植物の写真"
              width={800}
              height={600}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          {images.length > 1 && (
            <div role="group" aria-label="ほかの写真" style={{ display: "flex", gap: "0.4rem", marginTop: "0.5rem", overflowX: "auto" }}>
              {images.map((img, i) => (
                <button
                  key={img.url + i}
                  type="button"
                  onClick={() => setPhotoIndex(i)}
                  aria-pressed={i === photoIndex}
                  aria-label={`写真${i + 1}（${img.caption}）`}
                  style={{ padding: 0, border: `2px solid ${i === photoIndex ? "var(--c-primary)" : "transparent"}`, borderRadius: "8px", overflow: "hidden", background: "none", cursor: "pointer", flexShrink: 0 }}
                >
                  <img src={imageThumb(img)} alt="" width={64} height={48} style={{ width: "4rem", height: "3rem", objectFit: "cover", display: "block" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="serif" style={{ fontSize: "1.4rem", margin: "0 0 1rem" }}>
            この植物の名前は？
          </h1>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.5rem" }}>
            {quiz.choices.map((choice, i) => {
              const state =
                selected === null ? "idle" : choice === answer ? "correct" : choice === selected ? "wrong" : "dim"
              return (
                <li key={choice}>
                  <button
                    type="button"
                    onClick={() => choose(choice)}
                    disabled={selected !== null}
                    aria-describedby={selected ? "quiz-feedback" : undefined}
                    style={{
                      width: "100%",
                      minHeight: "3.25rem",
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      borderRadius: radius.md,
                      fontSize: "1rem",
                      font: "inherit",
                      cursor: selected === null ? "pointer" : "default",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      border: `2px solid ${state === "correct" ? color.primary : state === "wrong" ? color.error : color.border}`,
                      background: state === "correct" ? color.primarySoft : state === "wrong" ? color.errorSoft : color.surface,
                      color: state === "dim" ? color.subtle : color.ink,
                      fontWeight: state === "correct" ? 700 : 400,
                    }}
                  >
                    <span aria-hidden="true" style={{ width: "1.6rem", height: "1.6rem", borderRadius: "50%", background: color.surfaceAlt, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", flexShrink: 0 }}>
                      {state === "correct" ? "○" : state === "wrong" ? "×" : "ABCD"[i]}
                    </span>
                    {choice}
                  </button>
                </li>
              )
            })}
          </ul>

          {selected !== null && (
            <div
              id="quiz-feedback"
              role="status"
              style={{ marginTop: "1rem", padding: "1rem 1.1rem", borderRadius: radius.md, background: isCorrect ? color.primaryTint : color.errorSoft, border: `1px solid ${isCorrect ? color.primarySoft : color.errorSoft}` }}
            >
              <p style={{ margin: 0, fontWeight: 700, fontSize: "1.05rem", color: isCorrect ? color.primary : color.error }}>
                {isCorrect ? "正解！" : `不正解… 正解は「${answer}」`}
              </p>
              <p style={{ margin: "0.4rem 0 0", fontSize: "0.85rem", color: color.muted }}>
                {family?.name} ・ {plant.genus} ・ <i lang="la">{plant.scientific_name}</i>
              </p>
              <p style={{ margin: "0.5rem 0 0", fontSize: "0.9rem", lineHeight: 1.8 }}>{plant.description[0]}</p>
              {plant.identification.length > 0 && (
                <>
                  <p style={{ margin: "0.6rem 0 0.2rem", fontSize: "0.8rem", fontWeight: 700, color: color.inkSoft }}>見分けるポイント</p>
                  <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.88rem", lineHeight: 1.75 }}>
                    {plant.identification.slice(0, 3).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              )}
              <p style={{ margin: "0.6rem 0 0", fontSize: "0.85rem" }}>
                <Link href={`/plants/${plant.id}`} target="_blank">
                  {plant.japanese_name}の詳細を見る（新しいタブ）→
                </Link>
              </p>
            </div>
          )}

          {selected !== null && (
            <button type="button" className="btn" onClick={next} style={{ width: "100%", marginTop: "1rem" }}>
              {current + 1 >= quizzes.length ? "結果を見る" : "次の問題へ →"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PhotoQuizClient

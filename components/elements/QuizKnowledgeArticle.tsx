import Link from "next/link"
import { plants, quizzes } from "lib/data"

type ArticleSection = {
  title: string
  description: string
  quizIds: number[]
}

type RelatedLink = {
  href: string
  label: string
}

const typeLabel: Record<Quiz["type"], string> = {
  photo: "写真",
  feature: "特徴",
  identification: "見分け",
}

export const QuizKnowledgeArticle = ({
  emoji,
  title,
  subtitle,
  intro,
  sections,
  relatedLinks,
}: {
  emoji: string
  title: string
  subtitle: string
  intro: string[]
  sections: ArticleSection[]
  relatedLinks?: RelatedLink[]
}) => {
  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", color: "#e0e0e0" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/columns"
          style={{ color: "#7cbe8c", fontSize: "0.85rem", textDecoration: "none" }}
        >
          ← コラム一覧へ
        </Link>
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(90,154,92,0.2)",
            border: "1px solid #5a9a5c",
            borderRadius: "20px",
            padding: "0.2rem 0.75rem",
            fontSize: "0.7rem",
            color: "#a0d0a2",
            marginBottom: "0.75rem",
          }}
        >
          {emoji} 豆知識コラム
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            margin: "0 0 0.5rem",
            lineHeight: 1.35,
          }}
        >
          {title}
        </h1>
        <p style={{ color: "#999", fontSize: "0.9rem", margin: 0, lineHeight: 1.8 }}>
          {subtitle}
        </p>
      </div>

      <div
        style={{
          borderLeft: "3px solid #5a9a5c",
          paddingLeft: "1.25rem",
          marginBottom: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {intro.map((text) => (
          <p
            key={text}
            style={{ margin: 0, color: "#bbb", fontSize: "0.9rem", lineHeight: 1.9 }}
          >
            {text}
          </p>
        ))}
      </div>

      {sections.map((section) => {
        const items = section.quizIds
          .map((id) => quizzes.find((quiz) => quiz.id === id))
          .filter((quiz): quiz is Quiz => Boolean(quiz))

        return (
          <div
            key={section.title}
            style={{
              background: "#2d2d2d",
              borderRadius: "12px",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#7cbe8c",
                margin: "0 0 0.75rem",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                margin: "0 0 1rem",
                color: "#aaa",
                fontSize: "0.88rem",
                lineHeight: 1.8,
              }}
            >
              {section.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {items.map((quiz) => {
                const plant =
                  quiz.plant_id !== null
                    ? plants.find((item) => item.id === quiz.plant_id)
                    : null

                return (
                  <div
                    key={quiz.id}
                    style={{
                      background: "#242424",
                      borderRadius: "10px",
                      padding: "1rem 1.1rem",
                      borderLeft: "4px solid #5a9a5c",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "0.4rem",
                        alignItems: "center",
                        flexWrap: "wrap",
                        marginBottom: "0.55rem",
                      }}
                    >
                      <span
                        style={{
                          background: "#1e3d1f",
                          color: "#7cbe8c",
                          borderRadius: "999px",
                          padding: "0.12rem 0.5rem",
                          fontSize: "0.72rem",
                        }}
                      >
                        {typeLabel[quiz.type]}
                      </span>
                      {plant && (
                        <Link
                          href={`/plants/${plant.id}`}
                          style={{
                            color: "#93c99e",
                            textDecoration: "none",
                            fontSize: "0.78rem",
                          }}
                        >
                          {plant.japanese_name} →
                        </Link>
                      )}
                    </div>

                    <div
                      style={{
                        fontSize: "0.95rem",
                        color: "#eaeaea",
                        fontWeight: "bold",
                        lineHeight: 1.6,
                        marginBottom: "0.45rem",
                      }}
                    >
                      Q. {quiz.question}
                    </div>

                    <div
                      style={{
                        color: "#7cbe8c",
                        fontSize: "0.92rem",
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      A. {quiz.answer}
                    </div>

                    <p
                      style={{
                        margin: 0,
                        color: "#b8b8b8",
                        fontSize: "0.84rem",
                        lineHeight: 1.8,
                      }}
                    >
                      {plant
                        ? `${plant.description[0]} 見分けるときは${plant.identification[0]}をまず意識すると覚えやすくなります。`
                        : "科や特徴は、個別の植物名ではなく共通点でまとめて覚えると、現地での見分けにもつながります。"}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1.5rem",
          fontSize: "0.8rem",
        }}
      >
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
        {relatedLinks?.map((link) => (
          <Link key={link.href} href={link.href} style={{ color: "#7cbe8c", textDecoration: "none" }}>
            {link.label} →
          </Link>
        ))}
      </div>
    </div>
  )
}

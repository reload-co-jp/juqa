"use client"

import { useState } from "react"

const ContactPage = () => {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL
    if (!webhookUrl) {
      setStatus("error")
      return
    }
    setStatus("sending")
    try {
      await fetch(webhookUrl, {
        method: "POST",
        body: JSON.stringify({
          text: `📬 ジュカ！お問い合わせ\n*お名前:* ${name}\n*内容:*\n${message}`,
        }),
      })
      setStatus("done")
      setName("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <div style={{ maxWidth: "40rem", margin: "0 auto", color: "#e0e0e0" }}>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#7cbe8c",
          marginBottom: "2rem",
        }}
      >
        お問い合わせ
      </h1>

      {status === "done" ? (
        <div
          style={{
            background: "#1e3d1f",
            border: "1px solid #4a8a4c",
            borderRadius: "12px",
            padding: "2rem",
            textAlign: "center",
            color: "#a0d0a2",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✅</div>
          <p style={{ margin: 0, fontSize: "0.95rem" }}>
            お問い合わせを受け付けました。ありがとうございます。
          </p>
          <button
            onClick={() => setStatus("idle")}
            style={{
              marginTop: "1.5rem",
              background: "transparent",
              border: "1px solid #4a8a4c",
              borderRadius: "8px",
              color: "#7cbe8c",
              padding: "0.5rem 1.5rem",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            別のお問い合わせをする
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "#aaa",
                marginBottom: "0.4rem",
              }}
            >
              お名前
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="山田 太郎"
              style={{
                width: "100%",
                background: "#2d2d2d",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                color: "#e0e0e0",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.85rem",
                color: "#aaa",
                marginBottom: "0.4rem",
              }}
            >
              お問い合わせ内容
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              placeholder="ご質問・ご要望などをご記入ください"
              style={{
                width: "100%",
                background: "#2d2d2d",
                border: "1px solid #444",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                color: "#e0e0e0",
                fontSize: "0.95rem",
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          {status === "error" && (
            <p
              style={{
                color: "#e07070",
                fontSize: "0.85rem",
                marginBottom: "1rem",
              }}
            >
              送信に失敗しました。しばらく経ってから再度お試しください。
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            style={{
              width: "100%",
              background: status === "sending" ? "#3a6a3c" : "#5a9a5c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.875rem",
              fontSize: "0.95rem",
              fontWeight: "bold",
              cursor: status === "sending" ? "not-allowed" : "pointer",
            }}
          >
            {status === "sending" ? "送信中..." : "送信する"}
          </button>
        </form>
      )}
    </div>
  )
}

export default ContactPage

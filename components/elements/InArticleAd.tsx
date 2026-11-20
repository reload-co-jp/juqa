"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export const InArticleAd = () => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // 広告ブロッカー等で失敗しても本文表示には影響させない
    }
  }, [])

  return (
    <div style={{ margin: "0 0 2rem" }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-6542845006087970"
        data-ad-slot="4625326006"
      />
    </div>
  )
}

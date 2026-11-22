"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

const AdUnit = () => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // 広告ブロッカー等で失敗してもページ表示には影響させない
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6542845006087970"
      data-ad-slot="4829146611"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

/** 全ページ共通のディスプレイ広告。クライアント遷移ごとに広告枠を作り直す */
export const DisplayAd = () => {
  const pathname = usePathname()

  return (
    <aside aria-label="広告" className="container" style={{ margin: "2rem auto" }}>
      <AdUnit key={pathname} />
    </aside>
  )
}

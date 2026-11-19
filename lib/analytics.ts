/**
 * GA4 イベント送信。gtag は app/layout.tsx で本番のみ読み込まれる既存タグを利用し、
 * ここでは新たなタグを設置しない（未読み込み時は何もしない）。
 */
type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void

export const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag !== "function") return
  try {
    gtag("event", name, params)
  } catch {
    // 計測の失敗で画面動作を止めない
  }
}

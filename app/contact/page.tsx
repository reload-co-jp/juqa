import type { Metadata } from "next"
import ContactClient from "./ContactClient"
import { Breadcrumbs } from "components/elements/layout"

const siteUrl = "https://juqa.reload.co.jp"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "ジュカ！へのご質問・ご要望はこちらからお送りください。",
  alternates: {
    canonical: `${siteUrl}/contact/`,
  },
  openGraph: {
    title: "お問い合わせ | ジュカ！ (JuQa)",
    description: "ジュカ！へのご質問・ご要望はこちらからお送りください。",
    url: `${siteUrl}/contact/`,
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "お問い合わせ" }]} currentUrl={`${siteUrl}/contact/`} />
      <ContactClient />
    </div>
  )
}

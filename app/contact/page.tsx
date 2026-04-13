import type { Metadata } from "next"
import ContactClient from "./ContactClient"

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
  return <ContactClient />
}

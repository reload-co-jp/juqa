import type { Metadata } from "next"
import ContactClient from "./ContactClient"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "ジュカ！へのご質問・ご要望はこちらからお送りください。",
  openGraph: {
    title: "お問い合わせ | ジュカ！ (JuQa)",
    description: "ジュカ！へのご質問・ご要望はこちらからお送りください。",
    url: "https://juqa.reload.co.jp/contact/",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactClient />
}

import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs, PageIntro } from "components/elements/layout"
import { siteUrl } from "lib/seo"

const pageUrl = `${siteUrl}/privacy/`

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "ジュカ！ (JuQa) におけるアクセス解析やお問い合わせ情報の取り扱いについて。",
  alternates: { canonical: pageUrl },
}

const h2: React.CSSProperties = { fontSize: "1.15rem", margin: "2rem 0 0.5rem" }

export default function PrivacyPage() {
  return (
    <div className="container-narrow">
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "プライバシーポリシー" }]} currentUrl={pageUrl} />
      <PageIntro title="プライバシーポリシー" lead="ジュカ！ (JuQa)（以下「本サイト」）における、利用者の情報の取り扱いについて説明します。" />
      <div className="prose" style={{ lineHeight: 2, color: "var(--c-ink-soft)" }}>
        <h2 className="serif" style={h2}>アクセス解析について</h2>
        <p>
          本サイトでは、サイトの利用状況を把握し改善に役立てるため、Google LLC が提供するアクセス解析ツール「Google
          アナリティクス」を利用しています。Google アナリティクスは Cookie
          を使用して、閲覧したページや検索した語句、クイズなどの操作といった利用状況のデータを収集します。このデータに氏名などの個人を特定する情報は含まれません。
        </p>
        <p>
          データの収集はブラウザの設定で Cookie を無効にすることで拒否できます。Google によるデータの取り扱いについては{" "}
          <a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noreferrer">
            Google のサービスを使用するサイトやアプリから収集した情報の Google による使用
          </a>{" "}
          をご確認ください。
        </p>
        <h2 className="serif" style={h2}>お問い合わせで送信された情報について</h2>
        <p>
          <Link href="/contact">お問い合わせフォーム</Link>
          から送信されたお名前とお問い合わせ内容は、運営者への連絡とその回答のためにのみ利用します。
        </p>
        <h2 className="serif" style={h2}>端末への保存について</h2>
        <p>本サイトはオフラインでも閲覧しやすくするため、Service Worker を使って閲覧したページをお使いの端末に一時保存することがあります。</p>
        <h2 className="serif" style={h2}>運営者</h2>
        <p>
          <a href="https://reload.co.jp" target="_blank" rel="noreferrer">
            Reload, Inc.
          </a>
        </p>
        <p>本ポリシーの内容は、必要に応じて変更することがあります。</p>
      </div>
    </div>
  )
}

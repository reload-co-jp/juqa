import type { Metadata, Viewport } from "next"
import { HeaderSearch } from "components/elements/HeaderSearch"
import { SiteNav } from "components/elements/SiteNav"
import { ClickTracker } from "components/Analytics"
import Link from "next/link"
import { Suspense } from "react"
import { families, plants } from "lib/data"
import { publisher, siteDescription, siteName, siteUrl } from "lib/seo"
import { globalCss } from "lib/theme"
import "./reset.css"
import "@xyflow/react/dist/style.css"

const basePath = ""

export const viewport: Viewport = {
  themeColor: "#2f5d3a",
}

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  metadataBase: new URL(siteUrl),
  description: siteDescription,
  keywords: ["植物", "樹木", "街路樹", "植物図鑑", "植物学習", "見分け方", "植物クイズ", "花", "木", "草", "科"],
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: `${siteUrl}/`,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${siteUrl}/icons/icon-512.png`,
        width: 512,
        height: 512,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/icons/icon-512.png`],
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://juqa.reload.co.jp/#website",
      url: "https://juqa.reload.co.jp/",
      name: siteName,
      description: siteDescription,
      inLanguage: "ja",
      publisher,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/plants/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Dataset",
      "@id": `${siteUrl}/#plant-dataset`,
      name: "ジュカ！植物データセット",
      description: `${plants.length}種の植物と${families.length}科の分類・見分け方・分布・タグを収録した日本語植物学習データ。`,
      url: `${siteUrl}/llms-full.txt`,
      inLanguage: "ja",
      isAccessibleForFree: true,
      creator: publisher,
      keywords: ["植物", "植物図鑑", "街路樹", "山野草", "植物分類", "見分け方"],
      distribution: {
        "@type": "DataDownload",
        contentUrl: `${siteUrl}/llms-full.txt`,
        encodingFormat: "text/plain",
      },
    },
  ],
}

const footerLinks: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "植物図鑑",
    links: [
      { href: "/plants", label: "植物一覧" },
      { href: "/families", label: "科から探す" },
      { href: "/seasons", label: "季節の植物" },
      { href: "/features", label: "特徴から探す" },
      { href: "/compare", label: "植物を比較する" },
      { href: "/gallery", label: "フォトギャラリー" },
    ],
  },
  {
    title: "学ぶ",
    links: [
      { href: "/columns", label: "植物コラム" },
      { href: "/guide", label: "見分け方ガイド" },
      { href: "/quiz/photo", label: "写真クイズ" },
      { href: "/flowers", label: "開花カレンダー" },
    ],
  },
  {
    title: "このサイトについて",
    links: [
      { href: "/about", label: "サイト概要" },
      { href: "/contact", label: "お問い合わせ" },
      { href: "/privacy", label: "プライバシーポリシー" },
      { href: "/credits", label: "著作権・写真の出典について" },
    ],
  },
]

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <style dangerouslySetInnerHTML={{ __html: globalCss }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {process.env.NODE_ENV === "production" && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=G-JMJYKDGGNC"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JMJYKDGGNC');
            `,
              }}
            />
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('${basePath}/sw.js', { scope: '${basePath}/' });
                });
              }
            `,
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          本文へ移動
        </a>
        <header className="site-header">
          <div className="container site-header__inner">
            <div className="site-header__bar">
              <Link href="/" className="site-header__logo" aria-label="ジュカ！ (JuQa) ホーム">
                <span
                  className="serif"
                  style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "0.02em" }}
                >
                  JuQa!
                </span>
                <small style={{ fontSize: "0.72rem", color: "#5c655d" }}>
                  ジュカ！植物図鑑
                </small>
              </Link>
              <div className="site-header__search">
                <Suspense fallback={null}>
                  <HeaderSearch />
                </Suspense>
              </div>
            </div>
            <SiteNav />
          </div>
        </header>
        <main id="main" className="container" style={{ minHeight: "60vh" }}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <p className="serif" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                  JuQa!
                </p>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.9, margin: "0.5rem 0 0", color: "#c5d1c2" }}>
                  植物を知る、散歩が変わる。
                  <br />
                  街路樹や公園、山で出会う植物を探して、見分けて、学ぶ植物図鑑。
                  {plants.length}種・{families.length}科を収録。
                </p>
              </div>
              {footerLinks.map((group) => (
                <nav key={group.title} aria-label={group.title}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", margin: "0 0 0.6rem", letterSpacing: "0.08em" }}>
                    {group.title}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.35rem", fontSize: "0.85rem" }}>
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.15)",
                padding: "1.25rem 0 2rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem 1.5rem",
                fontSize: "0.78rem",
                color: "#b5c2b2",
              }}
            >
              <span>
                運営:{" "}
                <a href="https://reload.co.jp" target="_blank" rel="noreferrer">
                  Reload, Inc.
                </a>
              </span>
              <span>植物写真: Wikimedia Commons（各写真の出典は詳細ページに記載）</span>
              <a href="https://github.com/reload-co-jp/juqa" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <span style={{ marginLeft: "auto" }}>&copy; Reload, Inc.</span>
            </div>
          </div>
        </footer>
        <ClickTracker />
      </body>
    </html>
  )
}
export default RootLayout

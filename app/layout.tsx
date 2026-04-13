import type { Metadata, Viewport } from "next"
import { Title } from "components/elements/layout"
import { HeaderSearch } from "components/elements/HeaderSearch"
import Link from "next/link"
import "./reset.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://juqa.reload.co.jp/"

const basePath = ""

export const viewport: Viewport = {
  themeColor: "#7cbe8c",
}

export const metadata: Metadata = {
  title: {
    default: "ジュカ！ (JuQa)",
    template: "%s | ジュカ！ (JuQa)",
  },
  description:
    "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
  keywords: ["植物", "樹木", "街路樹", "植物図鑑", "植物学習", "見分け方", "植物クイズ", "花", "木", "草", "科"],
  openGraph: {
    title: "ジュカ！ (JuQa)",
    description:
      "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
    url: siteUrl,
    siteName: "ジュカ！ (JuQa)",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ジュカ！ (JuQa)",
    description:
      "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://juqa.reload.co.jp/#website",
      url: "https://juqa.reload.co.jp/",
      name: "ジュカ！ (JuQa)",
      description: "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
      inLanguage: "ja",
      publisher: {
        "@type": "Organization",
        name: "Reload, Inc.",
        url: "https://reload.co.jp",
      },
    },
  ],
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
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
        <header
          style={{
            backgroundColor: "#7cbe8c",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: ".5rem 1rem",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Title>ジュカ！ (JuQa)</Title>
          </Link>
          <HeaderSearch />
        </header>
        <div style={{ backgroundColor: "#1e1e1e" }}>
          <main
            style={{
              padding: "1rem",
              maxWidth: "72rem",
              margin: "0 auto",
              width: "100%",
            }}
          >
            {children}
          </main>
        </div>
        <footer
          style={{
            backgroundColor: "#333",
            boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: ".75rem",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <p>
            <a href="//reload.co.jp" target="_blank" rel="noreferrer">
              &copy; Reload, Inc.
            </a>
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              href="/about"
              style={{ color: "#aaa", textDecoration: "none" }}
            >
              このサイトについて
            </Link>
            <Link
              href="/contact"
              style={{ color: "#aaa", textDecoration: "none" }}
            >
              お問い合わせ
            </Link>
            <a
              href="https://github.com/reload-co-jp/juqa"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#aaa", textDecoration: "none" }}
            >
              GitHub
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout

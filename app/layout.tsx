import type { Metadata, Viewport } from "next"
import { Title } from "components/elements/layout"
import { HeaderSearch } from "components/elements/HeaderSearch"
import Link from "next/link"
import { Suspense } from "react"
import { columns } from "lib/columns"
import { families, plants } from "lib/data"
import { publisher, siteDescription, siteName, siteUrl } from "lib/seo"
import "./reset.css"
import "@xyflow/react/dist/style.css"

const basePath = ""

export const viewport: Viewport = {
  themeColor: "#7cbe8c",
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
          <Suspense fallback={null}>
            <HeaderSearch />
          </Suspense>
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
            padding: "1.25rem 1rem",
          }}
        >
          <div
            style={{
              maxWidth: "72rem",
              margin: "0 auto",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 2fr)",
              gap: "1.5rem",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <p style={{ margin: 0 }}>
                <a href="//reload.co.jp" target="_blank" rel="noreferrer">
                  &copy; Reload, Inc.
                </a>
              </p>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
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
            </div>

            <div>
              <div
                style={{
                  color: "#d0d0d0",
                  fontWeight: "bold",
                  marginBottom: "0.6rem",
                  fontSize: "0.8rem",
                }}
              >
                すべてのコラム
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem 0.75rem",
                }}
              >
                {columns.map((column) => (
                  <Link
                    key={column.href}
                    href={column.href}
                    style={{
                      color: "#aaa",
                      textDecoration: "none",
                      lineHeight: 1.6,
                    }}
                  >
                    {column.emoji} {column.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout

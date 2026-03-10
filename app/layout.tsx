import type { Metadata } from "next"
import { Title } from "components/elements/layout"
import Link from "next/link"
import "./reset.css"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reload-co-jp.github.io/juqa/"

export const metadata: Metadata = {
  title: {
    default: "JuQa",
    template: "%s | JuQa",
  },
  description:
    "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
  openGraph: {
    title: "JuQa",
    description:
      "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
    url: siteUrl,
    siteName: "JuQa",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JuQa",
    description:
      "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header
          style={{
            backgroundColor: "#7cbe8c",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: ".5rem 1rem",
            position: "relative",
          }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Title>JuQa</Title>
          </Link>
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
          }}
        >
          <p>&copy; Reload, Inc.</p>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout

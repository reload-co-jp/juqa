import { Title } from "components/elements/layout"
import "./reset.css"

export const metadata = {
  title: "JuQa",
  description:
    "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <header
          style={{
            backgroundColor: "#333",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: ".5rem 1rem",
            position: "relative",
            borderBottom: "2px solid #5a9a5c",
          }}
        >
          <Title>JuQa</Title>
        </header>
        <div style={{ backgroundColor: "#1e1e1e" }}>
          <main
            style={{
              padding: "1rem",
              maxWidth: "64rem",
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

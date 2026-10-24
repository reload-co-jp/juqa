import { ComponentProps, FC, ReactNode } from "react"
import Link from "next/link"

export const Title: FC<ComponentProps<"div">> = ({
  style,
  children,
  ...props
}) => (
  <div
    style={{ fontSize: "1rem", fontWeight: "bold", margin: 0, ...style }}
    {...props}
  >
    {children}
  </div>
)

export const PageHeader: FC<{
  backHref: string
  backLabel: string
  title?: string
}> = ({ backHref, backLabel, title }) => (
  <div
    style={{
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    }}
  >
    <Link
      href={backHref}
      style={{ color: "#7cbe8c", fontSize: "0.85rem", textDecoration: "none" }}
    >
      ← {backLabel}
    </Link>
    {title && (
      <h1 style={{ margin: 0, fontSize: "1.1rem", color: "#e0e0e0" }}>
        {title}
      </h1>
    )}
  </div>
)

export const Breadcrumbs: FC<{ items: { href?: string; label: string }[] }> = ({
  items,
}) => (
  <nav aria-label="パンくずリスト" style={{ marginBottom: "1rem" }}>
    <ol
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "0.35rem",
        fontSize: "0.8rem",
        color: "#999",
      }}
    >
      {items.map((item, i) => (
        <li key={item.label} style={{ display: "flex", gap: "0.35rem" }}>
          {i > 0 && <span aria-hidden="true">›</span>}
          {item.href ? (
            <Link
              href={item.href}
              style={{ color: "#7cbe8c", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
)

export const SectionCard: FC<{
  title?: string
  children: ReactNode
  style?: React.CSSProperties
}> = ({ title, children, style }) => (
  <div
    style={{
      background: "#2d2d2d",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem",
      ...style,
    }}
  >
    {title && (
      <h2
        style={{ margin: "0 0 0.75rem", fontSize: "0.95rem", color: "#7cbe8c" }}
      >
        {title}
      </h2>
    )}
    {children}
  </div>
)

export const Tag: FC<{
  variant?: "green" | "muted"
  children: ReactNode
  style?: React.CSSProperties
}> = ({ variant = "green", children, style }) => (
  <span
    style={{
      background: variant === "green" ? "#1e3d1f" : "#2d2d2d",
      color: variant === "green" ? "#7cbe8c" : "#999",
      borderRadius: "4px",
      padding: "0.2rem 0.6rem",
      fontSize: "0.8rem",
      ...style,
    }}
  >
    {children}
  </span>
)

export const Button: FC<
  ComponentProps<"button"> & { variant?: "primary" | "secondary" }
> = ({ variant = "primary", style, children, ...props }) => (
  <button
    style={{
      background: variant === "primary" ? "#5a9a5c" : "#2d2d2d",
      color: variant === "primary" ? "#fff" : "#e0e0e0",
      border: variant === "primary" ? "none" : "1px solid #444",
      borderRadius: "8px",
      padding: "0.875rem",
      fontSize: "0.95rem",
      cursor: "pointer",
      fontWeight: variant === "primary" ? "bold" : "normal",
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
)

import { ComponentProps, FC, ReactNode } from "react"
import Link from "next/link"

export const Title: FC<ComponentProps<"h1">> = ({
  style,
  children,
  ...props
}) => (
  <h1 style={{ fontSize: "1rem", margin: 0, ...style }} {...props}>
    {children}
  </h1>
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
      <h2 style={{ margin: 0, fontSize: "1.1rem", color: "#e0e0e0" }}>
        {title}
      </h2>
    )}
  </div>
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
      <h3 style={{ margin: "0 0 0.75rem", fontSize: "0.95rem", color: "#7cbe8c" }}>
        {title}
      </h3>
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

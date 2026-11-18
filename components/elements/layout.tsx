import { ComponentProps, CSSProperties, FC, ReactNode } from "react"
import Link from "next/link"
import { siteUrl } from "lib/seo"
import { color, font, radius } from "lib/theme"

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

export const JsonLd: FC<{ data: unknown }> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

/** 旧来の「← 戻る」ヘッダー。新規ページでは PageIntro + Breadcrumbs を使う */
export const PageHeader: FC<{
  backHref: string
  backLabel: string
  title?: string
}> = ({ backHref, backLabel, title }) => (
  <div style={{ margin: "1.5rem 0 1.25rem" }}>
    <Link
      href={backHref}
      style={{ color: color.primary, fontSize: "0.85rem", textDecoration: "none" }}
    >
      ← {backLabel}
    </Link>
    {title && (
      <h1
        className="serif"
        style={{
          margin: "0.5rem 0 0",
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          color: color.ink,
          lineHeight: 1.35,
        }}
      >
        {title}
      </h1>
    )}
  </div>
)

export type Crumb = { href?: string; label: string }

const absolute = (href: string) =>
  `${siteUrl}${href === "/" ? "/" : `${href.replace(/\/$/, "")}/`}`

export const breadcrumbJsonLd = (items: Crumb[], currentUrl?: string) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.label,
    ...(item.href
      ? { item: absolute(item.href) }
      : currentUrl
        ? { item: currentUrl }
        : {}),
  })),
})

/** パンくずリスト（BreadcrumbList 構造化データも出力する） */
export const Breadcrumbs: FC<{
  items: Crumb[]
  currentUrl?: string
  style?: CSSProperties
}> = ({ items, currentUrl, style }) => (
  <nav
    aria-label="パンくずリスト"
    style={{ margin: "1.25rem 0 1rem", ...style }}
  >
    <JsonLd data={breadcrumbJsonLd(items, currentUrl)} />
    <ol
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexWrap: "wrap",
        gap: "0.15rem 0.4rem",
        fontSize: "0.8rem",
        color: color.muted,
      }}
    >
      {items.map((item, i) => (
        <li
          key={`${item.label}-${i}`}
          style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}
        >
          {i > 0 && (
            <span aria-hidden="true" style={{ color: color.subtle }}>
              /
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              style={{ color: color.primary, textDecoration: "none" }}
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

/** ページ冒頭の見出しブロック */
export const PageIntro: FC<{
  eyebrow?: string
  title: string
  lead?: ReactNode
  children?: ReactNode
}> = ({ eyebrow, title, lead, children }) => (
  <header style={{ margin: "0.5rem 0 2rem", maxWidth: "48rem" }}>
    {eyebrow && (
      <p
        style={{
          margin: "0 0 0.4rem",
          fontSize: "0.78rem",
          letterSpacing: "0.12em",
          color: color.primary,
          fontWeight: 700,
        }}
      >
        {eyebrow}
      </p>
    )}
    <h1
      className="serif"
      style={{
        margin: 0,
        fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)",
        lineHeight: 1.35,
        color: color.ink,
        fontWeight: 700,
      }}
    >
      {title}
    </h1>
    {lead && (
      <p
        style={{
          margin: "0.75rem 0 0",
          color: color.muted,
          fontSize: "0.98rem",
          lineHeight: 1.9,
        }}
      >
        {lead}
      </p>
    )}
    {children}
  </header>
)

/** セクション見出し（h2） */
export const SectionHeading: FC<{
  title: string
  id?: string
  eyebrow?: string
  href?: string
  more?: string
  lead?: ReactNode
  as?: "h2" | "h3"
}> = ({ title, id, eyebrow, href, more = "すべて見る", lead, as = "h2" }) => {
  const H = as
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <div>
          {eyebrow && (
            <p
              style={{
                margin: "0 0 0.2rem",
                fontSize: "0.72rem",
                letterSpacing: "0.14em",
                color: color.primary,
                fontWeight: 700,
              }}
            >
              {eyebrow}
            </p>
          )}
          <H
            id={id}
            className="serif"
            style={{
              margin: 0,
              fontSize: as === "h2" ? "clamp(1.25rem, 3vw, 1.6rem)" : "1.15rem",
              lineHeight: 1.4,
              color: color.ink,
              fontWeight: 700,
            }}
          >
            {title}
          </H>
        </div>
        {href && (
          <Link href={href} className="text-link" style={{ whiteSpace: "nowrap" }}>
            {more} →
          </Link>
        )}
      </div>
      {lead && (
        <p
          style={{
            margin: "0.4rem 0 0",
            color: color.muted,
            fontSize: "0.9rem",
          }}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

export const Section: FC<{
  children: ReactNode
  style?: CSSProperties
  id?: string
  labelledBy?: string
}> = ({ children, style, id, labelledBy }) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    style={{ margin: "3rem 0", ...style }}
  >
    {children}
  </section>
)

export const SectionCard: FC<{
  title?: string
  children: ReactNode
  style?: CSSProperties
}> = ({ title, children, style }) => (
  <div
    style={{
      background: color.surface,
      border: `1px solid ${color.border}`,
      borderRadius: radius.lg,
      padding: "1.25rem",
      marginBottom: "1rem",
      ...style,
    }}
  >
    {title && (
      <h2
        className="serif"
        style={{
          margin: "0 0 0.75rem",
          fontSize: "1.1rem",
          color: color.ink,
        }}
      >
        {title}
      </h2>
    )}
    {children}
  </div>
)

export const Tag: FC<{
  variant?: "green" | "muted" | "accent"
  children: ReactNode
  style?: CSSProperties
}> = ({ variant = "green", children, style }) => (
  <span
    style={{
      display: "inline-block",
      background:
        variant === "green"
          ? color.primarySoft
          : variant === "accent"
            ? color.accentSoft
            : color.surfaceAlt,
      color:
        variant === "green"
          ? color.primaryStrong
          : variant === "accent"
            ? color.accent
            : color.muted,
      borderRadius: radius.pill,
      padding: "0.1rem 0.65rem",
      fontSize: "0.78rem",
      lineHeight: 1.7,
      fontFamily: font.sans,
      ...style,
    }}
  >
    {children}
  </span>
)

export const Button: FC<
  ComponentProps<"button"> & { variant?: "primary" | "secondary" }
> = ({ variant = "primary", className, children, ...props }) => (
  <button
    type="button"
    className={`btn${variant === "secondary" ? " btn--secondary" : ""}${className ? ` ${className}` : ""}`}
    {...props}
  >
    {children}
  </button>
)

/** 説明つきの入口カード */
export const LinkCard: FC<{
  href: string
  title: string
  description?: string
  meta?: string
  icon?: ReactNode
  image?: string
  imageAlt?: string
  track?: string
}> = ({ href, title, description, meta, icon, image, imageAlt = "", track }) => (
  <Link
    href={href}
    className="card-link"
    data-track={track ? "select_content" : undefined}
    data-track-content-type={track}
    data-track-item-id={track ? href : undefined}
  >
    {image && (
      <div className="card-photo" style={{ aspectRatio: "16 / 9" }}>
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" width={480} height={270} />
      </div>
    )}
    <div style={{ padding: "1rem 1.1rem 1.15rem" }}>
      <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
        {icon && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              background: color.primarySoft,
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}
        <span
          style={{
            fontWeight: 700,
            color: color.ink,
            fontSize: "1rem",
            lineHeight: 1.45,
          }}
        >
          {title}
        </span>
      </div>
      {description && (
        <p
          style={{
            margin: "0.5rem 0 0",
            color: color.muted,
            fontSize: "0.85rem",
            lineHeight: 1.75,
          }}
        >
          {description}
        </p>
      )}
      {meta && (
        <p
          style={{
            margin: "0.6rem 0 0",
            color: color.primary,
            fontSize: "0.78rem",
            fontWeight: 700,
          }}
        >
          {meta}
        </p>
      )}
    </div>
  </Link>
)

export const EmptyState: FC<{ title: string; children?: ReactNode }> = ({
  title,
  children,
}) => (
  <div
    role="status"
    style={{
      textAlign: "center",
      padding: "3rem 1rem",
      background: color.surface,
      border: `1px dashed ${color.borderStrong}`,
      borderRadius: radius.lg,
    }}
  >
    <p style={{ fontSize: "2rem", margin: 0 }} aria-hidden="true">
      🌱
    </p>
    <p style={{ fontWeight: 700, margin: "0.5rem 0", color: color.ink }}>
      {title}
    </p>
    {children}
  </div>
)

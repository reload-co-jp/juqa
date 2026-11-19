import type { Metadata } from "next"
import Link from "next/link"
import React from "react"
import { plants } from "lib/data/plant"
import { publisher, siteUrl } from "lib/seo"
import { Breadcrumbs } from "components/elements/layout"

export const columnSiteUrl = siteUrl

export type ColumnMetadataInput = {
  path: `/columns/${string}/`
  title: string
  description: string
  ogImage?: string
  ogImageAlt?: string
  keywords?: string[]
  twitterDescription?: string
  twitterCard?: "summary" | "summary_large_image"
}

export const columnPageUrl = (path: ColumnMetadataInput["path"]) =>
  `${columnSiteUrl}${path}`

export const createColumnMetadata = ({
  path,
  title,
  description,
  ogImage,
  ogImageAlt,
  keywords,
  twitterDescription,
  twitterCard = ogImage ? "summary_large_image" : "summary",
}: ColumnMetadataInput): Metadata => {
  const pageUrl = columnPageUrl(path)

  return {
    title,
    keywords,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | ジュカ！`,
      description,
      url: pageUrl,
      type: "article",
      ...(ogImage
        ? { images: [{ url: ogImage, alt: ogImageAlt ?? title }] }
        : {}),
    },
    twitter: {
      card: twitterCard,
      title: `${title} | ジュカ！`,
      description: twitterDescription ?? description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

export const createColumnJsonLd = ({
  path,
  title,
  description,
  ogImage,
}: Pick<ColumnMetadataInput, "path" | "title" | "description" | "ogImage">) => {
  const pageUrl = columnPageUrl(path)

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": pageUrl,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        headline: title,
        description,
        ...(ogImage ? { image: ogImage } : {}),
        inLanguage: "ja",
        isPartOf: { "@id": `${columnSiteUrl}/columns/` },
        publisher,
      },
    ],
  }
}

export const ColumnArticle = ({
  emoji,
  label = "コラム",
  title,
  subtitle,
  jsonLd,
  heroImage,
  heroAlt,
  heroCredit = "Photo: Wikimedia Commons",
  children,
}: {
  emoji: string
  label?: string
  title: string
  subtitle: string
  jsonLd?: Record<string, unknown>
  heroImage?: string
  heroAlt?: string
  heroCredit?: string
  children: React.ReactNode
}) => (
  <article style={{ maxWidth: "48rem", margin: "0 auto", color: "var(--c-ink)", fontSize: "1.02rem" }}>
    {jsonLd && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    )}
    <Breadcrumbs
      items={[
        { href: "/", label: "ホーム" },
        { href: "/columns", label: "コラム" },
        { label: title },
      ]}
    />

    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "inline-block",
          background: "rgba(47,93,58,0.2)",
          border: "1px solid var(--c-primary)",
          borderRadius: "20px",
          padding: "0.2rem 0.75rem",
          fontSize: "0.7rem",
          color: "var(--c-primary-strong)",
          marginBottom: "0.75rem",
        }}
      >
        {emoji} {label}
      </div>
      <h1
        className="serif"
        style={{
          fontSize: "clamp(1.6rem, 4.5vw, 2.2rem)",
          fontWeight: "bold",
          color: "var(--c-ink)",
          margin: "0 0 0.5rem",
          lineHeight: 1.35,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: "var(--c-muted)",
          fontSize: "0.9rem",
          margin: 0,
          lineHeight: 1.8,
        }}
      >
        {subtitle}
      </p>
    </div>

    {heroImage && (
      <div
        style={{
          marginBottom: "2rem",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <img
          src={heroImage}
          alt={heroAlt ?? title}
          style={{
            width: "100%",
            height: "clamp(220px, 40vw, 380px)",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            background: "var(--c-surface-alt)",
            padding: "0.4rem 0.75rem",
            fontSize: "0.7rem",
            color: "var(--c-subtle)",
          }}
        >
          {heroCredit}
        </div>
      </div>
    )}

    {children}
  </article>
)

export const ColumnIntro = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      borderLeft: "3px solid var(--c-primary)",
      paddingLeft: "1.25rem",
      marginBottom: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    }}
  >
    {children}
  </div>
)

export const Section = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div
    style={{
      background: "var(--c-surface)",
      border: "1px solid var(--c-border)",
      borderRadius: "16px",
      padding: "clamp(1.1rem, 3vw, 1.75rem)",
      marginBottom: "1.5rem",
    }}
  >
    <h2
      className="serif"
      style={{
        fontSize: "1.25rem",
        fontWeight: "bold",
        color: "var(--c-ink)",
        margin: "0 0 1rem",
      }}
    >
      {title}
    </h2>
    {children}
  </div>
)

export const PlantCard = ({
  plantId,
  points,
  tip,
}: {
  plantId: number
  points: string[]
  tip: string
}) => {
  const plant = plants.find((p) => p.id === plantId)
  if (!plant) return null

  return (
    <div
      style={{
        background: "var(--c-surface-alt)",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "0.75rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        <img
          src={`/images/plants/thumbs/${plant.id}-0.webp`}
          loading="lazy"
          width={80}
          height={80}
          alt={plant.japanese_name}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        <Link
          href={`/plants/${plant.id}`}
          style={{
            fontWeight: "bold",
            color: "var(--c-primary)",
            fontSize: "1.1rem",
            textDecoration: "none",
          }}
        >
          {plant.japanese_name} →
        </Link>
      </div>
      <ul
        style={{
          margin: "0 0 0.5rem",
          paddingLeft: "1.2rem",
          color: "var(--c-ink-soft)",
          fontSize: "0.875rem",
          lineHeight: 1.8,
        }}
      >
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div
        style={{
          background: "var(--c-primary-soft)",
          borderRadius: "6px",
          padding: "0.5rem 0.75rem",
          color: "var(--c-primary-strong)",
          fontSize: "0.8rem",
        }}
      >
        💡 {tip}
      </div>
    </div>
  )
}

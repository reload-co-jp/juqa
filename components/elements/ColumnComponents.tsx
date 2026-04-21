import type { Metadata } from "next"
import Link from "next/link"
import React from "react"
import { plants } from "lib/data/plant"

export const columnSiteUrl = "https://juqa.reload.co.jp"

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
      ...(ogImage ? { images: [{ url: ogImage, alt: ogImageAlt ?? title }] } : {}),
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
    "@type": "Article",
    "@id": pageUrl,
    url: pageUrl,
    headline: title,
    description,
    ...(ogImage ? { image: ogImage } : {}),
    inLanguage: "ja",
    isPartOf: { "@id": `${columnSiteUrl}/columns/` },
    publisher: {
      "@type": "Organization",
      name: "Reload, Inc.",
      url: "https://reload.co.jp",
    },
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
  backHref = "/columns",
  backLabel = "コラム一覧へ",
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
  backHref?: string
  backLabel?: string
  children: React.ReactNode
}) => (
  <div style={{ maxWidth: "48rem", margin: "0 auto", color: "#e0e0e0" }}>
    {jsonLd && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    )}
    <div style={{ marginBottom: "1.5rem" }}>
      <Link
        href={backHref}
        style={{ color: "#7cbe8c", fontSize: "0.85rem", textDecoration: "none" }}
      >
        ← {backLabel}
      </Link>
    </div>

    <div style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "inline-block",
          background: "rgba(90,154,92,0.2)",
          border: "1px solid #5a9a5c",
          borderRadius: "20px",
          padding: "0.2rem 0.75rem",
          fontSize: "0.7rem",
          color: "#a0d0a2",
          marginBottom: "0.75rem",
        }}
      >
        {emoji} {label}
      </div>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#fff",
          margin: "0 0 0.5rem",
          lineHeight: 1.35,
        }}
      >
        {title}
      </h1>
      <p style={{ color: "#999", fontSize: "0.9rem", margin: 0, lineHeight: 1.8 }}>
        {subtitle}
      </p>
    </div>

    {heroImage && (
      <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <img
          src={heroImage}
          alt={heroAlt ?? title}
          style={{ width: "100%", height: "240px", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            background: "#2a2a2a",
            padding: "0.4rem 0.75rem",
            fontSize: "0.7rem",
            color: "#666",
          }}
        >
          {heroCredit}
        </div>
      </div>
    )}

    {children}
  </div>
)

export const ColumnIntro = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div
    style={{
      borderLeft: "3px solid #5a9a5c",
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
      background: "#2d2d2d",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
    }}
  >
    <h2
      style={{
        fontSize: "1rem",
        fontWeight: "bold",
        color: "#7cbe8c",
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
        background: "#242424",
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
          src={`/images/plants/${plant.id}-0.webp`}
          alt={plant.japanese_name}
          style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
        />
        <Link
          href={`/plants/${plant.id}`}
          style={{
            fontWeight: "bold",
            color: "#7cbe8c",
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
          color: "#ccc",
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
          background: "#1e3d1f",
          borderRadius: "6px",
          padding: "0.5rem 0.75rem",
          color: "#a0d0a2",
          fontSize: "0.8rem",
        }}
      >
        💡 {tip}
      </div>
    </div>
  )
}

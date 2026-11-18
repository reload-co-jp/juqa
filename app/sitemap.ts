import { MetadataRoute } from "next"
import { plants, families } from "lib/data"
import { columns } from "lib/columns"
import { activeFeatureCollections, comparisons } from "lib/collections"
import { SEASONS } from "lib/plants"

export const dynamic = "force-static"

const siteUrl = "https://juqa.reload.co.jp"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1.0, lastModified, changeFrequency: "weekly" },
    { url: `${siteUrl}/plants/`, priority: 0.9, lastModified, changeFrequency: "weekly" },
    { url: `${siteUrl}/families/`, priority: 0.9, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/flowers/`, priority: 0.8, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/quiz/photo/`, priority: 0.8, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/guide/`, priority: 0.8, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/`, priority: 0.8, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/explore/`, priority: 0.7, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/seasons/`, priority: 0.8, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/features/`, priority: 0.8, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/compare/`, priority: 0.7, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/gallery/`, priority: 0.6, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/quiz/`, priority: 0.6, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/privacy/`, priority: 0.2, lastModified, changeFrequency: "yearly" },
    { url: `${siteUrl}/credits/`, priority: 0.3, lastModified, changeFrequency: "yearly" },
    { url: `${siteUrl}/about/`, priority: 0.5, lastModified, changeFrequency: "yearly" },
    { url: `${siteUrl}/contact/`, priority: 0.3, lastModified, changeFrequency: "yearly" },
    { url: `${siteUrl}/llms.txt`, priority: 0.4, lastModified, changeFrequency: "weekly" },
    { url: `${siteUrl}/llms-full.txt`, priority: 0.4, lastModified, changeFrequency: "weekly" },
  ]

  const columnRoutes: MetadataRoute.Sitemap = columns.map((column) => ({
    url: `${siteUrl}${column.href}/`,
    priority: 0.75,
    lastModified,
    changeFrequency: "monthly",
  }))

  const plantRoutes: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: `${siteUrl}/plants/${plant.id}/`,
    priority: 0.7,
    lastModified,
  }))

  const familyRoutes: MetadataRoute.Sitemap = families.map((family) => ({
    url: `${siteUrl}/families/${family.id}/`,
    priority: 0.6,
    lastModified,
  }))

  const collectionRoutes: MetadataRoute.Sitemap = [
    ...SEASONS.map((s) => `${siteUrl}/seasons/${s.key}/`),
    ...activeFeatureCollections.map((c) => `${siteUrl}/features/${c.slug}/`),
    ...comparisons.map((c) => `${siteUrl}/compare/${c.slug}/`),
  ].map((url) => ({ url, priority: 0.7, lastModified, changeFrequency: "monthly" }))

  return [...staticRoutes, ...columnRoutes, ...plantRoutes, ...familyRoutes, ...collectionRoutes]
}

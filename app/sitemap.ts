import { MetadataRoute } from "next"
import { plants, families } from "lib/data"

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
    { url: `${siteUrl}/columns/conifer/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/tree-vs-herb/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/spring-mountain-flowers/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/rosaceae-plants/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/phylogenetic-tree/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/tree-identification-notes/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/wildflower-field-notes/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/plant-trivia-notes/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/petal-counts/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/mothers-day-flowers/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/hanafuda-plants/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/spring-flower-meanings/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/columns/wedding-flowers/`, priority: 0.75, lastModified, changeFrequency: "monthly" },
    { url: `${siteUrl}/about/`, priority: 0.5, lastModified, changeFrequency: "yearly" },
  ]

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

  return [...staticRoutes, ...plantRoutes, ...familyRoutes]
}

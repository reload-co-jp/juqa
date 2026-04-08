import { MetadataRoute } from "next"
import { plants, families } from "lib/data"

export const dynamic = "force-static"

const siteUrl = "https://juqa.reload.co.jp"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1.0, lastModified },
    { url: `${siteUrl}/plants/`, priority: 0.9, lastModified },
    { url: `${siteUrl}/families/`, priority: 0.9, lastModified },
    { url: `${siteUrl}/quiz/`, priority: 0.8, lastModified },
    { url: `${siteUrl}/quiz/photo/`, priority: 0.8, lastModified },
    { url: `${siteUrl}/guide/`, priority: 0.8, lastModified },
    { url: `${siteUrl}/columns/`, priority: 0.8, lastModified },
    { url: `${siteUrl}/columns/conifer/`, priority: 0.75, lastModified },
    { url: `${siteUrl}/columns/tree-vs-herb/`, priority: 0.75, lastModified },
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

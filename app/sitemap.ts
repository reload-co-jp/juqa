import { MetadataRoute } from "next"
import { plants, families } from "lib/data"

const siteUrl = "https://reload-co-jp.github.io/juqa"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, priority: 1.0 },
    { url: `${siteUrl}/plants/`, priority: 0.9 },
    { url: `${siteUrl}/families/`, priority: 0.9 },
    { url: `${siteUrl}/quiz/`, priority: 0.8 },
    { url: `${siteUrl}/quiz/photo/`, priority: 0.8 },
    { url: `${siteUrl}/guide/`, priority: 0.8 },
  ]

  const plantRoutes: MetadataRoute.Sitemap = plants.map((plant) => ({
    url: `${siteUrl}/plants/${plant.id}/`,
    priority: 0.7,
  }))

  const familyRoutes: MetadataRoute.Sitemap = families.map((family) => ({
    url: `${siteUrl}/families/${family.id}/`,
    priority: 0.6,
  }))

  return [...staticRoutes, ...plantRoutes, ...familyRoutes]
}

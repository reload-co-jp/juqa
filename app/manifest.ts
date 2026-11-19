import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const basePath = ""

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ジュカ！ (JuQa)",
    short_name: "ジュカ！",
    description:
      "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
    start_url: basePath + "/",
    scope: basePath + "/",
    display: "standalone",
    background_color: "#f7f5ee",
    theme_color: "#2f5d3a",
    icons: [
      {
        src: basePath + "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: basePath + "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}

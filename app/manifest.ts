import type { MetadataRoute } from "next"

const basePath = process.env.NODE_ENV === "production" ? "/juqa" : ""

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ジュカ！ (JuQa)",
    short_name: "ジュカ！",
    description:
      "街路樹や山で見かける植物を体系的に覚えるための学習ができるサイト",
    start_url: basePath + "/",
    scope: basePath + "/",
    display: "standalone",
    background_color: "#1e1e1e",
    theme_color: "#7cbe8c",
    icons: [
      {
        src: basePath + "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}

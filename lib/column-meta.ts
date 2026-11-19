import { readdirSync, readFileSync } from "fs"
import path from "path"
import { columns } from "lib/columns"
import { plantById, plantThumb } from "lib/plants"

/**
 * コラム本文中の /plants/{id} リンクから、コラムと植物の対応を作る（ビルド時のみ実行）。
 * サーバーコンポーネント専用。
 */
const columnsDir = path.join(process.cwd(), "app/columns")

export const columnPlantIds: Map<string, number[]> = new Map(
  readdirSync(columnsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const source = readFileSync(path.join(columnsDir, d.name, "page.tsx"), "utf8")
      const ids = [
        ...new Set(
          [...source.matchAll(/\/plants\/(\d+)|plantId=\{(\d+)\}/g)].map((m) =>
            Number(m[1] ?? m[2])
          )
        ),
      ]
      return [`/columns/${d.name}`, ids] as const
    })
)

/** コラムの代表画像（本文で最初に紹介される植物の写真） */
export const columnImage = (href: string) => {
  const ids = columnPlantIds.get(href) ?? []
  for (const id of ids) {
    const plant = plantById.get(id)
    if (plant) return { src: plantThumb(plant), alt: `${plant.japanese_name}の写真` }
  }
  return null
}

export const columnsForPlant = (plantId: number) =>
  columns.filter((c) => columnPlantIds.get(c.href)?.includes(plantId))

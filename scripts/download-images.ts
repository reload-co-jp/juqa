/**
 * Download and compress plant images from Wikimedia Commons.
 * Saves to public/images/plants/{plantId}-{index}.webp
 * Updates lib/data/plant.ts to add local_url fields.
 *
 * Usage: pnpm tsx scripts/download-images.ts
 */

import sharp from "sharp"
import fs from "fs"
import path from "path"

const OUT_DIR = path.join(process.cwd(), "public/images/plants")
const PLANT_FILE = path.join(process.cwd(), "lib/data/plant.ts")
const MAX_WIDTH = 800
const QUALITY = 75
const CONCURRENCY = 1
const DELAY_MS = 1500 // between requests

async function fetchImage(url: string): Promise<Buffer | null> {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "juqa-image-downloader/1.0 (educational project)" },
        redirect: "follow",
        signal: AbortSignal.timeout(30000),
      })
      if (res.status === 429) {
        const retryAfter = parseInt(res.headers.get("Retry-After") ?? "0") || attempt * 5
        console.warn(`  429 rate limit (attempt ${attempt}), waiting ${retryAfter}s...`)
        await new Promise((r) => setTimeout(r, retryAfter * 1000))
        continue
      }
      if (!res.ok) {
        console.warn(`  HTTP ${res.status} for ${url}`)
        return null
      }
      const buf = Buffer.from(await res.arrayBuffer())
      return buf
    } catch (e) {
      if (attempt === 5) {
        console.warn(`  Failed after 5 attempts: ${url} — ${e}`)
        return null
      }
      await new Promise((r) => setTimeout(r, 2000 * attempt))
    }
  }
  return null
}

async function compress(input: Buffer, outPath: string): Promise<void> {
  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath)
}

// Extract all image URLs and their plant IDs from plant.ts source
type ImageEntry = {
  plantId: number
  index: number // index within images array (0-based)
  originalUrl: string
  localPath: string // relative to public/
  localUrl: string // URL path used in <img src>
  outPath: string // absolute filesystem path
}

function extractImageEntries(src: string): ImageEntry[] {
  const entries: ImageEntry[] = []

  // Match each plant block: id: <number> ... images: [ ... ]
  const plantRegex = /\{\s*\n\s*id:\s*(\d+),[\s\S]*?images:\s*\[[\s\S]*?\],/g
  let plantMatch: RegExpExecArray | null
  while ((plantMatch = plantRegex.exec(src)) !== null) {
    const plantId = parseInt(plantMatch[1])
    const block = plantMatch[0]

    // Find all url entries in this block's images array
    const urlRegex = /url:\s*"(https:\/\/[^"]+)"/g
    let urlMatch: RegExpExecArray | null
    let idx = 0
    while ((urlMatch = urlRegex.exec(block)) !== null) {
      const originalUrl = urlMatch[1]
      const localPath = `images/plants/${plantId}-${idx}.webp`
      const localUrl = `/images/plants/${plantId}-${idx}.webp`
      const outPath = path.join(OUT_DIR, `${plantId}-${idx}.webp`)
      entries.push({ plantId, index: idx, originalUrl, localPath, localUrl, outPath })
      idx++
    }
  }

  return entries
}

function updatePlantTs(src: string, entries: ImageEntry[]): string {
  // Build map: originalUrl -> localUrl
  const urlMap = new Map<string, string>()
  for (const e of entries) {
    urlMap.set(e.originalUrl, e.localUrl)
  }

  // For each image entry in plant.ts, insert local_url after url line if not already present
  // Pattern: url: "...",\n        caption:
  // We need to add local_url: "..." between url and caption
  let result = src

  // Replace blocks that have url + caption without local_url
  result = result.replace(
    /(\s+url:\s*"(https:\/\/[^"]+)",\n)(\s+caption:)/g,
    (match, urlLine, url, captionPart) => {
      const localUrl = urlMap.get(url)
      if (!localUrl) return match
      // Skip if local_url already inserted (avoid duplicates on re-run)
      if (match.includes("local_url:")) return match
      const indent = urlLine.match(/^(\s+)/)?.[1] ?? "        "
      return `${urlLine}${indent}local_url: "${localUrl}",\n${captionPart}`
    }
  )

  // Add local_image_url after image_url field
  // Pattern: image_url:\n      "https://...",\n    images:
  // or: image_url: "https://...",\n    images:
  result = result.replace(
    /([ \t]+image_url:(?:\n[ \t]+)?"(https:\/\/[^"]+)",\n)([ \t]+images:)/g,
    (match, imageUrlBlock, url, imagesPart) => {
      if (match.includes("local_image_url:")) return match
      const localUrl = urlMap.get(url)
      if (!localUrl) return match
      const indent = imagesPart.match(/^([ \t]+)/)?.[1] ?? "    "
      return `${imageUrlBlock}${indent}local_image_url: "${localUrl}",\n${imagesPart}`
    }
  )

  return result
}

async function runPool<T>(items: T[], concurrency: number, fn: (item: T) => Promise<void>) {
  const queue = [...items]
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!
      await fn(item)
    }
  })
  await Promise.all(workers)
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  const src = fs.readFileSync(PLANT_FILE, "utf8")
  const entries = extractImageEntries(src)

  console.log(`Found ${entries.length} images across all plants.`)

  // Skip already downloaded
  const toDownload = entries.filter((e) => !fs.existsSync(e.outPath))
  const alreadyDone = entries.length - toDownload.length
  if (alreadyDone > 0) console.log(`Skipping ${alreadyDone} already downloaded.`)
  console.log(`Downloading ${toDownload.length} images (concurrency=${CONCURRENCY})...`)

  let done = 0
  let failed = 0

  await runPool(toDownload, CONCURRENCY, async (entry) => {
    await new Promise((r) => setTimeout(r, DELAY_MS))
    const buf = await fetchImage(entry.originalUrl)
    if (!buf) {
      failed++
      done++
      return
    }
    try {
      await compress(buf, entry.outPath)
      done++
      if (done % 10 === 0 || done === toDownload.length) {
        console.log(`  ${done}/${toDownload.length} done (${failed} failed)`)
      }
    } catch (e) {
      console.warn(`  Compress failed: ${entry.outPath} — ${e}`)
      failed++
      done++
    }
  })

  console.log(`\nDownload complete. ${failed} failed.`)

  // Only add local_url for successfully downloaded images
  const successEntries = entries.filter((e) => fs.existsSync(e.outPath))
  console.log(`Updating plant.ts with ${successEntries.length} local_url entries...`)

  const updated = updatePlantTs(src, successEntries)
  fs.writeFileSync(PLANT_FILE, updated, "utf8")
  console.log("plant.ts updated.")

  // Update types.d.ts to add local_url field
  console.log("Done.")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

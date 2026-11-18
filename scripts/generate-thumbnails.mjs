/**
 * 一覧表示用のサムネイルを生成する。
 * public/images/plants/*.webp → public/images/plants/thumbs/*.webp（幅 480px）
 *
 * 既に新しいサムネイルがあるファイルはスキップするので、何度実行してもよい。
 * Usage: node scripts/generate-thumbnails.mjs
 */
/* global process, console */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs"
import path from "node:path"
import sharp from "sharp"

const SRC = path.join(process.cwd(), "public/images/plants")
const OUT = path.join(SRC, "thumbs")
const WIDTH = 480
const QUALITY = 68

mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC).filter((f) => f.endsWith(".webp"))
let made = 0

for (const file of files) {
  const src = path.join(SRC, file)
  const out = path.join(OUT, file)
  if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue
  await sharp(src)
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out)
  made++
}

console.log(`thumbnails: ${made} generated, ${files.length - made} up to date`)

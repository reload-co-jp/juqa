# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Overview

- JuQa is a plant-learning site built with Next.js App Router and static export.
- The app is Japanese-language first and targets learning about street trees, mountain plants, flowers, and plant families.
- There is no external API or database. All content is stored in TypeScript files under `lib/` and rendered statically.

## Commands

```bash
pnpm dev        # 開発サーバー起動（port 3333）
pnpm build      # 静的ビルド（out/ に出力）
pnpm start      # 本番サーバー起動
pnpm lint       # ESLint
pnpm format     # Prettier（上書き）
pnpm typecheck  # 型チェック（tsc --noEmit）
pnpm textlint:columns      # コラム文章の textlint チェック
pnpm textlint:columns:fix  # コラム文章の textlint 自動修正
```

テストは存在しない。変更確認は基本的に `pnpm lint` と `pnpm typecheck`、必要に応じて `pnpm build` と手動確認で行う。

## Content lint rules

- `app/columns/**/*.tsx` に対して `textlint-rule-preset-ai-writing` を適用する。
- 設定は `.textlintrc.json`、除外は `.textlintignore`。
- コラムを追加・編集した場合は `pnpm textlint:columns` を実行する。

## Architecture

### Static site

- Next.js App Router を使用。
- `next.config.js` では `output: "export"`、`trailingSlash: true`、`images.unoptimized: true` を設定。
- 配信先は `https://juqa.reload.co.jp/`。以前の GitHub Pages 向け `basePath: /juqa` 前提ではない。
- `app/manifest.ts` と `public/sw.js` による PWA 対応がある。
- `app/sitemap.ts` で sitemap を静的生成する。

### Data layer

データはすべてローカルの TypeScript ファイルで管理する。

- `lib/data/plant.ts` - `Plant[]`。現在は 222 種。
- `lib/data/family.ts` - `Family[]`。現在は 66 科。
- `lib/data/quiz.ts` - `Quiz[]`。
- `lib/data/index.ts` - 上記データの re-export。
- `lib/guide.ts` - 見分け方ガイドの分岐データ。
- `lib/tags.ts` - 一覧フィルタ用のタググループ定義。
- `lib/region.ts` - `distribution` の文字列から地域タグを推定する補助関数。
- `lib/utils.ts` - Wikimedia 画像 URL の補助処理など。

型定義は `types.d.ts` にグローバル宣言されている。

- `Family`
- `Plant`
- `Quiz`
- `PlantTag`

### Routes

主なページ構成は以下。

| Route | Purpose |
|---|---|
| `/` | ホーム |
| `/plants` | 植物一覧 |
| `/plants/[id]` | 植物詳細 |
| `/families` | 科一覧 |
| `/families/[id]` | 科詳細 |
| `/flowers` | 開花カレンダー |
| `/guide` | 見分け方ガイド |
| `/quiz` | 植物クイズ |
| `/quiz/photo` | 写真クイズ専用ページ |
| `/columns` | コラム一覧 |
| `/columns/*` | 各コラム記事 |
| `/about` | このサイトについて |
| `/contact` | お問い合わせ |

`/plants`、`/guide`、`/quiz`、`/quiz/photo`、`/flowers` はクライアントコンポーネントを含む。

### Search and filter behavior

- `/plants` の状態は URL クエリで管理する。
- 使用するクエリパラメータは `q`、`family`、`tags`。
- `tags` はカンマ区切り。
- 地域タグは `distribution` の文言から `regionTagsFromDistribution()` で補完される。
- 検索は和名と学名が対象で、日本語入力の合成中イベントも考慮している。

### Quiz behavior

`Quiz["type"]` は以下の 3 種類。

- `photo`
- `feature`
- `identification`

`/quiz/photo` は写真クイズ専用導線で、通常の `/quiz` とは別ページになっている。

## Styling

- CSS フレームワークは使っていない。
- 大半の UI はインライン `style` で実装されている。
- 全体リセットとベースタイポグラフィは `app/reset.css` にある。
- ベースフォントは `Noto Sans JP`。
- 配色はダークテーマ基調で、背景 `#1e1e1e`、アクセント `#7cbe8c` が中心。

## Components

- 共通 UI 部品は主に `components/elements/layout.tsx` にある。
  - `Title`
  - `PageHeader`
  - `SectionCard`
  - `Tag`
  - `Button`
- そのほかに検索、地図、写真ギャラリー、ランダム植物表示などの独立コンポーネントがある。

## Images and plant content

- 植物画像は Wikimedia Commons の `Special:FilePath/...` URL を元にしている。
- ローカル圧縮画像は `public/images/plants/*.webp` に配置する。
- `Plant` では代表画像に `image_url` と `local_image_url`、ギャラリー画像に `images[].url` と `images[].local_url` を持てる。
- 画像ダウンロード補助スクリプトは `scripts/download-images.ts`。

## Working conventions

- 植物データや科データを編集したら、関連ページ表示が壊れていないか手動で確認する。
- コラムを編集したら `pnpm textlint:columns` を実行する。
- 画像や URL を追加する場合、静的エクスポート前提で相対パス・末尾スラッシュ・PWA 影響を意識する。
- `docs/add-plant.md` は plant 追加手順メモだが、件数や科数の例は古い可能性があるため、実データを優先して確認すること。

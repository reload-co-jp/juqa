# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # 開発サーバー起動
pnpm build      # 静的ビルド（out/ に出力）
pnpm lint       # ESLint
pnpm format     # Prettier（上書き）
pnpm typecheck  # 型チェック（tsc --noEmit）
pnpm textlint:columns      # コラム文章の textlint チェック
pnpm textlint:columns:fix  # コラム文章の textlint 自動修正
```

テストは存在しない。

## コラム文章の lint

`app/columns/**/*.tsx` に対して [textlint-rule-preset-ai-writing](https://github.com/textlint-ja/textlint-rule-preset-ai-writing) を適用する。設定は `.textlintrc.json`、対象外パスは `.textlintignore`。

コラムを追加・編集したら `pnpm textlint:columns` を実行すること。

## アーキテクチャ

### 静的サイト

Next.js App Router の静的エクスポート（`output: "export"`）。外部 API・DB なし。本番は GitHub Pages にホスティング（`basePath: /juqa`）。

### データ層

すべてのデータは `lib/data/` 以下に TypeScript 配列として定義。

- `lib/data/plant.ts` — `Plant[]`（100種）
- `lib/data/family.ts` — `Family[]`（38科）
- `lib/data/quiz.ts` — `Quiz[]`
- `lib/data/index.ts` — 上記を re-export
- `lib/guide.ts` — 見分け方ガイドの決定木（`GuideNode[]` / `GuideResult[]`）

型定義はすべて `types.d.ts` にグローバル宣言（`Plant`, `Family`, `Quiz`, `PlantTag`）。

### ページ構成

| ルート | 概要 |
|---|---|
| `/` | ホーム |
| `/plants` | 植物一覧（`"use client"`、URL クエリで状態管理） |
| `/plants/[id]` | 植物詳細 |
| `/families` | 科一覧 |
| `/families/[id]` | 科詳細 |
| `/quiz` | クイズ（`"use client"`） |
| `/guide` | 見分け方ガイド（`"use client"`） |
| `/explore` | 植物を探す（入口一覧） |
| `/seasons`, `/seasons/[season]` | 季節別一覧（spring/summer/autumn/winter） |
| `/features`, `/features/[slug]` | 特徴別一覧（定義は `lib/collections.ts`） |
| `/compare`, `/compare/[slug]` | 植物比較（定義は `lib/collections.ts`） |
| `/gallery` | フォトギャラリー |
| `/flowers` | 開花カレンダー |
| `/privacy`, `/credits` | プライバシーポリシー、写真の出典 |

`/plants` のフィルタ状態（検索ワード・科・タグ）は URL の `q` / `family` / `tags` クエリパラメータで管理する。

### スタイリング

CSS フレームワークなし（Tailwind 不使用）。インライン `style` が基本。

- デザイントークン（色・余白・角丸）は `lib/theme.ts` に CSS カスタムプロパティとして定義し、`color.primary` のように参照する
- レスポンシブ・hover・focus など インライン `style` で書けないものは `lib/theme.ts` の `globalCss` 内のクラス（`.grid-cards` `.card-link` `.chip` `.btn` など）で定義し、`app/layout.tsx` で注入
- ライトテーマ（背景アイボリー `#f7f5ee`）、メインカラーはフォレストグリーン（`#2f5d3a`）。見出しは `className="serif"`（Noto Serif JP）
- 一覧用サムネイルは `pnpm build` / `pnpm dev` 時に `scripts/generate-thumbnails.mjs` が `public/images/plants/thumbs/` に生成する（git 管理外）

### コンポーネント

`components/elements/layout.tsx` に `Breadcrumbs`（BreadcrumbList 構造化データも出力）・`PageIntro`・`SectionHeading`・`LinkCard`・`Tag` などの共通 UI 部品を定義。植物カードは `components/elements/PlantCard.tsx`。

植物データの補助関数（画像パス・開花季節・関連植物など）は `lib/plants.ts`。GA4 イベントは `lib/analytics.ts` の `trackEvent`、またはリンクに `data-track` 属性を付ける（`components/Analytics.tsx`）。

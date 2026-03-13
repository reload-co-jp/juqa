# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # 開発サーバー起動
pnpm build      # 静的ビルド（out/ に出力）
pnpm lint       # ESLint
pnpm format     # Prettier（上書き）
pnpm typecheck  # 型チェック（tsc --noEmit）
```

テストは存在しない。

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

`/plants` のフィルタ状態（検索ワード・科・タグ）は URL の `q` / `family` / `tags` クエリパラメータで管理する。

### スタイリング

CSS フレームワークなし。すべてインライン `style` で記述。ダークテーマ（背景 `#1e1e1e`）、緑系アクセント（`#7cbe8c`）。

### コンポーネント

`components/elements/layout.tsx` に `Title`・`PageHeader`・`Tag` などの共通 UI 部品を定義。

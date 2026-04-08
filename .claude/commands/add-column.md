# add-column

`app/columns/` に新しいコラムページを追加し、コラム一覧ページにも登録する。

## 手順

### 1. テーマ・スラッグの決定

- `$ARGUMENTS` にテーマが渡された場合はそれを元にする
- スラッグ（URL パス）を決める（例: `flower-color`、`alpine-plants` など、英小文字ハイフン区切り）
- 既存コラムと重複しないか `app/columns/` 以下を確認する

### 2. ヒーロー画像の選定

コラムの内容に合った Wikimedia Commons の画像を探す。

- `https://commons.wikimedia.org/wiki/Special:FilePath/ファイル名` の URL を試す
- **必ず curl で疎通確認する:**
  ```bash
  curl -o /dev/null -s -w "%{http_code} %{url_effective}\n" -L "<URL>"
  ```
- ステータスが `200` で最終 URL が `upload.wikimedia.org` の場合に採用
- `301` のままリダイレクト先が存在しない・`404` の場合は別のファイル名を探す
- Commons のカテゴリページ（例: `https://commons.wikimedia.org/wiki/Category:XXX`）を WebFetch で取得してファイル名を確認するのが確実

最終的には `upload.wikimedia.org` の直接 URL を使う（Special:FilePath のリダイレクト URL ではなく、curl の `url_effective` に表示される最終 URL）。

### 3. コラムページの作成

`app/columns/<スラッグ>/page.tsx` を新規作成する。

以下の構造を必ず守ること：

```tsx
import type { Metadata } from "next"
import Link from "next/link"

const siteUrl = "https://juqa.reload.co.jp"
const pageUrl = `${siteUrl}/columns/<スラッグ>/`
const ogImage = "<upload.wikimedia.org の直接 URL>"

export const metadata: Metadata = {
  title: "<コラムタイトル>",
  description: "<120字程度の説明>",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "<コラムタイトル> | ジュカ！",
    description: "<120字程度の説明>",
    url: pageUrl,
    type: "article",
    images: [{ url: ogImage, alt: "<画像の説明>" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "<コラムタイトル> | ジュカ！",
    description: "<80字程度の説明>",
    images: [ogImage],
  },
}

// Section コンポーネント（各コラムで定義）
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ background: "#2d2d2d", borderRadius: "12px", padding: "1.5rem", marginBottom: "1.5rem" }}>
    <h2 style={{ fontSize: "1rem", fontWeight: "bold", color: "#7cbe8c", margin: "0 0 1rem" }}>{title}</h2>
    {children}
  </div>
)

const Page = () => {
  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", color: "#e0e0e0" }}>
      {/* パンくず */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link href="/" style={{ color: "#7cbe8c", fontSize: "0.85rem", textDecoration: "none" }}>
          ← トップへ
        </Link>
      </div>

      {/* ヘッダー */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{
          display: "inline-block", background: "rgba(90,154,92,0.2)", border: "1px solid #5a9a5c",
          borderRadius: "20px", padding: "0.2rem 0.75rem", fontSize: "0.7rem", color: "#a0d0a2", marginBottom: "0.75rem",
        }}>
          <適切な絵文字> コラム
        </div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", margin: "0 0 0.5rem", lineHeight: 1.3 }}>
          <コラムタイトル>
        </h1>
        <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
          <サブタイトル（1行のキャッチコピー）>
        </p>
      </div>

      {/* ヒーロー画像 */}
      <div style={{ marginBottom: "2rem", borderRadius: "12px", overflow: "hidden" }}>
        <img
          src={ogImage}
          alt="<画像の説明>"
          style={{ width: "100%", height: "240px", objectFit: "cover", display: "block" }}
        />
        <div style={{ background: "#2a2a2a", padding: "0.4rem 0.75rem", fontSize: "0.7rem", color: "#666" }}>
          Photo: Wikimedia Commons
        </div>
      </div>

      {/* イントロ（3段落） */}
      <div style={{ borderLeft: "3px solid #5a9a5c", paddingLeft: "1.25rem", marginBottom: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {["<イントロ1>", "<イントロ2>", "<イントロ3>"].map((text, i) => (
          <p key={i} style={{ margin: 0, color: "#bbb", fontSize: "0.9rem", lineHeight: 1.9 }}>{text}</p>
        ))}
      </div>

      {/* 本文セクション群（内容に応じて複数） */}
      <Section title="<セクション1タイトル>">
        {/* セクション内容 */}
      </Section>

      {/* 関連リンク */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1.5rem", fontSize: "0.8rem" }}>
        <Link href="/columns" style={{ color: "#7cbe8c", textDecoration: "none" }}>
          コラム一覧へ →
        </Link>
        {/* 関連コラムがあれば追加 */}
      </div>
    </div>
  )
}

export default Page
```

### コンテンツ作成のガイドライン

- **イントロ:** 読者の「あるある」体験から入り、「実は〇〇」と答えを示す流れで 3 段落
- **セクション数:** 4〜6 個が目安
- **文体:** 「です・ます」調、難しい専門用語には補足を入れる
- **植物ページへのリンク:** 具体例として挙げる植物は `<Link href="/plants/<id>">` でリンクする
- **スタイル一貫性:** 背景 `#2d2d2d`、アクセント `#7cbe8c`、テキスト `#ccc` / `#e0e0e0` を維持

### 4. コラム一覧ページへの登録

`app/columns/page.tsx` の `columns` 配列に追記する:

```ts
{
  href: "/columns/<スラッグ>",
  emoji: "<絵文字>",
  title: "<コラムタイトル>",
  description: "<一覧に表示する説明文（80字程度）>",
  tags: ["<タグ1>", "<タグ2>", "<タグ3>"],
},
```

### 5. 品質チェック

```bash
pnpm textlint:columns   # 文章 lint
pnpm lint               # ESLint
pnpm typecheck          # 型チェック
```

エラーがあれば修正してから完了とする。

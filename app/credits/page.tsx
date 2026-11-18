import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs, PageIntro } from "components/elements/layout"
import { plants } from "lib/data"
import { commonsFileName, commonsFilePage } from "lib/plants"
import { siteUrl } from "lib/seo"
import { color } from "lib/theme"

const pageUrl = `${siteUrl}/credits/`

export const metadata: Metadata = {
  title: "著作権・写真の出典について",
  description: "ジュカ！ (JuQa) に掲載している植物写真の出典（Wikimedia Commons）と、文章・データの著作権について。",
  alternates: { canonical: pageUrl },
}

const sorted = [...plants].sort((a, b) => a.japanese_name.localeCompare(b.japanese_name, "ja"))

export default function CreditsPage() {
  const total = plants.reduce((n, p) => n + new Set(p.images.map((i) => i.url)).size, 0)
  return (
    <div className="container-narrow">
      <Breadcrumbs items={[{ href: "/", label: "ホーム" }, { label: "著作権・写真の出典について" }]} currentUrl={pageUrl} />
      <PageIntro title="著作権・写真の出典について" />
      <div className="prose" style={{ lineHeight: 2, color: color.inkSoft }}>
        <h2 className="serif" style={{ fontSize: "1.15rem", margin: "0 0 0.5rem" }}>植物の写真</h2>
        <p>
          本サイトの植物写真は、
          <a href="https://commons.wikimedia.org/" target="_blank" rel="noreferrer">
            Wikimedia Commons
          </a>
          で公開されているパブリックドメインまたはクリエイティブ・コモンズ等の自由なライセンスの画像を、表示用に縮小・圧縮して掲載しています。各写真の作者とライセンスは、下記一覧および各植物ページの「写真の出典」リンク先（Wikimedia
          Commons のファイル解説ページ）に記載されています。写真を再利用する場合は、リンク先に記載されたライセンス条件に従ってください。
        </p>
        <h2 className="serif" style={{ fontSize: "1.15rem", margin: "2rem 0 0.5rem" }}>文章・データ</h2>
        <p>
          植物の解説文・見分け方・コラムなどの文章とデータの著作権は運営者（Reload, Inc.）に帰属します。誤りのご指摘は
          <Link href="/contact">お問い合わせ</Link>からお知らせください。
        </p>
      </div>
      <h2 className="serif" style={{ fontSize: "1.15rem", margin: "2.5rem 0 0.75rem" }}>
        写真の出典一覧（{total}枚）
      </h2>
      <details>
        <summary className="text-link" style={{ cursor: "pointer" }}>
          一覧を開く
        </summary>
        <ul style={{ paddingLeft: "1.1rem", fontSize: "0.8rem", lineHeight: 1.8, marginTop: "0.75rem" }}>
          {sorted.map((p) => {
            const urls = [...new Map(p.images.map((i) => [i.url, i])).values()]
            return (
              <li key={p.id} style={{ marginBottom: "0.4rem" }}>
                <Link href={`/plants/${p.id}`}>{p.japanese_name}</Link>
                <ul style={{ paddingLeft: "1rem" }}>
                  {urls.map((img) => {
                    const page = commonsFilePage(img.url)
                    return (
                      <li key={img.url} style={{ wordBreak: "break-all" }}>
                        {img.caption}：
                        {page ? (
                          <a href={page} target="_blank" rel="noreferrer">
                            {commonsFileName(img.url) ?? "Wikimedia Commons"}
                          </a>
                        ) : (
                          img.url
                        )}
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
      </details>
    </div>
  )
}

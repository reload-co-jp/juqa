import type { Metadata } from "next"
import { plants, families } from "lib/data"

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "ジュカ！ (JuQa) は街路樹や山で見かける植物を体系的に学べる学習サイトです。",
}

const Page = () => {
  return (
    <div style={{ maxWidth: "48rem", margin: "0 auto", color: "#e0e0e0" }}>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#7cbe8c",
          marginBottom: "2rem",
        }}
      >
        このサイトについて
      </h1>

      <div
        style={{
          background: "#2d2d2d",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#7cbe8c",
            marginBottom: "0.75rem",
          }}
        >
          ジュカ！(JuQa) とは
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            lineHeight: 1.8,
            color: "#ccc",
            fontSize: "0.9rem",
            margin: 0,
          }}
        >
          <p>
            街路樹や公園・山で見かける植物を体系的に覚えるための学習サイトです。
            現在 {plants.length} 種の植物・{families.length}{" "}
            科のデータを収録しており、図鑑ブラウズ・科から探す・見分けガイド・クイズなど複数の学習方法に対応しています。
          </p>
          <p>
            このサイトは、制作者自身が街路に見かける植物や登山中に出会う植物についての知見を増やし、解像度の上がった散歩や山歩きができるようにしたいと思ったことがきっかけで作りました。名前を知らなかった植物にも名前や特徴が分かるようになると、いつもの道や風景が少し違って見えるようになります。
          </p>
          <p>
            また、専門的に細かく覚えるのではなく、まずは「なんとなく種類が分かる」くらいの感覚で、おおざっぱに植物の種類を覚えることへのハードルを下げたいと考えています。植物を知ることで、季節の移り変わりや風景の変化をより楽しめるような、そんなきっかけを提供していければと思っています。
          </p>
        </div>
      </div>

      <div
        style={{
          background: "#2d2d2d",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#7cbe8c",
            marginBottom: "0.75rem",
          }}
        >
          コンテンツについて
        </h2>
        <p
          style={{
            lineHeight: 1.8,
            color: "#ccc",
            fontSize: "0.9rem",
            margin: 0,
          }}
        >
          植物の画像は{" "}
          <a
            href="https://commons.wikimedia.org/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#7cbe8c" }}
          >
            Wikimedia Commons
          </a>{" "}
          のパブリックドメイン・CC
          ライセンス画像を使用しています。各植物の詳細ページに出典情報を掲載しています。
        </p>
      </div>

      <div
        style={{
          background: "#2d2d2d",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#7cbe8c",
            marginBottom: "0.75rem",
          }}
        >
          開発・運営
        </h2>
        <p
          style={{
            lineHeight: 1.8,
            color: "#ccc",
            fontSize: "0.9rem",
            margin: 0,
          }}
        >
          <a
            href="//reload.co.jp"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#7cbe8c" }}
          >
            Reload, Inc.
          </a>{" "}
          が開発・運営しています。ソースコードは{" "}
          <a
            href="https://github.com/reload-co-jp/juqa"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#7cbe8c" }}
          >
            GitHub
          </a>{" "}
          で公開しています。
        </p>
      </div>
    </div>
  )
}

export default Page

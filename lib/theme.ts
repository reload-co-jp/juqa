/**
 * JuQa! デザインシステム
 *
 * 色・余白・タイポグラフィは CSS カスタムプロパティとして定義し、
 * インライン style からは `color.primary` のように参照する。
 * レスポンシブ・hover・focus などインライン style で書けないものは
 * `globalCss` 内のクラスとして定義し、ルートレイアウトで注入する。
 */

export const color = {
  bg: "var(--c-bg)",
  surface: "var(--c-surface)",
  surfaceAlt: "var(--c-surface-alt)",
  border: "var(--c-border)",
  borderStrong: "var(--c-border-strong)",
  ink: "var(--c-ink)",
  inkSoft: "var(--c-ink-soft)",
  muted: "var(--c-muted)",
  subtle: "var(--c-subtle)",
  primary: "var(--c-primary)",
  primaryStrong: "var(--c-primary-strong)",
  primarySoft: "var(--c-primary-soft)",
  primaryTint: "var(--c-primary-tint)",
  onPrimary: "var(--c-on-primary)",
  accent: "var(--c-accent)",
  accentSoft: "var(--c-accent-soft)",
  gold: "var(--c-gold)",
  goldSoft: "var(--c-gold-soft)",
  error: "var(--c-error)",
  errorSoft: "var(--c-error-soft)",
} as const

export const font = {
  sans: "var(--font-sans)",
  serif: "var(--font-serif)",
} as const

export const radius = {
  sm: "6px",
  md: "10px",
  lg: "16px",
  pill: "999px",
} as const

export const space = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2.5rem",
  xxl: "4rem",
} as const

/** 季節ごとの控えめなアクセント色（花・実をイメージ） */
export const seasonColor: Record<string, { fg: string; bg: string }> = {
  春: { fg: "#a2486a", bg: "#f8e9ee" },
  夏: { fg: "#2c6e78", bg: "#e3f0f0" },
  秋: { fg: "#a4521f", bg: "#f6e9dc" },
  冬: { fg: "#3d5a80", bg: "#e6ebf3" },
}

/** 花色チップの表示色 */
export const flowerSwatch: Record<FlowerColor, string> = {
  白: "#ffffff",
  黄: "#f2c84b",
  ピンク: "#f0a6bd",
  赤: "#d2463c",
  青: "#4f7fd1",
  紫: "#8f63b8",
  橙: "#ec8a3a",
}

export const globalCss = `
:root {
  --c-bg: #f7f5ee;
  --c-surface: #ffffff;
  --c-surface-alt: #f0ede3;
  --c-border: #e3ded0;
  --c-border-strong: #cfc8b6;
  --c-ink: #232a24;
  --c-ink-soft: #3c453d;
  --c-muted: #5c655d;
  --c-subtle: #737b72;
  --c-primary: #2f5d3a;
  --c-primary-strong: #1f4229;
  --c-primary-soft: #e4ece0;
  --c-primary-tint: #f1f5ee;
  --c-on-primary: #ffffff;
  --c-accent: #a8482f;
  --c-accent-soft: #f6e6df;
  --c-gold: #8a6416;
  --c-gold-soft: #f5ecd6;
  --c-error: #a63a32;
  --c-error-soft: #f8e4e1;
  --font-sans: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic UI", "Yu Gothic", "Meiryo", sans-serif;
  --font-serif: "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif;
  --content-width: 72rem;
  --header-h: 3.5rem;
}

html { background: var(--c-bg); scroll-padding-top: 1rem; }
body { background: var(--c-bg); color: var(--c-ink); }
a { color: var(--c-primary); text-underline-offset: 0.2em; }
a:hover { color: var(--c-primary-strong); }
img { max-width: 100%; }
:focus-visible { outline: 3px solid #c99a2e; outline-offset: 2px; border-radius: 4px; }
::selection { background: #d9e6d3; }

.skip-link { position: absolute; left: -999px; top: 0; z-index: 100; background: var(--c-primary); color: #fff; padding: 0.5rem 1rem; }
.skip-link:focus { left: 1rem; top: 0.5rem; color: #fff; }

.container { width: 100%; max-width: var(--content-width); margin: 0 auto; padding: 0 1rem; }
.container-narrow { width: 100%; max-width: 46rem; margin: 0 auto; }
@media (min-width: 48rem) { .container { padding: 0 1.5rem; } }

.serif { font-family: var(--font-serif); }
.sp-only { display: none; }
@media (max-width: 40rem) { .sp-hide { display: none; } .sp-only { display: initial; } }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

/* ---------- Header ---------- */
.site-header { background: rgba(247,245,238,0.94); border-bottom: 1px solid var(--c-border); position: sticky; top: 0; z-index: 50; backdrop-filter: saturate(1.2) blur(6px); }
.site-header__bar { display: flex; align-items: center; gap: 1rem; min-height: var(--header-h); }
.site-header__logo { display: flex; align-items: baseline; gap: 0.5rem; text-decoration: none; color: var(--c-primary-strong); white-space: nowrap; }
.site-header__logo:hover { color: var(--c-primary-strong); }
.site-header__search { margin-left: auto; width: min(100%, 20rem); }
.site-nav { border-top: 1px solid var(--c-border); }
.site-nav ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 0.25rem; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.site-nav ul::-webkit-scrollbar { display: none; }
.site-nav a { display: block; padding: 0.6rem 0.75rem; font-size: 0.85rem; color: var(--c-ink-soft); text-decoration: none; white-space: nowrap; border-bottom: 2px solid transparent; }
.site-nav a:hover { color: var(--c-primary); }
.site-nav a[aria-current="page"] { color: var(--c-primary); border-bottom-color: var(--c-primary); font-weight: 700; }
@media (max-width: 40rem) {
  .site-header__search { width: auto; flex: 1; }
  .site-header__logo small { display: none; }
  .site-nav a { padding: 0.5rem 0.6rem; font-size: 0.8rem; }
}
@media (min-width: 64rem) {
  .site-header__bar { gap: 1.5rem; }
  .site-nav { border-top: none; }
  .site-header__inner { display: flex; align-items: center; gap: 1.5rem; }
  .site-header__inner .site-header__bar { flex: 1; }
}

/* ---------- Footer ---------- */
.site-footer { background: #233227; color: #d9e2d6; margin-top: 4rem; }
.site-footer a { color: #d9e2d6; text-decoration: none; }
.site-footer a:hover { color: #fff; text-decoration: underline; }
.footer-grid { display: grid; grid-template-columns: 1.3fr repeat(3, 1fr); gap: 2rem; padding: 3rem 0 2rem; }
@media (max-width: 56rem) { .footer-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 34rem) { .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; } }

/* ---------- Grids ---------- */
.grid { display: grid; gap: 1rem; }
.grid-cards { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr)); }
.grid-cards--sm { grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr)); gap: 0.75rem; }
.search-row { display: grid; gap: 1rem; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
@media (max-width: 40rem) { .search-row { grid-template-columns: 1fr; } }
.grid-2 { display: grid; gap: 1rem; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-3 { display: grid; gap: 1rem; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-4 { display: grid; gap: 1rem; grid-template-columns: repeat(4, minmax(0, 1fr)); }
@media (max-width: 56rem) { .grid-4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } .grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 34rem) {
  .grid-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; }
  .grid-cards--sm { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .grid-3, .grid-2--stack { grid-template-columns: 1fr; }
}

/* ---------- Cards ---------- */
.card-link { display: block; text-decoration: none; color: inherit; background: var(--c-surface); border: 1px solid var(--c-border); border-radius: 12px; overflow: hidden; transition: border-color .15s, transform .15s; height: 100%; }
.card-link:hover { border-color: var(--c-border-strong); color: inherit; transform: translateY(-2px); }
.card-link:hover .card-photo img { transform: scale(1.03); }
.card-photo { position: relative; aspect-ratio: 4 / 3; background: var(--c-surface-alt); overflow: hidden; }
.card-photo img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .3s; }
.card-photo--square { aspect-ratio: 1 / 1; }
@media (prefers-reduced-motion: reduce) { .card-link, .card-photo img { transition: none; } .card-link:hover { transform: none; } }

.chip { display: inline-flex; align-items: center; gap: 0.35rem; min-height: 2.25rem; padding: 0.3rem 0.85rem; border-radius: 999px; border: 1px solid var(--c-border-strong); background: var(--c-surface); color: var(--c-ink-soft); font-size: 0.85rem; cursor: pointer; text-decoration: none; line-height: 1.4; font-family: inherit; }
.chip:hover { border-color: var(--c-primary); color: var(--c-primary); }
.chip[aria-pressed="true"], .chip[aria-current="page"], .chip--active { background: var(--c-primary); border-color: var(--c-primary); color: #fff; }
.chip[aria-pressed="true"]:hover, .chip--active:hover { color: #fff; }

.btn { display: inline-flex; white-space: nowrap; align-items: center; justify-content: center; gap: 0.4rem; min-height: 2.75rem; padding: 0.6rem 1.25rem; border-radius: 999px; font-size: 0.95rem; font-weight: 700; text-decoration: none; cursor: pointer; border: 1px solid var(--c-primary); background: var(--c-primary); color: #fff; font-family: inherit; line-height: 1.4; }
.btn:hover { background: var(--c-primary-strong); border-color: var(--c-primary-strong); color: #fff; }
.btn--secondary { background: var(--c-surface); color: var(--c-primary); border-color: var(--c-border-strong); }
.btn--secondary:hover { background: var(--c-primary-tint); color: var(--c-primary-strong); border-color: var(--c-primary); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.input { width: 100%; min-height: 2.75rem; padding: 0.55rem 0.9rem; border-radius: 10px; border: 1px solid var(--c-border-strong); background: var(--c-surface); color: var(--c-ink); font-size: 1rem; font-family: inherit; }
.input:focus { border-color: var(--c-primary); outline: 2px solid #c8dbc4; outline-offset: 0; }
select.input { appearance: auto; }

.text-link { color: var(--c-primary); font-weight: 700; text-decoration: none; font-size: 0.9rem; }
.text-link:hover { text-decoration: underline; }

.prose p { margin: 0 0 1em; }
.prose p:last-child { margin-bottom: 0; }

/* ---------- Home hero ---------- */
.hero { position: relative; border-radius: 0 0 24px 24px; overflow: hidden; min-height: min(78vh, 40rem); display: flex; align-items: flex-end; color: #fff; background: #2a3a2c; }
.hero__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero__shade { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(20,30,22,0.05) 30%, rgba(20,30,22,0.72) 100%); }
.hero__body { position: relative; width: 100%; padding: 6rem 0 2.5rem; }
@media (max-width: 40rem) { .hero { min-height: 34rem; border-radius: 0 0 16px 16px; } .hero__body { padding-bottom: 1.75rem; } }

.split { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 2.5rem; align-items: start; }
.split--wide { grid-template-columns: minmax(0, 1fr) 20rem; }
@media (max-width: 56rem) { .split, .split--wide { grid-template-columns: 1fr; gap: 1.5rem; } }

.scroll-row { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(11rem, 1fr); gap: 0.75rem; overflow-x: auto; padding-bottom: 0.5rem; scroll-snap-type: x mandatory; }
.scroll-row > * { scroll-snap-align: start; }
@media (min-width: 56rem) { .scroll-row { grid-auto-flow: row; grid-template-columns: repeat(4, minmax(0, 1fr)); overflow: visible; } }

.info-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; }
.info-table th, .info-table td { text-align: left; padding: 0.7rem 0.25rem; border-bottom: 1px solid var(--c-border); vertical-align: top; }
.info-table th { width: 7.5rem; color: var(--c-muted); font-weight: 500; white-space: nowrap; }
.compare-table { width: 100%; border-collapse: collapse; font-size: 0.92rem; table-layout: fixed; }
.compare-table th, .compare-table td { padding: 0.85rem 0.75rem; border-bottom: 1px solid var(--c-border); vertical-align: top; text-align: left; }
.compare-table thead th { border-bottom: 2px solid var(--c-border-strong); }
.compare-table tbody th { width: 7rem; color: var(--c-muted); font-weight: 500; background: var(--c-primary-tint); }
@media (max-width: 40rem) { .compare-table tbody th { width: 4.5rem; font-size: 0.8rem; padding: 0.75rem 0.4rem; } .compare-table td { padding: 0.75rem 0.5rem; font-size: 0.85rem; } }

details.filter-more > summary { cursor: pointer; list-style: none; }
details.filter-more > summary::-webkit-details-marker { display: none; }

.masonry { columns: 4 14rem; column-gap: 0.75rem; }
.masonry > * { break-inside: avoid; margin-bottom: 0.75rem; }
@media (max-width: 34rem) { .masonry { columns: 2; column-gap: 0.5rem; } .masonry > * { margin-bottom: 0.5rem; } }
`

"use client"

import { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NAV_ITEMS = [
  { href: "/", label: "ホーム", match: (p: string) => p === "/" },
  { href: "/plants", label: "植物図鑑", match: (p: string) => p.startsWith("/plants") },
  {
    href: "/explore",
    label: "植物を探す",
    match: (p: string) =>
      ["/explore", "/families", "/features", "/compare", "/gallery", "/guide"].some((x) =>
        p.startsWith(x)
      ),
  },
  {
    href: "/seasons",
    label: "季節の植物",
    match: (p: string) => p.startsWith("/seasons") || p.startsWith("/flowers"),
  },
  { href: "/columns", label: "植物コラム", match: (p: string) => p.startsWith("/columns") },
  { href: "/quiz", label: "学ぶ・クイズ", match: (p: string) => p.startsWith("/quiz") },
]

export const SiteNav: FC = () => {
  const pathname = (usePathname() ?? "/").replace(/(.)\/$/, "$1")
  return (
    <nav className="site-nav" aria-label="メインメニュー">
      <ul>
        {NAV_ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={item.match(pathname) ? "page" : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

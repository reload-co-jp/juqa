"use client"

import { FC, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { plants } from "lib/data"
import { ComparisonTable } from "components/elements/ComparisonTable"
import { plantById } from "lib/plants"
import { trackEvent } from "lib/analytics"
import { color } from "lib/theme"

const sorted = [...plants].sort((a, b) => a.japanese_name.localeCompare(b.japanese_name, "ja"))

const CompareClient: FC = () => {
  const router = useRouter()
  const params = useSearchParams()
  const a = plantById.get(Number(params.get("a")))
  const b = plantById.get(Number(params.get("b")))

  const set = (key: "a" | "b", value: string) => {
    const next = new URLSearchParams(params.toString())
    if (value) next.set(key, value)
    else next.delete(key)
    router.replace(`?${next.toString()}#free-compare`, { scroll: false })
  }

  useEffect(() => {
    if (a && b) trackEvent("view_comparison", { comparison: `${a.id}-${b.id}`, source: "custom" })
  }, [a, b])

  return (
    <div>
      <div className="grid-2 grid-2--stack" style={{ marginBottom: "1.25rem" }}>
        {(["a", "b"] as const).map((key, i) => (
          <div key={key}>
            <label htmlFor={`cmp-${key}`} style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: color.muted, marginBottom: "0.3rem" }}>
              植物{i + 1}
            </label>
            <select id={`cmp-${key}`} className="input" value={(key === "a" ? a : b)?.id ?? ""} onChange={(e) => set(key, e.target.value)}>
              <option value="">選んでください</option>
              {sorted.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.japanese_name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      {a && b ? (
        a.id === b.id ? (
          <p style={{ color: color.muted }}>違う植物を2種選んでください。</p>
        ) : (
          <ComparisonTable a={a} b={b} />
        )
      ) : (
        <p style={{ color: color.muted, fontSize: "0.9rem" }}>2種を選ぶと、ここに比較表が表示されます。</p>
      )}
    </div>
  )
}

export default CompareClient

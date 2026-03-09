import { FC } from "react"
import Link from "next/link"
import { families, plants } from "lib/data"
import { PageHeader, Tag } from "components/elements/layout"

const FamiliesPage: FC = () => {
  return (
    <div style={{ margin: "0 auto" }}>
      <PageHeader backHref="/" backLabel="トップ" title="科一覧" />

      <div>
        {families.map((family) => {
          const count = plants.filter((p) => p.family_id === family.id).length
          return (
            <Link
              key={family.id}
              href={`/families/${family.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#2d2d2d",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "0.75rem",
                  borderLeft: "3px solid #5a9a5c",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#7cbe8c",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {family.name}
                  </div>
                  <div style={{ color: "#999", fontSize: "0.8rem" }}>
                    {family.description.slice(0, 40)}…
                  </div>
                </div>
                <Tag style={{ whiteSpace: "nowrap", marginLeft: "0.75rem" }}>
                  {count}種
                </Tag>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default FamiliesPage

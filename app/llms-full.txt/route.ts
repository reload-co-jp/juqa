import { llmsFullTxt } from "lib/seo"

export const dynamic = "force-static"

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  })
}

import { NextResponse, type NextRequest } from "next/server"
import { defaultLocale, isLocale } from "@/lib/i18n/config"

// Sends "/" and any path without a language prefix to "/en/...", "/fr/..." or "/ar/...".
// The language comes from the browser's Accept-Language header the first time,
// then from the cookie the language switcher sets.
function pickLocale(request: NextRequest) {
  const cookie = request.cookies.get("locale")?.value
  if (cookie && isLocale(cookie)) return cookie
  const header = request.headers.get("accept-language") ?? ""
  for (const part of header.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase()
    if (isLocale(code)) return code
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const first = pathname.split("/")[1]
  if (isLocale(first)) return NextResponse.next()

  const locale = pickLocale(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals, static files and the generated SEO files.
  matcher: ["/((?!_next|api|images|logos|resume|icon|apple-icon|favicon|robots.txt|sitemap.xml|opengraph-image|.*\\..*).*)"],
}

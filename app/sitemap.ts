import type { MetadataRoute } from "next"
import { locales, siteUrl } from "@/lib/i18n/config"
import { systems } from "@/lib/content/shared"

// One entry per page per language, each listing its translations for search engines.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...systems.map((s) => `/work/${s}`)]
  const now = new Date()
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      },
    })),
  )
}

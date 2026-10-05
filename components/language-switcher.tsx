"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { locales, type Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

const short: Record<Locale, string> = { en: "EN", fr: "FR", ar: "ع" }

// Three links to the same page in the other languages. Clicking one also stores
// a cookie so the middleware remembers the choice next time.
export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`
  const rest = pathname.replace(/^\/(en|fr|ar)(?=\/|$)/, "")

  return (
    <nav aria-label={label} className="inline-flex h-9 items-center rounded-lg border border-line p-0.5 font-mono text-xs">
      {locales.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? "page" : undefined}
          onClick={() => {
            document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`
          }}
          className={cn(
            "rounded-md px-2.5 py-1 transition-colors",
            l === current ? "bg-fg text-bg" : "text-muted hover:text-fg",
          )}
        >
          {short[l]}
        </Link>
      ))}
    </nav>
  )
}

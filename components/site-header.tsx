import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/content"
import { resumeHref } from "@/lib/content/shared"
import ThemeToggle from "./theme-toggle"
import LanguageSwitcher from "./language-switcher"

export default function SiteHeader({ locale, t }: { locale: Locale; t: Dictionary }) {
  const home = `/${locale}`
  const items = [
    [t.nav.work, `${home}#work`],
    [t.nav.journey, `${home}#journey`],
    [t.nav.about, `${home}#about`],
    [t.nav.contact, `${home}#contact`],
  ]
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href={home} className="font-display text-lg font-bold tracking-tight">
          Sarah Henia<span className="text-blue">.</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          {items.map(([label, href]) => (
            <Link key={href} href={href} className="transition-colors hover:text-fg">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={resumeHref(locale)} className="btn btn-primary hidden h-9 py-0 sm:inline-flex" target="_blank" rel="noopener">
            {t.nav.resume}
          </a>
          <LanguageSwitcher current={locale} label={t.a11y.language} />
          <ThemeToggle label={t.a11y.theme} />
        </div>
      </div>
    </header>
  )
}

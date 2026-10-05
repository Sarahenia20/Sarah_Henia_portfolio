import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/content"
import { links } from "@/lib/content/shared"

export default function SiteFooter({ t }: { locale: Locale; t: Dictionary }) {
  return (
    <footer className="border-t border-line/70">
      <div className="container flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {t.footer.rights}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={links.linkedin} className="hover:text-fg" target="_blank" rel="noopener">LinkedIn</a>
          <a href={links.github} className="hover:text-fg" target="_blank" rel="noopener">GitHub</a>
          <a href={`mailto:${links.email}`} className="hover:text-fg">{links.email}</a>
          <a href="https://github.com/Sarahenia20/Sarah_Henia_portfolio" className="hover:text-fg" target="_blank" rel="noopener">
            {t.footer.source}
          </a>
        </div>
        <p className="font-mono text-xs">{t.footer.built}</p>
      </div>
    </footer>
  )
}

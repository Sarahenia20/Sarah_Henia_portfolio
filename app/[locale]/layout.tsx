import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  Bricolage_Grotesque,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Arabic,
  IBM_Plex_Mono,
  Instrument_Serif,
} from "next/font/google"
import { ThemeProvider } from "next-themes"
import "../globals.css"
import { dirFor, isLocale, locales, siteUrl, type Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/content"
import { links } from "@/lib/content/shared"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

// Fonts are downloaded at build time and served from this domain, so no request goes to Google at runtime.
const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
})
const sans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
})
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {}
  const t = getDictionary(params.locale)
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}`]))
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s · Sarah Henia` },
    description: t.meta.description,
    alternates: { canonical: `${siteUrl}/${params.locale}`, languages: { ...languages, "x-default": `${siteUrl}/en` } },
    openGraph: {
      type: "website",
      siteName: "Sarah Henia",
      title: t.meta.title,
      description: t.meta.description,
      url: `${siteUrl}/${params.locale}`,
      locale: params.locale === "ar" ? "ar_TN" : params.locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  }
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const locale: Locale = params.locale
  const t = getDictionary(locale)

  // Schema.org "Person" record for search engines.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sarah Henia",
    jobTitle: t.hero.role,
    url: siteUrl,
    email: `mailto:${links.email}`,
    image: `${siteUrl}/images/sarah-henia.jpg`,
    sameAs: [links.linkedin, links.github],
    worksFor: { "@type": "Organization", name: "The SamurAI" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "ESPRIT" },
      { "@type": "CollegeOrUniversity", name: "ESSECT" },
    ],
    knowsLanguage: ["ar", "en", "fr"],
    address: { "@type": "PostalAddress", addressLocality: "Tunis", addressCountry: "TN" },
  }

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${arabic.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm"
          >
            {t.a11y.skip}
          </a>
          <SiteHeader locale={locale} t={t} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} t={t} />
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}

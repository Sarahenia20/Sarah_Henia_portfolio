import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { dirFor, isLocale, locales, siteUrl } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/content"
import { systemFacts, systems, type SystemSlug } from "@/lib/content/shared"
import ArchitectureFlow from "@/components/architecture-flow"
import { StackItem } from "@/components/stack-icon"

type Params = { locale: string; slug: string }

const glowBg = { blue: "bg-blue", violet: "bg-violet", pink: "bg-pink" } as const
const accentText = { blue: "text-blue", violet: "text-violet", pink: "text-pink" } as const

function isSlug(value: string): value is SystemSlug {
  return (systems as readonly string[]).includes(value)
}

export function generateStaticParams() {
  return locales.flatMap((locale) => systems.map((slug) => ({ locale, slug })))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isLocale(params.locale) || !isSlug(params.slug)) return {}
  const t = getDictionary(params.locale)
  const c = t.cases[params.slug]
  const path = `/work/${params.slug}`
  return {
    title: c.title,
    description: c.subtitle,
    alternates: {
      canonical: `${siteUrl}/${params.locale}${path}`,
      languages: Object.fromEntries([...locales.map((l) => [l, `${siteUrl}/${l}${path}`]), ["x-default", `${siteUrl}/en${path}`]]),
    },
    openGraph: { title: `${c.title} · Sarah Henia`, description: c.subtitle, url: `${siteUrl}/${params.locale}${path}`, type: "article" },
  }
}

export default function CaseStudyPage({ params }: { params: Params }) {
  if (!isLocale(params.locale) || !isSlug(params.slug)) notFound()
  const locale = params.locale
  const slug = params.slug
  const t = getDictionary(locale)
  const c = t.cases[slug]
  const L = t.caseLabels
  const facts = systemFacts[slug]
  const nextSlug = systems[(systems.indexOf(slug) + 1) % systems.length]
  const Back = locale === "ar" ? ArrowRight : ArrowLeft
  const Fwd = locale === "ar" ? ArrowLeft : ArrowRight

  return (
    <article className="container relative overflow-x-clip py-12 md:py-16">
      <Link href={`/${locale}#work`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
        <Back size={15} /> {L.back}
      </Link>

      {/* Title block */}
      <header className="relative mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <span className={`glow -top-24 -start-24 h-80 w-80 ${glowBg[facts.accent]}`} />
        <div>
          <div className="flex flex-wrap items-center gap-3">
            {facts.logo && (
              <Image src={facts.logo} alt={facts.org} width={96} height={28} className={facts.logo.endsWith(".svg") ? "logo-white h-6 w-auto" : "h-8 w-8 object-contain"} />
            )}
            <p className={`eyebrow ${accentText[facts.accent]}`}>{t.work.cards[slug].kicker}</p>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">{c.title}</h1>
          <p className="mt-5 max-w-[30ch] font-serif text-2xl italic leading-snug text-fg/90 md:text-[2rem]">{c.subtitle}</p>
        </div>
        <dl className="grid content-start gap-4 text-sm lg:pt-12">
          <Fact label={L.role} value={c.role} />
          <Fact label={L.period} value={c.period} />
        </dl>
      </header>

      <div className="rule my-14" />

      <section>
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{L.stack}</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {facts.stack.map((s) => <StackItem key={s} name={s} size={30} layout="row" />)}
        </ul>
      </section>

      <Section title={L.resume}>
        <ul className="glass grid gap-3 rounded-2xl p-6 md:p-8">
          {c.resume.map((line) => (
            <li key={line.slice(0, 40)} className="flex gap-3 text-[15px] leading-relaxed">
              <span className={`mt-[10px] h-1.5 w-1.5 flex-none rounded-full ${glowBg[facts.accent]}`} aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={L.problem}>
        <Prose paragraphs={c.problem} />
      </Section>

      <Section title={L.built}>
        <Prose paragraphs={c.built} />
      </Section>

      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{L.architecture}</h2>
        <div className="mt-6">
          <ArchitectureFlow steps={c.steps} hint={L.architectureHint} rtl={dirFor(locale) === "rtl"} />
        </div>
      </section>

      <Section title={L.decisions}>
        <dl className="grid gap-5 md:grid-cols-2 md:[&>*:last-child:nth-child(odd)]:col-span-2">
          {c.decisions.map(([head, body]) => (
            <div key={head} className="glass rounded-xl p-5">
              <dt className="font-semibold leading-snug">{head}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={L.governance}>
        <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">
          {c.governance.map(([head, body]) => (
            <div key={head} className="border-s-2 border-green/60 ps-4">
              <dt className="font-semibold">{head}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted">{body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={L.learned}>
        <ul className="grid max-w-[70ch] gap-5">
          {c.learned.map((item) => (
            <li key={item.slice(0, 30)} className="flex gap-4 text-base leading-relaxed md:text-lg">
              <span className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-violet" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <p className="mt-14 max-w-prose font-mono text-xs leading-relaxed text-muted">{L.confidential}</p>

      <div className="rule my-12" />

      <Link href={`/${locale}/work/${nextSlug}`} className="glass group flex items-center justify-between rounded-2xl p-6 transition-colors hover:border-fg/30 md:p-8">
        <div>
          <p className="eyebrow">{L.next}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">{t.cases[nextSlug].title}</p>
        </div>
        <Fwd className="text-blue transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </Link>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="grid max-w-[70ch] gap-4 text-base leading-relaxed text-fg/90 md:text-lg">
      {paragraphs.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-s border-line ps-4">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1.5 leading-relaxed">{value}</dd>
    </div>
  )
}

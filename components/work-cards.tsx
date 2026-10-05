import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/content"
import { systemFacts, systems } from "@/lib/content/shared"
import FlowStrip from "./flow-strip"
import SectionHeading from "./section-heading"

const accentText = { blue: "text-blue", violet: "text-violet", pink: "text-pink" } as const

export default function WorkCards({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="work" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeading eyebrow={t.work.eyebrow} heading={t.work.heading} intro={t.work.intro} />

      <ol className="mt-10 grid gap-5">
        {systems.map((slug, i) => {
          const card = t.work.cards[slug]
          const facts = systemFacts[slug]
          const status = t.work.status[t.cases[slug].status as keyof typeof t.work.status]
          return (
            <li key={slug}>
              <Link
                href={`/${locale}/work/${slug}`}
                className="group block rounded-2xl border border-line bg-card p-6 transition-colors hover:border-fg/30 md:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className={`font-mono text-sm ${accentText[facts.accent]}`}>0{i + 1}</span>
                      <p className="eyebrow">{card.kicker}</p>
                      <span className="chip ms-auto border-green/50 text-green">{status}</span>
                    </div>
                    <h3 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{card.title}</h3>
                    <p className="mt-2 max-w-prose text-lg text-fg/85">{card.tagline}</p>
                    <ul className="mt-5 grid gap-2 text-sm text-muted">
                      {card.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span className={`mt-[9px] h-1 w-1 flex-none rounded-full ${accentText[facts.accent]} bg-current`} aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between gap-6">
                    <FlowStrip steps={card.flow} gate={card.gate} />
                    <div>
                      <ul className="flex flex-wrap gap-1.5">
                        {facts.stack.map((s) => (
                          <li key={s} className="chip">{s}</li>
                        ))}
                      </ul>
                      <div className="mt-5 flex items-center justify-between">
                        {facts.logo && (
                          <Image
                            src={facts.logo}
                            alt={facts.org}
                            width={96}
                            height={28}
                            className={facts.logo.endsWith(".svg") ? "logo-white h-6 w-auto opacity-70" : "h-8 w-8 object-contain"}
                          />
                        )}
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue">
                          {t.work.read}
                          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/content"
import { systemFacts, systems } from "@/lib/content/shared"
import FlowStrip from "./flow-strip"
import SectionHeading from "./section-heading"
import { StackTile } from "./stack-icon"

const glowBg = { blue: "bg-blue", violet: "bg-violet", pink: "bg-pink" } as const
const accentText = { blue: "text-blue", violet: "text-violet", pink: "text-pink" } as const

export default function WorkCards({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section id="work" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeading eyebrow={t.work.eyebrow} heading={t.work.heading} intro={t.work.intro} />

      <ol className="mt-10 grid gap-6">
        {systems.map((slug) => {
          const card = t.work.cards[slug]
          const facts = systemFacts[slug]
          return (
            <li key={slug}>
              <Link
                href={`/${locale}/work/${slug}`}
                className="glass group block overflow-hidden rounded-2xl p-6 transition-colors hover:border-fg/25 md:p-8"
              >
                <span className={`glow -top-24 -start-24 h-72 w-72 ${glowBg[facts.accent]}`} />
                <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <Image
                        src={facts.logo}
                        alt={facts.org}
                        width={96}
                        height={28}
                        className={facts.logo.endsWith(".svg") ? "logo-white h-5 w-auto opacity-80" : "h-7 w-7 object-contain"}
                      />
                      <p className={`eyebrow ${accentText[facts.accent]}`}>{card.kicker}</p>
                    </div>
                    <h3 className="mt-5 text-3xl font-bold tracking-tight md:text-[2.6rem]">{card.title}</h3>
                    <p className="mt-2 max-w-prose text-lg text-fg/85">{card.tagline}</p>
                    <ul className="mt-5 grid gap-2 text-[15px] text-muted">
                      {card.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span className={`mt-[9px] h-1.5 w-1.5 flex-none rounded-full ${glowBg[facts.accent]}`} aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex min-w-0 flex-col justify-between gap-6 lg:pt-1">
                    <ul className="flex flex-wrap gap-2" aria-label={t.caseLabels.stack}>
                      {facts.stack.map((s) => (
                        <li key={s} title={s}>
                          <StackTile name={s} size={40} />
                        </li>
                      ))}
                    </ul>
                    <p className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accentText[facts.accent]}`}>
                      {t.work.read}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                    </p>
                  </div>
                </div>

                {/* The pipeline runs the full width of the card so it reads as one line. */}
                <div className="relative mt-7 border-t border-line/60 pt-6">
                  <FlowStrip steps={card.flow} gate={card.gate} accent={facts.accent} />
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

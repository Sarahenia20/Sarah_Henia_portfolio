import { BadgeCheck, Cpu, GraduationCap, Languages, MapPin, type LucideIcon } from "lucide-react"
import type { Dictionary } from "@/lib/content"
import SectionHeading from "./section-heading"

const icons: Record<string, LucideIcon> = {
  location: MapPin,
  languages: Languages,
  education: GraduationCap,
  certs: BadgeCheck,
  nvidia: Cpu,
}

export default function About({ t }: { t: Dictionary }) {
  const facts = Object.entries(t.about.facts) as [string, [string, string]][]
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-16 md:py-24">
      <div className="rule absolute inset-x-0 top-0" />
      <span className="glow -end-24 top-10 h-80 w-80 bg-pink" />
      <span className="glow -start-24 bottom-0 h-72 w-72 bg-blue" />
      <div className="container relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} />
          <div className="mt-6 grid max-w-prose gap-5 text-base leading-relaxed text-fg/90 md:text-lg">
            {t.about.paragraphs.map((p, i) => (
              <p key={p.slice(0, 24)} className={i === 0 ? "text-xl leading-snug md:text-2xl" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Fact cards: one glass tile per fact, with an icon. */}
        <ul className="grid content-start gap-3 lg:mt-14">
          {facts.map(([key, [label, value]]) => {
            const Icon = icons[key] ?? BadgeCheck
            // The NVIDIA value is a list joined with dots; show it as separate lines.
            const lines = key === "nvidia" ? value.split(" · ") : [value]
            return (
              <li key={key} className="glass flex gap-4 rounded-xl p-4 md:p-5">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-line bg-bg/60 text-blue">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow">{label}</p>
                  {lines.length === 1 ? (
                    <p className="mt-1 text-sm leading-relaxed">{value}</p>
                  ) : (
                    <ul className="mt-1.5 grid gap-1 text-sm leading-relaxed">
                      {lines.map((l) => (
                        <li key={l} className="flex gap-2">
                          <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-green" aria-hidden />
                          {l}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

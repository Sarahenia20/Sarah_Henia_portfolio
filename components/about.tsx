import type { Dictionary } from "@/lib/content"
import SectionHeading from "./section-heading"

export default function About({ t }: { t: Dictionary }) {
  const facts = Object.values(t.about.facts)
  return (
    <section id="about" className="relative scroll-mt-20 overflow-hidden py-16 md:py-24">
      <div className="rule absolute inset-x-0 top-0" />
      <span className="glow -end-24 top-10 h-80 w-80 bg-pink" />
      <div className="container grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} />
          <div className="mt-6 grid max-w-prose gap-4 text-base leading-relaxed text-fg/90 md:text-lg">
            {t.about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
        <dl className="glass grid content-start gap-5 rounded-2xl p-6 lg:mt-14">
          {facts.map(([label, value]) => (
            <div key={label} className="border-s-2 border-blue/50 ps-4">
              <dt className="eyebrow">{label}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

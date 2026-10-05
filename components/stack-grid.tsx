import type { Dictionary } from "@/lib/content"
import { stackGroups } from "@/lib/content/shared"
import SectionHeading from "./section-heading"
import { StackItem } from "./stack-icon"

// The stack wall from the GitHub profile: one row per group, logo tiles with names.
export default function StackGrid({ t }: { t: Dictionary }) {
  const groups = Object.keys(stackGroups) as (keyof typeof stackGroups)[]
  return (
    <section id="stack" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeading eyebrow={t.stack.eyebrow} heading={t.stack.heading} intro={t.stack.intro} />
      <div className="glass relative mt-10 overflow-hidden rounded-2xl p-6 md:p-8">
        <span className="glow -start-20 -top-20 h-72 w-72 bg-blue" />
        <span className="glow -bottom-24 -end-16 h-72 w-72 bg-pink" />
        <div className="relative grid gap-7">
          {groups.map((g) => (
            <div key={g} className="grid gap-3 sm:grid-cols-[88px_1fr] sm:items-start">
              <p className="eyebrow pt-4">{t.stack.groups[g]}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-4">
                {stackGroups[g].map((name) => (
                  <StackItem key={name} name={name} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

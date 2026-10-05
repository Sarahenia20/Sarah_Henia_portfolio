"use client"

import { useState } from "react"
import Image from "next/image"
import { Award, GraduationCap } from "lucide-react"
import type { Dictionary } from "@/lib/content"
import { journeyMarks, type JourneyKey } from "@/lib/content/shared"
import { cn } from "@/lib/utils"
import SectionHeading from "./section-heading"

// Horizontal timeline on wide screens (click a point, read it below), a plain
// vertical list on phones. Same data, two layouts.
export default function Journey({ t }: { t: Dictionary }) {
  const [active, setActive] = useState<JourneyKey>("architect")
  const activeIndex = journeyMarks.findIndex((m) => m.key === active)
  const step = t.journey.steps[active]

  return (
    <section id="journey" className="scroll-mt-20 border-y border-line/70 bg-card/40 py-16 md:py-24">
      <div className="container">
        <SectionHeading eyebrow={t.journey.eyebrow} heading={t.journey.heading} intro={t.journey.intro} introClassName="hidden md:block" />

        {/* Wide: track */}
        <div className="mt-12 hidden md:block">
          <div className="relative">
            <div className="absolute inset-x-[7%] top-7 h-px bg-line" aria-hidden />
            <div
              className="absolute start-[7%] top-7 h-px bg-blue transition-[width] duration-500 ease-out"
              style={{ width: `${(activeIndex / (journeyMarks.length - 1)) * 86}%` }}
              aria-hidden
            />
            <ol className="relative grid grid-cols-7" role="tablist" aria-label={t.journey.eyebrow}>
              {journeyMarks.map((m, i) => {
                const selected = m.key === active
                const passed = i <= activeIndex
                return (
                  <li key={m.key} className="flex flex-col items-center">
                    <button
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActive(m.key)}
                      className={cn(
                        "flex h-14 w-14 items-center justify-center rounded-full border bg-bg transition-all",
                        selected ? "scale-110 border-blue shadow-[0_0_0_4px_var(--tint)]" : passed ? "border-blue/50" : "border-line",
                        "hover:border-blue",
                      )}
                      aria-label={t.journey.steps[m.key].title}
                    >
                      <Mark logo={m.logo} kind={m.kind} />
                    </button>
                    <span className={cn("mt-3 font-mono text-xs", selected ? "text-fg" : "text-muted")}>{m.year}</span>
                    <span className="mt-1 max-w-[12ch] text-center text-xs leading-tight text-muted">{shortTitle(t, m.key)}</span>
                  </li>
                )
              })}
            </ol>
          </div>

          <div key={active} className="mx-auto mt-10 max-w-[720px] rounded-2xl border border-line bg-bg p-6 motion-safe:animate-[fade_.3s_ease-out] md:p-8">
            <p className="eyebrow">{step.org}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
          </div>
        </div>

        {/* Narrow: list */}
        <ol className="mt-10 border-s border-line md:hidden">
          {journeyMarks.map((m) => {
            const s = t.journey.steps[m.key]
            return (
              <li key={m.key} className="relative ps-8 pb-8 last:pb-0">
                <span className="absolute -start-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-blue bg-bg" aria-hidden />
                <p className="font-mono text-xs text-muted">{s.org}</p>
                <h3 className="mt-1 text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

function Mark({ logo, kind }: { logo: string | null; kind: "study" | "cert" | "work" }) {
  if (logo) return <Image src={logo} alt="" width={40} height={14} className="logo-white h-3.5 w-auto" />
  if (kind === "cert") return <Award size={20} className="text-violet" />
  return <GraduationCap size={20} className="text-blue" />
}

// Two or three words under each point so the track reads without clicking.
function shortTitle(t: Dictionary, key: JourneyKey) {
  const map: Record<JourneyKey, string> = {
    essect: "ESSECT",
    esprit: "ESPRIT",
    certs: "CCNA · AWS · NVIDIA",
    pm: t.journey.steps.pm.title.split(",")[0],
    ced: "CED · Collaboris",
    dawn: "Dawn",
    architect: t.journey.steps.architect.title.split(" & ")[0],
  }
  return map[key]
}

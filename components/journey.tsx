"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Award, GraduationCap } from "lucide-react"
import type { Dictionary } from "@/lib/content"
import { journeyMarks, type JourneyKey } from "@/lib/content/shared"
import { cn } from "@/lib/utils"
import SectionHeading from "./section-heading"

const AUTO_MS = 3400
const PAUSE_AFTER_CLICK_MS = 12000

// Horizontal timeline on wide screens: it walks itself from 2020 to today, and
// stops for a while when you click a point. A plain vertical list on phones.
export default function Journey({ t }: { t: Dictionary }) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>()

  // Only animate while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!playing || !inView) return
    const id = setInterval(() => setIndex((i) => (i + 1) % journeyMarks.length), AUTO_MS)
    return () => clearInterval(id)
  }, [playing, inView])

  function pick(i: number) {
    setIndex(i)
    setPlaying(false)
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPlaying(true), PAUSE_AFTER_CLICK_MS)
  }
  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  const active: JourneyKey = journeyMarks[index].key
  const step = t.journey.steps[active]

  return (
    <section id="journey" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden py-16 md:py-24">
      <div className="rule absolute inset-x-0 top-0" />
      <span className="glow -start-20 top-1/3 h-80 w-80 bg-blue" />
      <span className="glow -end-20 bottom-0 h-80 w-80 bg-violet" />
      <div className="container relative">
        <SectionHeading eyebrow={t.journey.eyebrow} heading={t.journey.heading} intro={t.journey.intro} introClassName="hidden md:block" />

        {/* Wide: track */}
        <div className="mt-12 hidden md:block">
          <div className="relative">
            <div className="absolute inset-x-[7%] top-[42px] h-px bg-line" aria-hidden />
            <div
              className="absolute start-[7%] top-[42px] h-px bg-gradient-to-r from-blue via-violet to-pink transition-[width] duration-700 ease-out"
              style={{ width: `${(index / (journeyMarks.length - 1)) * 86}%` }}
              aria-hidden
            />
            <ol className="relative grid grid-cols-7" role="tablist" aria-label={t.journey.eyebrow}>
              {journeyMarks.map((m, i) => {
                const selected = i === index
                const passed = i <= index
                return (
                  <li key={m.key} className="flex flex-col items-center">
                    <button
                      role="tab"
                      aria-selected={selected}
                      onClick={() => pick(i)}
                      className={cn(
                        "flex h-[84px] w-[84px] items-center justify-center rounded-full border bg-bg transition-all duration-300",
                        selected ? "scale-110 border-blue shadow-[0_0_0_6px_var(--tint),0_0_30px_-4px_var(--blue)]" : passed ? "border-blue/50" : "border-line",
                        "hover:border-blue",
                      )}
                      aria-label={t.journey.steps[m.key].title}
                    >
                      <Mark logo={m.logo} kind={m.kind} />
                    </button>
                    <span className={cn("mt-3 text-sm font-semibold", selected ? "text-fg" : "text-muted")}>{m.year}</span>
                    <span className="mt-1 max-w-[13ch] text-center text-[13px] leading-tight text-muted">{shortTitle(t, m.key)}</span>
                  </li>
                )
              })}
            </ol>
          </div>

          <div key={active} className="glass mx-auto mt-10 max-w-[720px] rounded-2xl p-6 motion-safe:animate-[fade_.3s_ease-out] md:p-8">
            <p className="eyebrow">{step.org}</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
            <div className="mt-5 h-0.5 overflow-hidden rounded bg-line" aria-hidden>
              {playing && inView && <div key={index} className="h-full bg-blue" style={{ animation: `grow ${AUTO_MS}ms linear forwards` }} />}
            </div>
          </div>
        </div>

        {/* Narrow: list */}
        <ol className="mt-10 border-s border-line md:hidden">
          {journeyMarks.map((m) => {
            const s = t.journey.steps[m.key]
            return (
              <li key={m.key} className="relative ps-8 pb-8 last:pb-0">
                <span className="absolute -start-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-blue bg-bg" aria-hidden />
                <p className="text-xs font-semibold text-blue">{s.org}</p>
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
  if (logo) return <Image src={logo} alt="" width={60} height={21} className="logo-white h-[21px] w-auto" />
  if (kind === "cert") return <Award size={30} className="text-violet" />
  return <GraduationCap size={30} className="text-blue" />
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

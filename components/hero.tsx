"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { FileDown, Github, Linkedin, Mail } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/content"
import { focuses, links, resumeHref, type Focus } from "@/lib/content/shared"
import { cn } from "@/lib/utils"
import Constellation from "./constellation"

const STORAGE_KEY = "lens"

// The hero and the "lens" switcher share one piece of state: which angle the
// visitor is reading from. It changes the summary and the skills shown.
export default function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const [focus, setFocus] = useState<Focus>("sol")

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === "sol" || saved === "ai" || saved === "swe") setFocus(saved)
    } catch {}
  }, [])

  function choose(next: Focus) {
    setFocus(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }

  const lens = t.lens.options[focus]
  const resume = resumeHref(locale)

  return (
    <section className="relative overflow-hidden">
      {/* Page glow behind the hero, same hue placement as the GitHub banner. */}
      <span className="glow -top-32 end-[10%] h-[420px] w-[420px] bg-violet" />
      <span className="glow top-40 -start-32 h-[360px] w-[360px] bg-blue" />

      <div className="container relative pb-16 pt-14 md:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-[640px]">
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green" aria-hidden />
              {t.hero.status}
            </p>
            <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl">
              {t.hero.name}
            </h1>
            <p className="text-gradient mt-4 inline-block text-lg font-semibold md:text-xl">{t.hero.role}</p>
            <p className="mt-6 max-w-[36ch] text-xl leading-snug text-fg/90 md:text-2xl">
              {t.hero.pitch.before}
              <em className="accent-word text-blue">{t.hero.pitch.accent}</em>
              {t.hero.pitch.after}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={resume} target="_blank" rel="noopener" className="btn btn-primary">
                <FileDown size={16} /> {t.hero.resume}
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener" className="btn glass">
                <Linkedin size={16} /> {t.hero.linkedin}
              </a>
              <a href={links.github} target="_blank" rel="noopener" className="btn glass">
                <Github size={16} /> {t.hero.github}
              </a>
              <a href={`mailto:${links.email}`} className="btn glass">
                <Mail size={16} /> {t.hero.email}
              </a>
            </div>
          </div>

          {/* Portrait over the constellation from the GitHub banner. */}
          <div className="relative mx-auto w-[240px] sm:w-[280px] lg:w-[340px]">
            <Constellation className="drift absolute -inset-x-16 -top-16 h-auto w-[calc(100%+8rem)] max-w-none opacity-90" />
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-blue/60 rtl:-translate-x-3" aria-hidden />
            <Image
              src="/images/sarah-henia.jpg"
              alt={t.hero.photoAlt}
              width={597}
              height={597}
              priority
              sizes="(min-width:1024px) 340px, (min-width:640px) 280px, 240px"
              className="relative aspect-square w-full rounded-2xl border border-line object-cover"
            />
          </div>
        </div>

        {/* Lens switcher */}
        <div className="glass relative mt-16 overflow-hidden rounded-2xl p-5 md:p-7">
          <span className="glow -bottom-32 -end-20 h-72 w-72 bg-pink" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow">{t.lens.label}</p>
              <p className="mt-1 text-sm text-muted">{t.lens.hint}</p>
            </div>
            <div role="tablist" aria-label={t.lens.label} className="inline-flex flex-wrap gap-1 rounded-lg border border-line bg-bg/40 p-1">
              {focuses.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={focus === f}
                  onClick={() => choose(f)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    focus === f ? "bg-fg text-bg" : "text-muted hover:text-fg",
                  )}
                >
                  {t.lens.options[f].label}
                </button>
              ))}
            </div>
          </div>

          <div key={focus} className="relative mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] motion-safe:animate-[fade_.35s_ease-out]">
            <p className="max-w-prose text-base leading-relaxed text-fg/90 md:text-lg">{lens.summary}</p>
            <dl className="grid gap-4 sm:grid-cols-2">
              {lens.skills.map(([group, items]) => (
                <div key={group} className="border-s-2 border-blue/50 ps-4">
                  <dt className="eyebrow">{group}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{items}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState, type ComponentType } from "react"
import {
  Activity, Bell, Bot, BookOpen, Building2, CheckCircle2, ChevronLeft, ChevronRight, Database, Download, FileText,
  Gauge, LayoutGrid, Languages, ListChecks, Network, Pause, Play, Radio, Repeat, Rss, Save, Send, Share2, Shield,
  Sparkles, UserCheck, type LucideProps,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type FlowStep = { id: string; label: string; detail: string; gate?: boolean }

// One icon per step id. Unknown ids fall back to a plain dot.
const icons: Record<string, ComponentType<LucideProps>> = {
  transcript: FileText, guard: Shield, context: Database, memory: Network, extract: Sparkles, gate: Gauge,
  human: UserCheck, planner: ListChecks, writeback: Save, nudge: Bell,
  sources: Rss, ingest: Download, normalize: Languages, verify: CheckCircle2, graph: Network, resolve: Building2,
  review: UserCheck, crm: Send,
  tabs: LayoutGrid, worker: Share2, hub: Radio, redis: Database, activity: Activity, cdc: Repeat, journal: BookOpen, ai: Bot,
}

const W = 1000
const NODE = 30 // circle radius
const ROW_H = 160
const AUTO_MS = 3200 // time on each step while playing
const PAUSE_AFTER_CLICK_MS = 12000

// Positions the steps on one row, or two rows joined like a snake when there are many.
function layout(n: number, rtl: boolean) {
  const cols = n > 6 ? Math.ceil(n / 2) : n
  const rows = Math.ceil(n / cols)
  const colW = W / cols
  return {
    rows,
    height: rows * ROW_H,
    points: Array.from({ length: n }, (_, i) => {
      const row = Math.floor(i / cols)
      let col = i % cols
      if (row % 2 === 1) col = cols - 1 - col // second row runs backwards
      if (rtl) col = cols - 1 - col
      return { x: colW * col + colW / 2, y: ROW_H * row + 46, row }
    }),
  }
}

type P = { x: number; y: number; row: number }

function connector(a: P, b: P) {
  if (a.row === b.row) {
    const dir = Math.sign(b.x - a.x)
    return `M ${a.x + dir * (NODE + 6)} ${a.y} L ${b.x - dir * (NODE + 6)} ${b.y}`
  }
  // Row change: drop down and come back on the other side with a soft curve.
  const midY = (a.y + b.y) / 2
  return `M ${a.x} ${a.y + NODE + 6} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y - NODE - 6}`
}

export default function ArchitectureFlow({ steps, hint, rtl = false }: { steps: FlowStep[]; hint: string; rtl?: boolean }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const resumeTimer = useRef<ReturnType<typeof setTimeout>>()
  const { points, height } = layout(steps.length, rtl)
  const step = steps[active]
  const Prev = rtl ? ChevronRight : ChevronLeft
  const Next = rtl ? ChevronLeft : ChevronRight

  // Autoplay: advance one step at a time, looping. Stops while the tab is hidden.
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      if (document.visibilityState === "visible") setActive((a) => (a + 1) % steps.length)
    }, AUTO_MS)
    return () => clearInterval(id)
  }, [playing, steps.length])

  // Reading a step by hand pauses the autoplay for a while, then it picks up again.
  function pick(i: number) {
    setActive(i)
    setPlaying(false)
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPlaying(true), PAUSE_AFTER_CLICK_MS)
  }
  useEffect(() => () => clearTimeout(resumeTimer.current), [])

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="glass relative overflow-hidden rounded-2xl p-4 md:p-6">
        <span className="glow -top-24 start-1/3 h-64 w-64 bg-violet" />
        <div className="relative mb-2 flex items-center justify-between">
          <p className="eyebrow">{hint}</p>
          <button
            type="button"
            onClick={() => {
              clearTimeout(resumeTimer.current)
              setPlaying((p) => !p)
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted hover:text-fg"
            aria-label={playing ? "Pause" : "Play"}
            aria-pressed={playing}
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        <svg viewBox={`0 0 ${W} ${height}`} className="relative hidden w-full md:block" role="list" aria-label={hint}>
          <defs>
            <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          {points.map((p, i) => {
            if (i >= points.length - 1) return null
            const d = connector(p, points[i + 1])
            const done = i < active
            const current = i === active - 1
            return (
              <g key={`c${i}`} aria-hidden>
                <path
                  d={d}
                  fill="none"
                  stroke={done ? "var(--blue)" : "var(--line)"}
                  strokeWidth="1.5"
                  strokeDasharray={steps[i + 1].gate ? "4 5" : undefined}
                  className="transition-colors duration-500"
                />
                {/* The pulse rides the connector that was just crossed. */}
                {current && (
                  <circle r="4" fill={steps[i + 1].gate ? "var(--green)" : "var(--blue)"}>
                    <animateMotion dur="0.9s" fill="freeze" path={d} />
                  </circle>
                )}
              </g>
            )
          })}
          {points.map((p, i) => {
            const s = steps[i]
            const Icon = icons[s.id]
            const selected = i === active
            const color = s.gate ? "var(--green)" : "var(--blue)"
            return (
              <g
                key={s.id}
                role="listitem"
                tabIndex={0}
                aria-label={s.label}
                aria-current={selected ? "step" : undefined}
                onClick={() => pick(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pick(i)}
                className="cursor-pointer outline-none"
              >
                {selected && <circle cx={p.x} cy={p.y} r={NODE + 14} fill={color} opacity="0.35" filter="url(#soft)" />}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={NODE}
                  fill="var(--bg)"
                  stroke={selected ? color : s.gate ? "var(--green)" : "var(--line)"}
                  strokeWidth={selected ? 2 : 1.5}
                  className="transition-all duration-300"
                />
                {Icon ? (
                  <Icon x={p.x - 11} y={p.y - 11} width={22} height={22} strokeWidth={1.75} color={s.gate ? "var(--green)" : selected ? "var(--blue)" : "var(--fg)"} />
                ) : (
                  <circle cx={p.x} cy={p.y} r="4" fill={color} />
                )}
                <text
                  x={p.x}
                  y={p.y + NODE + 22}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight={selected ? 600 : 500}
                  fill={selected ? "var(--fg)" : "var(--muted)"}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {s.label}
                </text>
                {s.gate && (
                  <text x={p.x} y={p.y + NODE + 38} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--green)" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.1em" }}>
                    HUMAN
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Phones: a vertical chain of buttons. */}
        <ol className="relative grid gap-1 md:hidden">
          {steps.map((s, i) => {
            const Icon = icons[s.id]
            return (
              <li key={s.id}>
                <button
                  onClick={() => pick(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-start text-sm transition-colors",
                    i === active ? "border-blue bg-tint" : "border-transparent",
                    s.gate && "text-green",
                  )}
                >
                  <span className={cn("flex h-7 w-7 flex-none items-center justify-center rounded-full border", s.gate ? "border-green" : "border-line")}>
                    {Icon ? <Icon size={14} /> : <span className="h-1.5 w-1.5 rounded-full bg-blue" />}
                  </span>
                  {s.label}
                </button>
              </li>
            )
          })}
        </ol>
      </div>

      <aside key={step.id} className="glass glass-strong flex flex-col rounded-2xl p-5 motion-safe:animate-[fade_.3s_ease-out] md:p-6" aria-live="polite">
        <p className={cn("eyebrow", step.gate && "text-green")}>
          {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          {step.gate ? " · human gate" : ""}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight">{step.label}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-[15px]">{step.detail}</p>
        {/* Progress bar for the autoplay, restarts on every step. */}
        <div className="mt-4 h-0.5 overflow-hidden rounded bg-line" aria-hidden>
          {playing && <div key={active} className="h-full bg-blue" style={{ animation: `grow ${AUTO_MS}ms linear forwards` }} />}
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => pick((active - 1 + steps.length) % steps.length)} className="btn h-9 py-0" aria-label="Previous step">
            <Prev size={16} />
          </button>
          <button onClick={() => pick((active + 1) % steps.length)} className="btn h-9 py-0" aria-label="Next step">
            <Next size={16} />
          </button>
        </div>
      </aside>
    </div>
  )
}

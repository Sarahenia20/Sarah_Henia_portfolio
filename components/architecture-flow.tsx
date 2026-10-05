"use client"

import { useState, type ComponentType } from "react"
import {
  Activity, Bell, Bot, BookOpen, Building2, CheckCircle2, ChevronLeft, ChevronRight, Database, Download, FileText,
  Gauge, LayoutGrid, Languages, ListChecks, Network, Radio, Repeat, Rss, Save, Send, Share2, Shield, Sparkles,
  UserCheck, type LucideProps,
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

function connector(a: { x: number; y: number; row: number }, b: { x: number; y: number; row: number }) {
  if (a.row === b.row) {
    const dir = Math.sign(b.x - a.x)
    const x1 = a.x + dir * (NODE + 6)
    const x2 = b.x - dir * (NODE + 6)
    return `M ${x1} ${a.y} L ${x2} ${b.y}`
  }
  // Row change: drop down and come back on the other side with a soft curve.
  const y1 = a.y + NODE + 6
  const y2 = b.y - NODE - 6
  const midY = (a.y + b.y) / 2
  return `M ${a.x} ${y1} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${y2}`
}

export default function ArchitectureFlow({ steps, hint, rtl = false }: { steps: FlowStep[]; hint: string; rtl?: boolean }) {
  const [active, setActive] = useState(0)
  const { points, height } = layout(steps.length, rtl)
  const step = steps[active]
  const Prev = rtl ? ChevronRight : ChevronLeft
  const Next = rtl ? ChevronLeft : ChevronRight

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="rounded-2xl border border-line bg-card p-4 md:p-6">
        <p className="eyebrow mb-2">{hint}</p>
        <svg viewBox={`0 0 ${W} ${height}`} className="hidden w-full md:block" role="list" aria-label={hint}>
          {points.map((p, i) =>
            i < points.length - 1 ? (
              <g key={`c${i}`} aria-hidden>
                <path
                  d={connector(p, points[i + 1])}
                  fill="none"
                  stroke={i < active ? "var(--blue)" : "var(--line)"}
                  strokeWidth="1.5"
                  strokeDasharray={steps[i + 1].gate ? "4 5" : undefined}
                  className="transition-colors duration-300"
                />
                <circle
                  cx={points[i + 1].row === p.row ? points[i + 1].x - Math.sign(points[i + 1].x - p.x) * (NODE + 6) : points[i + 1].x}
                  cy={points[i + 1].row === p.row ? p.y : points[i + 1].y - NODE - 6}
                  r="3"
                  fill={i < active ? "var(--blue)" : "var(--line)"}
                />
              </g>
            ) : null,
          )}
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
                onClick={() => setActive(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
                className="cursor-pointer outline-none"
              >
                {selected && <circle cx={p.x} cy={p.y} r={NODE + 8} fill={color} opacity="0.14" />}
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
                  <Icon x={p.x - 10} y={p.y - 10} width={20} height={20} strokeWidth={1.75} color={s.gate ? "var(--green)" : selected ? "var(--blue)" : "var(--fg)"} />
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
                  <text x={p.x} y={p.y + NODE + 38} textAnchor="middle" fontSize="10" fill="var(--green)" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>
                    HUMAN
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Phones: a vertical chain of buttons. */}
        <ol className="grid gap-1 md:hidden">
          {steps.map((s, i) => {
            const Icon = icons[s.id]
            return (
              <li key={s.id}>
                <button
                  onClick={() => setActive(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-start text-sm",
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

      <aside key={step.id} className="flex flex-col rounded-2xl border border-line bg-card p-5 motion-safe:animate-[fade_.3s_ease-out] md:p-6" aria-live="polite">
        <p className={cn("eyebrow", step.gate && "text-green")}>
          {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          {step.gate ? " · human gate" : ""}
        </p>
        <h3 className="mt-2 text-xl font-bold tracking-tight">{step.label}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-[15px]">{step.detail}</p>
        <div className="mt-5 flex gap-2">
          <button
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="btn h-9 py-0 disabled:opacity-40"
            aria-label="Previous step"
          >
            <Prev size={16} />
          </button>
          <button
            onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
            disabled={active === steps.length - 1}
            className="btn h-9 py-0 disabled:opacity-40"
            aria-label="Next step"
          >
            <Next size={16} />
          </button>
        </div>
      </aside>
    </div>
  )
}

import { cn } from "@/lib/utils"

// Each step is [title, subtitle].
type Step = readonly string[]

// A pipeline in the GitHub-card style: pills with a title and a one-line subtitle,
// joined by short connectors. A small dot travels along the chain on its own.
// The step at `gate` is the human and is the only green element.
export default function FlowStrip({
  steps,
  gate,
  accent = "blue",
  className,
}: {
  steps: readonly Step[]
  gate: number
  accent?: "blue" | "violet" | "pink"
  className?: string
}) {
  const accentText = { blue: "text-blue", violet: "text-violet", pink: "text-pink" }[accent]
  const accentBg = { blue: "bg-blue", violet: "bg-violet", pink: "bg-pink" }[accent]
  const stepDuration = 1.1 // seconds the dot spends on one connector
  return (
    <ol className={cn("flex flex-wrap items-center gap-y-3", className)} aria-label="Pipeline">
      {steps.map(([title, sub = ""], i) => {
        const isGate = i === gate
        const last = i === steps.length - 1
        return (
          <li key={title} className="flex items-center">
            <span
              className={cn(
                "flex flex-col rounded-xl border px-3 py-1.5 leading-tight",
                isGate ? "gate-pulse border-green/70 bg-green/10" : "border-line bg-bg/60",
              )}
            >
              <span className={cn("text-[13px] font-semibold", isGate && "text-green")}>{title}</span>
              <span className={cn("text-[11px]", isGate ? "text-green/80" : accentText)}>{sub}</span>
            </span>
            {!last && (
              <span className="relative mx-1 h-px w-5 bg-line sm:w-7" aria-hidden>
                <span className="absolute -top-[2px] end-0 h-[5px] w-[5px] rounded-full bg-line" />
                <span
                  className={cn("travel absolute -top-[2.5px] h-[6px] w-[6px] rounded-full", isGate || i + 1 === gate ? "bg-green" : accentBg)}
                  style={{
                    // The keyframes move the dot during the first 20% of the cycle,
                    // so a cycle of five step-durations gives each connector its turn.
                    animationDuration: `${stepDuration * 5}s`,
                    animationDelay: `${i * stepDuration}s`,
                  }}
                />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

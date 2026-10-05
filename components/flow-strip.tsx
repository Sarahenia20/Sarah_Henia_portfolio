import { cn } from "@/lib/utils"

// A one-line pipeline: pills joined by short lines. The step at `gate` is the
// human approval and is the only green thing on the page.
export default function FlowStrip({ steps, gate, className }: { steps: readonly string[]; gate: number; className?: string }) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-y-3", className)} aria-label="Pipeline">
      {steps.map((step, i) => {
        const isGate = i === gate
        const last = i === steps.length - 1
        return (
          <li key={step} className="flex items-center">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide",
                isGate ? "gate-pulse border-green/70 bg-green/10 text-green" : "border-line bg-bg text-fg/85",
              )}
            >
              {isGate && <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden />}
              {step}
            </span>
            {!last && (
              <span className="relative mx-1 h-px w-5 bg-line sm:w-7" aria-hidden>
                <span className="absolute -top-[2px] end-0 h-[5px] w-[5px] rounded-full bg-line" />
              </span>
            )}
          </li>
        )
      })}
    </ol>
  )
}

import { stackIcons } from "@/lib/content/stack-icons"
import { cn } from "@/lib/utils"

// Short monograms for tools that have no brand mark in the GitHub stack wall.
const monograms: Record<string, string> = {
  SignalR: "SR",
  "Cosmos DB": "CDB",
  "Azure OpenAI": "AOAI",
  "LLM gateway": "GW",
  OpenRouter: "OR",
  Llama: "LLM",
  "Microsoft Graph": "MSG",
  Logfire: "LF",
  Langfuse: "LFS",
  Evals: "EVAL",
  "NIST AI RMF": "NIST",
  "ISO 42001": "ISO",
  npm: "npm",
  NuGet: "NuGet",
  Express: "EX",
  Go: "Go",
  Grafana: "GF",
  "Socket.io": "IO",
  Django: "DJ",
  Celery: "CEL",
  "Three.js": "3JS",
  Laravel: "LV",
  PHP: "PHP",
  MySQL: "SQL",
}

// One logo tile: the brand mark on a dark rounded square, exactly like the GitHub stack wall.
export function StackTile({ name, size = 56, className }: { name: string; size?: number; className?: string }) {
  const spec = stackIcons[name]
  const glyph = size * 0.5
  return (
    <span
      className={cn("inline-flex flex-none items-center justify-center rounded-[34%] border border-line bg-card", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {spec && "inner" in spec ? (
        <svg viewBox={spec.viewBox} width={glyph} height={glyph} dangerouslySetInnerHTML={{ __html: spec.inner }} />
      ) : (
        <span
          className="font-display font-extrabold tracking-tight text-fg"
          style={{ fontSize: Math.max(10, size * ((spec && "text" in spec ? spec.text : monograms[name] ?? name).length > 3 ? 0.2 : 0.26)) }}
        >
          {spec && "text" in spec ? spec.text : monograms[name] ?? name.slice(0, 3)}
        </span>
      )}
    </span>
  )
}

// A tile with its name under it (stack wall) or beside it (compact lists).
export function StackItem({ name, size = 56, layout = "column" }: { name: string; size?: number; layout?: "column" | "row" }) {
  if (layout === "row") {
    return (
      <li className="flex items-center gap-2 rounded-lg border border-line/70 bg-bg/40 py-1 pe-3 ps-1 text-sm">
        <StackTile name={name} size={size} />
        <span>{name}</span>
      </li>
    )
  }
  return (
    <li className="flex w-[72px] flex-col items-center gap-2 text-center">
      <StackTile name={name} size={size} />
      <span className="text-[12px] leading-tight text-muted">{name}</span>
    </li>
  )
}

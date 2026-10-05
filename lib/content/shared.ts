// Facts that do not change with the language: links, dates, file names, stacks.
import type { Locale } from "@/lib/i18n/config"

export const links = {
  email: "sarah.hania15@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarah-henia20/",
  github: "https://github.com/Sarahenia20",
}

// The three angles of the resume. The lens switcher on the home page uses the same keys.
export const focuses = ["sol", "ai", "swe"] as const
export type Focus = (typeof focuses)[number]

const resumeFile: Record<Focus, string> = {
  sol: "AI_Solutions_Governance",
  ai: "AI_Engineer",
  swe: "Software_Engineer",
}

// Which PDF to hand out: no photo for English-speaking markets, photo for France and the Middle East.
export function resumeHref(focus: Focus, locale: Locale) {
  const variant = locale === "fr" ? "FR_Photo" : locale === "ar" ? "EN_Photo" : "EN_NoPhoto"
  return `/resume/Sarah_Henia_${resumeFile[focus]}_${variant}.pdf`
}

export const systems = ["dawn", "market-intelligence", "collaboris"] as const
export type SystemSlug = (typeof systems)[number]

export const systemFacts: Record<
  SystemSlug,
  { org: string; period: string; stack: string[]; logo?: string; accent: "blue" | "violet" | "pink" }
> = {
  dawn: {
    org: "The SamurAI",
    period: "2026",
    stack: ["Python", "SurrealDB", "Redis", "OpenRouter", "Microsoft Graph", "AWS EC2", "GitHub Actions", "Logfire", "Langfuse"],
    logo: "/logos/samurai-white.svg",
    accent: "blue",
  },
  "market-intelligence": {
    org: "The SamurAI",
    period: "2026",
    stack: ["Python", "SurrealDB", "LLM gateway", "Pydantic", "Docker", "Evals", "NIST AI RMF", "ISO/IEC 42001"],
    logo: "/logos/samurai-white.svg",
    accent: "violet",
  },
  collaboris: {
    org: "CED Tunisia",
    period: "Feb - Aug 2026",
    stack: ["Angular 19", "ASP.NET Core 8", "SignalR", "Redis", "Cosmos DB", "SQL Server", "FastAPI", "Azure OpenAI", "MCP", "Azure DevOps"],
    logo: "/logos/collaboris.png",
    accent: "pink",
  },
}

export const earlierProjects = [
  {
    key: "sentinelhub",
    title: "SentinelHub",
    stack: ["Next.js", "Express", "Go", "Docker", "Grafana"],
    image: "/images/projects/sentinelhub-dashboard.png",
    github: "https://github.com/Sarahenia20/SentinelHub",
  },
  {
    key: "taskify",
    title: "Taskify",
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
    image: "/images/projects/taskify-dashboard.png",
    github: "https://github.com/Sarahenia20/Apollo_FS_Taskify",
    demo: "https://taskify-phi-mauve.vercel.app/auth/SignIn",
  },
  {
    key: "pentaart",
    title: "PentaArt",
    stack: ["Django 5", "Next.js", "Celery", "Redis", "PostgreSQL"],
    image: "/images/projects/pentaart-gallery.png",
    github: "https://github.com/Sarahenia20/Pentagos_Django",
  },
  {
    key: "brando",
    title: "BranDo 2.0",
    stack: ["React", "Three.js", "Laravel", "Express", "MongoDB"],
    image: "/images/projects/brando-landing.png",
    github: "https://github.com/Sarahenia20/BranDo-2.0",
  },
  {
    key: "ecolink",
    title: "EcoLink",
    stack: ["Django", "FastAPI", "Next.js", "PostgreSQL"],
    image: "/images/projects/ecolink-dashboard.png",
    github: "https://github.com/Sarahenia20/Ecolink-Semantics",
  },
  {
    key: "waste2product",
    title: "waste2product",
    stack: ["Laravel 12", "PHP 8.2", "MySQL"],
    image: "/images/projects/waste2product-projects.png",
    github: "https://github.com/Sarahenia20/waste2product",
    demo: "https://waste2product.up.railway.app/",
  },
] as const

export type EarlierKey = (typeof earlierProjects)[number]["key"]

export const journeyMarks = [
  { key: "essect", year: "2020", logo: null, kind: "study" },
  { key: "esprit", year: "2023", logo: null, kind: "study" },
  { key: "certs", year: "2024", logo: null, kind: "cert" },
  { key: "pm", year: "2025", logo: "/logos/samurai-white.svg", kind: "work" },
  { key: "ced", year: "2026", logo: "/logos/ced-white.svg", kind: "work" },
  { key: "dawn", year: "2026", logo: "/logos/samurai-white.svg", kind: "work" },
  { key: "architect", year: "2026", logo: "/logos/samurai-white.svg", kind: "work" },
] as const

export type JourneyKey = (typeof journeyMarks)[number]["key"]

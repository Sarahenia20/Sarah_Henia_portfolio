// Facts that do not change with the language: links, dates, file names, stacks.
import type { Locale } from "@/lib/i18n/config"

export const links = {
  email: "sarah.hania15@gmail.com",
  linkedin: "https://www.linkedin.com/in/sarah-henia20/",
  github: "https://github.com/Sarahenia20",
}

// The three angles of the resume. The lens switcher on the home page uses the same keys
// to change emphasis; the downloadable resume is always the Software Engineer one.
export const focuses = ["sol", "ai", "swe"] as const
export type Focus = (typeof focuses)[number]

// One resume on the site. French visitors get the French version; everyone else the English one.
export function resumeHref(locale: Locale) {
  return locale === "fr"
    ? "/resume/Sarah_Henia_Software_Engineer_FR_Photo.pdf"
    : "/resume/Sarah_Henia_Software_Engineer_EN_NoPhoto.pdf"
}

// Order on the home page and in the "next case study" links.
export const systems = ["collaboris", "market-intelligence", "dawn"] as const
export type SystemSlug = (typeof systems)[number]

export const systemFacts: Record<
  SystemSlug,
  { org: string; stack: string[]; logo: string; accent: "blue" | "violet" | "pink" }
> = {
  collaboris: {
    org: "CED Tunisia",
    stack: ["Angular", "TypeScript", "C#", ".NET", "SignalR", "Redis", "SQL Server", "Cosmos DB", "Python", "FastAPI", "Azure OpenAI", "MCP", "Azure", "Azure DevOps", "npm", "NuGet"],
    logo: "/logos/collaboris.png",
    accent: "pink",
  },
  "market-intelligence": {
    org: "The SamurAI",
    stack: ["Python", "Pydantic", "SurrealDB", "LLM gateway", "OpenAI", "Claude", "MCP", "Docker", "GitHub Actions", "Evals", "NIST AI RMF", "ISO 42001"],
    logo: "/logos/samurai-white.svg",
    accent: "violet",
  },
  dawn: {
    org: "The SamurAI",
    stack: ["Python", "SurrealDB", "Redis", "OpenRouter", "Llama", "Microsoft Graph", "AWS", "Linux", "GitHub Actions", "Logfire", "Langfuse"],
    logo: "/logos/samurai-white.svg",
    accent: "blue",
  },
}

// Site-wide stack, same rows as the GitHub profile.
export const stackGroups = {
  ai: ["Claude", "OpenAI", "MCP", "LangChain", "Hugging Face", "Pydantic"],
  build: ["Python", "TypeScript", "C#", ".NET", "FastAPI", "Node.js", "GraphQL"],
  front: ["Angular", "React", "Next.js"],
  data: ["SurrealDB", "PostgreSQL", "SQL Server", "MongoDB", "Redis", "Neo4j"],
  cloud: ["AWS", "Azure", "Azure DevOps", "Docker", "GitHub Actions", "Nginx", "Linux"],
} as const

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
    stack: ["Django", "Next.js", "Celery", "Redis", "PostgreSQL"],
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
    stack: ["Laravel", "PHP", "MySQL"],
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
  { key: "architect", year: "2026", logo: "/logos/samurai-white.svg", kind: "work" },
] as const

export type JourneyKey = (typeof journeyMarks)[number]["key"]

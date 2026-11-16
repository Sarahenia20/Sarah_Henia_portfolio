// Extra sections that only the Kashaf case study has (the poster, the three ideas, the eval loop,
// how it was built, the honest status). English first; French and Arabic fall back to English
// until Sarah has approved the English and reviewed the translations.
// Facts: the Kashaf repository docs (overview, architecture-and-operations, eval-loop), dated 16 Nov 2026.
// House rules: no em dashes, no client name, no repository name, no test counts.
import type { Locale } from "@/lib/i18n/config"

export const kashafPoster = "/work/kashaf-architecture.html"

const en = {
  posterTitle: "The AI agent stack",
  posterHint: "Hover or tap a tile to see what it is and why it is there. \"Play the life of a lead\" walks one lead through the whole system.",
  posterOpen: "Open full screen",
  ideasTitle: "Three ideas hold it together",
  ideas: [
    ["One memory", "Everything the agents know lives in one SurrealDB knowledge graph: articles, leads, companies, people's decisions, model calls. One company is one node, every lead points to its article and every article to its source. Agents retrieve connected, proven facts from the graph (GraphRAG), never text that only sounds similar."],
    ["One door", "No agent calls a model directly or holds a provider key. Every call goes through Kong, with the agent's own key, rate limit and request id, then LiteLLM, which picks the real model, falls back when a provider fails and reports the exact cost."],
    ["One person", "The agent proposes, a person decides, the system records. Nothing reaches the CRM or leaves the system without a person's approval and reason. A decision made in bulk, or by an AI on someone's behalf, is held back by code. The AI judge can recommend; it never decides."],
  ] as [string, string][],
  evalTitle: "How it gets better, and how I know",
  evalIntro:
    "Quality is a loop where the agent never grades its own work. One model finds, a stronger one judges, a model from a different family checks the drafts, and people label blind and audit the judge.",
  evalSteps: [
    ["Measure", "The finder against the AI judge on 51 real articles: recall 100%, precision 21%. It misses nothing, but it is far too eager."],
    ["Read the failures", "The false alarms had a pattern: regulator announcements and vendor news read as a buyer's need."],
    ["Change one thing", "One rule in the finder's prompt: a regulator's or a vendor's announcement is a lead only if a named buyer has a need."],
    ["Compare, article by article", "The new version runs on the same articles. The experiment log shows what got fixed and what broke. A change that loses a real lead is not promoted, whatever its average."],
  ] as [string, string][],
  evalNote:
    "Next to the loop: a quality page with precision, recall and a confusion matrix, an AI judge audited against people, and a small in-house classifier (TF-IDF and logistic regression) retrained each morning on the system's own data, measured before it is trusted.",
  roleTitle: "How it was built",
  role: [
    "I owned the product and the architecture. I defined the problem, chose every major design (one knowledge graph, one governed gateway, a person deciding every action, quality driven by evaluation), wrote each technical decision down as a decision record, reviewed the work at every step and ran it on real data.",
    "The code was written in close collaboration with AI coding agents (Claude Code), which I directed and reviewed, and the commits are co-authored. Building this way is part of the point: the same rules apply to my own tools. Claude Code is never allowed to record a lead decision on a person's behalf.",
  ],
  statusTitle: "Where it stands",
  numbersCaption: "As of 16 Nov 2026",
  numbers: [
    ["3", "agents"],
    ["927", "articles read and stored"],
    ["14", "leads, each with its proof"],
    ["40", "decision records"],
    ["8 of 8", "red-team attacks held"],
    ["about $2.25", "total model spend"],
  ] as [string, string][],
  done: [
    "Runs every morning on one machine, end to end, and writes approved leads to an Odoo CRM with their proof and score.",
    "English and Arabic (right to left) console, with translation on demand.",
    "A server kit is ready: Docker, Caddy, backups and restore.",
  ],
  notYet: [
    "Not deployed to a server yet.",
    "Not yet measured against the client's own salespeople: the labels so far come from the AI judge.",
    "No custom model yet: the in-house classifier is small. Fine-tuning an open model is a direction, not a result.",
    "No alerting yet: a person reads the morning report.",
  ],
  doneLabel: "Built",
  notYetLabel: "Not yet",
  shotsTitle: "Screenshots",
}

export type KashafExtras = typeof en

const byLocale: Partial<Record<Locale, KashafExtras>> = { en }

export function kashafExtras(locale: Locale): KashafExtras {
  return byLocale[locale] ?? en
}

// Screenshots go in public/images/kashaf/. Add an entry here when Sarah sends one.
// Check every image for client names, company names from the leads, emails and keys before adding it.
export const kashafShots: { src: string; caption: string; width: number; height: number }[] = []

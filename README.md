# saraheniaportfolio.vercel.app

Personal portfolio of Sarah Henia, AI Solutions & Software Engineer. Live at
[saraheniaportfolio.vercel.app](https://saraheniaportfolio.vercel.app).

The site tells the story of three production systems (Dawn, a market-intelligence system, Collaboris)
through case studies rather than code, because the code lives in private company repositories.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS with a small token set (`app/globals.css`), dark theme by default, light theme via `next-themes`
- Fonts through `next/font`: Bricolage Grotesque, IBM Plex Sans, IBM Plex Sans Arabic, IBM Plex Mono, Instrument Serif
- No analytics, no tracking, no runtime requests to third parties

## Languages

English, French and Arabic, routed as `/en`, `/fr` and `/ar`. `middleware.ts` picks the language from
a cookie or the browser's `Accept-Language` header. Arabic renders right to left (`dir="rtl"`).

All copy lives in `lib/content/{en,fr,ar}.ts`, typed against the English file so the three stay in sync.
Facts that do not change with the language (links, dates, stacks) live in `lib/content/shared.ts`.

## Structure

```
app/[locale]/              layout (fonts, metadata, JSON-LD), home page, not-found
app/[locale]/work/[slug]/  case-study pages: dawn, market-intelligence, collaboris
app/sitemap.ts, robots.ts  generated SEO files
components/                hero (with the "lens" switcher), work cards, journey timeline,
                           architecture-flow (clickable SVG diagram), earlier work, about, contact
lib/content/               copy and shared facts
lib/i18n/                  locale list and helpers
public/resume/             resume PDFs (three angles x EN/FR, with and without photo)
```

## Run locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build, also type-checks
```

## Deploy

Vercel deploys `main`. Work happens on branches and reaches `main` through pull requests.

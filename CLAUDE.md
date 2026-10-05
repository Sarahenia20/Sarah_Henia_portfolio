# Portfolio rebuild: brief for Claude Code

Owner: Sarah Henia. This is her personal portfolio (Next.js 14, Tailwind, pnpm, deployed on Vercel at
https://saraheniaportfolio.vercel.app). Read this whole file before changing anything.

## The goal

Rebuild the site so it looks professional and deliberate, not AI-generated, and tells the same story as her resume
and GitHub profile. The website is where the projects get told in detail.

## Source of truth (do not invent anything)

- Resume content: `../Resume/_source/content.py` (all roles, bullets, skills, dates, in English and French).
- Visual assets already made in her style: `../GitHub/profile-repo/assets/` (banner.svg, dawn.svg, market.svg,
  collaboris.svg, stack.svg). Reuse them or their look.
- Never add a claim, number, client name or metric that is not in those files. No test counts. No client names
  except CED Tunisia and The SamurAI. The Orvix work is described only as "a Middle East cybersecurity client".

## What is wrong today (fix first)

1. `components/experience-section.tsx` shows template fake companies (TechInnovate AI, DataSphere Solutions,
   AutomateX). Replace with the real experience from content.py.
2. Projects section shows old school projects first. New order: Dawn, Market-intelligence system, Collaboris,
   then "Earlier projects" (SentinelHub, Taskify, PentaArt, BranDo 2.0) smaller.
3. The design is busy (floating shapes, animated cube, loading screen, glow). Too much motion reads as AI-made.
4. `package.json` pulls in expo / react-native, which a Next.js site does not need. Remove unused dependencies.
5. README still says "IbraAutomate". Rewrite it.

## Design direction

- Palette (same as GitHub profile): background #0a0f1f, card #10172e, line #243056, text #e8ecff, muted #8b96bb,
  blue #5b8cff, violet #9b6bff, pink #f472b6, green #34d399 (green only means "human approves").
  Provide a light theme too.
- Calm and editorial: generous whitespace, one strong type pairing, motion only where it explains something.
- No em dashes anywhere in copy.

## Pages and sections

- Home: hero (name, "AI Solutions & Software Engineer", one-line pitch, links: Resume PDF, LinkedIn, GitHub, email),
  three project cards, short about, contact.
- One case-study page per system: /work/dawn, /work/market-intelligence, /work/collaboris. Each: problem, what she
  built, architecture diagram, key decisions and trade-offs, governance, what she learned. Keep internal details
  out (no IPs, keys, tenant IDs, client names, internal code).
- Resume download: the PDFs in `../Resume/`.
- Optional later: blog.

## Languages

English, French and Arabic. Arabic must be right-to-left (dir="rtl") with a suitable Arabic font. Use Next.js
i18n routing (/en, /fr, /ar) and a language switcher. Sarah reviews the Arabic and French copy herself.

## SEO

Per-page metadata and Open Graph images, hreflang alternates for en/fr/ar, sitemap.xml, robots.txt,
JSON-LD Person schema, semantic HTML, good Lighthouse scores (performance, accessibility, SEO).

## How to work with Sarah

- Small steps. After each step, tell her what changed and how to see it (`pnpm dev`, then http://localhost:3000).
- Explain the code you write in plain words, so she can explain it in an interview.
- Commit on a branch, never force-push to main. Vercel deploys from main.

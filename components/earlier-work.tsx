import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import type { Dictionary } from "@/lib/content"
import { earlierProjects } from "@/lib/content/shared"
import SectionHeading from "./section-heading"

export default function EarlierWork({ t }: { t: Dictionary }) {
  return (
    <section id="earlier" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeading eyebrow={t.earlier.eyebrow} heading={t.earlier.heading} intro={t.earlier.intro} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {earlierProjects.map((p) => (
          <li key={p.key} className="glass flex flex-col overflow-hidden rounded-xl">
            <div className="relative aspect-[16/10] border-b border-line bg-bg">
              <Image
                src={p.image}
                alt={`${p.title} screenshot`}
                fill
                sizes="(min-width:1024px) 360px, (min-width:640px) 50vw, 100vw"
                className="object-cover object-top opacity-90"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{t.earlier.items[p.key]}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-4 text-sm">
                <a href={p.github} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-fg/85 hover:text-blue">
                  <Github size={14} /> {t.earlier.code}
                </a>
                {"demo" in p && p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 text-fg/85 hover:text-blue">
                    <ExternalLink size={14} /> {t.earlier.demo}
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

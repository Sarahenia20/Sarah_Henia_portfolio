"use client"

import { useState } from "react"
import { Check, Copy, Github, Linkedin } from "lucide-react"
import type { Dictionary } from "@/lib/content"
import { links } from "@/lib/content/shared"
import SectionHeading from "./section-heading"

export default function Contact({ t }: { t: Dictionary }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard blocked: the address is selectable text anyway.
    }
  }

  return (
    <section id="contact" className="container scroll-mt-20 py-16 md:py-24">
      <SectionHeading eyebrow={t.contact.eyebrow} heading={t.contact.heading} intro={t.contact.text} />
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${links.email}`}
          className="font-display text-2xl font-bold tracking-tight text-blue hover:underline sm:text-3xl"
          dir="ltr"
        >
          {links.email}
        </a>
        <button type="button" onClick={copy} className="btn h-9 py-0" aria-live="polite">
          {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
          {copied ? t.contact.copied : t.contact.copy}
        </button>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={links.linkedin} target="_blank" rel="noopener" className="btn">
          <Linkedin size={16} /> LinkedIn
        </a>
        <a href={links.github} target="_blank" rel="noopener" className="btn">
          <Github size={16} /> GitHub
        </a>
      </div>
    </section>
  )
}

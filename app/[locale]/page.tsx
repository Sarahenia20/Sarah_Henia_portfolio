import { notFound } from "next/navigation"
import { isLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/content"
import Hero from "@/components/hero"
import WorkCards from "@/components/work-cards"
import Journey from "@/components/journey"
import StackGrid from "@/components/stack-grid"
import EarlierWork from "@/components/earlier-work"
import About from "@/components/about"
import Contact from "@/components/contact"

export default function HomePage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound()
  const t = getDictionary(params.locale)
  return (
    <>
      <Hero locale={params.locale} t={t} />
      <WorkCards locale={params.locale} t={t} />
      <StackGrid t={t} />
      <Journey t={t} />
      <EarlierWork t={t} />
      <About t={t} />
      <Contact t={t} />
    </>
  )
}

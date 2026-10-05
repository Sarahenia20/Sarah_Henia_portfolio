export default function SectionHeading({ eyebrow, heading, intro, introClassName = "" }: { eyebrow: string; heading: string; intro?: string; introClassName?: string }) {
  return (
    <div className="max-w-[640px]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
      {intro && <p className={`mt-4 text-base leading-relaxed text-muted md:text-lg ${introClassName}`}>{intro}</p>}
    </div>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

// The architecture poster is a self-contained page from the project, embedded in an iframe.
// The iframe grows to the poster's full height so the visitor never scrolls inside a box.
// It is served from the same site, so we can read its height directly.
export default function PosterFrame({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(900)

  useEffect(() => {
    const frame = ref.current
    if (!frame) return
    let observer: ResizeObserver | undefined

    const fit = () => {
      const doc = frame.contentDocument
      if (!doc?.body) return
      // Measure the poster itself, not the page: the poster's body has min-height: 100vh,
      // which inside an iframe would just echo the iframe's own height back.
      const content = doc.getElementById("ax-wrap") ?? doc.body
      const measure = () => setHeight(Math.ceil(content.getBoundingClientRect().bottom + 24))
      measure()
      observer?.disconnect()
      observer = new ResizeObserver(measure)
      observer.observe(content)
    }

    frame.addEventListener("load", fit)
    fit()
    return () => {
      frame.removeEventListener("load", fit)
      observer?.disconnect()
    }
  }, [])

  return (
    <iframe
      ref={ref}
      src={src}
      title={title}
      scrolling="no"
      style={{ height }}
      className="glass mt-5 w-full overflow-hidden rounded-2xl"
    />
  )
}

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight">Page not found</h1>
      <Link href="/en" className="btn mt-6">Home</Link>
    </div>
  )
}

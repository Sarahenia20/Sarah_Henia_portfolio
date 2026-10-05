/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel serves the images through its optimizer. Formats listed smallest first.
  images: {
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig

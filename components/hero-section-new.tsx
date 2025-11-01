"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function HeroSectionNew() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.15)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Effect - Desktop Only */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 70%)",
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div style={{ opacity, scale, y }} className="container mx-auto px-4 lg:pl-20 relative z-10">
        {/* Mobile Layout */}
        <div className="lg:hidden flex flex-col items-center text-center space-y-4 pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-heading font-bold leading-tight"
          >
            <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              PRODUCT OWNER &
            </span>
            <span className="block bg-gradient-to-r from-blue-500/40 to-purple-500/40 px-2 text-white border-2 border-blue-400/50 rounded shadow-lg shadow-blue-500/20">
              FULL-STACK
            </span>
            <span className="block italic bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              ENGINEER
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-sm text-gray-300 max-w-xs leading-relaxed px-2"
          >
            Building intelligent systems at the intersection of AI, security, and automation. Currently supervising 2
            major projects in cybersecurity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center gap-4 w-full max-w-xs"
          >
            <motion.a
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white shadow-lg shadow-primary/20 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
          </motion.div>

          {/* Mobile Profile Card - Compact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="relative mt-4 mb-16"
          >
            <div className="relative glass rounded-xl p-4 border-2 border-blue-500/30 shadow-lg shadow-blue-500/20 max-w-xs">
              <div className="w-24 h-24 mx-auto mb-3 rounded-lg overflow-hidden border-2 border-purple-500/50 relative shadow-lg shadow-purple-500/20">
                <Image src="/images/sarah-avatar.jpg" alt="Sarah Henia" fill className="object-cover" priority />
              </div>
              <div className="text-center">
                <h3 className="text-base font-bold mb-1">Sarah Henia</h3>
                <p className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium text-xs mb-2">
                  Product Owner & Full-Stack Engineer
                </p>
                <div className="flex items-center justify-center gap-1">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-300">Open for 2026 Internships</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-7xl font-heading font-bold leading-tight">
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  PRODUCT OWNER &
                </span>
                <span className="block bg-gradient-to-r from-blue-500/40 to-purple-500/40 px-4 text-white border-2 border-blue-400/50 rounded shadow-lg shadow-blue-500/30">
                  FULL-STACK
                </span>
                <span className="block italic bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  ENGINEER
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xl text-gray-300 max-w-lg leading-relaxed mb-12"
              >
                Building intelligent systems at the intersection of AI, security, and automation. Currently supervising
                2 major projects in cybersecurity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#projects"
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-medium text-white hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 border border-blue-400/30"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Profile & Stats */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              {/* Main Profile Card */}
              <div className="relative glass rounded-3xl p-8 border-2 border-blue-500/30 shadow-xl shadow-blue-500/20 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden border-2 border-purple-500/50 relative shadow-lg shadow-purple-500/20">
                    <Image src="/images/sarah-avatar.jpg" alt="Sarah Henia" fill className="object-cover" priority />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Sarah Henia</h3>
                    <p className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium mb-4 text-lg">
                      Product Owner & Full-Stack Engineer
                    </p>

                    {/* Status Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-300">Available Early 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Globe } from "lucide-react"

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })
  const controls = useAnimation()

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const listItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  }

  return (
    <section id="about" className="py-20 md:py-32 relative">
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

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.15)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_40%)]"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-purple-500/15 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto" ref={ref}>
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
              Building intelligent systems at the intersection of AI, security, and automation
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4"
            ></motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="md:col-span-2 glass card-hover p-6 md:p-8 h-full border-2 border-blue-500/20 shadow-lg shadow-blue-500/10"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h3
                className="text-2xl md:text-3xl font-heading font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                About Me
              </motion.h3>

              <motion.div
                className="space-y-4 text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p>
                  I'm a Product Owner and Full-Stack Engineering Student passionate about building intelligent systems
                  at the intersection of AI, security, and automation. I bridge the gap between technical execution and
                  business strategy, translating complex requirements into scalable solutions.
                </p>

                <p>
                  Currently working at{" "}
                  <strong className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    The SamurAI
                  </strong>
                  ,A promising US-based cyber security & Consulting solutions company where I'm supervising the
                  development of two major projects:
                </p>

                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      <strong className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        The SamurAI Dojo
                      </strong>{" "}
                      - Next-generation automated product testing and security validation lab
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>
                      <strong className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Arab Platform
                      </strong>{" "}
                      - Localized cybersecurity website for MENA region markets
                    </span>
                  </li>
                </ul>

                <p>
                  I specialize in full-stack development (React, Next.js, Django, NestJS), AI/ML (LLMs, RAG, deep
                  learning, BERT, TensorFlow, Hugging Face), DevOps infrastructure (Docker, Grafana, Prometheus,
                  SonarQube), and threat detection systems. My work spans from architecting microservices to
                  implementing real-time monitoring and security solutions.
                </p>

                <p>
                  Fluent in English (C1), French (B2), and Arabic (native) - working effectively across cultures and
                  technical domains. Open to &nbsp;
                  <strong className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    6-month internship & and research thesis
                  </strong>{" "}
                  opportunities in Software Engineering, AI/ML, Product Management, and DevSecOps starting Early 2026
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              className="neomorphic p-6 md:p-8 h-full border-2 border-purple-500/20 shadow-lg shadow-purple-500/10"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="flex items-center gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Globe className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl md:text-2xl font-heading font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Languages
                </h3>
              </motion.div>

              <ul className="space-y-6">
                <motion.li
                  className="flex items-center justify-between p-4 glass rounded-lg border border-blue-500/20"
                  custom={0}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={listItemVariants}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇬🇧</span>
                    <div>
                      <div className="font-semibold text-white">English</div>
                      <div className="text-sm text-gray-400">Professional</div>
                    </div>
                  </div>
                  <span className="text-blue-400 font-bold">C1</span>
                </motion.li>

                <motion.li
                  className="flex items-center justify-between p-4 glass rounded-lg border border-purple-500/20"
                  custom={1}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={listItemVariants}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇫🇷</span>
                    <div>
                      <div className="font-semibold text-white">French</div>
                      <div className="text-sm text-gray-400">Upper Intermediate</div>
                    </div>
                  </div>
                  <span className="text-purple-400 font-bold">B2</span>
                </motion.li>

                <motion.li
                  className="flex items-center justify-between p-4 glass rounded-lg border border-blue-500/20"
                  custom={2}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={listItemVariants}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇪🇸</span>
                    <div>
                      <div className="font-semibold text-white">Spanish</div>
                      <div className="text-sm text-gray-400">Elementary</div>
                    </div>
                  </div>
                  <span className="text-blue-400 font-bold">A1</span>
                </motion.li>

                <motion.li
                  className="flex items-center justify-between p-4 glass rounded-lg border border-purple-500/20"
                  custom={3}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={listItemVariants}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇹🇳</span>
                    <div>
                      <div className="font-semibold text-white">Arabic</div>
                      <div className="text-sm text-gray-400">Mother Tongue</div>
                    </div>
                  </div>
                  <span className="text-purple-400 font-bold">Native</span>
                </motion.li>
              </ul>

              <motion.div
                className="mt-6 gradient-border p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <p className="text-center text-sm italic text-gray-300">
                  Working effectively across cultures and technical domains
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

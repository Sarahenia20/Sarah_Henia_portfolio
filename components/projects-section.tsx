"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, type PanInfo } from "framer-motion"
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Palette,
  CheckSquare,
  Shirt,
  Leaf,
  Recycle,
} from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

const projects = [
  {
    title: "SentinelHub",
    tagline: "AI-Powered Security Intelligence Platform",
    description:
      "Comprehensive DevSecOps platform with autonomous threat detection. Integrates multiple security scanning tools (Trivy, Semgrep, Gitleaks, SonarQube, OWASP ZAP) for vulnerability analysis and real-time monitoring.",
    longDescription:
      "Comprehensive DevSecOps platform with autonomous threat detection and AI-powered vulnerability prioritization. Integrates multiple security scanning tools including Trivy for container scanning, Semgrep for static analysis, Gitleaks for secret detection, SonarQube for code quality, and OWASP ZAP for web security testing. Features distributed microservices architecture, real-time monitoring with Grafana, intelligent threat detection, and automated security recommendations powered by ML models.",
    tags: ["Next.js", "Express", "GoLang", "Docker", "Grafana"],
    images: ["/images/projects/sentinelhub-dashboard.png", "/images/projects/sentinelhub-scan.png"],
    links: {
      demo: "https://esprittn.sharepoint.com/:v:/s/msteams_93e69e/EZEjjMA65pRKmImsnMtkwyQBK08FjrT7KpdHfY_Vr5tUMw",
      github: "https://github.com/Sarahenia20/SentinelHub",
    },
    features: [
      "Multi-engine security scanning (Trivy, Semgrep, Gitleaks, SonarQube, OWASP ZAP)",
      "Real-time vulnerability monitoring with Grafana",
      "AI-powered threat prioritization",
      "Distributed microservices architecture",
    ],
    color: "from-red-500/20 to-orange-500/20",
    icon: CheckSquare,
  },
  {
    title: "PentaArt",
    tagline: "Generative AI Art Platform",
    description:
      "Full-stack generative art platform combining dual AI providers (Gemini 2.5 Flash + GPT-4o) with algorithmic art generation. Features async processing with Celery + Redis, smart galleries with collections and tagging.",
    longDescription:
      "Full-stack generative art platform combining dual AI providers (Gemini 2.5 Flash + GPT-4o) with algorithmic art generation (fractals, flow fields, L-systems). Features async processing with Celery + Redis, smart galleries with collections and tagging, analytics dashboard for style evolution tracking, and personalized user profiles that learn art preferences.",
    tags: ["Django 5", "Next.js", "Celery", "Redis", "Gemini 2.5", "DALL·E 3", "PostgreSQL", "Cloudinary"],
    images: ["/images/projects/pentaart-landing.png", "/images/projects/pentaart-gallery.png"],
    links: {
      demo: "#",
      github: "https://github.com/Sarahenia20/Pentagos_Django",
    },
    features: [
      "Dual AI generation (Gemini + GPT-4o)",
      "Algorithmic art (fractals, patterns)",
      "Async processing with Celery",
      "Smart galleries with analytics",
    ],
    color: "from-purple-500/20 to-pink-500/20",
    icon: Palette,
  },
  {
    title: "Taskify",
    tagline: "AI-Powered Task & Project Management",
    description:
      "Comprehensive MERN stack task and project management platform with AI-powered prioritization using Google Gemini. Features real-time collaboration with Socket.io, advanced analytics dashboard, and complete CI/CD pipeline.",
    longDescription:
      "Comprehensive MERN stack task and project management platform with AI-powered prioritization using Google Gemini. Features real-time collaboration with Socket.io, advanced analytics dashboard, resource allocation monitoring, and complete CI/CD pipeline with Docker and GitHub Actions. Built following Agile methodology across 5 sprints with full test coverage and API documentation.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Gemini AI", "Socket.io", "Docker", "Jest", "Cloudinary"],
    images: ["/images/projects/taskify-signup.png", "/images/projects/taskify-dashboard.png"],
    links: {
      demo: "https://taskify-phi-mauve.vercel.app/auth/SignIn",
      github: "https://github.com/Sarahenia20/Apollo_FS_Taskify",
    },
    features: [
      "AI-powered task prioritization",
      "Real-time collaboration",
      "Resource allocation dashboard",
      "Complete CI/CD pipeline",
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    icon: CheckSquare,
  },
  {
    title: "BranDo 2.0",
    tagline: "3D Brand Creation & AI Automation Platform",
    description:
      "Full-stack platform combining interactive 3D t-shirt customization with Three.js, complete survey management system with analytics dashboard, and AI-powered Instagram automation using Gemini AI.",
    longDescription:
      "Full-stack platform combining interactive 3D t-shirt customization with Three.js, complete survey management system with analytics dashboard, and AI-powered Instagram automation using Gemini AI. Features real-time 3D design with React Three Fiber, multi-account social media management, and automated content generation and posting workflows.",
    tags: ["React", "Three.js", "Laravel", "Express.js", "MongoDB", "Gemini AI", "Puppeteer"],
    images: ["/images/projects/brando-landing.png", "/images/projects/brando-dashboard.png"],
    links: {
      demo: "#",
      github: "https://github.com/Sarahenia20/BranDo-2.0",
    },
    features: [
      "Real-time 3D product customization",
      "Survey management with analytics",
      "AI-driven Instagram automation",
      "Multi-account social media management",
    ],
    color: "from-orange-500/20 to-yellow-500/20",
    icon: Shirt,
  },
  {
    title: "EcoLink",
    tagline: "Smart Recycling & Sustainability Platform",
    description:
      "Semantic AI platform for eco-impact tracking and intelligent waste management. Uses advanced semantic search and AI-driven categorization to optimize recycling routes and track environmental impact at scale.",
    longDescription:
      "Semantic AI platform for eco-impact tracking and intelligent waste management. Uses advanced semantic search and AI-driven categorization to optimize recycling routes and track environmental impact at scale. Built with Django and FastAPI backend with Next.js frontend for real-time sustainability metrics and waste categorization.",
    tags: ["Django", "FastAPI", "Next.js", "AI Semantics", "PostgreSQL"],
    images: ["/images/projects/ecolink-landing.png", "/images/projects/ecolink-dashboard.png"],
    links: {
      demo: "#",
      github: "https://github.com/Sarahenia20/Ecolink-Semantics",
    },
    features: [
      "Semantic waste categorization",
      "Eco-impact tracking dashboard",
      "Intelligent routing optimization",
      "Real-time sustainability metrics",
    ],
    color: "from-green-500/20 to-emerald-500/20",
    icon: Leaf,
  },
  {
    title: "waste2product",
    tagline: "Waste Management & Recycling Platform",
    description:
      "Comprehensive Laravel-based platform for e-waste management and community sustainability. Connects users to declare waste materials, discover DIY recycling projects with tutorials, and participate in environmental events.",
    longDescription:
      "Comprehensive Laravel-based platform for e-waste management and community sustainability. Connects users to declare waste materials, discover DIY recycling projects with step-by-step tutorials, and participate in environmental events and workshops. Features multi-module architecture with waste tracking, project sharing, event management, participant registration system, and gamification with CO2 savings tracking.",
    tags: ["Laravel 12", "PHP 8.2", "MySQL", "Blade Templates", "REST API"],
    images: ["/images/projects/waste2product-tutorials.png", "/images/projects/waste2product-projects.png"],
    links: {
      demo: "https://waste2product.up.railway.app/",
      github: "https://github.com/Sarahenia20/waste2product",
    },
    features: [
      "Waste declaration & reservation",
      "DIY project tutorials",
      "Event management & registration",
      "CO2 savings tracking & gamification",
    ],
    color: "from-teal-500/20 to-cyan-500/20",
    icon: Recycle,
  },
]

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1, fallback: true })
  const controls = useAnimation()
  const { language } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({})
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    },
    cardVariants = {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    },
    itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length)
    setIsExpanded(false)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length)
    setIsExpanded(false)
  }

  const nextImage = (projectIndex: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % projects[projectIndex].images.length,
    }))
  }

  const prevImage = (projectIndex: number) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectIndex]:
        ((prev[projectIndex] || 0) - 1 + projects[projectIndex].images.length) % projects[projectIndex].images.length,
    }))
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prevProject()
    } else if (info.offset.x < -threshold) {
      nextProject()
    }
  }

  const getProjectIcon = (index: number) => {
    const IconComponent = projects[index].icon
    return <IconComponent className="w-5 h-5 text-white" />
  }

  const currentProject = projects[activeIndex]
  const currentImgIndex = currentImageIndex[activeIndex] || 0

  return (
    <section
      id="projects"
      className="py-20 md:py-32 relative bg-[linear-gradient(rgba(59,130,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.15)_1px,transparent_1px)] bg-[size:50px_50px]"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            {language === "fr" ? "Projets " : "Featured "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {language === "fr" ? "Phares" : "Projects"}
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            {language === "fr"
              ? "De plateformes DevSecOps à l'art génératif - explorer où l'IA rencontre l'ingénierie"
              : "From DevSecOps platforms to generative art - exploring where AI meets engineering"}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="relative" ref={projectsRef}>
          <div className="hidden lg:flex absolute top-1/2 -left-12 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={prevProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>

          <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
            <motion.button
              onClick={nextProject}
              className="p-3 rounded-full glass hover:bg-card/50 transition-colors"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          <div className="overflow-hidden">
            <motion.div
              key={activeIndex}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="grid md:grid-cols-2 gap-8 items-center project-card"
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              whileDrag={{ scale: 0.95 }}
            >
              <div className="order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                  style={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      {getProjectIcon(activeIndex)}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-heading font-bold">{currentProject.title}</h3>
                      <p className="text-sm text-gray-400">{currentProject.tagline}</p>
                    </div>
                  </div>

                  <motion.p
                    className="text-gray-300"
                    initial={{ height: "auto" }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {isExpanded ? currentProject.longDescription : currentProject.description}
                  </motion.p>

                  <motion.button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-sm text-primary hover:text-secondary transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {isExpanded
                      ? language === "fr"
                        ? "Voir moins"
                        : "Show less"
                      : language === "fr"
                        ? "Lire plus"
                        : "Read more"}
                  </motion.button>

                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full glass border border-primary/20"
                        whileHover={{ scale: 1.05, y: -2 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="text-lg font-medium">
                      {language === "fr" ? "Fonctionnalités Clés" : "Key Features"}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {currentProject.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-300"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          style={{ opacity: 1 }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      href={currentProject.links.demo}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass bg-primary/10 hover:bg-primary/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      {language === "fr" ? "Démo Live" : "Live Demo"}
                    </motion.a>
                    <motion.a
                      href={currentProject.links.github}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass hover:bg-card/50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={16} />
                      {language === "fr" ? "Code Source" : "Source Code"}
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  className="gradient-border p-1 rounded-2xl overflow-hidden"
                  style={{ opacity: 1 }}
                >
                  <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${currentProject.color} p-4 relative`}>
                    <motion.div
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      transition={{ duration: 0.3 }}
                      className="neomorphic overflow-hidden rounded-lg relative"
                    >
                      <Image
                        src={currentProject.images[currentImgIndex] || "/placeholder.svg"}
                        alt={`${currentProject.title} screenshot ${currentImgIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover rounded-lg"
                      />

                      {currentProject.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              prevImage(activeIndex)
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                            aria-label="Previous image"
                          >
                            <ChevronLeft size={20} className="text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              nextImage(activeIndex)
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
                            aria-label="Next image"
                          >
                            <ChevronRight size={20} className="text-white" />
                          </button>

                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {currentProject.images.map((_, imgIdx) => (
                              <button
                                key={imgIdx}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setCurrentImageIndex((prev) => ({ ...prev, [activeIndex]: imgIdx }))
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  imgIdx === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                                }`}
                                aria-label={`View image ${imgIdx + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  setIsExpanded(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-primary w-6" : "bg-gray-600 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          <div className="lg:hidden text-center mt-4">
            <p className="text-sm text-gray-400">Swipe left or right to navigate projects</p>
          </div>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {projects
            .filter((_, idx) => idx !== activeIndex)
            .slice(0, 3)
            .map((project, idx) => {
              const projectIndex = projects.findIndex((p) => p.title === project.title)
              const previewImgIndex = currentImageIndex[projectIndex] || 0
              return (
                <motion.div
                  key={idx}
                  className="glass p-5 rounded-xl hover:bg-card/30 transition-all cursor-pointer project-card"
                  variants={cardVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => {
                    setActiveIndex(projectIndex)
                    setIsExpanded(false)
                  }}
                >
                  <div className="h-40 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={project.images[previewImgIndex] || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-primary/10 border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700">+{project.tags.length - 2}</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
        </motion.div>
      </div>
    </section>
  )
}

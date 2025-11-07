"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { GraduationCap, Award } from "lucide-react"

const technicalStack = {
  Frontend: ["React", "Next.js", "Three.js", "Tailwind CSS", "TypeScript", "Figma"],
  "Backend & APIs": [
    "Node.js",
    "Express.js",
    "Django",
    "Spring Boot",
    ".NET",
    "Laravel",
    "NestJS",
    "FastAPI",
    "REST APIs",
    "GraphQL",
  ],
  "AI & Machine Learning": [
    "OpenAI LLM",
    "TensorFlow",
    "Hugging Face",
    "RAG",
    "XGBoost",
    "Decision Trees",
    "SVM",
    "Neural Networks",
    "BERT",
    "Deep Learning",
    "PyTorch",
    "DALL-E",
  ],
  "Data Engineering": ["Hadoop", "Apache Spark", "HBase", "ETL Pipelines", "Data Warehousing", "Power BI", "Talend"],
  Databases: ["PostgreSQL", "MongoDB", "Neo4j", "Redis", "MySQL"],
  "DevOps & Security": [
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Trivy",
    "Semgrep",
    "Gitleaks",
    "SonarQube",
    "OWASP ZAP",
    "Wireshark",
    "Burp Suite",
    "Kali Linux",
    "Metasploit",
    "Jenkins",
    "Nexus",
    "Grafana",
    "Prometheus",
    "GitHub Actions",
  ],
  "Microservices & Cloud": [
    "AWS",
    "Microservices Design",
    "API Gateway",
    "Service Discovery",
    "Eureka Server",
    "Event-Driven Architecture",
  ],
  Networking: ["CCNA", "Switching", "Routing", "Wireless Essentials"],
}

const certifications = [
  {
    category: "AI & Machine Learning",
    items: [
      "NVIDIA - Adversarial Machine Learning",
      "NVIDIA - Building RAG Agents with LLMs",
      "NVIDIA - Fundamentals of Deep Learning",
      "NVIDIA - Applications of AI for Predictive Maintenance",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS Cloud Practitioner Associate"],
  },
  {
    category: "Development & Tools",
    items: ["Apollo GraphQL - Graph Developer Associate", "Hashgraph Developer Certification"],
  },
  {
    category: "Networking",
    items: ["Cisco CCNA - Switching, Routing, Wireless Essentials"],
  },
  {
    category: "Product Management",
    items: ["HP LIFE - Agile Project Management Practitioner"],
  },
]

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })

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
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="skills" className="py-20 md:py-32 relative">
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
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Qualifications
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Technical expertise across full-stack development, AI/ML, DevOps, and data engineering
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT SIDE - Technical Stack (60% / 3 columns) */}
          <motion.div variants={itemVariants} className="lg:col-span-3 space-y-8">
            <div className="glass card-hover p-6 rounded-2xl">
              <h3 className="text-2xl font-heading font-bold mb-6 text-blue-400">Technical Stack</h3>

              <div className="space-y-6">
                {Object.entries(technicalStack).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="px-3 py-1.5 text-sm bg-blue-950/30 hover:bg-blue-900/40 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Education & Certifications (40% / 2 columns) */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Education Card */}
            <Card className="glass card-hover p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-heading font-bold">Education</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-base font-semibold">Master's in Software Engineering</div>
                    <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">Current</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ESPRIT - Private School of Engineering & Technology
                  </div>
                </div>

                <div>
                  <div className="text-base font-semibold">Bachelor's in Business Intelligence</div>
                  <div className="text-sm text-muted-foreground">ESSECT Tunis</div>
                </div>
              </div>
            </Card>

            {/* Certifications Card */}
            <Card className="glass card-hover p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-heading font-bold">Certifications</h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.category}>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">
                      {cert.category}
                    </h4>
                    <ul className="space-y-1.5">
                      {cert.items.map((item) => (
                        <li key={item} className="text-sm text-muted-foreground flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

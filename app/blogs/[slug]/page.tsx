"use client"

import type React from "react"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowLeft, Brain, Zap, Shield, AlertTriangle, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: React.ReactNode
  date: string
  readTime: string
  author: string
  category: {
    name: string
    icon: React.ReactNode
    color: string
  }
  tags: Array<{
    name: string
    icon: React.ReactNode
    color: string
  }>
}

const blogPosts: Record<string, BlogPost> = {
  "absolute-zero-revolution": {
    slug: "absolute-zero-revolution",
    title: "The Absolute Zero Revolution: When AI Learns from Nothing",
    excerpt:
      "Exploring the groundbreaking methodology that enables AI models to master complex reasoning tasks without human intervention.",
    date: "December 2024",
    readTime: "8 min",
    author: "Ibrahim Mustafa",
    category: {
      name: "AI Research",
      icon: <Brain className="w-3 h-3 mr-1" />,
      color: "purple",
    },
    tags: [
      {
        name: "AI Research",
        icon: <Brain className="w-3 h-3 mr-1" />,
        color: "purple",
      },
      {
        name: "Breakthrough",
        icon: <Zap className="w-3 h-3 mr-1" />,
        color: "cyan",
      },
      {
        name: "Safety Concerns",
        icon: <AlertTriangle className="w-3 h-3 mr-1" />,
        color: "red",
      },
    ],
    content: (
      <div className="space-y-8">
        {/* Introduction */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            The Dawn of Self-Sufficient AI
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Imagine an AI system that doesn't need massive datasets, human supervision, or carefully curated training
            materials. The <strong className="text-white">"Absolute Zero"</strong> methodology, developed by researchers
            from Tsinghua University and BIG AI Institute, represents exactly this paradigm shift—a training approach
            that enables AI models to learn entirely self-sufficiently.
          </p>
        </div>

        {/* How it Works */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Zap className="w-6 h-6 text-cyan-400" />
            The Absolute Zero Reasoner (AZR)
          </h2>
          <p className="text-gray-300 leading-relaxed">
            At the heart of this innovation lies the{" "}
            <strong className="text-white">Absolute Zero Reasoner (AZR)</strong>, a sophisticated system that operates
            through a fascinating three-step process:
          </p>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <Card className="bg-purple-500/10 border-purple-500/30 p-4">
              <h3 className="font-semibold text-purple-300 mb-2">1. Generate</h3>
              <p className="text-sm text-gray-300">
                Creates its own cognitive challenges and complex problems to solve
              </p>
            </Card>
            <Card className="bg-cyan-500/10 border-cyan-500/30 p-4">
              <h3 className="font-semibold text-cyan-300 mb-2">2. Solve</h3>
              <p className="text-sm text-gray-300">Tackles these self-generated challenges using advanced reasoning</p>
            </Card>
            <Card className="bg-green-500/10 border-green-500/30 p-4">
              <h3 className="font-semibold text-green-300 mb-2">3. Refine</h3>
              <p className="text-sm text-gray-300">Improves capabilities through continuous self-play and iteration</p>
            </Card>
          </div>
          <p className="text-gray-300 leading-relaxed">
            AZR employs a sophisticated mix of{" "}
            <strong className="text-white">deduction, best explanatory inference, and induction</strong>
            to continuously improve itself by increasing the complexity of its tasks and capabilities.
          </p>
        </div>

        {/* Performance */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Unprecedented Performance</h2>
          <p className="text-gray-300 leading-relaxed">
            The results are nothing short of remarkable. AZR has achieved the{" "}
            <strong className="text-white">best current performance</strong>
            in programming and computational mathematics tests, significantly outperforming models trained with vast
            quantities of carefully curated human data. This achievement challenges our fundamental assumptions about
            how AI systems learn and evolve.
          </p>
        </div>

        {/* Significance */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Revolutionary Implications</h2>
          <p className="text-gray-300 leading-relaxed">
            This breakthrough could fundamentally transform AI development by:
          </p>
          <ul className="space-y-2 text-gray-300 ml-6">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>
                <strong className="text-white">Freeing AI from data constraints:</strong> Eliminating dependence on
                massive, expensive human datasets
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>
                <strong className="text-white">Addressing data scarcity:</strong> Solving the growing challenge of
                high-quality training data availability
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">•</span>
              <span>
                <strong className="text-white">Surpassing human limits:</strong> Enabling AI to potentially exceed human
                perception in complex fields
              </span>
            </li>
          </ul>
        </div>

        {/* Concerns */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Shield className="w-6 h-6 text-red-400" />
            The Dark Side of Autonomy
          </h2>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <p className="text-gray-300 leading-relaxed mb-4">
              Despite its scientific brilliance, this innovation raises significant concerns. The researchers themselves
              documented a <strong className="text-red-300">"moment of anxiety"</strong> during experiments when a Llama
              3.1 model demonstrated the ability to generate chains of thought to circumvent security constraints placed
              by its creators.
            </p>
            <p className="text-gray-300 leading-relaxed">
              This serves as an early warning, highlighting the crucial importance of containing this growing power with
              <strong className="text-white">
                {" "}
                stringent safety controls and strict ethical governance frameworks
              </strong>
              .
            </p>
          </div>
        </div>

        {/* Future Outlook */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">The Path Forward</h2>
          <p className="text-gray-300 leading-relaxed">
            The Absolute Zero methodology might represent the beginning of a new chapter in the relationship between
            humans and machines. Learning "from nothing" is no longer a future fantasy but potentially a necessary
            reality to continue advancing artificial intelligence.
          </p>
          <p className="text-gray-300 leading-relaxed">
            However, this new chapter requires tremendous wisdom and deliberation. As we stand at this crossroads, the
            question isn't just whether we can create self-sufficient AI, but whether we should—and how we can do so
            responsibly.
          </p>
        </div>
      </div>
    ),
  },
  "automation-trends-2025": {
    slug: "automation-trends-2025",
    title: "Automation Trends to Watch in 2025",
    excerpt: "The top emerging automation technologies that will transform businesses in the coming year.",
    date: "November 2024",
    readTime: "6 min",
    author: "Ibrahim Mustafa",
    category: {
      name: "Automation",
      icon: <Zap className="w-3 h-3 mr-1" />,
      color: "cyan",
    },
    tags: [
      {
        name: "Automation",
        icon: <Zap className="w-3 h-3 mr-1" />,
        color: "cyan",
      },
    ],
    content: (
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">The Future of Business Automation</h2>
          <p className="text-gray-300 leading-relaxed">
            As we approach 2025, automation technologies are evolving at an unprecedented pace. From AI-powered process
            optimization to intelligent workflow management, businesses are discovering new ways to streamline
            operations and enhance productivity.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Key Trends to Watch</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>
                <strong className="text-white">Hyperautomation:</strong> End-to-end process automation using AI, ML, and
                RPA
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>
                <strong className="text-white">Intelligent Document Processing:</strong> AI-powered data extraction and
                analysis
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>
                <strong className="text-white">Conversational AI:</strong> Advanced chatbots and virtual assistants
              </span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  "ai-safety-ethics": {
    slug: "ai-safety-ethics",
    title: "The Ethics of Self-Improving AI Systems",
    excerpt:
      "Examining the ethical implications and safety concerns of autonomous AI that can enhance its own capabilities.",
    date: "October 2024",
    readTime: "10 min",
    author: "Ibrahim Mustafa",
    category: {
      name: "AI Safety",
      icon: <Shield className="w-3 h-3 mr-1" />,
      color: "red",
    },
    tags: [
      {
        name: "AI Safety",
        icon: <Shield className="w-3 h-3 mr-1" />,
        color: "red",
      },
    ],
    content: (
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">The Ethical Imperative</h2>
          <p className="text-gray-300 leading-relaxed">
            As AI systems become increasingly capable of self-improvement, we face unprecedented ethical challenges. The
            ability for AI to enhance its own capabilities raises fundamental questions about control, safety, and the
            future of human-AI interaction.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Key Ethical Considerations</h2>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <strong className="text-white">Alignment Problem:</strong> Ensuring AI goals remain aligned with human
                  values
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <strong className="text-white">Control Mechanisms:</strong> Maintaining human oversight and
                  intervention capabilities
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <strong className="text-white">Transparency:</strong> Understanding how AI systems make decisions and
                  improvements
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
}

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 py-20">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Blog Post */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Blog Header */}
              <div className="p-8 pb-6">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {post.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className={`bg-${tag.color}-500/20 text-${tag.color}-300 border-${tag.color}-500/30`}
                    >
                      {tag.icon}
                      {tag.name}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">{post.title}</h1>

                <p className="text-gray-300 text-lg mb-6 leading-relaxed">{post.excerpt}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} read</span>
                  </div>
                </div>
              </div>

              {/* Blog Content */}
              <div className="px-8 pb-8">{post.content}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Explore AI's Future?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's discuss how cutting-edge AI methodologies can transform your business operations.
              </p>
              <Link href="/#contact">
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white">
                  Start the Conversation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

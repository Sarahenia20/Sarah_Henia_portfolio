"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { Send, Bot, User, Sparkles, RefreshCw } from "lucide-react"
import Image from "next/image"

// Predefined chat messages
const initialMessages = [
  {
    role: "assistant",
    content: "👋 Hi there! I'm AI Ibro, your virtual assistant. Ask me about Sarah's work experience or skills!",
  },
]

const experienceResponses = [
  {
    role: "assistant",
    content: `Sarah has over 7 years of experience in AI and automation:

**Lead AI Engineer** at TechInnovate (2021-Present)
• Developed custom NLP solutions for enterprise clients
• Led a team of 5 engineers across 12 successful projects
• Increased operational efficiency by 40% through automation

**Senior AI Developer** at DataSphere (2018-2021)
• Created recommendation engines with 28% higher engagement
• Optimized data processing pipelines, reducing costs by 45%
• Mentored junior developers and conducted workshops`,
  },
]

const skillsResponses = [
  {
    role: "assistant",
    content: `Sarah specializes in:

**AI Development** - Building intelligent systems with ML/DL
**Process Automation** - Creating efficient workflows
**Data Analysis** - Extracting actionable insights
**Voice AI** - Developing natural voice interfaces
**Chatbot Development** - Creating conversational experiences

She's proficient with tools like N8N, Airtable, GPT, Gemini, ElevenLabs, and various cloud platforms.`,
  },
]

const projectResponses = [
  {
    role: "assistant",
    content: `Sarah has built several innovative projects:

**TaskFlow** - Productivity app with gamification
**OneSoft** - All-in-one business platform
**HabitFlow** - Wellness and habit tracking app
**Film Fan Finder** - AI movie recommendation system
**AI Automation Consultant** - Intelligent workflow automation

Each project demonstrates her expertise in creating user-friendly, AI-powered solutions.`,
  },
]

const aiDevelopmentResponses = [
  {
    role: "assistant",
    content: `Excellent choice! Sarah's AI development services include:

**Machine Learning Models** - Custom ML solutions for your specific needs
**Neural Networks** - Deep learning implementations for complex problems
**Computer Vision** - Image and video analysis capabilities
**Natural Language Processing** - Text analysis and language understanding
**Predictive Analytics** - Forecasting and trend analysis systems

**Technologies Used:**
• Python, TensorFlow, PyTorch
• OpenAI GPT, Google Gemini
• AWS SageMaker, Azure ML
• Custom model training and deployment

Would you like to discuss a specific AI project for your business?`,
  },
]

const processAutomationResponses = [
  {
    role: "assistant",
    content: `Perfect! Sarah's process automation solutions cover:

**RPA Implementation** - Robotic Process Automation for repetitive tasks
**Workflow Optimization** - Streamlined business processes
**API Integration** - Connecting different systems seamlessly
**Task Automation** - Automated scheduling and execution
**Business Intelligence** - Automated reporting and analytics

**Tools & Platforms:**
• N8N for workflow automation
• Zapier and Make.com integrations
• Custom Python automation scripts
• Cloud-based automation solutions

What specific processes are you looking to automate?`,
  },
]

const dataAnalyticsResponses = [
  {
    role: "assistant",
    content: `Great choice! Sarah's data analytics services include:

**Predictive Analytics** - Forecasting future trends and outcomes
**Data Visualization** - Interactive dashboards and reports
**Business Intelligence** - Strategic insights from your data
**Performance Metrics** - KPI tracking and optimization
**Real-time Analytics** - Live data processing and monitoring

**Technologies:**
• Python (Pandas, NumPy, Scikit-learn)
• Tableau, Power BI for visualization
• SQL databases and data warehouses
• Apache Spark for big data processing

What kind of data insights are you looking to gain?`,
  },
]

const chatbotResponses = [
  {
    role: "assistant",
    content: `Great choice! Sarah's chatbot development services include:

**Natural Language Processing** - Advanced NLP for human-like conversations
**Multi-platform Integration** - Deploy across web, mobile, and messaging platforms
**Voice Integration** - Voice-enabled chatbots with speech recognition
**Custom Training** - Tailored to your business knowledge and tone
**Analytics Dashboard** - Track conversations and optimize performance

**Features:**
• 24/7 customer support automation
• Lead generation and qualification
• FAQ automation and knowledge base
• Integration with CRM and business systems

Would you like to discuss a specific chatbot project for your business?`,
  },
]

const customSoftwareResponses = [
  {
    role: "assistant",
    content: `Excellent! Sarah's custom software development services include:

**Full-stack Development** - Complete web and mobile applications
**API Development** - RESTful and GraphQL API creation
**System Integration** - Connecting existing systems and platforms
**Cloud Solutions** - Scalable cloud-native applications
**Database Design** - Efficient data architecture and management

**Technologies:**
• Frontend: React, Next.js, Vue.js, Flutter
• Backend: Node.js, Python, PostgreSQL, MongoDB
• Cloud: AWS, Azure, Google Cloud Platform
• DevOps: Docker, Kubernetes, CI/CD pipelines

What type of custom software solution are you looking to build?`,
  },
]

const dataManagementResponses = [
  {
    role: "assistant",
    content: `Excellent! Sarah's data management solutions cover:

**Database Architecture** - Scalable and efficient database design
**Data Pipeline Automation** - Streamlined data processing workflows
**Real-time Analytics** - Live data processing and insights
**Data Security** - Enterprise-grade security and compliance
**Cloud Integration** - AWS, Azure, and GCP data solutions
**Migration Services** - Seamless data migration and modernization

**Capabilities:**
• ETL/ELT pipeline development
• Data warehouse design and optimization
• Real-time streaming data processing
• Data governance and quality assurance

What specific data challenges are you looking to solve?`,
  },
]

// Rich text formatting function
const formatMessage = (content: string) => {
  // Convert **text** to bold
  let formatted = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

  // Convert bullet points to proper list items
  formatted = formatted.replace(/^• (.+)$/gm, "<li>$1</li>")

  // Wrap consecutive list items in ul tags
  formatted = formatted.replace(/(<li>.*<\/li>\s*)+/gs, "<ul>$&</ul>")

  // Convert line breaks to proper spacing
  formatted = formatted.replace(/\n\n/g, "<br><br>")
  formatted = formatted.replace(/\n/g, "<br>")

  return formatted
}

export default function AIChatSection() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.1 })
  const controls = useAnimation()

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Listen for service click events
  useEffect(() => {
    const handleServiceMessage = (event: any) => {
      const { message } = event.detail
      if (message) {
        // Add user message
        const userMessage = { role: "user", content: message }
        setMessages((prev) => [...prev, userMessage])
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
          let response
          const lowercaseMessage = message.toLowerCase()

          if (lowercaseMessage.includes("ai development")) {
            response = aiDevelopmentResponses[0]
          } else if (lowercaseMessage.includes("process automation")) {
            response = processAutomationResponses[0]
          } else if (lowercaseMessage.includes("data analytics")) {
            response = dataAnalyticsResponses[0]
          } else if (lowercaseMessage.includes("chatbot")) {
            response = chatbotResponses[0]
          } else if (lowercaseMessage.includes("custom software")) {
            response = customSoftwareResponses[0]
          } else if (lowercaseMessage.includes("data management")) {
            response = dataManagementResponses[0]
          } else {
            response = {
              role: "assistant",
              content:
                "Thank you for your interest! I'd be happy to discuss this service with you. What specific requirements do you have?",
            }
          }

          setMessages((prev) => [...prev, response])
          setIsTyping(false)
        }, 1500)
      }
    }

    window.addEventListener("triggerChatMessage", handleServiceMessage)
    return () => window.removeEventListener("triggerChatMessage", handleServiceMessage)
  }, [])

  const scrollToBottom = () => {
    // Only scroll within the chat container, not the entire page
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Focus back on input after submission
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Simulate AI response
    setTimeout(() => {
      let response
      const lowercaseInput = input.toLowerCase()

      if (lowercaseInput.includes("experience") || lowercaseInput.includes("work") || lowercaseInput.includes("job")) {
        response = experienceResponses[0]
      } else if (lowercaseInput.includes("skill") || lowercaseInput.includes("know") || lowercaseInput.includes("do")) {
        response = skillsResponses[0]
      } else if (
        lowercaseInput.includes("project") ||
        lowercaseInput.includes("portfolio") ||
        lowercaseInput.includes("build")
      ) {
        response = projectResponses[0]
      } else if (lowercaseInput.includes("ai development") || lowercaseInput.includes("machine learning")) {
        response = aiDevelopmentResponses[0]
      } else if (lowercaseInput.includes("process automation") || lowercaseInput.includes("workflow")) {
        response = processAutomationResponses[0]
      } else if (lowercaseInput.includes("data analytics") || lowercaseInput.includes("analytics")) {
        response = dataAnalyticsResponses[0]
      } else if (lowercaseInput.includes("chatbot")) {
        response = chatbotResponses[0]
      } else if (lowercaseInput.includes("custom software") || lowercaseInput.includes("software development")) {
        response = customSoftwareResponses[0]
      } else if (lowercaseInput.includes("data management") || lowercaseInput.includes("database")) {
        response = dataManagementResponses[0]
      } else {
        response = {
          role: "assistant",
          content:
            "I can tell you about Sarah's work experience, skills, projects, or specific services like AI development, process automation, data analytics, chatbot development, custom software, and data management. What would you like to know?",
        }
      }

      setMessages((prev) => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    // Simulate user clicking a quick question
    const userMessage = { role: "user", content: question }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response

      if (question.includes("experience")) {
        response = experienceResponses[0]
      } else if (question.includes("skills")) {
        response = skillsResponses[0]
      } else if (question.includes("projects")) {
        response = projectResponses[0]
      }

      if (response) {
        setMessages((prev) => [...prev, response])
      }
      setIsTyping(false)
    }, 1500)
  }

  const resetChat = () => {
    setMessages(initialMessages)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const chatElementVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section id="experience" className="py-20 md:py-32 relative bg-gradient-to-b from-card/50 to-background">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-12"
          style={{ opacity: 1 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Chat with <span className="text-gradient">AI Ibro</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-300 max-w-2xl mx-auto">
            Ask about my work experience, skills, projects, or specific services
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4"
          ></motion.div>
        </motion.div>

        <div className="max-w-3xl mx-auto" ref={chatContainerRef}>
          <motion.div
            className="glass rounded-2xl overflow-hidden chat-element"
            variants={chatElementVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Chat header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-card/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">AI Ibro</h3>
                  <p className="text-xs text-gray-400">Virtual Assistant</p>
                </div>
              </div>
              <button
                onClick={resetChat}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Reset chat"
                type="button"
              >
                <RefreshCw size={16} />
              </button>
            </div>

            {/* Chat messages - Fixed height container with internal scrolling */}
            <div
              ref={chatMessagesRef}
              className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.role === "user" ? "bg-primary/20 text-white" : "bg-card/50 text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? (
                        <Bot size={16} className="text-primary" />
                      ) : (
                        <User size={16} className="text-secondary" />
                      )}
                      <span className="text-xs font-medium">{message.role === "assistant" ? "AI Ibro" : "You"}</span>
                    </div>
                    <div
                      className="text-sm rich-text"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-[80%] rounded-2xl p-3 bg-card/50 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-primary" />
                      <span className="text-xs font-medium">AI Ibro</span>
                    </div>
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></span>
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="p-3 border-t border-white/10 flex gap-2 overflow-x-auto hide-scrollbar">
              <button
                type="button"
                onClick={() => handleQuickQuestion("Tell me about Sarah's work experience")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Work experience
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("What are Sarah's skills?")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Skills
              </button>
              <button
                type="button"
                onClick={() => handleQuickQuestion("Tell me about Sarah's projects")}
                className="px-3 py-1 text-xs rounded-full bg-card/50 border border-white/10 whitespace-nowrap hover:bg-primary/20 transition-colors"
              >
                Projects
              </button>
            </div>

            {/* Chat input */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my experience, skills, or projects..."
                  className="flex-1 bg-card/50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={!input.trim()}
                >
                  <Send size={18} className="text-white" />
                </button>
              </form>
            </div>
          </motion.div>

          {/* AI Assistant image */}
          <motion.div
            className="mt-8 flex justify-center chat-element"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 glow-effect">
                <Image
                  src="/images/sarah-avatar.jpg"
                  alt="Sarah Henia"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 relative">
      <div className="container mx-auto px-4">
        <div className="glass p-8 rounded-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 text-gradient">Ibrahim M.</h3>
              <p className="text-gray-400 mb-4 max-w-xs">
                AI Automation Expert transforming ideas into innovative solutions.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="Github"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-card/50 hover:bg-card transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-400 hover:text-white transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-400 hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-gray-400 hover:text-white transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">AI Development</li>
                <li className="text-gray-400">Process Automation</li>
                <li className="text-gray-400">Data Analysis</li>
                <li className="text-gray-400">Software Development</li>
                <li className="text-gray-400">Chatbot Development</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>&copy; {currentYear} Sarah Henia. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

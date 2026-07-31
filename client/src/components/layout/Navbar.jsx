import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 group-hover:border-indigo-500/60 transition-colors">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            HiveMind <span className="text-indigo-400">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Features
          </a>
          <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            About
          </a>
        </nav>

        {/* Get Started Action */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/register"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-105"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col gap-3"
          >
            <a href="#features" className="text-sm font-medium text-slate-300 hover:text-white py-1">
              Features
            </a>
            <a href="#about" className="text-sm font-medium text-slate-300 hover:text-white py-1">
              About
            </a>
            <Link
              to="/register"
              className="text-center text-sm py-2.5 rounded-xl bg-indigo-600 text-white font-semibold mt-2"
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

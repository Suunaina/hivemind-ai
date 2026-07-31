import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import AgentIllustration from './AgentIllustration';

export default function HeroSection() {
  return (
    <section className="relative px-6 pt-16 pb-20 max-w-7xl mx-auto text-center flex flex-col items-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-semibold text-indigo-300 border border-indigo-500/30 mb-8"
      >
        <span>✨ Multi-Agent AI Workspace</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
      >
        <span className="bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
          HiveMind AI
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-normal"
      >
        An AI workspace where specialized agents collaborate to solve complex tasks.
      </motion.p>

      {/* Hero CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-4"
      >
        <Link
          to="/register"
          className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href="#features"
          className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold glass-panel hover:bg-slate-800/80 text-slate-300 hover:text-white transition-all border border-slate-700/60"
        >
          <Compass className="w-4 h-4 text-indigo-400" />
          Explore Features
        </a>
      </motion.div>

      {/* 4 Connected Agents Visualizer */}
      <AgentIllustration />
    </section>
  );
}

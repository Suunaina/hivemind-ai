import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedBackground from '../landing/AnimatedBackground';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center px-4 py-12 selection:bg-indigo-500/30 selection:text-indigo-200">
      <AnimatedBackground />

      {/* Top Bar Back Link */}
      <div className="absolute top-6 left-6 flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-panel text-xs font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-all group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-3xl border border-slate-800/90 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-8 relative z-10">
            <Link to="/" className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/30 mb-4 hover:scale-105 transition-transform">
              <Bot className="w-7 h-7" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
}

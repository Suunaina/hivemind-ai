import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeroBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 shadow-lg shadow-indigo-500/10 mb-8 hover:border-indigo-500/60 transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold uppercase tracking-wider">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        New Engine
      </div>
      <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
        Gemini 2.5 Multi-Agent Swarm Orchestrator
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
    </motion.div>
  );
}

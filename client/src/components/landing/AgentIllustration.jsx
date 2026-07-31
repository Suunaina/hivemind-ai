import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Code, CheckCircle, Sparkles } from 'lucide-react';

const agents = [
  {
    name: 'Planner',
    role: 'Decomposes Goals',
    icon: Brain,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30'
  },
  {
    name: 'Researcher',
    role: 'Fetches Knowledge',
    icon: Search,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/30'
  },
  {
    name: 'Developer',
    role: 'Generates Code',
    icon: Code,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/30'
  },
  {
    name: 'Reviewer',
    role: 'Audits & Verifies',
    icon: CheckCircle,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/30'
  }
];

export default function AgentIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative w-full max-w-4xl mx-auto mt-14 p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl overflow-hidden"
    >
      {/* Visual Accent Glow */}
      <div className="absolute inset-x-0 -top-24 h-48 bg-indigo-500/10 blur-3xl rounded-full" />

      {/* Central Hub Label */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Active Swarm Network
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500">4 Agents Connected</span>
      </div>

      {/* 4 Connected Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {agents.map((agent) => {
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.name}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`p-5 rounded-2xl glass-card border ${agent.bg} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${agent.bg} ${agent.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <h3 className="font-bold text-base text-slate-100">{agent.name} Agent</h3>
                <p className="text-xs text-slate-400 mt-1">{agent.role}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Status</span>
                <span className="text-emerald-400 font-medium">Ready</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

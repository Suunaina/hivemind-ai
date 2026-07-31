import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Code, ShieldCheck, Sparkles } from 'lucide-react';

const aiTeam = [
  {
    name: 'Planner',
    description: 'Architects project blueprints and step-by-step strategy.',
    icon: Brain,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30'
  },
  {
    name: 'Researcher',
    description: 'Gathers technical docs, benchmarks, and API context.',
    icon: Search,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/30'
  },
  {
    name: 'Developer',
    description: 'Produces clean, production-ready implementation code.',
    icon: Code,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/30'
  },
  {
    name: 'Reviewer',
    description: 'Audits security, syntax, and performance optimization.',
    icon: ShieldCheck,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/30'
  }
];

export default function AITeamSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mb-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">AI Agent Swarm</h2>
          <p className="text-xs text-slate-400 mt-0.5">Specialized autonomous virtual agents</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          4 Agents Active
        </div>
      </div>

      {/* AI Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {aiTeam.map((agent) => {
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.name}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`p-5 rounded-2xl glass-card border ${agent.bg} hover:shadow-lg transition-all flex flex-col justify-between`}
            >
              <div>
                {/* Icon & Online Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${agent.bg} ${agent.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Online
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-100 mb-1">{agent.name} Agent</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{agent.description}</p>
              </div>

              {/* Tiny Gemini Badge */}
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Model</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-medium text-purple-300">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  Gemini
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

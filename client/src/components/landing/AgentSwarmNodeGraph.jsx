import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Search, Code2, CheckCircle2, Cpu, Zap, Activity, Terminal } from 'lucide-react';

export default function AgentSwarmNodeGraph() {
  const agents = [
    {
      id: 'planner',
      name: '1. Planner Agent',
      icon: BrainCircuit,
      color: 'from-blue-500 to-indigo-500',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/40',
      glow: 'shadow-blue-500/20',
      badge: 'ARCHITECTING',
      outputSnippet: 'Deconstructed prompt into 4 sub-tasks & validation specs.'
    },
    {
      id: 'researcher',
      name: '2. Researcher Agent',
      icon: Search,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      glow: 'shadow-amber-500/20',
      badge: 'ANALYZING',
      outputSnippet: 'Selected REST API structure & JWT security parameters.'
    },
    {
      id: 'developer',
      name: '3. Developer Agent',
      icon: Code2,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      glow: 'shadow-emerald-500/20',
      badge: 'CODING',
      outputSnippet: 'Generated server/src/routes/authRoutes.js & Express handler.'
    },
    {
      id: 'reviewer',
      name: '4. Reviewer Agent',
      icon: CheckCircle2,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/40',
      glow: 'shadow-purple-500/20',
      badge: 'AUDITING',
      outputSnippet: 'Verified syntax, zero lint vulnerabilities, code approved.'
    }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-14 p-6 sm:p-10 rounded-3xl glass-panel border border-slate-800/90 shadow-2xl overflow-hidden group">
      
      {/* Top Header Bar of Illustration */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-2 pl-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            hivemind-orchestrator-v1.0.0
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>4 AGENTS ACTIVE & COLLABORATING</span>
        </div>
      </div>

      {/* Grid of 4 Connected Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -4 }}
              className={`relative p-5 rounded-2xl bg-slate-900/70 backdrop-blur-xl border ${agent.borderColor} shadow-xl ${agent.glow} transition-all duration-300 flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${agent.color} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm">{agent.name}</h4>
                    <span className={`text-[10px] font-mono tracking-wider font-semibold ${agent.textColor}`}>
                      GEMINI 2.5 FLASH
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[10px] font-mono text-slate-300 font-semibold flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${agent.textColor} bg-current animate-ping`} />
                  {agent.badge}
                </span>
              </div>

              {/* Streaming Output Box */}
              <div className="mt-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-slate-300 flex items-start gap-2.5">
                <Zap className={`w-4 h-4 ${agent.textColor} shrink-0 mt-0.5`} />
                <p className="line-clamp-2 leading-relaxed">{agent.outputSnippet}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Central Swarm Hub Graphic */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          <span>Shared Context Accumulator: Active</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            Parallel Threading
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400">Zero Code-Duplication</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Clock, Sparkles, Brain, Search, Code, ShieldCheck } from 'lucide-react';

export default function AILoadingTimeline({ prompt }) {
  const steps = [
    { title: 'Reading project prompt', agent: 'Input Handler', icon: Sparkles },
    { title: 'Understanding requirements & constraints', agent: 'Planner Agent', icon: Brain },
    { title: 'Designing system architecture', agent: 'Researcher Agent', icon: Search },
    { title: 'Building learning roadmap & concept cards', agent: 'Developer Agent', icon: Code },
    { title: 'Preparing implementation phases & code snippets', agent: 'Blueprint Engine', icon: Sparkles },
    { title: 'Performing final AI review & security checks', agent: 'Reviewer Agent', icon: ShieldCheck }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden space-y-6 max-w-xl mx-auto">
      {/* Background Lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Generating AI Blueprint
            </h3>
            <p className="text-xs text-slate-400 font-mono line-clamp-1">
              "{prompt || 'Software Project'}"
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
          {progressPercentage}%
        </span>
      </div>

      {/* Progress Line */}
      <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5 relative z-10">
        <motion.div
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 shadow-lg shadow-cyan-500/30"
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3 relative z-10">
        {steps.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isUpcoming = idx > currentStepIndex;
          const IconComp = step.icon;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/30'
                  : isDone
                  ? 'bg-slate-950/60 border-slate-800/80 opacity-80'
                  : 'bg-slate-950/40 border-slate-800/40 opacity-40'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Status Indicator */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isCurrent
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                      : 'bg-slate-900 text-slate-600 border border-slate-800'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>

                <div>
                  <div
                    className={`text-xs font-bold ${
                      isCurrent
                        ? 'text-white'
                        : isDone
                        ? 'text-slate-300'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Agent: {step.agent}
                  </div>
                </div>
              </div>

              <div className="text-xs">
                {isDone && <span className="text-emerald-400 font-mono text-[10px]">Complete</span>}
                {isCurrent && <span className="text-cyan-400 font-mono text-[10px] animate-pulse">In Progress...</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, Code2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

export default function LearnStage({
  learnConceptCards,
  expandedCards,
  toggleExpandCard,
  viewedCards,
  isStage2Complete,
  setActiveStage
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stage Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
          📚
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Stage 2: Learn the Concepts
          </h2>
          <p className="text-xs text-slate-400">
            Master core technologies, essential patterns, and avoid common beginner traps before building.
          </p>
        </div>
      </div>

      {/* 4 Learning Concept Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learnConceptCards.map((card, idx) => {
          const IconComp = card.IconComponent;
          const isExpanded = !!expandedCards[card.id];

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/90 shadow-2xl flex flex-col justify-between hover:border-slate-700/80 transition-all group"
            >
              {/* Card Top Row */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl ${card.accentBg} ${card.accentBorder} border flex items-center justify-center ${card.iconColor} shrink-0`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                        {card.tech}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">
                        Prerequisite Concept #{idx + 1}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-medium text-amber-300 shrink-0">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {card.readTime}
                  </span>
                </div>

                {/* Purpose */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">
                    Purpose
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {card.purpose}
                  </p>
                </div>

                {/* Why do we need it? */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                    Why Do We Need It?
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.whyNeeded}
                  </p>
                </div>

                {/* Common Beginner Mistake */}
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Common Beginner Mistake
                  </div>
                  <p className="text-xs text-red-200/90 leading-relaxed font-sans">
                    {card.beginnerMistake}
                  </p>
                </div>

                {/* Tiny Code Example */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-purple-400" />
                    Tiny Code Example
                  </div>
                  <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto leading-relaxed">
                    <code>{card.tinyExample}</code>
                  </pre>
                </div>
              </div>

              {/* Card Bottom */}
              <div className="pt-4 mt-5 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => toggleExpandCard(card.id)}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                >
                  <span>{isExpanded ? 'Hide Advanced Explanation' : 'Learn More (Deep Dive)'}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-amber-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2 text-xs text-slate-300 leading-relaxed"
                    >
                      <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                        Advanced Concept Notes
                      </div>
                      <p>{card.deepDive}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stage 2 Completion Banner */}
      <AnimatePresence>
        {isStage2Complete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-7 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-slate-950 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-2xl shrink-0">
                🎉
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Great job!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  You're ready to begin building your project. You've explored every concept card.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveStage('build');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer"
            >
              <span>Continue to Build</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isStage2Complete && (
        <div className="flex justify-end pt-4">
          <button
            type="button"
            disabled
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 opacity-50 cursor-not-allowed"
          >
            <span>Continue to Build ({viewedCards.size} / {learnConceptCards.length} Card Insights Unlocked)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

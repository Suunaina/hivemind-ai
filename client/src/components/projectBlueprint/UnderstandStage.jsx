import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Brain,
  CheckCircle2,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ArchitectureDiagram from './ArchitectureDiagram';

export default function UnderstandStage({
  task,
  understandData,
  milestones,
  toggleMilestone,
  isArchitectureOpen,
  setIsArchitectureOpen,
  isGlossaryOpen,
  setIsGlossaryOpen,
  setActiveStage
}) {
  const completedMilestonesCount = milestones.filter((m) => m.completed).length;

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
        <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
          🧩
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Stage 1: Understand the Problem
          </h2>
          <p className="text-xs text-slate-400">
            Grasp the core objective, explore task requirements, and prepare your mental model.
          </p>
        </div>
      </div>

      {/* Objective Summary Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <Compass className="w-4 h-4" />
          Objective Summary
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-sans">
          {understandData.summary}
        </p>
      </div>

      {/* Beginner-Friendly Explanation Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Beginner-Friendly Concept Breakdown
            </h3>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-semibold uppercase tracking-wider">
            Educational Scaffolding
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-sm text-slate-300 leading-relaxed overflow-x-auto">
          {task.plannerOutput ? (
            <div className="prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-headings:text-slate-100 prose-headings:font-bold prose-p:text-slate-300 prose-a:text-cyan-400 prose-code:text-cyan-300 prose-code:bg-cyan-950/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-strong:text-white">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {task.plannerOutput}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">
              Break down the task into simple steps: 1) Identify input parameters, 2) Process logic securely, 3) Return expected output.
            </p>
          )}
        </div>
      </div>

      {/* Three Milestone Checklist Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Milestone Readiness Checklist
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Check off each step as you prepare your understanding before building.
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-semibold">
            {completedMilestonesCount} of {milestones.length} Completed
          </div>
        </div>

        <div className="space-y-3">
          {milestones.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => toggleMilestone(m.id)}
              className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border transition-all text-left group active:scale-[0.99] ${
                m.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                  m.completed
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'border-2 border-slate-700 group-hover:border-emerald-400'
                }`}
              >
                {m.completed && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
              <span className={`text-sm font-medium ${m.completed ? 'line-through opacity-80' : 'text-slate-200'}`}>
                {m.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* EXPANDABLE SECTION 1: SYSTEM ARCHITECTURE */}
      <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsArchitectureOpen((prev) => !prev)}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📐</span>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                View System Architecture
              </h3>
              <p className="text-xs text-slate-400">
                Explore the high-level data flow and component layout.
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
            {isArchitectureOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        <AnimatePresence>
          {isArchitectureOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-800/80 p-6 sm:p-8 bg-slate-950/60"
            >
              <ArchitectureDiagram task={task} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* EXPANDABLE SECTION 2: FULL GLOSSARY */}
      <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsGlossaryOpen((prev) => !prev)}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">📖</span>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                View Full Glossary
              </h3>
              <p className="text-xs text-slate-400">
                Reference key Computer Science terms and definitions.
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
            {isGlossaryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        <AnimatePresence>
          {isGlossaryOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-slate-800/80 p-6 sm:p-8 bg-slate-950/60"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {understandData.glossary.map((item, idx) => (
                  <div
                    key={item.term || idx}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5"
                  >
                    <div className="text-xs font-bold text-purple-300 font-mono">
                      {item.term}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.def}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue to Next Stage CTA */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => {
            if (milestones && toggleMilestone) {
              milestones.forEach((m) => {
                if (!m.completed) toggleMilestone(m.id);
              });
            }
            if (setActiveStage) {
              setActiveStage('learn');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Learn</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

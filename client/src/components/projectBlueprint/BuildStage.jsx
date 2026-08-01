import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  CheckSquare,
  Clock,
  Check,
  FolderGit2,
  FileText,
  Code2,
  Play,
  ArrowRight
} from 'lucide-react';

export default function BuildStage({
  buildPhasesData,
  completedPhases,
  togglePhaseComplete,
  completedBuildPhasesCount,
  totalBuildPhases,
  buildProgressPercentage,
  remainingBuildTimeMins,
  isBuildComplete,
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
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
          🏗
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Stage 3: Build Your Project
          </h2>
          <p className="text-xs text-slate-400">
            Follow the 5-phase guided implementation roadmap to bring your solution to life step-by-step.
          </p>
        </div>
      </div>

      {/* Build Progress Header Summary Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Build Progress
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
            {buildProgressPercentage}% Completed
          </span>
        </div>

        {/* Build Progress Bar */}
        <div className="h-3 rounded-full bg-slate-950/80 border border-slate-800/90 overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${buildProgressPercentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 shadow-md shadow-emerald-500/20"
          />
        </div>

        {/* Metrics Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400">Completed Phases: </span>
              <strong className="text-white font-mono">
                {completedBuildPhasesCount} of {totalBuildPhases}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400">Est. Remaining Time: </span>
              <strong className="text-white font-mono">~{remainingBuildTimeMins} Mins Remaining</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Build Phase Cards Vertical Timeline */}
      <div className="relative space-y-6 pl-4 sm:pl-8">
        {/* Timeline Vertical Guide Line */}
        <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-slate-800 -translate-x-1/2 pointer-events-none" />

        {buildPhasesData.map((phase, idx) => {
          const isCompleted = !!completedPhases[phase.id];

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.09 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline Node Badge Icon */}
              <div
                className={`absolute left-0 top-6 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono transition-all -translate-x-1/2 z-10 ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'bg-slate-900 border-cyan-500/50 text-cyan-300 ring-2 ring-cyan-500/20'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : phase.phaseNumber}
              </div>

              {/* Phase Glassmorphism Card */}
              <div
                className={`glass-panel p-6 sm:p-7 rounded-3xl border transition-all space-y-5 ${
                  isCompleted
                    ? 'bg-emerald-950/10 border-emerald-500/30 shadow-xl'
                    : 'border-slate-800 hover:border-slate-700 shadow-2xl'
                }`}
              >
                {/* Phase Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                        Phase {phase.phaseNumber} of 5
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${phase.difficultyColor}`}>
                        {phase.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {phase.title}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {phase.estTime}
                  </span>
                </div>

                {/* Objective */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Phase Objective
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {phase.objective}
                  </p>
                </div>

                {/* Files Involved */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    Files Involved
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.files.map((file) => (
                      <span
                        key={file}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-purple-400" />
                        {file}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Snippet */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    Snippet / Implementation Reference
                  </div>
                  <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                    <code>{phase.snippet}</code>
                  </pre>
                </div>

                {/* Expected Outcome */}
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" />
                    Expected Outcome
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {phase.outcome}
                  </p>
                </div>

                {/* Phase Completion Checkbox */}
                <div className="pt-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => togglePhaseComplete(phase.id)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all group active:scale-[0.99] ${
                      isCompleted
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          isCompleted
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'border-2 border-slate-700 group-hover:border-emerald-400'
                        }`}
                      >
                        {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-bold">
                        {isCompleted ? 'Phase Completed!' : 'Mark Phase as Completed'}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {isCompleted ? '✓ Verified' : 'Click to complete'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SPRINT 3 BUILD COMPLETION BANNER */}
      <AnimatePresence>
        {isBuildComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.4 }}
            className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-slate-950 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-2xl shrink-0">
                🎉
              </div>
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Build Complete!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your project is ready for deployment. You've completed all 5 implementation phases!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveStage('improve');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer"
            >
              <span>Continue to Improve</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isBuildComplete && (
        <div className="flex justify-end pt-4">
          <button
            type="button"
            disabled
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 opacity-50 cursor-not-allowed"
          >
            <span>Continue to Improve ({completedBuildPhasesCount} / {totalBuildPhases} Phases Complete)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}

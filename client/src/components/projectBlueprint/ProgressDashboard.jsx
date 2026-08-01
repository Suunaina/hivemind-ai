import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, CheckCircle2, Lock, BookOpen, Clock, Award } from 'lucide-react';

export default function ProgressDashboard({
  progressPercentage,
  activeStage,
  completedMilestonesCount,
  isStage2Complete,
  isBuildComplete
}) {
  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* 1. Animated Project Progress Bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Project Progress
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
              {progressPercentage}%
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Stage {activeStage === 'understand' ? 1 : activeStage === 'learn' ? 2 : activeStage === 'build' ? 3 : 4} of 4
            </span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="h-3 rounded-full bg-slate-950/80 border border-slate-800/90 overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 shadow-md shadow-cyan-500/20"
          />
        </div>
      </div>

      {/* 2. Stage Tracker */}
      <div className="pt-2 border-t border-slate-800/80 space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Stage Progress Tracker
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {[
            {
              name: '1. Understand',
              completed: activeStage === 'learn' || activeStage === 'build' || activeStage === 'improve' || completedMilestonesCount === 3,
              current: activeStage === 'understand'
            },
            {
              name: '2. Learn',
              completed: activeStage === 'build' || activeStage === 'improve' || isStage2Complete,
              current: activeStage === 'learn'
            },
            {
              name: '3. Build',
              completed: activeStage === 'improve' || isBuildComplete,
              current: activeStage === 'build'
            },
            {
              name: '4. Improve',
              completed: false,
              current: activeStage === 'improve'
            }
          ].map((s) => (
            <div
              key={s.name}
              className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium ${
                s.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : s.current
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200 ring-1 ring-cyan-500/30 shadow-sm shadow-cyan-500/20'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              {s.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : s.current ? (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <span className="truncate">{s.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Learning Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-800/80">
        {/* Stat 1 */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Concepts
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              4 Prerequisite Cards
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Estimated Time
            </div>
            <div className="text-xs font-bold text-white mt-0.5">
              9 Mins Total Read
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Completion
            </div>
            <div className="text-xs font-bold text-emerald-300 mt-0.5">
              {progressPercentage}% Mastered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Sparkles, Clock, BarChart2, Code2, Award, CheckCircle2 } from 'lucide-react';

export default function ProjectSnapshot({ task, snapshotData, formatDate }) {
  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Title & Badge Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Project Blueprint
          </span>

          {/* Learning Mode Badge */}
          {task.experienceLevel && (
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono border flex items-center gap-1.5 ${
              task.experienceLevel === 'Beginner'
                ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                : task.experienceLevel === 'Advanced'
                ? 'text-red-400 bg-red-500/10 border-red-500/20'
                : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
            }`}>
              <span className="text-slate-400 font-sans font-normal">Learning Mode:</span>
              <span>
                {task.experienceLevel === 'Beginner' && '🟢 Beginner'}
                {task.experienceLevel === 'Intermediate' && '🟡 Intermediate'}
                {task.experienceLevel === 'Advanced' && '🔴 Advanced'}
              </span>
            </span>
          )}

          <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
            ID: {task._id}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Created: {formatDate(task.createdAt)}</span>
        </div>
      </div>

      {/* Project Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-6">
        {task.prompt}
      </h1>

      {/* Metadata Snapshot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
        {/* Difficulty */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Difficulty
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className={`text-xs font-bold ${snapshotData.difficultyBadgeColor ? snapshotData.difficultyBadgeColor.split(' ')[0] : 'text-amber-300'}`}>
                {snapshotData.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Estimated Time
            </div>
            <div className="text-xs font-bold text-slate-200 mt-0.5">
              {snapshotData.estimatedTime}
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Prerequisites
            </div>
            <div className="flex flex-wrap gap-1.5">
              {snapshotData.prerequisites.map((chip) => (
                <span
                  key={chip}
                  className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-purple-300"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* By the end you'll be able to... */}
      <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          By the end you'll be able to:
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
          {snapshotData.outcomes.slice(0, 3).map((outcome, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

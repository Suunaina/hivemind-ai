import React from 'react';
import { Trophy } from 'lucide-react';

export default function DeveloperReportCard() {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2.5">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Developer Report Card
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono font-bold">
          Overall Readiness: 97% Production Ready
        </span>
      </div>

      {/* Score Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">1. Planning</div>
          <div className="text-xl font-extrabold text-cyan-300 font-mono">98 / 100</div>
          <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade A+</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">2. Learning</div>
          <div className="text-xl font-extrabold text-amber-300 font-mono">95 / 100</div>
          <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade A</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">3. Implementation</div>
          <div className="text-xl font-extrabold text-purple-300 font-mono">96 / 100</div>
          <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade A+</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">4. Professional Practices</div>
          <div className="text-xl font-extrabold text-emerald-300 font-mono">100 / 100</div>
          <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade S (Master)</span>
        </div>
      </div>
    </div>
  );
}

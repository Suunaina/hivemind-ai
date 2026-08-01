import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
  ZapOff,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import CompletionBanner from './CompletionBanner';

export default function ImproveStage({
  improvementCards,
  completedImproveCards,
  toggleImproveCardComplete,
  expandedTips,
  toggleTipExpand,
  deployChecklist,
  toggleDeployChecklistItem,
  completedImproveCount,
  totalImproveCards,
  improveProgressPercentage,
  progressPercentage,
  isAllImproveCompleted
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
        <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl">
          🚀
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Stage 4: Professional Polish
          </h2>
          <p className="text-xs text-slate-400">
            Learn how senior software engineers optimize, secure, test, and audit projects before production deployment.
          </p>
        </div>
      </div>

      {/* Professional Polish Progress Header Card */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Professional Polish Progress
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/20">
            {improveProgressPercentage}% Polish Completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-slate-950/80 border border-slate-800/90 overflow-hidden p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${improveProgressPercentage}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-400 shadow-md shadow-purple-500/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="text-slate-400">Completed Improvements: </span>
              <strong className="text-white font-mono">
                {completedImproveCount} of {totalImproveCards} Cards
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
            <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400">Overall Project Readiness: </span>
              <strong className="text-emerald-300 font-mono">
                {isAllImproveCompleted ? '100% Production Ready' : `${progressPercentage}% In Progress`}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* 5 IMPROVEMENT CARDS */}
      <div className="space-y-6">
        {improvementCards.map((card, idx) => {
          const isCompleted = !!completedImproveCards[card.id];
          const isExpanded = !!expandedTips[card.id];
          const IconComponent = card.IconComponent || Zap;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${card.accentBg} border ${card.accentBorder} flex items-center justify-center ${card.iconColor} shrink-0`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {idx + 1}. {card.title}
                    </h3>
                    <p className="text-xs text-slate-400">{card.category || 'Quality Audit'}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full ${card.accentBg} ${card.iconColor} border ${card.accentBorder} text-xs font-mono font-semibold`}>
                  {card.category || 'Quality Audit'}
                </span>
              </div>

              {/* Why Needed */}
              <div className="space-y-1.5">
                <div className={`text-[11px] font-bold uppercase tracking-wider ${card.iconColor}`}>
                  Why This Improvement Matters
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {card.whyNeeded}
                </p>
              </div>

              {/* Tips Array */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Optimization Checklist & Guidance</div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
                  {card.tips.map((tip, tipIdx) => (
                    <li key={tipIdx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                      <strong className="text-cyan-300 block font-mono">Tip {tipIdx + 1}</strong>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Beginner Mistake */}
              <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <ZapOff className="w-3.5 h-3.5" />
                  Common Beginner Mistake
                </div>
                <p className="text-xs text-red-200/90 leading-relaxed font-sans">
                  {card.beginnerMistake}
                </p>
              </div>

              {/* Professional Tip Accordion */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => toggleTipExpand(card.id)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                >
                  <span>💡 Senior Engineer Pro Tip (Expand)</span>
                  {isExpanded ? <ChevronUp className={`w-4 h-4 ${card.iconColor}`} /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans"
                    >
                      "{card.proTip}"
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Completion Checkbox */}
              <button
                type="button"
                onClick={() => toggleImproveCardComplete(card.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isCompleted ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700'}`}>
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-xs font-bold">
                    {isCompleted ? `${card.title} Verified` : `Mark ${card.title} as Verified`}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {isCompleted ? '✓ Completed' : 'Click to complete'}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* CELEBRATION SECTION & DEVELOPER REPORT CARD */}
      <CompletionBanner isAllImproveCompleted={isAllImproveCompleted} />

      {/* Finish Blueprint CTA */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          disabled={!isAllImproveCompleted}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <span>{isAllImproveCompleted ? 'Finish Blueprint 🎉' : `Finish Blueprint (${completedImproveCount} / ${totalImproveCards} Verified)`}</span>
        </button>
      </div>
    </motion.div>
  );
}

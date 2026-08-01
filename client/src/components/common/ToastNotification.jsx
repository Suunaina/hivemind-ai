import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, Copy, Trophy, Check, X } from 'lucide-react';

export default function ToastNotification({
  isOpen,
  onClose,
  type = 'success', // 'success', 'copied', 'achievement', 'generated'
  title = 'Action Completed',
  message = 'Operation finished successfully.'
}) {
  if (!isOpen) return null;

  const getConfig = () => {
    switch (type) {
      case 'copied':
        return {
          icon: Copy,
          badge: 'Copied to Clipboard',
          color: 'text-cyan-400',
          glow: 'from-cyan-500/20 to-blue-500/5',
          border: 'border-cyan-500/40'
        };
      case 'achievement':
        return {
          icon: Trophy,
          badge: 'Achievement Unlocked',
          color: 'text-amber-400',
          glow: 'from-amber-500/20 to-yellow-500/5',
          border: 'border-amber-500/40'
        };
      case 'generated':
        return {
          icon: Sparkles,
          badge: 'Blueprint Ready',
          color: 'text-purple-400',
          glow: 'from-purple-500/20 to-cyan-500/5',
          border: 'border-purple-500/40'
        };
      default:
        return {
          icon: CheckCircle2,
          badge: 'Success',
          color: 'text-emerald-400',
          glow: 'from-emerald-500/20 to-teal-500/5',
          border: 'border-emerald-500/40'
        };
    }
  };

  const config = getConfig();
  const IconComp = config.icon;

  return (
    <AnimatePresence>
      <div className="fixed bottom-6 left-6 z-50 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`glass-panel p-4 rounded-2xl bg-slate-900/95 border ${config.border} shadow-2xl max-w-sm flex items-start gap-3.5 relative overflow-hidden`}
        >
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.glow} blur-2xl pointer-events-none`} />

          <div className={`w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center ${config.color} shrink-0`}>
            <IconComp className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-0.5 relative z-10">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${config.color}`}>
              {config.badge}
            </span>
            <h4 className="text-xs font-bold text-white tracking-tight">
              {title}
            </h4>
            {message && (
              <p className="text-[11px] text-slate-300 line-clamp-2">
                {message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

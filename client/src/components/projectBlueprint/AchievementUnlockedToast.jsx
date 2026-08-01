import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles, X, Check } from 'lucide-react';

export default function AchievementUnlockedToast({ badge, onClose }) {
  if (!badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed top-6 right-6 z-50 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="glass-panel p-4 rounded-2xl bg-slate-900/95 border border-amber-500/50 shadow-2xl shadow-amber-500/20 max-w-sm flex items-start gap-3.5 relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 blur-2xl rounded-full pointer-events-none" />

          {/* Badge Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/30 to-yellow-500/10 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0 shadow-inner">
            {badge.icon || '🏅'}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Achievement Unlocked!
            </div>
            <h4 className="text-sm font-bold text-white tracking-tight">
              {badge.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2">
              {badge.description}
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';
import DeveloperReportCard from './DeveloperReportCard';

const confettiColors = ['#06b6d4', '#a855f7', '#10b981', '#f59e0b', '#ec4899', '#3b82f6'];

const confettiParticles = Array.from({ length: 35 }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  targetY: Math.random() * 350 + 150,
  rotation: Math.random() * 720 - 360,
  size: Math.random() * 8 + 6,
  color: confettiColors[i % confettiColors.length],
  delay: Math.random() * 0.5
}));

export default function CompletionBanner({ isAllImproveCompleted }) {
  return (
    <AnimatePresence>
      {isAllImproveCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -15 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-slate-950 shadow-2xl space-y-8 relative overflow-hidden"
        >
          {/* Confetti Burst Overlay */}
          {confettiParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: -20, left: `${p.x}%`, rotate: 0 }}
              animate={{ opacity: 0, y: p.targetY, rotate: p.rotation }}
              transition={{ duration: 2.5, delay: p.delay, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 0,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.id % 2 === 0 ? '50%' : '2px',
                pointerEvents: 'none',
                zIndex: 40
              }}
            />
          ))}

          <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

          {/* Header Message */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 text-3xl mx-auto shadow-lg shadow-purple-500/20">
              🎉
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Blueprint Complete
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Congratulations! You have successfully completed every stage of your project blueprint — from mental model to production readiness.
            </p>
          </div>

          {/* DEVELOPER REPORT CARD UI */}
          <DeveloperReportCard />

          {/* RECOMMENDED NEXT CHALLENGE PLACEHOLDER CARD */}
          <div className="p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <Rocket className="w-4 h-4" />
                🚀 Recommended Next Challenge
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-semibold">
                Coming Soon
              </span>
            </div>
            <h4 className="text-base font-bold text-white tracking-tight">
              Build a Microservice Message Queue with Redis & RabbitMQ
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Take your software engineering skills to the next tier by building an asynchronous message bus with worker thread retries and dead-letter queues.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

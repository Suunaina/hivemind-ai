import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Target,
  Compass,
  Rocket,
  Wand2
} from 'lucide-react';
import { getAchievements } from '../../services/taskService';
import { useAuth } from '../../context/AuthContext';

export default function AchievementsPanel({ onSelectNextProject }) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!token) return;
      try {
        setLoading(true);
        const res = await getAchievements(token);
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to load achievements:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [token]);

  const recommendedProjects = [
    {
      title: 'Realtime WebSockets Chat Microservice',
      tag: 'Backend Architecture',
      desc: 'Build scalable event-driven messaging with Socket.io & Redis pub/sub.',
      difficulty: 'Intermediate'
    },
    {
      title: 'JWT Auth & Role-Based Access Control API',
      tag: 'Security & Auth',
      desc: 'Implement refresh tokens, rate limiting, and password hashing.',
      difficulty: 'Intermediate'
    },
    {
      title: 'Weather Forecast & Data Caching App',
      tag: 'APIs & Performance',
      desc: 'Integrate external meteorological APIs with server-side caching.',
      difficulty: 'Beginner'
    }
  ];

  if (loading) {
    return (
      <div className="p-6 rounded-3xl glass-panel border border-slate-800/80 animate-pulse flex items-center justify-center gap-3 text-slate-400 text-xs font-mono">
        <Trophy className="w-4 h-4 text-amber-400 animate-bounce" />
        <span>Loading Skill Tree & Achievements...</span>
      </div>
    );
  }

  const { earnedBadges = [], lockedBadges = [], progressPercentage = 0, nextBadge, totalBadges = 4, earnedCount = 0 } = data || {};

  return (
    <div className="space-y-6">
      {/* Skill Tree Header & Progress */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden space-y-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Student Skill Tree & Badges
              </span>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-full border border-slate-800">
                {earnedCount} / {totalBadges} Badges Earned
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Engineering Achievements
            </h3>
          </div>

          <div className="text-right font-mono text-xs text-amber-300 font-bold bg-amber-500/10 px-3.5 py-1.5 rounded-xl border border-amber-500/20">
            {progressPercentage}% Unlocked
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 relative z-10">
          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 shadow-lg shadow-amber-500/30"
            />
          </div>
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Earned Badges */}
        {earnedBadges.map((badge) => (
          <motion.div
            key={badge.badgeId}
            whileHover={{ scale: 1.02 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-amber-500/40 shadow-xl shadow-amber-500/5 relative overflow-visible flex flex-col justify-between space-y-3 group cursor-pointer"
          >
            {/* ITEM 9: Hover Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl text-xs text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 space-y-1">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <span>{badge.icon || '🏅'}</span>
                <span>{badge.title}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{badge.description}</p>
              <div className="text-[10px] font-mono text-emerald-400 font-bold">✓ Unlocked Achievement</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
                {badge.icon || '🏅'}
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Unlocked
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white tracking-tight mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-sans">
                {badge.description}
              </p>
            </div>

            <div className="text-[10px] font-mono text-amber-300/80 pt-2 border-t border-slate-800/80">
              Stage: {badge.stage || 'Completed'}
            </div>
          </motion.div>
        ))}

        {/* Locked Badges */}
        {lockedBadges.map((badge) => (
          <div
            key={badge.badgeId}
            className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 opacity-60 flex flex-col justify-between space-y-3 relative group hover:opacity-100 transition-all cursor-pointer"
          >
            {/* ITEM 9: Hover Tooltip */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl text-xs text-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 space-y-1">
              <div className="font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{badge.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{badge.description}</p>
              <div className="text-[10px] font-mono text-cyan-400 font-bold">Unlock Criteria: Complete {badge.stage}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 text-xl">
                <Lock className="w-5 h-5 text-slate-500" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-500 border border-slate-800 text-[10px] font-mono">
                Locked
              </span>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-400 tracking-tight mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 font-sans">
                {badge.description}
              </p>
            </div>

            <div className="text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800/80">
              Target: {badge.stage}
            </div>
          </div>
        ))}
      </div>

      {/* Next Badge Objective Card */}
      {nextBadge && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Next Achievement to Unlock
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                {nextBadge.icon} {nextBadge.title} &mdash; <span className="text-slate-300 font-normal">{nextBadge.description}</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-300 font-semibold bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20 shrink-0">
            {nextBadge.stage}
          </span>
        </div>
      )}

      {/* Recommended Next Project Section */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Recommended Next Challenges
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Based on your progress
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {recommendedProjects.map((proj, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group cursor-pointer"
              onClick={() => onSelectNextProject && onSelectNextProject(proj.title)}
            >
              <div className="space-y-1.5">
                <span className="px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-300">
                  {proj.tag}
                </span>
                <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                  {proj.title}
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {proj.desc}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                <span>{proj.difficulty}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Generate &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

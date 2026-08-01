import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Trophy, Users, Search, BarChart2, Plus, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  type = 'projects',
  title,
  message,
  actionLabel,
  actionLink,
  onAction
}) {
  const getPresetConfig = () => {
    switch (type) {
      case 'achievements':
        return {
          icon: Trophy,
          color: 'text-amber-400',
          bgGlow: 'bg-amber-500/10',
          title: title || 'No Achievements Earned Yet',
          message: message || 'Start exploring learning stages and completing project phases to unlock badges!',
          actionLabel: actionLabel || 'Explore Projects',
          actionLink: actionLink || '/dashboard'
        };
      case 'users':
        return {
          icon: Users,
          color: 'text-cyan-400',
          bgGlow: 'bg-cyan-500/10',
          title: title || 'No Registered Accounts Found',
          message: message || 'There are no student accounts registered in the database yet.',
          actionLabel: actionLabel || 'Refresh Directory',
          actionLink: null
        };
      case 'search':
        return {
          icon: Search,
          color: 'text-purple-400',
          bgGlow: 'bg-purple-500/10',
          title: title || 'No Matching Results Found',
          message: message || 'We could not find any items matching your search query. Try broadening your keywords.',
          actionLabel: actionLabel || 'Clear Search',
          actionLink: null
        };
      case 'analytics':
        return {
          icon: BarChart2,
          color: 'text-indigo-400',
          bgGlow: 'bg-indigo-500/10',
          title: title || 'No Telemetry Data Available',
          message: message || 'Analytics data will accumulate once students start generating project blueprints.',
          actionLabel: actionLabel || 'Back to Overview',
          actionLink: '/admin'
        };
      default:
        return {
          icon: FolderGit2,
          color: 'text-cyan-400',
          bgGlow: 'bg-cyan-500/10',
          title: title || 'No Project Blueprints Yet',
          message: message || 'Ready to start your software engineering journey? Ask your AI Swarm team to build your first project blueprint!',
          actionLabel: actionLabel || 'Create First Project',
          actionLink: '/dashboard'
        };
    }
  };

  const config = getPresetConfig();
  const IconComp = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl text-center space-y-4 max-w-md mx-auto relative overflow-hidden"
    >
      <div className={`w-14 h-14 rounded-3xl ${config.bgGlow} border border-slate-800 flex items-center justify-center ${config.color} mx-auto shadow-inner`}>
        <IconComp className="w-7 h-7" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-white tracking-tight">
          {config.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-sans max-w-sm mx-auto">
          {config.message}
        </p>
      </div>

      {(config.actionLink || onAction) && (
        <div className="pt-2">
          {config.actionLink ? (
            <Link
              to={config.actionLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>{config.actionLabel}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-white transition-all cursor-pointer"
            >
              <span>{config.actionLabel}</span>
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, LayoutDashboard, WifiOff, Lock, Server, FileX } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ErrorCard({
  errorType = 'generic',
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred while processing your request.',
  onRetry
}) {
  const getErrorConfig = () => {
    switch (errorType) {
      case 'quota':
        return {
          icon: AlertTriangle,
          color: 'text-amber-400',
          badge: 'Usage Limit Reached',
          reasons: [
            "We've reached today's AI usage quota.",
            'Rate limits are temporarily enforced.',
            'Please try again in a few moments or later today.'
          ]
        };
      case 'timeout':
        return {
          icon: WifiOff,
          color: 'text-amber-400',
          badge: 'Network Timeout',
          reasons: [
            'Server response took longer than expected.',
            'Temporary internet connection fluctuation.',
            'AI API rate limit or high latency.'
          ]
        };
      case 'unauthorized':
        return {
          icon: Lock,
          color: 'text-red-400',
          badge: 'Authentication Error',
          reasons: [
            'Your session token may have expired.',
            'You do not have required access permissions.',
            'Please sign in again to continue.'
          ]
        };
      case 'empty':
        return {
          icon: FileX,
          color: 'text-purple-400',
          badge: 'No Data Received',
          reasons: [
            'The requested task blueprint does not exist.',
            'Data has not been populated yet.',
            'Search filter returned empty results.'
          ]
        };
      default:
        return {
          icon: Server,
          color: 'text-red-400',
          badge: 'System Exception',
          reasons: [
            'Gemini AI API service temporarily unreachable.',
            'Invalid payload format or network error.',
            'Server endpoint encountered a temporary error.'
          ]
        };
    }
  };

  const config = getErrorConfig();
  const IconComp = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-500/30 shadow-2xl space-y-6 max-w-lg mx-auto relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4 relative z-10">
        <div className={`w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center ${config.color} shrink-0`}>
          <IconComp className="w-6 h-6" />
        </div>
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
            {config.badge}
          </span>
          <h3 className="text-base font-bold text-white tracking-tight mt-1">
            {title}
          </h3>
        </div>
      </div>

      {/* Friendly Explanation */}
      <div className="space-y-3 relative z-10 text-xs text-slate-300">
        <p className="leading-relaxed font-sans">{message}</p>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Possible Reasons:
          </div>
          <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-400">
            {config.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2 relative z-10">
        <Link
          to="/dashboard"
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-2"
        >
          <LayoutDashboard className="w-4 h-4 text-slate-400" />
          <span>Return to Dashboard</span>
        </Link>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}

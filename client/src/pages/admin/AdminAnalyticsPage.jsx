import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  Activity,
  Sparkles,
  Brain,
  Code2,
  Clock,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AnimatedBackground from '../../components/landing/AnimatedBackground';
import { getAdminAnalytics } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

export default function AdminAnalyticsPage() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadAnalytics() {
      if (!token) return;
      try {
        setLoading(true);
        setError('');
        const res = await getAdminAnalytics(token);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || 'Failed to load analytics.');
        }
      } catch (err) {
        console.error('Analytics Fetch Error:', err);
        setError('An error occurred while fetching system analytics.');
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, [token]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const { experienceDistribution = [], technologyBreakdown = [], recentActivity = [] } = data || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      <AnimatedBackground />
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-mono font-bold text-purple-300">
              System Telemetry
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Live Usage & Tech Trends
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Platform Tech Analytics & Activity Timeline
          </h1>
        </div>

        {loading ? (
          <div className="p-8 glass-panel rounded-3xl border border-slate-800 text-center space-y-3 font-mono text-xs text-slate-400">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-spin mx-auto" />
            <span>Crunching technology breakdown & activity timelines...</span>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-xs text-red-300 rounded-2xl">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Visual Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Experience Levels Distribution (Pie / Progress Representation) */}
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Experience Levels Distribution
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Student Mode Selection
                  </span>
                </div>

                <div className="space-y-4">
                  {experienceDistribution.map((item) => {
                    const colorMap = {
                      Beginner: 'from-emerald-500 to-teal-400 text-emerald-400',
                      Intermediate: 'from-amber-500 to-yellow-400 text-amber-400',
                      Advanced: 'from-pink-500 to-purple-400 text-pink-400'
                    };
                    return (
                      <div key={item.level} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold">{item.level} Mode</span>
                          <span className={colorMap[item.level].split(' ')[2]}>{item.percentage}% ({item.count} projects)</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800/80 p-0.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(item.percentage, 5)}%` }}
                            transition={{ duration: 0.6 }}
                            className={`h-full rounded-full bg-gradient-to-r ${colorMap[item.level].split(' ').slice(0, 2).join(' ')}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technology Frequency Breakdown (Bar Chart Representation) */}
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Most Requested Technologies
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    Stack Frequency
                  </span>
                </div>

                <div className="space-y-3">
                  {technologyBreakdown.map((tech) => (
                    <div key={tech.tech} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{tech.tech}</span>
                        <span className="text-purple-300 font-bold">{tech.count} requests</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800/80 p-0.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(tech.count * 15, 100)}%` }}
                          transition={{ duration: 0.6 }}
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Timeline */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Recent Activity Timeline
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Last 10 Swarm Generation Logs
                </span>
              </div>

              <div className="space-y-3">
                {recentActivity.map((act, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                        #{i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white tracking-tight line-clamp-1">
                          {act.prompt}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>{act.userName} ({act.userEmail})</span>
                          <span>•</span>
                          <span className="text-cyan-300">{act.experienceLevel} Mode</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 shrink-0">
                      {formatDate(act.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

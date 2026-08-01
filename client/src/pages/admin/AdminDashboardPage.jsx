import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Code,
  Sparkles,
  Zap,
  BarChart2,
  FolderGit2,
  ArrowRight,
  Clock,
  ShieldCheck,
  TrendingUp,
  Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AnimatedBackground from '../../components/landing/AnimatedBackground';
import { getAdminStats } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStats() {
      if (!token) return;
      try {
        setLoading(true);
        const res = await getAdminStats(token);
        if (res.success) {
          setStats(res.data);
        } else {
          setError(res.message || 'Failed to load system statistics.');
        }
      } catch (err) {
        console.error('Admin Stats Error:', err);
        setError('An error occurred while fetching admin analytics.');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [token]);

  const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-blue-500/5',
      badge: 'Registered Students'
    },
    {
      title: 'Total Projects Generated',
      value: stats?.totalProjects || 0,
      icon: Code,
      color: 'text-purple-400',
      bgGlow: 'from-purple-500/10 to-pink-500/5',
      badge: 'Multi-Agent Swarm Tasks'
    },
    {
      title: 'Total AI Blueprints',
      value: stats?.totalBlueprints || 0,
      icon: Sparkles,
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-teal-500/5',
      badge: 'Structured Curriculum JSON'
    },
    {
      title: 'Active Users Today',
      value: stats?.activeTodayCount || 0,
      icon: Zap,
      color: 'text-amber-400',
      bgGlow: 'from-amber-500/10 to-orange-500/5',
      badge: '24h Activity Window'
    },
    {
      title: 'Most Popular Level',
      value: stats?.popularLevel || 'Intermediate',
      icon: Brain,
      color: 'text-pink-400',
      bgGlow: 'from-pink-500/10 to-purple-500/5',
      badge: 'Student Preference'
    },
    {
      title: 'Top Category',
      value: stats?.popularCategory || 'Fullstack Web Apps',
      icon: FolderGit2,
      color: 'text-indigo-400',
      bgGlow: 'from-indigo-500/10 to-cyan-500/5',
      badge: 'Highest Demand'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      <AnimatedBackground />
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8">
        {/* Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-bold text-cyan-300">
                Read-Only Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">
                System Diagnostics & Analytics
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Administrative Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/users"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 hover:text-white transition-all flex items-center gap-2"
            >
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>User Roster</span>
            </Link>
            <Link
              to="/admin/analytics"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Deep Analytics</span>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center space-y-3">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs font-mono text-slate-400">Loading system metrics...</p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
            {error}
          </div>
        ) : (
          <>
            {/* Analytics Metric Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cards.map((card, idx) => {
                const IconComp = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="glass-panel p-6 rounded-3xl border border-slate-800/90 relative overflow-hidden flex flex-col justify-between space-y-4 hover:border-slate-700 transition-all group"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.bgGlow} blur-2xl pointer-events-none`} />

                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        {card.badge}
                      </span>
                      <div className={`w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center ${card.color} group-hover:scale-105 transition-transform`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {card.value}
                      </div>
                      <div className="text-xs font-semibold text-slate-400 mt-1">
                        {card.title}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Platform Quick Links & Security Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Read-Only Compliance & Integrity
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  The HiveMind Admin Portal operates under a strict read-only audit contract. Administrative operations cannot modify user data, alter tasks, or delete historical blueprint records.
                </p>
                <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span>✔ Zero CRUD Side-effects</span>
                  <span>•</span>
                  <span>✔ Full Auditing Enabled</span>
                </div>
              </div>

              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight mb-1">
                    Student Roster & Blueprints Inspector
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Inspect individual student profiles, review generated blueprints in read-only mode, and evaluate project difficulty distribution.
                  </p>
                </div>
                <Link
                  to="/admin/users"
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore User Roster</span>
                  <ArrowRight className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

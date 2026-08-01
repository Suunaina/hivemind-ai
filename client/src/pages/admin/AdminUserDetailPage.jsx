import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User as UserIcon,
  ArrowLeft,
  Mail,
  Calendar,
  Sparkles,
  ExternalLink,
  Award,
  Code2,
  Clock,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AnimatedBackground from '../../components/landing/AnimatedBackground';
import { getAdminUserById } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

export default function AdminUserDetailPage() {
  const { userId } = useParams();
  const { token } = useAuth();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      if (!token || !userId) return;
      try {
        setLoading(true);
        setError('');
        const res = await getAdminUserById(token, userId);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message || 'Failed to fetch user details.');
        }
      } catch (err) {
        console.error('Admin User Detail Error:', err);
        setError('An error occurred while loading user profile.');
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token, userId]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name = 'User') => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-3 text-slate-400 font-mono text-xs">
          <Sparkles className="w-5 h-5 text-cyan-400 animate-spin mx-auto" />
          <span>Loading user profile & generated blueprints...</span>
        </div>
      </div>
    );
  }

  const { user, projectsCount = 0, blueprints = [] } = data || {};

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      <AnimatedBackground />
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-6">
        {/* Back Link */}
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to User Roster</span>
        </Link>

        {error ? (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-300">
            {error}
          </div>
        ) : (
          <>
            {/* User Profile Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center font-mono text-xl font-bold text-cyan-300 shadow-lg">
                  {getInitials(user?.name)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      {user?.name}
                    </h1>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                      user?.role === 'admin'
                        ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
                        : 'text-slate-400 bg-slate-900 border-slate-800'
                    }`}>
                      {user?.role === 'admin' ? '🛡 Admin' : 'Student'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      {user?.email}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      Joined: {formatDate(user?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics Pill */}
              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[100px]">
                  <div className="text-xl font-extrabold text-cyan-300 font-mono">
                    {projectsCount}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    Blueprints
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center min-w-[100px]">
                  <div className="text-xl font-extrabold text-amber-300 font-mono">
                    {user?.achievementsCount || 0}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                    Badges
                  </div>
                </div>
              </div>
            </div>

            {/* Generated Blueprints Header & List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Generated Project Blueprints ({blueprints.length})
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Read-Only Mode Inspection
                </span>
              </div>

              {blueprints.length === 0 ? (
                <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center text-xs text-slate-400">
                  No project blueprints generated by this user yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blueprints.map((bp) => (
                    <div
                      key={bp._id}
                      className="glass-panel p-5 rounded-2xl border border-slate-800/90 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                            bp.experienceLevel === 'Beginner'
                              ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                              : bp.experienceLevel === 'Advanced'
                              ? 'text-pink-400 bg-pink-500/10 border-pink-500/20'
                              : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                          }`}>
                            {bp.experienceLevel || 'Intermediate'} Mode
                          </span>

                          <span className="text-[10px] font-mono text-slate-500">
                            {formatDate(bp.createdAt)}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                          {bp.prompt}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                        <span className="text-[10px] font-mono text-slate-400">
                          ID: {bp._id}
                        </span>

                        <Link
                          to={`/history/${bp._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-all flex items-center gap-1.5"
                        >
                          <span>Open Blueprint</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

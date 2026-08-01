import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  ArrowRight,
  Sparkles,
  Calendar,
  Code2,
  Brain,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AnimatedBackground from '../../components/landing/AnimatedBackground';
import { getAdminUsers } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = async (query = '') => {
    if (!token) return;
    try {
      setLoading(true);
      setError('');
      const res = await getAdminUsers(token, query);
      if (res.success) {
        setUsers(res.data || []);
      } else {
        setError(res.message || 'Failed to fetch users list.');
      }
    } catch (err) {
      console.error('Fetch Users Error:', err);
      setError('An error occurred while searching users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(searchQuery);
  }, [token]);

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    loadUsers(q);
  };

  const getInitials = (name = 'User') => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans">
      <AnimatedBackground />
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-6">
        {/* Page Title & Search Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono font-bold text-cyan-300">
                User Directory
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {users.length} Registered Accounts
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Registered Student Accounts
            </h1>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or email..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
            />
          </div>
        </div>

        {/* Users Table Card */}
        <div className="glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center space-y-3 text-slate-400 text-xs font-mono">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-spin mx-auto" />
              <span>Fetching user records...</span>
            </div>
          ) : error ? (
            <div className="p-4 bg-red-500/10 text-red-300 text-xs">{error}</div>
          ) : users.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs space-y-2">
              <Users className="w-8 h-8 text-slate-600 mx-auto" />
              <p>No user accounts found matching your query.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                    <th className="py-4 px-6">Student User</th>
                    <th className="py-4 px-4">Role</th>
                    <th className="py-4 px-4">Experience Level</th>
                    <th className="py-4 px-4 text-center">Projects</th>
                    <th className="py-4 px-4">Last Active</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-900/40 transition-colors">
                      {/* Avatar & Name/Email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-300 shrink-0">
                            {getInitials(u.name)}
                          </div>
                          <div>
                            <div className="font-bold text-white tracking-tight">
                              {u.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          u.role === 'admin'
                            ? 'text-purple-400 bg-purple-500/10 border-purple-500/20'
                            : 'text-slate-400 bg-slate-900 border-slate-800'
                        }`}>
                          {u.role === 'admin' ? '🛡 Admin' : 'Student'}
                        </span>
                      </td>

                      {/* Experience Level */}
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                          u.experienceLevel === 'Beginner'
                            ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                            : u.experienceLevel === 'Advanced'
                            ? 'text-pink-400 bg-pink-500/10 border-pink-500/20'
                            : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                        }`}>
                          {u.experienceLevel || 'Intermediate'}
                        </span>
                      </td>

                      {/* Project Count */}
                      <td className="py-4 px-4 text-center font-mono text-cyan-300 font-bold">
                        {u.projectCount}
                      </td>

                      {/* Last Active */}
                      <td className="py-4 px-4 font-mono text-slate-400">
                        {formatDate(u.lastActive)}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/admin/users/${u._id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

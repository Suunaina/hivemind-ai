import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Bell, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function DashboardNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'GU';
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: HiveMind AI Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 group-hover:border-indigo-500/60 transition-colors">
            <Bot className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              HiveMind <span className="text-indigo-400">AI</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Dashboard</span>
          </div>
        </Link>

        {/* Center: Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All Agents Online</span>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center gap-4">
          {/* User Profile Avatar & Details */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-800/80">
            <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-purple-500/20 border border-white/10">
                  {isAuthenticated ? getInitials(user?.name) : 'GU'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080c14]" />
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-200">
                  {isAuthenticated ? user?.name : 'Guest User'}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {isAuthenticated ? user?.email : 'Not Signed In'}
                </span>
              </div>
            </motion.div>

            {/* Logout Button */}
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

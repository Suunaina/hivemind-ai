import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Plus, FolderKanban, Clock, ArrowUpRight, Bot } from 'lucide-react';

export default function DashboardPage() {
  const dummyWorkspaces = [
    { id: 'ws-1', title: 'E-commerce API Refactor', tasks: 4, updatedAt: '2 hours ago' },
    { id: 'ws-2', title: 'AI Recommendation Service', tasks: 2, updatedAt: '1 day ago' },
    { id: 'ws-3', title: 'Real-time Analytics Dashboard', tasks: 7, updatedAt: '3 days ago' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Workspaces</h1>
            <p className="text-sm text-slate-400 mt-1">Manage and launch multi-agent collaboration tasks</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all">
            <Plus className="w-4 h-4" />
            New Workspace
          </button>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dummyWorkspaces.map((ws) => (
            <Link
              key={ws.id}
              to={`/workspace/${ws.id}`}
              className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-indigo-500/50 transition-all hover:scale-[1.02] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="font-bold text-lg text-slate-200 group-hover:text-indigo-300 transition-colors mb-2">
                  {ws.title}
                </h3>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-800/80">
                <span className="flex items-center gap-1">
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  {ws.tasks} tasks
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {ws.updatedAt}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

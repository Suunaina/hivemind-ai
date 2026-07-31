import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { ArrowLeft, Clock, CheckCircle2, History } from 'lucide-react';

export default function TaskHistoryPage() {
  const { taskId } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="glass-panel p-6 rounded-2xl border border-slate-800 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              Task Execution Logs
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Task #{taskId || '101'} Completed
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Sparkles,
  Layers,
  Brain,
  Search,
  Code,
  ShieldCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import AnimatedBackground from '../components/landing/AnimatedBackground';
import { useAuth } from '../context/AuthContext';
import { getTaskById } from '../services/taskService';

export default function TaskHistoryPage() {
  const { taskId, id } = useParams();
  const targetId = taskId || id;
  const { token } = useAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedSection, setCopiedSection] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (!targetId || !token) {
        setError('Task ID or authentication session missing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const res = await getTaskById(targetId, token);

        if (res.success && res.data) {
          setTask(res.data);
        } else {
          setError(res.message || 'Task not found.');
        }
      } catch (err) {
        console.error('Fetch Task Details Error:', err);
        setError(
          err.response?.data?.message || err.message || 'Failed to load task details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [targetId, token]);

  const handleCopy = (text, sectionKey) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => {
      setCopiedSection((prev) => (prev === sectionKey ? null : prev));
    }, 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const agentSections = task
    ? [
        {
          key: 'planner',
          title: 'Planner',
          icon: '🧠',
          LucideIcon: Brain,
          subTitle: 'System Design & Task Decomposition',
          badge: 'Architecture',
          accentBg: 'bg-blue-500/10',
          accentText: 'text-blue-300',
          accentBorder: 'border-blue-500/20',
          iconColor: 'text-blue-400',
          output: task.plannerOutput
        },
        {
          key: 'researcher',
          title: 'Researcher',
          icon: '🔍',
          LucideIcon: Search,
          subTitle: 'Context Gathering & Deep Retrieval',
          badge: 'Research & Intelligence',
          accentBg: 'bg-amber-500/10',
          accentText: 'text-amber-300',
          accentBorder: 'border-amber-500/20',
          iconColor: 'text-amber-400',
          output: task.researcherOutput
        },
        {
          key: 'developer',
          title: 'Developer',
          icon: '💻',
          LucideIcon: Code,
          subTitle: 'Code Synthesis & Implementation',
          badge: 'Code Generation',
          accentBg: 'bg-emerald-500/10',
          accentText: 'text-emerald-300',
          accentBorder: 'border-emerald-500/20',
          iconColor: 'text-emerald-400',
          output: task.developerOutput
        },
        {
          key: 'reviewer',
          title: 'Reviewer',
          icon: '🛡',
          LucideIcon: ShieldCheck,
          subTitle: 'Code Verification & Security Audit',
          badge: 'Quality & Verification',
          accentBg: 'bg-purple-500/10',
          accentText: 'text-purple-300',
          accentBorder: 'border-purple-500/20',
          iconColor: 'text-purple-400',
          output: task.reviewerOutput
        }
      ]
    : [];

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      <AnimatedBackground />
      <DashboardNavbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full z-10">
        {/* Navigation / Back Button */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-purple-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
        </div>

        {/* Loading Spinner State */}
        {loading && (
          <div className="min-h-[400px] flex flex-col justify-center items-center gap-4 glass-panel rounded-3xl p-12 border border-slate-800/80 shadow-2xl">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
              <Sparkles className="w-6 h-6 text-purple-400 absolute animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-semibold text-slate-200">Fetching Task Details</h3>
              <p className="text-xs text-slate-400">Loading multi-agent swarm outputs from database...</p>
            </div>
          </div>
        )}

        {/* Error Message State */}
        {!loading && error && (
          <div className="p-8 rounded-3xl glass-panel border border-red-500/30 text-center max-w-lg mx-auto my-12 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 mb-2">Unable to Load Task</h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">{error}</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/25 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </Link>
          </div>
        )}

        {/* Task Details Content */}
        {!loading && !error && task && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* Header Task Information Banner */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
              
              {/* Task Metadata Badges */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono font-medium text-purple-300">
                    ID: {task._id}
                  </span>

                  {/* Status Badge */}
                  {task.status === 'completed' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  )}
                  {task.status === 'processing' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Processing
                    </span>
                  )}
                  {task.status === 'failed' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Failed
                    </span>
                  )}
                </div>

                {/* Created Date */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono bg-slate-900/50 px-3 py-1 rounded-xl border border-slate-800/60">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Created: {formatDate(task.createdAt)}</span>
                </div>
              </div>

              {/* Task Prompt Display */}
              <div className="space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-purple-400/90 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Task Prompt
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-relaxed">
                  {task.prompt}
                </h1>
              </div>
            </div>

            {/* Quick Agent Cards Navigation Bar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-slate-100">Swarm Agent Outputs</h2>
              </div>

              {/* Quick Jump Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                {agentSections.map((agent) => (
                  <a
                    key={agent.key}
                    href={`#agent-${agent.key}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 text-xs text-slate-300 hover:text-purple-300 transition-colors"
                  >
                    <span>{agent.icon}</span>
                    <span className="font-medium">{agent.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 4 Agent Output Beautiful Cards */}
            <div className="space-y-6">
              {agentSections.map((agent) => {
                const isCopied = copiedSection === agent.key;
                return (
                  <motion.div
                    key={agent.key}
                    id={`agent-${agent.key}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/90 hover:border-slate-700/80 shadow-2xl transition-all"
                  >
                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl ${agent.accentBg} ${agent.accentBorder} border flex items-center justify-center text-xl`}>
                          {agent.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                              {agent.icon} {agent.title}
                            </h3>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${agent.accentBg} ${agent.accentText} border ${agent.accentBorder}`}>
                              {agent.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{agent.subTitle}</p>
                        </div>
                      </div>

                      {/* Section Copy Button */}
                      <button
                        type="button"
                        onClick={() => handleCopy(agent.output, agent.key)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl glass-card text-xs font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-purple-500/40 transition-all shadow-sm active:scale-95"
                        title={`Copy ${agent.title} Output`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400" />
                            <span>Copy Section</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Card Content - Markdown Render Container */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800/90 font-sans text-sm text-slate-200 leading-relaxed overflow-x-auto">
                      {agent.output ? (
                        <div className="prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-headings:text-slate-100 prose-headings:font-bold prose-p:text-slate-300 prose-a:text-purple-400 prose-code:text-purple-300 prose-code:bg-purple-950/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-strong:text-white">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {agent.output}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="py-6 text-center text-slate-500 text-xs italic">
                          No output generated for this agent phase.
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

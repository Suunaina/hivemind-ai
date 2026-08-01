import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Wand2, Loader2, AlertCircle, Brain, Search, Code, ShieldCheck, CheckCircle2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../context/AuthContext';
import { createTask } from '../../services/taskService';
import AILoadingTimeline from '../common/AILoadingTimeline';
import ErrorCard from '../common/ErrorCard';

const promptPresets = [
  'Build REST API microservice',
  'Security audit auth module',
  'Refactor state management',
  'Write documentation'
];

const exampleHelpers = [
  'Build a MERN ecommerce platform',
  'Review my authentication system',
  'Explain dynamic programming',
  'Create a REST API'
];

export default function TaskCreationCard() {
  const [taskPrompt, setTaskPrompt] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [taskResult, setTaskResult] = useState(null);
  const [activeTab, setActiveTab] = useState('planner');
  const [copied, setCopied] = useState(false);

  const { token, user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    const firstName = user?.name ? user.name.split(' ')[0] : 'Developer';

    let timeGreeting = 'Good Morning';
    if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good Afternoon';
    } else if (hour >= 17) {
      timeGreeting = 'Good Evening';
    }

    return `${timeGreeting}, ${firstName}`;
  };

  const handleGeneratePlan = async () => {
    if (isProcessing) return;

    if (!taskPrompt || taskPrompt.trim().length === 0) {
      setError('Please enter a task prompt before generating.');
      return;
    }

    if (!token) {
      setError('Authentication token missing. Please sign in to submit tasks.');
      return;
    }

    try {
      setError('');
      setIsProcessing(true);
      setTaskResult(null);

      const response = await createTask(taskPrompt.trim(), experienceLevel, token);

      if (response.success && response.data) {
        setTaskResult(response.data);
        setActiveTab('planner');
      } else {
        setError(response.message || 'Failed to process task. Please try again.');
      }
    } catch (err) {
      console.error('Task execution error:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'An error occurred while executing AI swarm agents.';
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      {/* Greeting Section */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
          {getGreeting()} <span className="text-2xl">👋</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          Ready to continue your learning journey? Let's build something amazing today.
        </p>
      </div>

      {/* Task Creation Card */}
      {isProcessing ? (
        <AILoadingTimeline prompt={taskPrompt} />
      ) : (
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-300">
              <Wand2 className="w-4 h-4 text-purple-400" />
              <span>Swarm Task Prompt</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Planner → Researcher → Developer → Reviewer
            </span>
          </div>

          {/* Error Alert Toast */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
              <div className="flex-1">
                <span className="font-semibold block mb-0.5">Execution Error</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Large Textarea with Focus Glow */}
          <div className="relative flex flex-col gap-2">
            <textarea
              rows={4}
              value={taskPrompt}
              onChange={(e) => {
                setTaskPrompt(e.target.value);
                if (error) setError('');
              }}
              disabled={isProcessing}
              placeholder="Describe your task in detail..."
              className="w-full bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all resize-none shadow-inner disabled:opacity-60 disabled:cursor-not-allowed"
            />
            
            {/* Low Opacity Helper Examples */}
            {!taskPrompt && !isProcessing && (
              <div className="px-1 text-[11px] text-slate-500/70 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                <span className="text-slate-600 font-sans font-medium">Examples:</span>
                {exampleHelpers.map((ex, i) => (
                  <span
                    key={i}
                    className="hover:text-slate-400 cursor-pointer transition-colors"
                    onClick={() => setTaskPrompt(ex)}
                  >
                    • {ex}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Student Experience Level Selector */}
          <div className="space-y-2 pt-1 border-t border-slate-800/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-cyan-400" />
                Select Experience Level:
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Tailors blueprint depth & guidance style
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'Beginner', label: '🟢 Beginner', desc: 'Detailed analogies & step-by-step guidance' },
                { id: 'Intermediate', label: '🟡 Intermediate', desc: 'Architecture & decision trade-off focus' },
                { id: 'Advanced', label: '🔴 Advanced', desc: 'Scalability, security & design patterns' }
              ].map((lvl) => (
                <button
                  key={lvl.id}
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setExperienceLevel(lvl.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    experienceLevel === lvl.id
                      ? 'bg-slate-900 border-cyan-500/50 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-0.5">{lvl.label}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{lvl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Preset Buttons & Primary CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Quick prompts:</span>
              {promptPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  disabled={isProcessing}
                  onClick={() => setTaskPrompt(preset)}
                  className="px-3 py-1 rounded-xl glass-card text-xs text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors disabled:opacity-50"
                >
                  + {preset}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleGeneratePlan}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                  Running AI Agents...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  Generate Plan
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      )}

      {/* Swarm Execution Results Viewer */}
      <AnimatePresence>
        {taskResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-6 sm:p-8 rounded-3xl glass-panel border border-indigo-500/30 shadow-2xl"
          >
            {/* Header Result Badge */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-slate-100">Swarm Task Output</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  Completed
                </span>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(taskResult[`${activeTab}Output`])}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-xs font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                {copied ? 'Copied!' : 'Copy Section'}
              </button>
            </div>

            {/* Agent Output Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800/80 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('planner')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'planner'
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Brain className="w-4 h-4 text-blue-400" />
                1. Planner Output
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('researcher')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'researcher'
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Search className="w-4 h-4 text-amber-400" />
                2. Researcher Output
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('developer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'developer'
                    ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Code className="w-4 h-4 text-emerald-400" />
                3. Developer Output
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('reviewer')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'reviewer'
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                4. Reviewer Output
              </button>
            </div>

            {/* Markdown Output Display */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 max-h-[600px] overflow-y-auto font-sans text-sm text-slate-200 leading-relaxed space-y-4 prose prose-invert max-w-none">
              <ReactMarkdown>
                {taskResult[`${activeTab}Output`] || 'No output generated for this section.'}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

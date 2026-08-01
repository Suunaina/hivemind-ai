import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Copy,
  Check,
  Bot,
  Compass,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { askMentor } from '../../services/taskService';

export default function AskHiveModal({ isOpen, onClose, task, activeStage, token }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const MAX_CHARS = 500;

  const handleAsk = async (e) => {
    if (e) e.preventDefault();
    if (!question.trim() || loading || !task || !token) return;

    try {
      setLoading(true);
      setError('');
      setResponse('');

      const res = await askMentor(
        task._id,
        { question: question.trim(), stage: activeStage },
        token
      );

      if (res.success && res.data?.reply) {
        setResponse(res.data.reply);
      } else {
        setError(res.message || 'Failed to get a response from Hive Mentor.');
      }
    } catch (err) {
      console.error('Ask Hive Mentor Error:', err);
      setError(
        err.response?.data?.message || err.message || 'An error occurred while contacting Hive Mentor.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStageTitle = (stageId) => {
    switch (stageId) {
      case 'understand':
        return 'Stage 1: Understand the Problem';
      case 'learn':
        return 'Stage 2: Learn the Concepts';
      case 'build':
        return 'Stage 3: Build Your Project';
      case 'improve':
        return 'Stage 4: Professional Polish';
      default:
        return `Stage: ${stageId}`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl glass-panel bg-slate-900/95 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Ambient Lighting Accents */}
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-purple-500/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />

            {/* Header */}
            <div className="p-6 sm:p-7 border-b border-slate-800/80 flex items-start justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    Ask Hive AI Mentor
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-mono font-semibold">
                    {getStageTitle(activeStage)}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight line-clamp-1">
                  {task?.prompt || 'Software Engineering Project'}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7 space-y-6 max-h-[70vh] overflow-y-auto relative z-10">
              {/* Question Input Form */}
              <form onSubmit={handleAsk} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    Ask for guidance, hints, or concept clarification:
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      question.length >= MAX_CHARS ? 'text-red-400 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {question.length} / {MAX_CHARS}
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    maxLength={MAX_CHARS}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g. How should I structure my route handlers for this project? Or explain JWT payload security in simple terms..."
                    className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-sans leading-relaxed resize-none"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400 italic">
                    Hive guides with hints and analogies without giving away code solutions.
                  </span>

                  <button
                    type="submit"
                    disabled={!question.trim() || loading}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <span>Ask Hive</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* AI Mentor Response Area */}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-950/90 border border-purple-500/30 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 text-sm">
                        🐝
                      </div>
                      <span className="text-xs font-bold text-white tracking-tight">
                        Hive's Guidance
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed font-sans prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-p:text-slate-300 prose-code:text-cyan-300 prose-code:bg-cyan-950/40 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-strong:text-white">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {response}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

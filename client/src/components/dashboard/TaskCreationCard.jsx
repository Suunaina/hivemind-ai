import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Wand2 } from 'lucide-react';

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
          Welcome back <span className="text-2xl">👋</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 mt-1">
          What would you like your AI team to accomplish today?
        </p>
      </div>

      {/* Task Creation Card */}
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

          {/* Large Textarea with Focus Glow */}
          <div className="relative flex flex-col gap-2">
            <textarea
              rows={4}
              value={taskPrompt}
              onChange={(e) => setTaskPrompt(e.target.value)}
              placeholder="Describe your task in detail..."
              className="w-full bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-all resize-none shadow-inner"
            />
            
            {/* Low Opacity Helper Examples */}
            {!taskPrompt && (
              <div className="px-1 text-[11px] text-slate-500/70 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                <span className="text-slate-600 font-sans font-medium">Examples:</span>
                {exampleHelpers.map((ex, i) => (
                  <span key={i} className="hover:text-slate-400 cursor-pointer transition-colors" onClick={() => setTaskPrompt(ex)}>
                    • {ex}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Preset Buttons & Primary CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Quick prompts:</span>
              {promptPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTaskPrompt(preset)}
                  className="px-3 py-1 rounded-xl glass-card text-xs text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors"
                >
                  + {preset}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              Generate Plan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { Play, BrainCircuit, Search, Code, CheckCircle, Terminal, FileCode, Check } from 'lucide-react';

export default function WorkspacePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('planner');
  const [prompt, setPrompt] = useState('');

  const agents = [
    { key: 'planner', name: 'Planner', icon: BrainCircuit, color: 'text-blue-400', status: 'Ready' },
    { key: 'researcher', name: 'Researcher', icon: Search, color: 'text-amber-400', status: 'Idle' },
    { key: 'developer', name: 'Developer', icon: Code, color: 'text-emerald-400', status: 'Idle' },
    { key: 'reviewer', name: 'Reviewer', icon: CheckCircle, color: 'text-purple-400', status: 'Idle' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden">
        
        {/* Main Content Studio */}
        <div className="flex-1 flex flex-col bg-slate-950/60 border-r border-slate-800/80">
          
          {/* Stepper Header */}
          <div className="p-4 glass-panel border-b border-slate-800 flex items-center justify-between overflow-x-auto gap-4">
            {agents.map((ag, idx) => {
              const Icon = ag.icon;
              const isActive = activeTab === ag.key;
              return (
                <button
                  key={ag.key}
                  onClick={() => setActiveTab(ag.key)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-white border border-slate-700 shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${ag.color} bg-slate-900 border border-slate-800`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{idx + 1}. {ag.name}</span>
                </button>
              );
            })}
          </div>

          {/* Streaming Output Box */}
          <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-slate-300">
            <div className="p-4 rounded-xl glass-card border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                {activeTab.toUpperCase()} AGENT STREAM
              </div>
              <p className="text-slate-400 italic">
                Workspace ID: <span className="text-slate-200">{id}</span>. Enter a user task below to trigger the 4-agent collaborative execution pipeline...
              </p>
            </div>
          </div>

          {/* User Prompt Input Bar */}
          <div className="p-4 glass-panel border-t border-slate-800">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your technical request (e.g. Build a JWT auth module in Express)..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                Run Swarm
              </button>
            </form>
          </div>
        </div>

        {/* Output Artifact Preview Panel */}
        <div className="w-full lg:w-96 glass-panel border-t lg:border-t-0 border-slate-800 p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="font-semibold text-sm text-slate-200 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-indigo-400" />
              Generated Artifacts
            </h3>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-center p-6 text-slate-500 text-xs">
            No code artifacts generated yet. Run a swarm task to view compiled code files and documentation.
          </div>
        </div>

      </div>
    </div>
  );
}

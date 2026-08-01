import React from 'react';
import { Layers, Lock } from 'lucide-react';

export default function StageNavigation({ journeyStages, activeStage, setActiveStage }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Learning Journey Flow
        </h2>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
          {activeStage === 'understand'
            ? 'Stage 1 Active'
            : activeStage === 'learn'
            ? 'Stage 2 Active'
            : activeStage === 'build'
            ? 'Stage 3 Active'
            : 'Stage 4 Active'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {journeyStages.map((stage) => {
          const isCurrent = activeStage === stage.id;
          const isAvailable = stage.available;

          return (
            <button
              key={stage.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && setActiveStage(stage.id)}
              className={`relative p-4 rounded-2xl border text-left transition-all ${
                isCurrent
                  ? 'glass-panel bg-cyan-950/20 border-cyan-500/40 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : isAvailable
                  ? 'glass-panel hover:bg-slate-900/60 border-slate-800 cursor-pointer'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{stage.emoji}</span>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    Stage {stage.number}
                  </span>
                </div>

                {!isAvailable && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                    <Lock className="w-3 h-3" />
                    {stage.badge}
                  </span>
                )}
              </div>

              <h3 className={`text-sm font-bold tracking-tight ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                {stage.title}
              </h3>

              {isCurrent && (
                <div className="mt-2 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                  <span>Currently Viewing</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

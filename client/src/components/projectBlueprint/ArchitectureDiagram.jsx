import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Server,
  Cpu,
  Database,
  ArrowRight,
  ArrowDown,
  Layers,
  Sparkles,
  ShieldCheck,
  Globe,
  Radio,
  FileCode,
  CheckCircle2
} from 'lucide-react';

export default function ArchitectureDiagram({ task }) {
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [activeTab, setActiveTab] = useState('flow'); // 'flow' or 'layers'

  // Extract dynamic nodes based on task blueprint & prompt
  const nodes = useMemo(() => {
    const promptLower = (task?.prompt || '').toLowerCase();
    const fullText = [
      task?.prompt || '',
      task?.plannerOutput || '',
      task?.developerOutput || ''
    ].join('\n\n').toLowerCase();

    // Default 4-Node Fullstack / REST Architecture
    let customNodes = [
      {
        id: 'node_client',
        step: 1,
        title: 'Client Application / UI',
        category: 'Frontend Tier',
        badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        IconComponent: Monitor,
        iconColor: 'text-cyan-400',
        bgGlow: 'from-cyan-500/10 to-blue-500/5',
        protocol: 'HTTPS / REST Client',
        description: 'Interactive user interface managing input forms, state rendering, and asynchronous API calls.',
        components: ['React View / Components', 'State Handlers', 'Axios HTTP Client'],
        dataOutput: 'JSON Request Payload'
      },
      {
        id: 'node_gateway',
        step: 2,
        title: 'API Router & Middleware',
        category: 'Gateway Layer',
        badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        IconComponent: Server,
        iconColor: 'text-purple-400',
        bgGlow: 'from-purple-500/10 to-cyan-500/5',
        protocol: 'Express.js Router',
        description: 'Receives client requests, executes CORS checks, rate limiting, and verifies auth credentials.',
        components: ['Express Router', 'Auth / JWT Middleware', 'Input Validator'],
        dataOutput: 'Sanitized req.body & req.user'
      },
      {
        id: 'node_engine',
        step: 3,
        title: 'Controller & Core Engine',
        category: 'Business Logic',
        badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        IconComponent: Cpu,
        iconColor: 'text-amber-400',
        bgGlow: 'from-amber-500/10 to-purple-500/5',
        protocol: 'Node.js Runtime / Services',
        description: 'Processes core computational logic, calculates domain rules, and orchestrates data transformations.',
        components: ['Controller Functions', 'Data Parsers', 'Async Logic Handlers'],
        dataOutput: 'Formatted Data Result'
      },
      {
        id: 'node_db',
        step: 4,
        title: 'Database & Storage',
        category: 'Persistence Tier',
        badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        IconComponent: Database,
        iconColor: 'text-emerald-400',
        bgGlow: 'from-emerald-500/10 to-teal-500/5',
        protocol: 'MongoDB / Mongoose ORM',
        description: 'Persists structured application records with indexed schema validation and atomic operations.',
        components: ['Mongoose Schemas', 'Database Indexing', 'JSON Persistence'],
        dataOutput: 'Persisted Record Document'
      }
    ];

    // Customize node descriptions based on project type
    if (promptLower.includes('calculator')) {
      customNodes[0].title = 'Calculator Web UI';
      customNodes[0].description = 'Renders interactive keypad, equation display screen, and memory register.';
      customNodes[0].components = ['Display Component', 'Keypad Grid', 'Theme Switcher'];

      customNodes[1].title = 'Input Parser & Validator';
      customNodes[1].description = 'Sanitizes keypress inputs, validates expression syntax, and handles division by zero.';
      customNodes[1].components = ['Expression Parser', 'Operator Order Checker', 'Input Sanitizer'];

      customNodes[2].title = 'Arithmetic Calculation Engine';
      customNodes[2].description = 'Evaluates mathematical operations using precise floating-point algorithms.';
      customNodes[2].components = ['Math Engine', 'Precision Decimal Helper', 'Memory Manager'];

      customNodes[3].title = 'History Storage & State';
      customNodes[3].description = 'Stores past calculation sessions in LocalStorage / memory state array.';
      customNodes[3].components = ['LocalStorage API', 'History Log State', 'Export Log Handler'];
    } else if (promptLower.includes('weather')) {
      customNodes[0].title = 'Weather Dashboard UI';
      customNodes[0].description = 'Renders location search input, temperature units toggle, and 5-day forecast cards.';

      customNodes[1].title = 'API Proxy & Cache Router';
      customNodes[1].description = 'Manages location requests, caches weather responses, and handles HTTP timeouts.';

      customNodes[2].title = 'OpenWeather Data Adapter';
      customNodes[2].description = 'Transforms raw weather API payloads into clean metric & imperial UI models.';

      customNodes[3].title = 'External Weather API & Cache';
      customNodes[3].description = 'Fetches real-time meteorological metrics from OpenWeather map endpoints.';
      customNodes[3].IconComponent = Globe;
      customNodes[3].category = 'External API';
    }

    return customNodes;
  }, [task]);

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Interactive Architecture Map
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('flow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'flow'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Data Flow View
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('layers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'layers'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier Breakdown
          </button>
        </div>
      </div>

      {/* Main Diagram Canvas */}
      {activeTab === 'flow' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {nodes.map((node, index) => {
            const IconComp = node.IconComponent;
            const isSelected = selectedNodeId === node.id;
            const isLast = index === nodes.length - 1;

            return (
              <React.Fragment key={node.id}>
                {/* Node Card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`glass-panel p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-400 shadow-xl ring-2 ring-cyan-500/30'
                      : 'border-slate-800/90 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg'
                  }`}
                >
                  {/* Subtle Background Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${node.bgGlow} blur-2xl pointer-events-none`} />

                  <div className="space-y-4 relative z-10">
                    {/* Node Header */}
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center ${node.iconColor} group-hover:scale-105 transition-transform`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${node.badgeColor}`}>
                        Step {node.step}
                      </span>
                    </div>

                    {/* Node Info */}
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                        {node.category}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                        {node.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                      {node.description}
                    </p>

                    {/* Sub-Components Tags */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                        <FileCode className="w-3 h-3 text-cyan-400" />
                        Modules & Files:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {node.components.map((comp) => (
                          <span
                            key={comp}
                            className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Protocol Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{node.protocol}</span>
                    <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                      Inspect &rarr;
                    </span>
                  </div>
                </motion.div>

                {/* Animated Arrow Connector for Desktop / Tablet */}
                {!isLast && (
                  <div className="hidden lg:flex items-center justify-center -mx-2 pointer-events-none self-center z-10">
                    <div className="relative flex items-center">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-slate-700 via-cyan-500/50 to-slate-700" />
                      <ArrowRight className="w-5 h-5 text-cyan-400 animate-pulse -ml-2" />
                    </div>
                  </div>
                )}

                {/* Downward Connector Arrow for Mobile */}
                {!isLast && (
                  <div className="flex lg:hidden justify-center py-1 text-slate-600">
                    <ArrowDown className="w-5 h-5 text-cyan-400 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        /* Layered Tier Breakdown View */
        <div className="space-y-3">
          {nodes.map((node, index) => {
            const IconComp = node.IconComponent;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center ${node.iconColor} shrink-0`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${node.badgeColor}`}>
                        Tier {node.step}
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {node.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {node.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Output: {node.dataOutput}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Selected Node Detailed Inspector */}
      <AnimatePresence mode="wait">
        {activeNode && (
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="p-5 sm:p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/30 space-y-3 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Inspecting Layer: <span className="text-cyan-300">{activeNode.title}</span>
                </h4>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                Protocol: {activeNode.protocol}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeNode.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Primary Data Output
                </div>
                <div className="font-mono text-cyan-300 font-medium">
                  {activeNode.dataOutput}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Layer Architecture Pattern
                </div>
                <div className="font-mono text-purple-300 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  Decoupled Boundary
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

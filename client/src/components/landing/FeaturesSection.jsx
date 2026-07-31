import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Search, Code, ShieldCheck, ArrowUpRight } from 'lucide-react';

const features = [
  {
    title: 'Planner Agent',
    description: 'Breaks complex requests into structured execution plans.',
    icon: Brain,
    category: 'Strategy & Architecture',
    color: 'text-blue-400',
    glow: 'group-hover:shadow-blue-500/10',
    border: 'group-hover:border-blue-500/40',
    bg: 'bg-blue-500/10 border-blue-500/20'
  },
  {
    title: 'Research Agent',
    description: 'Finds technical knowledge, best practices and relevant context.',
    icon: Search,
    category: 'Knowledge & Context',
    color: 'text-amber-400',
    glow: 'group-hover:shadow-amber-500/10',
    border: 'group-hover:border-amber-500/40',
    bg: 'bg-amber-500/10 border-amber-500/20'
  },
  {
    title: 'Developer Agent',
    description: 'Produces high-quality implementation based on previous agent outputs.',
    icon: Code,
    category: 'Execution & Code',
    color: 'text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/10',
    border: 'group-hover:border-emerald-500/40',
    bg: 'bg-emerald-500/10 border-emerald-500/20'
  },
  {
    title: 'Reviewer Agent',
    description: 'Reviews quality, detects issues and improves the final response.',
    icon: ShieldCheck,
    category: 'Audit & Quality',
    color: 'text-purple-400',
    glow: 'group-hover:shadow-purple-500/10',
    border: 'group-hover:border-purple-500/40',
    bg: 'bg-purple-500/10 border-purple-500/20'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function FeaturesSection() {
  return (
    <section id="features" className="relative px-6 py-24 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel text-xs font-semibold text-indigo-300 border border-indigo-500/30 mb-4"
        >
          <span>Autonomous Swarm Architecture</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
        >
          Specialized Agents. Unified Intelligence.
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg text-slate-400"
        >
          Every agent is optimized for a specific role in your engineering pipeline.
        </motion.p>
      </div>

      {/* 4 Feature Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`group p-6 rounded-2xl glass-card border border-slate-800/80 hover:bg-slate-900/60 shadow-xl transition-all duration-300 ${feature.border} ${feature.glow} flex flex-col justify-between`}
            >
              <div>
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-xl ${feature.bg} ${feature.color} border transition-colors`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-500 uppercase tracking-wider">
                    {feature.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-white transition-colors flex items-center justify-between">
                  {feature.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Card Footer Accent */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                <span>Swarm Node</span>
                <span className="font-mono text-emerald-400/90 text-[11px]">Active</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

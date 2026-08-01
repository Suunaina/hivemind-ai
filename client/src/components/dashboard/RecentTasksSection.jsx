import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Loader2, Search, FolderGit2, Trophy, BarChart2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserTasks } from '../../services/taskService';
import EmptyState from '../common/EmptyState';
import { formatDate } from '../../utils/formatDate';
import { getProjectCategoryIcon } from '../../utils/getProjectCategoryIcon';

const calculateTaskProgress = (task) => {
  if (!task) return { percentage: 0, label: 'Not Started', badgeClass: 'bg-slate-500/10 text-slate-400 border-slate-500/20' };

  const ps = task.progressState || {};

  // 1. Stage 1 Milestones Progress (25%)
  const milestones = Array.isArray(ps.milestones) ? ps.milestones : [];
  const s1Completed = milestones.filter((m) => m.completed).length;
  const s1Total = milestones.length || 3;
  const s1Ratio = s1Total > 0 ? s1Completed / s1Total : 0;

  // 2. Stage 2 Concept Cards Progress (25%)
  const viewedCards = Array.isArray(ps.viewedCards) ? ps.viewedCards.length : 0;
  const totalCards = Array.isArray(task.blueprint?.learn) ? task.blueprint.learn.length : 4;
  const s2Ratio = totalCards > 0 ? Math.min(viewedCards / totalCards, 1) : 0;

  // 3. Stage 3 Build Phases Progress (25%)
  const completedPhases = ps.completedPhases || {};
  const s3Completed = Object.values(completedPhases).filter(Boolean).length;
  const s3Total = Array.isArray(task.blueprint?.build) ? task.blueprint.build.length : 5;
  const s3Ratio = s3Total > 0 ? Math.min(s3Completed / s3Total, 1) : 0;

  // 4. Stage 4 Improvement Cards Progress (25%)
  const completedImprove = ps.completedImproveCards || {};
  const s4Completed = Object.values(completedImprove).filter(Boolean).length;
  const s4Total = Array.isArray(task.blueprint?.improve) ? task.blueprint.improve.length : 5;
  const s4Ratio = s4Total > 0 ? Math.min(s4Completed / s4Total, 1) : 0;

  const totalScore = (s1Ratio + s2Ratio + s3Ratio + s4Ratio) / 4;
  const percentage = Math.min(Math.max(Math.round(totalScore * 100), 0), 100);

  if (percentage === 0) {
    return {
      percentage,
      label: 'Not Started',
      badgeClass: 'bg-slate-500/10 text-slate-400 border-slate-500/20'
    };
  } else if (percentage >= 1 && percentage <= 24) {
    return {
      percentage,
      label: 'Getting Started',
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    };
  } else if (percentage >= 25 && percentage <= 49) {
    return {
      percentage,
      label: 'In Progress',
      badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
    };
  } else if (percentage >= 50 && percentage <= 74) {
    return {
      percentage,
      label: 'Halfway There',
      badgeClass: 'bg-purple-500/10 text-purple-300 border-purple-500/20'
    };
  } else if (percentage >= 75 && percentage <= 99) {
    return {
      percentage,
      label: 'Almost Finished',
      badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/20'
    };
  } else {
    return {
      percentage: 100,
      label: 'Completed',
      badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
    };
  }
};

export default function RecentTasksSection() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (isAuthenticated && token) {
        try {
          const res = await getUserTasks(token);
          if (res.success && Array.isArray(res.data)) {
            setTasks(res.data);
          } else {
            setTasks([]);
          }
        } catch {
          setTasks([]);
        }
      } else {
        setTasks([]);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [token, isAuthenticated]);

  // Compute 4 Dashboard Stats from real MongoDB data
  const stats = useMemo(() => {
    if (!tasks || tasks.length === 0) {
      return { total: 0, avgProgress: 0, badges: 0, completionRate: 0 };
    }

    const total = tasks.length;
    let sumProgress = 0;
    let completedCount = 0;

    tasks.forEach((t) => {
      const p = calculateTaskProgress(t).percentage;
      sumProgress += p;
      if (p === 100) completedCount += 1;
    });

    const avgProgress = Math.round(sumProgress / total);
    const completionRate = Math.round((completedCount / total) * 100);

    return {
      total,
      avgProgress,
      badges: completedCount + (avgProgress > 0 ? 1 : 0),
      completionRate
    };
  }, [tasks]);

  // Instant Search Filtering
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    return tasks.filter((t) =>
      (t.prompt || '').toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [tasks, searchQuery]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mb-12 space-y-8"
    >
      {/* ITEM 4: Compact Dashboard Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Blueprints Created</span>
          </div>
          <div className="text-xl font-extrabold text-white font-mono">{stats.total}</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Learning Progress</span>
          </div>
          <div className="text-xl font-extrabold text-purple-300 font-mono">{stats.avgProgress}%</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Achievements</span>
          </div>
          <div className="text-xl font-extrabold text-amber-300 font-mono">{stats.badges} Badges</div>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Completion Rate</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-300 font-mono">{stats.completionRate}%</div>
        </div>
      </div>

      {/* ITEM 2: Renamed Section Header to "Continue Learning" */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Continue Learning</h2>
          <p className="text-xs text-slate-400 mt-0.5">Continue where you left off on your guided engineering blueprints</p>
        </div>

        {/* ITEM 5: Instant Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blueprints..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Modern Tasks Cards Grid */}
      {loading ? (
        <div className="p-8 rounded-2xl glass-card text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
          <span>Loading learning blueprints...</span>
        </div>
      ) : tasks.length === 0 ? (
        <EmptyState
          type="projects"
          title="No Project Blueprints Yet"
          message="You have not created any projects yet. Use the prompt box above to generate your first AI Project Blueprint!"
        />
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          type="search"
          title="No Blueprints Found"
          message={`No blueprints match "${searchQuery}". Try searching with different keywords.`}
          actionLabel="Clear Search Filter"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => {
            const progressInfo = calculateTaskProgress(task);
            const categoryIcon = getProjectCategoryIcon(task.prompt);

            return (
              <motion.div
                key={task._id}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Link
                  to={`/task/${task._id}`}
                  className="group p-5 rounded-2xl glass-card border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between block space-y-4 shadow-lg hover:shadow-purple-500/5"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {/* ITEM 7: Blueprint Category Icon */}
                        <span className="text-xl shrink-0 p-1.5 rounded-xl bg-slate-950 border border-slate-800/80">
                          {categoryIcon}
                        </span>
                        <h3 className="font-semibold text-sm sm:text-base text-slate-200 group-hover:text-purple-200 transition-colors truncate">
                          {task.prompt}
                        </h3>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                    </div>
                  </div>

                  {/* Dynamic Progress Indicator & Status Badge */}
                  <div className="pt-3 border-t border-slate-800/60 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase tracking-wider ${progressInfo.badgeClass}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                        {progressInfo.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-cyan-300">
                        {progressInfo.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar Track */}
                    <div className="w-full h-1.5 rounded-full bg-slate-950 border border-slate-800/80 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressInfo.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 shadow-md shadow-cyan-500/20"
                      />
                    </div>

                    {/* Created Date */}
                    <div className="flex justify-end text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-600" />
                        {formatDate(task.createdAt)}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}

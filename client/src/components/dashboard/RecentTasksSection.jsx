import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserTasks } from '../../services/taskService';

const fallbackTasks = [
  {
    _id: 'task-101',
    prompt: 'Build E-commerce Microservice Architecture',
    status: 'completed',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'task-102',
    prompt: 'Audit Security Vulnerabilities in Auth Middleware',
    status: 'processing',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    _id: 'task-103',
    prompt: 'Optimize React Fiber Rendering Pipeline',
    status: 'failed',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export default function RecentTasksSection() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (isAuthenticated && token) {
        try {
          const res = await getUserTasks(token);
          if (res.success && res.data && res.data.length > 0) {
            setTasks(res.data);
          } else {
            setTasks(fallbackTasks);
          }
        } catch {
          setTasks(fallbackTasks);
        }
      } else {
        setTasks(fallbackTasks);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [token, isAuthenticated]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mb-12"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recent Tasks</h2>
          <p className="text-xs text-slate-400 mt-0.5">Overview of recent multi-agent workspace runs</p>
        </div>
        <Link
          to="/dashboard"
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Modern Tasks Cards Grid */}
      {loading ? (
        <div className="p-8 rounded-2xl glass-card text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
          <span>Loading recent tasks...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Link
                to={`/task/${task._id}`}
                className="group p-5 rounded-2xl glass-card border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between block"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-200 group-hover:text-purple-200 transition-colors line-clamp-1">
                      {task.prompt}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                  {/* Status Badges */}
                  <div className="flex items-center gap-1.5">
                    {task.status === 'completed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Completed
                      </span>
                    )}
                    {task.status === 'processing' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                        In Progress
                      </span>
                    )}
                    {task.status === 'failed' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                        Failed
                      </span>
                    )}
                  </div>

                  {/* Created Time */}
                  <span className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    {formatDate(task.createdAt)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

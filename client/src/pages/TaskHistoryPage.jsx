import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  AlertCircle,
  Sparkles,
  Compass,
  BookOpen,
  Hammer,
  Rocket,
  Server,
  KeyRound,
  ShieldAlert,
  Zap,
  Code2,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import AnimatedBackground from '../components/landing/AnimatedBackground';
import { useAuth } from '../context/AuthContext';
import { getTaskById, unlockAchievement, updateTaskProgress } from '../services/taskService';

// Import refactored Project Blueprint subcomponents
import ProjectSnapshot from '../components/projectBlueprint/ProjectSnapshot';
import StageNavigation from '../components/projectBlueprint/StageNavigation';
import ProgressDashboard from '../components/projectBlueprint/ProgressDashboard';
import UnderstandStage from '../components/projectBlueprint/UnderstandStage';
import LearnStage from '../components/projectBlueprint/LearnStage';
import BuildStage from '../components/projectBlueprint/BuildStage';
import ImproveStage from '../components/projectBlueprint/ImproveStage';
import AskHiveModal from '../components/projectBlueprint/AskHiveModal';
import AchievementsPanel from '../components/projectBlueprint/AchievementsPanel';
import AchievementUnlockedToast from '../components/projectBlueprint/AchievementUnlockedToast';
import ErrorCard from '../components/common/ErrorCard';

export default function TaskHistoryPage() {
  const { taskId, id } = useParams();
  const targetId = taskId || id;
  const { token } = useAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Active Stage Navigation: 'understand', 'learn', 'build', or 'improve'
  const [activeStage, setActiveStage] = useState('understand');
  
  // AI Mentor Floating Modal State
  const [isAskHiveOpen, setIsAskHiveOpen] = useState(false);
  
  // Understand Section State
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  
  // Interactive Milestone Checklist State
  const [milestones, setMilestones] = useState([
    { id: 'm1', text: 'Understand requirements', completed: false },
    { id: 'm2', text: 'Break into smaller tasks', completed: false },
    { id: 'm3', text: 'Decide implementation order', completed: false }
  ]);

  // Sprint 2 Learn Stage Expanded Cards State
  const [expandedCards, setExpandedCards] = useState({});
  // Track set of card IDs that have been expanded at least once
  const [viewedCards, setViewedCards] = useState(new Set());
  
  // Sprint 3 Build Stage Completed Phases State
  const [completedPhases, setCompletedPhases] = useState({});

  // Sprint 4 Improve Stage Completed Cards State & Professional Tips Toggle
  const [completedImproveCards, setCompletedImproveCards] = useState({});
  const [expandedTips, setExpandedTips] = useState({});

  // Sprint 4 Deployment Checklist State
  const [deployChecklist, setDeployChecklist] = useState({
    chk1: false,
    chk2: false,
    chk3: false,
    chk4: false,
    chk5: false,
    chk6: false
  });

  // Achievement Unlock Toast State
  const [unlockedBadgeToast, setUnlockedBadgeToast] = useState(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      const activeToken = token || localStorage.getItem('hivemind_token');
      if (!targetId || !activeToken) {
        setError('Task ID or authentication session missing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const res = await getTaskById(targetId, activeToken);

        if (res.success && res.data) {
          setTask(res.data);
          // Restore progress state from MongoDB if present
          if (res.data.progressState) {
            const ps = res.data.progressState;
            if (ps.activeStage) setActiveStage(ps.activeStage);
            if (Array.isArray(ps.milestones) && ps.milestones.length > 0) setMilestones(ps.milestones);
            if (Array.isArray(ps.viewedCards)) setViewedCards(new Set(ps.viewedCards));
            if (ps.completedPhases) setCompletedPhases(ps.completedPhases);
            if (ps.completedImproveCards) setCompletedImproveCards(ps.completedImproveCards);
            if (ps.expandedTips) setExpandedTips(ps.expandedTips);
            if (ps.deployChecklist) setDeployChecklist(ps.deployChecklist);
          }
        } else {
          setError(res.message || 'Task not found.');
        }
      } catch (err) {
        console.error('Fetch Task Details Error:', err);
        setError(
          err.response?.data?.message || err.message || 'Failed to load project blueprint.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [targetId, token]);

  // Persist progress changes to MongoDB
  useEffect(() => {
    const activeToken = token || localStorage.getItem('hivemind_token');
    if (!targetId || !activeToken || loading || !task) return;

    const timer = setTimeout(async () => {
      try {
        const progressObj = {
          activeStage,
          milestones,
          viewedCards: Array.from(viewedCards),
          completedPhases,
          completedImproveCards,
          expandedTips,
          deployChecklist
        };
        await updateTaskProgress(targetId, progressObj, activeToken);
      } catch (err) {
        console.error('Failed to auto-save progress:', err);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [
    activeStage,
    milestones,
    viewedCards,
    completedPhases,
    completedImproveCards,
    expandedTips,
    deployChecklist,
    targetId,
    token,
    loading,
    task
  ]);

  const toggleMilestone = (id) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const toggleExpandCard = (cardId) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
    setViewedCards((prev) => new Set(prev).add(cardId));
  };

  const togglePhaseComplete = (phaseId) => {
    setCompletedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleImproveCardComplete = (cardId) => {
    setCompletedImproveCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleTipExpand = (cardId) => {
    setExpandedTips((prev) => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const toggleDeployChecklistItem = (chkKey) => {
    setDeployChecklist((prev) => ({
      ...prev,
      [chkKey]: !prev[chkKey]
    }));
  };

  const completedMilestonesCount = milestones.filter((m) => m.completed).length;

  // Calculate Progress Percentage dynamically across all 4 stages
  const calculateProgress = () => {
    if (activeStage === 'understand') {
      return Math.min(45, 25 + completedMilestonesCount * 6.6);
    }
    if (activeStage === 'learn') {
      return Math.min(70, 50 + viewedCards.size * 5);
    }
    if (activeStage === 'build') {
      const completedCount = Object.values(completedPhases).filter(Boolean).length;
      return Math.min(95, 75 + completedCount * 4);
    }
    if (activeStage === 'improve') {
      const completedImproveCount = Object.values(completedImproveCards).filter(Boolean).length;
      return Math.min(100, 85 + completedImproveCount * 3);
    }
    return 100;
  };

  const progressPercentage = calculateProgress();

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

  // Learning Journey Stages Definition
  const journeyStages = [
    {
      id: 'understand',
      number: 1,
      title: 'Understand the Problem',
      icon: Compass,
      emoji: '🧩',
      available: true,
      badge: 'Stage 1'
    },
    {
      id: 'learn',
      number: 2,
      title: 'Learn the Concepts',
      icon: BookOpen,
      emoji: '📚',
      available: true,
      badge: 'Stage 2'
    },
    {
      id: 'build',
      number: 3,
      title: 'Build Step by Step',
      icon: Hammer,
      emoji: '🏗',
      available: true,
      badge: 'Stage 3'
    },
    {
      id: 'improve',
      number: 4,
      title: 'Improve Your Project',
      icon: Rocket,
      emoji: '🚀',
      available: true,
      badge: 'Stage 4'
    }
  ];

  // Dynamic AI Extractor for HiveMind Phase 3
  const blueprintData = useMemo(() => {
    const defaultConcepts = [
      {
        id: 'c1',
        tech: 'Express Routing & Middleware',
        IconComponent: Server,
        iconColor: 'text-cyan-400',
        accentBg: 'bg-cyan-500/10',
        accentBorder: 'border-cyan-500/20',
        readTime: '2 mins read',
        purpose: 'Routes incoming HTTP requests to specific handler functions and executes pre-processing logic.',
        whyNeeded: 'Without routing and middleware, a backend server cannot distinguish between GET/POST requests or perform essential tasks like token verification before executing business logic.',
        beginnerMistake: 'Forgetting to call next() inside custom middleware, causing the client request to hang indefinitely.',
        tinyExample: `app.use((req, res, next) => {\n  console.log('Incoming:', req.method, req.url);\n  next(); // Passes control to next handler\n});`,
        deepDive: 'Middleware functions have access to the request object (req), response object (res), and the next middleware function in the application’s request-response cycle. Calling next() hands off execution to the next matched route layer.'
      },
      {
        id: 'c2',
        tech: 'JSON Web Token (JWT) Security',
        IconComponent: KeyRound,
        iconColor: 'text-amber-400',
        accentBg: 'bg-amber-500/10',
        accentBorder: 'border-amber-500/20',
        readTime: '3 mins read',
        purpose: 'Stateless authentication mechanism for verifying user identity securely across API requests.',
        whyNeeded: 'Allows backend APIs to verify user identity on every request without keeping expensive session state in server memory.',
        beginnerMistake: 'Storing sensitive credentials (like plain passwords or API keys) inside the unencrypted JWT payload.',
        tinyExample: `// Sign token upon user login\nconst token = jwt.sign(\n  { userId: user._id }, \n  process.env.JWT_SECRET, \n  { expiresIn: '1d' }\n);`,
        deepDive: 'A JWT consists of Header, Payload, and Signature. While the payload is Base64URL-encoded (readable by anyone), the cryptographic signature guarantees that the contents cannot be altered without invalidating the token.'
      },
      {
        id: 'c3',
        tech: 'Cryptographic Password Hashing',
        IconComponent: ShieldAlert,
        iconColor: 'text-purple-400',
        accentBg: 'bg-purple-500/10',
        accentBorder: 'border-purple-500/20',
        readTime: '2 mins read',
        purpose: 'One-way cryptographic hashing algorithm with salt rounds for protecting user passwords.',
        whyNeeded: 'Protects user accounts if database records are ever leaked, as original plain text passwords can never be reversed from a bcrypt hash.',
        beginnerMistake: 'Storing plain text passwords directly in database records or using outdated fast hash algorithms like MD5.',
        tinyExample: `// Hash password before saving to DB\nconst salt = await bcrypt.genSalt(10);\nconst hash = await bcrypt.hash(password, salt);`,
        deepDive: 'Bcrypt incorporates salt (random data) to defend against pre-computed rainbow table dictionary attacks. The cost factor determines how many iterations are performed, keeping hashes resilient to hardware brute-forcing.'
      },
      {
        id: 'c4',
        tech: 'Asynchronous Error Handling',
        IconComponent: Zap,
        iconColor: 'text-emerald-400',
        accentBg: 'bg-emerald-500/10',
        accentBorder: 'border-emerald-500/20',
        readTime: '2 mins read',
        purpose: 'Safely catching and forwarding errors in async/await handlers to global error middleware.',
        whyNeeded: 'Prevents Node.js server crashes caused by unhandled promise rejections during database failures or invalid input data.',
        beginnerMistake: 'Omitting try/catch blocks in async route handlers, leaving failed requests stuck pending without error responses.',
        tinyExample: `app.get('/user/:id', async (req, res, next) => {\n  try {\n    const user = await User.findById(req.params.id);\n    res.json(user);\n  } catch (err) {\n    next(err); // Passes error to error handler\n  }\n});`,
        deepDive: 'In Express 4, errors thrown inside async functions must be caught and explicitly passed to next(err) so centralized error handling middleware can log the error and respond with clean HTTP status codes.'
      }
    ];

    const defaultPhases = [
      {
        id: 'p1',
        phaseNumber: 1,
        title: 'Project Setup & Environment Initialization',
        objective: 'Install required dependencies, configure environment variables, and initialize base project structure.',
        estTime: '10 mins',
        difficulty: 'Beginner',
        difficultyColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        files: ['package.json', '.env', 'server.js'],
        snippet: `npm install express mongoose jsonwebtoken bcrypt dotenv cors\ntouch server.js .env`,
        outcome: 'Base server runs on localhost:5000 with environment secrets loaded successfully.',
        defaultTimeMins: 10
      },
      {
        id: 'p2',
        phaseNumber: 2,
        title: 'Build the UI Component Layer',
        objective: 'Implement client forms, authentication inputs, and responsive layout state components.',
        estTime: '15 mins',
        difficulty: 'Intermediate',
        difficultyColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        files: ['LoginForm.jsx', 'DashboardView.jsx', 'BlueprintCard.jsx'],
        snippet: `export function LoginForm({ onSubmit }) {\n  const [email, setEmail] = useState('');\n  return <form onSubmit={(e) => { e.preventDefault(); onSubmit({ email }); }}>...</form>;\n}`,
        outcome: 'React UI components render cleanly with interactive input state handlers.',
        defaultTimeMins: 15
      },
      {
        id: 'p3',
        phaseNumber: 3,
        title: 'Connect Backend / APIs & Auth Routes',
        objective: 'Wire HTTP request handlers, JWT token validation middleware, and database schemas.',
        estTime: '20 mins',
        difficulty: 'Intermediate',
        difficultyColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        files: ['authRoutes.js', 'authMiddleware.js', 'UserSchema.js'],
        snippet: `router.post('/login', async (req, res) => {\n  const { email, password } = req.body;\n  const user = await User.findOne({ email });\n  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);\n  res.json({ success: true, token });\n});`,
        outcome: 'API endpoints return 200 OK responses with signed JWT payloads upon login.',
        defaultTimeMins: 20
      },
      {
        id: 'p4',
        phaseNumber: 4,
        title: 'Polish & End-to-End Testing',
        objective: 'Handle edge-case inputs, verify error boundaries, and test async failure recovery.',
        estTime: '15 mins',
        difficulty: 'Intermediate',
        difficultyColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        files: ['auth.test.js', 'errorHandler.js'],
        snippet: `describe('POST /api/auth/login', () => {\n  it('should return 401 for invalid credentials', async () => {\n    const res = await request(app).post('/api/auth/login').send({ email: 'bad@test.com' });\n    expect(res.status).toBe(401);\n  });\n});`,
        outcome: 'All Jest unit tests pass cleanly with 100% route coverage.',
        defaultTimeMins: 15
      },
      {
        id: 'p5',
        phaseNumber: 5,
        title: 'Deployment & Production Build',
        objective: 'Compile production bundle, configure CORS domain headers, and push to cloud hosting.',
        estTime: '10 mins',
        difficulty: 'Advanced',
        difficultyColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        files: ['vercel.json', 'Dockerfile', 'vite.config.js'],
        snippet: `npm run build\n# Deploy to cloud infrastructure\nvercel --prod`,
        outcome: 'Application deployed live to HTTPS production domain with health checks passing.',
        defaultTimeMins: 10
      }
    ];

    if (!task) {
      return {
        difficulty: 'Intermediate Level',
        difficultyBadgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        estimatedTime: '~35 - 45 Minutes',
        prerequisites: ['JavaScript', 'Express.js', 'Async/Await', 'JSON APIs'],
        outcomes: [
          'Deconstruct project prompts into structured technical goals',
          'Understand prerequisite patterns & data flow boundaries',
          'Formulate a step-by-step implementation order with confidence'
        ],
        learnConceptCards: defaultConcepts,
        buildPhasesData: defaultPhases
      };
    }

    const fullText = [
      task.prompt || '',
      task.plannerOutput || '',
      task.researcherOutput || '',
      task.developerOutput || '',
      task.reviewerOutput || ''
    ].join('\n\n');

    // 1. Difficulty
    let difficulty = 'Intermediate Level';
    let difficultyBadgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    const lowerText = fullText.toLowerCase();
    if (lowerText.includes('advanced') || lowerText.includes('microservice') || lowerText.includes('docker') || lowerText.includes('architecture')) {
      difficulty = 'Advanced Level';
      difficultyBadgeColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';
    } else if (lowerText.includes('beginner') || lowerText.includes('basic') || lowerText.includes('simple') || lowerText.includes('intro')) {
      difficulty = 'Beginner Level';
      difficultyBadgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    }

    // 2. Estimated Time
    let estimatedTime = '~35 - 45 Minutes';
    const timeMatch = fullText.match(/~(\d+)\s*-\s*(\d+)\s*(?:mins|minutes)/i) || fullText.match(/(\d+)\s*(?:mins|minutes)/i);
    if (timeMatch) {
      estimatedTime = timeMatch[2] ? `~${timeMatch[1]} - ${timeMatch[2]} Minutes` : `~${timeMatch[1]} Minutes`;
    }

    // 3. Prerequisites
    const knownTechs = [
      'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'React', 'MongoDB',
      'PostgreSQL', 'Python', 'FastAPI', 'Django', 'JWT', 'Bcrypt', 'Async/Await',
      'JSON APIs', 'REST API', 'GraphQL', 'Tailwind', 'Docker', 'Redis', 'HTML/CSS'
    ];
    const foundTechs = knownTechs.filter((tech) =>
      new RegExp(`\\b${tech.replace('/', '\\/')}\\b`, 'i').test(fullText)
    );
    const prerequisites = foundTechs.length >= 2
      ? foundTechs.slice(0, 4)
      : ['JavaScript', 'Express.js', 'Async/Await', 'JSON APIs'];

    // 4. Outcomes
    let outcomes = [];
    const lines = fullText.split('\n');
    lines.forEach((line) => {
      const trimmed = line.replace(/^[#*\-•\d.\s]+/, '').trim();
      if (
        outcomes.length < 3 &&
        trimmed.length > 20 &&
        (line.startsWith('-') || line.startsWith('*') || /^\d+\./.test(line)) &&
        !trimmed.toLowerCase().includes('http') &&
        !outcomes.includes(trimmed)
      ) {
        outcomes.push(trimmed);
      }
    });

    if (outcomes.length < 3) {
      outcomes = [
        'Deconstruct project prompts into structured technical goals',
        'Understand prerequisite patterns & data flow boundaries',
        'Formulate a step-by-step implementation order with confidence'
      ];
    }

    // 5. Dynamic Build Phases
    const parsedPhases = [];
    const stepBlocks = (task.developerOutput || task.plannerOutput || '').split(/(?=###?\s*(?:Step|Phase|\d+\.))/i);

    stepBlocks.forEach((block, index) => {
      if (parsedPhases.length >= 5) return;
      const bLines = block.trim().split('\n').filter(Boolean);
      if (bLines.length < 2) return;

      const titleLine = bLines[0].replace(/^[#*\d.\s]+/, '').replace(/^(Step|Phase)\s*\d+[:\-]?\s*/i, '').trim();
      const codeBlockMatch = block.match(/```(?:js|jsx|ts|bash|sh|json)?\n([\s\S]*?)\n```/);
      const fileMatches = [...block.matchAll(/\b([\w-]+\.(?:jsx?|tsx?|json|env|py|css|html))\b/g)].map((m) => m[1]);
      const uniqueFiles = Array.from(new Set(fileMatches)).slice(0, 3);

      if (titleLine.length > 5) {
        parsedPhases.push({
          id: `p_dyn_${index + 1}`,
          phaseNumber: index + 1,
          title: titleLine.length > 60 ? titleLine.substring(0, 57) + '...' : titleLine,
          objective: bLines.slice(1, 3).join(' ').replace(/^[#*\d.\s]+/, '').substring(0, 160) || 'Implement key module components and wire handlers.',
          estTime: `~${10 + index * 5} mins`,
          difficulty: index === 0 ? 'Beginner' : index < 4 ? 'Intermediate' : 'Advanced',
          difficultyColor: index === 0 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : index < 4 ? 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' : 'text-purple-400 bg-purple-500/10 border-purple-500/20',
          files: uniqueFiles.length > 0 ? uniqueFiles : defaultPhases[index]?.files || ['index.js'],
          snippet: codeBlockMatch ? codeBlockMatch[1].trim() : defaultPhases[index]?.snippet || '// Implementation reference',
          outcome: `Module step ${index + 1} verifies cleanly with expected response headers.`,
          defaultTimeMins: 10 + index * 5
        });
      }
    });

    const buildPhasesData = parsedPhases.length >= 3 ? parsedPhases : defaultPhases;

    return {
      difficulty,
      difficultyBadgeColor,
      estimatedTime,
      prerequisites,
      outcomes,
      learnConceptCards: defaultConcepts,
      buildPhasesData
    };
  }, [task]);

  // 1. Snapshot Data binding with fallback
  const snapshotData = useMemo(() => {
    if (task?.blueprint?.snapshot) {
      const snap = task.blueprint.snapshot;
      let badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      if ((snap.difficulty || '').toLowerCase().includes('advanced')) {
        badgeColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';
      } else if ((snap.difficulty || '').toLowerCase().includes('beginner')) {
        badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      }
      return {
        difficulty: snap.difficulty || 'Intermediate Level',
        difficultyBadgeColor: badgeColor,
        estimatedTime: snap.estimatedTime || '~35 - 45 Minutes',
        prerequisites: Array.isArray(snap.prerequisites) && snap.prerequisites.length > 0 ? snap.prerequisites : ['JavaScript', 'Express.js', 'Async/Await', 'JSON APIs'],
        outcomes: Array.isArray(snap.outcomes) && snap.outcomes.length > 0 ? snap.outcomes : [
          'Deconstruct project prompts into structured technical goals',
          'Understand prerequisite patterns & data flow boundaries',
          'Formulate a step-by-step implementation order with confidence'
        ]
      };
    }
    return blueprintData || {
      difficulty: 'Intermediate Level',
      difficultyBadgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      estimatedTime: '~35 - 45 Minutes',
      prerequisites: ['JavaScript', 'Express.js', 'Async/Await', 'JSON APIs'],
      outcomes: [
        'Deconstruct project prompts into structured technical goals',
        'Understand prerequisite patterns & data flow boundaries',
        'Formulate a step-by-step implementation order with confidence'
      ]
    };
  }, [task, blueprintData]);

  // 2. Stage 1 (Understand) Data binding with fallback
  const understandData = useMemo(() => {
    if (task?.blueprint?.understand) {
      const u = task.blueprint.understand;
      return {
        summary: u.summary || 'Deconstruct project prompts into structured technical goals.',
        conceptBreakdown: u.conceptBreakdown || task?.plannerOutput || '',
        milestones: Array.isArray(u.milestones) && u.milestones.length > 0 ? u.milestones : [
          'Identify input parameters and data structures',
          'Design modular route handlers and validation logic',
          'Verify error boundaries and unexpected payloads'
        ],
        glossary: Array.isArray(u.glossary) && u.glossary.length > 0 ? u.glossary : [
          { term: 'REST API', def: 'Representational State Transfer protocol for client-server communication.' },
          { term: 'Middleware', def: 'Functions with access to request and response objects in execution pipelines.' },
          { term: 'Stateless Auth', def: 'Authentication where servers do not persist session state between HTTP requests.' }
        ]
      };
    }
    return {
      summary: 'Deconstruct project prompts into structured technical goals.',
      conceptBreakdown: task?.plannerOutput || '',
      milestones: [
        'Identify input parameters and data structures',
        'Design modular route handlers and validation logic',
        'Verify error boundaries and unexpected payloads'
      ],
      glossary: [
        { term: 'REST API', def: 'Representational State Transfer protocol for client-server communication.' },
        { term: 'Middleware', def: 'Functions with access to request and response objects in execution pipelines.' },
        { term: 'Stateless Auth', def: 'Authentication where servers do not persist session state between HTTP requests.' }
      ]
    };
  }, [task]);

  // 3. Stage 2 (Learn) Concept Cards Data binding with fallback
  const learnConceptCards = useMemo(() => {
    if (Array.isArray(task?.blueprint?.learn) && task.blueprint.learn.length > 0) {
      const icons = [Server, KeyRound, ShieldAlert, Zap, Code2];
      const colors = [
        { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
        { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
      ];

      return task.blueprint.learn.slice(0, 4).map((item, idx) => {
        const theme = colors[idx % colors.length];
        return {
          id: `c_bp_${idx + 1}`,
          tech: item.title || item.tech || `Core Concept ${idx + 1}`,
          IconComponent: icons[idx % icons.length],
          iconColor: theme.text,
          accentBg: theme.bg,
          accentBorder: theme.border,
          readTime: `${2 + (idx % 2)} mins read`,
          purpose: item.whatIsIt || item.purpose || 'Core technology purpose.',
          whyNeeded: item.whyNeeded || 'Why this project relies on this technology.',
          beginnerMistake: item.beginnerTip || item.beginnerMistake || 'Common beginner pitfall to avoid.',
          tinyExample: item.example || item.tinyExample || '// Concept code snippet',
          deepDive: item.learnMore || item.deepDive || 'Technical deep dive background.'
        };
      });
    }
    return blueprintData ? blueprintData.learnConceptCards : [];
  }, [task, blueprintData]);

  // 4. Stage 3 (Build) Phase Cards Data binding with fallback
  const buildPhasesData = useMemo(() => {
    if (Array.isArray(task?.blueprint?.build) && task.blueprint.build.length > 0) {
      return task.blueprint.build.slice(0, 5).map((item, idx) => {
        const diff = item.difficulty || (idx === 0 ? 'Beginner' : idx < 4 ? 'Intermediate' : 'Advanced');
        let diffColor = 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20';
        if (diff.toLowerCase().includes('beginner')) diffColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        if (diff.toLowerCase().includes('advanced')) diffColor = 'text-purple-400 bg-purple-500/10 border-purple-500/20';

        return {
          id: `p_bp_${idx + 1}`,
          phaseNumber: item.phase || item.phaseNumber || (idx + 1),
          title: item.title || `Phase ${idx + 1}`,
          objective: item.objective || 'Phase objective...',
          estTime: item.estimatedTime || item.estTime || `${10 + idx * 5} mins`,
          difficulty: diff,
          difficultyColor: diffColor,
          files: Array.isArray(item.files) && item.files.length > 0 ? item.files : ['index.js'],
          snippet: item.snippet || '// Phase step implementation',
          outcome: item.expectedOutcome || item.outcome || 'Phase verification complete.',
          defaultTimeMins: 10 + idx * 5
        };
      });
    }
    return blueprintData ? blueprintData.buildPhasesData : [];
  }, [task, blueprintData]);

  // 5. Stage 4 (Improve) Improvement Cards Data binding with fallback
  const improvementCards = useMemo(() => {
    if (Array.isArray(task?.blueprint?.improve) && task.blueprint.improve.length > 0) {
      const icons = [Zap, ShieldCheck, CheckCircle, Rocket, ShieldAlert];
      const themes = [
        { badge: 'Performance Audit', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
        { badge: 'Security Audit', text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
        { badge: 'Quality Assurance', text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
        { badge: 'Usability Audit', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
        { badge: 'DevOps & CI/CD', text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
      ];

      return task.blueprint.improve.slice(0, 5).map((item, idx) => {
        const theme = themes[idx % themes.length];
        return {
          id: `imp_${idx + 1}`,
          category: theme.badge,
          title: item.title || `Improvement ${idx + 1}`,
          IconComponent: icons[idx % icons.length],
          iconColor: theme.text,
          accentBg: theme.bg,
          accentBorder: theme.border,
          whyNeeded: item.whyImportant || item.whyNeeded || 'Why this improvement matters.',
          tips: Array.isArray(item.tips) && item.tips.length > 0 ? item.tips : ['Tip 1', 'Tip 2', 'Tip 3'],
          beginnerMistake: item.beginnerMistake || 'Common mistake to avoid.',
          proTip: item.professionalTip || item.proTip || 'Senior developer advice.'
        };
      });
    }

    return [
      {
        id: 'imp1',
        category: 'Performance Audit',
        title: '⚡ Performance & Latency Optimization',
        IconComponent: Zap,
        iconColor: 'text-amber-400',
        accentBg: 'bg-amber-500/10',
        accentBorder: 'border-amber-500/20',
        whyNeeded: 'Unoptimized backend queries and large payload bundles slow down page load times and waste server resources.',
        tips: [
          'Implement Redis in-memory caching for frequent read queries.',
          'Use Gzip compression middleware on API responses.',
          'Optimize database queries by selecting only required fields.'
        ],
        beginnerMistake: 'Executing database queries inside loops (the N+1 query problem) instead of bulk fetching.',
        proTip: 'Always benchmark API response latency under concurrent load before attempting micro-optimizations.'
      },
      {
        id: 'imp2',
        category: 'Security Audit',
        title: '🔒 Hardening & Authentication Security',
        IconComponent: ShieldCheck,
        iconColor: 'text-cyan-400',
        accentBg: 'bg-cyan-500/10',
        accentBorder: 'border-cyan-500/20',
        whyNeeded: 'Exposing unvalidated input parameters or secrets creates critical vulnerabilities like SQL/NoSQL injection and token theft.',
        tips: [
          'Sanitize and validate all incoming request bodies using Joi or Zod schemas.',
          'Store all secrets strictly in .env files and add .env to .gitignore.',
          'Implement express-rate-limit to mitigate brute-force authentication attacks.'
        ],
        beginnerMistake: 'Committing environment files containing live API keys or JWT secrets to Git repositories.',
        proTip: 'Set HttpOnly and SameSite flags on authentication cookies to prevent XSS script access to tokens.'
      },
      {
        id: 'imp3',
        category: 'Quality Assurance',
        title: '🧪 Automated Unit & Integration Testing',
        IconComponent: CheckCircle,
        iconColor: 'text-purple-400',
        accentBg: 'bg-purple-500/10',
        accentBorder: 'border-purple-500/20',
        whyNeeded: 'Manual testing fails to catch regressions as codebase complexity grows over time.',
        tips: [
          'Write Jest/Supertest suite for critical API auth endpoints (login, register, logout).',
          'Test error boundaries to ensure 400 Bad Request responses return clear error messages.',
          'Mock third-party API dependencies during unit tests.'
        ],
        beginnerMistake: 'Testing against live production databases during automated CI test suite execution.',
        proTip: 'Strive for high test coverage on core business logic rather than aiming for 100% superficial coverage.'
      },
      {
        id: 'imp4',
        category: 'Usability Audit',
        title: '♿ Accessibility & UX Polish',
        IconComponent: ShieldCheck,
        iconColor: 'text-emerald-400',
        accentBg: 'bg-emerald-500/10',
        accentBorder: 'border-emerald-500/20',
        whyNeeded: 'Ensures the user interface is accessible to all users including keyboard-only and screen reader navigation.',
        tips: [
          'Ensure all interactive form inputs have explicit label associations and ARIA roles.',
          'Maintain high contrast ratios for text elements against dark background cards.',
          'Provide clear visual loading spinners and disable submit buttons during network requests.'
        ],
        beginnerMistake: 'Relying solely on color to indicate form validation errors without clear descriptive text.',
        proTip: 'Test your application using keyboard-only Tab navigation to catch focus traps early.'
      },
      {
        id: 'imp5',
        category: 'DevOps & CI/CD',
        title: '🚀 Deployment & Production Readiness',
        IconComponent: Rocket,
        iconColor: 'text-blue-400',
        accentBg: 'bg-blue-500/10',
        accentBorder: 'border-blue-500/20',
        whyNeeded: 'Guarantees seamless automated builds, zero-downtime deployments, and clean environment isolation.',
        tips: [
          'Configure CORS headers to allow requests only from trusted production domains.',
          'Set up GitHub Actions to automatically run linter and unit tests on pull requests.',
          'Include health check route /api/health to monitor server uptime.'
        ],
        beginnerMistake: 'Deploying development builds with verbose console logs and debug endpoints enabled.',
        proTip: 'Use environment staging environments to validate production builds before pushing to live domain routes.'
      }
    ];
  }, [task]);

  // Stage 1 Completion Check
  const isStage1Complete = milestones && milestones.length > 0 && milestones.every((m) => m.completed);

  // Stage 2 Concept Cards Completion Check
  const isStage2Complete = learnConceptCards.length > 0 && viewedCards.size >= learnConceptCards.length;

  // Stage 3 Build Phase Stats Calculation
  const completedBuildPhasesCount = Object.values(completedPhases).filter(Boolean).length;
  const totalBuildPhases = buildPhasesData.length;
  const isBuildComplete = totalBuildPhases > 0 && completedBuildPhasesCount === totalBuildPhases;
  const buildProgressPercentage = totalBuildPhases > 0 ? Math.round((completedBuildPhasesCount / totalBuildPhases) * 100) : 0;

  const remainingBuildTimeMins = buildPhasesData
    .filter((p) => !completedPhases[p.id])
    .reduce((acc, p) => acc + p.defaultTimeMins, 0);

  // Stage 4 Professional Polish Stats & Completion Check
  const completedImproveCount = Object.values(completedImproveCards).filter(Boolean).length;
  const totalImproveCards = improvementCards.length;
  const isAllImproveCompleted = totalImproveCards > 0 && completedImproveCount === totalImproveCards;
  const improveProgressPercentage = totalImproveCards > 0 ? Math.round((completedImproveCount / totalImproveCards) * 100) : 0;

  // Automatic achievement unlock effect (declared safely after completion booleans)
  useEffect(() => {
    const activeToken = token || localStorage.getItem('hivemind_token');
    if (!activeToken) return;

    const checkAndUnlock = async (badgeId) => {
      try {
        const res = await unlockAchievement(badgeId, activeToken);
        if (res.success && res.isNewUnlock && res.data?.badge) {
          setUnlockedBadgeToast(res.data.badge);
        }
      } catch (err) {
        console.error('Failed to unlock badge:', err);
      }
    };

    if (isStage1Complete) checkAndUnlock('architecture_explorer');
    if (isStage2Complete) checkAndUnlock('concept_master');
    if (isBuildComplete) checkAndUnlock('builder');
    if (isAllImproveCompleted) checkAndUnlock('production_ready');
  }, [isStage1Complete, isStage2Complete, isBuildComplete, isAllImproveCompleted, token]);

  return (
    <div className="min-h-screen relative flex flex-col selection:bg-purple-500/30 selection:text-purple-200">
      <AnimatedBackground />
      <DashboardNavbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full z-10">
        {/* Top Back Navigation & Page Identifier */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            Project Blueprint
          </span>
        </div>

        {/* Loading Spinner State */}
        {loading && (
          <div className="min-h-[400px] flex flex-col justify-center items-center gap-4 glass-panel rounded-3xl p-12 border border-slate-800/80 shadow-2xl">
            <div className="relative flex items-center justify-center">
              <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <Sparkles className="w-6 h-6 text-cyan-400 absolute animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-semibold text-slate-200">Loading Project Blueprint</h3>
              <p className="text-xs text-slate-400">Preparing your guided learning experience...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <ErrorCard
            errorType="generic"
            title="Unable to Load Blueprint"
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {/* Main Project Blueprint View */}
        {!loading && !error && task && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* SECTION 1: PROJECT SNAPSHOT HEADER */}
            <ProjectSnapshot
              task={task}
              snapshotData={snapshotData}
              formatDate={formatDate}
            />

            {/* SECTION 2: LEARNING JOURNEY NAVIGATION (STAGE TABS) */}
            <StageNavigation
              journeyStages={journeyStages}
              activeStage={activeStage}
              setActiveStage={setActiveStage}
            />

            {/* LEARNING PROGRESS DASHBOARD */}
            <ProgressDashboard
              progressPercentage={progressPercentage}
              activeStage={activeStage}
              completedMilestonesCount={completedMilestonesCount}
              isStage2Complete={isStage2Complete}
              isBuildComplete={isBuildComplete}
            />

            {/* STAGE 1 CONTENT: UNDERSTAND THE PROBLEM */}
            {activeStage === 'understand' && (
              <UnderstandStage
                task={task}
                understandData={understandData}
                milestones={milestones}
                toggleMilestone={toggleMilestone}
                isArchitectureOpen={isArchitectureOpen}
                setIsArchitectureOpen={setIsArchitectureOpen}
                isGlossaryOpen={isGlossaryOpen}
                setIsGlossaryOpen={setIsGlossaryOpen}
                setActiveStage={setActiveStage}
              />
            )}

            {/* STAGE 2 CONTENT: LEARN THE CONCEPTS */}
            {activeStage === 'learn' && (
              <LearnStage
                learnConceptCards={learnConceptCards}
                expandedCards={expandedCards}
                toggleExpandCard={toggleExpandCard}
                viewedCards={viewedCards}
                isStage2Complete={isStage2Complete}
                setActiveStage={setActiveStage}
              />
            )}

            {/* STAGE 3 CONTENT: BUILD YOUR PROJECT */}
            {activeStage === 'build' && (
              <BuildStage
                buildPhasesData={buildPhasesData}
                completedPhases={completedPhases}
                togglePhaseComplete={togglePhaseComplete}
                completedBuildPhasesCount={completedBuildPhasesCount}
                totalBuildPhases={totalBuildPhases}
                buildProgressPercentage={buildProgressPercentage}
                remainingBuildTimeMins={remainingBuildTimeMins}
                isBuildComplete={isBuildComplete}
                setActiveStage={setActiveStage}
              />
            )}

            {/* STAGE 4 CONTENT: PROFESSIONAL POLISH */}
            {activeStage === 'improve' && (
              <ImproveStage
                improvementCards={improvementCards}
                completedImproveCards={completedImproveCards}
                toggleImproveCardComplete={toggleImproveCardComplete}
                expandedTips={expandedTips}
                toggleTipExpand={toggleTipExpand}
                deployChecklist={deployChecklist}
                toggleDeployChecklistItem={toggleDeployChecklistItem}
                completedImproveCount={completedImproveCount}
                totalImproveCards={totalImproveCards}
                improveProgressPercentage={improveProgressPercentage}
                progressPercentage={progressPercentage}
                isAllImproveCompleted={isAllImproveCompleted}
              />
            )}

            {/* STUDENT SKILL TREE & ACHIEVEMENTS PANEL */}
            <div className="pt-6 border-t border-slate-800/80">
              <AchievementsPanel />
            </div>
          </motion.div>
        )}
      </main>

      {/* Achievement Unlocked Toast Notification */}
      <AchievementUnlockedToast
        badge={unlockedBadgeToast}
        onClose={() => setUnlockedBadgeToast(null)}
      />

      {/* Floating Ask Hive AI Mentor Button */}
      {!loading && !error && task && (
        <button
          type="button"
          onClick={() => setIsAskHiveOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 via-cyan-600 to-emerald-500 hover:from-purple-500 hover:to-emerald-400 text-white font-bold text-xs shadow-2xl shadow-purple-600/40 border border-white/20 transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95 cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm group-hover:rotate-12 transition-transform">
            💬
          </div>
          <span>Ask Hive</span>
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
        </button>
      )}

      {/* Ask Hive AI Mentor Modal */}
      <AskHiveModal
        isOpen={isAskHiveOpen}
        onClose={() => setIsAskHiveOpen(false)}
        task={task}
        activeStage={activeStage}
        token={token}
      />
    </div>
  );
}

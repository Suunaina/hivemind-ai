import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Compass,
  BookOpen,
  Hammer,
  Rocket,
  ChevronDown,
  ChevronUp,
  Lock,
  BarChart2,
  Award,
  Check,
  Copy,
  Brain,
  HelpCircle,
  FileText,
  Code2,
  Server,
  KeyRound,
  ShieldAlert,
  Zap,
  Lightbulb,
  ExternalLink,
  Trophy,
  ArrowRight,
  FolderGit2,
  CheckSquare,
  Play,
  ShieldCheck,
  Eye,
  CheckCircle,
  Activity,
  ZapOff
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';
import AnimatedBackground from '../components/landing/AnimatedBackground';
import { useAuth } from '../context/AuthContext';
import { getTaskById } from '../services/taskService';


export default function TaskHistoryPage() {
  const { taskId, id } = useParams();
  const targetId = taskId || id;
  const { token } = useAuth();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Active Stage Navigation: 'understand', 'learn', or 'build'
  const [activeStage, setActiveStage] = useState('understand');
  
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

  // Show notification toasts
  const [showBuildToast, setShowBuildToast] = useState(false);
  const [showImproveToast, setShowImproveToast] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (!targetId || !token) {
        setError('Task ID or authentication session missing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const res = await getTaskById(targetId, token);

        if (res.success && res.data) {
          setTask(res.data);
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

  // Learning Journey Stages Definition (All 4 Stages Available in Sprint 4!)
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
  const blueprintData = React.useMemo(() => {
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
  const snapshotData = React.useMemo(() => {
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
  const understandData = React.useMemo(() => {
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
  const learnConceptCards = React.useMemo(() => {
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
  const buildPhasesData = React.useMemo(() => {
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
  const improvementCards = React.useMemo(() => {
    if (Array.isArray(task?.blueprint?.improve) && task.blueprint.improve.length > 0) {
      const icons = [Zap, ShieldCheck, CheckCircle, Eye, Rocket];
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
        IconComponent: Eye,
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

  // All concept cards viewed check for Stage 2 Completion Banner
  const isStage2Complete = viewedCards.size >= learnConceptCards.length;

  // Build Phase Stats Calculation
  const completedBuildPhasesCount = Object.values(completedPhases).filter(Boolean).length;
  const totalBuildPhases = buildPhasesData.length;
  const isBuildComplete = completedBuildPhasesCount === totalBuildPhases;
  const buildProgressPercentage = Math.round((completedBuildPhasesCount / totalBuildPhases) * 100);

  const remainingBuildTimeMins = buildPhasesData
    .filter((p) => !completedPhases[p.id])
    .reduce((acc, p) => acc + p.defaultTimeMins, 0);

  // Stage 4 Professional Polish Stats & Completion Check
  const completedImproveCount = Object.values(completedImproveCards).filter(Boolean).length;
  const totalImproveCards = improvementCards.length;
  const isAllImproveCompleted = completedImproveCount === totalImproveCards;
  const improveProgressPercentage = Math.round((completedImproveCount / totalImproveCards) * 100);

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
            Project Blueprint v3.0
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
          <div className="p-8 rounded-3xl glass-panel border border-red-500/30 text-center max-w-lg mx-auto my-12 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4 text-red-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 mb-2">Unable to Load Blueprint</h2>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">{error}</p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/25 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </Link>
          </div>
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
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

              {/* Title & Badge Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Project Blueprint
                  </span>
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400">
                    ID: {task._id}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Created: {formatDate(task.createdAt)}</span>
                </div>
              </div>

              {/* Project Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug mb-6">
                {task.prompt}
              </h1>

              {/* Metadata Snapshot Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                {/* Difficulty */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <BarChart2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Difficulty
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className={`text-xs font-bold ${snapshotData.difficultyBadgeColor ? snapshotData.difficultyBadgeColor.split(' ')[0] : 'text-amber-300'}`}>
                        {snapshotData.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Estimated Time */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Estimated Time
                    </div>
                    <div className="text-xs font-bold text-slate-200 mt-0.5">
                      {snapshotData.estimatedTime}
                    </div>
                  </div>
                </div>

                {/* Prerequisites */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Prerequisites
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {snapshotData.prerequisites.map((chip) => (
                        <span
                          key={chip}
                          className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-700/80 text-[11px] font-mono text-purple-300"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* By the end you'll be able to... */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  By the end you'll be able to:
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
                  {snapshotData.outcomes.slice(0, 3).map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SECTION 2: LEARNING JOURNEY NAVIGATION (STAGE TABS) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Learning Journey Flow
                </h2>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  {activeStage === 'understand' ? 'Stage 1 Active' : activeStage === 'learn' ? 'Stage 2 Active' : 'Stage 3 Active'}
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
                          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isCurrent
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                              : 'bg-slate-900 text-slate-500 border border-slate-800'
                          }`}>
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

            {/* SPRINT 2.5: LEARNING PROGRESS DASHBOARD */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
              {/* 1. Animated Project Progress Bar */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Project Progress
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                      {progressPercentage}%
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Stage {activeStage === 'understand' ? 1 : activeStage === 'learn' ? 2 : 3} of 4
                    </span>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div className="h-3 rounded-full bg-slate-950/80 border border-slate-800/90 overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 shadow-md shadow-cyan-500/20"
                  />
                </div>
              </div>

              {/* 2. Stage Tracker */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Stage Progress Tracker
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {[
                    {
                      name: '1. Understand',
                      completed: activeStage === 'learn' || activeStage === 'build' || completedMilestonesCount === 3,
                      current: activeStage === 'understand'
                    },
                    {
                      name: '2. Learn',
                      completed: activeStage === 'build' || isStage2Complete,
                      current: activeStage === 'learn'
                    },
                    {
                      name: '3. Build',
                      completed: isBuildComplete,
                      current: activeStage === 'build'
                    },
                    {
                      name: '4. Improve',
                      completed: false,
                      current: false
                    }
                  ].map((s) => (
                    <div
                      key={s.name}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium ${
                        s.completed
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : s.current
                          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200 ring-1 ring-cyan-500/30 shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      {s.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : s.current ? (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                      <span className="truncate">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Learning Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 border-t border-slate-800/80">
                {/* Stat 1 */}
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Concepts
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      4 Prerequisite Cards
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Estimated Time
                    </div>
                    <div className="text-xs font-bold text-white mt-0.5">
                      9 Mins Total Read
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Completion
                    </div>
                    <div className="text-xs font-bold text-emerald-300 mt-0.5">
                      {progressPercentage}% Mastered
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2 Completion Banner */}
            <AnimatePresence>
              {isStage2Complete && activeStage === 'learn' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 sm:p-7 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-slate-950 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-2xl shrink-0">
                      🎉
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                        Great job!
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        You're ready to begin building your project. You've explored every concept card.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStage('build')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer"
                  >
                    <span>Continue to Build Stage</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toast Feedback */}
            <AnimatePresence>
              {showImproveToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 rounded-2xl bg-slate-900 border border-purple-500/40 text-xs text-purple-300 flex items-center justify-between gap-4 shadow-xl"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Build Complete! Stage 4 (Improve Your Project) will unlock in the upcoming release.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowImproveToast(false)}
                    className="text-slate-400 hover:text-white font-bold"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 1 CONTENT: UNDERSTAND THE PROBLEM */}
            {activeStage === 'understand' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stage Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
                    🧩
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Stage 1: Understand the Problem
                    </h2>
                    <p className="text-xs text-slate-400">
                      Grasp the core objective, explore task requirements, and prepare your mental model.
                    </p>
                  </div>
                </div>

                {/* Objective Summary Card */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    Objective Summary
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {understandData.summary}
                  </p>
                </div>

                {/* Beginner-Friendly Explanation Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white tracking-tight">
                        Beginner-Friendly Concept Breakdown
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px] font-semibold uppercase tracking-wider">
                      Educational Scaffolding
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800/90 text-sm text-slate-300 leading-relaxed overflow-x-auto">
                    {task.plannerOutput ? (
                      <div className="prose prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-xl prose-headings:text-slate-100 prose-headings:font-bold prose-p:text-slate-300 prose-a:text-cyan-400 prose-code:text-cyan-300 prose-code:bg-cyan-950/40 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-strong:text-white">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {task.plannerOutput}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        Break down the task into simple steps: 1) Identify input parameters, 2) Process logic securely, 3) Return expected output.
                      </p>
                    )}
                  </div>
                </div>

                {/* Three Milestone Checklist Card */}
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        Milestone Readiness Checklist
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Check off each step as you prepare your understanding before building.
                      </p>
                    </div>
                    <div className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-semibold">
                      {completedMilestonesCount} of {milestones.length} Completed
                    </div>
                  </div>

                  <div className="space-y-3">
                    {milestones.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleMilestone(m.id)}
                        className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border transition-all text-left group active:scale-[0.99] ${
                          m.completed
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                          m.completed
                            ? 'bg-emerald-500 text-slate-950 font-bold'
                            : 'border-2 border-slate-700 group-hover:border-emerald-400'
                        }`}>
                          {m.completed && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <span className={`text-sm font-medium ${m.completed ? 'line-through opacity-80' : 'text-slate-200'}`}>
                          {m.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* EXPANDABLE SECTION 1: SYSTEM ARCHITECTURE */}
                <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsArchitectureOpen((prev) => !prev)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📐</span>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                          View System Architecture
                        </h3>
                        <p className="text-xs text-slate-400">
                          Explore the high-level data flow and component layout.
                        </p>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                      {isArchitectureOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isArchitectureOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-800/80 p-6 sm:p-8 bg-slate-950/60"
                      >
                        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-mono">
                            Architecture Schema Placeholder
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-3 py-6 font-mono text-xs text-slate-300">
                            <div className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-bold text-cyan-300">
                              [ Client Request ]
                            </div>
                            <span className="text-cyan-400">───►</span>
                            <div className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-bold text-purple-300">
                              [ API Router / Middleware ]
                            </div>
                            <span className="text-purple-400">───►</span>
                            <div className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 font-bold text-emerald-300">
                              [ Controller / Data Service ]
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                            System Architecture diagram preview will render in upcoming updates. This visual map helps you trace how data travels from initial request to storage.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* EXPANDABLE SECTION 2: FULL GLOSSARY */}
                <div className="glass-panel rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setIsGlossaryOpen((prev) => !prev)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📖</span>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">
                          View Full Glossary
                        </h3>
                        <p className="text-xs text-slate-400">
                          Reference key Computer Science terms and definitions.
                        </p>
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
                      {isGlossaryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isGlossaryOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-800/80 p-6 sm:p-8 bg-slate-950/60"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {understandData.glossary.map((item, idx) => (
                            <div
                              key={item.term || idx}
                              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5"
                            >
                              <div className="text-xs font-bold text-purple-300 font-mono">
                                {item.term}
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed">
                                {item.def}
                              </p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* STAGE 2 CONTENT: LEARN THE CONCEPTS */}
            {activeStage === 'learn' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stage Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-xl">
                    📚
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Stage 2: Learn the Concepts
                    </h2>
                    <p className="text-xs text-slate-400">
                      Master core technologies, essential patterns, and avoid common beginner traps before building.
                    </p>
                  </div>
                </div>

                {/* 4 Learning Concept Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {learnConceptCards.map((card, idx) => {
                    const IconComp = card.IconComponent;
                    const isExpanded = !!expandedCards[card.id];

                    return (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/90 shadow-2xl flex flex-col justify-between hover:border-slate-700/80 transition-all group"
                      >
                        {/* Card Top Row */}
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-2xl ${card.accentBg} ${card.accentBorder} border flex items-center justify-center ${card.iconColor} shrink-0`}>
                                <IconComp className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-amber-200 transition-colors">
                                  {card.tech}
                                </h3>
                                <span className="text-[10px] font-mono text-slate-400">
                                  Prerequisite Concept #{idx + 1}
                                </span>
                              </div>
                            </div>

                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono font-medium text-amber-300 shrink-0">
                              <Clock className="w-3 h-3 text-amber-400" />
                              {card.readTime}
                            </span>
                          </div>

                          {/* Purpose */}
                          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">
                              Purpose
                            </div>
                            <p className="text-xs text-slate-200 leading-relaxed">
                              {card.purpose}
                            </p>
                          </div>

                          {/* Why do we need it? */}
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                              Why Do We Need It?
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {card.whyNeeded}
                            </p>
                          </div>

                          {/* Common Beginner Mistake */}
                          <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Common Beginner Mistake
                            </div>
                            <p className="text-xs text-red-200/90 leading-relaxed font-sans">
                              {card.beginnerMistake}
                            </p>
                          </div>

                          {/* Tiny Code Example */}
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <Code2 className="w-3.5 h-3.5 text-purple-400" />
                              Tiny Code Example
                            </div>
                            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 overflow-x-auto leading-relaxed">
                              <code>{card.tinyExample}</code>
                            </pre>
                          </div>
                        </div>

                        {/* Card Bottom */}
                        <div className="pt-4 mt-5 border-t border-slate-800/80">
                          <button
                            type="button"
                            onClick={() => toggleExpandCard(card.id)}
                            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                          >
                            <span>{isExpanded ? 'Hide Advanced Explanation' : 'Learn More (Deep Dive)'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-amber-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="mt-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2 text-xs text-slate-300 leading-relaxed"
                              >
                                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                                  Advanced Concept Notes
                                </div>
                                <p>{card.deepDive}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STAGE 3 CONTENT: BUILD YOUR PROJECT (SPRINT 3 IMPLEMENTATION) */}
            {activeStage === 'build' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stage Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl">
                    🏗
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Stage 3: Build Your Project
                    </h2>
                    <p className="text-xs text-slate-400">
                      Follow the 5-phase guided implementation roadmap to bring your solution to life step-by-step.
                    </p>
                  </div>
                </div>

                {/* Build Progress Header Summary Card */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Build Progress
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                      {buildProgressPercentage}% Completed
                    </span>
                  </div>

                  {/* Build Progress Bar */}
                  <div className="h-3 rounded-full bg-slate-950/80 border border-slate-800/90 overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${buildProgressPercentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 shadow-md shadow-emerald-500/20"
                    />
                  </div>

                  {/* Metrics Summary Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-slate-400">Completed Phases: </span>
                        <strong className="text-white font-mono">{completedBuildPhasesCount} of {totalBuildPhases}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-slate-400">Est. Remaining Time: </span>
                        <strong className="text-white font-mono">~{remainingBuildTimeMins} Mins Remaining</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 Build Phase Cards Vertical Timeline */}
                <div className="relative space-y-6 pl-4 sm:pl-8">
                  {/* Timeline Vertical Guide Line */}
                  <div className="absolute left-4 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-emerald-500 via-cyan-500 to-slate-800 -translate-x-1/2 pointer-events-none" />

                  {buildPhasesData.map((phase, idx) => {
                    const isCompleted = !!completedPhases[phase.id];

                    return (
                      <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: idx * 0.09 }}
                        className="relative pl-6 sm:pl-8 group"
                      >
                        {/* Timeline Node Badge Icon */}
                        <div
                          className={`absolute left-0 top-6 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono transition-all -translate-x-1/2 z-10 ${
                            isCompleted
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                              : 'bg-slate-900 border-cyan-500/50 text-cyan-300 ring-2 ring-cyan-500/20'
                          }`}
                        >
                          {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : phase.phaseNumber}
                        </div>

                        {/* Phase Glassmorphism Card */}
                        <div
                          className={`glass-panel p-6 sm:p-7 rounded-3xl border transition-all space-y-5 ${
                            isCompleted
                              ? 'bg-emerald-950/10 border-emerald-500/30 shadow-xl'
                              : 'border-slate-800 hover:border-slate-700 shadow-2xl'
                          }`}
                        >
                          {/* Phase Header */}
                          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                                  Phase {phase.phaseNumber} of 5
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${phase.difficultyColor}`}>
                                  {phase.difficulty}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                                {phase.title}
                              </h3>
                            </div>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                              <Clock className="w-3.5 h-3.5 text-cyan-400" />
                              {phase.estTime}
                            </span>
                          </div>

                          {/* Objective */}
                          <div className="space-y-1">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              Phase Objective
                            </div>
                            <p className="text-xs text-slate-200 leading-relaxed font-sans">
                              {phase.objective}
                            </p>
                          </div>

                          {/* Files Involved */}
                          <div className="space-y-1.5">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                              <FolderGit2 className="w-3.5 h-3.5" />
                              Files Involved
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {phase.files.map((file) => (
                                <span
                                  key={file}
                                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 flex items-center gap-1"
                                >
                                  <FileText className="w-3 h-3 text-purple-400" />
                                  {file}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Code Snippet */}
                          <div className="space-y-1.5">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                              Snippet / Implementation Reference
                            </div>
                            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 text-[11px] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                              <code>{phase.snippet}</code>
                            </pre>
                          </div>

                          {/* Expected Outcome */}
                          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                              <Play className="w-3.5 h-3.5" />
                              Expected Outcome
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">
                              {phase.outcome}
                            </p>
                          </div>

                          {/* Phase Completion Checkbox */}
                          <div className="pt-3 border-t border-slate-800/80">
                            <button
                              type="button"
                              onClick={() => togglePhaseComplete(phase.id)}
                              className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all group active:scale-[0.99] ${
                                isCompleted
                                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                                  : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-500/40'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                                  isCompleted
                                    ? 'bg-emerald-500 text-slate-950 font-bold'
                                    : 'border-2 border-slate-700 group-hover:border-emerald-400'
                                }`}>
                                  {isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                                </div>
                                <span className="text-xs font-bold">
                                  {isCompleted ? 'Phase Completed!' : 'Mark Phase as Completed'}
                                </span>
                              </div>

                              <span className="text-[10px] font-mono text-slate-400">
                                {isCompleted ? '✓ Verified' : 'Click to complete'}
                              </span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* SPRINT 3 BUILD COMPLETION BANNER */}
                <AnimatePresence>
                  {isBuildComplete && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -12 }}
                      transition={{ duration: 0.4 }}
                      className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-slate-950 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 text-2xl shrink-0">
                          🎉
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            Build Complete!
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Your project is ready for deployment. You've completed all 5 implementation phases!
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveStage('improve')}
                        className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/25 transition-all flex items-center gap-2 shrink-0 active:scale-95 cursor-pointer"
                      >
                        <span>Continue to Improve</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* STAGE 4 CONTENT: PROFESSIONAL POLISH (SPRINT 4 IMPLEMENTATION) */}
            {activeStage === 'improve' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stage Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl">
                    🚀
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      Stage 4: Professional Polish
                    </h2>
                    <p className="text-xs text-slate-400">
                      Learn how senior software engineers optimize, secure, test, and audit projects before production deployment.
                    </p>
                  </div>
                </div>

                {/* Professional Polish Progress Header Card */}
                <div className="glass-panel p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Professional Polish Progress
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/20">
                      {improveProgressPercentage}% Polish Completed
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-3 rounded-full bg-slate-950/80 border border-slate-800/90 overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${improveProgressPercentage}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 via-cyan-500 to-emerald-400 shadow-md shadow-purple-500/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-slate-400">Completed Improvements: </span>
                        <strong className="text-white font-mono">{completedImproveCount} of {totalImproveCards} Cards</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
                      <Activity className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <span className="text-slate-400">Overall Project Readiness: </span>
                        <strong className="text-emerald-300 font-mono">
                          {isAllImproveCompleted ? '100% Production Ready' : `${progressPercentage}% In Progress`}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5 IMPROVEMENT CARDS */}
                <div className="space-y-6">
                  {improvementCards.map((card, idx) => {
                    const isCompleted = !!completedImproveCards[card.id];
                    const isExpanded = !!expandedTips[card.id];
                    const IconComponent = card.IconComponent || Zap;

                    return (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.08 }}
                        className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 shadow-2xl space-y-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl ${card.accentBg} border ${card.accentBorder} flex items-center justify-center ${card.iconColor} shrink-0`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-white tracking-tight">
                                {idx + 1}. {card.title}
                              </h3>
                              <p className="text-xs text-slate-400">{card.category || 'Quality Audit'}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full ${card.accentBg} ${card.iconColor} border ${card.accentBorder} text-xs font-mono font-semibold`}>
                            {card.category || 'Quality Audit'}
                          </span>
                        </div>

                        {/* Why Needed */}
                        <div className="space-y-1.5">
                          <div className={`text-[11px] font-bold uppercase tracking-wider ${card.iconColor}`}>
                            Why This Improvement Matters
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans">
                            {card.whyNeeded}
                          </p>
                        </div>

                        {/* Tips Array */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Optimization Checklist & Guidance</div>
                          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
                            {card.tips.map((tip, tipIdx) => (
                              <li key={tipIdx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                                <strong className="text-cyan-300 block font-mono">Tip {tipIdx + 1}</strong>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Beginner Mistake */}
                        <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                            <ZapOff className="w-3.5 h-3.5" />
                            Common Beginner Mistake
                          </div>
                          <p className="text-xs text-red-200/90 leading-relaxed font-sans">
                            {card.beginnerMistake}
                          </p>
                        </div>

                        {/* Professional Tip Accordion */}
                        <div className="pt-2 border-t border-slate-800/80">
                          <button
                            type="button"
                            onClick={() => toggleTipExpand(card.id)}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                          >
                            <span>💡 Senior Engineer Pro Tip (Expand)</span>
                            {isExpanded ? <ChevronUp className={`w-4 h-4 ${card.iconColor}`} /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                          </button>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans"
                              >
                                "{card.proTip}"
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Card Completion Checkbox */}
                        <button
                          type="button"
                          onClick={() => toggleImproveCardComplete(card.id)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                            isCompleted
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                              : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-500/40'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isCompleted ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700'}`}>
                              {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-bold">
                              {isCompleted ? `${card.title} Verified` : `Mark ${card.title} as Verified`}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {isCompleted ? '✓ Completed' : 'Click to complete'}
                          </span>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CELEBRATION SECTION & DEVELOPER REPORT CARD */}
                <AnimatePresence>
                  {isAllImproveCompleted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-slate-950 shadow-2xl space-y-8 relative overflow-hidden"
                    >
                      <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

                      {/* Header Message */}
                      <div className="text-center space-y-2 max-w-xl mx-auto">
                        <div className="w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 text-3xl mx-auto shadow-lg shadow-purple-500/20">
                          🎉
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          Blueprint Complete
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          Congratulations! You have successfully completed every stage of your project blueprint — from mental model to production readiness.
                        </p>
                      </div>

                      {/* DEVELOPER REPORT CARD UI */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800 space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
                          <div className="flex items-center gap-2.5">
                            <Trophy className="w-5 h-5 text-amber-400" />
                            <h3 className="text-base font-bold text-white tracking-tight">
                              Developer Report Card
                            </h3>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-mono font-bold">
                            Overall Readiness: 97% Production Ready
                          </span>
                        </div>

                        {/* Score Breakdown Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">1. Planning</div>
                            <div className="text-xl font-extrabold text-cyan-300 font-mono">98 / 100</div>
                            <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade A+</span>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">2. Learning</div>
                            <div className="text-xl font-extrabold text-amber-300 font-mono">95 / 100</div>
                            <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade A</span>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">3. Implementation</div>
                            <div className="text-xl font-extrabold text-purple-300 font-mono">96 / 100</div>
                            <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade A+</span>
                          </div>

                          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 text-center">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">4. Professional Practices</div>
                            <div className="text-xl font-extrabold text-emerald-300 font-mono">100 / 100</div>
                            <span className="inline-block text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">Grade S (Master)</span>
                          </div>
                        </div>
                      </div>

                      {/* RECOMMENDED NEXT CHALLENGE PLACEHOLDER CARD */}
                      <div className="p-6 rounded-3xl bg-slate-950/90 border border-cyan-500/20 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                            <Rocket className="w-4 h-4" />
                            🚀 Recommended Next Challenge
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-semibold">
                            Coming Soon
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white tracking-tight">
                          Build a Microservice Message Queue with Redis & RabbitMQ
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Take your software engineering skills to the next tier by building an asynchronous message bus with worker thread retries and dead-letter queues.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
}


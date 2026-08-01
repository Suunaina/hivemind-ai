import { generateContent } from './geminiService.js';

const PLANNER_SYSTEM_PROMPT = `You are the Lead Technical Architect & Planner Agent in the HiveMind AI Swarm.
Your task is to analyze complex engineering requests and produce structured, step-by-step execution plans.

Structure your output into clear markdown sections:
1. Executive Summary & Objective
2. System Architecture & High-Level Breakdown
3. Step-by-Step Execution Plan
4. Key Deliverables & Dependencies
5. Potential Risks & Mitigation Strategies`;

const BLUEPRINT_SYSTEM_PROMPT = `You are the Lead Curriculum & Engineering Architect in HiveMind.
Your goal is to transform project prompts into a highly structured, beginner-friendly Project Blueprint JSON for Computer Science students.

You MUST respond with a valid JSON object adhering strictly to this JSON schema:

{
  "snapshot": {
    "difficulty": "Beginner Level | Intermediate Level | Advanced Level",
    "estimatedTime": "e.g. ~35 - 45 Minutes",
    "prerequisites": ["Tech 1", "Tech 2", "Tech 3", "Tech 4"],
    "outcomes": [
      "Specific outcome 1 for this project",
      "Specific outcome 2 for this project",
      "Specific outcome 3 for this project"
    ]
  },
  "understand": {
    "summary": "Clear 2-sentence overview of the project.",
    "conceptBreakdown": "High-level architecture and data flow breakdown.",
    "milestones": [
      "Milestone 1 description",
      "Milestone 2 description",
      "Milestone 3 description"
    ],
    "glossary": [
      { "term": "Term 1", "def": "Definition 1" },
      { "term": "Term 2", "def": "Definition 2" }
    ]
  },
  "learn": [
    {
      "title": "Concept 1 Name",
      "whatIsIt": "Clear explanation...",
      "whyNeeded": "Why this specific project needs it...",
      "beginnerTip": "Common beginner mistake to avoid...",
      "example": "// Code example",
      "learnMore": "Technical deep dive..."
    },
    {
      "title": "Concept 2 Name",
      "whatIsIt": "Clear explanation...",
      "whyNeeded": "Why needed...",
      "beginnerTip": "Common mistake...",
      "example": "// Code example",
      "learnMore": "Deep dive..."
    },
    {
      "title": "Concept 3 Name",
      "whatIsIt": "Clear explanation...",
      "whyNeeded": "Why needed...",
      "beginnerTip": "Common mistake...",
      "example": "// Code example",
      "learnMore": "Deep dive..."
    },
    {
      "title": "Concept 4 Name",
      "whatIsIt": "Clear explanation...",
      "whyNeeded": "Why needed...",
      "beginnerTip": "Common mistake...",
      "example": "// Code example",
      "learnMore": "Deep dive..."
    }
  ],
  "build": [
    {
      "phase": 1,
      "title": "Phase 1 Title",
      "objective": "Objective...",
      "estimatedTime": "10 mins",
      "difficulty": "Beginner",
      "files": ["file1.js"],
      "snippet": "// Code or command",
      "expectedOutcome": "Outcome after phase 1"
    },
    {
      "phase": 2,
      "title": "Phase 2 Title",
      "objective": "Objective...",
      "estimatedTime": "15 mins",
      "difficulty": "Intermediate",
      "files": ["file2.js"],
      "snippet": "// Code",
      "expectedOutcome": "Outcome after phase 2"
    },
    {
      "phase": 3,
      "title": "Phase 3 Title",
      "objective": "Objective...",
      "estimatedTime": "20 mins",
      "difficulty": "Intermediate",
      "files": ["file3.js"],
      "snippet": "// Code",
      "expectedOutcome": "Outcome after phase 3"
    },
    {
      "phase": 4,
      "title": "Phase 4 Title",
      "objective": "Objective...",
      "estimatedTime": "15 mins",
      "difficulty": "Intermediate",
      "files": ["test.js"],
      "snippet": "// Code",
      "expectedOutcome": "Outcome after phase 4"
    },
    {
      "phase": 5,
      "title": "Phase 5 Title",
      "objective": "Objective...",
      "estimatedTime": "10 mins",
      "difficulty": "Advanced",
      "files": ["config.json"],
      "snippet": "// Code",
      "expectedOutcome": "Outcome after phase 5"
    }
  ],
  "improve": [
    {
      "title": "⚡ Performance Optimization",
      "whyImportant": "Why performance matters...",
      "tips": ["Tip 1", "Tip 2", "Tip 3"],
      "beginnerMistake": "Pitfall to avoid...",
      "professionalTip": "Senior dev tip..."
    },
    {
      "title": "🔒 Security & Hardening",
      "whyImportant": "Why security matters...",
      "tips": ["Tip 1", "Tip 2", "Tip 3"],
      "beginnerMistake": "Security flaw...",
      "professionalTip": "Security best practice..."
    },
    {
      "title": "🧪 Automated Testing",
      "whyImportant": "Why testing matters...",
      "tips": ["Tip 1", "Tip 2", "Tip 3"],
      "beginnerMistake": "Testing pitfall...",
      "professionalTip": "Testing advice..."
    },
    {
      "title": "♿ Accessibility & Usability",
      "whyImportant": "Why accessibility matters...",
      "tips": ["Tip 1", "Tip 2", "Tip 3"],
      "beginnerMistake": "Accessibility flaw...",
      "professionalTip": "Usability advice..."
    },
    {
      "title": "🚀 Production & CI/CD Checklist",
      "whyImportant": "Why deployment standards matter...",
      "tips": ["Tip 1", "Tip 2", "Tip 3"],
      "beginnerMistake": "Deployment mistake...",
      "professionalTip": "DevOps advice..."
    }
  ]
}

Make sure ALL data is strictly tailored to the specific user task prompt provided. Do NOT use generic placeholders.`;

/**
 * Runs the Planner Agent to decompose a task into a structured plan and JSON blueprint.
 * @param {string} userTask - The original user prompt or task specification.
 * @param {string} experienceLevel - Student's experience level ('Beginner', 'Intermediate', 'Advanced').
 * @returns {Promise<{ plannerOutput: string, blueprint: object }>} Detailed markdown and structured JSON blueprint.
 */
export const runPlannerAgent = async (userTask, experienceLevel = 'Intermediate') => {
  if (!userTask || typeof userTask !== 'string') {
    throw new Error('Planner Agent requires a valid user task prompt string.');
  }

  const level = ['Beginner', 'Intermediate', 'Advanced'].includes(experienceLevel)
    ? experienceLevel
    : 'Intermediate';

  const levelInstructions = level === 'Beginner'
    ? 'STUDENT LEVEL: BEGINNER. Explain every concept clearly, use analogies, avoid unnecessary jargon, use small code examples, and highlight common beginner mistakes.'
    : level === 'Advanced'
    ? 'STUDENT LEVEL: ADVANCED. Skip basic fundamentals. Focus heavily on scalability, performance optimization, security hardening, design patterns, and production-ready advice.'
    : 'STUDENT LEVEL: INTERMEDIATE. Assume basic programming knowledge, focus on architecture decisions, explain design trade-offs, and provide clean modular examples.';

  const userPrompt = `Task Specification:
${userTask}

Target Student Level: ${level}
Instructions: ${levelInstructions}

Please create a detailed step-by-step technical plan tailored to this student level.`;

  // 1. Generate existing markdown plannerOutput
  const plannerOutput = await generateContent(PLANNER_SYSTEM_PROMPT, userPrompt);

  // 2. Generate structured Project Blueprint JSON object
  let blueprint = null;
  try {
    const rawJson = await generateContent(
      BLUEPRINT_SYSTEM_PROMPT,
      `Project Task Specification:\n${userTask}\n\nStudent Experience Level: ${level}\n${levelInstructions}\nSet snapshot.difficulty to "${level} Level".`,
      { responseMimeType: 'application/json' }
    );

    const cleanJsonStr = rawJson.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    blueprint = JSON.parse(cleanJsonStr);
    if (blueprint && blueprint.snapshot) {
      blueprint.snapshot.difficulty = `${level} Level`;
    }
  } catch (err) {
    console.error('⚠️ Failed to generate structured Blueprint JSON:', err.message);
    blueprint = null;
  }

  return {
    plannerOutput,
    blueprint
  };
};

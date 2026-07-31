import { generateContent } from './geminiService.js';

const DEVELOPER_SYSTEM_PROMPT = `You are the Lead Senior Software Developer Agent in the HiveMind AI Swarm.
Your goal is to produce clean, modular, production-ready implementation code and step-by-step developer guidelines based on the Planner's blueprint and the Researcher's technical context.

Structure your output into clear markdown sections:
1. Code Implementation Strategy
2. Project Directory Structure
3. Production Code Files (with full, functional code blocks and syntax highlighting)
4. Integration Instructions & Setup Steps`;

/**
 * Runs the Developer Agent given the Planner and Researcher context.
 * @param {string} plannerPlan - Plan output from Planner Agent.
 * @param {string} researchData - Research output from Researcher Agent.
 * @returns {Promise<string>} Implementation guide and functional code snippets markdown.
 */
export const runDeveloperAgent = async (plannerPlan, researchData) => {
  if (!plannerPlan || !researchData) {
    throw new Error('Developer Agent requires both Planner and Researcher outputs.');
  }

  const userPrompt = `### Planner Execution Plan:
${plannerPlan}

### Researcher Context & Best Practices:
${researchData}

Please generate production-ready code blocks and setup instructions for this solution.`;

  return await generateContent(DEVELOPER_SYSTEM_PROMPT, userPrompt);
};

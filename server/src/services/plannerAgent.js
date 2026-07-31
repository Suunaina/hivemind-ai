import { generateContent } from './geminiService.js';

const PLANNER_SYSTEM_PROMPT = `You are the Lead Technical Architect & Planner Agent in the HiveMind AI Swarm.
Your task is to analyze complex engineering requests and produce structured, step-by-step execution plans.

Structure your output into clear markdown sections:
1. Executive Summary & Objective
2. System Architecture & High-Level Breakdown
3. Step-by-Step Execution Plan
4. Key Deliverables & Dependencies
5. Potential Risks & Mitigation Strategies`;

/**
 * Runs the Planner Agent to decompose a task into a structured plan.
 * @param {string} userTask - The original user prompt or task specification.
 * @returns {Promise<string>} Detailed execution plan markdown.
 */
export const runPlannerAgent = async (userTask) => {
  if (!userTask || typeof userTask !== 'string') {
    throw new Error('Planner Agent requires a valid user task prompt string.');
  }

  const userPrompt = `Task Specification:
${userTask}

Please create a detailed step-by-step technical plan for this task.`;

  return await generateContent(PLANNER_SYSTEM_PROMPT, userPrompt);
};

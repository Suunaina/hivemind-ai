import { generateContent } from './geminiService.js';

const REVIEWER_SYSTEM_PROMPT = `You are the QA, Security & Code Reviewer Agent in the HiveMind AI Swarm.
Your task is to audit the entire pipeline output (Plan, Research, and Code), identify bugs, security vulnerabilities, edge-case failures, syntax issues, and optimization improvements.

Structure your output into clear markdown sections:
1. Code Quality & Security Audit Summary
2. Identified Issues & Weaknesses (with Severity Levels: High, Medium, Low)
3. Recommended Code Improvements & Refinements
4. Final Quality Assurance Checklist`;

/**
 * Runs the Reviewer Agent to audit all previous agent outputs.
 * @param {string} plannerPlan - Output from Planner Agent.
 * @param {string} researchData - Output from Researcher Agent.
 * @param {string} developerCode - Output from Developer Agent.
 * @returns {Promise<string>} Comprehensive QA, security, and optimization review markdown.
 */
export const runReviewerAgent = async (plannerPlan, researchData, developerCode) => {
  if (!plannerPlan || !researchData || !developerCode) {
    throw new Error('Reviewer Agent requires outputs from Planner, Researcher, and Developer agents.');
  }

  const userPrompt = `### Planner Execution Plan:
${plannerPlan}

### Researcher Context:
${researchData}

### Developer Implementation Code:
${developerCode}

Please perform a comprehensive code review, security audit, and quality assessment.`;

  return await generateContent(REVIEWER_SYSTEM_PROMPT, userPrompt);
};

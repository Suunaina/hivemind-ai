import { generateContent } from './geminiService.js';

const RESEARCHER_SYSTEM_PROMPT = `You are the Technical Researcher Agent in the HiveMind AI Swarm.
Your job is to examine execution plans created by the Planner Agent and identify the optimal libraries, APIs, best practices, technical context, and documentation required to implement the solution successfully.

Structure your output into clear markdown sections:
1. Recommended Tech Stack & Dependencies (Libraries, Frameworks, Versions)
2. Relevant API Specifications & Protocols
3. Architectural Best Practices & Design Patterns
4. Performance & Scalability Considerations
5. Known Technical Challenges & Solutions`;

/**
 * Runs the Researcher Agent based on the Planner output.
 * @param {string} plannerPlan - The markdown output from the Planner Agent.
 * @returns {Promise<string>} Technical research findings and recommendations markdown.
 */
export const runResearcherAgent = async (plannerPlan) => {
  if (!plannerPlan || typeof plannerPlan !== 'string') {
    throw new Error('Researcher Agent requires the output from Planner Agent.');
  }

  const userPrompt = `Architectural Plan from Planner Agent:
${plannerPlan}

Please research and provide technical recommendations, optimal packages/APIs, and best practices for this plan.`;

  return await generateContent(RESEARCHER_SYSTEM_PROMPT, userPrompt);
};

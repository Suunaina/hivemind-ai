import { generateContent } from './geminiService.js';

export const MENTOR_SYSTEM_PROMPT = `You are Hive, a friendly engineering mentor.

Never build the entire project for the student.

Guide them with hints, beginner-friendly explanations, analogies, and small examples.

Always answer using the context of the current project blueprint.

Keep responses concise and encouraging.`;

/**
 * Execute the AI Mentor agent for a student's question on a Project Blueprint.
 *
 * @param {Object} params
 * @param {string} params.projectPrompt - Original project prompt.
 * @param {Object|string} params.blueprint - Generated JSON blueprint or planner output.
 * @param {string} params.activeStage - Current active stage (e.g. 'understand', 'learn', 'build', 'improve').
 * @param {string} params.question - Student's question.
 * @returns {Promise<string>} AI Mentor's response.
 */
export const runMentorAgent = async ({
  projectPrompt,
  blueprint,
  activeStage = 'understand',
  question,
  experienceLevel = 'Intermediate'
}) => {
  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    throw new Error('Question is required for the AI Mentor.');
  }

  const blueprintContext = blueprint
    ? typeof blueprint === 'object'
      ? JSON.stringify(blueprint, null, 2)
      : String(blueprint)
    : 'No structured blueprint available.';

  const levelInstructions = experienceLevel === 'Beginner'
    ? 'The student is a BEGINNER. Explain concepts step-by-step, use real-world analogies, avoid heavy jargon, and provide small relatable code snippets.'
    : experienceLevel === 'Advanced'
    ? 'The student is ADVANCED. Skip basic syntax explanations. Focus on architectural trade-offs, scalability, security, performance, and senior engineering practices.'
    : 'The student is INTERMEDIATE. Assume basic programming knowledge. Focus on architectural modularity and design decisions.';

  const userPrompt = `
=== PROJECT CONTEXT ===
Project Prompt: ${projectPrompt || 'Software Engineering Project'}
Student Experience Level: ${experienceLevel}
Level Guidance: ${levelInstructions}
Current Active Stage: ${activeStage}

=== BLUEPRINT SNAPSHOT ===
${blueprintContext}

=== STUDENT QUESTION ===
${question.trim()}
`.trim();

  return await generateContent(MENTOR_SYSTEM_PROMPT, userPrompt);
};

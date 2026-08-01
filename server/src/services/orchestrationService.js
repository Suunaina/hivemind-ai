import { runPlannerAgent } from './plannerAgent.js';
import { runResearcherAgent } from './researcherAgent.js';
import { runDeveloperAgent } from './developerAgent.js';
import { runReviewerAgent } from './reviewerAgent.js';

/**
 * Executes all four AI swarm agents sequentially:
 * Planner -> Researcher -> Developer -> Reviewer
 * 
 * @param {string} userPrompt - Task prompt submitted by the user.
 * @returns {Promise<{ planner: string, researcher: string, developer: string, reviewer: string }>}
 */
export const runAgents = async (userPrompt) => {
  if (!userPrompt || typeof userPrompt !== 'string') {
    throw new Error('A valid user task prompt is required to run the AI Swarm.');
  }

  let planner;
  let blueprint;
  let researcher;
  let developer;
  let reviewer;

  // 1. Planner Execution
  try {
    console.log('🧠 Planner started...');
    const plannerResult = await runPlannerAgent(userPrompt);
    planner = typeof plannerResult === 'string' ? plannerResult : plannerResult.plannerOutput;
    blueprint = typeof plannerResult === 'object' ? plannerResult.blueprint : null;
    console.log('✅ Planner completed');
  } catch (error) {
    console.error('❌ Planner Agent Error:', error.message);
    throw new Error(`Planner Agent Failed: ${error.message}`);
  }

  // 2. Researcher Execution
  try {
    console.log('🔍 Researcher started...');
    researcher = await runResearcherAgent(planner);
    console.log('✅ Researcher completed');
  } catch (error) {
    console.error('❌ Researcher Agent Error:', error.message);
    throw new Error(`Researcher Agent Failed: ${error.message}`);
  }

  // 3. Developer Execution
  try {
    console.log('💻 Developer started...');
    developer = await runDeveloperAgent(planner, researcher);
    console.log('✅ Developer completed');
  } catch (error) {
    console.error('❌ Developer Agent Error:', error.message);
    throw new Error(`Developer Agent Failed: ${error.message}`);
  }

  // 4. Reviewer Execution
  try {
    console.log('🛡 Reviewer started...');
    reviewer = await runReviewerAgent(planner, researcher, developer);
    console.log('✅ Reviewer completed');
  } catch (error) {
    console.error('❌ Reviewer Agent Error:', error.message);
    throw new Error(`Reviewer Agent Failed: ${error.message}`);
  }

  return {
    planner,
    researcher,
    developer,
    reviewer,
    blueprint
  };
};

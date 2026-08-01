/**
 * Dynamic Category Icon Resolver for HiveMind Project Blueprints
 */
export const getProjectCategoryIcon = (prompt = '') => {
  const p = prompt.toLowerCase();

  if (p.includes('weather') || p.includes('forecast') || p.includes('climate')) return '☁️';
  if (p.includes('chess') || p.includes('game') || p.includes('board')) return '♟️';
  if (p.includes('music') || p.includes('spotify') || p.includes('audio') || p.includes('player')) return '🎵';
  if (p.includes('calc') || p.includes('math')) return '🧮';
  if (p.includes('todo') || p.includes('task') || p.includes('kanban') || p.includes('list')) return '📋';
  if (p.includes('ecommerce') || p.includes('shop') || p.includes('cart') || p.includes('store') || p.includes('product')) return '🛒';
  if (p.includes('ai') || p.includes('bot') || p.includes('swarm') || p.includes('agent') || p.includes('intelligence') || p.includes('gpt')) return '🤖';
  if (p.includes('chat') || p.includes('messaging') || p.includes('forum') || p.includes('slack')) return '💬';
  if (p.includes('dashboard') || p.includes('analytics') || p.includes('metrics') || p.includes('chart')) return '📊';
  if (p.includes('security') || p.includes('auth') || p.includes('jwt') || p.includes('audit')) return '🛡️';
  if (p.includes('api') || p.includes('microservice') || p.includes('server') || p.includes('backend') || p.includes('rest')) return '⚙️';

  return '🚀';
};

/**
 * Server-side Gemini API Error Formatting Utility
 * Logs detailed technical error trace to server logs and returns clean user-friendly messages.
 */
export const formatGeminiError = (error) => {
  // Always log detailed technical error on the server console for debugging
  console.error('SERVER TECHNICAL ERROR TRACE:', error);

  const errString = (error?.message || String(error)).toLowerCase();
  const status = error?.status || error?.response?.status;

  if (
    status === 429 ||
    errString.includes('429') ||
    errString.includes('quota') ||
    errString.includes('resource_exhausted') ||
    errString.includes('rate limit')
  ) {
    return "HiveMind AI is temporarily unavailable. We've reached today's AI usage limit. Please try again later.";
  }

  if (
    status === 401 ||
    status === 403 ||
    errString.includes('api_key') ||
    errString.includes('unauthorized') ||
    errString.includes('invalid api key')
  ) {
    return 'AI Service Configuration Error. HiveMind is temporarily unable to communicate with the AI service. Please try again later.';
  }

  if (
    status === 503 ||
    status === 500 ||
    errString.includes('unavailable') ||
    errString.includes('503') ||
    errString.includes('timeout') ||
    errString.includes('econnrefused')
  ) {
    return 'AI Service Unavailable. The AI service is currently unavailable. Please retry in a few moments.';
  }

  if (errString.includes('network') || errString.includes('fetch failed') || errString.includes('enotfound')) {
    return 'Network Error. Please check your internet connection and try again.';
  }

  return 'An unexpected error occurred while generating your blueprint. Please try again.';
};

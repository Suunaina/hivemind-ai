import { GoogleGenAI } from '@google/genai';

/**
 * Reusable utility to call Gemini AI using the official @google/genai SDK.
 * @param {string} systemPrompt - System instructions directing the model persona.
 * @param {string} userPrompt - User input content/context.
 * @returns {Promise<string>} Generated text response from Gemini.
 */
export const generateContent = async (
  systemPrompt,
  userPrompt,
  extraConfig = {}
) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelName = process.env.GEMINI_MODEL;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        ...extraConfig,
      },
    });

    return response.text;
  } catch (error) {
    console.error(`Gemini API Error (${modelName}):`, error.message);
    throw new Error(`Gemini API execution failed: ${error.message}`);
  }
};
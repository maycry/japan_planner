// OpenAI Configuration
// IMPORTANT: This now uses environment variables for security
// Get your API key from: https://platform.openai.com/api-keys
// For local development: Add VITE_OPENAI_API_KEY to your .env.local file
// For production: Add VITE_OPENAI_API_KEY to your Vercel environment variables

export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// OpenAI API configuration
export const OPENAI_CONFIG = {
  model: "gpt-4o-mini", // Cost-effective model, you can change to "gpt-4" for better quality
  max_tokens: 5000, // Increased for larger itineraries with multiple cities
  temperature: 0.7,
};

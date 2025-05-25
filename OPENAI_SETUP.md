# OpenAI API Setup Instructions

## Getting Your OpenAI API Key

1. **Visit OpenAI Platform**: Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

2. **Sign In/Sign Up**: Create an account or sign in to your existing OpenAI account

3. **Create API Key**:

   - Click "Create new secret key"
   - Give it a name (e.g., "Japan Travel Planner")
   - Copy the generated API key (starts with `sk-...`)

4. **Add Credits**: Make sure you have billing set up and credits in your OpenAI account

## Adding Your API Key to the App

1. **Open the config file**: `/src/config/openai.js`

2. **Replace the placeholder**:

   ```javascript
   export const OPENAI_API_KEY = "sk-your-actual-api-key-here";
   ```

3. **Save the file** and restart your development server

## Important Security Notes

⚠️ **SECURITY WARNING**: This setup is for development/demo purposes only!

- **Never commit your API key** to version control
- **For production apps**, API calls should be made from your backend server
- **Add the config file to .gitignore** to prevent accidental commits

## Cost Information

- **Model Used**: `gpt-4o-mini` (cost-effective)
- **Estimated Cost**: ~$0.01-0.03 per itinerary generation
- **Alternative**: Change to `gpt-4` in `/src/config/openai.js` for higher quality (higher cost)

## Requirements

The OpenAI API key is **required** for the app to function. Without a valid API key, itinerary generation will fail.

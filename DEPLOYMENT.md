# Deployment Guide for Japan Travel Planner

This guide will help you deploy your Japan Travel Planner to Vercel securely.

## 🛡️ Security Updates Made

- ✅ **API Key moved to environment variables** - No longer hardcoded
- ✅ **Environment files created** - `.env.local` for development
- ✅ **Git security** - `.env` files excluded from version control
- ✅ **Error handling** - Graceful fallback when API key is missing

## 📋 Prerequisites

1. **GitHub Account** - To store your code
2. **Vercel Account** - For deployment (free tier available)
3. **OpenAI API Key** - From [OpenAI Platform](https://platform.openai.com/api-keys)

## 🚀 Deployment Steps

### Step 1: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Japan Travel Planner with secure API key handling"
```

### Step 2: Push to GitHub

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/japan-travel-planner.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel

#### Option A: Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variables:
   - Key: `VITE_OPENAI_API_KEY`
   - Value: `your_actual_openai_api_key_here`
7. Click "Deploy"

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Add environment variable
vercel env add VITE_OPENAI_API_KEY
```

### Step 4: Configure Environment Variables

In Vercel Dashboard:

1. Go to your project
2. Settings → Environment Variables
3. Add: `VITE_OPENAI_API_KEY` = `your_openai_api_key_here`
4. Make sure to select all environments (Production, Preview, Development)
5. Redeploy if needed

## 🔧 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/japan-travel-planner.git
cd japan-travel-planner

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
# VITE_OPENAI_API_KEY=your_api_key_here

# Start development server
npm run dev
```

## 📁 File Structure

```
japan-travel-planner/
├── .env.example          # Environment template
├── .env.local           # Your local environment (not in git)
├── .gitignore           # Excludes environment files
├── vercel.json          # Vercel deployment config
├── src/
│   ├── config/
│   │   └── openai.js    # Now uses environment variables
│   └── ...
└── README.md
```

## 🔒 Security Features

- **Environment Variables**: API keys stored securely
- **Git Exclusion**: No sensitive data in version control
- **Error Handling**: Graceful fallback when API unavailable
- **Vercel Integration**: Secure deployment with environment variables

## 🌐 Your Deployed App

Once deployed, your app will be available at:
`https://your-project-name.vercel.app`

## 🔧 Troubleshooting

### API Key Issues

- Ensure `VITE_OPENAI_API_KEY` is set in Vercel environment variables
- Check that the API key is valid and has sufficient credits
- Verify the environment variable name matches exactly

### Build Issues

- Run `npm run build` locally to test
- Check Vercel build logs for specific errors
- Ensure all dependencies are in `package.json`

### Environment Variables Not Working

- Variable names must start with `VITE_` for Vite projects
- Redeploy after adding environment variables
- Check that variables are set for the correct environment

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test the build locally first
4. Check the browser console for errors

## 🎉 Success!

Your Japan Travel Planner is now securely deployed and ready to help users plan their perfect trip to Japan!

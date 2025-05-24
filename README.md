# 🗾 Japan Travel Planner

An AI-powered travel planning application that creates personalized itineraries for your perfect Japan adventure.

![Japan Travel Planner](https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop)

## ✨ Features

- **🤖 AI-Powered Planning** - Intelligent itinerary generation using OpenAI GPT
- **📍 Smart City Selection** - Choose from 12+ popular Japanese destinations
- **🎯 Personalized Preferences** - Tailored recommendations based on your interests
- **📱 Modern UI** - Beautiful, responsive design with interactive photo carousel
- **📅 Timeline View** - Visual timeline layout for your complete itinerary
- **🔄 Drag & Drop** - Intuitive reordering of cities and activities
- **📸 Rich Photos** - Stunning imagery for every destination and activity

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: CSS3 with modern gradients and animations
- **Carousel**: React Slick
- **AI Integration**: OpenAI GPT-4o-mini
- **Deployment**: Vercel
- **Images**: Unsplash API

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/japan-travel-planner.git
cd japan-travel-planner
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

```bash
# Copy the environment template
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see the app in action!

## 🌐 Deployment

This project is configured for easy deployment on Vercel. See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/japan-travel-planner)

**Important**: Don't forget to add your `VITE_OPENAI_API_KEY` environment variable in Vercel dashboard!

## 📱 How It Works

### 1. **Landing Page**
- Beautiful hero section with Japan imagery
- Smooth photo carousel showcasing destinations
- Call-to-action to start planning

### 2. **Preference Selection**
- Choose from 14 travel preferences
- Options include cuisine, temples, modern architecture, nature, and more

### 3. **City Selection**
- Pick from 12+ Japanese cities
- Drag and drop to reorder your itinerary
- Adjust days per city (1-20 days)

### 4. **Activity Selection**
- Browse curated activities for each city
- Expandable city sections with photo previews
- Smart activity categorization

### 5. **Itinerary Review**
- View complete trip summary
- JSON data visualization
- Final review before AI generation

### 6. **AI-Generated Timeline**
- Beautiful timeline layout
- Day-by-day activity scheduling
- Activity photos and descriptions
- Time-based organization (Morning/Afternoon/Evening)

## 🎨 Design Features

- **Modern Gradient Backgrounds** - Eye-catching purple-to-blue gradients
- **Glass Morphism** - Subtle transparency effects
- **Smooth Animations** - Hover effects and transitions
- **Mobile Responsive** - Works perfectly on all devices
- **Photo Integration** - 70+ curated activity photos
- **Timeline UI** - Instagram-style timeline for itineraries

## 🛡️ Security

- ✅ API keys stored as environment variables
- ✅ No sensitive data in version control
- ✅ Secure deployment practices
- ✅ Error handling for API failures

## 📊 Data Sources

- **Cities**: 12 popular Japanese destinations
- **Activities**: 200+ curated activities across all cities
- **Photos**: High-quality Unsplash images (300x200, 1200x600)
- **Categories**: 14 activity types from temples to pop culture

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
japan-travel-planner/
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.jsx     # Landing page with carousel
│   │   ├── PreferencesStep.jsx # Travel preferences
│   │   ├── CitiesStep.jsx      # City selection
│   │   ├── ActivitiesStep.jsx  # Activity selection
│   │   ├── ItineraryStep.jsx   # Review and generate
│   │   └── GeneratedItineraryStep.jsx # Timeline view
│   ├── config/             # Configuration
│   │   └── openai.js          # OpenAI API setup
│   ├── data/              # Static data
│   │   └── activities.js      # Cities and activities
│   └── App.css            # Global styles
├── public/                # Static assets
├── .env.example          # Environment template
├── vercel.json          # Deployment config
└── DEPLOYMENT.md        # Deployment guide
```

## 🎯 Features Showcase

### Beautiful Landing Page
- Modern hero section with gradient background
- Smooth auto-scrolling photo carousel
- Responsive design for all devices
- Call-to-action button to start planning

### AI-Powered Itinerary Generation
- Uses OpenAI GPT-4o-mini for intelligent planning
- Considers your preferences and selected activities
- Generates realistic day-by-day schedules
- Includes timing and location details

### Interactive Timeline View
- Instagram-style timeline layout
- Activity cards with photos and descriptions
- Visual dots and connecting lines
- Mobile-optimized responsive design

## 🚀 Ready to Deploy?

Your Japan Travel Planner is now complete with:

✅ **Stunning Landing Page** - Modern design with photo carousel  
✅ **Complete User Flow** - From preferences to final itinerary  
✅ **AI Integration** - Smart itinerary generation  
✅ **Timeline UI** - Beautiful visual layout  
✅ **Security** - Environment variables for API keys  
✅ **Deployment Ready** - Vercel configuration included  

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for the GPT API
- [Unsplash](https://unsplash.com/) for beautiful Japan photography
- [React Slick](https://react-slick.neostack.com/) for the carousel component
- [Vercel](https://vercel.com/) for seamless deployment

---

**Built with ❤️ for Japan travel enthusiasts**

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

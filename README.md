# 🥔 Legacy Potato Doctor

A modern, AI-powered web application for identifying potato plant diseases using advanced image recognition technology. Built with Next.js, TypeScript, and Tailwind CSS.

![Legacy Potato Doctor](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Functionality
- **🔍 AI-Powered Disease Detection**: Upload potato leaf images for instant disease identification
- **📚 Comprehensive Disease Library**: Browse detailed information about common potato diseases
- **🔖 Bookmark System**: Save diseases for quick reference with local storage persistence
- **🔍 Search & Filter**: Find specific diseases quickly with real-time search
- **💡 Daily Tips**: Randomized farming tips that change daily
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **🎨 Modern UI/UX**: Glassmorphism design with smooth animations
- **🌙 Dark Theme**: Elegant dark theme optimized for readability
- **⚡ Fast Performance**: Built with Next.js App Router for optimal performance
- **🔄 Real-time Updates**: Instant feedback with toast notifications
- **📊 Progress Indicators**: Visual confidence meters for analysis results

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/potato-disease-classifier.git
   cd potato-disease-classifier
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_API_URL=your_api_endpoint_here
   \`\`\`

4. **Add required assets**
   
   Place the following images in the \`public\` directory:
   - \`logo.png\` - Application logo
   - \`bg.png\` - Background image
   - Disease images in \`public/images/\` directory

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
potato-disease-classifier/
├── app/                          # Next.js App Router
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── bookmarks/
│   │   └── page.tsx             # Bookmarks page
│   ├── explore/
│   │   └── page.tsx             # Disease library page
│   ├── predict/
│   │   └── page.tsx             # Disease detection page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── about-screen.tsx         # About page component
│   ├── bookmarks-screen.tsx     # Bookmarks page component
│   ├── explore-screen.tsx       # Disease library component
│   ├── home-screen.tsx          # Home page component
│   ├── main-nav.tsx             # Navigation component
│   ├── predict-screen.tsx       # Disease detection component
│   ├── theme-provider.tsx       # Theme provider
│   └── tip-of-the-day.tsx       # Daily tips component
├── context/                     # React contexts
│   └── bookmark-context.tsx     # Bookmark management
├── data/                        # Static data
│   └── disease-data.ts          # Disease information
├── hooks/                       # Custom hooks
├── lib/                         # Utility functions
├── public/                      # Static assets
│   ├── images/                  # Disease images
│   ├── bg.png                   # Background image
│   └── logo.png                 # Application logo
├── .env.local                   # Environment variables
├── next.config.js               # Next.js configuration
├── package.json                 # Dependencies
├── tailwind.config.ts           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
\`\`\`

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Modern UI component library
- **Framer Motion**: Animation library
- **Sonner**: Toast notifications

### Fonts & Icons
- **Poppins**: Primary font family
- **Lucide React**: Icon library

### State Management
- **React Context**: For bookmark management
- **Local Storage**: For data persistence

### HTTP Client
- **Axios**: For API requests

## 📱 Pages & Features

### 🏠 Home Page (\`/\`)
- Welcome screen with app overview
- Feature highlights with navigation cards
- Daily tip display
- Quick access to main features

### 🔍 Disease Detection (\`/predict\`)
- Drag & drop image upload
- Real-time disease analysis
- Confidence percentage display
- Recent images gallery
- Progress indicators

### 📚 Disease Library (\`/explore\`)
- Browse all potato diseases
- Search and filter functionality
- Detailed disease information
- Bookmark diseases
- Responsive card layout

### 🔖 Bookmarks (\`/bookmarks\`)
- View saved diseases
- Remove bookmarks with confirmation
- Quick access to disease details
- Empty state handling

### ℹ️ About (\`/about\`)
- App information and features
- Contact information
- Dynamic copyright year
- External links

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#007AFF)
- **Secondary**: Green (#4CAF50)
- **Accent**: Amber (#FF9800)
- **Background**: Dark theme with glassmorphism effects

### Typography
- **Primary Font**: Poppins
- **Weights**: 400, 500, 600, 700

### Components
- **Cards**: Glassmorphism with backdrop blur
- **Buttons**: Consistent styling with hover effects
- **Modals**: Responsive with proper scrolling
- **Navigation**: Sticky header with active states

## 🔧 Configuration

### Environment Variables

\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com/predict

# Optional: Analytics, monitoring, etc.
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
\`\`\`

### Tailwind Configuration

The project uses a custom Tailwind configuration with:
- Custom color palette
- Poppins font integration
- Animation utilities
- Responsive breakpoints

## 📊 Data Structure

### Disease Data Model

\`\`\`typescript
type Disease = {
  id: string           // Unique identifier
  name: string         // Disease name
  short: string        // Brief description
  imageUrl: string     // Image path
  full: string         // Detailed description
}
\`\`\`

### API Response Model

\`\`\`typescript
type AnalysisResult = {
  class: string        // Detected disease name
  confidence: string   // Confidence score (0-1 or 0-100)
}
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push to main branch**

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

### Build Commands

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start

# Export static files (if needed)
npm run export
\`\`\`

## 🧪 Testing

### Running Tests

\`\`\`bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

### Testing Strategy
- Component testing with React Testing Library
- API integration testing
- E2E testing with Playwright (optional)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **TroyLegacy** - *Initial work* - [troylegacy256@gmail.com](mailto:troylegacy256@gmail.com)

## 🙏 Acknowledgments

- **CodeBasics** - For the original inspiration and AI model
- **shadcn/ui** - For the beautiful UI components
- **Vercel** - For the excellent deployment platform
- **Next.js Team** - For the amazing framework

## 📞 Support

If you have any questions or need help:

- **Email**: [troylegacy256@gmail.com](mailto:troylegacy256@gmail.com)
- **Website**: [https://troylegacy.vercel.app](https://troylegacy.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/TroyMoses/potato-disease-detection/issues)

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release
- AI-powered disease detection
- Comprehensive disease library
- Bookmark functionality
- Search and filter features
- Responsive design
- Dark theme

---

**Built with 💚 for farmers and agricultural professionals worldwide.**
\`\`\`
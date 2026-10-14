# Entrance Tricks - E-Learning Platform

A modern, beautiful e-learning web application built with Next.js, Material UI, and TypeScript. This platform provides comprehensive exam preparation tools including practice exams, leaderboards, and progress tracking.

## ✨ Features

### 🏠 Landing Page
- Beautiful hero section with gradient background
- Feature showcase with animated cards
- Statistics display
- Student testimonials
- Call-to-action sections
- Responsive design for all devices

### 📝 Exams
- Browse available practice exams
- Search and filter by exam type and subject
- Timed exam sessions with countdown timer
- Question navigator for easy navigation
- Multiple choice questions with image support
- Progress tracking and instant feedback
- Auto-submit when time expires

### 🏆 Leaderboard
- Global rankings
- Exam-specific leaderboards
- Competition leaderboards
- Beautiful podium display for top 3
- User rank highlighting
- Medal system (Gold, Silver, Bronze)
- Detailed statistics

### 👤 User Profile
- View and edit profile information
- Display user statistics
- Account information
- Profile avatar support
- Grade and verification status

### 🔐 Authentication
- Sign in with phone number
- User registration with validation
- Tab-based interface for sign in/sign up
- Password visibility toggle
- Form validation
- Secure token management

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** Material UI v7
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS + Material UI
- **Language:** TypeScript
- **Package Manager:** pnpm

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd entrance_tricks_web
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
entrance_tricks_web/
├── app/                      # Next.js app directory
│   ├── exams/               # Exams pages
│   │   ├── [id]/           # Dynamic exam detail page
│   │   └── page.tsx        # Exams listing page
│   ├── leaderboard/        # Leaderboard page
│   ├── profile/            # User profile page
│   ├── signin/             # Authentication page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── providers.tsx       # App providers (Theme, Query)
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   └── Header.tsx         # Navigation header
├── config/                # Configuration files
│   ├── axiosInstance.ts   # Axios setup with interceptors
│   └── queryClient.ts     # React Query configuration
├── lib/                   # Utilities and helpers
│   ├── api/
│   │   └── hooks.ts       # API hooks
│   ├── types/
│   │   └── index.ts       # TypeScript types
│   └── theme.ts           # Material UI theme
├── store/                 # State management
│   └── authStore.ts       # Authentication store
└── public/               # Static assets
```

## 🎨 Design System

### Color Palette
- **Primary:** Indigo (#6366f1)
- **Secondary:** Pink (#ec4899)
- **Success:** Green (#10b981)
- **Error:** Red (#ef4444)
- **Warning:** Amber (#f59e0b)
- **Info:** Blue (#3b82f6)

### Typography
- **Font Family:** Geist Sans (system fallback)
- **Headings:** Bold (700-800 weight)
- **Body:** Regular (400 weight)
- **Buttons:** Semi-bold (600 weight)

### Components
- Material Design 3 principles
- Rounded corners (12px border radius)
- Smooth animations and transitions
- Hover effects on interactive elements
- Consistent spacing system

## 🔑 Key Features Implementation

### Authentication
- Uses Zustand for state persistence
- JWT token management with refresh tokens
- Automatic token refresh on 401 errors
- Protected routes

### API Integration
- Centralized Axios instance
- Request/response interceptors
- Automatic snake_case to camelCase conversion
- Error handling
- Loading states

### Exam System
- Real-time countdown timer
- Question navigation
- Answer selection and submission
- Auto-save functionality
- Progress tracking

### Leaderboard
- Multiple leaderboard types (global, exam, competition)
- Real-time ranking updates
- Visual rank indicators (medals, colors)
- User highlighting

## 🚀 Available Scripts

```bash
# Development
pnpm dev          # Start development server

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🔒 Security Features

- Secure authentication flow
- Token-based authorization
- Protected API routes
- Input validation
- XSS protection
- CSRF protection

## 🌟 Future Enhancements

- [ ] Real-time notifications
- [ ] Study materials and resources
- [ ] Discussion forums
- [ ] Video lessons
- [ ] Performance analytics
- [ ] Mobile app integration
- [ ] Social features
- [ ] Gamification elements

## 📄 License

This project is proprietary and confidential.

## 👥 Support

For support, email support@entrancetricks.com or join our Slack channel.

---

Built with ❤️ by the Entrance Tricks Team

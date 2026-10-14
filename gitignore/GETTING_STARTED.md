# Getting Started with Entrance Tricks

Welcome to the Entrance Tricks e-learning platform! This guide will help you get up and running quickly.

## Prerequisites

Before you begin, make sure you have the following installed:
- Node.js 18.x or higher
- pnpm 10.x or higher (or npm/yarn)

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp env.example .env.local
```

Then edit `.env.local` and set your API URL:

```env
NEXT_PUBLIC_API_URL=http://your-api-url.com/api
```

### 3. Run the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure Overview

```
entrance_tricks_web/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Landing page
│   ├── signin/            # Authentication
│   ├── exams/             # Exam pages
│   ├── leaderboard/       # Rankings
│   └── profile/           # User profile
├── components/            # Reusable UI components
├── lib/                   # Utilities, types, theme
├── store/                 # State management (Zustand)
└── config/                # API and app configuration
```

## Key Pages

### 🏠 Landing Page (`/`)
The homepage showcasing features, statistics, testimonials, and call-to-actions.

### 🔐 Sign In (`/signin`)
Authentication page with tabs for sign in and sign up.

### 📝 Exams (`/exams`)
- Browse all available exams
- Filter by type and subject
- Search functionality
- Start practicing

### 🎯 Exam Detail (`/exams/[id]`)
- Take timed exams
- Navigate through questions
- Submit answers
- Track progress

### 🏆 Leaderboard (`/leaderboard`)
- View global rankings
- Filter by exam or competition
- See your rank
- Compare with peers

### 👤 Profile (`/profile`)
- View and edit profile information
- See your statistics
- Track your progress

## Features

### Authentication
- Sign in with phone number and password
- Automatic token management
- Persistent sessions
- Protected routes

### Exam System
- Timed exams with countdown
- Multiple choice questions
- Image support
- Question navigation
- Auto-submit on timeout
- Progress tracking

### Leaderboard
- Multiple leaderboard types
- Medal system (Gold, Silver, Bronze)
- Real-time rankings
- User highlighting

### UI/UX
- Material Design components
- Responsive layout
- Dark mode support (coming soon)
- Smooth animations
- Loading states
- Error handling

## API Integration

The app uses a custom Axios instance with:
- Automatic token injection
- Token refresh on 401 errors
- Request/response interceptors
- snake_case to camelCase conversion

Example API call:

```typescript
import { useExams } from '@/lib/api/hooks';

function MyComponent() {
  const { data: exams, isLoading, error } = useExams();
  
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorMessage />;
  
  return <ExamsList exams={exams} />;
}
```

## State Management

Using Zustand for authentication state:

```typescript
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  // Use authentication state
}
```

## Styling

The project uses Material UI with a custom theme and Tailwind CSS:

```typescript
// Theme customization in lib/theme.ts
const theme = createTheme({
  palette: {
    primary: { main: '#6366f1' },
    secondary: { main: '#ec4899' },
    // ...
  },
});
```

## Common Tasks

### Adding a New Page

1. Create a new folder in `app/`:
```bash
mkdir app/my-page
```

2. Add a `page.tsx` file:
```typescript
export default function MyPage() {
  return <div>My Page</div>;
}
```

### Creating a New Component

1. Create a file in `components/`:
```typescript
// components/MyComponent.tsx
'use client';

import { Box } from '@mui/material';

export default function MyComponent() {
  return <Box>My Component</Box>;
}
```

### Adding an API Hook

1. Add to `lib/api/hooks.ts`:
```typescript
export const useMyData = () => {
  return useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      const response = await axiosInstance.get('/my-endpoint/');
      return response.data;
    },
  });
};
```

## Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Troubleshooting

### Port already in use
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Dependencies issues
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

### API connection issues
- Check your `.env.local` file
- Verify the API URL is correct
- Ensure the API server is running

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_APP_URL` | App URL | No |

## Need Help?

- Check the [README.md](./README.md) for more details
- Review the code comments
- Check the Material UI documentation: https://mui.com/
- Check the Next.js documentation: https://nextjs.org/docs

## What's Next?

- Explore the codebase
- Customize the theme
- Add new features
- Connect to your backend API
- Deploy to production

Happy coding! 🚀


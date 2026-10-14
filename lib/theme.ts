import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Indigo
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          padding: '10px 24px',
          fontSize: '0.9375rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          '&:hover': {
            boxShadow: '0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;


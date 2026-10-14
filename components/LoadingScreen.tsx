'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { School } from '@mui/icons-material';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        gap: 3,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={80} thickness={4} />
        <School
          sx={{
            position: 'absolute',
            fontSize: 40,
            color: 'primary.main',
          }}
        />
      </Box>
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}


'use client';

import { Box, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          fontSize: 80,
          color: 'text.disabled',
          mb: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
          {description}
        </Typography>
      )}
      {action && (
        <Button variant="contained" size="large" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Box>
  );
}


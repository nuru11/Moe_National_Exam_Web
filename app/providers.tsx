'use client';

import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import { makeQueryClient } from '@/lib/config/queryClient';
import theme from '@/lib/theme';

export function Providers({ children }: { children: React.ReactNode }) {
    // Create QueryClient instance once per render
    const [queryClient] = useState(() => makeQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}


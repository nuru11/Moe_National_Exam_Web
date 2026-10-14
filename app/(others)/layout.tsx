'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Box, CircularProgress } from '@mui/material';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';
import Header from '@/components/Header';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthStore();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // Show nothing while redirecting
    if (!isAuthenticated) {
        return <>
            <Header />
            <Box component="main" sx={{ pt: 8 }}>
                {children}
            </Box>
        </>
    }

    // Render protected content with authenticated header
    return (
        <>
            <AuthenticatedHeader />
            <Box component="main" sx={{ pt: 8 }}>
                {children}
            </Box>
        </>
    );
}

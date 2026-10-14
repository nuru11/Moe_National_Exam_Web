'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Box, CircularProgress } from '@mui/material';
import AuthenticatedHeader from '@/components/AuthenticatedHeader';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);
    useEffect(() => {
        // Wait for Zustand to hydrate from localStorage
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setIsHydrated(true);
        });

        // If already hydrated, set immediately
        if (useAuthStore.persist.hasHydrated()) {

            queueMicrotask(() => {
                setIsHydrated(true);
            });
        }

        return unsubscribe;
    }, []);

    useEffect(() => {
        // Check authentication status
        if (!isLoading && !isAuthenticated && isHydrated) {
            // Redirect to sign in page if not authenticated
            router.push('/signIn');
        }
    }, [isAuthenticated, isLoading, router, isHydrated]);

    // Show loading state while checking authentication
    if (isLoading || !isHydrated) {
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
        return null;
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

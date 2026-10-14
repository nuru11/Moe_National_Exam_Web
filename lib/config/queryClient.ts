import { QueryClient } from '@tanstack/react-query';

// Default options for QueryClient
export const queryClientOptions = {
    defaultOptions: {
        queries: {
            // Time before data is considered stale (5 minutes)
            staleTime: 1000 * 60 * 5,
            // Time before inactive queries are garbage collected (10 minutes)
            gcTime: 1000 * 60 * 10,
            // Retry failed requests 3 times
            retry: 3,
            // Refetch on window focus
            refetchOnWindowFocus: false,
            // Refetch on reconnect
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry failed mutations once
            retry: 1,
        },
    },
};

// Helper function to create a new QueryClient instance
// This should be called per request/render to avoid sharing state
export function makeQueryClient() {
    return new QueryClient(queryClientOptions);
}


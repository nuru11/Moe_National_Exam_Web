'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CONTENT_APP_PACKAGE } from '@/lib/config/app';
import { useStoreLinks } from '@/lib/api/hooks';
import { useAuthStore } from '@/store/authStore';

const STORAGE_KEY = 'selected-app-package';

type SelectedAppContextValue = {
    selectedPackage: string | null;
    setSelectedPackage: (appPackage: string | null) => void;
    ready: boolean;
};

const SelectedAppContext = createContext<SelectedAppContextValue | null>(null);

export function SelectedAppProvider({ children }: { children: React.ReactNode }) {
    const [selectedPackage, setSelectedPackageState] = useState<string | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            setSelectedPackageState(saved);
        }
        setReady(true);
    }, []);

    const setSelectedPackage = (appPackage: string | null) => {
        setSelectedPackageState(appPackage);
        if (appPackage) {
            sessionStorage.setItem(STORAGE_KEY, appPackage);
        } else {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    };

    return (
        <SelectedAppContext.Provider value={{ selectedPackage, setSelectedPackage, ready }}>
            {children}
        </SelectedAppContext.Provider>
    );
}

export function useSelectedApp() {
    const context = useContext(SelectedAppContext);
    if (!context) {
        throw new Error('useSelectedApp must be used within SelectedAppProvider');
    }
    return context;
}

function linksForPackage(
    rows: { appPackage: string; playStoreUrl: string; appStoreUrl: string }[] | undefined,
    appPackage?: string | null,
) {
    const row = rows?.find((item) => item.appPackage === appPackage);
    return {
        playStoreUrl: row?.playStoreUrl || '',
        appStoreUrl: row?.appStoreUrl || '',
    };
}

export function useActiveStoreLinks() {
    const { data, isFetched } = useStoreLinks();
    const { selectedPackage, ready: selectionReady } = useSelectedApp();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const gradePackage = useAuthStore((state) => state.user?.grade?.appPackage);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const finish = () => setAuthReady(true);
        const unsubscribe = useAuthStore.persist.onFinishHydration(finish);
        if (useAuthStore.persist.hasHydrated()) {
            queueMicrotask(finish);
        }
        return unsubscribe;
    }, []);

    if (!authReady || !selectionReady || !isFetched) {
        return { playStoreUrl: '', appStoreUrl: '' };
    }

    if (isAuthenticated && gradePackage) {
        return linksForPackage(data, gradePackage);
    }
    if (selectedPackage) {
        return linksForPackage(data, selectedPackage);
    }
    return linksForPackage(data, CONTENT_APP_PACKAGE);
}

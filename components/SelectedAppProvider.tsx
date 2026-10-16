'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useStoreLinks } from '@/lib/api/hooks';
import { useAuthStore } from '@/store/authStore';

const STORAGE_KEY = 'selected-app-package';
const GRADE_KEY = 'selected-grade-id';

type SelectedAppContextValue = {
    selectedPackage: string | null;
    setSelectedPackage: (appPackage: string | null) => void;
    selectedGradeId: number | null;
    setSelectedGrade: (gradeId: number, appPackage?: string | null) => void;
    ready: boolean;
};

const SelectedAppContext = createContext<SelectedAppContextValue | null>(null);

export function SelectedAppProvider({ children }: { children: React.ReactNode }) {
    const [selectedPackage, setSelectedPackageState] = useState<string | null>(null);
    const [selectedGradeId, setSelectedGradeIdState] = useState<number | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            setSelectedPackageState(saved);
        }
        const savedGrade = Number(sessionStorage.getItem(GRADE_KEY));
        if (savedGrade) {
            setSelectedGradeIdState(savedGrade);
        }
        setReady(true);
    }, []);

    const setSelectedPackage = useCallback((appPackage: string | null) => {
        setSelectedPackageState(appPackage);
        setSelectedGradeIdState(null);
        sessionStorage.removeItem(GRADE_KEY);
        if (appPackage) {
            sessionStorage.setItem(STORAGE_KEY, appPackage);
        } else {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const setSelectedGrade = useCallback((gradeId: number, appPackage?: string | null) => {
        setSelectedGradeIdState(gradeId);
        sessionStorage.setItem(GRADE_KEY, String(gradeId));
        if (appPackage) {
            setSelectedPackageState(appPackage);
            sessionStorage.setItem(STORAGE_KEY, appPackage);
        }
    }, []);

    return (
        <SelectedAppContext.Provider value={{ selectedPackage, setSelectedPackage, selectedGradeId, setSelectedGrade, ready }}>
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
    const { selectedPackage, selectedGradeId, ready: selectionReady } = useSelectedApp();
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
    if (selectedGradeId && selectedPackage) {
        return linksForPackage(data, selectedPackage);
    }
    return { playStoreUrl: '', appStoreUrl: '' };
}

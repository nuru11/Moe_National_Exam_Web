import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User, AuthToken, AuthResponse } from '@/lib/types';

interface AuthState {
    user: User | null;
    token: AuthToken | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

interface AuthActions {
    login: (authResponse: AuthResponse) => void;
    logout: () => void;
    setUser: (user: User) => void;
    setToken: (token: AuthToken) => void;
    updateUser: (user: Partial<User>) => void;
    setLoading: (isLoading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            ...initialState,

            login: (authResponse: AuthResponse) => {
                set({
                    user: authResponse.user,
                    token: authResponse.tokens,
                    isAuthenticated: true,
                    isLoading: false,
                });
            },

            logout: () => {
                set({
                    ...initialState,
                });
            },

            setUser: (user: User) => {
                set({
                    user,
                    isAuthenticated: !!user,
                });
            },

            setToken: (token: AuthToken) => {
                set({
                    token,
                });
            },

            updateUser: (userUpdates: Partial<User>) => {
                set((state) => {
                    if (!state.user) return state;
                    return {
                        user: {
                            ...state.user,
                            ...userUpdates,
                        },
                    };
                });
            },

            setLoading: (isLoading: boolean) => {
                set({ isLoading });
            },
        }),
        {
            name: 'auth-storage', // localStorage key
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);


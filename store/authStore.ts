import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthState {
    userId: User | null;
    jwt: string | null;
    expiresAt: number | null;

    setAuth: (payload: { userId: User; jwt: string; expiresAt: number }) => void;
    logout: () => void;
    isSessionValid: () => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            userId: null,
            jwt: null,
            expiresAt: null,

            setAuth: ({ userId, jwt, expiresAt }) => {
                console.log("🚀 ~ expiresAt:", expiresAt)
                set({ userId, jwt, expiresAt });
            },

            logout: () => {
                set({ userId: null, jwt: null, expiresAt: null });
            },

            isSessionValid: () => {
                const expiresAt = get().expiresAt;
                if (!expiresAt) return false;
                //return new Date(expiresAt) > new Date();
                return Date.now() < expiresAt
            },
        }),
        {
            name: 'auth-storage',
            storage: {
                getItem: async (name) => {
                    const value = await AsyncStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                },
                setItem: async (name, value) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: async (name) => {
                    await AsyncStorage.removeItem(name);
                },
            },
        }
    )
);

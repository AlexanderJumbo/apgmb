// hooks/useTokenExpiryWatcher.ts
import { useEffect } from "react";
import { Alert } from "react-native";
import { useAuthStore } from "@/store/authStore";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export const useTokenExpiryWatcher = () => {
    const expiresAt = useAuthStore((state) => state.expiresAt);
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        if (!expiresAt) return;

        const timeNow = Date.now();
        const timeLeft = expiresAt - timeNow;

        if (timeLeft <= 0) {
            Alert.alert("Sesión expirada", "Tu sesión ha caducado.");
            Toast.show({
                type: "error",
                text1: "Sesión expirada",
                text2: "Tu sesión ha caducado. Vuelve a iniciar sesión.",
            });
            logout();
            router.replace("/(stack)/auth");
            return;
        }

        const warningTime = timeLeft - 60000;

        const warningTimer = setTimeout(() => {
            Toast.show({
                type: "info",
                text1: "Sesión por expirar",
                text2: "Tu sesión está por expirar. Por motivos de seguridad vuelve a iniciar sesión.",
            });
        }, Math.max(0, warningTime));

        const logoutTimer = setTimeout(() => {
            Toast.show({
                type: "error",
                text1: "Sesión expirada",
                text2: "Tu sesión ha caducado. Vuelve a iniciar sesión.",
            });
            logout();
            router.replace("/(stack)/auth");
        }, timeLeft);

        return () => {
            clearTimeout(warningTimer);
            clearTimeout(logoutTimer);
        };
    }, [expiresAt]);
};
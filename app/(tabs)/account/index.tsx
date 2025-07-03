import { useAuthStore } from "@/store/authStore";
import { Redirect, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const logoutClick = () => {
    logout();
    console.log("logout");
    router.replace("/(stack)/auth");
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl mb-4">Account</Text>

      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded"
        onPress={logoutClick}
      >
        <Text className="text-white font-semibold">Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;

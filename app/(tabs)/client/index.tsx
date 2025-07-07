import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const logout = useAuthStore((state) => state.logout);
  const logoutClick = () => {
    logout();
    console.log("logout");
    router.replace("/(stack)/auth");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FA]">
      <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1">
        <View className="bg-white rounded-3xl p-6 shadow-xl">
          <Text className="text-2xl font-bold text-black mb-4">
            Edita tu perfil
          </Text>

          <TouchableOpacity
            onPress={logoutClick}
            className="mt-4 bg-red-500 rounded-xl p-3"
          >
            <Text className="text-white text-center font-semibold">
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

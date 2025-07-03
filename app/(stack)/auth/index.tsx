import CustomButton from "@/components/shared/CustomButton";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";

import { login } from "@/services/auth/authService";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasErrors, setHasErrors] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    try {
      console.log("🚀 ~ Login ~ username:", username);
      console.log("🚀 ~ Login ~ password:", password);

      const data = await login(username, password);
      console.log("🚀 ~ handleLogin ~ data:", data);
      setAuth(data);

      if (data.jwt !== "" && data.userId !== 0) {
        return router.push("/(tabs)/home");
      } else {
        setHasErrors(!hasErrors);
      }
    } catch (error) {
      console.log(error);
      setHasErrors(!hasErrors);
    }
  };

  return (
    <SafeAreaView>
      <View className="px-10 mt-5 bg-slate-100">
        <Text className="text-3xl text-center">Bienvenido a APGMB</Text>
        <TextInput
          onChangeText={setUsername}
          placeholder="Ingresa tu email aquí"
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Ingresa tu contraseña aquí"
          secureTextEntry
        />
        <CustomButton onPress={() => handleLogin()}>
          Iniciar sesión
        </CustomButton>
        {hasErrors && (
          <Text className="text-center text-red-600">
            Usuario y/o contraseña incorrectos{" "}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;

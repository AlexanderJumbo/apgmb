import { router } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";

import { login } from "@/services/auth/authService";
import { useAuthStore } from "@/store/authStore";

const { height: screenHeight } = Dimensions.get("window");

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

  const androidKeyboardOffset = Platform.select({
    ios: 0, // iOS maneja mejor el offset automáticamente con "padding" o "height"
    android: -screenHeight * 0.1, // Un valor negativo para empujar el contenido hacia arriba
    // Puedes ajustar 0.25 (25% de la altura de la pantalla)
    // o probar un valor fijo como -150
  });

  return (
    <KeyboardAvoidingView
      className="flex-1"
      // Usa "padding" para ambas plataformas para un comportamiento más consistente.
      // "height" también podría funcionar, pero "padding" suele ser más flexible.
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      // Aplica el offset condicional.
      keyboardVerticalOffset={androidKeyboardOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white relative">
          {/* Fondo rosa fijo */}
          <View
            className="absolute top-0 left-0 right-0 bg-[#0cc6bd] h-[300px] rounded-b-[60px]"
            style={{ zIndex: 0 }}
          />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            // Desactiva el desplazamiento visual por defecto si no es deseado,
            // pero mantenlo para poder scrollear si hay muchos inputs.
            // Para una experiencia más controlada, a veces se puede jugar con `scrollEnabled`
            // pero para formularios, lo mejor es dejarlo habilitado.
          >
            {/* Contenido encima del fondo */}
            <View
              className="flex-1 justify-end relative"
              style={{ zIndex: 1, marginTop: 150 }}
            >
              <View className="px-10 bg-white pb-10 rounded-t-[40px]">
                <Text className="text-3xl text-center font-bold mb-8">
                  Iniciar sesión
                </Text>

                <Text className="text-sm mb-1">Usuario</Text>
                <TextInput
                  onChangeText={setUsername}
                  value={username}
                  placeholder="Ingresa tu nombre de usuario aquí"
                  className="bg-gray-100 rounded-lg p-3 mb-4"
                />

                <Text className="text-sm mb-1">Contraseña</Text>
                <TextInput
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Ingresa tu contraseña"
                  secureTextEntry
                  className="bg-gray-100 rounded-lg p-3 mb-4"
                />

                {/* <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-sm text-gray-600">Remember Me</Text>
                  <Text className="text-sm text-[#0cc6bd]">
                    Forgot Password?
                  </Text>
                </View> */}

                <TouchableOpacity
                  onPress={handleLogin}
                  className="bg-[#0cc6bd] rounded-xl py-3"
                >
                  <Text className="text-white text-center text-base font-bold">
                    Ingresar
                  </Text>
                </TouchableOpacity>

                {hasErrors && (
                  <Text className="text-center text-red-600 mt-4">
                    Usuario y/o contraseña incorrectos
                  </Text>
                )}

                {/* <Text className="text-center text-sm mt-6 text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Text className="text-[#0cc6bd] font-semibold">Sign up</Text>
                </Text> */}
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

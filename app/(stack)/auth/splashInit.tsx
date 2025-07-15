import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function SplashScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* <Image
        source={require("../assets/bg.png")}
        className="absolute top-0 left-0 w-full h-1/2"
        resizeMode="cover"
      /> */}

      {/* Contenido */}
      <View className="flex-1 justify-end">
        <View className="px-10 mt-5 bg-white pb-10 rounded-t-[40px]">
          <Text className="text-3xl font-bold text-gray-800 text-center">
            Bienvenido
          </Text>
          <Text className="text-center text-gray-500 mt-2 mb-10">
            APGMB, una aplicación para automatización del proceso de toma de
            lectura del servicio de agua potable
          </Text>

          <TouchableOpacity
            className="bg-[#22c194] w-14 h-14 rounded-full items-center justify-center self-end"
            onPress={() => router.push("/(stack)/auth")}
          >
            <Text className="text-white text-xl font-bold">{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

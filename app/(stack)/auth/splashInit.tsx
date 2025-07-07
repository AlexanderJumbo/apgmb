import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export default function SplashScreen() {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      {/* Fondo rosa con curva */}
      {/* <Image
        source={require("../assets/bg.png")}
        className="absolute top-0 left-0 w-full h-1/2"
        resizeMode="cover"
      /> */}

      {/* Contenido */}
      <View className="flex-1 justify-end">
        <View className="px-10 mt-5 bg-white pb-10 rounded-t-[40px]">
          <Text className="text-3xl font-bold text-gray-800 text-center">
            Welcome
          </Text>
          <Text className="text-center text-gray-500 mt-2 mb-10">
            Lorem ipsum dolor sit amet consectetur. Lorem id sit
          </Text>

          <TouchableOpacity
            className="bg-[#FF7F7F] w-14 h-14 rounded-full items-center justify-center self-end"
            onPress={() => router.push("/(stack)/auth")}
          >
            <Text className="text-white text-xl font-bold">{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

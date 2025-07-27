import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import React from "react";

const HomeScreen = () => {
  const screenHeight = Dimensions.get("window").height;
  const imageHeight = screenHeight * 0.7;

  return (
    <ScrollView className="flex-1">
      <View
        className="items-center justify-center"
        style={{ height: imageHeight }}
      >
        <Image
          source={require("../../../assets/images/balao_bg.png")}
          resizeMode="contain"
          className="w-full h-full"
        />
      </View>

      <View className="p-4 bg-white rounded-t-2xl -mt-6">
        <Text className="text-xl font-bold text-green-900 mb-2">
          GAD Municipal de Balao
        </Text>
        <Text className="text-base text-gray-700 leading-relaxed">
          El Gobierno Autónomo Descentralizado de Balao se destaca por su
          compromiso con la comunidad, impulsando el desarrollo sostenible de la
          región. En su escudo se reflejan elementos clave como la agricultura,
          la pesca y la identidad cultural
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const user = useAuthStore((state) => state.userId);
  console.log("🚀 ~ HomeScreen ~ user:", user);

  const [changeTab, setChangeTab] = useState("Home");

  type Tab = {
    name: string;
    icon: keyof typeof Ionicons.glyphMap;
  };

  const changeTabClick = (tab: string) => {
    setChangeTab(tab);
  };

  const tabs: Tab[] = [
    { name: "Home", icon: "home-outline" },
    { name: "Search", icon: "search-outline" },
    { name: "Wishlist", icon: "heart-outline" },
    { name: "Account", icon: "person-outline" },
    { name: "Bag", icon: "cart-outline" },
  ];

  return (
    <SafeAreaView className="flex-1 items-center justify-between bg-white px-4">
      <View>
        <Text>Home Page</Text>
      </View>
      {/* Contenido de prueba */}
      {/* <View className="flex-1 justify-center items-center">
        <Text className="text-xl">Pantalla principal</Text>
      </View>

      <View className="flex-row justify-around border-t border-gray-300 bg-white w-full py-2">
        {tabs.map((tab) => {
          const isActive = changeTab === tab.name;

          return (
            <TouchableOpacity
              key={tab.name}
              className="items-center justify-center"
              onPress={() => changeTabClick(tab.name)}
            >
              <Ionicons
                name={tab.icon}
                size={24}
                color={isActive ? "#000" : "#999"}
              />
              <Text
                className={`text-xs ${isActive ? "text-black font-semibold" : "text-gray-400"}`}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

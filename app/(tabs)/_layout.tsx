import { Tabs } from "expo-router";
import "../global.css";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./home";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            height: 60,
            paddingBottom: 4,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="home/index"
          options={{
            segment: "home",
            title: "Inicios",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="meter/index"
          options={{
            segment: "meter",
            title: "Buscar",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lecture/index"
          options={{
            segment: "lecture",
            title: "Favoritos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="client/index"
          options={{
            segment: "client",
            title: "Cuenta",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account/index"
          options={{
            href: "/account",
            title: "Bolsa",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}

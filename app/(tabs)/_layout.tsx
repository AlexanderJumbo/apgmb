import { Tabs } from "expo-router";
import "../global.css";
import { Ionicons } from "@expo/vector-icons";
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
            //segment: "home",
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="lecture/index"
          options={{
            //segment: "lecture",
            title: "Lectura",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="book-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account/index"
          options={{
            //segment: "account",
            title: "Cuentas",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="save-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="client/index"
          options={{
            //segment: "client",
            title: "Perfil",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <Toast />
    </>
  );
}

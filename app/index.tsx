import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";

const Index = () => {
  const user = useAuthStore((state) => state.userId);
  console.log("🚀 ~ Index ~ user:", user);

  return user ? (
    <Redirect href={"/(tabs)/home/index"} />
  ) : (
    <Redirect href={"/(stack)/auth/splashInit"} />
  );
};

export default Index;

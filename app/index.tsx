import { useAuthStore } from "@/store/authStore";
import { Redirect } from "expo-router";

const Index = () => {
  const user = useAuthStore((state) => state.userId);
  console.log("🚀 ~ Index ~ user:", user);

  return user ? (
    <Redirect href={"/home"} />
  ) : (
    <Redirect href={"/(stack)/auth/splashInit"} />
  );
};

export default Index;

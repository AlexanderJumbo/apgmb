import React from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

interface Props extends PressableProps {
  children: string;
  color?: "primary" | "secondary" | "tertiary";
  variant?: "contained" | "text-only";
  className?: string;
}

const CustomButton = React.forwardRef(
  (
    {
      children,
      color = "primary",
      onPress,
      onLongPress,
      variant = "contained",
      className,
    }: Props,
    ref: React.Ref<View>
  ) => {
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        className={`${className}`}
        ref={ref}
      >
        <Text className="text-center">{children}</Text>
      </Pressable>
    );
  }
);

export default CustomButton;

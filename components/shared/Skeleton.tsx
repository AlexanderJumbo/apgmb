// components/skeletons/AccountSkeleton.tsx
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { MotiView } from "moti";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SkeletonBlock = ({ width, height, style }: any) => (
  <MotiView
    from={{ opacity: 0.3 }}
    animate={{ opacity: 1 }}
    transition={{
      loop: true,
      type: "timing",
      duration: 800,
      repeatReverse: true,
    }}
    style={[
      { backgroundColor: "#e1e9ee", width, height, borderRadius: 8 },
      style,
    ]}
  />
);

export default function Skeleton() {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, i) => (
        <View key={i} style={styles.card}>
          <SkeletonBlock
            width={SCREEN_WIDTH * 0.6}
            height={20}
            style={{ marginBottom: 6 }}
          />
          <SkeletonBlock
            width={SCREEN_WIDTH * 0.4}
            height={14}
            style={{ marginBottom: 4 }}
          />
          <SkeletonBlock
            width={SCREEN_WIDTH * 0.5}
            height={14}
            style={{ marginBottom: 4 }}
          />
          <SkeletonBlock
            width={SCREEN_WIDTH * 0.3}
            height={14}
            style={{ marginBottom: 4 }}
          />

          <View style={styles.row}>
            <SkeletonBlock width={80} height={20} />
            <SkeletonBlock width={60} height={20} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f8f9fb",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});

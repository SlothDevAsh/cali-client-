import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";

interface props {
  size?: number;
  color?: string;
}
const Loader: FC<props> = ({ size = 20, color = "black" }) => {
  return (
    <View style={styles.center}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

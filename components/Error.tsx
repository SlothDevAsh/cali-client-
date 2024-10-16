import { StyleSheet, Text, View, Image } from "react-native";
import React, { FC } from "react";

interface Props {
  message?: string;
  imageSource?: any;
}

const Error: FC<Props> = ({
  message = "Failed to load data. Please try again later.",
  imageSource = require("@/assets/images/close.png"),
}) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

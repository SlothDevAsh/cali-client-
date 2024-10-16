import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import Loader from "./Loader";
import { Colors } from "@/constants/Colors";

interface props {
  onPress: () => void;
  loading?: boolean;
}
const Button: FC<props> = ({ onPress, loading }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <Loader size={20} color={"white"} />
      ) : (
        <Text style={styles.buttonText}>Create Job</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.button,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    height: 50,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: "600",
  },
});

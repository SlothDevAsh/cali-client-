import { FC } from "react";
import { Text, View, Image, StyleSheet } from "react-native";

const EmptyList: FC = () => (
  <View style={styles.emptyContainer}>
    <Image
      source={require("@/assets/images/box.png")}
      style={styles.emptyImage}
      resizeMode="contain"
    />
    <Text style={styles.emptyText}>No jobs available at the moment.</Text>
  </View>
);

export default EmptyList;

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.9,
  },
  emptyImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});

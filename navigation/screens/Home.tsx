import { Text, View, StyleSheet } from "react-native";
import React from "react";

interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

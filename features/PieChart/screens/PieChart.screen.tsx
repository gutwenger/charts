import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PieChartScreenProps {}

export const PieChartScreen: React.FC<PieChartScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Pie Chart</Text>
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

import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface LineChartScreenProps {}

export const LineChartScreen: React.FC<LineChartScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Line Chart</Text>
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

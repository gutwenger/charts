import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getLineChartTestData } from "../testData/data";
import { LineChart } from "../components/LineChart";
import moment from "moment";

interface LineChartScreenProps {}

export const LineChartScreen: React.FC<LineChartScreenProps> = (props) => {
  const [range, setRange] = useState<7 | 30 | 90>(7);
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    getTestData();
  }, []);

  useEffect(() => {
    getTestData();
  }, [range]);

  function getTestData() {
    const testData = getLineChartTestData(range);
    setData(testData);
  }

  const getButtonStyle = (value: number) => {
    return value === range ? styles.buttonActive : styles.button;
  };

  return (
    <View style={styles.container}>
      <Text>Line Chart</Text>
      <View style={styles.buttonGroup}>
        <Pressable onPress={() => setRange(7)}>
          <View style={getButtonStyle(7)}>
            <Text>7 Days</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setRange(30)}>
          <View style={getButtonStyle(30)}>
            <Text>30 Days</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => setRange(90)}>
          <View style={getButtonStyle(90)}>
            <Text>90 Days</Text>
          </View>
        </Pressable>
      </View>
      <LineChart
        data={data.map((item) => ({
          name: moment(item.date).format("MM-DD"),
          value: item.value,
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 10,
  },
  buttonActive: {
    padding: 10,
    borderWidth: 1,
    borderColor: "red",
    marginHorizontal: 10,
  },
});

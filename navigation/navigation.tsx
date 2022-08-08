import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LineChartScreen } from "../features/LineChart/screens/LineChart.screen";
import { PieChartScreen } from "../features/PieChart/screens/PieChart.screen";
import React from "react";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Line Chart" component={LineChartScreen} />
      <Tab.Screen name="Pie Chart" component={PieChartScreen} />
    </Tab.Navigator>
  );
};

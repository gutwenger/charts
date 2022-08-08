import React from "react";
import { View } from "react-native";
import { useD3 } from "../../useD3.hook";

interface LineChartProps {
  data: Array<{ name: string; value: number }>;
}

export const LineChart: React.FC<LineChartProps> = (props) => {
  const { data } = props;

  const {} = useD3({ data });

  return <View></View>;
};

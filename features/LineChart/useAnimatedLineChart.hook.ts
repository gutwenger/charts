import { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { mixPath, parse } from "react-native-redash";
import { scaleLinear, scaleTime } from "d3-scale";
import * as d3Shape from 'd3-shape';

import { BUTTON_WIDTH } from "./screens/LineChart.screen";
import { getLineChartTestData } from "./testData/testData";

interface UseAnimatedLineChartParams {
  width: number;
  height: number;
}


export const useAnimatedLineChart = (params: UseAnimatedLineChartParams) => {
  const { width, height } = params;

  const stats = useSharedValue([]);
  const transition = useSharedValue(0);
  const selected = useSharedValue(0);
  const translateX = useDerivedValue(
    () => (BUTTON_WIDTH + 20) * selected.value
  );
  const animatedButtonStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const fetchData = (number) => {
    const response = getLineChartTestData(number);
    const prevData = stats.value?.[1] || [];
    const newData = response.map((item) => ({
      name: item.date,
      value: item.value,
    }));
    const previousData = prevData.length === 0 ? newData : prevData;
    const currentData = newData;
    return [previousData, currentData];
  }

  const setRange = (number) => {
    stats.value = fetchData(number);
    selected.value = withTiming(number);
    transition.value = 0;
    transition.value = withTiming(1);
  };

  const getD = (data: Array<{ name: string; value: number }>) => {
    if (!data || data.length === 0) return `M0 0 L${width} 0`;

    const getDomain = (domain: number[]) => [
      Math.min(...domain),
      Math.max(...domain),
    ];

    const scaleX = scaleTime()
      .domain(getDomain(data.map((_, i) => i)))
      .range([0, width]);

    const scaleY = scaleLinear()
      .domain(getDomain(data.map((d) => d.value)))
      .range([height, 0]);

    const result = d3Shape
      .line<{ name: string; value: number }>()
      .x((d, i) => scaleX(i))
      .y((d) => scaleY(d.value))
      .curve(d3Shape.curveBasis)(data) as string;

    return result;
  };

  const animatedProps = useAnimatedProps(() => {
    const [prevData, curData] = stats.value;
    const path = mixPath(
      transition.value,
      parse(getD(prevData)),
      parse(getD(curData)),
    );
    return {
      // d: path
      d: `M0 0 L${width} 0`
    }
  })

  return {
    animatedButtonStyle,
    animatedProps,
    selected,
    transition,
    setRange,
  }
}
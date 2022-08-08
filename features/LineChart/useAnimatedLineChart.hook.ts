import { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { scaleLinear, scaleTime } from "d3-scale";
import * as d3Shape from 'd3-shape';

import { BUTTON_WIDTH } from "./screens/LineChart.screen";
import { getLineChartTestData } from "./testData/testData";
import { Range } from './useTestLineChart.hook';
import { mixPath, parse } from "react-native-redash";

interface UseAnimatedLineChartParams {
  width: number;
  height: number;
}


export const useAnimatedLineChart = (params: UseAnimatedLineChartParams) => {
  const { width, height } = params;

  const transition = useSharedValue(0);
  const selected = useSharedValue(0);
  const translateX = useDerivedValue(
    () => (BUTTON_WIDTH + 20) * selected.value
  );

  const stats = useSharedValue([]);

  const animatedButtonStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const getD = (data: Array<{ name: string; value: number }>) => {
    if (!data || data.length === 0) return `M 0 0 L ${width} 0`;

    const getDomain = (domain: number[]) => [
      Math.min(...domain),
      Math.max(...domain),
    ];

    const scaleX = scaleTime()
      .domain(getDomain(data.map((d, i) => i)))
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

  function getTestData(number: Range) {
    return getLineChartTestData(number);
  }

  const setRange = (number) => {
    const prevData = stats.value?.[1] || [];
    const newData = getTestData(number);
    const parsedNewData = newData.map((item) => ({
      name: item.date,
      value: item.value,
    }));
    const previousData = prevData.length === 0 ? parsedNewData : prevData;
    const currentData = parsedNewData;

    stats.value = [previousData, currentData];
    selected.value = withTiming(number);
    transition.value = 0;
    transition.value = withTiming(1);
  };

  const animatedProps = useAnimatedProps(() => ({
    d: mixPath(
      transition.value,
      parse(getD(stats.value[0])),
      parse(getD(stats.value[1])),
    )
  }))

  return {
    transition,
    selected,
    setRange,
    animatedButtonStyle,
    animatedProps,
  }
}
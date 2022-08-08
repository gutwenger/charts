import { useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { mixPath, parse } from "react-native-redash";
import { scaleLinear, scaleTime } from "d3-scale";
import * as d3Shape from 'd3-shape';

import { Range } from './useTestLineChart.hook';

import { seven, thirty, ninety } from './testData/testData';

interface UseAnimatedLineChartParams {
  width: number;
  height: number;
}


export const useAnimatedLineChart = (params: UseAnimatedLineChartParams) => {
  const { width, height } = params;

  const previous = useSharedValue<Range>(0);
  const current = useSharedValue<Range>(0);
  const transition = useSharedValue(0);
  const translateX = useDerivedValue(
    () => {
      return (170) * current.value
    }
  );
  const animatedButtonStyle = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });

  const setRange = (number) => {
    previous.value = current.value;
    current.value = withTiming(number);
    transition.value = 0;
    transition.value = withTiming(1);
  };


  function buildPath(data: Array<{ name: string; value: number }>) {
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

    return d3Shape
      .line()
      .x(([, x]) => scaleX(x) as number)
      .y(([y]) => scaleY(y) as number)
      .curve(d3Shape.curveBasis)(data.map((d, i) => [i, d.value])) as string;
  };

  const paths = useDerivedValue(() => {
    const newData = current.value === 0 ? seven : current.value === 1 ? thirty : ninety;
    const previousData = previous.value === 0 ? seven : previous.value === 1 ? thirty : ninety;
    const currentPath = buildPath(newData);
    const previousPath = buildPath(previousData);
    return {
      current: parse(currentPath), previous: parse(previousPath)
    };
  }).value;

  const animatedProps = useAnimatedProps(() => {
    const path = mixPath(
      transition.value,
      paths.previous,
      paths.current
    );
    return {
      d: path
    }
  })

  return {
    animatedButtonStyle,
    animatedProps,
    transition,
    setRange,
  }
}
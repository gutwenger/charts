import { useMemo, useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import { useAnimatedLineChart } from "./useAnimatedLineChart.hook";
import { useStaticLineChart } from "./useStaticLineChart.hook";

export type Range = 0 | 1 | 2;

interface UseTestLineChartParams {

}

export const useTestLineChart = (params: UseTestLineChartParams) => {
  const containerRef = useRef<View>(null);
  const dimensions = useWindowDimensions();
  const width = useMemo(() => {
    return containerRef.current?.clientWidth ?? 320
  }, [containerRef.current]);
  const height = useMemo(() => {
    const φ = (1 + Math.sqrt(3)) / 2;
    return (1 - 1 / φ) * width;
  }, [dimensions.width, containerRef.current]);

  const animatedChart = useAnimatedLineChart({
    width,
    height,
  });

  const staticChart = useStaticLineChart({
    width,
    height,
  });

  function setRange(value: number) {
    animatedChart.setRange(value);
    staticChart.setRange(value);
  }

  return {
    containerRef,
    animatedChart,
    staticChart,
    width,
    height,
    setRange
  }
}
import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useRef } from "react";
import { useD3 } from "../../useD3.hook";
import Svg, { Path } from "react-native-svg";
import { mixPath, parse, serialize } from "react-native-redash";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

interface LineChartProps {
  previousData: SharedValue<Array<{ name: string; value: number }>>;
  currentData: SharedValue<Array<{ name: string; value: number }>>;
  transition: SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const LineChart: React.FC<LineChartProps> = (props) => {
  const { previousData, currentData, transition } = props;
  const containerRef = useRef<View>(null);
  const width = containerRef.current?.clientWidth ?? 0;
  const height = useMemo(() => {
    const φ = (1 + Math.sqrt(3)) / 2;
    return (1 - 1 / φ) * width;
  }, [width]);

  const { d } = useD3({ data: currentData.value, width });
  const { d: prevD } = useD3({ data: previousData.value, width });

  const animatedProps = useAnimatedProps(() => ({
    d: mixPath(
      transition.value,
      parse(prevD || "M 0 0 L 0 0"),
      parse(d || "M 0 0 L 0 0")
    ),
  }));

  return (
    <View
      ref={containerRef}
      style={{
        width: "100%",
        height: height,
        backgroundColor: "#E5E5E5",
      }}
    >
      <Svg width={width} height={height}>
        <AnimatedPath
          animatedProps={animatedProps}
          fill="transparent"
          stroke="#00aaff"
          strokeWidth={5}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "red",
  },
});

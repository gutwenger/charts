import Svg, { Path } from "react-native-svg";
import Animated from "react-native-reanimated";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTestLineChart } from "../useTestLineChart.hook";

export const BUTTON_WIDTH = 150;
const AnimatedPath = Animated.createAnimatedComponent(Path);

interface LineChartScreenProps {}

export const LineChartScreen: React.FC<LineChartScreenProps> = (props) => {
  const { containerRef, width, height, animatedChart, staticChart, setRange } =
    useTestLineChart({});

  return (
    <View style={styles.container}>
      <Text>Line Chart</Text>
      <View style={styles.buttonGroup}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[
              styles.baseButton,
              styles.buttonActive,
              animatedChart.animatedButtonStyle,
              { height: 38 },
            ]}
          />
        </View>
        {[7, 30, 90].map((item: 7 | 30 | 90, i) => (
          <Pressable key={`range-${i}`} onPress={() => setRange(i)}>
            <View
              style={{
                width: BUTTON_WIDTH,
                padding: 10,
                marginHorizontal: 10,
                alignItems: "center",
              }}
            >
              <Text>{item} Days</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View
        ref={containerRef}
        style={{
          width: "100%",
          height: height,
          backgroundColor: "#E5E5E5",
        }}
      >
        <Svg width={width} height={height}>
          {/* {animatedChart.animatedProps.d && (
            <AnimatedPath
              animatedProps={animatedChart.animatedProps}
              fill="transparent"
              stroke="#00aaff"
              strokeWidth={5}
            />
          )} */}
          <Path
            d={staticChart.d}
            fill="transparent"
            stroke="#00aaff"
            strokeWidth={5}
          />
        </Svg>
      </View>
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
  baseButton: {
    width: BUTTON_WIDTH,
    padding: 10,
    marginHorizontal: 10,
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#E0E0E0",
  },
});

import { scaleTime, scaleLinear } from "d3-scale";
import * as d3Shape from 'd3-shape';
import { useMemo } from "react";

interface DataPoint {
  name: string;
  value: number;
}

interface UseD3Params {
  data: Array<DataPoint>;
  width?: number;
  padding?: number;
}

export const useD3 = (params: UseD3Params) => {

  const { data, width = 320, padding = 0 } = params;

  const height = useMemo(() => {
    const φ = (1 + Math.sqrt(3)) / 2;
    return (1 - 1 / φ) * width;
  }, [width]);

  const getDomain = (domain: number[]) => [
    Math.min(...domain),
    Math.max(...domain)
  ];

  const scaleX = scaleTime()
    .domain(getDomain(data.map((d, i) => i)))
    .range([0, width]);

  const scaleY = scaleLinear()
    .domain(getDomain(data.map(d => d.value)))
    .range([height - padding, padding]);

  const d = useMemo(() => {
    return d3Shape
      .line<DataPoint>()
      .x((d, i) => scaleX(i))
      .y(d => scaleY(d.value))
      .curve(d3Shape.curveBasis)(data) as string;
  }, [height, data])

  return {
    scaleX,
    scaleY,
    d
  }
}

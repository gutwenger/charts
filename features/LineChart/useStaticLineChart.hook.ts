import moment from "moment";
import { useEffect, useState } from "react";

import { useD3 } from "../useD3.hook";
import { Range } from './useTestLineChart.hook';

import { getLineChartTestData } from './testData/testData';

interface useStaticLineChartParams {
  width: number;
  height: number;
}

export const useStaticLineChart = (params: useStaticLineChartParams) => {
  const { width } = params;

  const [selectedRange, setSelectedRange] = useState<Range>(7);
  const [staticData, setStaticData] = useState(getLineChartTestData(selectedRange));

  useEffect(() => {
    setStaticData(getLineChartTestData(selectedRange));
  }, [selectedRange]);

  const { d } = useD3({
    data: staticData.map((item) => ({
      name: moment(item.date).format("YY-MM"),
      value: item.value,
    })),
    width,
  });

  function setRange(value: number) {
    const ranges: Array<Range> = [7, 30, 90];
    setSelectedRange(ranges[value]);
  }

  return {
    d: d || `M0 0 L${width} 0`,
    setRange
  }
}
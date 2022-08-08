import { useEffect, useState } from "react";
import { getLineChartTestData } from './testData/testData';
import { useD3 } from "../useD3.hook";
import { Range } from './useTestLineChart.hook';
import moment from "moment";

interface useStaticLineChartParams {
  width: number;
  height: number;
}

export const useStaticLineChart = (params: useStaticLineChartParams) => {
  const { width } = params;

  const [selectedRange, setSelectedRange] = useState<Range>(7);
  const [staticData, setStaticData] = useState(getTestData(selectedRange));

  useEffect(() => {
    setStaticData(getTestData(selectedRange));
  }, [selectedRange]);

  function getTestData(number: Range) {
    return getLineChartTestData(number);
  }

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
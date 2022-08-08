import { Range } from '../useTestLineChart.hook';

const seven = [
  { date: "Sun Jul 31 2022 08:00:00 GMT+0800 (HKT)", value: 3640 },
  { date: "Sat Jul 30 2022 08:00:00 GMT+0800 (HKT)", value: 3339 },
  { date: "Fri Jul 29 2022 08:00:00 GMT+0800 (HKT)", value: 5993 },
  { date: "Thu Jul 28 2022 08:00:00 GMT+0800 (HKT)", value: 1667 },
  { date: "Wed Jul 27 2022 08:00:00 GMT+0800 (HKT)", value: 5386 },
  { date: "Tue Jul 26 2022 08:00:00 GMT+0800 (HKT)", value: 4906 },
  { date: "Mon Jul 25 2022 08:00:00 GMT+0800 (HKT)", value: 7952 },
]

const thirty = [
  { date: "Sun Jul 31 2022 08:00:00 GMT+0800 (HKT)", value: 1231 },
  { date: "Sat Jul 30 2022 08:00:00 GMT+0800 (HKT)", value: 8964 },
  { date: "Fri Jul 29 2022 08:00:00 GMT+0800 (HKT)", value: 7179 },
  { date: "Thu Jul 28 2022 08:00:00 GMT+0800 (HKT)", value: 3948 },
  { date: "Wed Jul 27 2022 08:00:00 GMT+0800 (HKT)", value: 9041 },
  { date: "Tue Jul 26 2022 08:00:00 GMT+0800 (HKT)", value: 5064 },
  { date: "Mon Jul 25 2022 08:00:00 GMT+0800 (HKT)", value: 2513 },
]


const ninety = [
  { date: "Sun Jul 31 2022 08:00:00 GMT+0800 (HKT)", value: 6738 },
  { date: "Sat Jul 30 2022 08:00:00 GMT+0800 (HKT)", value: 8263 },
  { date: "Fri Jul 29 2022 08:00:00 GMT+0800 (HKT)", value: 1932 },
  { date: "Thu Jul 28 2022 08:00:00 GMT+0800 (HKT)", value: 6372 },
  { date: "Wed Jul 27 2022 08:00:00 GMT+0800 (HKT)", value: 1265 },
  { date: "Tue Jul 26 2022 08:00:00 GMT+0800 (HKT)", value: 7590 },
  { date: "Mon Jul 25 2022 08:00:00 GMT+0800 (HKT)", value: 4312 },
]


const generate = (month: number, days: number) => {
  const monthInput = month < 10 ? `0${month}` : month;
  const data = [];
  for (let i = days; i > 0; i--) {
    const date = i < 10 ? `0${i}` : i;
    data.push({
      date: new Date(`2022-${monthInput}-${date}`),
      value: Math.floor(Math.random() * 10000)
    })
  }
  return data;
}

export const getLineChartTestData = (range: Range) => {
  switch (range) {
    case 7:
      return seven;
    case 30:
      return thirty;
    case 90:
      return ninety;
    default:
      return seven;
  }
}
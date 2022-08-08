import { Range } from '../useTestLineChart.hook';

export const seven = [
  { name: '25-07', value: 3640 },
  { name: '26-07', value: 3339 },
  { name: '27-07', value: 5993 },
  { name: '28-07', value: 1667 },
  { name: '29-07', value: 5386 },
  { name: '30-07', value: 4906 },
  { name: '31-07', value: 7952 },
]

export const thirty = [
  { name: '25-07', value: 1231 },
  { name: '26-07', value: 8964 },
  { name: '27-07', value: 7179 },
  { name: '28-07', value: 3948 },
  { name: '29-07', value: 9041 },
  { name: '30-07', value: 5064 },
  { name: '31-07', value: 2513 },
]


export const ninety = [
  { name: '25-07', value: 6738 },
  { name: '26-07', value: 8263 },
  { name: '27-07', value: 1932 },
  { name: '28-07', value: 6372 },
  { name: '29-07', value: 1265 },
  { name: '30-07', value: 7590 },
  { name: '31-07', value: 4312 },
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
    case 0:
      return seven;
    case 1:
      return thirty;
    case 2:
      return ninety;
    default:
      return seven;
  }
}
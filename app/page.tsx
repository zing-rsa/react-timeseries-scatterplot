import { min, max, endOfDay, subDays } from "date-fns";

import { Graph } from "./components/graph";

const data = [
  {date: "2025-02-14 03:09:56", price: 72.23},
  {date: "2025-02-15 01:36:56", price: 109.83},
  {date: "2025-02-16 11:13:56", price: 137.97},
  {date: "2025-02-16 23:23:56", price: 59.08},
  {date: "2025-02-18 04:51:56", price: 129.66},
  {date: "2025-02-18 16:01:56", price: 133.94},
  {date: "2025-02-20 12:27:56", price: 120.79},
  {date: "2025-02-20 21:40:56", price: 149.37},
  {date: "2025-02-21 17:07:56", price: 137.31},
  {date: "2025-02-22 16:53:56", price: 106.71},
  {date: "2025-02-24 13:49:56", price: 73.3},
  {date: "2025-02-25 13:06:56", price: 92.81},
  {date: "2025-02-26 04:23:56", price: 129.15},
  {date: "2025-02-26 16:51:56", price: 58.53},
  {date: "2025-02-27 21:43:56", price: 149.43},
  {date: "2025-02-28 21:37:56", price: 78.89},
  {date: "2025-03-02 04:26:56", price: 123.96},
  {date: "2025-03-03 11:55:56", price: 118.45},
  {date: "2025-03-03 18:44:56", price: 148.36},
  {date: "2025-03-05 01:55:56", price: 59.81},
  {date: "2025-03-06 05:30:56", price: 53.76},
  {date: "2025-03-07 11:08:56", price: 85.42},
  {date: "2025-03-08 12:56:56", price: 87.74},
  {date: "2025-03-09 04:22:56", price: 70.93},
  {date: "2025-03-10 07:23:56", price: 119.4},
  {date: "2025-03-10 16:15:56", price: 57.48},
  {date: "2025-03-12 05:58:56", price: 62.01},
  {date: "2025-03-12 19:36:56", price: 64.59},
  {date: "2025-03-14 09:03:56", price: 121.07},
  {date: "2025-03-15 09:47:56", price: 146.58}
]

export default function Page() {

  const startDate = endOfDay(subDays(min(data.map(x => x.date)), 1));
  const endDate = endOfDay(max(data.map(x => x.date)))

    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "12px"}}>
          <Graph data={data} width={700} height={500} startDate={startDate} endDate={endDate} tickCount={15} />
      </div>
    )
  }
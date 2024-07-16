import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceDot,
} from "recharts";



const AppLineChart = ({data}) => {
  return (
    <LineChart 
      width={900}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="score"
        stroke="#1C64F2"
        strokeWidth="3"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default AppLineChart;
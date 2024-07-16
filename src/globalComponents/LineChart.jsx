import React from "react";
import { Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Dot,
} from "recharts";
import AppCard from "./Card";


const AppLineChart = ({ data }) => {
  return (
    <AppCard className="p-6">
      <p style={{ fontWeight: 700, fontSize: "20px" }}>Overall</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          className="mx-auto"
          width="100%"
          height="100%"
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="key" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#1C64F2"
            strokeWidth="3"
            dot={(data) => {
              console.log("data", data)
              if(data.value >= 80)
                return (
                  <svg
                      x={data.cx - 8}
                      y={data.cy - 8}
                      width={32}
                      height={32}
                      fill="#238723"
                      viewBox="0 0 1024 1024"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                    </svg>
                );
              else if (data.value > 65 && data.value <80)
                return (
                  <svg
                      x={data.cx - 8}
                      y={data.cy - 8}
                      width={32}
                      height={32}
                      fill="#FFBE00"
                      viewBox="0 0 1024 1024"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM176.4 176a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM160 336H352c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                    </svg>
                );
              else
                  return (
                    <svg
                      x={data.cx - 8}
                      y={data.cy - 8}
                      width={32}
                      height={32}
                      fill="#D2222D"
                      viewBox="0 0 1024 1024"
                    >
                      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm240 80c0-8.8 7.2-16 16-16c45 0 85.6 20.5 115.7 53.1c6 6.5 5.6 16.6-.9 22.6s-16.6 5.6-22.6-.9c-25-27.1-57.4-42.9-92.3-42.9c-8.8 0-16-7.2-16-16zm-80 80c-26.5 0-48-21-48-47c0-20 28.6-60.4 41.6-77.7c3.2-4.4 9.6-4.4 12.8 0C179.6 308.6 208 349 208 369c0 26-21.5 47-48 47zM367.6 208a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm-192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                    </svg>
                  );
              
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </AppCard>
  );
};

export default AppLineChart;

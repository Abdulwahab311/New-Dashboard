import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const EffectivityChart = () => {
  // Effectivity - Line Chart Data
  const effectivityData = [
    { time: "1", value: 2.5 },
    { time: "2", value: 2.8 },
    { time: "3", value: 3.2 },
    { time: "4", value: 3.5 },
    { time: "5", value: 4.0 },
    { time: "6", value: 4.8 },
    { time: "7", value: 6.5 },
    { time: "8", value: 8.5 },
    { time: "9", value: 9.2 },
    { time: "10", value: 9.8 },
  ];

  return (
    <div className="bg-[#0A0F2C] rounded-xl p-5  border border-[#1a2238] h-full relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-base font-semibold tracking-wide">
          EFFECTIVITY
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4a9eff]"></div>
          <span className="text-[#8b92b0] text-xs">EFFECTIVITY REVENUE / COSTS </span>
        </div>
      </div>

      {/* Effectivity Card - Top Right Outside Graph */}
      <div className="absolute top-32 right-0 bg-[#0f1530] border border-[#1e2949] rounded-lg px-4 py-3 z-20 shadow-lg">
        <div className="text-[#6b7599] text-[10px] font-medium uppercase tracking-wider mb-1">
          EFFECTIVITY
        </div>
        <div className="text-white text-3xl font-bold">12</div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={effectivityData} margin={{ top: 0, right: 90, bottom: 0, left: 0 }}>
            <CartesianGrid
              stroke="#2a3454"
              strokeDasharray="0"
              horizontal={true}
              vertical={true}
              opacity={0.4}
            />
            <XAxis
              dataKey="time"
              tick={{ fill: "#4a5571", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              tick={{ fill: "#4a5571", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
            />
            <Tooltip
              contentStyle={{
                background: "#0f1629",
                border: "1px solid #1e2949",
                borderRadius: "8px",
                fontSize: 12,
              }}
              itemStyle={{ color: "#fff" }}
              cursor={{ stroke: "#2d4373", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#5b9fc9"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "#5b9fc9" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EffectivityChart;
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const DealsPerformance = () => {
  // Deals Performance - Area Chart Data
  const performanceData = [
    { time: "Now", value1: 1.8, value2: 2.2, value3: 2.8 },
    { time: "", value1: 2.0, value2: 2.5, value3: 3.2 },
    { time: "", value1: 2.3, value2: 3.0, value3: 3.8 },
    { time: "", value1: 2.8, value2: 3.8, value3: 4.5 },
    { time: "Oct", value1: 3.2, value2: 4.2, value3: 5.0 },
    { time: "", value1: 3.8, value2: 4.8, value3: 5.8 },
    { time: "", value1: 4.5, value2: 5.5, value3: 6.5 },
    { time: "", value1: 5.2, value2: 6.2, value3: 7.2 },
    { time: "", value1: 5.8, value2: 6.8, value3: 7.8 },
    { time: "Nov", value1: 6.2, value2: 7.0, value3: 8.0 },
  ];

  return (
    <div className="bg-[#0A0F2C] rounded-xl p-5 border border-[#1a2238] h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-base font-semibold tracking-wide">
          Deals Performance
        </h2>
        <div className="flex items-center gap-2  px-3 py-1.5 rounded-full">
          <span className="text-[#8b92b0] text-xs">• Zorg Deal</span>
          <span className="text-[#8b92b0] text-xs font-medium">• Industry Deal</span>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData}>
            <defs>
              <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b5998" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#2d4373" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4a7ba7" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#3a5f85" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5b9fc9" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#4a8aaa" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="#1a2545"
              strokeDasharray="0"
              horizontal={true}
              vertical={false}
              opacity={0.5}
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
              domain={[6, 10]}
              ticks={[6, 6, 6, 6, 8, 10]}
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
            <Area
              type="monotone"
              dataKey="value1"
              stroke="#4a6fa5"
              strokeWidth={2}
              fill="url(#gradient1)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="value2"
              stroke="#5b8fbb"
              strokeWidth={2}
              fill="url(#gradient2)"
              fillOpacity={1}
            />
            <Area
              type="monotone"
              dataKey="value3"
              stroke="#6ba9d0"
              strokeWidth={2}
              fill="url(#gradient3)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DealsPerformance;
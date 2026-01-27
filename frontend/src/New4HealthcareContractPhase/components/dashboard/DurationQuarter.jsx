import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RenderAlignedLegend = ({ payload }) => {
  if (!payload) return null;
  return (
    <div className="w-full flex justify-start px-2 pb-2">
      <ul className="flex items-center gap-3 flex-wrap">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center gap-1.5">
            <span
              className="inline-block"
              style={{
                width: 10,
                height: 10,
                background: entry.color,
                borderRadius: 2,
              }}
            />
            <span className="text-[10px] text-white/80">{entry.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* MOCK DATA */
const MOCK_DEAL_PHASES = [
  {
    title: "Notaris",
    goalDays: 30,
    nowDays: 7,
    gaugeColor: "#22C55E",
  },
  { title: "Dossierregistratie in CRM en SP", goalDays: 1, nowDays: 7, gaugeColor: "#F97316" },
  {
    title: "Financieel en fiscaal",
    goalDays: 7,
    nowDays: 7,
    gaugeColor: "#EF4444",
  },
  {
    title: "Dossier overdragen aan koper",
    goalDays: 1,
    nowDays: 7,
    gaugeColor: "#22C55E",
  },
  { title: "Projectregistratie administratief en financieel", goalDays: 7, nowDays: 14, gaugeColor: "#22C55E" },
];

// Mock chart data for the line graph
const MOCK_CHART_DATA = [
  { month: "04/05", value1: 28, value2: 22, value3: 18 },
  { month: "05/05", value1: 20, value2: 16, value3: 12 },
  { month: "06/05", value1: 25, value2: 20, value3: 15 },
  { month: "07/05", value1: 22, value2: 18, value3: 14 },
  { month: "08/05", value1: 26, value2: 21, value3: 16 },
  { month: "09/05", value1: 20, value2: 15, value3: 11 },
];

const DurationQuarter = () => {
  const [dealPhases, setDealPhases] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setDealPhases(MOCK_DEAL_PHASES);
    setChartData(MOCK_CHART_DATA);
  }, []);

  // Calculate average duration
  const avgDuration = 27;

  const avgGoal = 46;

  return (
    <div className="text-white w-full h-full">
      <h1 className="text-lg md:text-xl font-bold mb-4">DURATION</h1>

      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
        {/* LEFT SECTION - CHART */}
        <div className="flex-1 min-w-0">
          {/* Area Chart */}
          <div className="rounded-xl bg-[#1A1F3A] p-3 md:p-4 mb-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A855F7" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#A855F7" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                  axisLine={{ stroke: "#374151" }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                  axisLine={{ stroke: "#374151" }}
                  domain={[0, 30]}
                  ticks={[0, 6, 12, 18, 24, 30]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1F3A",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                {/* <Legend content={<RenderAlignedLegend />} /> */}
                <Area
                  type="monotone"
                  dataKey="value1"
                  stroke="#22C55E"
                  fill="url(#gradient1)"
                  name="Dossier registratie in CRM & financieel"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#22C55E" }}
                />
                <Area
                  type="monotone"
                  dataKey="value2"
                  stroke="#3B82F6"
                  fill="url(#gradient2)"
                  name="Lopende Zaken"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#3B82F6" }}
                />
                <Area
                  type="monotone"
                  dataKey="value3"
                  stroke="#A855F7"
                  fill="url(#gradient3)"
                  name="Plan Fiscaal en Notaris akkoord"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#A855F7" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Total Duration Pills */}
          <div>
            <h2 className="text-sm md:text-base font-semibold mb-2">
              Total Duration
            </h2>
            <div className="flex gap-3">
              <div className="px-5 md:px-6 py-2 md:py-2.5 rounded-full bg-[#1038fd] text-center">
                <div className="text-xs font-medium whitespace-nowrap">
                  Goal: {avgGoal} Days
                </div>
              </div>
              <div className="px-5 md:px-6 py-2 md:py-2.5 rounded-full bg-[#EF4444] text-center">
                <div className="text-xs font-medium whitespace-nowrap">
                  Now: {avgDuration} Days
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - PILLARS */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {/* Average Pillar */}
          <div className="flex flex-col bg-[#1A1F3A] p-0.5 items-center flex-shrink-0">
            <div className=" rounded-lg p-2 mb-2 w-[75px]">
              <h3 className="text-center text-[9px] font-semibold mb-2 leading-tight">
                Total Avg Duration
              </h3>
              <div className="space-y-1.5">
                <div className="px-1.5 py-1 rounded-full border-1 border-gray-400  text-center">
                  <div className="text-[8px] text-white">Goal</div>
                  <div className="text-[9px] text-white font-bold">
                    {avgGoal}d
                  </div>
                </div>
                <div className="px-1.5 py-1 rounded-full bg-[#22C55E] text-center">
                  <div className="text-[8px] text-white">Now</div>
                  <div className="text-[9px] text-white font-bold">
                    {avgDuration}d
                  </div>
                </div>
              </div>
            </div>

            {/* Average Duration Pillar */}
            <div className="relative w-[60px] h-[180px] bg-[#1A1F3A] rounded-lg overflow-hidden border border-gray-700">
              {/* Scale marks */}
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-1.5 z-20"
                  style={{ bottom: `${(i / 6) * 100}%` }} // evenly spaced
                >
                  <div
                    className={`h-[1.5px] rounded ${
                      i === 3 ? "w-4 bg-white" : "w-2 bg-white/60"
                    }`}
                  />
                </div>
              ))}

              {/* Bar Fill */}
              <div
                className="absolute bottom-0 left-0 w-full rounded-t-lg transition-all duration-500"
                style={{
                  height: `${Math.min((avgDuration / 30) * 100, 100)}%`,
                  backgroundColor:
                    avgDuration > avgGoal * 1.5
                      ? "#EF4444" // red if above 150% of goal
                      : avgDuration > avgGoal
                        ? "#F97316" // orange if above 100% of goal
                        : "#22C55E", // green if below goal
                }}
              />
            </div>
          </div>

          {dealPhases.map((phase, index) => {
            // Calculate percentage based on a max scale of 30 days
            const maxDays = 30;
            const heightPercent = Math.min(
              (phase.nowDays / maxDays) * 100,
              100,
            );

            // Color based on goal comparison
            let barColor = "#22C55E"; // green
            if (phase.nowDays > phase.goalDays * 1.5) {
              barColor = "#EF4444"; // red
            } else if (phase.nowDays > phase.goalDays) {
              barColor = "#F97316"; // orange
            }

            return (
              <div
                key={index}
                className="flex flex-col bg-[#1A1F3A] p-0.5 items-center flex-shrink-0"
              >
                {/* Phase Info Box */}
                <div className=" rounded-lg p-2 mb-2 w-[65px]">
                  <h3 className="text-center text-[8px] font-medium leading-tight h-[28px] px-1 flex items-center justify-center overflow-hidden">
                    <span className="line-clamp-2">{phase.title}</span>
                  </h3>
                  <div className="space-y-1.5">
                    <div
                      className="px-1 py-0.5 rounded-full border-1 text-center"
                      style={{ borderColor: phase.gaugeColor }}
                    >
                      <div className="text-[7px] text-white">Goal</div>
                      <div className="text-[8px] text-white font-bold">
                        {phase.goalDays}d
                      </div>
                    </div>
                    <div
                      className="px-1 py-0.5 rounded-full text-center"
                      style={{ background: barColor }}
                    >
                      <div className="text-[7px] text-white">Now</div>
                      <div className="text-[8px] text-white font-bold">
                        {phase.nowDays}d
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vertical Pillar */}
                <div className="relative w-[55px] h-[180px] bg-[#2A2F4A] rounded-lg overflow-hidden border border-gray-700">
                  {/* Scale marks */}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const dayValue = i * 5; // 0,5,10,...30
                    return (
                      <div
                        key={i}
                        className="absolute left-1 z-20 flex items-center"
                        style={{ bottom: `${(i / 6) * 100}%` }}
                      >
                        <div
                          className={`h-[1.5px] rounded ${i === 3 ? "w-3 bg-white" : "w-2 bg-white/60"}`}
                        />
                        <span className="text-[6px] text-white/70 ml-0.5">
                          {dayValue}
                        </span>
                      </div>
                    );
                  })}

                  {/* Bar Fill */}
                  <div
                    className="absolute bottom-0 left-0 w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DurationQuarter;

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
    <div className="w-full px-3 pb-2">
      <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {payload.map((entry, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <span
              style={{
                width: 10,
                height: 10,
                backgroundColor: entry.color,
                borderRadius: 2,
              }}
            />
            <span className="text-[10px] text-white/80 whitespace-nowrap">
              {MOCK_DEAL_PHASES[index]?.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* MOCK DATA */
const MOCK_DEAL_PHASES = [
  {
    title: "Aankoop / contract",
    goalDays: 84,
    nowDays: 7,
    gaugeColor: "#22C55E",
  },
  {
    title: "Kick-off met projectontwikkelaar",
    goalDays: 1,
    nowDays: 7,
    gaugeColor: "#F97316",
  },
  {
    title: "Vergunning aanvraag",
    goalDays: 84,
    nowDays: 7,
    gaugeColor: "#EF4444",
  },
  {
    title: "Ontwikkeling",
    goalDays: 140,
    nowDays: 7,
    gaugeColor: "#22C55E",
  },
  {
    title: "Verhuur",
    goalDays: 84,
    nowDays: 14,
    gaugeColor: "#22C55E",
  },

  // ✅ Newly added pillars
  {
    title: "Verkoop",
    goalDays: 140,
    nowDays: 14,
    gaugeColor: "#F97316",
  },
  {
    title: "Financieel/ liquiditeit/ notarieel",
    goalDays: 140,
    nowDays: 14,
    gaugeColor: "#22C55E",
  },
];

const getLast3Months = () => {
  const now = new Date();

  return Array.from({ length: 3 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (2 - i), 1);
    return d.toLocaleString("en-US", { month: "short" });
  });
};

const DurationQuarter = () => {
  const [dealPhases, setDealPhases] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setDealPhases(MOCK_DEAL_PHASES);

    const months = getLast3Months();

    setChartData(
      months.map((m) => {
        const dataEntry = { month: m };
        MOCK_DEAL_PHASES.forEach((phase, index) => {
          dataEntry[`value${index + 1}`] = Math.floor(Math.random() * 30);
        });
        return dataEntry;
      }),
    );
  }, []);

  const avgDuration = 27;
  const avgGoal = 673;

  return (
    <div className="text-white w-full h-full">
      <h1 className="text-lg md:text-xl font-bold mb-4">DURATION</h1>

      <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
        {/* LEFT - CHART */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl bg-[#1A1F3A] p-4">
            {/* ✅ Legend OUTSIDE chart */}
            <RenderAlignedLegend
              payload={MOCK_DEAL_PHASES.map((p, i) => ({
                value: p.title,
                color: p.gaugeColor,
              }))}
            />

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  {MOCK_DEAL_PHASES.map((p, i) => (
                    <linearGradient
                      key={i}
                      id={`g${i + 1}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={p.gaugeColor}
                        stopOpacity={0.6}
                      />
                      <stop
                        offset="95%"
                        stopColor={p.gaugeColor}
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  ))}
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                  stroke="#9CA3AF"
                />

                <YAxis
                  domain={[0, 30]}
                  ticks={[0, 6, 12, 18, 24, 30]}
                  tick={{ fill: "#9CA3AF", fontSize: 10 }}
                  stroke="#9CA3AF"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1F3A",
                    border: "1px solid #374151",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />

                {MOCK_DEAL_PHASES.map((p, i) => (
                  <Area
                    key={i}
                    type="monotone"
                    dataKey={`value${i + 1}`}
                    stroke={p.gaugeColor}
                    fill={`url(#g${i + 1})`}
                    strokeWidth={2}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Total Duration Pills */}
          <div className="w-full mb-4 mt-3 ml-4">
            <h2 className="text-sm md:text-base font-semibold mb-2">
              Total Duration
            </h2>
            <div className="flex justify-between gap-2">
              <div className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-[#28A72C] text-center flex-1 max-w-[48%]">
                <div className="text-xs font-medium whitespace-nowrap">
                  Goal: {avgGoal} Days
                </div>
              </div>
              <div className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-[#F1494C] text-center flex-1 max-w-[48%] flex flex-col items-center gap-1">
                <div className="text-xs font-semibold text-white whitespace-nowrap">
                  Now: {avgDuration} Days
                </div>
                <div className="flex items-center gap-1 text-green-400 text-[11px] font-medium">
                  <span>+2%</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - PILLARS */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {/* Average Pillar */}
          <div className="flex flex-col items-center bg-[#1A1F3A] p-0.5 flex-shrink-0">
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
            <div className="relative w-[60px] h-[270px] bg-[#1A1F3A] rounded-lg overflow-hidden border border-gray-700">
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
                      className="px-1 py-0.5 rounded-full border-1  text-center"
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
                <div className="relative w-[55px] h-[280px] bg-[#2A2F4A] rounded-lg overflow-hidden border border-gray-700">
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

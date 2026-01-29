// frontend/src/funnelDashboard/components/DurationToFirstProposal.jsx
import React, { useEffect, useState } from "react";
import { REACT_APP_BASEURL } from "../../config"

import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";

// Custom single-bar shape that mirrors the bar above and below baseline
const MirrorBar = (props) => {
  const { x, y, width, height, payload, value } = props;
  const color = payload?.color || "#999999";
  const isRed =
    (color || "").toLowerCase() === "#ef4444" || payload?.colorName === "red";

  const h = Math.max(0, height || 0);
  const baselineY = value >= 0 ? y + h : y;

  const topY = baselineY - h;
  const bottomY = baselineY;

  return (
    <g>
      <rect x={x} y={topY} width={width} height={h} fill={color} rx={2} ry={2} />
      <rect
        x={x}
        y={bottomY}
        width={width}
        height={h}
        fill={payload?.forceRed ? "#EF4444" : color}
        rx={2}
        ry={2}
      />
    </g>
  );
};

// Section chart
const SectionChart = ({ title, steps, revenues, data, bgClass, bottom }) => {
  const columnCount = Math.max(1, (bottom?.kpis?.length || 1));
  const columnPositions = Array.from(
    { length: Math.max(0, columnCount - 1) },
    (_, i) => ((i + 1) / columnCount) * 100
  );

  const chartData = data.map((d, idx) => ({ ...d, forceRed: title !== "AFTERCARE" && idx === 0 }));

  return (
    <div className={`border-r border-slate-700 last:border-r-0`}>
      <div className={`px-3 py-2 ${bgClass}`}>
        <div className="text-white font-semibold text-[11px] mb-1">{title}</div>
        <div className="flex justify-center gap-3 text-[10px] text-white/80 mb-1">
          {steps.map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
       {revenues?.length && (
  <div className="flex flex-wrap justify-center gap-1 text-[9px] text-white/60">
    {revenues.map((r, i) => (
      <span key={i}>{r}</span>
    ))}
  </div>
)}

      </div>
      <div className={`${bgClass} px-2 py-2`}>
        <div className="h-70">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 6, bottom: 4, left: 6 }} barCategoryGap="0%" barGap={0}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={false} height={0} />
              <YAxis domain={[-100, 100]} axisLine={false} tickLine={false} tick={false} width={0} />
              {[100, 80, 60, 40, 20, 0, -20, -40, -60, -80, -100].map((v) => (
                <ReferenceLine
                  key={v}
                  y={v}
                  stroke={v === 0 ? "#FFFFFF" : "#374151"}
                  strokeOpacity={v === 0 ? 1 : 0.5}
                  strokeWidth={0.5}
                />
              ))}
              <Bar dataKey="value" maxBarSize={40} shape={<MirrorBar />}>
                {chartData.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={`${bgClass} px-3 py-5`}>
        {title !== "SALES" && (
          <div className="flex items-center gap-2 mt-9">
            {bottom?.highlight && (
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                {bottom.highlight}
              </span>
            )}
            <div className="flex items-center gap-3 text-[11px] text-white/80">
              {(bottom?.kpis || []).map((k, i) => (
                <span key={i}>{k}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main component
const DurationToFirstProposal = () => {
  const [sections, setSections] = useState([]);
  const [bottomKpis, setBottomKpis] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(`${REACT_APP_BASEURL}/sales/getSales`)
        if (res.data.success && res.data.data.length) {
          const apiData = res.data.data;

          const transformedSections = apiData.map((pipeline) => {
            const data = pipeline.stages.map((stage, idx) => ({
              name: (idx + 1).toString(),
              value: stage.avgTimeToAdvanceDays || 0,
              color: stage.avgTimeToAdvanceDays > 0 ? "#F59E0B" : "#EF4444",
            }));
            const steps = pipeline.stages.map((_, i) => (i + 1).toString());
            const revenues = pipeline.stages.map(() => "€4.5M");

            return {
              title: pipeline.pipelineName,
              steps,
              revenues,
              data,
              bgClass: "#2B2430",
            };
          });

          const kpis = apiData.map(() => ({ highlight: null, kpis: [] }));

          setSections(transformedSections);
          setBottomKpis(kpis);
        }
      } catch (err) {
        console.error("Error fetching sales data:", err);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="w-full bg-[#090D28] rounded-xl p-1">
      <div className="text-white font-semibold text-sm mb-2">Duration To First Proposal</div>
      <div className="flex">
        <div className="w-10 bg-[#090D28]">
          <div className="px-2 py-1 text-white text-[5px] text-center mt-12">
            TOTALE REVENUE
            <br />
            IN € MILLIONS
          </div>
          <div className="py-2 text-[10px] text-white/80 flex flex-col justify-between items-center gap-3">
            {[100, 80, 60, 40, 20, 0, -20, -40, -60, -80, -100].map((v) => (
              <div key={v}>{v}</div>
            ))}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-6 mt-5">
          {sections.map((s, i) => (
            <SectionChart
              key={i}
              title={s.title}
              steps={s.steps}
              revenues={s.revenues}
              data={s.data}
              bgClass={s.bgClass}
              bottom={bottomKpis[i]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DurationToFirstProposal;

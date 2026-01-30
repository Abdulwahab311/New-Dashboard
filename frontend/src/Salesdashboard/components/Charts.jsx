import React, { useEffect, useRef, useState } from "react";

const Pill = ({ text }) => (
  <span
    className="rounded-full px-3 py-1 text-xs font-semibold"
    style={{ backgroundColor: "#7C7AA1AD", color: "#23ED30" }}
  >
    {text}
  </span>
);

function useElementWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setWidth(el.clientWidth || 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

const formatKpiValue = (value) => {
  if (value === null || value === undefined) return "0";

  const abs = Math.abs(value);

  // Very small values → show full
  if (abs > 0 && abs < 0.001) {
    return value.toString();
  }

  // Normal decimals
  if (abs < 1) {
    return value.toFixed(3);
  }

  // Millions
  if (abs >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M";
  }

  // Default
  return value.toLocaleString();
};

const SmoothMini = ({
  colorStops = ["#10b981", "#60a5fa", "#a855f7"],
  height = 64,
}) => {
  const { ref, width } = useElementWidth();
  const viewW = Math.max(220, width);
  const viewH = height;
  const padL = 12;
  const padB = 10;

  const pts = Array.from({ length: 40 }, (_, i) => {
    const x = i / 39;
    const y =
      0.5 +
      Math.sin(i * 0.35) * 0.18 +
      Math.sin(i * 0.9) * 0.07 +
      (i > 30 ? 0.15 : 0) -
      x * 0.03;
    return { x, y };
  }).map(({ x, y }) => ({
    x: padL + x * (viewW - padL),
    y: viewH - padB - y * (viewH - 2 * padB),
  }));

  const buildSmoothPath = (points) => {
    if (!points || points.length === 0) return "";
    return points.reduce((acc, p, idx) => {
      if (idx === 0) return `M ${p.x} ${p.y}`;
      const prev = points[idx - 1];
      const cx = (prev.x + p.x) / 2;
      const cy = (prev.y + p.y) / 2;
      return acc + ` Q ${cx} ${cy} ${p.x} ${p.y}`;
    }, "");
  };

  const currentIndex = Math.floor(pts.length * 0.9);
  const current = pts[currentIndex] || { x: 0, y: 0 };

  const dPast = buildSmoothPath(pts.slice(0, currentIndex + 1));
  const dFuture = buildSmoothPath(pts.slice(currentIndex));

  const pastColor = colorStops?.[1] || "#22c55e";
  const futureColor = "#e5e7ff";

  return (
    <div ref={ref} className="w-full h-full flex justify-end">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="w-29 h-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="kpiLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorStops[0]} />
            <stop offset="60%" stopColor={colorStops[1]} />
            <stop offset="100%" stopColor={colorStops[2]} />
          </linearGradient>
          <filter id="kpiGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d={dPast}
          fill="none"
          stroke={pastColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={dFuture}
          fill="none"
          stroke={futureColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={current.x}
          cy={current.y}
          r="9"
          fill={pastColor}
          filter="url(#kpiGlow)"
          opacity="0.35"
        />
        <circle cx={current.x} cy={current.y} r="5" fill="#0B1020" />
      </svg>
    </div>
  );
};

const KpiCard = ({ title, subtitle, value, pillText, gradient }) => (
  <div className="bg-[#0B1020] rounded-xl border border-[#252B42] p-4 h-full">
    <div className="flex items-start justify-between">
      <div>
        <div className="text-white text-sm font-semibold">{title}</div>
        <div className="text-gray-400 text-xs">{subtitle}</div>
      </div>
      <div className="flex flex-col items-end">
        <Pill text={pillText} />
        <div className="text-gray-400 text-[10px] mt-1">VS GOAL</div>
      </div>
    </div>
    <div
      className="text-white text-center font-extrabold my-3
             text-3xl md:text-5xl
             max-w-full
             break-all
             leading-tight"
    >
      {formatKpiValue(value)}
    </div>

    <div className="h-16 -mb-2">
      <SmoothMini colorStops={gradient} />
    </div>
  </div>
);

const Charts = ({ sales }) => {
  console.log("API chart data (currently unused):", sales);

  /* ================================
     ✅ STATIC VALUES (MATCHING SCREENSHOT)
  ================================= */
  const forecastRevenue = 3.55;    // €3.55M (Waarde van het Hele Team)
  const teamConversion = 81;       // 81% (Team Conversion)
  const averageDuration = 73;      // 73 DAYS (Total Average Duration)

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Column - Two stacked cards */}
      <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
        <KpiCard
          title="Waarde van het Hele Team"
          subtitle="This Month"
          value={forecastRevenue}
          pillText="+20%"
          gradient={["#10b981", "#22c55e", "#22c55e"]}
        />

        <KpiCard
          title="Team Conversion"
          subtitle="This Month"
          value={teamConversion}
          pillText="+12%"
          gradient={["#60a5fa", "#3b82f6", "#3b82f6"]}
        />
      </div>

      {/* Right Column - Total Average Duration Card */}
      <div className="col-span-12 md:col-span-7">
        <div className="bg-[#0B1020] rounded-xl border border-[#090D28] p-6 h-full flex flex-col justify-between">
          {/* Header with pill */}
          <div className="flex items-start justify-between mb-6">
            <div className="text-white text-2xl font-bold">
              TOTAL AVERAGE DURATION
            </div>
          </div>

          {/* Main Content - Large number with days */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-white font-extrabold text-8xl leading-none mb-2">
                {averageDuration}
              </div>
              <div className="text-gray-400 text-xl font-semibold tracking-wider">
                DAYS
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Charts;
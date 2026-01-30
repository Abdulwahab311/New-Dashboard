import React from "react";

/* ===============================
   STAT CARD COMPONENT
================================ */
const StatCard = ({ title, value, note, change }) => (
  <div className="group relative rounded-4xl border border-[#252B42] flex flex-col items-center text-center min-h-[180px] bg-gradient-to-b from-[#090D28] to-[rgba(9,13,40,0)] p-4 overflow-hidden">
    
    {/* ===============================
        HOVER POPUP
    ================================ */}
    <div className="pointer-events-none absolute z-20 top-4 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out">
      <div className="bg-[#0F1437] border border-[#252B42] rounded-xl px-4 py-2 shadow-xl">
        <div className="text-[11px] tracking-widest text-gray-300">
          {title}
        </div>
        <div className="text-white text-lg font-semibold">
          {value}
        </div>
      </div>
    </div>

    {/* Title */}
    <div className="text-[12px] sm:text-[13px] font-medium tracking-widest text-gray-200 mt-4 cursor-pointer">
      {title}
    </div>

    {/* Value */}
    <div className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold mt-4 cursor-pointer">
      {value}
    </div>

    {/* Change or Note */}
    {(change || note) && (
      <div className="flex items-center gap-2 text-[11px] mt-2">
        {change && (
          <span
            className={`px-2 py-[2px] rounded-md font-medium ${
              change.startsWith("-")
                ? "text-red-400 bg-[#FF000024]"
                : "text-green-400 bg-[#00D39424]"
            }`}
          >
            {change}
          </span>
        )}
        {note && <span className="text-gray-500">{note}</span>}
      </div>
    )}
  </div>
);

/* ===============================
   MAIN CARDS COMPONENT
================================ */
const Cards = () => {
  // ================================
  // ✅ STATIC / SAMPLE VALUES
  // ================================
  const calls = 6;
  const active = "4.6M"; // in Millions
  const proposal = "4.9M"; // in Millions
  const proposalSecond = 202;

  const forecastRevenue = "0/4"; // Static text
  const conversionForecast = 2; // in Millions

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
      <StatCard title="CALLS" value={calls} />

      <StatCard title="LEAD" value={active} />

      <StatCard title="QUALIFIED" value={proposal} />

      <StatCard title="OFFER" value={proposalSecond} />

      <StatCard title="DEALS WON" value={forecastRevenue} />

      <StatCard title="DEALS LOST" value={conversionForecast} />
    </div>
  );
};

export default Cards;

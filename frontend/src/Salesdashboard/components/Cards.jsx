import React from "react";

/* ===============================
   STAT CARD (UI SAME AS UPPER)
================================ */
const StatCard = ({ title, value, note, change }) => (
  <div className="rounded-2xl border border-[#252B42] flex flex-col items-center text-center h-40 bg-gradient-to-b from-[#090D28] to-[rgba(9,13,40,0)]">
    <div className="text-[12px] sm:text-[13px] font-medium tracking-widest text-gray-200 mt-6">
      {title}
    </div>

    <div className="text-white text-4xl sm:text-5xl font-semibold mt-2">
      {value}
    </div>

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
  /* ================================
     ✅ STATIC VALUES (FROM LOWER CODE)
  ================================= */
  const calls = 248;
  const active = 86;
  const proposal = 42;
  const proposalSecond = 18;

  const forecastRevenue = 3.55; // €M
  const conversionForecast = 8; // €M

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 w-full">
      <StatCard
        title="TOTAL CALLS"
        value={calls}
        
      />

      <StatCard
        title="ACTIVE DEALS"
        value={active}
        
      />

      <StatCard
        title="PROPOSALS"
        value={proposal}
       
      />

      <StatCard
        title="SECOND PROPOSAL"
        value={proposalSecond}
       
      />

      <StatCard
        title="FORECASTED REVENUE"
        value={`€${forecastRevenue}M`}
        
      />

      <StatCard
        title="CONVERSION GOAL"
        value={`€${conversionForecast}M`}
        
      />
    </div>
  );
};

export default Cards;

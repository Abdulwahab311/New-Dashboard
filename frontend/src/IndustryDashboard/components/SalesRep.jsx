import React from "react";

const img=  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=512&auto=format&fit=crop";


const RankBadge = ({ rank, color = "#f59e0b" }) => (
  <div
    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full text-[12px] font-bold flex items-center justify-center"
    style={{
      backgroundColor: color,
      color: "#0b0f24",
      boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
    }}
  >
    {rank}
  </div>
);

const Avatar = ({ src, ringColor = "#f59e0b" }) => (
  <div className="relative">
    <img
      src={src}
      alt="rep"
      className="w-40 h-40 rounded-full object-cover border-2"
      style={{ borderColor: ringColor }}
    />
  </div>
);

const SalesRep = ({ sales }) => {
  console.log("API sales rep data (currently unused):", sales);

  /* ================================
     ❌ API DATA (COMMENTED)
  =================================
  const salesRep = sales?.data?.[0]?.revenuePerRep || [];
  const repsData = salesRep
    .filter((r) => r.salesRep !== "Sales Rep")
    .sort((a, b) => b.revenue - a.revenue)
    .map((r, idx) => ({
      ...r,
      rank: idx + 1,
    }));
  */

  /* ================================
     ✅ STATIC DATA (UI SAME)
  ================================= */
  const repsData = [
    {
      salesRep: "Samuel",
      revenue: 470000,
      rank: 1,
    },
    {
      salesRep: "Tom",
      revenue: 470000,
      rank: 2,
    },
    {
      salesRep: "Abdul",
      revenue: 470000,
      rank: 3,
    },
  ];

  return (
    <div className="bg-[#090D28] rounded-xl border p-4">
      <div className="text-white text-sm font-semibold">
        Revenue Trough The Sales Rep
      </div>
      <div className="text-gray-400 text-xs mb-6">This Month</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start justify-items-center">
        {repsData.map((rep) => {
          const ringColor =
            rep.rank === 1
              ? "#f59e0b"
              : rep.rank === 2
              ? "#94a3b8"
              : "#fbbf24";

          const badgeColor =
            rep.rank === 1
              ? "#f59e0b"
              : rep.rank === 2
              ? "#cbd5e1"
              : "#f59e0b";

          return (
            <div key={rep.salesRep} className="flex flex-col items-center">
              <div className="relative">
                <Avatar
                  src={img || "https://via.placeholder.com/150"}
                  ringColor={ringColor}
                />
                <RankBadge rank={rep.rank} color={badgeColor} />
              </div>

              <div className="mt-6 text-white text-4xl font-bold tracking-wide">
                {Math.round(rep.revenue / 1000) + "k"}
              </div>
              <div className="mt-1 text-gray-300 text-2xl">
                {rep.salesRep}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesRep;


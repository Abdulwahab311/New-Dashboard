import React from "react";

const StatusDot = ({ color = "#FFFFFF" }) => (
  <span
    className="inline-block mr-3 align-middle"
    style={{ width: 8, height: 8, borderRadius: 9999, backgroundColor: color }}
  />
);

const Pill = ({ text, color = "#16A34A", bg = "rgba(22,163,74,0.15)" }) => (
  <span
    className="px-3 py-1 rounded-full text-[12px] font-semibold"
    style={{ color, backgroundColor: bg }}
  >
    {text}
  </span>
);

const HeaderCell = ({ children, className = "" }) => (
  <div
    className={`px-4 py-3 text-sm text-gray-300 tracking-wider ${className}`}
  >
    {children}
  </div>
);

const RowCell = ({ children, className = "" }) => (
  <div className={`px-4 py-4 text-sm text-gray-200 ${className}`}>
    {children}
  </div>
);

const Row = ({
  name,
  nameColor,
  calls,
  deals,
  winRate,
  occupancy,
  amount,
  pillColor,
  pillBg,
}) => (
  <div className="grid grid-cols-13 items-center border-t border-white/10">
    <RowCell className="col-span-3 flex items-center">
      <StatusDot color={nameColor} />
      <span>{name}</span>
    </RowCell>
    <RowCell className="col-span-2">{calls}</RowCell>
    <RowCell className="col-span-2">
      <Pill text={`${deals}%`} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell className="col-span-2">
      <Pill text={`${winRate}%`} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell className="col-span-2">
      <Pill text={`${occupancy}%`} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell className="col-span-1">
      <Pill text={`${amount}`} color={pillColor} bg={pillBg} />
    </RowCell>
  </div>
);

const Table = ({ sales }) => {
  console.log("API salesBoard data (currently unused):", sales);

  /* ================================
     ❌ API DATA (COMMENTED)
  =================================
  const salesBoard = sales?.data?.[0]?.salesBoard || [];
  */

  /* ================================
     ✅ STATIC DATA (UI SAME)
  ================================= */
  const salesBoard = [
    {
      salesRep: "Lead Generation",
      callAmount: 120,
      dealsWon: 48,
      winRate: 40,
      occupancy: 75,
      amount: "€120k",
    },
    {
      salesRep: "Qualification",
      callAmount: 90,
      dealsWon: 36,
      winRate: 40,
      occupancy: 68,
      amount: "€95k",
    },
    {
      salesRep: "Proposal",
      callAmount: 70,
      dealsWon: 28,
      winRate: 40,
      occupancy: 60,
      amount: "€72k",
    },
    {
      salesRep: "Negotiation",
      callAmount: 40,
      dealsWon: 22,
      winRate: 55,
      occupancy: 50,
      amount: "€54k",
    },
    {
      salesRep: "Closed Won",
      callAmount: 25,
      dealsWon: 18,
      winRate: 72,
      occupancy: 35,
      amount: "€38k",
    },
  ];

  return (
    <div className="bg-[#090D28] rounded-xl border border-[#252B42] overflow-hidden">
      <div className="px-4 py-3 text-sm text-white font-semibold">
        Deze Maand
      </div>

      <div className="grid grid-cols-13 bg-[#090D28]">
        <HeaderCell className="col-span-3">Sales Step</HeaderCell>
        <HeaderCell className="col-span-2">Calls Amount</HeaderCell>
        <HeaderCell className="col-span-2">Deals Won</HeaderCell>
        <HeaderCell className="col-span-2">Win Rate</HeaderCell>
        <HeaderCell className="col-span-2">Occupancy</HeaderCell>
        <HeaderCell className="col-span-1">Amount</HeaderCell>
      </div>

      <div className="divide-y divide-white/10">
        {salesBoard.map((rep, idx) => {
          const dealsPercent = rep.callAmount
            ? ((rep.dealsWon / rep.callAmount) * 100).toFixed(0)
            : 0;

          const winRatePercent = rep.winRate;
          const occupancyPercent = rep.occupancy;

          return (
            <Row
              key={idx}
              name={rep.salesRep}
              nameColor="#F04245"
              calls={rep.callAmount}
              deals={dealsPercent}
              winRate={winRatePercent}
              occupancy={occupancyPercent}
              amount={rep.amount}
              pillColor="rgba(34,197,94,0.9)"
              pillBg="rgba(34,197,94,0.15)"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Table;


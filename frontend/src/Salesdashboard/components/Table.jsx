import React from "react";

const StatusDot = ({ color = "#FFFFFF" }) => (
  <span
    className="inline-block mr-2.5 align-middle"
    style={{ width: 7, height: 7, borderRadius: 9999, backgroundColor: color }}
  />
);

const Pill = ({ text, color = "#FFFFFF", bg = "transparent" }) => (
  <span
    className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap"
    style={{ color, backgroundColor: bg }}
  >
    {text}
  </span>
);

const HeaderCell = ({ children, className = "" }) => (
  <div
    className={`px-3 py-2.5 text-[10px] text-gray-400 uppercase tracking-wider font-medium ${className}`}
  >
    {children}
  </div>
);

const RowCell = ({ children, className = "" }) => (
  <div className={`px-3 py-3 text-[13px] text-gray-100 ${className}`}>
    {children}
  </div>
);

const Row = ({
  name,
  nameColor,
  calls,
  lead,
  qualified,
  offer,
  won,
  value,
  loss,
  pillColor,
  pillBg,
}) => (
  <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr_1fr_1fr] items-center border-t border-white/10 hover:bg-white/5 transition-colors min-w-0">
    <RowCell className="flex items-center min-w-0">
      <StatusDot color={nameColor} />
      <span className="font-medium truncate">{name}</span>
    </RowCell>
    <RowCell>{calls}</RowCell>
    <RowCell>
      <Pill text={lead} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell>
      <Pill text={qualified} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell>
      <Pill text={offer} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell>
      <Pill text={won} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell>
      <Pill text={value} color={pillColor} bg={pillBg} />
    </RowCell>
    <RowCell>
      <Pill text={loss} color={pillColor} bg={pillBg} />
    </RowCell>
  </div>
);

const Table = ({ sales }) => {
  console.log("API salesBoard data (currently unused):", sales);

  /* ================================
     ✅ STATIC DATA MATCHING SCREENSHOT
  ================================= */
  const salesBoard = [
    {
      salesRep: "SAMUEL",
      callAmount: 458,
      lead: "369",
      qualified: "369",
      offer: "369",
      won: "369",
      value: "369",
      loss: "369",
      dotColor: "#F04245", // Red dot
    },
    {
      salesRep: "TOM",
      callAmount: 458,
      lead: "369",
      qualified: "369", // Special case from image
      offer: "369",
      won: "369",
      value: "369",
      loss: "369",
      dotColor: "#D9D9D9", // Gray dot
    },
    {
      salesRep: "ABDUL",
      callAmount: 458,
      lead: "369",
      qualified: "369",
      offer: "369",
      won: "369",
      value: "369",
      loss: "369",
      dotColor: "#FACC15", // Yellow dot
    },
  ];

  return (
    <div className="w-full max-w-full bg-[#090D28] rounded-xl border  overflow-hidden shadow-xl">
      {/* Header with dropdown */}
      <div className="px-3 py-2.5 flex items-center justify-between border-b ">
        <div className="text-[13px] text-white font-semibold flex items-center">
          Deze Maand
          <svg
            className="ml-2 w-3.5 h-3.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr_1fr_1fr]  border-b  min-w-0">
        <HeaderCell>Sales Step</HeaderCell>
        <HeaderCell>Calls Amount</HeaderCell>
        <HeaderCell>Lead</HeaderCell>
        <HeaderCell>Qualified</HeaderCell>
        <HeaderCell>Offer</HeaderCell>
        <HeaderCell>Won</HeaderCell>
        <HeaderCell>Value</HeaderCell>
        <HeaderCell>Loss</HeaderCell>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-white/10">
        {salesBoard.map((rep, idx) => (
          <Row
            key={idx}
            name={rep.salesRep}
            nameColor={rep.dotColor}
            calls={rep.callAmount}
            lead={rep.lead}
            qualified={rep.qualified}
            offer={rep.offer}
            won={rep.won}
            value={rep.value}
            loss={rep.loss}
            // Remove green color for pills
            // pillColor="rgba(34,197,94,0.9)"
            // pillBg="rgba(34,197,94,0.15)"
          />
        ))}
      </div>

      {/* Empty row placeholder */}
      <div className="px-3 py-3 flex items-center text-gray-500 text-[13px] border-t border-white/10">
        <StatusDot color="transparent" />
        <span className="opacity-50">Name</span>
      </div>
    </div>
  );
};

export default Table;

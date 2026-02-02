import React from "react";

const TopBadge = ({ value }) => (
  <div className="h-8 px-8 border border-white rounded-md flex items-center justify-center text-white text-sm tracking-wide bg-transparent">
    {value !== null && value !== undefined ? value : ""}
  </div>
);

const BottomBadge = ({ value }) => {
  const [num, unitRaw] = String(value).trim().split(/\s+/);
  const unit = unitRaw || "D";
  return (
    <div className="h-8 px-5 border border-white/80 rounded-md flex items-center justify-center text-white text-sm font-semibold bg-transparent">
      <span className="tabular-nums mr-1">{num}</span>
      <span className="opacity-90 tracking-wide">{unit}</span>
    </div>
  );
};

const DurationRecharts = () => {
  // First card data (lead stages) - matching the image
  const leadStagesData = [
    { stage: "LEAD", category: "", deals: 2, duration: "2" },
    {
      stage: "Afspraak / online meeting",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    {
      stage: "Plattegrond opgevraagd",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    {
      stage: "Plattegrond ontvangen",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    {
      stage: "Plattegrond intekenen - Alice",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    { stage: "Stiko maken", category: "(lead)", deals: 2, duration: "2" },
  ];

  // Second card data (other stages) - matching the image
  const otherStagesData = [
    {
      stage: "StiKo bespreken met Robert (lead)",
      category: "",
      deals: 2,
      duration: "2",
    },
    {
      stage: "Voorbereiden bieding (qualified)",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    {
      stage: "Voorstel/bieding gedaan (offer)",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    {
      stage: "1e voorstel/bieding niet akkoord/onderhandeling (offer)",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    {
      stage: "2e voorstel/bieding gedaan/onderhandeling (offer)",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
    {
      stage: "Deal gewonnen (deal)",
      category: "(lead)",
      deals: 2,
      duration: "2",
    },
  ];

  // Card component to avoid duplication
  const StageCard = ({ stagesData }) => (
    <div className="bg-[#0B1020] rounded-xl border border-[#252B42] p-4 mb-4">
      <div className="grid grid-cols-12 gap-4">
        {/* Left column: AMOUNT OF DEALS and DURATION TIME labels */}
        <div className="col-span-2 flex flex-col justify-between py-4 mt-8">
          <div className="text-gray-300 text-xs leading-5">
            <div className="font-semibold mb-1">AMOUNT</div>
            <div>OF DEALS</div>
          </div>
          <div className="text-gray-300 text-xs leading-5 mt-20">
            <div className="font-semibold mb-1">DURATION</div>
            <div>TIME (DAYS)</div>
          </div>
        </div>

        {/* Main chart area */}
        <div className="col-span-10 relative">
          {/* Grid for stages */}
          <div
            className={`grid gap-4 pl-4 pr-2 ${stagesData.length === 6 ? "grid-cols-6" : "grid-cols-7"}`}
          >
            {stagesData.map((stage, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Stage title */}
                <div className="h-12 text-center mb-2 text-slate-300 text-[10px] leading-3 tracking-wide">
                  <div className="font-semibold mb-1">{stage.stage}</div>
                  {stage.category && (
                    <div className="text-slate-400">{stage.category}</div>
                  )}
                </div>
                {/* Top badge with deals count */}
                <div className="mb-2">
                  <TopBadge value={stage.deals} />
                </div>
              </div>
            ))}
          </div>

          {/* Simple vertical lines */}
          <div className="">
            <div className="relative" style={{ height: 100 }}>
              {/* Center horizontal line */}
              <div className="absolute left-0 right-0 top-1/2 border-t border-slate-600"></div>
            </div>
          </div>

          {/* Bottom badges with duration */}
          <div
            className={`grid gap-4 pl-4 pr-2 mt-2 ${stagesData.length === 6 ? "grid-cols-6" : "grid-cols-7"}`}
          >
            {stagesData.map((stage, index) => (
              <div key={index} className="flex items-center justify-center">
                <BottomBadge value={stage.duration} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 h-full flex flex-col">
      {/* First card - Lead stages (6 columns) */}
      <StageCard stagesData={leadStagesData} />

      {/* Second card - Other stages (7 columns) */}
      <StageCard stagesData={otherStagesData} />
    </div>
  );
};

export default DurationRecharts;

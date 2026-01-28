import React, { useEffect, useState } from "react";

// STAGES
const STAGES = [
  { key: "signed", label: "Dossier Registratie in CRM & SP" },
  { key: "complete", label: "Lopende Zaken" },
  { key: "notary", label: "Projectregistratie administratief en financieel" },
  { key: "transfer", label: "Plan: Fiscaal en liquiditeit & notarieel" },
  { key: "transfer", label: "TDD" },
];

// 🔹 Mock data
const MOCK_DATA = [
  {
    street: "Project A",
    progress: { value: 10, total: 30, barColor: "#EF4444" },
    stageData: {
      signed: { done: true, color: "#EF4444" },
      complete: {},
      notary: {},
      transfer: {},
    },
  },
  {
    street: "Project B",
    progress: { value: 18, total: 30, barColor: "#EF4444" },
    stageData: {
      signed: { done: true, color: "#EF4444" },
      complete: { done: true, color: "#EF4444" },
      notary: {},
      transfer: {},
    },
  },
  {
    street: "Project C",
    progress: { value: 21, total: 30, barColor: "#F59E0B" },
    stageData: {
      signed: { done: true, color: "#F59E0B" },
      complete: { done: true, color: "#F59E0B" },
      notary: { done: true, color: "#F59E0B" },
      transfer: {},
    },
  },
  {
    street: "Project D",
    progress: { value: 25, total: 30, barColor: "#22C55E" },
    stageData: {
      signed: { done: true, color: "#22C55E" },
      complete: { done: true, color: "#22C55E" },
      notary: { done: true, color: "#22C55E" },
      transfer: { done: true, color: "#22C55E" },
    },
  },
];

export default function ActiveDealsTable({ label = "DEAL SPECIFICATIE" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setData(MOCK_DATA);
    setLoading(false);
  }, []);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  if (loading)
    return (
      <div className="bg-[#141936] p-4 rounded-lg text-gray-400">
        Loading...
      </div>
    );

  if (!data.length)
    return (
      <div className="bg-[#141936] p-4 rounded-lg text-gray-400">
        No data found.
      </div>
    );

  return (
    <section className="w-full mt-5">
      {/* Header */}
      <div className="mt-3 w-full rounded-xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white/90 text-lg md:text-xl font-semibold rounded-md">
            {label}
          </span>
        </div>

        <button
          onClick={toggleOpen}
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#B0A3EF54] text-white text-xs font-semibold transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </button>
      </div>

      {/* Table with Scroll */}
      {isOpen && (
        <div className="mt-4 bg-[#181C3A] rounded-lg -mx-0 overflow-x-auto">
          <div className="p-3">
            {data.map((r) => {
              const pct = Math.min(
                100,
                Math.max(0, (r.progress.value / r.progress.total) * 100),
              );

              return (
                <div key={r.street} className="py-2">
                  <div className="flex items-center gap-4 min-w-max">
                    {/* Street */}
                    <div className="w-40 flex-shrink-0">
                      <span
                        className="inline-block rounded-full text-white/90 text-[10px]  px-8 py-2 whitespace-nowrap"
                        style={{ background: "#CFC6F994" }}
                      >
                        {r.street}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-9 w-56 flex-shrink-0 rounded-full bg-[#2A334D]">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: r.progress.barColor,
                        }}
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-[3px] text-white text-[10px] font-semibold">
                        PASSING DATE
                      </div>
                    </div>
                    <div className="relative h-9 w-56 flex-shrink-0 rounded-full bg-[#2A334D]">
                      <div
                        className="absolute left-0 top-0 h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: r.progress.barColor,
                        }}
                      />
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-[3px] text-white text-[10px] font-semibold">
                        TOTAAL DAGEN OVER
                      </div>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[11px] font-semibold whitespace-nowrap">
                        {r.progress.value}/{r.progress.total}
                      </span>
                    </div>
                    {/* Stages */}
                    {STAGES.map((s, idx) => {
                      const cfg = r.stageData[s.key] || {};
                      const pillColor =
                        r.street === "Project D"
                          ? "transparent"
                          : cfg.color || "#F04245";

                      return (
                        <div
                          key={`${s.key}-${idx}`}
                          className="w-56 flex-shrink-0"
                        >
                          <div
                            className="flex items-center justify-between rounded-full h-9 px-3 w-full border"
                            style={{
                              backgroundColor: pillColor,
                              borderColor:
                                r.street === "Project D"
                                  ? "#2A334D"
                                  : "transparent",
                            }}
                          >
                            <span className="text-[10px] font-semibold text-white truncate pr-2">
                              {s.label}
                            </span>
                            {cfg.done && (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white flex-shrink-0">
                                <span className="text-[#16A34A] text-[13px] font-bold">
                                  ✓
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

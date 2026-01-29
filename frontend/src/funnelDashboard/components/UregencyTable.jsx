import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_BASEURL } from "../../config"

// ---------- Count Badge ----------
function CountBadge({ value, color }) {
  const bg = {
    red: '#F04245',
    orange: '#F59E0B',
    blue: '#2A76C8',
    green: '#18D359',
    gray: '#2A3354',
  }[color] || '#2A3354';

  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white text-[11px] font-bold w-6 h-6"
      style={{ backgroundColor: bg }}
    >
      {value}
    </span>
  );
}

// ---------- Section Header ----------
function SectionHeader({ title, counts, countsClass = '', onToggle, open }) {
  return (
    <div className="w-full flex items-center justify-between bg-[#181C3A] rounded-sm px-3 py-2">
      <div className="flex items-center gap-3">
        <span className="text-white text-sm font-semibold">{title}</span>
        {counts && (
          <div className={`flex items-center gap-2 ml-30 ${countsClass}`}>
            {typeof counts.red === 'number' && (
              <div className="flex items-center">
                <CountBadge value={counts.red} color="red" />
                {(counts.alert || counts.red === 2 || counts.red === 1) && (
                  <div className="relative -ml-2">
                    <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-black text-[7px] font-semibold">!</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {typeof counts.green === 'number' && (
              <span className="relative inline-flex items-center justify-center">
                <CountBadge value={counts.green} color="gray" />
                <span
                  className="absolute -right-0.5 -top-0.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#18D359' }}
                ></span>
              </span>
            )}
            {typeof counts.orange === 'number' && <CountBadge value={counts.orange} color="orange" />}
            {typeof counts.blue === 'number' && <CountBadge value={counts.blue} color="blue" />}
          </div>
        )}
      </div>
      <button
        onClick={onToggle}
        className="px-2 py-1 rounded-full bg-[#2A3354] text-white text-xs font-semibold transition-transform duration-300"
      >
        <span className={`block transform transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
    </div>
  );
}

// ---------- Table ----------

const STAGES = [
  { key: 'marketResearch', label: 'MARKET RESEARCH' },
  { key: 'legalDue', label: 'LEGAL DUE DILIGENCE' },
  { key: 'floorplan', label: 'FLOORPLAN ARCHITECT' },
  { key: 'taxOptimization', label: 'TAX OPTIMIZATION' },
  { key: 'transfer', label: 'TRANSFER' },
];

function InlineTable({ rows }) {
  return (
    <section className="w-full rounded-lg bg-[#181C3A]">
      <div className="p-2 overflow-x-auto no-scrollbar">
        {rows.map((r) => {
          const pct = Math.min(100, Math.max(0, (r.progress.value / r.progress.total) * 100));
          return (
            <div key={r.street} className="py-2">
              <div className="w-full grid  grid-cols-[150px_200px_repeat(5,minmax(180px,1fr))]
 items-center gap-2">
                {/* Street */}
                <div>
                  <span className="inline-block rounded-full bg-black text-white/90 text-[11px] px-4 py-1.5">
                    {r.street}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-8 rounded-full bg-[#2A334D] ">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ width: `${pct}%`, background: r.progress.barColor }}
                  />
                  <div
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full px-1 py-[3px] text-white text-[10px] font-semibold"
                    style={{ background: r.progress.barColor }}
                  >
                    {r.progress.label}
                  </div>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-[10px] font-semibold">
                    {r.progress.value}/{r.progress.total} DAGEN
                  </span>
                </div>

                {/* Stage pills */}
                {STAGES.map((s) => {
                  const cfg = r.stageData[s.key] || {};
                  const pillColor = cfg.color || (cfg.done ? '#2A3354' : '#F04245');
                  const textColor = cfg.textColor || '#FFFFFF';
                  return (
                    <div key={s.key} className="flex items-center">
                      <div
                        className="flex items-center justify-between rounded-full h-8 px-2 min-w-[180px]"
                        style={{ backgroundColor: pillColor }}
                      >
                        <span className="text-[10px] font-semibold" style={{ color: textColor }}>
                          {s.label}
                        </span>
                        {cfg.rightTag ? (
                          <span className="text-[10px] font-semibold text-white">{cfg.rightTag}</span>
                        ) : cfg.done ? (
                          <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-white">
                            <span className="text-[#16A34A] text-[12px] font-bold">✓</span>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ---------- Parent ----------
export default function UregencyTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openSections, setOpenSections] = useState({
    marketing: false,
    sales: false,
    contract1: true,
    contract2: false,
    exit: false,
    aftercare: false,
  });

  useEffect(() => {
    axios
      .get(`${REACT_APP_BASEURL}/sales/getSales`)
      .then((res) => {
        if (res.data.success) {
          // Convert API data to match our table row format
          const rows = res.data.data.map((pipeline) => ({
            street: pipeline.pipelineName,
            progress: {
              value: pipeline.completed,
              total: pipeline.total,
              barColor: '#F59E0B',
              label: 'Progress',
            },
            stageData: pipeline.stages.reduce((acc, stage) => {
              acc[stage.key] = {
                color: stage.color,
                textColor: stage.textColor,
                rightTag: stage.rightTag,
                done: stage.done,
              };
              return acc;
            }, {}),
          }));
          setData(rows);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggleSection = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  if (loading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="w-full bg-[#090D28] p-4 rounded-lg">
      <div className="mb-3">
        <span className="text-white text-sm font-bold">ACTIVE DEALS – URGENCY</span>
      </div>

      {/* Marketing */}
      <div className="mb-3">
        <SectionHeader
          title="MARKETING"
          counts={{}}
          onToggle={() => toggleSection('marketing')}
          open={openSections.marketing}
        />
        <div
          className={`transition-all duration-500 overflow-hidden ${
            openSections.marketing ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 text-white text-sm">Marketing content...</div>
        </div>
      </div>

      {/* Sales */}
      <div className="mb-3">
        <SectionHeader
          title="SALES"
          counts={{}}
          onToggle={() => toggleSection('sales')}
          open={openSections.sales}
        />
        <div
          className={`transition-all duration-500 overflow-hidden ${
            openSections.sales ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 text-white text-sm">Sales content...</div>
        </div>
      </div>

      {/* Contract / Exit / Aftercare Sections */}
      {['contract1', 'contract2', 'exit', 'aftercare'].map((sec, idx) => (
        <div key={sec} className="mb-3">
          <SectionHeader
            title={sec.toUpperCase()}
            counts={{ red: 2, orange: 1 }} // optional, can be dynamic
            onToggle={() => toggleSection(sec)}
            open={openSections[sec]}
          />
          <div
            className={`transition-all duration-500 overflow-hidden ${
              openSections[sec] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="mt-2">
              <InlineTable rows={data} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

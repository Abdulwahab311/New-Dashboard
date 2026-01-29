import React from 'react';

const stages = [
  {
    key: 'total',
    title: 'TOTAL DURATION\nFIRST PROPOSAL',
    days: '8 D',
    valueTop: '',
    bar: { color: '#d69a2b', heightPct: 70 }
  },
  {
    key: 'stiko',
    title: 'MAKING\nSTIKO',
    days: '4 D',
    valueTop: '12',
    bar: { color: '#d69a2b', heightPct: 55 }
  },
  {
    key: 'floorplan',
    title: 'DRAWING\nFLOORPLAN',
    days: '10 D',
    valueTop: '',
    bar: { stacked: true, topColor: '#d69a2b', topPct: 55, bottomColor: '#cf2e2e', bottomPct: 25 }
  },
  {
    key: 'purchase',
    title: 'PURCHASE\nPROPOSAL',
    days: '6 D',
    valueTop: '',
    bar: { color: '#d69a2b', heightPct: 45 }
  },
  {
    key: 'followup',
    title: 'PURCHASE\nPROPOSAL\nFOLLOW UP',
    days: '6 D',
    valueTop: '',
    bar: { color: '#d69a2b', heightPct: 50 }
  }
];

const TopBadge = ({ value }) => (
  <div className="h-8 px-8 border border-white rounded-md flex items-center justify-center text-white text-sm tracking-wide">
    {value}
  </div>
);

const BottomBadge = ({ value }) => {
  const [num, unitRaw] = String(value).trim().split(/\s+/);
  const unit = unitRaw || 'D';
  return (
    <div className="h-8 px-5  border border-white/80 rounded-md flex items-center justify-center text-white text-sm font-semibold">
      <span className="tabular-nums mr-1">{num}</span>
      <span className="opacity-90 tracking-wide">{unit}</span>
    </div>
  );
};

const Bar = ({ spec }) => {
  const containerHeight = 200; // px (compact)
  if (spec.stacked) {
    const topH = Math.round((spec.topPct / 100) * containerHeight);
    const botH = Math.round((spec.bottomPct / 100) * containerHeight);
    return (
      <div className="relative w-15" style={{ height: containerHeight }}>
        <div className="absolute bottom-0 left-0 right-0" style={{ height: botH, backgroundColor: spec.bottomColor, borderRadius: '4px' }} />
        <div className="absolute bottom-0 left-0 right-0" style={{ height: botH + topH, backgroundColor: spec.topColor, borderRadius: '4px' }} />
      </div>
    );
  }
  const h = Math.round((spec.heightPct / 100) * containerHeight);
  return (
    <div className="relative w-15" style={{ height: containerHeight }}>
      <div className="absolute bottom-0 left-0 right-0" style={{ height: h, backgroundColor: spec.color, borderRadius: '4px' }} />
    </div>
  );
};

const Duration = () => {
  // Sequence like the screenshot: 16 down to 0 then back up
  const verticalTicks = [16,14,12,10,8,6,4,2,0,2,4,6,8,10,12,14];

  return (
    <div className="bg-[#0B1020] rounded-xl border border-[#252B42] p-4">
      <div className="text-white text-lg font-semibold mb-2">Duration To First Proposal</div>

      <div className="grid grid-cols-12 gap-4">
        {/* Left axis/labels */}
        <div className="col-span-2 flex flex-col justify-between py-4 mt-10">
          <div className="text-gray-300 text-sm leading-5">
            <div className="font-semibold mb-1">AMOUNT</div>
            <div>OF DEALS</div>
          </div>
          <div className="text-gray-300 text-sm leading-5 mb-10">
            <div className="font-semibold mb-1">DURATION</div>
            <div>TIME</div>
          </div>
        </div>

        {/* Chart area */}
        <div className="col-span-10">
          {/* Grid/ticks */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-500/40" />
            {/* Y ticks on left side continuous list */}
            <div className="absolute -left-5 top-10 gap-1 flex flex-col h-[200px] justify-between text-white text-[9px] font-semibold">
              {verticalTicks.map(v => (
                <div key={v}>{v}</div>
              ))}
            </div>

            {/* Bars with headers and footers */}
            <div className="grid grid-cols-5 gap-8 pl-4 pr-2">
              {stages.map((s) => (
                <div key={s.key} className="flex flex-col items-center">
                  {/* Header title and top badge */}
                  <div className="h-14 text-center mb-2">
                    {s.title.split('\n').map((t, i) => (
                      <div key={i} className="text-slate-300 text-[11px] leading-4 tracking-wide">{t}</div>
                    ))}
                  </div>
                  <div className="mb-2">
                    <TopBadge value={s.valueTop} />
                  </div>

                  {/* Bar */}
                  <Bar spec={s.bar} />

                  {/* Bottom badge */}
                  <div className="mt-3">
                    <BottomBadge value={s.days} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duration;

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, ReferenceLine } from 'recharts';

const TopBadge = ({ value }) => (
  <div className="h-8 px-8 border border-white rounded-md flex items-center justify-center text-white text-sm tracking-wide">
    {value !== null && value !== undefined ? value : ''}
  </div>
);


const BottomBadge = ({ value }) => {
  const [num, unitRaw] = String(value).trim().split(/\s+/);
  const unit = unitRaw || 'D';
  return (
    <div className="h-8 px-5 border border-white/80 rounded-md flex items-center justify-center text-white text-sm font-semibold">
      <span className="tabular-nums mr-1">{num}</span>
      <span className="opacity-90 tracking-wide">{unit}</span>
    </div>
  );
};

const DurationRecharts = ({ sales }) => {
  const propDuration = sales?.data?.[0]?.proposalDuration || [];
  console.log("Your First Proposal Duration:", propDuration);

  // Filter out placeholder stages if needed
  const filteredStages = propDuration.filter(stage => stage.durationDays > 0);

  // Calculate total duration
  const totalDuration = filteredStages.reduce((sum, stage) => sum + stage.durationDays, 0);

  // Calculate total deals
  const totalDeals = filteredStages.reduce((sum, stage) => sum + stage.amountOfDeals, 0);
  console.log("your total deasls:",totalDeals);

  // Combine total duration/deals with dynamic stages
  const displayStages = [
    {
      key: 'total',
      title: ['TOTAL DURATION', 'FIRST PROPOSAL'],
      valueTop: totalDeals, // show total deals here
      days: `${totalDuration} D`,
      pos: totalDuration,
      neg: -totalDuration,
    },
    ...filteredStages.map(stage => ({
      key: stage._id,
      title: [stage.stage],
      valueTop: stage.amountOfDeals, // individual deals
      days: `${stage.durationDays} D`,
      pos: stage.durationDays,
      neg: -stage.durationDays,
    }))
  ];

  // Chart data for Recharts
  const chartData = displayStages.map(s => ({ name: s.key, pos: s.pos, neg: s.neg }));

  // Vertical ticks
  const verticalTicks = Array.from({ length: 9 }, (_, i) => 16 - i * 2); // [16,14,12,...,0]

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
        <div className="col-span-10 relative">
          {/* Vertical ticks */}
          <div className="absolute -left-5 top-22 flex flex-col h-[200px] justify-between text-white text-[9px] font-semibold">
            {verticalTicks.map((v, i) => <div key={i}>{v}</div>)}
          </div>

          {/* Top badges and stage titles */}
          <div className="grid grid-cols-5 gap-8 pl-4 pr-2">
            {displayStages.map(stage => (
              <div key={stage.key} className="flex flex-col items-center">
                <div className="h-14 text-center mb-2 text-slate-300 text-[11px] leading-4 tracking-wide">
                  {stage.title.map((t, i) => (
                    <div key={i}>{t}</div>
                  ))}
                </div>
                <div className="mb-2">
                  <TopBadge value={stage.valueTop} />
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart */}
          <div className="pl-4 pr-2">
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                  stackOffset="sign"
                >
                  <YAxis hide domain={[-16, 16]} />
                  <XAxis dataKey="name" hide />
                  <ReferenceLine y={0} stroke="rgba(148,163,184,0.4)" />
                  <Bar dataKey="neg" stackId="a" fill="#cf2e2e" isAnimationActive={false} />
                  <Bar dataKey="pos" stackId="a" fill="#d69a2b" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom badges */}
          <div className="grid grid-cols-5 gap-8 pl-4 pr-2 mt-3">
            {displayStages.map(stage => (
              <div key={stage.key} className="flex items-center justify-center">
                <BottomBadge value={stage.days} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationRecharts;

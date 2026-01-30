import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { REACT_APP_BASEURL } from '../../config.js';

const QuarterGoalChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const months = [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ];

    const staticData = months.map(m => ({
      m,
      sales: 50 + Math.random() * 100,
      c1: 80 + Math.random() * 120,
      dev: 60 + Math.random() * 90,
      c2: 70 + Math.random() * 110,
      exit: 40 + Math.random() * 80,
      nazorg: 30 + Math.random() * 70
    }));

    setChartData(staticData);
  };

  const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-gray-300 text-[10px] sm:text-xs">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-[#0B0F24] rounded-2xl p-4 overflow-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <h2 className="text-white text-sm font-semibold">
          QUARTER GOAL LESSEN CYCLE TIME
        </h2>

        {/* RESPONSIVE LEGEND */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 max-w-full">
          <LegendItem color="#22D3EE" label="ZORG OVDR - CC & DEV" />
          <LegendItem color="#9333EA" label="ZORG CC & DEV" />
          <LegendItem color="#10B981" label="ZORG PAS & REG" />
          <LegendItem color="#F59E0B" label="INDUSTRIE OVDR - CC & DEV" />
          <LegendItem color="#EF4444" label="INDUSTRY CC & DEV" />
          <LegendItem color="#94A3B8" label="INDUSTRY PAS & REG" />
        </div>
      </div>

      {/* CHART */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>

            <defs>
              {[
                ['Sales','#22D3EE'],
                ['C1','#9333EA'],
                ['Dev','#10B981'],
                ['C2','#F59E0B'],
                ['Exit','#EF4444'],
                ['Nazorg','#94A3B8']
              ].map(([id,color]) => (
                <linearGradient key={id} id={`grad${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={color} stopOpacity="0.15" />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              stroke="#2A3358"
              strokeOpacity={0.3}
              vertical
              horizontal={false}
            />

            <YAxis
              axisLine={{ stroke: '#2A3358' }}
              tickLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />

            <Area dataKey="nazorg" stackId="1" stroke="#94A3B8" fill="url(#gradNazorg)" />
            <Area dataKey="exit" stackId="1" stroke="#EF4444" fill="url(#gradExit)" />
            <Area dataKey="c2" stackId="1" stroke="#F59E0B" fill="url(#gradC2)" />
            <Area dataKey="dev" stackId="1" stroke="#10B981" fill="url(#gradDev)" />
            <Area dataKey="c1" stackId="1" stroke="#9333EA" fill="url(#gradC1)" />
            <Area dataKey="sales" stackId="1" stroke="#22D3EE" fill="url(#gradSales)" />

          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default QuarterGoalChart;

import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { REACT_APP_BASEURL } from '../../config.js';

const PillarCard = ({ item }) => {
  return (
    <div className="text-white flex flex-col h-[340px]">

      {/* GOAL */}
      <div
        className="rounded-xl p-2 mb-2"
        style={{ backgroundImage: 'linear-gradient(180deg, #090D28 0%, rgba(255,255,255,0.10) 100%)' }}
      >
        <div className="text-gray-300 text-[10px] text-center mb-1">GOAL</div>
        <div className="text-white text-xl font-bold text-center">
          {item.goal} DAYS
        </div>
      </div>

      {/* GREEN PILLAR */}
      <div className="bg-[#0B0F24] rounded-lg p-2 flex-1 flex">
        <div className="w-full h-full bg-[#6FE04F] rounded-lg"></div>
      </div>

      {/* TITLE */}
      <div className="mt-2 text-[9px] text-gray-300 text-center uppercase tracking-wide">
        {item.title}
      </div>

    </div>
  );
};

const Pilars = () => {
  const [phaseData, setPhaseData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setPhaseData([
      { title: "ZORG OVDER - CC & DEV", goal: 14, now: 7 },
      { title: "ZORG CC & DEV", goal: 28, now: 7 },
      { title: "ZORG PAS & REG", goal: 35, now: 28 },
      { title: "INDUSTRIE OVDER CC ", goal: 7, now: 7 },
      { title: "INDUSTRY CC & DEV", goal: 7, now: 7 },
      { title: "INDUSTRY PAS & REG", goal: 15, now: 21.6 }
    ]);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
      {phaseData.map((p, i) => (
        <PillarCard key={i} item={p} />
      ))}
    </div>
  );
};

export default Pilars;

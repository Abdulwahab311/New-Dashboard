import React from "react";
import TotalDeals from "../components/TotalDeals";
import Portfolio from "../components/Portfolio";
import PieCharts from "../components/PieChats";
import EffectivelyChart from "../components/EffectivelyChart";

const BusinessModelDashboard = () => {
  return (
    <div className="space-y-2 p-2">

      {/* TOP ROW */}
      <div className="grid grid-cols-2 gap-2">
        
        {/* LEFT - TotalDeals */}
        <div className="h-full">
          <TotalDeals />
        </div>

        {/* RIGHT - Portfolio */}
        <div className="h-full">
          <Portfolio />
        </div>

      </div>

      {/* BOTTOM ROW */}
      <div className="grid grid-cols-2 gap-2">
        
        {/* LEFT - PieCharts */}
        <div>
          <PieCharts />
        </div>
        
        {/* RIGHT - EffectivelyChart */}
        <div>
          <EffectivelyChart />
        </div>
        
      </div>

    </div>
  );
};

export default BusinessModelDashboard;
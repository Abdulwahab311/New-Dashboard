import React, { useState } from "react";
import DurationQuarter from "../components/dashboard/DurationQuarter";
import DurationDeadline from "../components/dashboard/DurationDeadline";
import Exit from "../components/dashboard/Exit";
import ActiveDealsTable from "../components/dashboard/ActiveDealsTable";

const DashboardHealthCare = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <div className="w-full p-1 py-1">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          {/* DurationQuarter Card */}
          <div className="bg-[#090D28] rounded-2xl p-4 md:p-4 flex-[2] lg:flex-[3] min-w-0">
            <DurationQuarter />
          </div>

          {/* DurationDeadline Card */}
          <div className="rounded-2xl p-0 flex-1 min-w-0 lg:min-w-[280px]">
            <DurationDeadline />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0 overflow-hidden">
          <Exit
            title="ACTIVE DEALS ZORG 3. CONTRACTEN / ONTWIKKELING"
            label="Internal Research"
            counts={{ red: 2, orange: 1, blue: 1 }}
          />
          <ActiveDealsTable open={open} onToggle={() => setOpen(!open)} />
        </div>
      </div>
    </>
  );
};

export default DashboardHealthCare;

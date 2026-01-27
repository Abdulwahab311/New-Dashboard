import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { REACT_APP_BASEURL } from "../../../config.js";

/* =========================
      Stats Cards Component
========================= */
const StatsCard = ({ title, value }) => {
  return (
    <div
      className="rounded-xl flex-1 flex flex-col items-center justify-center border border-[#2A2F4A] py-8 px-4"
      style={{
        background: "linear-gradient(180deg, #090D28 0%, rgba(9, 13, 40, 0) 100%)",
      }}
    >
      <div className="text-[#9CA3AF] text-sm md:text-base font-medium uppercase tracking-wider mb-4 text-center leading-tight">
        {title}
      </div>
      <div className="text-white text-5xl md:text-6xl font-bold">{value}</div>
    </div>
  );
};

/* =========================
      MOCK DATA (TEMP)
========================= */
const MOCK_PIPELINE = {
  totalCount: 6,
  dealsTakeTooLong: 6,
};

const DurationDeadline = () => {
  const [zorgPipeline, setZorgPipeline] = useState(null);

  useEffect(() => {
    /*
    ============================
        REAL API (COMMENTED)
    ============================

    axios
      .get(`${REACT_APP_BASEURL}/sales/getSales`)
      .then((res) => {
        const pipelines = res.data.data;
        const zorg = pipelines.find(
          (p) => p.pipelineKey === "test zorg 1st contractphase",
        );
        setZorgPipeline(zorg);
      })
      .catch((err) => console.error(err));
    */

    // ✅ Temporary mock pipeline
    setZorgPipeline(MOCK_PIPELINE);
  }, []);

  if (!zorgPipeline) {
    return (
      <div className="flex items-center justify-center h-full text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <StatsCard
        title="CURRENT ACTIVE DEALS"
        value={6}
      />
      <StatsCard
        title="DEALS THAT TAKE TOO LONG"
        value={6}
      />
    </div>
  );
};

export default DurationDeadline;

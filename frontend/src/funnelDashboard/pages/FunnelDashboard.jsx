import React from "react";
import QuarterGoalChart from "../components/QuarterGoalChart";
import Pilars from "../components/Pilars";
import OverviewFunnel from "../components/OverviewFunnel";
// import UregencyTable from "../components/UregencyTable";
// import DurationToFirstProposal from "../components/DurationToFirstProposal";

const FunnelDashboard = () => {
  return (
    <>
    <div className='text-white text-lg -mt-2'>
        <h3>EXIT DURATION CONSECUTIVE STEPS</h3>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
      <div className='space-y-3'>
        <QuarterGoalChart/>
        <Pilars/>
      </div>
      <div>
        <OverviewFunnel/>
      </div>
    </div>
    {/* <div className='mt-5 bg-[#090D28] rounded-lg '>
      <UregencyTable/>
    </div> */}
    {/* <div className='mt-5 bg-[#090D28] rounded-lg '>
      <DurationToFirstProposal/>
    </div> */}

    </>
  )
}

export default FunnelDashboard

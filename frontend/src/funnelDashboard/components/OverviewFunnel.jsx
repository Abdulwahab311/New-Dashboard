import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { REACT_APP_BASEURL } from '../../config.js';

const OverviewFunnel = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Temporary static data - now with 8 values to match 8 header columns
    setRows([
      {
        label: "GROSS REVENUE",
        total: "€14.5M",
        values: ["€2.3M", "€2.3M", "€2.3M", "€2.3M", "€2.3M", "€2.3M", "€2.3M", "€2.3M"],
        bgColor: "bg-cyan-400",
        textColor: "text-white",
      },
      {
        label: "TOTAL ACTIVE DEALS",
        total: 14,
        values: [4, 4, 4, 4, 4, 4, 4, 4],
        bgColor: "bg-cyan-400",
        textColor: "text-white",
      },
      {
        label: "TOTAL URGENT DEALS",
        total: 7,
        values: [4, 4, 4, 4, 4, 4, 4, 4],
        bgColor: "bg-red-500",
        textColor: "text-white",
      },
      {
        label: "TOTAL MID URG DEALS",
        total: 8,
        values: [4, 4, 4, 4, 4, 4, 4, 4],
        bgColor: "bg-orange-500",
        textColor: "text-white",
      },
      {
        label: "TOTAL LOW URG DEALS",
        total: 4,
        values: [4, 4, 4, 4, 4, 4, 4, 4],
        bgColor: "bg-green-500",
        textColor: "text-white",
      },
    ]);
  }, []);

  return (
    <div className="bg-[#090D28] p-5 rounded-lg">
      <div className="w-full mx-auto">
        <h1 className="text-white text-xl font-bold mb-1">OVERVIEW FUNNEL</h1>

        <div className="bg-[#090D28] overflow-hidden border-2 border-dashed border-slate-600">
          {/* MAIN HEADER ROW */}
          <div className="grid grid-cols-9 border-b-2 border-dashed border-slate-600">
            {/* TOTAL */}
            <div className="flex items-center justify-center py-3 border-r-2 border-dashed border-slate-600">
              <span className="text-slate-400 text-xs font-semibold uppercase">
                Total
              </span>
            </div>

            {/* SALES */}
            <div className="col-span-2 text-center border-r-2 border-dashed border-slate-600">
              <div className="py-1 text-slate-400 text-xs font-semibold uppercase">
                SALES
              </div>
              <div className="grid grid-cols-2">
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600">
                  ZORG
                </div>
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600 border-l-2 border-dashed">
                  INDUSTRIE
                </div>
              </div>
            </div>

            {/* OVDR – CC & DEV */}
            <div className="col-span-2 text-center border-r-2 border-dashed border-slate-600">
              <div className="py-1 text-slate-400 text-xs font-semibold uppercase">
                OVDR – CC & DEV
              </div>
              <div className="grid grid-cols-2">
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600">
                  ZORG
                </div>
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600 border-l-2 border-dashed">
                  INDUSTRIE
                </div>
              </div>
            </div>

            {/* CC & DEV */}
            <div className="col-span-2 text-center border-r-2 border-dashed border-slate-600">
              <div className="py-1 text-slate-400 text-xs font-semibold uppercase">
                CC & DEV
              </div>
              <div className="grid grid-cols-2">
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600">
                  ZORG
                </div>
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600 border-l-2 border-dashed">
                  INDUSTRIE
                </div>
              </div>
            </div>

            {/* PAS & REG */}
            <div className="col-span-2 text-center">
              <div className="py-1 text-slate-400 text-xs font-semibold uppercase">
                PAS & REG
              </div>
              <div className="grid grid-cols-2">
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600">
                  ZORG
                </div>
                <div className="py-1 text-white text-[10px] border-t-2 border-dashed border-slate-600 border-l-2 border-dashed">
                  INDUSTRIE
                </div>
              </div>
            </div>
          </div>

          {/* DATA ROWS - Now with 9 columns to match header */}
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-9 border-b-2 border-dashed border-slate-500 last:border-b-0"
            >
              {/* TOTAL COLUMN */}
              <div
                className="p-2 flex flex-col justify-center border-r-2 border-dashed border-slate-500"
                style={{ backgroundColor: "#25B2E5" }}
              >
                <div
                  className={`${row.textColor} font-bold text-xs leading-tight text-center`}
                >
                  {row.label.split(" ").map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </div>
                <div
                  className={`${row.textColor} text-xl font-bold mt-1 text-center`}
                >
                  {row.total}
                </div>
              </div>

              {/* DATA COLUMNS - 8 columns (ZORG & INDUSTRIE for each section) */}
              {row.values.map((value, colIndex) => {
                const useCustomBlue = rowIndex <= 1;
                const cellBg = row.bgColor;
                
                // Add left border between ZORG and INDUSTRIE in each pair
                const leftBorderClass = colIndex % 2 === 1 ? "border-l-2 border-dashed border-slate-500" : "";
                
                // Add right border after each pair (every 2 columns) except the last
                const rightBorderClass = (colIndex % 2 === 1 && colIndex < row.values.length - 1) 
                  ? "border-r-2 border-dashed border-slate-500" 
                  : "";

                return (
                  <div
                    key={colIndex}
                    className={`p-2 flex items-center justify-center ${leftBorderClass} ${rightBorderClass} ${useCustomBlue ? "" : cellBg}`}
                    style={
                      useCustomBlue ? { backgroundColor: "#2957B4" } : undefined
                    }
                  >
                    <span className={`${row.textColor} text-xl font-bold`}>
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewFunnel;
import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { REACT_APP_BASEURL } from '../../config.js';

const OverviewFunnel = () => {
  const [rows, setRows] = useState([]);
  const stages = [
    "SALES",
    "1e contr. fase",
    "DEVELOPMENT",
    "2nd CONTRACT",
    "EXIT",
  ];

  useEffect(() => {
    // fetchData();

    // Temporary static data while API is disabled
    setRows([
      {
        label: "GROSS REVENUE",
        total: "€12.5M",
        values: ["€2.1M", "€3.4M", "€4.0M", "€2.0M", "€1.0M"],
        bgColor: "bg-cyan-400",
        textColor: "text-white",
      },
      {
        label: "TOTAL ACTIVE DEALS",
        total: 42,
        values: [10, 12, 8, 7, 5],
        bgColor: "bg-cyan-400",
        textColor: "text-white",
      },
      {
        label: "TOTAL URGENT DEALS",
        total: 8,
        values: [2, 3, 1, 2, 0],
        bgColor: "bg-red-500",
        textColor: "text-white",
        endAt: 3,
      },
      {
        label: "TOTAL MID URG DEALS",
        total: 14,
        values: [4, 5, 3, 2, 0],
        bgColor: "bg-orange-500",
        textColor: "text-white",
        endAt: 4,
      },
      {
        label: "TOTAL LOW URG DEALS",
        total: 20,
        values: [4, 4, 4, 4, 4],
        bgColor: "bg-green-500",
        textColor: "text-white",
        skipColumns: [3],
      },
    ]);
  }, []);

  /*
  const fetchData = async () => {
    const res = await axios.get(`${REACT_APP_BASEURL}/sales/getSales`);
    const pipelines = res.data.data || [];

    const categories = {
      SALES: [],
      '1e contr. fase': [],
      DEVELOPMENT: [],
      '2nd CONTRACT': [],
      EXIT: []
    };

    pipelines.forEach(p => {
      p.stages.forEach(s => {
        const stage = s.stage.toLowerCase();
        const value = s.avgTimeToAdvanceDays ?? 0;

        if (p.pipelineKey.includes('sales')) categories['SALES'].push(value);
        else if (['zorg', 'industrie'].includes(p.pipelineKey)) {
          if (stage.includes('concept') || stage.includes('koper')) categories['1e contr. fase'].push(value);
          else if (stage.includes('type zorg') || stage.includes('ontwikkeling')) categories['DEVELOPMENT'].push(value);
          else if (stage.includes('passeren') || stage.includes('overeenkomst')) categories['2nd CONTRACT'].push(value);
        }

        if (stage.includes('verkocht') || stage.includes('gesloten')) categories['EXIT'].push(value);
      });
    });

    const sum = arr => arr.reduce((a, b) => a + b, 0);
    const count = arr => arr.length;

    const newRows = [
      {
        label: 'GROSS REVENUE',
        total: '€' + sum(Object.values(categories).flat()).toFixed(1) + 'M',
        values: stages.map(s => '€' + sum(categories[s]).toFixed(1) + 'M'),
        bgColor: 'bg-cyan-400',
        textColor: 'text-white'
      },
      {
        label: 'TOTAL ACTIVE DEALS',
        total: count(Object.values(categories).flat()),
        values: stages.map(s => count(categories[s])),
        bgColor: 'bg-cyan-400',
        textColor: 'text-white'
      },
      {
        label: 'TOTAL URGENT DEALS',
        total: count(Object.values(categories).flat().filter(v => v <= 3)),
        values: stages.map(s => count(categories[s].filter(v => v <= 3))),
        bgColor: 'bg-red-500',
        textColor: 'text-white',
        endAt: 3
      },
      {
        label: 'TOTAL MID URG DEALS',
        total: count(Object.values(categories).flat().filter(v => v > 3 && v <= 7)),
        values: stages.map(s => count(categories[s].filter(v => v > 3 && v <= 7))),
        bgColor: 'bg-orange-500',
        textColor: 'text-white',
        endAt: 4
      },
      {
        label: 'TOTAL LOW URG DEALS',
        total: count(Object.values(categories).flat().filter(v => v > 7)),
        values: stages.map(s => count(categories[s].filter(v => v > 7))),
        bgColor: 'bg-green-500',
        textColor: 'text-white',
        skipColumns: [3]
      }
    ];

    setRows(newRows);
  };
  */

  return (
    <div className="bg-[#090D28] p-5 rounded-lg">
      <div className="w-full mx-auto">
        <h1 className="text-white text-xl font-bold mb-1">OVERVIEW FUNNEL</h1>

        <div className="bg-[#090D28] overflow-hidden border-2 border-dashed border-slate-600">
          <div className="grid grid-cols-6 border-b-2 border-dashed border-slate-600">
           
            {/* {stages.map((stage, index) => (
              <div
                key={index}
                className="bg-[#090D28] p-2 border-l-2 border-dashed border-slate-600 text-center"
              >
                <div className="text-white font-semibold text-xs uppercase tracking-wide">
                  {stage}
                </div>
              </div>
            ))} */}
          </div>
          <div className="grid grid-cols-9 border-b-2 border-dashed border-slate-600">
            <div className="text-center py-3 border-r-2 border-dashed border-slate-600">
              <div className="text-slate-400 text-xs font-semibold uppercase">
                Total
              </div>
            </div>

            {["Sales", "OVDR – CC & DEV", "CC & DEV", "PAS & REG"].map(
              (title, i) => (
                <div
                  key={i}
                  className="col-span-2 text-center py-2 border-r-2 border-dashed border-slate-600 last:border-r-0"
                >
                  <div className="text-slate-400 text-xs font-semibold uppercase">
                    {title}
                  </div>
                  <div className="grid grid-cols-2 mt-1">
                    <div className="text-white text-[10px]">ZORG</div>
                    <div className="text-white text-[10px]">INDUSTRIE</div>
                  </div>
                </div>
              ),
            )}
          </div>
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-6 border-b-2 border-dashed border-slate-500 last:border-b-0"
            >
              <div
                className="p-2 flex flex-col justify-center"
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

              {row.values.map((value, colIndex) => {
                const shouldShow = row.endAt
                  ? colIndex < row.endAt
                  : row.skipColumns
                    ? !row.skipColumns.includes(colIndex)
                    : true;

                const useCustomBlue = rowIndex <= 1 && shouldShow && value;
                const cellBg =
                  shouldShow && value ? row.bgColor : "bg-[#0B0F24]";

                return (
                  <div
                    key={colIndex}
                    className={`p-2 border-l-2 border-dashed border-slate-500 flex items-center justify-center ${useCustomBlue ? "" : cellBg}`}
                    style={
                      useCustomBlue ? { backgroundColor: "#2957B4" } : undefined
                    }
                  >
                    {shouldShow && value && (
                      <span className={`${row.textColor} text-xl font-bold`}>
                        {value}
                      </span>
                    )}
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

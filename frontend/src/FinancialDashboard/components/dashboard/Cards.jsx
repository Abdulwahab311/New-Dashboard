import React, { useEffect, useRef, useState } from "react";
import Chart from "../dashboard/Wavechart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import {
  areaElementClasses,
  lineElementClasses,
} from "@mui/x-charts/LineChart";
import { REACT_APP_BASEURL } from "../../../config.js";

// Hook for responsive chart sizing
function useElementWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setWidth(el.clientWidth || 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

// NetProfitChart component
const NetProfitChart = ({ className }) => (
  <div
    className={`${className} rounded-lg flex items-center justify-center text-white font-semibold`}
  >
    <Chart />
  </div>
);

// Stat Card with MUI Sparkline
const StatCard = ({ title, value, note, change, big, bg }) => {
  const { ref, width } = useElementWidth();
  const chartWidth = Math.max(120, width);
  const chartHeight = chartWidth < 200 ? 20 : 26;
  const wrapperStyle = { height: chartHeight };

  const sparkLineData = [
    120, 135, 110, 145, 130, 160, 140, 125, 155, 170, 150, 100,
  ];

  return (
    <div
      className={`group relative rounded border border-[#252B42] p-3 flex flex-col items-center text-center
      transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-pink-500/50
      ${big ? "h-46 w-full" : "w-full"}`}
      style={{ background: bg || "transparent" }}
    >
      {/* TITLE */}
      <div
        className="text-[7px] font-medium tracking-wider text-gray-400 mb-1 truncate
        transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:whitespace-normal"
      >
        {title}
      </div>

      {/* VALUE */}
      <div
        className={`text-white font-semibold truncate
        transition-all duration-300 group-hover:scale-125 group-hover:whitespace-normal
        ${big ? "text-xl" : "text-base"}`}
      >
        {value}
      </div>

      {(change || note) && (
        <div className="flex items-center justify-center gap-1 text-[8px] mt-1 transition-opacity duration-300 group-hover:opacity-100 opacity-80">
          {change && (
            <span
              className={`font-medium rounded-md px-1 py-0.5 ${
                change.startsWith("-")
                  ? "text-red-400 bg-red-500/20"
                  : "text-green-400 bg-green-500/20"
              }`}
            >
              {change}
            </span>
          )}
          {note && <span className="text-gray-500">{note}</span>}
        </div>
      )}

      {/* Sparkline */}
      <div
        className="absolute bottom-0 left-0 right-0 mx-auto"
        style={wrapperStyle}
      >
        <div ref={ref} className="w-full h-full">
          <SparkLineChart
            data={sparkLineData}
            height={chartHeight}
            width={chartWidth}
            area
            color="#DB2777"
            margin={{ top: 0, bottom: -20, left: -8, right: 5 }}
            sx={{
              [`& .${areaElementClasses.root}`]: {
                opacity: 0.25,
                filter: "drop-shadow(0 2px 4px rgba(219, 39, 119, 0.3))",
              },
              [`& .${lineElementClasses.root}`]: {
                strokeWidth: 2,
                filter: "drop-shadow(0 1px 2px rgba(219, 39, 119, 0.4))",
              },
            }}
          />
        </div>
      </div>

      {/* Glow overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 bg-pink-500/5" />
    </div>
  );
};

// Cards Layout with API Integration
export default function Cards() {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    // ===== API CALL COMMENTED OUT =====
    /*
    try {
      setLoading(true);
      console.log("API Base URL:", REACT_APP_BASEURL); // Debug URL
      const response = await fetch(`${REACT_APP_BASEURL}/finance/getFinancial`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch financial data: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      console.log("API Response:", responseData); // Debug response

      const data = Array.isArray(responseData)
        ? responseData
        : Array.isArray(responseData.data)
        ? responseData.data
        : [];

      if (data.length === 0) {
        console.warn("Received empty data array");
      }

      const transformed = transformFinancialData(data);
      setFinancialData(transformed);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching financial data:", err);
      setError(err.message);
      setLoading(false);
    }
    */

    // ===== STATIC DATA FOR UI =====
    try {
      setLoading(true);

      const staticData = [
        {
          category: "TOTAL TURNOVER",
          ACTUAL: 770000,
          subcategories: [
            {
              name: "- Costs of goods sold",
              ACTUAL: 195000,
            },
          ],
        },
        {
          category: "Nett Income",
          ACTUAL: 385000,
        },
        {
          category: "Bank balance",
          ACTUAL: 575000,
          subcategories: [
            {
              name: "Calculated bank balance",
              ACTUAL: 575000,
            },
            {
              name: "- Frozen funds  / provisions",
              ACTUAL: 50000,
            },
          ],
        },
        {
          category: "Gross profit",
          ACTUAL: 575000,
          subcategories: [
            {
              name: "- Overhead / operational costs",
              ACTUAL: 135000,
            },
          ],
        },
        {
          category: "NET CASH POSITION",
          ACTUAL: 525000,
        },
      ];

      const transformed = transformFinancialData(staticData);
      setFinancialData(transformed);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error processing static data:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const transformFinancialData = (rawData) => {
    const dataMap = {};
    const dataArray = Array.isArray(rawData) ? rawData : [];

    // ✅ Step 1: Build data map including subcategories
    dataArray.forEach((item) => {
      const category = item?.category?.trim();
      if (category) {
        dataMap[category] = {
          actual: parseFloat(item?.ACTUAL || 0) || 0,
          subcategories: item?.subcategories || [], // <--- include subcategories
        };
      }
    });

    // ✅ Step 2: Extract values
    const totalTurnover = dataMap["TOTAL TURNOVER"]?.actual || 0;
    const netIncome = dataMap["Nett Income"]?.actual || 0;
    const bankBalance = dataMap["Bank balance"]?.actual || 0;
    const calculatedBankBalance = Math.abs(
      Number(
        dataMap["Bank balance"]?.subcategories?.find(
          (item) => item.name === "Calculated bank balance",
        )?.ACTUAL || 0,
      ),
    );

    const frozenFunds = Math.abs(
      Number(
        dataMap["Bank balance"]?.subcategories?.find(
          (item) => item.name === "- Frozen funds  / provisions",
        )?.ACTUAL || 0,
      ),
    );
    const grossProfit = dataMap["Gross profit"]?.actual || 0;

    // ✅ Step 3: Now safely read from subcategories of "Gross profit"
    const overheadCosts = Math.abs(
      Number(
        dataMap["Gross profit"]?.subcategories?.find(
          (item) => item.name === "- Overhead / operational costs",
        )?.ACTUAL || 0,
      ),
    );

    // ✅ Step 4: Compute Net Cash Position
    const netFreeCash = Math.abs(dataMap["NET CASH POSITION"]?.actual || 0);

    const costsOfGoodsSold = Math.abs(
      Number(
        dataMap["TOTAL TURNOVER"]?.subcategories?.find(
          (item) => item.name === "- Costs of goods sold",
        )?.ACTUAL || 0,
      ),
    );

    const netProfitMargin =
      totalTurnover !== 0 ? ((netIncome / grossProfit) * 100).toFixed(1) : 0;

    // ✅ Step 5: Return formatted results
    return {
      netFreeCash,
      netProfit: netIncome,
      growthCashPosition: grossProfit,
      grossCashBank: calculatedBankBalance,
      frozenCash: frozenFunds,
      revenue: totalTurnover,
      costsOfGoodsSold,
      operationalCosts: overheadCosts,
      netProfitMargin: `${netProfitMargin}%`,
    };
  };

  const formatCurrency = (value) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  if (loading)
    return (
      <div className="text-white text-center py-8">
        Loading financial data...
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        Error: {error}
        <button
          onClick={fetchFinancialData}
          className="ml-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );

  if (!financialData)
    return (
      <div className="text-white text-center py-8">
        No financial data available
      </div>
    );

  return (
    <div className="flex flex-col xl:flex-row gap-3 w-full max-w-full">
      <div className="grid grid-cols-2 gap-2 w-full xl:w-60 flex-shrink-0 grid-rows-3">
        <div className="col-span-2 row-span-2">
          <StatCard
            big
            title="NET (FREE) CASH POSITION"
            value={formatCurrency(financialData.netFreeCash)}
            change="+3.2%"
            note="vs last 3 months"
          />
        </div>
        <StatCard
          title="NET PROFIT"
          value={formatCurrency(financialData.netProfit)}
          change="+1.4%"
          note="vs last 3 months"
        />
        <StatCard
          title="GROWTH CASH POSITION"
          value={formatCurrency(financialData.growthCashPosition)}
          change="+2.8%"
          note="vs last 3 months"
        />
      </div>
      <div className="grid grid-cols-2 gap-2 w-full xl:w-60 flex-shrink-0">
        <StatCard
          title="GROSS CASH (BANK)"
          value={formatCurrency(financialData.grossCashBank)}
          change="+0.9%"
          note="vs last 3 months"
        />
        <StatCard
          title="TEMPORARY FROZEN CASH"
          value={formatCurrency(financialData.frozenCash)}
          change="-5%"
          note="vs last 3 months"
          bg="linear-gradient(180deg, rgba(240, 66, 69, 0.52) 0%, rgba(9, 13, 40, 0) 100%)"
        />
        <StatCard
          title="REVENUE"
          value={formatCurrency(financialData.revenue)}
          change="+7%"
          note="vs last 3 months"
          bg="linear-gradient(180deg, rgba(240, 66, 69, 0.52) 0%, rgba(9, 13, 40, 0) 100%)"
        />
        <StatCard
          title="COSTS OF GOODS SOLD"
          value={formatCurrency(financialData.costsOfGoodsSold)}
          change="+10%"
          note="vs last 3 months"
        />
        <StatCard
          title="OPERATIONAL COSTS"
          value={formatCurrency(financialData.operationalCosts)}
          change="-15%"
          note="vs last 3 months"
        />
        <StatCard
          title="NET PROFIT MARGIN"
          value={financialData.netProfitMargin}
          change="+2%"
          note="vs last 3 months"
          bg="linear-gradient(180deg, rgba(240, 66, 69, 0.52) 0%, rgba(9, 13, 40, 0) 100%)"
        />
      </div>
      <div className="flex-1 min-w-0 w-full xl:w-auto">
        <div className="rounded-xl bg-[#090D28] border border-[#252B42] p-3 h-full min-h-[180px] xl:min-h-[240px]">
          <NetProfitChart className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { REACT_APP_BASEURL } from "../../../config";

const LegendDot = ({ color }) => (
  <span
    className="inline-block w-1.5 h-1.5 rounded-full mr-0.5 sm:mr-1"
    style={{ backgroundColor: color }}
  />
);

export default function ScalingChart() {
  const [chartData, setChartData] = useState([]);

  const legends = [
    { id: "zorg", label: "OMZET ZORG", color: "#51E08D" },
    { id: "industrie", label: "OMZET INDUSTRIE", color: "#F6C26B" },
    { id: "overig", label: "OMZET OVERIG", color: "#5DD1FF" },
    { id: "huur", label: "HUUR INKOMSTEN", color: "#FF896E" },
  ];

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const yTicks = ["10M", "5M", "1M", "500K", "100K", "50K"];

  useEffect(() => {
    const fetchFinanceData = async () => {
      // ===== API CALL COMMENTED OUT =====
      /*
      try {
        const res = await axios.get(`${REACT_APP_BASEURL}/finance/getFinancial`);
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        if (data.length === 0) {
          console.warn("Received empty data array");
        }

        // helper to extract category data safely
        const getCategoryData = (categoryName) => {
          const found = data.find(
            (d) => d?.category?.toLowerCase().trim() === categoryName.toLowerCase().trim()
          );
          return Array.isArray(found?.data) ? found.data : [];
        };

        const zorg = getCategoryData("OMZET ZORG");
        const industrie = getCategoryData("OMZET INDUSTRIE");
        const overig = getCategoryData("OMZET OVERIG");
        const huur = getCategoryData("HUUR INKOMSTEN");

        // convert to monthly chart data
        const chartArray = months.map((month) => {
          const getMonthlyValue = (arr) => {
            const found = arr.find(
              (d) => d?.month?.toLowerCase().trim() === month.toLowerCase().trim()
            );
            return found ? Number(found.actual?.replace(/[^\d.-]/g, "")) || 0 : 0;
          };

          return {
            m: month.slice(0, 3), // show Jan, Feb, etc. on chart
            zorg: getMonthlyValue(zorg),
            industrie: getMonthlyValue(industrie),
            overig: getMonthlyValue(overig),
            huur: getMonthlyValue(huur),
          };
        });

        setChartData(chartArray);
      } catch (err) {
        console.error("Error fetching finance chart data:", err);
      }
      */

      // ===== STATIC DATA FOR UI =====
      try {
        const staticData = [
          {
            category: "OMZET ZORG",
            data: [
              { month: "JANUARY", actual: "245000" },
              { month: "FEBRUARY", actual: "268000" },
              { month: "MARCH", actual: "252000" },
              { month: "APRIL", actual: "275000" },
              { month: "MAY", actual: "260000" },
              { month: "JUNE", actual: "280000" },
              { month: "JULY", actual: "265000" },
              { month: "AUGUST", actual: "270000" },
              { month: "SEPTEMBER", actual: "285000" },
              { month: "OCTOBER", actual: "290000" },
              { month: "NOVEMBER", actual: "295000" },
              { month: "DECEMBER", actual: "305000" },
            ],
          },
          {
            category: "OMZET INDUSTRIE",
            data: [
              { month: "JANUARY", actual: "285000" },
              { month: "FEBRUARY", actual: "310000" },
              { month: "MARCH", actual: "295000" },
              { month: "APRIL", actual: "320000" },
              { month: "MAY", actual: "305000" },
              { month: "JUNE", actual: "315000" },
              { month: "JULY", actual: "300000" },
              { month: "AUGUST", actual: "325000" },
              { month: "SEPTEMBER", actual: "335000" },
              { month: "OCTOBER", actual: "340000" },
              { month: "NOVEMBER", actual: "350000" },
              { month: "DECEMBER", actual: "360000" },
            ],
          },
          {
            category: "OMZET OVERIG",
            data: [
              { month: "JANUARY", actual: "85000" },
              { month: "FEBRUARY", actual: "92000" },
              { month: "MARCH", actual: "88000" },
              { month: "APRIL", actual: "95000" },
              { month: "MAY", actual: "90000" },
              { month: "JUNE", actual: "97000" },
              { month: "JULY", actual: "91000" },
              { month: "AUGUST", actual: "94000" },
              { month: "SEPTEMBER", actual: "98000" },
              { month: "OCTOBER", actual: "100000" },
              { month: "NOVEMBER", actual: "102000" },
              { month: "DECEMBER", actual: "105000" },
            ],
          },
          {
            category: "HUUR INKOMSTEN",
            data: [
              { month: "JANUARY", actual: "65000" },
              { month: "FEBRUARY", actual: "70000" },
              { month: "MARCH", actual: "68000" },
              { month: "APRIL", actual: "72000" },
              { month: "MAY", actual: "69000" },
              { month: "JUNE", actual: "73000" },
              { month: "JULY", actual: "70000" },
              { month: "AUGUST", actual: "74000" },
              { month: "SEPTEMBER", actual: "76000" },
              { month: "OCTOBER", actual: "78000" },
              { month: "NOVEMBER", actual: "80000" },
              { month: "DECEMBER", actual: "82000" },
            ],
          },
        ];

        // helper to extract category data safely
        const getCategoryData = (categoryName) => {
          const found = staticData.find(
            (d) => d?.category?.toLowerCase().trim() === categoryName.toLowerCase().trim()
          );
          return Array.isArray(found?.data) ? found.data : [];
        };

        const zorg = getCategoryData("OMZET ZORG");
        const industrie = getCategoryData("OMZET INDUSTRIE");
        const overig = getCategoryData("OMZET OVERIG");
        const huur = getCategoryData("HUUR INKOMSTEN");

        // convert to monthly chart data
        const chartArray = months.map((month) => {
          const getMonthlyValue = (arr) => {
            const found = arr.find(
              (d) => d?.month?.toLowerCase().trim() === month.toLowerCase().trim()
            );
            return found ? Number(found.actual?.replace(/[^\d.-]/g, "")) || 0 : 0;
          };

          return {
            m: month.slice(0, 3), // show Jan, Feb, etc. on chart
            zorg: getMonthlyValue(zorg),
            industrie: getMonthlyValue(industrie),
            overig: getMonthlyValue(overig),
            huur: getMonthlyValue(huur),
          };
        });

        setChartData(chartArray);
      } catch (err) {
        console.error("Error processing static chart data:", err);
      }
    };

    fetchFinanceData();
  }, []);

  return (
    <div className="rounded-2xl border border-[#252B42] text-white w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="rounded-xl px-2 sm:px-3 py-1.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div className="text-[10px] sm:text-xs tracking-wide">REVENUE</div>
        <div className="flex flex-nowrap items-center gap-1.5 sm:gap-2 text-[7px] sm:text-[8px] overflow-x-auto">
          {legends.map((l) => (
            <span key={l.id} className="flex items-center whitespace-nowrap">
              <LegendDot color={l.color} />
              <span className="hidden sm:inline">{l.label}</span>
              <span className="sm:hidden">
                {l.label.split(" ")[1] || l.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div
        className="mt-2 rounded-xl bg-[#0C132A] p-1 sm:p-2"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)" }}
      >
        <div className="relative h-[120px] sm:h-[160px] md:h-[190px]">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-1 bottom-4 flex flex-col justify-between text-[7px] sm:text-[8px] text-gray-300 pl-1 sm:pl-2">
            {yTicks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          {/* X-axis labels */}
          <div className="absolute left-6 sm:left-10 right-1 sm:right-2 bottom-0.5 flex justify-between text-[7px] sm:text-[8px] text-gray-400">
            {months.map((m, index) => (
              <span
                key={m}
                className={`${
                  index % 2 === 0 || window.innerWidth > 640
                    ? "block"
                    : "hidden sm:block"
                }`}
              >
                {m.slice(0, 3)}
              </span>
            ))}
          </div>

          {/* Chart Areas */}
          <div className="absolute inset-0 left-6 sm:left-10 right-1 sm:right-2 top-1 bottom-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="areaZorg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#51E08D" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#51E08D" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="areaIndustrie" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F6C26B" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#F6C26B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="areaOverig" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5DD1FF" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#5DD1FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="areaHuur" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF896E" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#FF896E" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0C132A",
                    border: "1px solid #252B42",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "10px",
                  }}
                  formatter={(value) =>
                    new Intl.NumberFormat("en-US").format(value)
                  }
                />

                <Area type="monotone" dataKey="zorg" fill="url(#areaZorg)" stackId="1" />
                <Area type="monotone" dataKey="industrie" fill="url(#areaIndustrie)" stackId="1" />
                <Area type="monotone" dataKey="overig" fill="url(#areaOverig)" stackId="1" />
                <Area type="monotone" dataKey="huur" fill="url(#areaHuur)" stackId="1" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
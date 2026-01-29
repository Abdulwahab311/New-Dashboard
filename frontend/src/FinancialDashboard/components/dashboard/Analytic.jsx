import React, { useEffect, useState } from "react";
import axios from "axios";
import ScalingChart from "./GraphLine";
import PieChartComponent from "./Piechart";
import Wavechart from "../../components/dashboard/Wavechart.jsx";
import NetProfitChart from "./LineChart"; // This is the chart component
import { Sparklines, SparklinesLine } from "react-sparklines";
import { REACT_APP_BASEURL } from "../../../config.js";

const SectionHeader = ({ text, bg }) => (
  <div
    className={`w-full rounded-t-lg text-white text-xs font-semibold tracking-widest px-3 py-2 ${bg}`}
  >
    {text}
  </div>
);

const SparkMini = ({
  data = [5, 20, 15, 30, 15, 40, 10, 35, 25, 45, 20, 50, 15, 55, 30],
}) => (
  <Sparklines data={data} limit={0} width={260} height={36} margin={4}>
    <defs>
      <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="rgba(254,253,255,0)" />
      </linearGradient>
    </defs>
    <SparklinesLine
      style={{ stroke: "url(#sparklineGradient)", strokeWidth: 2 }}
    />
  </Sparklines>
);

const StatCard = ({ title, value, note, change, header }) => (
  <div className="rounded-lg overflow-hidden border border-[#252B42] flex flex-col h-full min-h-[120px]">
    {header && (
      <div
        className={`px-2 py-1 text-[8px] sm:text-[10px] font-semibold tracking-wider text-white ${header}`}
      >
        <div className="truncate">{title}</div>
      </div>
    )}
    <div className="bg-[#181C3A] p-2 sm:p-3 flex flex-col flex-1">
      {!header && (
        <div className="text-[8px] sm:text-[10px] tracking-widest text-gray-300 mb-1 leading-tight line-clamp-2 min-h-[16px]">
          {title.length > 20 ? `${title.substring(0, 17)}...` : title}
        </div>
      )}
      <div className="text-white text-sm sm:text-md font-semibold mb-1 flex-shrink-0">
        {value}
      </div>
      <div className="flex items-center justify-start gap-1 sm:gap-2 text-[7px] sm:text-[9px] mb-2 min-h-[16px]">
        {change && (
          <span
            className={`font-medium rounded-md px-1 shrink-0 ${
              change.startsWith("-")
                ? "text-red-400 bg-[#FF000024]"
                : "text-green-400 bg-[#00D39424]"
            }`}
          >
            {change}
          </span>
        )}
        {note && (
          <span className="text-gray-400 truncate text-[6px] sm:text-[8px]">
            {note.length > 15 ? `${note.substring(0, 12)}...` : note}
          </span>
        )}
      </div>
      <div className="h-6 sm:h-8 -mx-2 sm:-mx-5 -mb-2 sm:-mb-5 mt-auto flex items-center">
        <SparkMini />
      </div>
    </div>
  </div>
);

const SectionPanel = ({ header, headerBg, children }) => (
  <div className="rounded-lg overflow-hidden border border-[#252B42] bg-[#090D28] h-full flex flex-col">
    <SectionHeader text={header} bg={headerBg} />
    <div className="p-2 flex-1 overflow-auto">{children}</div>
  </div>
);

export default function Marketing() {
  const [financialData, setFinancialData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [stats, setStats] = useState({
    grossRevenue: 0,
    productCosts: 0,
    grossMargin: 0,
    operationalCosts: 0,
    operationalMargin: 0,
    ebitda: 0,
    netProfit: 0,
    netProfitMargin: 0,
    netCashPosition: 0,
    omzetZorg: 0,
    omzetIndustrie: 0,
    omzetOverig: 0,
    huurInkomsten: 0,
    filteredCosts: [],
    totalOverhead: 0,
    totalTurnSum: 0,
  });

  const cleanValue = (val) =>
    val ? Number(String(val).replace(/[^\d.-]/g, "")) : 0;

  useEffect(() => {
    const fetchFinance = async () => {
      // ===== API CALL COMMENTED OUT =====
      /*
      try {
        const res = await axios.get(
          `${REACT_APP_BASEURL}/finance/getFinancial`
        );
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        if (!data.length) return console.warn("Received empty data array");

        // ===== Extract TOTAL TURN =====
        const totalTurn = data.find(
          (item) => item?.category?.toUpperCase() === "TOTAL TURN"
        );
        const subcategories =
          totalTurn?.subcategories?.map((sub) => ({
            name: sub?.name || "Unnamed",
            actual: cleanValue(sub?.ACTUAL),
          })) || [];
        const totalTurnSum = subcategories.reduce(
          (sum, item) => sum + (item.actual || 0),
          0
        );

        // ===== Extract OVERHEAD =====
        const overheadCategory = data.find(
          (item) => item?.category === "OVERHEAD (OPERATIONAL COSTS)"
        );
        const filteredCosts =
          overheadCategory?.subcategories?.map((sub) => ({
            category: sub?.name || "Unnamed",
            ACTUAL: cleanValue(sub?.ACTUAL),
          })) || [];
        const totalOverhead = filteredCosts.reduce(
          (sum, item) => sum + (item.ACTUAL || 0),
          0
        );

        // ===== Extract NET PROFIT =====
        const netProfitItem = data.find(
          (i) => i?.category === "Nett" || i?.category === "Nett Income"
        );
        const netProfitValue = cleanValue(netProfitItem?.ACTUAL);

        // ===== Custom NET PROFIT MARGIN =====
        const netProfitMarginCustom =
          totalTurnSum - totalOverhead > 0
            ? ((netProfitValue / (totalTurnSum - totalOverhead)) * 100).toFixed(
                1
              )
            : 0;

        // ===== Other values (unchanged) =====
        const grossRevenue = cleanValue(
          data.find(
            (i) =>
              i?.category === "TOTAL TURNOVER" ||
              i?.category === "GROSS REVENUE"
          )?.ACTUAL
        );
        const productCosts = cleanValue(
          data.find(
            (i) =>
              i?.category === "Costs of goods sold" ||
              i?.category === "COGS (PROJECT RELATED COSTS)"
          )?.ACTUAL
        );
        const grossMargin =
          grossRevenue > 0
            ? (((grossRevenue - productCosts) / grossRevenue) * 100).toFixed(1)
            : 0;
        const operationalCostsValue = cleanValue(
          data
            .find((i) => i?.category === "Gross profit")
            ?.subcategories?.find(
              (sub) =>
                sub?.name === "- Overhead / operational costs" ||
                sub?.name === "OPERATIONAL COSTS"
            )?.ACTUAL
        );
        const operationalMargin =
          grossRevenue > 0
            ? (
                (cleanValue(
                  data.find(
                    (i) =>
                      i?.category === "EBITDA" ||
                      i?.category === "PROFIT BEFORE TAXES EBITDA"
                  )?.ACTUAL
                ) /
                  grossRevenue) *
                100
              ).toFixed(1)
            : 0;
        const ebitdaValue = cleanValue(
          data.find(
            (i) =>
              i?.category === "EBITDA" ||
              i?.category === "PROFIT BEFORE TAXES EBITDA"
          )?.ACTUAL
        );
        const netCashValue = cleanValue(
          data.find((i) => i?.category === "Gross profit")?.ACTUAL
        );
        const omzetZorgValue = cleanValue(
          data.find((i) => i?.category === "OMZET ZORG")?.ACTUAL
        );
        const omzetIndustrieValue = cleanValue(
          data.find((i) => i?.category === "OMZET INDUSTRIE")?.ACTUAL
        );
        const omzetOverigValue = cleanValue(
          data.find((i) => i?.category === "OMZET OVERIG")?.ACTUAL
        );
        const huurInkomstenValue = cleanValue(
          data.find((i) => i?.category === "HUUR INKOMSTEN")?.ACTUAL
        );

        // ===== NET CASH POSITION (Forecast) =====
        const netCashData = data
          .filter((item) => item?.category === "NET CASH POSITION")
          .flatMap((item) => (Array.isArray(item?.data) ? item.data : []))
          .filter((m, index, self) => {
            const key = (m.month || m.Month || m.name || "").toString();
            return (
              key &&
              self.findIndex(
                (x) => (x.month || x.Month || x.name || "").toString() === key
              ) === index
            );
          });

        // ===== Update state =====
        setStats({
          grossRevenue,
          productCosts,
          grossMargin,
          operationalCosts: operationalCostsValue,
          operationalMargin,
          ebitda: ebitdaValue,
          netProfit: netProfitValue,
          netProfitMargin: netProfitMarginCustom,
          netCashPosition: netCashValue,
          omzetZorg: omzetZorgValue,
          omzetIndustrie: omzetIndustrieValue,
          omzetOverig: omzetOverigValue,
          huurInkomsten: huurInkomstenValue,
          filteredCosts,
          totalOverhead,
          totalTurnSum,
        });

        setFinancialData(subcategories);
        setForecastData(netCashData);
      } catch (err) {
        console.error("Error fetching financial data:", err);
      }
      */

      // ===== STATIC DATA FOR UI =====
      const staticFinancialData = [
        { name: "Project A", actual: 150000 },
        { name: "Project B", actual: 225000 },
        { name: "Project C", actual: 180000 },
        { name: "Project D", actual: 95000 },
        { name: "Project E", actual: 120000 },
      ];

      const staticForecastData = [
        { month: "January", type: "ACTUAL", REVENUE: 650000, COGS: 180000, OVERHEAD: 120000, "NET CASH POSITION": 350000, NET_CASH: 500000, INCOME: 280000 },
        { month: "February", type: "ACTUAL", REVENUE: 720000, COGS: 195000, OVERHEAD: 125000, "NET CASH POSITION": 400000, NET_CASH: 550000, INCOME: 310000 },
        { month: "March", type: "FORECASTED", REVENUE: 680000, COGS: 185000, OVERHEAD: 118000, "NET CASH POSITION": 377000, NET_CASH: 520000, INCOME: 295000 },
        { month: "April", type: "FORECASTED", REVENUE: 750000, COGS: 205000, OVERHEAD: 130000, "NET CASH POSITION": 415000, NET_CASH: 580000, INCOME: 325000 },
      ];

      const staticCosts = [
        { category: "Salaries & Wages", ACTUAL: 85000 },
        { category: "Office Rent", ACTUAL: 15000 },
        { category: "Utilities", ACTUAL: 5000 },
        { category: "Marketing", ACTUAL: 12000 },
        { category: "Insurance", ACTUAL: 8000 },
        { category: "Equipment", ACTUAL: 10000 },
      ];

      const totalTurnSum = staticFinancialData.reduce((sum, item) => sum + item.actual, 0);
      const totalOverhead = staticCosts.reduce((sum, item) => sum + item.ACTUAL, 0);
      const grossRevenue = 770000;
      const productCosts = 195000;
      const grossMargin = ((grossRevenue - productCosts) / grossRevenue * 100).toFixed(1);
      const operationalCosts = 135000;
      const ebitda = 440000;
      const operationalMargin = ((ebitda / grossRevenue) * 100).toFixed(1);
      const netProfit = 385000;
      const netProfitMargin = totalTurnSum - totalOverhead > 0
        ? ((netProfit / (totalTurnSum - totalOverhead)) * 100).toFixed(1)
        : 0;
      const netCashPosition = 575000;

      setStats({
        grossRevenue,
        productCosts,
        grossMargin,
        operationalCosts,
        operationalMargin,
        ebitda,
        netProfit,
        netProfitMargin,
        netCashPosition,
        omzetZorg: 280000,
        omzetIndustrie: 320000,
        omzetOverig: 95000,
        huurInkomsten: 75000,
        filteredCosts: staticCosts,
        totalOverhead,
        totalTurnSum,
      });

      setFinancialData(staticFinancialData);
      setForecastData(staticForecastData);
    };

    fetchFinance();
  }, []);

  const formatEuro = (value) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
    }).format(value || 0);

  return (
    <div className="grid grid-cols-12 gap-4 text-white">
      {/* Product Related Costs Section */}
      <div className="col-span-12 lg:col-span-4 flex">
        <SectionPanel header="PRODUCT RELATED COSTS GROSS REVENUE - COGS">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 mb-4">
            <StatCard
              title="GROSS REVENUE"
              value={`€${stats.grossRevenue.toLocaleString("en-US")}`}
              change="+12%"
              note="vs last 3 months"
            />
            <StatCard
              title="PRODUCT RELATED COSTS (COGS)"
              value={`€${stats.productCosts.toLocaleString("en-US")}`}
              change="-4%"
              note="vs last 3 months"
            />
            <StatCard
              title="GROSS REVENUE + GROSS MARGIN"
              value={`${stats.grossMargin}%`}
              change="+8%"
              note="vs last 3 months"
            />
          </div>
          <div className="mt-8">
            <ScalingChart />
          </div>
          <div className="grid grid-cols-2 gap-1 mt-4 mb">
            <StatCard
              title="OMZET ZORG"
              value={`€${stats.omzetZorg.toLocaleString()}`}
              change="+8%"
              note="vs last 3 months"
            />
            <StatCard
              title="OMZET INDUSTRIE"
              value={`€${stats.omzetIndustrie.toLocaleString()}`}
              change="-3%"
              note="vs last 3 months"
            />
          </div>
          <div className="grid grid-cols-2 gap-1 mt-2">
            <StatCard
              title="OMZET OVERIG"
              value={`€${stats.omzetOverig.toLocaleString()}`}
              change="+8%"
              note="vs last 3 months"
            />
            <StatCard
              title="HUUR INKOMSTEN"
              value={`€${stats.huurInkomsten.toLocaleString()}`}
              change="-3%"
              note="vs last 3 months"
            />
          </div>
          <div className="mt-4 flex-1">
            <div className="overflow-x-auto">
              <h1 className="text-sm sm:text-lg font-semibold p-2">
                REVENUE SPECIFICATIONS
              </h1>
              <div className="flex items-center justify-between bg-[#00D394] p-2 mb-5 rounded">
                <h2 className="text-xs sm:text-sm text-[#1F1F1F]">MONTHLY</h2>
                <p className="text-white">
                  <span className="text-sm sm:text-xl text-[#1F1F1F] font-semibold">
                    {formatEuro(stats.totalTurnSum)}
                  </span>{" "}
                  <span className="text-[#003D2B] bg-[#FFFFFF66] rounded-md p-1 text-[10px] sm:text-xs">
                    +12%
                  </span>{" "}
                  <span className="text-[10px] sm:text-xs text-[#1F1F1F]">
                    €5.172.595
                  </span>
                </p>
                <div className="text-[#1F1F1F]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m0 0l-6-6m6 6l6-6"
                    />
                  </svg>
                </div>
              </div>
              <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
                <table className="w-full text-xs sm:text-sm text-gray-300">
                  <thead className="text-gray-100 text-[10px] sm:text-xs uppercase">
                    <tr>
                      <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-left whitespace-nowrap min-w-[120px]">
                        Project Name
                      </th>
                      <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[90px]">
                        Revenue
                      </th>
                      <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[70px]">
                        COGS
                      </th>
                      <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[90px]">
                        Overhead
                      </th>
                      <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[100px]">
                        Net Profit
                      </th>
                      <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[80px]">
                        Seller
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.length > 0 ? (
                      financialData.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-[#252A51]" : ""}
                        >
                          <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-left">
                            {item?.name || "-"}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right whitespace-nowrap">
                            {item?.actual
                              ? `€${Number(item.actual).toLocaleString(
                                  "en-US"
                                )}`
                              : "-"}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right whitespace-nowrap">
                            -
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right whitespace-nowrap">
                            -
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right whitespace-nowrap">
                            -
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right whitespace-nowrap">
                            -
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-gray-500 py-4"
                        >
                          Loading project data...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </SectionPanel>
      </div>

      {/* Operational Costs Section */}
      <div className="col-span-12 lg:col-span-4 flex">
        <SectionPanel header="OPERATIONAL COSTS (OVERHEAD)">
          <div className="grid grid-cols-3 gap-1 sm:gap-2 w-full">
            <StatCard
              title="OPERATIONAL COSTS $"
              value={`€${stats.operationalCosts.toLocaleString("en-US")}`}
              change="+6%"
              note="vs last 3 months"
            />
            <StatCard
              title="OPERATIONAL MARGIN %"
              value={`${stats.operationalMargin}%`}
              change="-1%"
              note="vs last 3 months"
            />
            <StatCard
              title="PROFIT BEFORE TAXES EBITDA"
              value={`€${stats.ebitda.toLocaleString("en-US")}`}
              change="-2%"
              note="vs last 3 months"
            />
          </div>
          <h1 className="mt-3 text-sm sm:text-lg font-semibold">Costs</h1>
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] p-1 gap-2 mt-2">
            <div className="bg-[#181C3A] rounded-xl p-2">
              <div className="h-[200px] sm:h-[220px]">
                <Wavechart />
              </div>
            </div>
            <div className="bg-[#181C3A] rounded-xl p-1">
              <div className="h-[200px] sm:h-[180px]">
                <PieChartComponent />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-1 gap-2 mb-4">
            <StatCard
              title="GROSS REVENUE"
              value={`€${stats.grossRevenue.toLocaleString("en-US")}`}
              change="+12%"
              note="vs last 3 months"
            />
            <StatCard
              title="PRODUCT RELATED COSTS COGS"
              value={`€${stats.productCosts.toLocaleString("en-US")}`}
              change="-4%"
              note="vs last 3 months"
            />
            <StatCard
              title="GROSS REVENUE + GROSS MARGIN"
              value={`${stats.grossMargin}%`}
              change="+8%"
              note="vs last 3 months"
            />
            <StatCard
              title="GROSS PROFIT"
              value={`€${(
                stats.grossRevenue - stats.productCosts
              ).toLocaleString("en-US")}`}
              change="+5%"
              note="vs last 3 months"
            />
          </div>
          <div className="mt-8 flex-1 overflow-auto">
            <div className="overflow-x-auto">
              <h1 className="text-sm sm:text-lg font-semibold p-2">
                COSTS SPECIFICATION
              </h1>
              <div className="flex items-center justify-between bg-[#00D394] p-2 mb-5 rounded">
                <h2 className="text-xs sm:text-sm text-[#1F1F1F]">MONTHLY</h2>
                <p className="text-white">
                  <span className="text-sm sm:text-xl text-[#1F1F1F] font-semibold">
                    {formatEuro(stats.totalOverhead)}
                  </span>{" "}
                  <span className="text-[#CF1114] p-1 rounded-md bg-[#FFFFFF66] text-[10px] sm:text-xs">
                    +12%
                  </span>{" "}
                  <span className="text-[10px] sm:text-xs text-[#1F1F1F]">
                    €5.172.595
                  </span>
                </p>
                <div className="text-[#1F1F1F]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m0 0l-6-6m6 6l6-6"
                    />
                  </svg>
                </div>
              </div>
              <table className="w-full text-xs sm:text-sm text-gray-300 border border-[#2A2C3D] rounded-lg overflow-hidden">
                <tbody>
                  {stats.filteredCosts.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "" : "bg-[#252A51]"}
                    >
                      <td className="px-2 sm:px-3 py-2">{item.category}</td>
                      <td className="px-2 sm:px-3 py-2 text-right"></td>
                      <td className="px-2 sm:px-3 py-2 text-right"></td>
                      <td
                        className={`px-2 sm:px-3 py-2 text-right ${
                          index % 2 !== 0 ? "bg-[#252A51]" : ""
                        }`}
                      >
                        €{Number(item.ACTUAL).toLocaleString()}
                      </td>
                      <td
                        className={`px-2 sm:px-3 py-2 text-right ${
                          index % 2 !== 0 ? "bg-[#252A51]" : ""
                        }`}
                      ></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </SectionPanel>
      </div>

      {/* Net Profit Section */}
      <div className="col-span-12 lg:col-span-4 flex">
        <SectionPanel header="NET PROFIT">
          <div className="grid grid-cols-3 gap-1 sm:gap-2 w-full">
            <StatCard
              title="NET PROFIT"
              value={`€${stats.netProfit.toLocaleString("en-US")}`}
              change="+6%"
              note="vs last 3 months"
            />
            <StatCard
              title="NET PROFIT MARGIN"
              value={`${stats.netProfitMargin}%`}
              change="-1%"
              note="vs last 3 months"
            />
            <StatCard
              title="GROWTH CASH POSITION (BANK)"
              value={`€${stats.netCashPosition.toLocaleString("en-US")}`}
              change="-2%"
              note="vs last 3 months"
            />
          </div>
          <div className="mt-8">
            <NetProfitChart />
          </div>
          <div className="grid grid-cols-3 mt-2 gap-1 sm:gap-2 w-full">
            <StatCard
              title="NET PROFIT"
              value={`€${stats.netProfit.toLocaleString("en-US")}`}
              change="+6%"
              note="vs last 3 months"
            />
            <StatCard
              title="NET PROFIT MARGIN"
              value={`${stats.netProfitMargin}%`}
              change="-1%"
              note="vs last 3 months"
            />
            <StatCard
              title="GROWTH CASH POSITION (BANK)"
              value={`€${stats.netCashPosition.toLocaleString("en-US")}`}
              change="-2%"
              note="vs last 3 months"
            />
          </div>
          <div className="mt-8 flex-1 overflow-auto">
            <div className="overflow-x-auto">
              <h1 className="text-sm sm:text-lg font-semibold p-2">
                FORECAST CASH POSITION
              </h1>
              <table className="w-full text-xs sm:text-sm text-gray-300">
                <thead className="text-gray-100 text-[10px] sm:text-xs uppercase">
                  <tr>
                    <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-left whitespace-nowrap min-w-[60px]"></th>
                    <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-left whitespace-nowrap min-w-[60px]"></th>
                    <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[90px]">
                      REVENUE
                    </th>
                    <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[70px]">
                      COGS
                    </th>
                    <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[90px]">
                      OVERHEAD
                    </th>
                    <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[80px]">
                      INCOME
                    </th>
                    <th className="px-2 sm:px-3 py-2 border-r border-[#2A2C3D] text-right whitespace-nowrap min-w-[140px]">
                      NET CASH POSITION
                    </th>
                    <th className="px-2 sm:px-3 py-2 text-right whitespace-nowrap min-w-[80px]">
                      SELLER
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData.length > 0 ? (
                    forecastData.map((d, idx) => {
                      const pickNumber = (...keys) => {
                        for (const k of keys) {
                          const v =
                            d[k] ??
                            d[k?.toLowerCase?.()] ??
                            d[k?.toUpperCase?.()];
                          if (
                            v !== undefined &&
                            v !== null &&
                            String(v).trim() !== ""
                          ) {
                            const n = Number(String(v).replace(/[^\d.-]/g, ""));
                            if (!Number.isNaN(n)) return n;
                          }
                        }
                        return null;
                      };

                      const revenue = pickNumber(
                        "REVENUE",
                        "revenue",
                        "ACTUAL",
                        "actual_revenue"
                      );
                      const cogs = pickNumber("COGS", "cogs");
                      const overhead = pickNumber("OVERHEAD", "overhead");
                      const netProfit = pickNumber("NET CASH POSITION");
                      const netCash = pickNumber(
                        "NET_CASH",
                        "net_cash",
                        "NET_CASH_POSITION"
                      );
                      const income = pickNumber("INCOME", "income");

                      const fmt = (n) =>
                        n === null ? "-" : `€${n.toLocaleString("en-US")}`;

                      return (
                        <tr key={`forecast-${idx}`}>
                          <td className="px-2 sm:px-3 bg-[#252A51] py-2">
                            {d.month || d.Month || d.name || "-"}
                          </td>
                          <td
                            className={`px-2 sm:px-3 py-2 text-right ${
                              (d.type || d.Type || "").toUpperCase() ===
                              "FORECASTED"
                                ? "bg-[#252A51]"
                                : ""
                            }`}
                          >
                            {d.type || d.Type || "-"}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right bg-[#F0424599]">
                            {fmt(revenue)}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right bg-[#2FC639]">
                            {fmt(cogs)}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right bg-[#F0424599]">
                            {fmt(overhead)}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right bg-[#F0424599] text-[#00D394]">
                            {fmt(netProfit)}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right bg-[#F0424599]">
                            {fmt(netCash)}
                          </td>
                          <td className="px-2 sm:px-3 py-2 text-right bg-[#F0424599]">
                            {fmt(income)}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center text-gray-500 py-4"
                      >
                        Loading forecast data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </SectionPanel>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { REACT_APP_BASEURL } from "../../../config";

const NetProfitChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // ===== API CALL COMMENTED OUT =====
      /*
      try {
        const res = await axios.get(`${REACT_APP_BASEURL}/finance/getFinancial`);
        const allData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];

        if (allData.length === 0) {
          console.warn("Received empty data array");
        }

        // Only take required categories
        const categories = ["Nett Income", "Gross profit"];
        const filtered = allData.filter((item) =>
          categories.includes(item?.category)
        );

        // Merge data by month
        const mergedData = {};
        filtered.forEach((record) => {
          if (Array.isArray(record?.data)) {
            record.data.forEach((item) => {
              const month = item?.month?.slice(0, 3)?.toUpperCase() || "";
              if (!mergedData[month]) mergedData[month] = { month };
              mergedData[month][record.category] = parseFloat(item.actual) || 0;
            });
          }
        });

        const formatted = Object.values(mergedData);
        setChartData(formatted);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
      */

      // ===== STATIC DATA FOR UI =====
      try {
        const staticData = [
          {
            category: "Nett Income",
            data: [
              { month: "JANUARY", actual: 350000 },
              { month: "FEBRUARY", actual: 385000 },
              { month: "MARCH", actual: 365000 },
              { month: "APRIL", actual: 400000 },
              { month: "MAY", actual: 375000 },
              { month: "JUNE", actual: 395000 },
              { month: "JULY", actual: 370000 },
              { month: "AUGUST", actual: 390000 },
              { month: "SEPTEMBER", actual: 410000 },
              { month: "OCTOBER", actual: 425000 },
              { month: "NOVEMBER", actual: 440000 },
              { month: "DECEMBER", actual: 455000 },
            ],
          },
          {
            category: "Gross profit",
            data: [
              { month: "JANUARY", actual: 470000 },
              { month: "FEBRUARY", actual: 525000 },
              { month: "MARCH", actual: 495000 },
              { month: "APRIL", actual: 545000 },
              { month: "MAY", actual: 510000 },
              { month: "JUNE", actual: 530000 },
              { month: "JULY", actual: 502000 },
              { month: "AUGUST", actual: 515000 },
              { month: "SEPTEMBER", actual: 538000 },
              { month: "OCTOBER", actual: 552000 },
              { month: "NOVEMBER", actual: 565000 },
              { month: "DECEMBER", actual: 580000 },
            ],
          },
        ];

        // Process static data same as API data
        const categories = ["Nett Income", "Gross profit"];
        const filtered = staticData.filter((item) =>
          categories.includes(item?.category)
        );

        // Merge data by month
        const mergedData = {};
        filtered.forEach((record) => {
          if (Array.isArray(record?.data)) {
            record.data.forEach((item) => {
              const month = item?.month?.slice(0, 3)?.toUpperCase() || "";
              if (!mergedData[month]) mergedData[month] = { month };
              mergedData[month][record.category] = parseFloat(item.actual) || 0;
            });
          }
        });

        const formatted = Object.values(mergedData);
        setChartData(formatted);
      } catch (error) {
        console.error("Error processing static data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#181C3A] text-white rounded-xl p-4 text-center">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="bg-[#181C3A] text-white rounded-xl p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-sm font-semibold">PROFIT & CASH POSITION</h1>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2957B4]"></span>
            <span>Nett Income</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7F50]"></span>
            <span>Gross profit</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2E3457" />
          <XAxis
            dataKey="month"
            tick={{ fill: "#CBD5E1", fontSize: 12 }}
            axisLine={{ stroke: "#475569" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#CBD5E1", fontSize: 12 }}
            axisLine={{ stroke: "#475569" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} />

          {/* Nett Income */}
          <Line
            type="monotone"
            dataKey="Nett Income"
            stroke="#2957B4"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#2957B4" }}
          />

          {/* Gross Profit */}
          <Line
            type="monotone"
            dataKey="Gross profit"
            stroke="#FF7F50"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#FF7F50" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetProfitChart;
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

const formatEuro = (value) =>
  new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

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

        const categories = ["Nett Income", "Gross profit"];
        const filtered = allData.filter((item) =>
          categories.includes(item?.category)
        );

        const mergedData = {};
        filtered.forEach((record) => {
          if (Array.isArray(record?.data)) {
            record.data.forEach((item) => {
              const month = item?.month?.slice(0, 3)?.toUpperCase() || "";
              if (!mergedData[month]) mergedData[month] = { month };
              mergedData[month][record.category] = Number(item.actual) || 0;
            });
          }
        });

        setChartData(Object.values(mergedData));
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
      */

      // ===== STATIC DATA =====
      try {
        const staticData = [
          {
            category: "Nett Income",
            data: [
              { month: "JANUARY", actual: 3500 },
              { month: "FEBRUARY", actual: 3850 },
              { month: "MARCH", actual: 3650 },
              { month: "APRIL", actual: 4000 },
              { month: "MAY", actual: 3750 },
              { month: "JUNE", actual: 3950 },
              { month: "JULY", actual: 3700 },
              { month: "AUGUST", actual: 3900 },
              { month: "SEPTEMBER", actual: 4100 },
              { month: "OCTOBER", actual: 4250 },
              { month: "NOVEMBER", actual: 4400 },
              { month: "DECEMBER", actual: 4550 },
            ],
          },
          {
            category: "Gross profit",
            data: [
              { month: "JANUARY", actual: 4700 },
              { month: "FEBRUARY", actual: 5250 },
              { month: "MARCH", actual: 4950 },
              { month: "APRIL", actual: 5450 },
              { month: "MAY", actual: 5100 },
              { month: "JUNE", actual: 5300 },
              { month: "JULY", actual: 5020 },
              { month: "AUGUST", actual: 5150 },
              { month: "SEPTEMBER", actual: 5380 },
              { month: "OCTOBER", actual: 5520 },
              { month: "NOVEMBER", actual: 5650 },
              { month: "DECEMBER", actual: 5800 },
            ],
          },
        ];

        const categories = ["Nett Income", "Gross profit"];
        const filtered = staticData.filter((item) =>
          categories.includes(item.category)
        );

        const mergedData = {};

        filtered.forEach((record) => {
          record.data.forEach((item) => {
            const month = item.month.slice(0, 3).toUpperCase();
            if (!mergedData[month]) mergedData[month] = { month };
            mergedData[month][record.category] = item.actual;
          });
        });

        setChartData(Object.values(mergedData));
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#2957B4]" />
            <span>Nett Income</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7F50]" />
            <span>Gross profit</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
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
            tickFormatter={formatEuro}
          />

          <Tooltip
            formatter={(value) => formatEuro(value)}
            contentStyle={{
              backgroundColor: "#111827",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
            }}
          />

          <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "10px" }} />

          <Line
            type="monotone"
            dataKey="Nett Income"
            stroke="#2957B4"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />

          <Line
            type="monotone"
            dataKey="Gross profit"
            stroke="#FF7F50"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetProfitChart;

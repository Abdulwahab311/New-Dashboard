import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const useBusinessData = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    setData([
      {
        createdAt: "2026-01-01",
        buildings: 250000,
        market: 400000,
        rent: 12000,
      },
      {
        createdAt: "2026-02-01",
        buildings: 180000,
        market: 300000,
        rent: 9000,
      },
      {
        createdAt: "2026-03-01",
        buildings: 320000,
        market: 450000,
        rent: 15000,
      },
      {
        createdAt: "2026-04-01",
        buildings: 210000,
        market: 350000,
        rent: 11000,
      },
      {
        createdAt: "2026-05-01",
        buildings: 280000,
        market: 420000,
        rent: 14000,
      },
    ]);
  }, []);

  return { data };
};

const Portfolio = () => {
  const { data } = useBusinessData();

  const seriesData = React.useMemo(() => {
    return data.map((item) => ({
      month: new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
      }),
      buildings: item.buildings,
      market: item.market,
      rent: item.rent,
    }));
  }, [data]);

  return (
    <div className="h-[98%]">
      <div className="grid grid-cols-12 gap-3 h-full">

        {/* GRAPH */}
        <div className="col-span-9 bg-[#0D1235] rounded-lg p-3">
          <div className="flex justify-between mb-18">
            <h2 className="text-white text-sm">VALUE OWN PORTFOLIO</h2>
            <span className="text-gray-400 text-xs">% MONTH TREND</span>
          </div>

          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={seriesData}>

                <CartesianGrid stroke="#1E2949" strokeDasharray="3 3" opacity={0.3} />

                <XAxis dataKey="month" tick={{ fill: "#6B7280", fontSize: 10 }} />

                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 10 }}
                  tickFormatter={(v) => `${v / 10000}k`}
                  domain={[0, "dataMax + 5000"]}
                />

                <Tooltip
                  formatter={(v) => `€${v.toLocaleString()}`}
                  contentStyle={{
                    background: "#0A0F2C",
                    border: "none",
                    color: "#fff",
                    fontSize: 12,
                  }}
                />

                <Area dataKey="buildings" stroke="#8B5CF6" fillOpacity={0.2} />
                <Area dataKey="market" stroke="#3B82F6" fillOpacity={0.2} />
                <Area dataKey="rent" stroke="#10B981" fillOpacity={0.2} />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SIDE CARDS */}
        <div className="col-span-3 flex flex-col gap-3 h-full">
          <div className="bg-[#0D1235] rounded-lg p-3 text-center flex-1 flex flex-col justify-center">
            <div className="text-gray-400 text-xs uppercase">Market Value</div>
            <div className="text-white text-2xl font-bold mt-1">€404M</div>
            <div className="text-gray-500 text-xs mt-1">12 Houses</div>
          </div>

          <div className="bg-[#0D1235] rounded-lg p-3 text-center flex-1 flex flex-col justify-center">
            <div className="text-gray-400 text-xs uppercase">Rental Income</div>
            <div className="text-white text-2xl font-bold mt-1">€140K</div>
            <div className="text-gray-500 text-xs mt-1">Monthly</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Portfolio;

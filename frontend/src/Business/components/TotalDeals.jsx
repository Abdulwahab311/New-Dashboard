import React from "react";

const useBusinessData = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const staticData = [
      {
        companyDetails: { buyer: false, sector: "Healthcare", financer: false },
        financing: { amount: 250000 },
        rental: { rentalIncome: 80000 },
      },
      {
        companyDetails: { buyer: true, sector: "Industry", financer: true },
        financing: { amount: 150000 },
        rental: { rentalIncome: 60000 },
      },
    ];

    setData(staticData);
    setLoading(false);
  }, []);

  return { data, loading, error };
};

const Card = ({ label, value, big }) => (
  <div className="bg-[#090D28] rounded-xl p-4 overflow-hidden  transition-colors flex flex-col justify-center">
    <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-2 font-medium">
      {label}
    </div>
    <div
      className={`text-white font-bold leading-tight break-words ${
        big
          ? "text-[clamp(2rem,4vw,3.8rem)]"
          : "text-[clamp(1.2rem,2.2vw,2rem)]"
      }`}
    >
      {value}
    </div>
  </div>
);

const MoneyCard = ({ label, value }) => (
  <div className="bg-[#090D28] rounded-xl p-4 overflow-hidden  transition-colors flex flex-col justify-center">
    <div className="text-gray-400 text-[10px] uppercase tracking-wider mb-2 font-medium">
      {label}
    </div>
    <div className="text-white font-bold truncate text-[clamp(1rem,1.8vw,1.6rem)]">
      {value}
    </div>
  </div>
);

const TotalDeals = () => {
  const { loading, error } = useBusinessData();

  if (loading)
    return (
      <div className="bg-[#0B1023] p-6 rounded-2xl flex items-center justify-center min-h-[300px] text-gray-400 animate-pulse">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="bg-[#0B1023] p-6 rounded-2xl text-red-400">
        Error: {error}
      </div>
    );

  return (
    <div className=" rounded-2xl">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="xl:col-span-3 space-y-4">
          <div className="bg-[#090D28] rounded-xl p-6 overflow-hidden  transition-colors min-h-[207px] flex flex-col justify-between">
            <div>
              <div className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                TOTAL DEALS
              </div>
              <div className="text-gray-500 text-xs mt-1">
                GOAL: <span className="text-green-400 font-semibold">20</span>
              </div>
            </div>

            <div className="flex items-end gap-3 mt-4">
              <div className="text-white font-bold leading-tight text-[clamp(2.5rem,5vw,4rem)]">
                18
              </div>
              <div className="text-green-400 font-semibold text-sm">↑ 12%</div>
            </div>
          </div>

          <Card label="BELEGGING" value="9" />
        </div>

        {/* MIDDLE */}
        <div className="xl:col-span-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card label="ZORG DEALS" value="9" />
            <Card label="DEALS" value="12" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card label="INDUSTRIE DEALS" value="9" />
            <MoneyCard label="COSTS" value="€3.5 M" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Card label="ABC" value="9" />

            <MoneyCard label="FINANCING" value="€3.192.969" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-3 space-y-4">
          <MoneyCard label="REVENUE" value="€12.4 M" />
          <MoneyCard label="PROFIT" value="€3.5 M" />
          <MoneyCard label="HUUR" value="€3.345.346" />
        </div>
      </div>
    </div>
  );
};

export default TotalDeals;

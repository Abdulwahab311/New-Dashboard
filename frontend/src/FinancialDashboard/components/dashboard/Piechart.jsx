import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Marketing", value: 400 },
  { name: "Salaries", value: 300 },
  { name: "Operations", value: 1400 },
  { name: "Other", value: 700 },
];

const COLORS = ["#DB2777", "#22D3EE", "#1D4ED8", "#9333EA"];

const PieChartComponent = () => {
  return (
    <>
      <div className="px-3 py-1.5 flex items-center justify-between">
        <div className="text-[10px] tracking-wide text-white">COST RATIO</div>
      </div>
      <ResponsiveContainer width="100%" height="100%" className="h-[150px] sm:h-[180px]">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={45}
            fill="#8884d8"
            dataKey="value"
            labelLine={false}
            stroke="none"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PieChartComponent;
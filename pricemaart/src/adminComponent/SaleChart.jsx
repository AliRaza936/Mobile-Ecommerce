  import { useEffect, useState, useContext } from "react";
  import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
  import { MyContext } from "../App";

  const SalesChart = ({ salesData }) => {
    const context = useContext(MyContext);
    const currentYear = new Date().getFullYear();
    const [years, setYears] = useState([]);
    const [year, setYear] = useState(context.year || currentYear);

    // Generate available years dynamically
    useEffect(() => {
      const startYear = 2023; // Change this to the first year you want to show
      let generatedYears = [];
      
      for (let y = startYear; y <= currentYear; y++) {
        generatedYears.push(y);
      }
      
      setYears(generatedYears);
      context.setYear(generatedYears.at(-1));
      setYear(generatedYears.at(-1));
    }, []);

    // Handle year selection change
    const handleYearChange = (e) => {
      const selectedYear = e.target.value;
      setYear(selectedYear);
      context.setYear(selectedYear);
    };

    return (
      <div className="">
        {/* Header & Year Dropdown */}
        <div className="flex justify-between items-center xs:px-0 px-10 mb-4">
          <h2 className="text-lg font-semibold">Total Sales</h2>
          {years.length > 0 && (
            <select
              className="border p-2 outline-none rounded bg-gray-100 cursor-pointer"
              value={year}
              onChange={handleYearChange}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          ) }
        </div>

        {/* Sales Chart */}
        <div className="overflow-x-auto xs:overflow-x-scroll sm:overflow-x-scroll md:overflow-x-hidden">
  <div className="min-w-[600px]">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={salesData}>
        <XAxis dataKey="month" className="text-sm" />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => value.toLocaleString()} />
        <Tooltip formatter={(value) => value.toLocaleString()} cursor={false} />
        <Bar dataKey="totalSales" fill="#4A90E2" barSize={30} radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

      </div>
    );
  };

  export default SalesChart;

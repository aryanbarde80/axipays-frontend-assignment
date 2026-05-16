import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Area,
  ComposedChart
} from "recharts";
import { buildChartPalette, getStatusLabel } from "../../utils/chartMappers";
import { SectionCard } from "../common/SectionCard";
import { Skeleton } from "../common/Skeleton";

const palette = buildChartPalette();

// Custom tooltip for better visual feedback
const CustomTooltip = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg sm:px-4 sm:py-3">
        {type === "line" && (
          <>
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="text-base font-semibold text-slate-900 sm:text-lg">
              ${payload[0].value.toLocaleString()}
            </p>
          </>
        )}
        {type === "pie" && (
          <>
            <p className="text-sm font-medium text-slate-900">
              {payload[0].name}
            </p>
            <p className="text-base font-semibold text-slate-900 sm:text-lg">
              {payload[0].value.toLocaleString()}
            </p>
          </>
        )}
      </div>
    );
  }
  return null;
};

function ChartSkeleton({ title, description }) {
  return (
    <SectionCard className="min-h-[300px] transition-all duration-200 sm:min-h-[340px]">
      <div className="mb-4 sm:mb-6">
        <Skeleton className="mb-1 h-5 w-28 sm:mb-2 sm:w-32" />
        <Skeleton className="h-3 w-full max-w-[250px] sm:h-4 sm:max-w-[280px]" />
      </div>
      <div className="space-y-3 sm:space-y-4">
        <Skeleton className="h-48 w-full rounded-xl sm:h-56 sm:rounded-2xl" />
      </div>
    </SectionCard>
  );
}

export function DashboardCharts({
  statusBreakdown,
  volumeTimeline,
  currencyBreakdown,
  isLoading = false
}) {
  if (isLoading) {
    return (
      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr]">
        <ChartSkeleton
          title="Volume over time"
          description="Settlement activity by day across the fetched transaction set."
        />
        <ChartSkeleton
          title="Status distribution"
          description="Clear settlement health across success, pending, and failed payments."
        />
        <ChartSkeleton
          title="Currency mix"
          description="Amount concentration by currency across the current data set."
        />
      </div>
    );
  }

  // Calculate total for percentage display
  const totalAmount = currencyBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = statusBreakdown.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr]">
      {/* Volume Over Time - Line Chart with Area */}
      <SectionCard className="min-h-[300px] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-0 sm:min-h-[340px]">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Volume over time</p>
              <p className="text-xs text-slate-500 mt-0.5 sm:mt-1">
                Settlement activity by day across the fetched transaction set.
              </p>
            </div>
            <div className="hidden sm:block h-8 w-8 rounded-full bg-blue-50" />
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={volumeTimeline} margin={{ top: 10, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1784ff" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#1784ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              stroke="#94a3b8" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 10 }}
              dy={5}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="#94a3b8" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              dx={-5}
              width={40}
            />
            <Tooltip content={<CustomTooltip type="line" />} />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="#1784ff"
              strokeWidth={2}
              fill="url(#volumeGradient)"
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#1784ff"
              strokeWidth={2}
              dot={{ r: 3, fill: "#1784ff", strokeWidth: 1.5 }}
              activeDot={{ r: 5, fill: "#1784ff", stroke: "#fff", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Status Distribution - Donut Chart */}
      <SectionCard className="min-h-[300px] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-0 sm:min-h-[340px]">
        <div className="mb-4 sm:mb-6">
          <p className="text-sm font-semibold text-slate-900">Status distribution</p>
          <p className="text-xs text-slate-500 mt-0.5 sm:mt-1">
            Clear settlement health across success, pending, and failed payments.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={statusBreakdown}
              dataKey="count"
              nameKey="status"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              stroke="white"
              strokeWidth={2}
              className="focus:outline-none focus:ring-0"
            >
              {statusBreakdown.map((item, index) => (
                <Cell 
                  key={item.status} 
                  fill={palette[index % palette.length]}
                  className="cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus:ring-0"
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip type="pie" />}
              formatter={(value, name) => {
                const percentage = ((value / totalCount) * 100).toFixed(1);
                return [`${value.toLocaleString()} (${percentage}%)`, getStatusLabel(name)];
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={46}
              iconSize={8}
              formatter={(value) => {
                const item = statusBreakdown.find(i => i.status === value);
                const percentage = item ? ((item.count / totalCount) * 100).toFixed(1) : 0;
                return (
                  <span className="text-[11px] text-slate-600 sm:text-xs">
                    {getStatusLabel(value)} {percentage}%
                  </span>
                );
              }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Currency Mix - Donut Chart with Amount */}
      <SectionCard className="min-h-[300px] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-0 sm:min-h-[340px]">
        <div className="mb-4 sm:mb-6">
          <p className="text-sm font-semibold text-slate-900">Currency mix</p>
          <p className="text-xs text-slate-500 mt-0.5 sm:mt-1">
            Amount concentration by currency across the current data set.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={currencyBreakdown}
              dataKey="amount"
              nameKey="currency"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              stroke="white"
              strokeWidth={2}
              className="focus:outline-none focus:ring-0"
            >
              {currencyBreakdown.map((item, index) => (
                <Cell 
                  key={item.currency} 
                  fill={palette[index % palette.length]}
                  className="cursor-pointer transition-opacity hover:opacity-80 focus:outline-none focus:ring-0"
                />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip type="pie" />}
              formatter={(value, name) => {
                const percentage = ((value / totalAmount) * 100).toFixed(1);
                return [`${value.toLocaleString()} (${percentage}%)`, name];
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={46}
              iconSize={8}
              formatter={(value) => {
                const item = currencyBreakdown.find(i => i.currency === value);
                const percentage = item ? ((item.amount / totalAmount) * 100).toFixed(1) : 0;
                return (
                  <span className="text-[11px] text-slate-600 sm:text-xs">
                    {value} {percentage}%
                  </span>
                );
              }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}

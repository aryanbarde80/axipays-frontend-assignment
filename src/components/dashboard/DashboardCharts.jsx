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
  Legend
} from "recharts";
import { buildChartPalette, getStatusLabel } from "../../utils/chartMappers";
import { SectionCard } from "../common/SectionCard";
import { Skeleton } from "../common/Skeleton";

const palette = buildChartPalette();

// Custom tooltip for better visual feedback
const CustomTooltip = ({ active, payload, label, type }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-lg">
        {type === "line" && (
          <>
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="text-lg font-semibold text-slate-900">
              ${payload[0].value.toLocaleString()}
            </p>
          </>
        )}
        {type === "pie" && (
          <>
            <p className="text-sm font-medium text-slate-900">
              {payload[0].name}
            </p>
            <p className="text-lg font-semibold text-slate-900">
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
    <SectionCard className="min-h-[360px] transition-all duration-200 hover:shadow-md">
      <div className="mb-6">
        <Skeleton className="mb-2 h-5 w-32" />
        <Skeleton className="h-4 w-full max-w-[280px]" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-64 w-full rounded-[28px]" />
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
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr]">
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
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr]">
      {/* Volume Over Time - Line Chart */}
      <SectionCard className="min-h-[360px] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-0">
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-900">Volume over time</p>
          <p className="text-xs text-slate-500">
            Settlement activity by day across the fetched transaction set.
          </p>
        </div>
        <div className="-mx-2">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={volumeTimeline} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                stroke="#94a3b8" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 11 }}
                dy={5}
              />
              <YAxis 
                stroke="#94a3b8" 
                tickLine={false} 
                axisLine={false}
                tick={{ fontSize: 11 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                dx={-5}
              />
              <Tooltip content={<CustomTooltip type="line" />} />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#1784ff"
                strokeWidth={3}
                dot={{ r: 4, fill: "#1784ff", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "#1784ff", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* Status Distribution - Donut Chart */}
      <SectionCard className="min-h-[360px] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-0">
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-900">Status distribution</p>
          <p className="text-xs text-slate-500">
            Clear settlement health across success, pending, and failed payments.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={statusBreakdown}
              dataKey="count"
              nameKey="status"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
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
                return [`${value} (${percentage}%)`, getStatusLabel(name)];
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => {
                const item = statusBreakdown.find(i => i.status === value);
                const percentage = item ? ((item.count / totalCount) * 100).toFixed(1) : 0;
                return (
                  <span className="text-xs text-slate-600">
                    {getStatusLabel(value)} ({percentage}%)
                  </span>
                );
              }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>

      {/* Currency Mix - Donut Chart with Amount */}
      <SectionCard className="min-h-[360px] transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-0">
        <div className="mb-6">
          <p className="text-sm font-semibold text-slate-900">Currency mix</p>
          <p className="text-xs text-slate-500">
            Amount concentration by currency across the current data set.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={currencyBreakdown}
              dataKey="amount"
              nameKey="currency"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
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
                return [`$${value.toLocaleString()} (${percentage}%)`, name];
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => {
                const item = currencyBreakdown.find(i => i.currency === value);
                const percentage = item ? ((item.amount / totalAmount) * 100).toFixed(1) : 0;
                return (
                  <span className="text-xs text-slate-600">
                    {value} ({percentage}%)
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

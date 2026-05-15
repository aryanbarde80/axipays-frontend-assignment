import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { buildChartPalette, getStatusLabel } from "../../utils/chartMappers";
import { SectionCard } from "../common/SectionCard";
import { Skeleton } from "../common/Skeleton";

const palette = buildChartPalette();

function ChartSkeleton({ title, description }) {
  return (
    <SectionCard className="min-h-[360px]">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-900">{title}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-60 w-full rounded-[28px]" />
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
      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr_1fr]">
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

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr_1fr]">
      <SectionCard className="min-h-[360px]">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-900">Volume over time</p>
          <p className="text-sm text-slate-500">
            Settlement activity by day across the fetched transaction set.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={volumeTimeline}>
            <XAxis dataKey="day" stroke="#7c8798" tickLine={false} axisLine={false} />
            <YAxis stroke="#7c8798" tickLine={false} axisLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#1784ff"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard className="min-h-[360px]">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-900">Status distribution</p>
          <p className="text-sm text-slate-500">
            Clear settlement health across success, pending, and failed payments.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={statusBreakdown}
              dataKey="count"
              nameKey="status"
              innerRadius={68}
              outerRadius={104}
              paddingAngle={4}
            >
              {statusBreakdown.map((item, index) => (
                <Cell key={item.status} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [value, getStatusLabel(name)]} />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>

      <SectionCard className="min-h-[360px]">
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-900">Currency mix</p>
          <p className="text-sm text-slate-500">
            Amount concentration by currency across the current data set.
          </p>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={currencyBreakdown}
              dataKey="amount"
              nameKey="currency"
              innerRadius={68}
              outerRadius={104}
              paddingAngle={4}
            >
              {currencyBreakdown.map((item, index) => (
                <Cell key={item.currency} fill={palette[index % palette.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  );
}

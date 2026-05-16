import {
  Cell,
  Line,
  LineChart,
  CartesianGrid,
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

function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-[20px] border border-white/80 bg-white/95 p-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
      {label ? <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p> : null}
      <div className="mt-2 space-y-2">
        {payload.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-2 text-slate-500">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color || item.payload?.fill }}
              />
              {formatter ? formatter(item.name) : item.name}
            </span>
            <span className="font-semibold text-slate-950">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartLegend({ items, labelKey, valueKey, valuePrefix = "" }) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item[labelKey]}
          className="flex items-center justify-between rounded-[20px] border border-slate-100 bg-slate-50/90 px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: palette[index % palette.length] }}
            />
            <span className="text-sm font-medium text-slate-700">{item[labelKey]}</span>
          </div>
          <span className="text-sm font-semibold text-slate-950">
            {valuePrefix}
            {item[valueKey]}
          </span>
        </div>
      ))}
    </div>
  );
}

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
            <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 6" />
            <XAxis dataKey="day" stroke="#7c8798" tickLine={false} axisLine={false} />
            <YAxis stroke="#7c8798" tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#1784ff"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: "#ffffff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 rounded-[22px] border border-brand-100 bg-brand-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
            Reading tip
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Use this line to quickly spot whether volume is clustering into a few days or spreading evenly across the fetched transaction activity.
          </p>
        </div>
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
            <Tooltip
              content={
                <ChartTooltip
                  formatter={(name) => getStatusLabel(name)}
                />
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <ChartLegend
          items={statusBreakdown.map((item) => ({
            ...item,
            status: getStatusLabel(item.status)
          }))}
          labelKey="status"
          valueKey="count"
        />
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
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <ChartLegend items={currencyBreakdown} labelKey="currency" valueKey="amount" />
      </SectionCard>
    </div>
  );
}

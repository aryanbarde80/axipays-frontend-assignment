import { SectionCard } from "../common/SectionCard";
import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";

export function SummaryCard({ label, value, hint, trend, icon: CustomIcon }) {
  const valueLines = Array.isArray(value) ? value : [value];
  
  const getTrendInfo = () => {
    if (trend === "up") {
      return { icon: FiTrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" };
    }
    if (trend === "down") {
      return { icon: FiTrendingDown, color: "text-rose-600", bg: "bg-rose-50" };
    }
    return { icon: FiMinus, color: "text-slate-500", bg: "bg-slate-100" };
  };
  
  const TrendIcon = getTrendInfo().icon;
  const trendColor = getTrendInfo().color;
  const trendBg = getTrendInfo().bg;

  return (
    <SectionCard className="space-y-2 p-5 transition-all duration-200 hover:shadow-md sm:p-6">
      {/* Label and Icon Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        {CustomIcon && (
          <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
            <CustomIcon className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="space-y-1">
        {valueLines.map((line, idx) => (
          <h3
            key={idx}
            className={`font-semibold tracking-tight text-slate-900 ${
              valueLines.length > 1 
                ? "text-2xl sm:text-3xl" 
                : "text-3xl sm:text-4xl"
            }`}
          >
            {line}
          </h3>
        ))}
      </div>

      {/* Footer with Hint and Trend */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <p className="text-sm text-slate-400">{hint}</p>
        
        {trend && (
          <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 ${trendBg}`}>
            <TrendIcon className={`h-3 w-3 ${trendColor}`} />
            <span className={`text-xs font-medium ${trendColor}`}>
              {trend === "up" && "+"}{trend}
            </span>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

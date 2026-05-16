import { SectionCard } from "../common/SectionCard";
import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";

export function SummaryCard({ label, value, hint, trend, icon: CustomIcon }) {
  const valueLines = Array.isArray(value) ? value : [value];
  
  // Determine trend icon and color
  const getTrendInfo = () => {
    if (trend === "up") {
      return { icon: FiTrendingUp, color: "text-green-600", bg: "bg-green-50" };
    }
    if (trend === "down") {
      return { icon: FiTrendingDown, color: "text-red-600", bg: "bg-red-50" };
    }
    return { icon: FiMinus, color: "text-slate-400", bg: "bg-slate-50" };
  };
  
  const TrendIcon = getTrendInfo().icon;
  const trendColor = getTrendInfo().color;
  const trendBg = getTrendInfo().bg;

  return (
    <SectionCard className="group relative overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50" />
      
      <div className="relative space-y-3">
        {/* Header with label and optional icon */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {label}
          </p>
          {CustomIcon && (
            <div className="rounded-lg bg-slate-100 p-1.5 text-slate-500">
              <CustomIcon className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Value display */}
        <div className="space-y-1">
          {valueLines.map((line, idx) => (
            <h3
              key={idx}
              className={`font-bold tracking-tight text-slate-900 ${
                valueLines.length > 1 
                  ? "text-2xl leading-tight sm:text-3xl lg:text-4xl" 
                  : "text-3xl sm:text-4xl lg:text-5xl"
              }`}
            >
              {line}
            </h3>
          ))}
        </div>

        {/* Footer with hint and trend */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-400 sm:text-sm">
            {hint}
          </p>
          
          {trend && (
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${trendBg}`}>
              <TrendIcon className={`h-3 w-3 ${trendColor}`} />
              <span className={`text-xs font-medium ${trendColor}`}>
                {trend === "up" && "+"}
                {trend === "down" && "-"}
                {trend}%
              </span>
            </div>
          )}
        </div>
      </div>
    </SectionCard>
  );
}

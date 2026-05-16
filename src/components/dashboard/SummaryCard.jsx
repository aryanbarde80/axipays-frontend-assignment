import { SectionCard } from "../common/SectionCard";
import { FiTrendingUp, FiTrendingDown, FiMinus, FiMoreHorizontal } from "react-icons/fi";

export function SummaryCard({ 
  label, 
  value, 
  hint, 
  trend, 
  icon: CustomIcon,
  subtitle,
  comparisonValue,
  comparisonLabel = "vs last period"
}) {
  const valueLines = Array.isArray(value) ? value : [value];
  
  // Determine trend icon and color
  const getTrendInfo = () => {
    if (trend === "up") {
      return { 
        icon: FiTrendingUp, 
        color: "text-emerald-600", 
        bg: "bg-emerald-50",
        text: "Increased"
      };
    }
    if (trend === "down") {
      return { 
        icon: FiTrendingDown, 
        color: "text-rose-600", 
        bg: "bg-rose-50",
        text: "Decreased"
      };
    }
    return { 
      icon: FiMinus, 
      color: "text-slate-400", 
      bg: "bg-slate-50",
      text: "No change"
    };
  };
  
  const TrendIcon = getTrendInfo().icon;
  const trendColor = getTrendInfo().color;
  const trendBg = getTrendInfo().bg;
  const trendText = getTrendInfo().text;

  // Format number with proper separators
  const formatValue = (val) => {
    if (typeof val === 'number') {
      return val.toLocaleString('en-US');
    }
    return val;
  };

  return (
    <SectionCard className="group relative overflow-hidden border border-slate-200 bg-white p-0 transition-all duration-300 hover:shadow-lg">
      {/* Top accent line */}
      <div className={`h-1 w-full ${
        trend === "up" ? "bg-emerald-500" : 
        trend === "down" ? "bg-rose-500" : 
        "bg-slate-400"
      }`} />
      
      <div className="p-5 sm:p-6">
        {/* Header with label and icon */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {CustomIcon && (
              <div className="rounded-lg bg-slate-100 p-2 text-slate-500 transition-colors group-hover:bg-slate-200">
                <CustomIcon className="h-4 w-4" />
              </div>
            )}
            <p className="text-sm font-medium text-slate-500">
              {label}
            </p>
          </div>
          
          {/* Trend Badge */}
          {trend && (
            <div className={`flex items-center gap-1.5 rounded-full ${trendBg} px-2.5 py-1`}>
              <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
              <span className={`text-xs font-semibold ${trendColor}`}>
                {trend === "up" && "+"}
                {trend === "down" && "-"}
                {trend}%
              </span>
            </div>
          )}
        </div>

        {/* Main Value */}
        <div className="mb-3">
          {valueLines.map((line, idx) => (
            <div key={idx} className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {formatValue(line)}
              </h3>
              {idx === 0 && subtitle && (
                <span className="text-sm font-medium text-slate-400">{subtitle}</span>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="mb-3 flex items-center gap-2 text-sm">
          {comparisonValue && (
            <>
              <span className="font-medium text-slate-900">
                {formatValue(comparisonValue)}
              </span>
              <span className="text-slate-400">{comparisonLabel}</span>
            </>
          )}
        </div>

        {/* Hint / Description */}
        {hint && (
          <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-1.5" />
            <p className="text-xs text-slate-400 leading-relaxed sm:text-sm">
              {hint}
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

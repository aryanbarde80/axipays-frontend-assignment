import { SectionCard } from "../common/SectionCard";
import { FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";

export function SummaryCard({
  label,
  value,
  hint,
  trend,
  icon: CustomIcon,
  accent,
  footer
}) {
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
    <SectionCard className="flex h-full flex-col justify-between gap-4 transition-all duration-200 hover:shadow-md">
      <div className="space-y-3">
        <div className="flex flex-col items-start gap-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
          <p className="text-sm font-medium leading-6 text-slate-500">{label}</p>
          <div className="flex flex-wrap items-center gap-2">
            {accent ? (
              <span className="rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {accent}
              </span>
            ) : null}
            {CustomIcon ? (
              <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                <CustomIcon className="h-4 w-4" />
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          {valueLines.map((line, idx) => (
            <h3
              key={idx}
              className={`font-metric font-semibold tracking-tight text-slate-900 ${
                valueLines.length > 1
                  ? "break-words text-[2rem] leading-[1.02] sm:text-3xl lg:text-[2.8rem]"
                  : "break-words text-[2.4rem] leading-none sm:text-4xl"
              }`}
            >
              {line}
            </h3>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm leading-6 text-slate-400 sm:leading-7">{hint}</p>
        {trend ? (
          <div className={`flex w-fit items-center gap-1 rounded-full px-2 py-1 ${trendBg}`}>
            <TrendIcon className={`h-3 w-3 ${trendColor}`} />
            <span className={`text-xs font-medium ${trendColor}`}>
              {trend === "up" ? "+up" : trend}
            </span>
          </div>
        ) : null}
        {footer ? (
          <div className="rounded-[20px] border border-slate-100 bg-slate-50/90 px-4 py-3 text-sm leading-6 text-slate-600">
            {footer}
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}

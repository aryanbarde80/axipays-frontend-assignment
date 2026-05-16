import { SectionCard } from "../common/SectionCard";

export function SummaryCard({ label, value, hint }) {
  const valueLines = Array.isArray(value) ? value : [value];

  return (
    <SectionCard className="space-y-3">
      <p className="text-sm text-slate-500">{label}</p>
      <div className="space-y-2">
        {valueLines.map((line) => (
          <h3
            key={line}
            className={`font-semibold text-slate-950 ${
              valueLines.length > 1 ? "text-3xl leading-tight lg:text-[2.8rem]" : "text-4xl"
            }`}
          >
            {line}
          </h3>
        ))}
      </div>
      <p className="text-sm text-slate-400">{hint}</p>
    </SectionCard>
  );
}

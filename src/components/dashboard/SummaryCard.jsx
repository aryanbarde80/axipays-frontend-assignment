import { SectionCard } from "../common/SectionCard";

export function SummaryCard({ label, value, hint }) {
  return (
    <SectionCard className="space-y-4 overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <p className="max-w-[12rem] text-sm font-medium text-slate-500">{label}</p>
        <span className="h-12 w-12 rounded-2xl bg-slate-50 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.12)]" />
      </div>
      <h3 className="break-words text-3xl font-semibold text-slate-950 sm:text-4xl">{value}</h3>
      <p className="text-sm leading-6 text-slate-400">{hint}</p>
    </SectionCard>
  );
}

import { SectionCard } from "../common/SectionCard";

export function SummaryCard({ label, value, hint }) {
  return (
    <SectionCard className="space-y-3">
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="text-4xl font-semibold text-slate-950">{value}</h3>
      <p className="text-sm text-slate-400">{hint}</p>
    </SectionCard>
  );
}

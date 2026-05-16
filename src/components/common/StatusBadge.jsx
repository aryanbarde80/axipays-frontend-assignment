const toneClassMap = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-[0_8px_20px_rgba(16,185,129,0.12)] animate-status-pulse",
  pending:
    "border-amber-200 bg-amber-50 text-amber-700 shadow-[0_8px_20px_rgba(245,158,11,0.12)] animate-status-pulse-slow",
  failed:
    "border-rose-200 bg-rose-50 text-rose-700 shadow-[0_8px_20px_rgba(244,63,94,0.14)] animate-status-shake"
};

export function StatusBadge({ status }) {
  const normalizedStatus = status || "pending";
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold capitalize tracking-[0.18em] ${
        toneClassMap[normalizedStatus] || toneClassMap.pending
      }`}
    >
      {normalizedStatus}
    </span>
  );
}

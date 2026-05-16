export function SelectInput({ children, className = "", ...props }) {
  return (
    <select
      className={`h-12 rounded-2xl border border-slate-200/90 bg-white/95 px-4 text-sm text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.04)] outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

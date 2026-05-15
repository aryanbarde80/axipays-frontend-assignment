export function FormField({
  label,
  error,
  children,
  hint,
  htmlFor
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {hint ? <span className="text-xs text-slate-400">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </label>
  );
}

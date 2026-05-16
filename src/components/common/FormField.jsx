export function FormField({
  label,
  error,
  children,
  hint,
  htmlFor
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {hint ? <span className="text-xs leading-5 text-slate-400">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="text-sm leading-6 text-rose-600">{error}</p> : null}
    </label>
  );
}

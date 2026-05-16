export function FormField({
  label,
  error,
  children,
  hint,
  htmlFor
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        {hint ? (
          <span className="break-words text-xs text-slate-400 sm:text-right">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? <p className="text-sm text-rose-600">{error}</p> : null}
    </label>
  );
}

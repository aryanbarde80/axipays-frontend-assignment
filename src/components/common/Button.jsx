import { motion } from "framer-motion";

export function Button({
  children,
  className = "",
  isLoading = false,
  variant = "primary",
  ...props
}) {
  const variantClassName =
    variant === "secondary"
      ? "border border-slate-200 bg-white/90 text-ink shadow-[0_10px_30px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
      : "bg-ink text-white shadow-[0_18px_36px_rgba(15,23,42,0.18)] hover:-translate-y-0.5 hover:bg-slate-900";

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      className={`inline-flex min-h-12 items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 ${variantClassName} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </motion.button>
  );
}

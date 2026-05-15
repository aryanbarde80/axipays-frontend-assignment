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
      ? "bg-white text-ink border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
      : "bg-ink text-white hover:-translate-y-0.5 hover:bg-slate-900";

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-200 ${variantClassName} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Processing..." : children}
    </motion.button>
  );
}

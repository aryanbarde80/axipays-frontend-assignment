import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navigationLinks = [
  { to: "/", label: "Checkout" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/payment/result", label: "Payment Result" }
];

export function AppFrame({
  eyebrow,
  title,
  description,
  children,
  aside,
  contentStartsUnderHero = false
}) {
  const usesSplitBodyLayout = Boolean(aside) && contentStartsUnderHero;

  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <div className="absolute inset-0 -z-10 bg-hero-grid" />
      <header className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-sm sm:tracking-[0.28em]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
            AX
          </span>
          <span className="truncate">Axipays Console</span>
        </Link>

        <nav className="grid w-full grid-cols-1 gap-2 rounded-[28px] border border-white/70 bg-white/80 p-2 shadow-card backdrop-blur sm:grid-cols-3 lg:w-auto lg:grid-cols-none lg-auto-cols-max lg:grid-flow-col lg:rounded-full">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-center text-sm font-medium transition sm:px-4 ${
                  isActive
                    ? "bg-ink text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-10">
        {usesSplitBodyLayout ? (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8">
            <motion.section
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="space-y-4"
            >
              <span className="inline-flex max-w-full rounded-full bg-brand-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 sm:px-4 sm:text-xs sm:tracking-[0.28em]">
                {eyebrow}
              </span>
              <div className="space-y-3">
                <h1 className="max-w-3xl break-words text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  {description}
                </p>
              </div>
            </motion.section>

            <div className="lg:row-span-2">{aside}</div>

            <div className="lg:col-start-1">{children}</div>
          </div>
        ) : (
          <>
            <section className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-4"
              >
                <span className="inline-flex max-w-full rounded-full bg-brand-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-700 sm:px-4 sm:text-xs sm:tracking-[0.28em]">
                  {eyebrow}
                </span>
                <div className="space-y-3">
                  <h1 className="max-w-3xl break-words text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                    {description}
                  </p>
                </div>
              </motion.div>
            </section>

            {children}
          </>
        )}
      </main>
    </div>
  );
}

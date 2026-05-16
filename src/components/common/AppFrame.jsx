import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navigationLinks = [
  { to: "/", label: "Checkout" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/payment/result", label: "Payment Result" }
];

export function AppFrame({ eyebrow, title, description, children, aside }) {
  return (
    <div className="min-h-screen bg-slate-50 text-ink">
      <div className="absolute inset-0 -z-10 bg-hero-grid" />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link
          to="/"
          className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-500"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
            AX
          </span>
          Axipays Console
        </Link>

        <nav className="flex items-center gap-2 rounded-full border border-white/70 bg-white/80 p-2 shadow-card backdrop-blur">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
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

      <main className="mx-auto max-w-7xl px-6 pb-12 lg:px-10">
        <section className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-4"
          >
            <span className="inline-flex rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">
              {eyebrow}
            </span>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 lg:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                {description}
              </p>
            </div>
          </motion.div>

          {aside}
        </section>

        {children}
      </main>
    </div>
  );
}

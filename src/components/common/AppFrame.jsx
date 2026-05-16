import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiShield, FiSmartphone } from "react-icons/fi";

const navigationLinks = [
  { to: "/", label: "Checkout" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/payment/result", label: "Payment Result" }
];

export function AppFrame({ eyebrow, title, description, children, aside }) {
  return (
    <div className="min-h-screen text-ink">
      <div className="absolute inset-0 -z-10 bg-hero-grid" />
      <header className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/72 p-4 shadow-card backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <Link
            to="/"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-500"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow">
              AX
            </span>
            <span className="flex flex-col">
              <span>Axipays Console</span>
              <span className="mt-1 text-[10px] tracking-[0.24em] text-slate-400">
                payment experience lab
              </span>
            </span>
          </Link>

          <nav className="grid grid-cols-1 gap-2 rounded-[24px] border border-white/80 bg-white/88 p-2 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:flex sm:flex-wrap sm:items-center sm:justify-end">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-2.5 text-center text-sm font-medium transition ${
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
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-10">
        <section className="mb-8 grid gap-6 lg:mb-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="space-y-5 rounded-[30px] border border-white/70 bg-white/72 p-5 shadow-card backdrop-blur-md sm:p-6 lg:p-7"
          >
            <span className="inline-flex w-fit rounded-full bg-brand-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-700">
              {eyebrow}
            </span>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                {description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] border border-slate-100 bg-slate-50/90 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                    <FiShield />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Trust-first UI</p>
                    <p className="text-xs leading-5 text-slate-500">Clear visual safety cues</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] border border-slate-100 bg-slate-50/90 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                    <FiSmartphone />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Phone ready</p>
                    <p className="text-xs leading-5 text-slate-500">Responsive by default</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] border border-slate-100 bg-slate-50/90 p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                    <FiArrowUpRight />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Ops clarity</p>
                    <p className="text-xs leading-5 text-slate-500">Readable flows and trends</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {aside}
        </section>

        {children}
      </main>
    </div>
  );
}

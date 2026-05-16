import { AnimatePresence, motion } from "framer-motion";
import { FiAlertTriangle, FiCheckCircle, FiClock } from "react-icons/fi";
import { Button } from "./Button";

const accentMap = {
  success: {
    gradient: "from-emerald-500/18 via-white to-emerald-50/80",
    icon: FiCheckCircle,
    iconClassName: "bg-emerald-100 text-emerald-700"
  },
  pending: {
    gradient: "from-amber-500/18 via-white to-amber-50/80",
    icon: FiClock,
    iconClassName: "bg-amber-100 text-amber-700"
  },
  failed: {
    gradient: "from-rose-500/18 via-white to-rose-50/80",
    icon: FiAlertTriangle,
    iconClassName: "bg-rose-100 text-rose-700"
  }
};

export function StatusModal({ modal, onClose }) {
  const accent = accentMap[modal?.status] || accentMap.pending;
  const Icon = accent.icon;

  return (
    <AnimatePresence>
      {modal ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className={`w-full max-w-md rounded-[32px] border border-white/80 bg-gradient-to-br ${accent.gradient} p-6 shadow-card sm:p-7`}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] ${accent.iconClassName}`}
                >
                  <Icon className="text-xl" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Payment update
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                    {modal.title}
                  </h3>
                </div>
              </div>
              <div className="rounded-[24px] border border-white/80 bg-white/70 p-4">
                <p className="text-sm leading-7 text-slate-600">{modal.message}</p>
              </div>
              <div className="flex items-center justify-between rounded-[24px] border border-slate-100 bg-slate-50/80 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Current state
                </p>
                <p className="text-sm font-semibold capitalize text-slate-900">
                  {modal.status} update
                </p>
              </div>
              <Button type="button" className="w-full" onClick={onClose}>
                Continue
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import { Button } from "./Button";

const accentMap = {
  success: {
    accent: "bg-emerald-100 text-emerald-700",
    glow: "from-emerald-500/14 to-emerald-50/80",
    Icon: FiCheckCircle
  },
  pending: {
    accent: "bg-amber-100 text-amber-700",
    glow: "from-amber-500/14 to-amber-50/80",
    Icon: FiClock
  },
  failed: {
    accent: "bg-rose-100 text-rose-700",
    glow: "from-rose-500/14 to-rose-50/80",
    Icon: FiAlertCircle
  }
};

export function StatusModal({ modal, onClose }) {
  const theme = accentMap[modal?.status] || accentMap.pending;
  const Icon = theme.Icon;

  return (
    <AnimatePresence>
      {modal ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className={`w-full max-w-md rounded-[32px] border border-white/80 bg-gradient-to-br ${theme.glow} p-2 shadow-card`}
          >
            <div className="rounded-[28px] bg-white/96 p-5 sm:p-6">
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${theme.accent}`}
                  >
                    <Icon className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                      Payment update
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                      {modal.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm leading-7 text-slate-600">{modal.message}</p>
                <div className="rounded-[22px] border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    Current status
                  </p>
                  <p className="mt-2 text-sm font-medium capitalize text-slate-900">
                    {modal.status} state
                  </p>
                </div>
                <Button type="button" className="w-full" onClick={onClose}>
                  Continue
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

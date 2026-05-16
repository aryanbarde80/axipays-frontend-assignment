import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";

const accentMap = {
  success: "from-emerald-500/18 to-white",
  pending: "from-amber-500/18 to-white",
  failed: "from-rose-500/18 to-white"
};

export function StatusModal({ modal, onClose }) {
  return (
    <AnimatePresence>
      {modal ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className={`w-full max-w-md rounded-[32px] border border-white/70 bg-gradient-to-br ${accentMap[modal.status]} p-7 shadow-card`}
          >
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Payment update
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  {modal.title}
                </h3>
              </div>
              <p className="text-sm leading-7 text-slate-600">{modal.message}</p>
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

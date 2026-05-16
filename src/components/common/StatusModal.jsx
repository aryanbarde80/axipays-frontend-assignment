import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle, FiCheckCircle, FiClock, FiX } from "react-icons/fi";
import { Button } from "./Button";

const accentMap = {
  success: {
    accent: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-100 text-green-600",
    border: "border-green-100",
    Icon: FiCheckCircle
  },
  pending: {
    accent: "bg-orange-50 border-orange-200 text-orange-700",
    iconBg: "bg-orange-100 text-orange-600",
    border: "border-orange-100",
    Icon: FiClock
  },
  failed: {
    accent: "bg-red-50 border-red-200 text-red-700",
    iconBg: "bg-red-100 text-red-600",
    border: "border-red-100",
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ${theme.border} border`}
          >
            {/* Header with gradient bar */}
            <div className={`h-1.5 w-full ${
              modal?.status === "success" ? "bg-green-500" :
              modal?.status === "pending" ? "bg-orange-500" : "bg-red-500"
            }`} />

            <div className="p-6 sm:p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <FiX className="text-xl" />
              </button>

              <div className="text-center">
                {/* Icon */}
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${theme.iconBg}`}>
                  <Icon className="text-3xl" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-xl font-semibold text-slate-900">
                  {modal?.title || "Payment Update"}
                </h3>

                {/* Message */}
                <p className="mb-6 text-sm text-slate-600">
                  {modal?.message || "Your transaction has been processed."}
                </p>

                {/* Status Badge */}
                <div className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${theme.accent}`}>
                  <Icon className="text-sm" />
                  <span className="capitalize">{modal?.status || "pending"}</span>
                </div>

                {/* Action Button */}
                <Button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-slate-900 text-white hover:bg-slate-800"
                >
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

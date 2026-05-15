import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AppFrame } from "../../components/common/AppFrame";
import { Button } from "../../components/common/Button";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { usePaymentRedirect } from "../../hooks/usePaymentRedirect";
import { formatCurrency } from "../../utils/currencyFormat";

export function PaymentResultPage() {
  const location = useLocation();
  const paymentResult = usePaymentRedirect(location.search);

  return (
    <AppFrame
      eyebrow="Redirect lifecycle"
      title="Payment result handling that stays honest when the callback is incomplete."
      description="This screen reads redirect query parameters, embedded window messages, and the stored payment attempt to decide whether the payment is successful, failed, or still pending."
      aside={
        <SectionCard className="h-fit space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Latest attempt
          </p>
          <div className="space-y-2 text-sm text-slate-500">
            <p>Order ID: {paymentResult.orderId}</p>
            <p>Reference: {paymentResult.reference}</p>
            {paymentResult.paymentAttempt ? (
              <p>
                Amount:{" "}
                {formatCurrency(
                  paymentResult.paymentAttempt.amount,
                  paymentResult.paymentAttempt.currency
                )}
              </p>
            ) : null}
          </div>
        </SectionCard>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]"
      >
        <SectionCard className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Final status
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950">
                Redirect lifecycle update
              </h2>
            </div>
            <StatusBadge status={paymentResult.status} />
          </div>

          <p className="text-base leading-7 text-slate-600">{paymentResult.message}</p>

          <div className="grid gap-4 rounded-[28px] border border-slate-100 bg-slate-50 p-5 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-400">Order ID</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {paymentResult.orderId}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Reference</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {paymentResult.reference}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/dashboard">
              <Button type="button">Open dashboard</Button>
            </Link>
            <Link to="/">
              <Button type="button" variant="secondary">
                Start another payment
              </Button>
            </Link>
          </div>
        </SectionCard>

        <SectionCard className="h-fit space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Callback notes
          </p>
          <ul className="space-y-3 text-sm leading-7 text-slate-500">
            <li>Success and failure states are shown only when the redirect clearly signals them.</li>
            <li>Ambiguous callbacks degrade into a pending state instead of guessing the outcome.</li>
            <li>The dashboard remains the operational fallback for late-arriving settlement updates.</li>
          </ul>
        </SectionCard>
      </motion.div>
    </AppFrame>
  );
}

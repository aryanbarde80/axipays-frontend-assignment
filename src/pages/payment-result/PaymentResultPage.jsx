import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { AppFrame } from "../../components/common/AppFrame";
import { Button } from "../../components/common/Button";
import { SectionCard } from "../../components/common/SectionCard";
import { StatusBadge } from "../../components/common/StatusBadge";
import { StatusModal } from "../../components/common/StatusModal";
import { usePaymentRedirect } from "../../hooks/usePaymentRedirect";
import { formatCurrency } from "../../utils/currencyFormat";
import { useState } from "react";

export function PaymentResultPage() {
  const location = useLocation();
  const paymentResult = usePaymentRedirect(location.search);
  const [isResultModalVisible, setIsResultModalVisible] = useState(true);

  return (
    <AppFrame
      eyebrow="Redirect lifecycle"
      title="Payment result handling that stays honest when the callback is incomplete."
      description="This screen reads redirect query parameters, embedded window messages, and the stored payment attempt to decide whether the payment is successful, failed, or still pending."
      aside={
        <SectionCard className="h-fit space-y-4 lg:sticky lg:top-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Latest attempt
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              Payment snapshot
            </h2>
          </div>
          <div className="space-y-3 text-sm text-slate-500">
            <div className="rounded-[22px] border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Redirect state</p>
              <p className="mt-2 font-medium capitalize text-slate-900">
                {paymentResult.status} state
              </p>
            </div>
            <div className="rounded-[22px] border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Reference ready</p>
              <p className="mt-2 font-medium text-slate-900">
                {paymentResult.reference ? "Stored for reconciliation" : "Waiting for callback data"}
              </p>
            </div>
            {paymentResult.paymentAttempt ? (
              <div className="rounded-[22px] border border-brand-100 bg-brand-50/70 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-brand-700">Amount</p>
                <p className="mt-2 font-medium text-slate-900">
                  {formatCurrency(
                    paymentResult.paymentAttempt.amount,
                    paymentResult.paymentAttempt.currency
                  )}
                </p>
              </div>
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

          <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
            <p className="text-base leading-7 text-slate-600">{paymentResult.message}</p>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-slate-100 bg-slate-50 p-5 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-400">Order ID</p>
              <p className="mt-2 break-all text-lg font-semibold text-slate-950">
                {paymentResult.orderId}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Reference</p>
              <p className="mt-2 break-all text-lg font-semibold text-slate-950">
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
            <li className="rounded-[22px] border border-slate-100 bg-slate-50 p-4">
              Success and failure states are shown only when the redirect clearly signals them.
            </li>
            <li className="rounded-[22px] border border-amber-100 bg-amber-50/70 p-4 text-amber-800">
              Ambiguous callbacks degrade into a pending state instead of guessing the outcome.
            </li>
            <li className="rounded-[22px] border border-brand-100 bg-brand-50/70 p-4">
              The dashboard remains the operational fallback for late-arriving settlement updates.
            </li>
          </ul>
        </SectionCard>
      </motion.div>

      <StatusModal
        modal={isResultModalVisible ? paymentResult.modalContent : null}
        onClose={() => setIsResultModalVisible(false)}
      />
    </AppFrame>
  );
}

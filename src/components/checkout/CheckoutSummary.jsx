import { FiActivity, FiCreditCard, FiLock, FiShield, FiTrendingUp } from "react-icons/fi";
import { SectionCard } from "../common/SectionCard";
import { formatCurrency } from "../../utils/currencyFormat";

const trustPoints = [
  {
    icon: FiShield,
    title: "Signed request headers",
    description: "Each payment request includes Axipays HMAC verification."
  },
  {
    icon: FiLock,
    title: "Masked payment details",
    description: "Sensitive card data stays hidden outside direct input stages."
  },
  {
    icon: FiTrendingUp,
    title: "Real-time payment visibility",
    description: "Track every settlement outcome from the dashboard."
  }
];

export function CheckoutSummary({ preview }) {
  return (
    <SectionCard className="h-fit space-y-6 lg:sticky lg:top-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            Payment summary
          </p>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            secure session
          </span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Secure payable amount</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
              {formatCurrency(preview.amount, preview.currency)}
            </h2>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
            {preview.paymentMode === "browser" ? "Live redirect" : "Embedded preview"}
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">
          <FiCreditCard className="text-lg text-brand-600" />
          <p className="mt-3 text-sm font-semibold text-slate-900">Payment rail</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {preview.paymentMode === "browser" ? "Redirect-based flow" : "Iframe preview flow"}
          </p>
        </div>
        <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">
          <FiActivity className="text-lg text-emerald-600" />
          <p className="mt-3 text-sm font-semibold text-slate-900">Status handling</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Redirect, callback, and dashboard states stay aligned.
          </p>
        </div>
        <div className="rounded-[24px] border border-slate-100 bg-slate-50 p-4">
          <FiLock className="text-lg text-amber-600" />
          <p className="mt-3 text-sm font-semibold text-slate-900">Safe display</p>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Sensitive inputs stay masked outside active entry.
          </p>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-100 bg-slate-950 p-6 text-white">
        <p className="text-sm text-white/70">Billing contact</p>
        <p className="mt-2 text-lg font-semibold break-all">
          {preview.email || "name@example.com"}
        </p>
        <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">Gateway mode</p>
            <p className="mt-2 font-medium text-white">
              {preview.paymentMode === "browser" ? "Redirect" : "Iframe"}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">Settlement currency</p>
            <p className="mt-2 font-medium text-white">{preview.currency}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Payment summary
        </p>
        {trustPoints.map((point) => {
          const Icon = point.icon;
          return (
            <div
              key={point.title}
              className="flex items-start gap-4 rounded-[24px] border border-slate-100 bg-slate-50/90 p-4"
            >
              <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon />
              </div>
              <div>
                <p className="font-medium text-slate-900">{point.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

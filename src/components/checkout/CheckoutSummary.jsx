import { FiLock, FiShield, FiTrendingUp, FiMail, FiGlobe } from "react-icons/fi";
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
    <SectionCard className="h-fit space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Payment summary
          </p>
          <div className="flex items-center gap-1.5">
            <FiLock className="h-3 w-3 text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Secure</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-slate-500">Secure payable amount</p>
            <h2 className="mt-2 break-words text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {formatCurrency(preview.amount, preview.currency)}
            </h2>
          </div>
          <span className="w-fit rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
            Live redirect
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <FiMail className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-medium text-slate-700">Billing contact</p>
          </div>
        </div>
        <div className="px-4 py-4">
          <p className="break-all text-sm font-medium text-slate-900">
            {preview.email || "customer@example.com"}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <FiGlobe className="h-4 w-4 text-slate-400" />
              <span className="text-slate-500">Gateway mode</span>
            </div>
            <span className="font-medium text-slate-900">Redirect</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {trustPoints.map((point) => {
          const Icon = point.icon;

          return (
            <div
              key={point.title}
              className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white p-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-500">
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900">{point.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{point.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-[24px] border border-slate-100 bg-slate-50/90 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Quick note
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          After submit, the browser follows the gateway redirect and returns to the
          result page through the callback URL configured for the payment attempt.
        </p>
      </div>
    </SectionCard>
  );
}

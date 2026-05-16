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
      {/* Header */}
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

        {/* Amount Section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-slate-500">Secure payable amount</p>
            <h2 className="mt-2 break-words text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {formatCurrency(preview.amount, preview.currency)}
            </h2>
          </div>
          <span className="w-fit rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
            {preview.paymentMode === "browser" ? "Redirect" : "Embedded"}
          </span>
        </div>
      </div>

      {/* Billing Card */}
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
            <span className="font-medium text-slate-900">
              {preview.paymentMode === "browser" ? "Redirect" : "Iframe"}
            </span>
          </div>
        </div>
      </div>

      {/* Trust Points */}
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
                <p className="mt-0.5 text-xs text-slate-500">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="rounded-lg bg-slate-50 px-4 py-2.5 text-center">
        <p className="text-xs text-slate-500">
          All transactions are encrypted and securely processed
        </p>
      </div>
    </SectionCard>
  );
}

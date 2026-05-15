import { FiLock, FiShield, FiTrendingUp } from "react-icons/fi";
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
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Payment summary
        </p>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Secure payable amount</p>
            <h2 className="mt-2 text-4xl font-semibold text-slate-950">
              {formatCurrency(preview.amount, preview.currency)}
            </h2>
          </div>
          <span className="rounded-full bg-brand-50 px-3 py-2 text-xs font-semibold text-brand-700">
            {preview.paymentMode === "browser" ? "Live redirect" : "Embedded preview"}
          </span>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-100 bg-slate-950 p-6 text-white">
        <p className="text-sm text-white/70">Billing contact</p>
        <p className="mt-2 text-lg font-semibold">
          {preview.email || "name@example.com"}
        </p>
        <div className="mt-6 h-px bg-white/10" />
        <div className="mt-6 flex items-center justify-between text-sm text-white/70">
          <span>Gateway mode</span>
          <span className="font-medium text-white">
            {preview.paymentMode === "browser" ? "Redirect" : "Iframe"}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {trustPoints.map((point) => {
          const Icon = point.icon;
          return (
            <div key={point.title} className="flex items-start gap-4">
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

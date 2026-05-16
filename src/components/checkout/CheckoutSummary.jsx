import { FiLock, FiShield, FiTrendingUp, FiCreditCard, FiMail, FiGlobe } from "react-icons/fi";
import { SectionCard } from "../common/SectionCard";
import { formatCurrency } from "../../utils/currencyFormat";

const trustPoints = [
  {
    icon: FiShield,
    title: "Signed request headers",
    description: "Each payment request includes Axipays HMAC verification.",
    color: "blue"
  },
  {
    icon: FiLock,
    title: "Masked payment details",
    description: "Sensitive card data stays hidden outside direct input stages.",
    color: "green"
  },
  {
    icon: FiTrendingUp,
    title: "Real-time payment visibility",
    description: "Track every settlement outcome from the dashboard.",
    color: "purple"
  }
];

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600"
};

export function CheckoutSummary({ preview }) {
  return (
    <SectionCard className="h-fit space-y-6 overflow-hidden">
      {/* Header with gradient accent */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500" />
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Payment summary
            </p>
            <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
              <FiLock className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium text-green-600">Secure</span>
            </div>
          </div>

          {/* Amount Section */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-slate-500">Secure payable amount</p>
              <h2 className="mt-2 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {formatCurrency(preview.amount, preview.currency)}
              </h2>
            </div>
            <span className="w-fit rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700">
              {preview.paymentMode === "browser" ? "🔄 Live redirect" : "📦 Embedded preview"}
            </span>
          </div>
        </div>
      </div>

      {/* Billing Card - Clean white version */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/50 px-5 py-3">
          <div className="flex items-center gap-2">
            <FiMail className="h-4 w-4 text-slate-400" />
            <p className="text-sm font-medium text-slate-700">Billing contact</p>
          </div>
        </div>
        <div className="px-5 py-4">
          <p className="break-all text-base font-semibold text-slate-900">
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

      {/* Trust Points - Modern Cards */}
      <div className="space-y-3">
        {trustPoints.map((point) => {
          const Icon = point.icon;
          const colorClass = colorMap[point.color];
          
          return (
            <div 
              key={point.title} 
              className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-white p-4 transition-all duration-200 hover:shadow-md hover:border-slate-200"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${colorClass} transition-all duration-200 group-hover:scale-105`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">{point.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="rounded-xl bg-slate-50 px-4 py-3 text-center">
        <p className="text-xs text-slate-500">
          🔒 All transactions are encrypted and securely processed
        </p>
      </div>
    </SectionCard>
  );
}

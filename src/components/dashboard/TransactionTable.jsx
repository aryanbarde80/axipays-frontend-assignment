import { Button } from "../common/Button";
import { SectionCard } from "../common/SectionCard";
import { Skeleton } from "../common/Skeleton";
import { StatusBadge } from "../common/StatusBadge";
import { formatCurrency } from "../../utils/currencyFormat";

const tableColumns = [
  { key: "orderId", label: "Order ID", headerClassName: "", cellClassName: "" },
  {
    key: "maskedCardNumber",
    label: "Card Number",
    headerClassName: "",
    cellClassName: ""
  },
  {
    key: "email",
    label: "Contact",
    headerClassName: "hidden lg:table-cell",
    cellClassName: "hidden lg:table-cell"
  },
  {
    key: "expiry",
    label: "Expiry",
    headerClassName: "hidden md:table-cell",
    cellClassName: "hidden md:table-cell"
  },
  {
    key: "maskedCvv",
    label: "Card CVC",
    headerClassName: "hidden xl:table-cell",
    cellClassName: "hidden xl:table-cell"
  },
  {
    key: "amount",
    label: "Amount",
    headerClassName: "",
    cellClassName: ""
  },
  {
    key: "currency",
    label: "Currency",
    headerClassName: "hidden md:table-cell",
    cellClassName: "hidden md:table-cell"
  },
  {
    key: "status",
    label: "Status",
    headerClassName: "",
    cellClassName: ""
  }
];

function TableSkeletonRow({ rowIndex }) {
  return (
    <tr className="text-sm text-slate-600">
      <td className="px-4 py-3 sm:px-6 sm:py-5">
        <Skeleton className="h-4 w-20 sm:w-24" />
      </td>
      <td className="px-4 py-3 sm:px-6 sm:py-5">
        <Skeleton className="h-4 w-28 sm:w-32" />
      </td>
      <td className="hidden px-4 py-3 sm:px-6 sm:py-5 lg:table-cell">
        <Skeleton className="h-4 w-32 sm:w-40" />
      </td>
      <td className="hidden px-4 py-3 sm:px-6 sm:py-5 md:table-cell">
        <Skeleton className="h-4 w-16 sm:w-20" />
      </td>
      <td className="hidden px-4 py-3 sm:px-6 sm:py-5 xl:table-cell">
        <Skeleton className="h-4 w-10 sm:w-12" />
      </td>
      <td className="px-4 py-3 sm:px-6 sm:py-5">
        <Skeleton className="h-4 w-20 sm:w-24" />
      </td>
      <td className="hidden px-4 py-3 sm:px-6 sm:py-5 md:table-cell">
        <Skeleton className="h-4 w-10 sm:w-12" />
      </td>
      <td className="px-4 py-3 sm:px-6 sm:py-5">
        <Skeleton className="h-6 w-16 rounded-full sm:h-7 sm:w-20" />
      </td>
    </tr>
  );
}

function MobileTransactionCard({ transaction }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
      {/* Header with Order ID and Status */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Order ID
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900 break-all">
            {transaction.orderId}
          </p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>

      {/* Card Number */}
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Card Number
        </p>
        <p className="mt-1 text-sm text-slate-700">
          {transaction.maskedCardNumber}
        </p>
      </div>

      {/* Contact Info */}
      <div className="mt-3">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Contact
        </p>
        <p className="mt-1 text-sm font-medium text-slate-900 break-all">
          {transaction.email}
        </p>
        {transaction.contactHint && (
          <p className="mt-0.5 text-xs text-slate-400">
            {transaction.contactHint}
          </p>
        )}
      </div>

      {/* Row 1: Expiry + Currency */}
      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Expiry
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {transaction.expiryMonth}/{transaction.expiryYear}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Currency
          </p>
          <p className="mt-1 text-sm text-slate-700">
            {transaction.currency}
          </p>
        </div>
      </div>

      {/* Amount - Highlighted */}
      <div className="mt-3 rounded-lg bg-slate-900 px-3 py-2">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Amount
        </p>
        <p className="text-lg font-bold text-white">
          {formatCurrency(transaction.amount, transaction.currency)}
        </p>
      </div>
    </div>
  );
}

export function TransactionTable({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}) {
  return (
    <SectionCard className="overflow-hidden p-0">
      {/* Header */}
      <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
              Transaction history
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Sanitized payment rows with settlement status visibility.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              size="sm"
            >
              Previous
            </Button>
            <span className="text-sm text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="block md:hidden">
        <div className="divide-y divide-slate-100">
          {isLoading ? (
            Array.from({ length: 4 }, (_, index) => (
              <div key={`mobile-skeleton-${index + 1}`} className="p-4">
                <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-4 h-4 w-full" />
                  <Skeleton className="mt-3 h-4 w-3/4" />
                  <Skeleton className="mt-4 h-10 w-full rounded-lg" />
                </div>
              </div>
            ))
          ) : (
            transactions.map((transaction) => (
              <MobileTransactionCard key={transaction.id} transaction={transaction} />
            ))
          )}
        </div>
      </div>

      {/* Desktop View - Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-[0.22em] text-slate-400">
              {tableColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 font-medium ${column.headerClassName}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading
              ? Array.from({ length: 5 }, (_, index) => (
                  <TableSkeletonRow key={`skeleton-row-${index + 1}`} rowIndex={index} />
                ))
              : transactions.map((transaction) => (
                  <tr key={transaction.id} className="text-sm text-slate-600">
                    <td className="whitespace-nowrap px-6 py-5 font-medium text-slate-900">
                      {transaction.orderId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-5">
                      {transaction.maskedCardNumber}
                    </td>
                    <td className="hidden px-6 py-5 lg:table-cell">
                      <div className="min-w-0">
                        <p className="break-all text-slate-900">{transaction.email}</p>
                        {transaction.contactHint && (
                          <p className="mt-1 text-xs text-slate-400">{transaction.contactHint}</p>
                        )}
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-5 md:table-cell">
                      {transaction.expiryMonth} / {transaction.expiryYear}
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-5 xl:table-cell">
                      {transaction.maskedCvv}
                    </td>
                    <td className="whitespace-nowrap px-6 py-5 font-medium">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-5 md:table-cell">
                      {transaction.currency}
                    </td>
                    <td className="whitespace-nowrap px-6 py-5">
                      <StatusBadge status={transaction.status} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

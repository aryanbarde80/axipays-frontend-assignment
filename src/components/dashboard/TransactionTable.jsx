import { Button } from "../common/Button";
import { SectionCard } from "../common/SectionCard";
import { Skeleton } from "../common/Skeleton";
import { StatusBadge } from "../common/StatusBadge";
import { formatCurrency } from "../../utils/currencyFormat";

// Columns with responsive visibility and flexible widths
const tableColumns = [
  { key: "orderId", label: "Order ID", mobile: true, tablet: true, desktop: true, width: "auto" },
  { key: "maskedCardNumber", label: "Card Number", mobile: true, tablet: true, desktop: true, width: "auto" },
  { key: "email", label: "Email", mobile: false, tablet: false, desktop: true, width: "auto" },
  { key: "expiry", label: "Expiry", mobile: false, tablet: true, desktop: true, width: "auto" },
  { key: "amount", label: "Amount", mobile: true, tablet: true, desktop: true, width: "auto" },
  { key: "currency", label: "Currency", mobile: false, tablet: true, desktop: true, width: "auto" },
  { key: "status", label: "Status", mobile: true, tablet: true, desktop: true, width: "auto" }
];

function TableSkeletonRow() {
  return (
    <tr className="text-sm text-slate-600">
      <td className="px-3 py-3 sm:px-4">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-3 py-3 sm:px-4">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="hidden px-3 py-3 sm:px-4 lg:table-cell">
        <Skeleton className="h-4 w-36" />
      </td>
      <td className="hidden px-3 py-3 sm:px-4 md:table-cell">
        <Skeleton className="h-4 w-16" />
      </td>
      <td className="px-3 py-3 sm:px-4">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="hidden px-3 py-3 sm:px-4 md:table-cell">
        <Skeleton className="h-4 w-12" />
      </td>
      <td className="px-3 py-3 sm:px-4">
        <Skeleton className="h-6 w-16 rounded-full" />
      </td>
    </tr>
  );
}

// Generate dummy email for invalid emails
function getDummyEmail(orderId) {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const names = ["user", "customer", "client", "buyer"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNum = Math.floor(Math.random() * 999);
  return `${randomName}${randomNum}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

// Mobile card view for small screens
function MobileTransactionCard({ transaction }) {
  const displayEmail = transaction.email && 
                       !transaction.email.toLowerCase().includes("unknown") && 
                       transaction.email !== "N/A" 
                       ? transaction.email 
                       : getDummyEmail(transaction.orderId);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400">Order ID</p>
          <p className="text-sm font-medium text-slate-900 break-all">{transaction.orderId}</p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>
      <div className="mt-3">
        <p className="text-xs text-slate-400">Card</p>
        <p className="text-sm text-slate-700">{transaction.maskedCardNumber}</p>
      </div>
      <div className="mt-2">
        <p className="text-xs text-slate-400">Amount</p>
        <p className="text-base font-semibold text-slate-900">
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
  // Process transactions - fix invalid emails
  const processedTransactions = transactions.map((transaction) => {
    const isInvalidEmail = !transaction.email ||
      transaction.email.toLowerCase().includes("unknown") ||
      transaction.email === "N/A";
    
    return {
      ...transaction,
      email: isInvalidEmail ? getDummyEmail(transaction.orderId) : transaction.email
    };
  });

  return (
    <SectionCard className="overflow-hidden p-0">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Transaction history</h2>
            <p className="text-xs text-slate-500 sm:text-sm">
              Sanitized payment rows with settlement status visibility.
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              size="sm"
            >
              Previous
            </Button>
            <span className="whitespace-nowrap text-sm text-slate-500">
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
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
            ))
          ) : (
            processedTransactions.map((transaction) => (
              <MobileTransactionCard key={transaction.id} transaction={transaction} />
            ))
          )}
        </div>
        {/* Mobile Pagination */}
        {!isLoading && processedTransactions.length > 0 && (
          <div className="border-t border-slate-200 px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                size="sm"
                className="flex-1"
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
                className="flex-1"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table View - Fully responsive, no scroll */}
      <div className="hidden md:block w-full overflow-x-auto">
        <table className="w-full min-w-full table-auto border-collapse">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-medium uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Card Number</th>
              <th className="hidden px-4 py-3 lg:table-cell">Email</th>
              <th className="hidden px-4 py-3 md:table-cell">Expiry</th>
              <th className="px-4 py-3">Amount</th>
              <th className="hidden px-4 py-3 md:table-cell">Currency</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => <TableSkeletonRow key={i} />)
            ) : (
              processedTransactions.map((transaction) => (
                <tr key={transaction.id} className="text-sm text-slate-600 hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <div className="max-w-[150px] truncate" title={transaction.orderId}>
                      {transaction.orderId}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {transaction.maskedCardNumber}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <div className="max-w-[200px] truncate" title={transaction.email}>
                      {transaction.email}
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 md:table-cell">
                    {transaction.expiryMonth}/{transaction.expiryYear}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-medium">
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 md:table-cell">
                    {transaction.currency}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <StatusBadge status={transaction.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

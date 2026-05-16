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
    label: "Email",
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
      <td className="px-6 py-5">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="px-6 py-5">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="hidden px-6 py-5 lg:table-cell">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="hidden px-6 py-5 md:table-cell">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="hidden px-6 py-5 xl:table-cell">
        <Skeleton className="h-4 w-12" />
      </td>
      <td className="px-6 py-5">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="hidden px-6 py-5 md:table-cell">
        <Skeleton className="h-4 w-12" />
      </td>
      <td className="px-6 py-5">
        <Skeleton className={`h-7 w-20 rounded-full ${rowIndex % 2 === 0 ? "" : "opacity-80"}`} />
      </td>
    </tr>
  );
}

// Dummy emails generate karne ka function
function getDummyEmail(orderId) {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "protonmail.com"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const names = ["john.doe", "jane.smith", "customer", "user", "client", "buyer", "shopper"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNum = Math.floor(Math.random() * 999);
  return `${randomName}${randomNum}@${randomDomain}`;
}

function MobileTransactionCard({ transaction }) {
  // Agar email unknown/N/A/null hai toh dummy email generate karo
  const displayEmail = transaction.email && 
                       !transaction.email.toLowerCase().includes("unknown") && 
                       transaction.email !== "N/A" 
                       ? transaction.email 
                       : getDummyEmail(transaction.orderId);

  return (
    <div className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Order ID</p>
          <p className="mt-2 break-all text-sm font-semibold text-slate-950">
            {transaction.orderId}
          </p>
        </div>
        <StatusBadge status={transaction.status} />
      </div>

      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Card</p>
          <p className="mt-1 break-all">{transaction.maskedCardNumber}</p>
        </div>
        
        {/* Email hamesha dikhega (original ya dummy) */}
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Email</p>
          <p className="mt-1 break-all">{displayEmail}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Expiry</p>
            <p className="mt-1">
              {transaction.expiryMonth} / {transaction.expiryYear}
            </p>
          </div>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Amount</p>
            <p className="mt-1 break-words font-semibold text-slate-900">
              {formatCurrency(transaction.amount, transaction.currency)}
            </p>
          </div>
        </div>
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
  // Har transaction ke liye email set karo (original ya dummy)
  const processedTransactions = transactions.map(transaction => {
    const isValidEmail = transaction.email && 
                         !transaction.email.toLowerCase().includes("unknown") && 
                         transaction.email !== "N/A";
    
    return {
      ...transaction,
      displayEmail: isValidEmail ? transaction.email : getDummyEmail(transaction.orderId)
    };
  });

  return (
    <SectionCard className="overflow-hidden p-0">
      {/* Header - 320px pe bhi responsive */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-5 xs:px-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-lg font-semibold text-slate-950 break-words">Transaction history</h2>
          <p className="text-xs sm:text-sm text-slate-500 break-words">
            Sanitized payment rows with settlement status visibility.
          </p>
        </div>
        <div className="flex flex-col gap-3 xs:flex-row sm:flex-wrap sm:items-center justify-center md:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="w-full xs:w-auto min-w-[100px]"
          >
            Previous
          </Button>
          <span className="text-center text-sm text-slate-500 whitespace-nowrap">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-full xs:w-auto min-w-[100px]"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Mobile View - 320px optimized */}
      <div className="space-y-4 p-4 xs:p-5 sm:p-6 md:hidden">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <div
                key={`mobile-skeleton-${index + 1}`}
                className="rounded-[20px] border border-slate-100 bg-slate-50/80 p-4"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-4 h-4 w-full" />
                <Skeleton className="mt-3 h-4 w-3/4" />
                <Skeleton className="mt-4 h-10 w-24 rounded-full" />
              </div>
            ))
          : processedTransactions.map((transaction) => (
              <MobileTransactionCard key={transaction.id} transaction={transaction} />
            ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[760px] w-full divide-y divide-slate-100">
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
              : processedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="text-sm text-slate-600">
                    <td className="whitespace-nowrap px-6 py-5 font-medium text-slate-950">
                      {transaction.orderId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-5">
                      {transaction.maskedCardNumber}
                    </td>
                    <td className="hidden px-6 py-5 lg:table-cell">
                      {transaction.displayEmail}
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-5 md:table-cell">
                      {transaction.expiryMonth} / {transaction.expiryYear}
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-5 xl:table-cell">
                      {transaction.maskedCvv}
                    </td>
                    <td className="whitespace-nowrap px-6 py-5">
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

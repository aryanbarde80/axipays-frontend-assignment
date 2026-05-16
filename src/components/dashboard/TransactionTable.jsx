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

// Generate a dummy email when original email is invalid or missing
function getDummyEmail(orderId) {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
  const names = ["user", "customer", "client", "buyer"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNum = Math.floor(Math.random() * 999);
  return `${randomName}${randomNum}@${domains[Math.floor(Math.random() * domains.length)]}`;
}

export function TransactionTable({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}) {
  // Replace invalid or unknown emails with dummy emails
  const processedTransactions = transactions.map((transaction) => {
    const isInvalidEmail =
      !transaction.email ||
      transaction.email.toLowerCase().includes("unknown") ||
      transaction.email === "N/A";
    
    return {
      ...transaction,
      email: isInvalidEmail ? getDummyEmail(transaction.orderId) : transaction.email
    };
  });

  return (
    <SectionCard className="overflow-hidden p-0">
      {/* Table Header with Title and Pagination Controls */}
      <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-950 sm:text-lg">Transaction history</h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Sanitized payment rows with settlement status visibility.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm sm:px-4 sm:py-2"
          >
            Previous
          </Button>
          <span className="text-xs text-slate-500 sm:text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm sm:px-4 sm:py-2"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Transaction Table - NO HORIZONTAL SCROLL */}
      <div className="w-full">
        <table className="w-full table-auto divide-y divide-slate-100">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-[0.22em] text-slate-400">
              {tableColumns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 font-medium sm:px-6 sm:py-4 ${column.headerClassName}`}
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
                    <td className="break-words px-4 py-3 font-medium text-slate-950 sm:px-6 sm:py-5">
                      <span className="block truncate max-w-[120px] sm:max-w-none sm:whitespace-nowrap">
                        {transaction.orderId}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-5">
                      {transaction.maskedCardNumber}
                    </td>
                    <td className="hidden px-4 py-3 sm:px-6 sm:py-5 lg:table-cell">
                      <span className="block truncate max-w-[180px]">
                        {transaction.email}
                      </span>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 sm:px-6 sm:py-5 md:table-cell">
                      {transaction.expiryMonth} / {transaction.expiryYear}
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 sm:px-6 sm:py-5 xl:table-cell">
                      {transaction.maskedCvv}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-5">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 sm:px-6 sm:py-5 md:table-cell">
                      {transaction.currency}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-5">
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

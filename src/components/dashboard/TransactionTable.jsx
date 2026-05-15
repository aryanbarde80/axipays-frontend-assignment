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

export function TransactionTable({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false
}) {
  return (
    <SectionCard className="overflow-hidden p-0">
      <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Transaction history</h2>
          <p className="text-sm text-slate-500">
            Sanitized payment rows with settlement status visibility.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
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
          >
            Next
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
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
              : transactions.map((transaction) => (
                  <tr key={transaction.id} className="text-sm text-slate-600">
                    <td className="whitespace-nowrap px-6 py-5 font-medium text-slate-950">
                      {transaction.orderId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-5">
                      {transaction.maskedCardNumber}
                    </td>
                    <td className="hidden px-6 py-5 lg:table-cell">{transaction.email}</td>
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

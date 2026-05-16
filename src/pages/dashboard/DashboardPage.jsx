import { AppFrame } from "../../components/common/AppFrame";
import { Button } from "../../components/common/Button";
import { SectionCard } from "../../components/common/SectionCard";
import { SkeletonCard } from "../../components/common/SkeletonCard";
import { DashboardCharts } from "../../components/dashboard/DashboardCharts";
import { SummaryCard } from "../../components/dashboard/SummaryCard";
import { TransactionTable } from "../../components/dashboard/TransactionTable";
import { useTransactions } from "../../hooks/useTransactions";
import { formatCurrencyLedgerEntries } from "../../utils/currencyFormat";

function DashboardAside() {
  return (
    <SectionCard className="h-fit space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
        Visibility goals
      </p>
      <div className="space-y-3 text-sm leading-7 text-slate-500">
        <p>Watch settlement quality without exposing raw card data anywhere in the UI.</p>
        <p>Track failed and pending traffic together so support teams catch risky payment states quickly.</p>
        <p>Use the dashboard as the fallback source of truth when the redirect callback remains incomplete.</p>
      </div>
    </SectionCard>
  );
}

export function DashboardPage() {
  const {
    paginatedTransactions,
    metrics,
    statusBreakdown,
    currencyBreakdown,
    volumeTimeline,
    isLoading,
    errorMessage,
    currentPage,
    totalPages,
    setCurrentPage,
    reloadTransactions
  } = useTransactions();

  return (
    <AppFrame
      eyebrow="Transaction intelligence"
      title="A dashboard built for payment operations, not just assignment screenshots."
      description="This view turns backend transaction data into readable settlement metrics, visual trend charts, and a client-side paginated history table."
      aside={<DashboardAside />}
    >
      {errorMessage ? (
        <SectionCard className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-950">Dashboard refresh needed</p>
            <p className="text-sm text-slate-500">{errorMessage}</p>
          </div>
          <Button type="button" onClick={reloadTransactions}>
            Try again
          </Button>
        </SectionCard>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <SummaryCard
              label="Total transactions"
              value={metrics.totalTransactions}
              hint="All fetched transactions in the current dashboard session."
            />
            <SummaryCard
              label="Total success volume"
              value={formatCurrencyLedgerEntries(metrics.totalSuccessVolume)}
              hint="Successful payments grouped by currency when the data set is mixed."
            />
            <SummaryCard
              label="Total success count"
              value={metrics.totalSuccessCount}
              hint="Transactions that settled with a successful final state."
            />
            <SummaryCard
              label="Failed + pending"
              value={metrics.totalFailedCount}
              hint="Assignment-aligned risk bucket for failed and unresolved activity."
            />
          </>
        )}
      </div>

      <div className="mt-6 space-y-6">
        <DashboardCharts
          statusBreakdown={statusBreakdown}
          volumeTimeline={volumeTimeline}
          currencyBreakdown={currencyBreakdown}
          isLoading={isLoading}
        />

        {!isLoading && paginatedTransactions.length === 0 ? (
          <SectionCard>
            <p className="text-lg font-semibold text-slate-950">No transactions yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Once the backend returns payment activity, the dashboard will surface charts and transaction history here.
            </p>
          </SectionCard>
        ) : (
          <TransactionTable
            transactions={paginatedTransactions}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
          />
        )}
      </div>
    </AppFrame>
  );
}

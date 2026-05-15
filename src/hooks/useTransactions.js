import { useEffect, useMemo, useState } from "react";
import { dashboardPageSize } from "../config/constants";
import { fetchTransactions } from "../services/transaction.service";
import {
  buildCurrencyBreakdown,
  buildDashboardMetrics,
  buildStatusBreakdown,
  buildVolumeTimeline
} from "../utils/transactionMetrics";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadTransactions() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetchTransactions();
      setTransactions(response.transactions);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
          "We could not load transaction activity right now."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  const metrics = useMemo(() => buildDashboardMetrics(transactions), [transactions]);
  const statusBreakdown = useMemo(
    () => buildStatusBreakdown(transactions),
    [transactions]
  );
  const currencyBreakdown = useMemo(
    () => buildCurrencyBreakdown(transactions),
    [transactions]
  );
  const volumeTimeline = useMemo(
    () => buildVolumeTimeline(transactions),
    [transactions]
  );

  const totalPages = Math.max(Math.ceil(transactions.length / dashboardPageSize), 1);
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * dashboardPageSize;
    return transactions.slice(startIndex, startIndex + dashboardPageSize);
  }, [currentPage, transactions]);

  return {
    transactions,
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
    reloadTransactions: loadTransactions
  };
}

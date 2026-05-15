import { statusOrder } from "../config/constants";

export function buildDashboardMetrics(transactions = []) {
  return transactions.reduce(
    (summary, transaction) => {
      summary.totalTransactions += 1;

      if (transaction.status === "success") {
        summary.totalSuccessVolume[transaction.currency] =
          (summary.totalSuccessVolume[transaction.currency] || 0) + transaction.amount;
        summary.totalSuccessCount += 1;
      }

      if (transaction.status === "failed" || transaction.status === "pending") {
        summary.totalFailedCount += 1;
      }

      return summary;
    },
    {
      totalTransactions: 0,
      totalSuccessVolume: {},
      totalSuccessCount: 0,
      totalFailedCount: 0
    }
  );
}

export function buildStatusBreakdown(transactions = []) {
  const totals = transactions.reduce((statusMap, transaction) => {
    const status = transaction.status || "pending";
    statusMap[status] = (statusMap[status] || 0) + 1;
    return statusMap;
  }, {});

  return statusOrder.map((status) => ({
    status,
    count: totals[status] || 0
  }));
}

export function buildCurrencyBreakdown(transactions = []) {
  const totals = transactions.reduce((currencyMap, transaction) => {
    currencyMap[transaction.currency] =
      (currencyMap[transaction.currency] || 0) + transaction.amount;
    return currencyMap;
  }, {});

  return Object.entries(totals).map(([currency, amount]) => ({
    currency,
    amount
  }));
}

export function buildVolumeTimeline(transactions = []) {
  const grouped = transactions.reduce((timeline, transaction) => {
    const key = new Date(transaction.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });

    if (!timeline[key]) {
      timeline[key] = { day: key, volume: 0, transactions: 0 };
    }

    timeline[key].volume += transaction.amount;
    timeline[key].transactions += 1;
    return timeline;
  }, {});

  return Object.values(grouped);
}

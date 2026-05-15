import {
  buildCurrencyBreakdown,
  buildDashboardMetrics,
  buildStatusBreakdown,
  buildVolumeTimeline
} from "./transactionMetrics";

const transactions = [
  {
    status: "success",
    amount: 120,
    currency: "USD",
    createdAt: "2026-05-12T10:00:00.000Z"
  },
  {
    status: "failed",
    amount: 80,
    currency: "EUR",
    createdAt: "2026-05-12T11:00:00.000Z"
  },
  {
    status: "pending",
    amount: 60,
    currency: "USD",
    createdAt: "2026-05-13T10:00:00.000Z"
  }
];

describe("transactionMetrics", () => {
  it("builds summary metrics", () => {
    expect(buildDashboardMetrics(transactions)).toEqual({
      totalTransactions: 3,
      totalSuccessVolume: 120,
      totalSuccessCount: 1,
      totalFailedCount: 2
    });
  });

  it("builds a status breakdown", () => {
    expect(buildStatusBreakdown(transactions)).toEqual([
      { status: "success", count: 1 },
      { status: "pending", count: 1 },
      { status: "failed", count: 1 }
    ]);
  });

  it("builds a currency breakdown", () => {
    expect(buildCurrencyBreakdown(transactions)).toEqual([
      { currency: "USD", amount: 180 },
      { currency: "EUR", amount: 80 }
    ]);
  });

  it("builds a volume timeline", () => {
    expect(buildVolumeTimeline(transactions)).toEqual([
      { day: "May 12", volume: 200, transactions: 2 },
      { day: "May 13", volume: 60, transactions: 1 }
    ]);
  });
});

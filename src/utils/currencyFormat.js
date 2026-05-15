export function formatCurrency(amount = 0, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2
    }).format(Number(amount || 0));
  } catch {
    return `${currency} ${Number(amount || 0).toFixed(2)}`;
  }
}

export function formatCurrencyLedger(currencyTotals = {}) {
  const entries = Object.entries(currencyTotals);

  if (entries.length === 0) {
    return formatCurrency(0, "USD");
  }

  return entries
    .map(([currency, amount]) => formatCurrency(amount, currency))
    .join(" · ");
}

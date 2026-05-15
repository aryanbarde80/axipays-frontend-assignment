export const paymentSessionKey = "axipays:last-payment-attempt";

export const supportedCurrencies = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "INR", label: "INR" }
];

export const supportedCountries = [
  { value: "India", label: "India" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Germany", label: "Germany" }
];

export const paymentModes = [
  {
    value: "browser",
    label: "Browser redirect",
    description: "Primary flow. Redirect the customer into the payment journey."
  },
  {
    value: "iframe",
    label: "Embedded preview",
    description: "Bonus flow. Keep the redirect target visible inside a secure frame preview."
  }
];

export const statusThemeMap = {
  success: {
    accent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    surface: "from-emerald-500/15 to-white"
  },
  failed: {
    accent: "bg-rose-100 text-rose-700 border-rose-200",
    surface: "from-rose-500/15 to-white"
  },
  pending: {
    accent: "bg-amber-100 text-amber-700 border-amber-200",
    surface: "from-amber-500/15 to-white"
  }
};

export const dashboardPageSize = 10;

export const statusOrder = ["success", "pending", "failed"];

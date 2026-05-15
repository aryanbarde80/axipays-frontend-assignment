const DEFAULT_API_BASE_URL = "https://payment-assignment.onrender.com";

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL,
  appBaseUrl: import.meta.env.VITE_APP_BASE_URL
};

export function resolveAppBaseUrl() {
  if (env.appBaseUrl) {
    return env.appBaseUrl;
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
}

import { paymentSessionKey } from "../config/constants";
import { resolveAppBaseUrl } from "../config/env";
import { apiClient } from "./apiClient";
import { HmacBuilder } from "../security/hmacBuilder";

const hmacBuilder = new HmacBuilder();

function buildPaymentPayload(formValues) {
  const appBaseUrl = resolveAppBaseUrl();

  return {
    card_holder_name: formValues.cardholderName.trim(),
    email: formValues.email.trim(),
    card_number: formValues.cardNumber.replace(/\s/g, ""),
    expiry_month: formValues.expiryMonth,
    expiry_year: formValues.expiryYear,
    card_cvv: formValues.cvv,
    amount: Number(formValues.amount),
    currency: formValues.currency,
    country: formValues.country,
    address: formValues.address.trim(),
    phone: formValues.phone.trim(),
    callback_url: appBaseUrl ? `${appBaseUrl}/payment/result` : undefined
  };
}

export async function initiatePayment(formValues) {
  const payload = buildPaymentPayload(formValues);
  const hash = hmacBuilder.buildHash({
    cardNumber: payload.card_number,
    email: payload.email
  });

  const response = await apiClient.post("/initiate-payment", payload, {
    headers: {
      Hash: hash
    }
  });

  const responseData = response.data || {};

  storePaymentAttempt({
    orderId: responseData.order_id || responseData.orderId || "Processing",
    status: "pending",
    amount: payload.amount,
    currency: payload.currency,
    email: payload.email
  });

  return {
    hash,
    payload,
    redirectionUrl:
      responseData.redirection_url ||
      responseData.redirect_url ||
      responseData.redirectionUrl ||
      "",
    responseData
  };
}

export function storePaymentAttempt(paymentAttempt) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(
    paymentSessionKey,
    JSON.stringify({
      ...paymentAttempt,
      updatedAt: new Date().toISOString()
    })
  );
}

export function getStoredPaymentAttempt() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(paymentSessionKey);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

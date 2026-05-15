import { paymentSessionKey } from "../config/constants";
import { resolveAppBaseUrl } from "../config/env";
import { apiClient } from "./apiClient";
import { HmacBuilder } from "../security/hmacBuilder";

const hmacBuilder = new HmacBuilder();

function buildOrderId() {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function buildPaymentPayload(formValues) {
  const appBaseUrl = resolveAppBaseUrl();
  const orderId = buildOrderId();

  return {
    orderId,
    cardHolderName: formValues.cardholderName.trim(),
    email: formValues.email.trim(),
    cardNumber: formValues.cardNumber.replace(/\s/g, ""),
    expiryMonth: formValues.expiryMonth,
    expiryYear: formValues.expiryYear,
    cardCVC: formValues.cvv,
    amount: Number(formValues.amount),
    currency: formValues.currency,
    country: formValues.country,
    address: formValues.address.trim(),
    phone: formValues.phone.trim(),
    callbackUrl: appBaseUrl ? `${appBaseUrl}/payment/result` : undefined
  };
}

export async function initiatePayment(formValues) {
  const payload = buildPaymentPayload(formValues);
  const hash = hmacBuilder.buildHash({
    cardNumber: payload.cardNumber,
    email: payload.email
  });

  const response = await apiClient.post("/initiate-payment", payload, {
    headers: {
      Hash: hash
    }
  });

  const responseData = response.data || {};
  const redirectionUrl =
    responseData.redirection_url ||
    responseData.redirect_url ||
    responseData.redirectionUrl ||
    responseData.redirectUrl ||
    "";

  storePaymentAttempt({
    orderId: responseData.order_id || responseData.orderId || payload.orderId,
    status: "pending",
    amount: payload.amount,
    currency: payload.currency,
    email: payload.email,
    redirectUrl: redirectionUrl
  });

  return {
    hash,
    payload,
    redirectionUrl,
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

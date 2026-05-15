import { useEffect, useMemo, useState } from "react";
import { getStoredPaymentAttempt } from "../services/payment.service";
import { readQueryParams } from "../utils/queryParams";

function normalizeResultStatus(status) {
  const value = String(status || "").toLowerCase();

  if (value.includes("success")) {
    return "success";
  }

  if (value.includes("fail")) {
    return "failed";
  }

  return "pending";
}

export function usePaymentRedirect(search = "") {
  const storedAttempt = useMemo(() => getStoredPaymentAttempt(), []);
  const [iframeStatus, setIframeStatus] = useState(null);

  useEffect(() => {
    function handleMessage(event) {
      const payload = event.data || {};

      if (!payload.status) {
        return;
      }

      setIframeStatus({
        status: normalizeResultStatus(payload.status),
        message: payload.message || "Embedded payment window posted an update."
      });
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const queryResult = readQueryParams(search);
  const status = normalizeResultStatus(iframeStatus?.status || queryResult.status);
  const modalContent = {
    status,
    title:
      status === "success"
        ? "Payment completed"
        : status === "failed"
          ? "Payment failed"
          : "Payment is still pending",
    message:
      iframeStatus?.message ||
      queryResult.message ||
      (status === "pending"
        ? "We could not verify the final callback yet. Use the dashboard to track the payment as it settles."
        : "Payment lifecycle update received from the redirect flow.")
  };

  return {
    status,
    orderId: queryResult.orderId || storedAttempt?.orderId || "Processing",
    reference: queryResult.reference || "Awaiting gateway confirmation",
    message: modalContent.message,
    modalContent,
    paymentAttempt: storedAttempt
  };
}

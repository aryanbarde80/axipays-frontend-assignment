import { useEffect, useMemo, useState } from "react";
import axios from "axios";
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
  const [remoteResult, setRemoteResult] = useState(null);
  const [isResolving, setIsResolving] = useState(false);
  const [resolutionError, setResolutionError] = useState("");

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
  const redirectUrl =
    queryResult.redirectUrl || queryResult.redirect_url || storedAttempt?.redirectUrl || "";

  useEffect(() => {
    let isActive = true;

    async function resolveRedirectResult() {
      if (queryResult.status || iframeStatus?.status || !redirectUrl) {
        return;
      }

      setIsResolving(true);
      setResolutionError("");

      try {
        const response = await axios.get(redirectUrl);

        if (!isActive) {
          return;
        }

        setRemoteResult(response.data || {});
      } catch (error) {
        if (!isActive) {
          return;
        }

        setResolutionError(
          error?.response?.data?.message ||
            "We could not read the redirect response automatically."
        );
      } finally {
        if (isActive) {
          setIsResolving(false);
        }
      }
    }

    resolveRedirectResult();

    return () => {
      isActive = false;
    };
  }, [iframeStatus?.status, queryResult.status, redirectUrl]);

  const resolvedStatusSource =
    iframeStatus?.status || queryResult.status || remoteResult?.status || remoteResult?.paymentStatus;
  const status = normalizeResultStatus(resolvedStatusSource);
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
      remoteResult?.message ||
      (isResolving
        ? "We are checking the gateway response now."
        : null) ||
      resolutionError ||
      (status === "pending"
        ? "We could not verify the final callback yet. Use the dashboard to track the payment as it settles."
        : "Payment lifecycle update received from the redirect flow.")
  };

  return {
    status,
    isResolving,
    orderId: queryResult.orderId || storedAttempt?.orderId || "Processing",
    reference: queryResult.reference || "Awaiting gateway confirmation",
    message: modalContent.message,
    modalContent,
    paymentAttempt: storedAttempt
  };
}

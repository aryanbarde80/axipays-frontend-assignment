import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { paymentModes } from "../config/constants";
import { isValidCardNumber, sanitizeCardNumber } from "../security/luhnValidator";
import { initiatePayment } from "../services/payment.service";

const initialFormValues = {
  cardholderName: "",
  email: "",
  cardNumber: "",
  expiryMonth: "",
  expiryYear: "",
  cvv: "",
  amount: "",
  currency: "USD",
  country: "India",
  address: "",
  phone: ""
};

function buildValidationErrors(formValues) {
  const nextErrors = {};

  if (!formValues.cardholderName.trim()) {
    nextErrors.cardholderName = "Cardholder name is required.";
  }

  if (!formValues.email.trim()) {
    nextErrors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!isValidCardNumber(formValues.cardNumber)) {
    nextErrors.cardNumber = "Enter a valid card number.";
  }

  if (!formValues.expiryMonth) {
    nextErrors.expiryMonth = "Month is required.";
  }

  if (!formValues.expiryYear) {
    nextErrors.expiryYear = "Year is required.";
  }

  if (!formValues.cvv.trim() || formValues.cvv.trim().length < 3) {
    nextErrors.cvv = "Enter a valid CVV.";
  }

  if (!formValues.amount || Number(formValues.amount) <= 0) {
    nextErrors.amount = "Amount must be greater than zero.";
  }

  if (!formValues.address.trim()) {
    nextErrors.address = "Billing address is required.";
  }

  if (!formValues.phone.trim()) {
    nextErrors.phone = "Phone number is required.";
  }

  return nextErrors;
}

export function useCheckout() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMode, setPaymentMode] = useState(paymentModes[0].value);
  const [resultModal, setResultModal] = useState(null);
  const [iframeUrl, setIframeUrl] = useState("");
  const [isCardInputFocused, setIsCardInputFocused] = useState(false);

  const paymentPreview = useMemo(
    () => ({
      amount: Number(formValues.amount || 0),
      currency: formValues.currency,
      email: formValues.email,
      paymentMode
    }),
    [formValues.amount, formValues.currency, formValues.email, paymentMode]
  );

  function updateField(fieldName, fieldValue) {
    const nextValue =
      fieldName === "cardNumber"
        ? sanitizeCardNumber(fieldValue).slice(0, 19)
        : fieldValue;

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: nextValue
    }));

    if (formErrors[fieldName]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: ""
      }));
    }
  }

  async function submitPayment(event) {
    event.preventDefault();
    const nextErrors = buildValidationErrors(formValues);

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      toast.error("Please fix the highlighted payment fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const paymentResponse = await initiatePayment(formValues);

      toast.success("Payment request signed and submitted.");

      if (!paymentResponse.redirectionUrl) {
        setResultModal({
          status: "pending",
          title: "Awaiting redirect",
          message:
            "The gateway did not return a redirection URL. You can still monitor the payment in the dashboard."
        });
        return;
      }

      if (paymentMode === "iframe") {
        setIframeUrl(paymentResponse.redirectionUrl);
        setResultModal({
          status: "pending",
          title: "Embedded payment view ready",
          message:
            "Use the embedded payment window to preview the redirect experience while keeping the app context visible."
        });
        return;
      }

      window.location.assign(paymentResponse.redirectionUrl);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Payment request failed. Please verify your details and try again.";

      toast.error(errorMessage);
      setResultModal({
        status: "failed",
        title: "Payment request failed",
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
      setFormValues((currentValues) => ({
        ...currentValues,
        cvv: ""
      }));
    }
  }

  return {
    formValues,
    formErrors,
    isSubmitting,
    isCardInputFocused,
    paymentMode,
    paymentPreview,
    iframeUrl,
    resultModal,
    setIsCardInputFocused,
    setResultModal,
    setPaymentMode,
    updateField,
    submitPayment
  };
}

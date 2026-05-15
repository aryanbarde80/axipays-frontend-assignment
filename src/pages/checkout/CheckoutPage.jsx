import { AppFrame } from "../../components/common/AppFrame";
import { StatusModal } from "../../components/common/StatusModal";
import { CheckoutForm } from "../../components/checkout/CheckoutForm";
import { CheckoutSummary } from "../../components/checkout/CheckoutSummary";
import { useCheckout } from "../../hooks/useCheckout";

export function CheckoutPage() {
  const checkout = useCheckout();

  return (
    <AppFrame
      eyebrow="Secure payment flow"
      title="A checkout experience that feels trustworthy, fast, and production ready."
      description="Axipays Console simulates a payment gateway front end with strong validation, signed request headers, redirect handling, and a calm fintech visual language."
      aside={<CheckoutSummary preview={checkout.paymentPreview} />}
    >
      <CheckoutForm
        formValues={checkout.formValues}
        formErrors={checkout.formErrors}
        isCardInputFocused={checkout.isCardInputFocused}
        paymentMode={checkout.paymentMode}
        onPaymentModeChange={checkout.setPaymentMode}
        onChange={checkout.updateField}
        onCardFocusChange={checkout.setIsCardInputFocused}
        onSubmit={checkout.submitPayment}
        isSubmitting={checkout.isSubmitting}
        iframeUrl={checkout.iframeUrl}
      />

      <StatusModal
        modal={checkout.resultModal}
        onClose={() => checkout.setResultModal(null)}
      />
    </AppFrame>
  );
}

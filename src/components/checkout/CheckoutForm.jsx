import { paymentModes, supportedCountries, supportedCurrencies } from "../../config/constants";
import {
  formatCardNumberForInput,
  formatMaskedCardNumber
} from "../../security/cardMasking";
import { Button } from "../common/Button";
import { FormField } from "../common/FormField";
import { SectionCard } from "../common/SectionCard";
import { SelectInput } from "../common/SelectInput";
import { TextInput } from "../common/TextInput";

function buildYearOptions() {
  const baseYear = new Date().getFullYear();
  return Array.from({ length: 12 }, (_, index) => String(baseYear + index));
}

export function CheckoutForm({
  formValues,
  formErrors,
  isCardInputFocused,
  paymentMode,
  onPaymentModeChange,
  onChange,
  onCardFocusChange,
  onSubmit,
  isSubmitting,
  iframeUrl
}) {
  const previewMaskedCard = formatMaskedCardNumber(formValues.cardNumber);
  const cardInputValue = isCardInputFocused
    ? formatCardNumberForInput(formValues.cardNumber)
    : previewMaskedCard;

  return (
    <SectionCard className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          Secure checkout
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {paymentModes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => onPaymentModeChange(mode.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                paymentMode === mode.value
                  ? "bg-ink text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-ink"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          {paymentModes.find((mode) => mode.value === paymentMode)?.description}
        </p>
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            label="Card holder name"
            htmlFor="cardholderName"
            error={formErrors.cardholderName}
          >
            <TextInput
              id="cardholderName"
              placeholder="Aryan Barde"
              value={formValues.cardholderName}
              onChange={(event) => onChange("cardholderName", event.target.value)}
            />
          </FormField>

          <FormField label="Email address" htmlFor="email" error={formErrors.email}>
            <TextInput
              id="email"
              type="email"
              placeholder="aryan@example.com"
              value={formValues.email}
              onChange={(event) => onChange("email", event.target.value)}
            />
          </FormField>
        </div>

        <FormField
          label="Card number"
          htmlFor="cardNumber"
          error={formErrors.cardNumber}
          hint={previewMaskedCard ? `Masked preview: ${previewMaskedCard}` : null}
        >
          <TextInput
            id="cardNumber"
            inputMode="numeric"
            autoComplete="cc-number"
            maxLength={23}
            placeholder="4242 4242 4242 4242"
            value={cardInputValue}
            onChange={(event) => onChange("cardNumber", event.target.value)}
            onFocus={() => onCardFocusChange(true)}
            onBlur={() => onCardFocusChange(false)}
          />
        </FormField>

        <div className="grid gap-5 md:grid-cols-4">
          <FormField
            label="Expiry month"
            htmlFor="expiryMonth"
            error={formErrors.expiryMonth}
          >
            <SelectInput
              id="expiryMonth"
              value={formValues.expiryMonth}
              onChange={(event) => onChange("expiryMonth", event.target.value)}
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0")).map(
                (month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                )
              )}
            </SelectInput>
          </FormField>

          <FormField
            label="Expiry year"
            htmlFor="expiryYear"
            error={formErrors.expiryYear}
          >
            <SelectInput
              id="expiryYear"
              value={formValues.expiryYear}
              onChange={(event) => onChange("expiryYear", event.target.value)}
            >
              <option value="">Year</option>
              {buildYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </SelectInput>
          </FormField>

          <FormField label="CVV / CVC" htmlFor="cvv" error={formErrors.cvv}>
            <TextInput
              id="cvv"
              type="password"
              inputMode="numeric"
              autoComplete="cc-csc"
              maxLength={4}
              placeholder="***"
              value={formValues.cvv}
              onChange={(event) => onChange("cvv", event.target.value.replace(/\D/g, ""))}
            />
          </FormField>

          <FormField label="Amount" htmlFor="amount" error={formErrors.amount}>
            <TextInput
              id="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="249.00"
              value={formValues.amount}
              onChange={(event) => onChange("amount", event.target.value)}
            />
          </FormField>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="Currency" htmlFor="currency">
            <SelectInput
              id="currency"
              value={formValues.currency}
              onChange={(event) => onChange("currency", event.target.value)}
            >
              {supportedCurrencies.map((currency) => (
                <option key={currency.value} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </SelectInput>
          </FormField>

          <FormField label="Country" htmlFor="country">
            <SelectInput
              id="country"
              value={formValues.country}
              onChange={(event) => onChange("country", event.target.value)}
            >
              {supportedCountries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </SelectInput>
          </FormField>
        </div>

        <FormField label="Address" htmlFor="address" error={formErrors.address}>
          <TextInput
            id="address"
            placeholder="MG Road, Bengaluru"
            value={formValues.address}
            onChange={(event) => onChange("address", event.target.value)}
          />
        </FormField>

        <FormField label="Phone" htmlFor="phone" error={formErrors.phone}>
          <TextInput
            id="phone"
            placeholder="+91 98765 43210"
            value={formValues.phone}
            onChange={(event) => onChange("phone", event.target.value)}
          />
        </FormField>

        <div className="flex flex-col gap-4 rounded-[28px] border border-slate-100 bg-slate-50 p-5">
          <p className="text-sm font-medium text-slate-900">
            Security handling on submit
          </p>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>Card number is Luhn validated before the request leaves the browser.</li>
            <li>Hash header is generated from the Axipays signing rules.</li>
            <li>CVV is never shown outside direct entry and is cleared after submission.</li>
          </ul>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full md:w-auto">
          Pay securely
        </Button>
      </form>

      {iframeUrl ? (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-sm text-white/70">
            <span>Embedded payment preview</span>
            <span>Use only for the bonus path</span>
          </div>
          <iframe
            title="Axipays payment redirect preview"
            src={iframeUrl}
            className="h-[540px] w-full bg-white"
          />
        </div>
      ) : null}
    </SectionCard>
  );
}

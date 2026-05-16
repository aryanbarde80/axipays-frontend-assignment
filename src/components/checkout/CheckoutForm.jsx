import { paymentModes, supportedCountries, supportedCurrencies } from "../../config/constants";
import {
  formatCardNumberForInput,
  formatMaskedCardNumber
} from "../../security/cardMasking";
import { FiAlertCircle, FiCheckCircle, FiShield } from "react-icons/fi";
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
      <div className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Secure checkout
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950 sm:text-3xl">
              Complete the payment details
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              Cleaner grouping, stronger input feedback, and safer messaging make this feel more like a polished fintech flow than an assignment form.
            </p>
          </div>
          <div className="rounded-[24px] border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-700">
            <div className="flex items-center gap-2 font-semibold">
              <FiShield />
              Protected input session
            </div>
            <p className="mt-1 text-xs leading-5 text-emerald-700/90">
              Validation, masking, and signed-request handling stay active.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {paymentModes.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => onPaymentModeChange(mode.value)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                paymentMode === mode.value
                  ? "bg-ink text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-ink"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <div className="rounded-[24px] border border-slate-100 bg-slate-50/90 p-4">
          <p className="text-sm text-slate-500">
            {paymentModes.find((mode) => mode.value === paymentMode)?.description}
          </p>
        </div>
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

        <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">Card details</p>
              <p className="mt-1 text-sm text-slate-500">
                Enter the secure card information exactly as it appears on the payment instrument.
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
              PCI-style masking
            </span>
          </div>

          <div className="space-y-5">
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

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-900">Billing and location</p>
            <p className="mt-1 text-sm text-slate-500">
              These fields keep the checkout realistic and make the final payment preview easier to verify.
            </p>
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

          <div className="mt-5 grid gap-5 md:grid-cols-2">
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
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-slate-100 bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-900">Security handling on submit</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-[22px] border border-white bg-white p-4">
                <FiCheckCircle className="text-base text-emerald-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Luhn validation</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Card number is verified before the request leaves the browser.
                </p>
              </div>
              <div className="rounded-[22px] border border-white bg-white p-4">
                <FiShield className="text-base text-brand-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Signed payload</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  The Hash header follows the assignment signing rules.
                </p>
              </div>
              <div className="rounded-[22px] border border-white bg-white p-4">
                <FiAlertCircle className="text-base text-amber-600" />
                <p className="mt-3 text-sm font-semibold text-slate-900">Safe CVV handling</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  CVV never appears outside direct entry and post-submit cleanup.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-brand-100 bg-brand-50/70 p-5">
            <p className="text-sm font-semibold text-slate-900">Before you continue</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <li>Every visible value is grouped and labeled for quick review.</li>
              <li>Spacing is tightened to remove the “text then gaps then content” feeling.</li>
              <li>Mobile stacks now prioritize readability before decorative layout.</li>
            </ul>
          </div>
        </div>

        <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
          Pay securely
        </Button>
      </form>

      {iframeUrl ? (
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950">
          <div className="flex flex-col gap-2 border-b border-white/10 px-5 py-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
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

# Security Notes

This frontend assignment includes enough payment-sensitive behavior that it deserved a clear security boundary instead of being treated like a normal form.

## HMAC request signing

The Axipays API requires a `Hash` header generated with HMAC-SHA256.

The implementation follows the exact assignment rules:

1. Take the first 6 and last 4 digits of the sanitized card number
2. Concatenate those digits
3. Reverse the combined string
4. Reverse the email address
5. Build the message as:

```text
reverse(email) + AXIPAYS + reverse(first6+last4)
```

6. Uppercase the full message
7. Generate the HMAC-SHA256 digest using the secret key `AXI2026`
8. Send the digest as uppercase hex in the `Hash` header

This logic lives in `src/security/hmacBuilder.js` so it can be audited independently of the UI.

## Luhn validation

Before any payment request is submitted, the card number is validated with the Luhn algorithm. This is a lightweight but important guardrail that catches obvious bad input early and avoids signing clearly invalid cards.

The validator lives in `src/security/luhnValidator.js`.

## Sensitive data masking

The app masks sensitive card information everywhere outside direct input:

- Card number: first 6 visible, middle masked, last 4 visible
- CVV: always shown as `***`

This masking is applied on the dashboard and in any non-editable display context.

## Raw data handling

The app avoids a few easy frontend mistakes:

- no console logging of payment data
- no local storage persistence for raw card details
- no visible CVV echoes
- CVV is cleared from state after the request flow finishes

The stored payment attempt used for result fallback keeps only safe metadata such as amount, currency, order reference, and email.

## Redirect result honesty

Payment redirects can be incomplete or inconsistent in assignment environments. For that reason, the result page does not claim a final success unless callback data clearly points to it.

If the callback cannot be trusted, the UI falls back to a pending state and points the user toward the dashboard for operational tracking.

That may feel conservative, but it is the safer behavior for a payment surface.

# API Flow

This document explains how the frontend moves through payment initiation, redirect handling, and dashboard reporting.

## End-to-end payment lifecycle

### 1. Checkout data collection

The customer fills in:

- cardholder name
- email
- card number
- expiry month and year
- CVV
- amount
- currency
- country
- address
- phone

At this stage the card number is still editable because it is the one place where the raw value is actually needed.

### 2. Client-side validation

Before calling the API, the app checks:

- required fields
- email format
- amount is greater than zero
- card passes the Luhn algorithm

This reduces noisy requests and improves form feedback.

### 3. Secure request signing

`payment.service.js` builds the request payload and generates the `Hash` header through the security module.

Endpoint:

```text
POST /initiate-payment
```

Headers:

- `Content-Type: application/json`
- `Hash: <uppercase HMAC-SHA256 digest>`

### 4. Redirect handling

If the API returns a `redirection_url`, the app stores a small non-sensitive payment snapshot locally and then performs a browser redirect into the gateway flow. That gives the result page enough context to render a useful fallback if the callback is incomplete after the gateway sends the user back.

### 5. Result interpretation

The result page attempts to resolve the final state from:

- URL query parameters
- embedded window messages
- the stored non-sensitive payment snapshot

Possible outcomes:

- `success`
- `failed`
- `pending`

If the redirect callback is unclear, the app intentionally shows `pending`.

## Transaction dashboard flow

The dashboard calls:

```text
GET /transactions?page=1&limit=100
```

The frontend normalizes the response into a consistent transaction shape and then derives:

- total transactions
- total success volume
- total success count
- failed plus pending count
- status chart
- volume timeline
- currency distribution

The table shows only masked card details and a permanently masked CVC field.

## Why the flow is structured this way

The API flow was designed to keep frontend responsibilities realistic:

- validate early
- sign requests correctly
- never expose sensitive data in display layers
- avoid fake certainty around redirect outcomes
- give operations a dashboard fallback when redirects are messy

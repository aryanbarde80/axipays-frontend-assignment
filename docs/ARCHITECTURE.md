# Architecture Overview

This project uses a modular frontend structure that keeps payment logic readable and easy to evolve. The goal was not to create a massive abstraction tree, but to keep each layer accountable for one kind of responsibility.

## Architectural intent

The frontend is split around domain boundaries instead of random component grouping:

- `pages/` assembles complete screens
- `components/` holds presentational building blocks
- `services/` talks to external APIs
- `security/` owns sensitive payment logic
- `hooks/` coordinates stateful flows
- `utils/` contains display-safe transformation helpers
- `config/` centralizes constants and environment handling

This keeps the checkout form from becoming a place where UI, hashing, validation, and network logic all collapse together.

## Screen composition

### Checkout page

The checkout page combines:

- `useCheckout` for form orchestration and submission flow
- `CheckoutForm` for all visible fields and submission controls
- `CheckoutSummary` for the trust-oriented side panel
- `StatusModal` for payment request feedback

The page does not perform validation, hashing, or API requests directly.

### Dashboard page

The dashboard page combines:

- `useTransactions` for loading and paginating data
- `SummaryCard` for top-level metrics
- `DashboardCharts` for data visualization
- `TransactionTable` for sanitized history rows

Metrics and chart datasets are computed outside the visible components so rendering stays simple.

### Payment result page

The result page uses `usePaymentRedirect` to interpret:

- redirect query parameters
- embedded window messages
- the stored local payment attempt

If the callback is incomplete, the page intentionally degrades into a pending state instead of pretending a final result exists.

## Data flow

### Checkout flow

1. Form values are collected in `useCheckout`
2. Validation runs in the hook using the Luhn validator
3. `payment.service.js` builds the payload and the `Hash` header
4. `apiClient.js` sends the request
5. The redirect URL is handled by browser navigation

### Dashboard flow

1. `transaction.service.js` fetches backend records
2. Response data is normalized into a stable transaction view model
3. `transactionMetrics.js` derives summary cards and chart datasets
4. Components render the already-shaped data

## Security boundary

The `security/` folder is treated as its own boundary because the project handles payment data. That layer owns:

- card sanitization
- Luhn validation
- masking behavior
- HMAC message construction and signature generation

This keeps security logic easy to audit and prevents those helpers from becoming scattered across UI components.

## Why this shape works for the assignment

- It is modular without feeling artificial
- It supports future growth, such as filters or retry actions
- It keeps the most sensitive logic isolated
- It stays readable for reviewers during a frontend interview process

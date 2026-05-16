# Axipays Payment Console

A production-style frontend payment system built for the Axipays frontend assignment. The app includes a secure checkout flow, redirect-aware payment result handling, and a transaction dashboard that turns backend payment records into operational metrics.

## What this project covers

- Secure checkout page with card and billing capture
- Luhn validation before submission
- HMAC-SHA256 request signing with the exact Axipays message rules
- Sensitive field masking for card number and CVV
- Browser redirect payment flow with callback-aware result handling
- Dashboard summary cards, charts, and paginated transaction history
- Human-readable documentation for architecture, security, and API flow

## Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Axios
- Recharts
- Framer Motion
- React Hot Toast
- React Icons
- Crypto JS
- Vitest + Testing Library

## Project structure

```text
src/
  app/
  pages/
  components/
  services/
  security/
  hooks/
  utils/
  config/
  styles/
```

The key rule throughout the project is separation of concerns:

- UI components stay presentational
- API calls live only in `services/`
- Payment-sensitive logic lives in `security/`
- Hooks coordinate state and flow

## Local setup

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

To run the tests:

```bash
npm run test:run
```

## Environment

Optional environment variables:

```bash
VITE_API_BASE_URL=https://payment-assignment.onrender.com
VITE_APP_BASE_URL=https://your-deployed-app-url
```

If these are not provided, the app falls back to the Axipays assignment API and the current browser origin.

## Payment flow overview

1. The customer enters card and billing details on the checkout page.
2. The form validates required fields and runs a Luhn check against the card number.
3. The request signing utility builds the `Hash` header using the Axipays HMAC rules.
4. The frontend calls the initiate payment endpoint.
5. If a redirect URL is returned, the app redirects the browser to the gateway flow.
6. The result page reads query parameters or embedded window messages and falls back to a safe pending state if the callback is incomplete.
7. The dashboard provides summary metrics and transaction history from the transactions endpoint.

## Notes on security handling

- Raw card details are never logged
- CVV is cleared from state after submission
- Card numbers are masked anywhere outside direct input
- The app avoids claiming success unless callback data clearly indicates it

## Deployment

- `vercel.json` is included for SPA-friendly Vercel deployment
- `render.yaml` is included for static site deployment on Render

## Documentation

- [Architecture Notes](./docs/ARCHITECTURE.md)
- [Security Notes](./docs/SECURITY.md)
- [API Flow](./docs/API_FLOW.md)
- [Assignment PDF](./docs/AXIPAYS%20Assignment.pdf)

## Final thought

This submission was designed to feel like a small fintech product surface rather than a one-off assignment. The priority was correctness, flow clarity, and security-minded implementation without over-engineering the frontend.

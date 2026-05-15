import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CheckoutPage } from "../pages/checkout/CheckoutPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { PaymentResultPage } from "../pages/payment-result/PaymentResultPage";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/payment/result" element={<PaymentResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

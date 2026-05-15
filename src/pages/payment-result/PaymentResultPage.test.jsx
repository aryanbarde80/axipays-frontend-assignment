import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { PaymentResultPage } from "./PaymentResultPage";

function renderPaymentResult(initialEntry) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/payment/result" element={<PaymentResultPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("PaymentResultPage", () => {
  it("renders a failed state from the query string", () => {
    renderPaymentResult("/payment/result?status=failed&order_id=AXI-7");
    expect(screen.getByText(/Redirect lifecycle update/i)).toBeInTheDocument();
    expect(screen.getByText(/^failed$/i)).toBeInTheDocument();
    expect(screen.getByText("AXI-7")).toBeInTheDocument();
  });

  it("falls back to pending when the callback is incomplete", () => {
    renderPaymentResult("/payment/result");
    expect(screen.getByText(/^pending$/i)).toBeInTheDocument();
  });
});

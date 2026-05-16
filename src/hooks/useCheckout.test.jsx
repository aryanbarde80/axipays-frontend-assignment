import { renderHook, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useCheckout } from "./useCheckout";
import * as paymentService from "../services/payment.service";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock("../services/payment.service", () => ({
  initiatePayment: vi.fn()
}));

function RouterWrapper({ children }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

describe("useCheckout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(window, "open").mockImplementation(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks submission when the form is invalid", async () => {
    const { result } = renderHook(() => useCheckout(), {
      wrapper: RouterWrapper
    });

    await act(async () => {
      await result.current.submitPayment({ preventDefault: vi.fn() });
    });

    expect(result.current.formErrors.cardholderName).toBeTruthy();
    expect(result.current.formErrors.cardNumber).toBeTruthy();
  });

  it("submits a valid payment request", async () => {
    paymentService.initiatePayment.mockResolvedValue({
      redirectionUrl: "https://payment-assignment.onrender.com/redirect",
      responseData: {}
    });

    const { result } = renderHook(() => useCheckout(), {
      wrapper: RouterWrapper
    });

    act(() => {
      result.current.updateField("cardholderName", "Aryan Barde");
      result.current.updateField("email", "aryan@example.com");
      result.current.updateField("cardNumber", "4242424242424242");
      result.current.updateField("expiryMonth", "08");
      result.current.updateField("expiryYear", "2027");
      result.current.updateField("cvv", "123");
      result.current.updateField("amount", "250");
      result.current.updateField("address", "MG Road");
      result.current.updateField("phone", "+91 9999999999");
    });

    await act(async () => {
      await result.current.submitPayment({ preventDefault: vi.fn() });
    });

    expect(paymentService.initiatePayment).toHaveBeenCalledTimes(1);
    expect(window.open).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(
      "/payment/result?redirect_url=https%3A%2F%2Fpayment-assignment.onrender.com%2Fredirect"
    );
  });
});

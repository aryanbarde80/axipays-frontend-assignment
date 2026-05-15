import { initiatePayment } from "./payment.service";
import { apiClient } from "./apiClient";

vi.mock("./apiClient", () => ({
  apiClient: {
    post: vi.fn()
  }
}));

describe("payment.service", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.clearAllMocks();
  });

  it("submits the payment with a Hash header and returns the redirect url", async () => {
    apiClient.post.mockResolvedValue({
      data: {
        redirection_url: "https://gateway.example/continue",
        order_id: "ORDER-42"
      }
    });

    const response = await initiatePayment({
      cardholderName: "Aryan Barde",
      email: "aryan@example.com",
      cardNumber: "4242424242424242",
      expiryMonth: "08",
      expiryYear: "2027",
      cvv: "123",
      amount: "249",
      currency: "USD",
      country: "India",
      address: "MG Road",
      phone: "+91 9999999999"
    });

    expect(apiClient.post).toHaveBeenCalledWith(
      "/initiate-payment",
      expect.objectContaining({
        email: "aryan@example.com",
        cardNumber: "4242424242424242",
        orderId: expect.stringMatching(/^ORD-/)
      }),
      expect.objectContaining({
        headers: expect.objectContaining({
          Hash: expect.stringMatching(/^[A-F0-9]{64}$/)
        })
      })
    );

    expect(response.redirectionUrl).toBe("https://gateway.example/continue");
  });
});

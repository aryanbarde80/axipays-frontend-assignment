import { isValidCardNumber, sanitizeCardNumber } from "./luhnValidator";

describe("luhnValidator", () => {
  it("sanitizes non digit characters", () => {
    expect(sanitizeCardNumber("4242 4242-4242 4242")).toBe("4242424242424242");
  });

  it("accepts a valid card number", () => {
    expect(isValidCardNumber("4242 4242 4242 4242")).toBe(true);
  });

  it("rejects an invalid card number", () => {
    expect(isValidCardNumber("4242 4242 4242 4241")).toBe(false);
  });
});

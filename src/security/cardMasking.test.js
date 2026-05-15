import {
  formatMaskedCardNumber,
  maskCardNumber,
  maskCvv
} from "./cardMasking";

describe("cardMasking", () => {
  it("masks the middle digits while keeping first six and last four", () => {
    expect(maskCardNumber("4242424242424242")).toBe("424242******4242");
  });

  it("formats the masked card with spacing for preview", () => {
    expect(formatMaskedCardNumber("4242424242424242")).toBe("4242 42** **** 4242");
  });

  it("always masks cvv output", () => {
    expect(maskCvv("123")).toBe("***");
  });
});

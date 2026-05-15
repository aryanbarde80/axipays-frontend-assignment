import { HmacBuilder } from "./hmacBuilder";

describe("HmacBuilder", () => {
  it("builds the uppercase signing message", () => {
    const builder = new HmacBuilder();
    expect(
      builder.buildUppercaseMessage({
        cardNumber: "4242424242424242",
        email: "aryan@example.com"
      })
    ).toBe("MOC.ELPMAXE@NAYRAAXIPAYS2424242424");
  });

  it("creates an uppercase hex signature", () => {
    const builder = new HmacBuilder();
    expect(
      builder.buildHash({
        cardNumber: "4242424242424242",
        email: "aryan@example.com"
      })
    ).toMatch(/^[A-F0-9]{64}$/);
  });
});

import HmacSHA256 from "crypto-js/hmac-sha256";
import Hex from "crypto-js/enc-hex";
import { sanitizeCardNumber } from "./luhnValidator";

export class HmacBuilder {
  constructor(secretKey = "AXI2026") {
    this.secretKey = secretKey;
  }

  buildHash({ cardNumber, email }) {
    const uppercaseMessage = this.buildUppercaseMessage({ cardNumber, email });
    return HmacSHA256(uppercaseMessage, this.secretKey)
      .toString(Hex)
      .toUpperCase();
  }

  buildUppercaseMessage({ cardNumber, email }) {
    const digits = sanitizeCardNumber(cardNumber);
    const firstSix = digits.slice(0, 6);
    const lastFour = digits.slice(-4);
    const visibleDigits = `${firstSix}${lastFour}`;
    const reversedDigits = this.reverse(visibleDigits);
    const reversedEmail = this.reverse((email || "").trim());
    return `${reversedEmail}AXIPAYS${reversedDigits}`.toUpperCase();
  }

  reverse(input = "") {
    return input.split("").reverse().join("");
  }
}

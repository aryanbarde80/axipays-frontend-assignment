import { sanitizeCardNumber } from "./luhnValidator";

export function maskCardNumber(cardNumber = "") {
  const digits = sanitizeCardNumber(cardNumber);

  if (!digits) {
    return "";
  }

  if (digits.length <= 10) {
    return digits.replace(/.(?=.{4})/g, "*");
  }

  const firstSix = digits.slice(0, 6);
  const lastFour = digits.slice(-4);
  const middle = "*".repeat(Math.max(digits.length - 10, 0));

  return `${firstSix}${middle}${lastFour}`;
}

export function formatMaskedCardNumber(cardNumber = "") {
  return maskCardNumber(cardNumber).replace(/(.{4})/g, "$1 ").trim();
}

export function maskCardNumberForTable(cardNumber = "") {
  const masked = maskCardNumber(cardNumber);
  return masked
    ? `${masked.slice(0, 6)} ${masked.slice(6, -4)} ${masked.slice(-4)}`.trim()
    : "";
}

export function maskCvv() {
  return "***";
}

export function sanitizeCardNumber(cardNumber = "") {
  return cardNumber.replace(/\D/g, "");
}

export function isValidCardNumber(cardNumber = "") {
  const digits = sanitizeCardNumber(cardNumber);

  if (digits.length < 12) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

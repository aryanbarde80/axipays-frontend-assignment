import { maskCardNumberForTable, maskCvv } from "../security/cardMasking";
import { apiClient } from "./apiClient";

function normalizeStatus(status) {
  const value = String(status || "pending").toLowerCase();

  if (value.includes("success")) {
    return "success";
  }

  if (value.includes("fail")) {
    return "failed";
  }

  return "pending";
}

function pickTransactionCollection(responseData) {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData?.data)) {
    return responseData.data;
  }

  if (Array.isArray(responseData?.transactions)) {
    return responseData.transactions;
  }

  if (Array.isArray(responseData?.data?.transactions)) {
    return responseData.data.transactions;
  }

  return [];
}

function buildContactDetails(transaction = {}) {
  const email =
    transaction.email ||
    transaction.cardholder_email ||
    transaction.customer_email ||
    transaction.customerEmail ||
    "";
  const cardholderName =
    transaction.cardHolderName ||
    transaction.cardholderName ||
    transaction.card_holder_name ||
    transaction.customer_name ||
    transaction.customerName ||
    "";

  if (email) {
    return {
      primary: email,
      secondary: cardholderName && cardholderName !== email ? cardholderName : "Email"
    };
  }

  if (cardholderName) {
    return {
      primary: cardholderName,
      secondary: "Card holder"
    };
  }

  return {
    primary: "Not provided by API",
    secondary: "Contact unavailable"
  };
}

export function normalizeTransaction(transaction = {}, index = 0) {
  const orderId =
    transaction.order_id ||
    transaction.orderId ||
    transaction.transaction_id ||
    transaction.id ||
    `TX-${index + 1}`;

  const cardNumber =
    transaction.card_number ||
    transaction.cardNumber ||
    transaction.pan ||
    "";
  const contact = buildContactDetails(transaction);

  return {
    id: String(orderId),
    orderId: String(orderId),
    email: contact.primary,
    contactHint: contact.secondary,
    expiryMonth: String(
      transaction.expiryMonth ||
        transaction.expiry_month ||
        transaction.expMonth ||
        transaction.month ||
        ""
    ).padStart(2, "0"),
    expiryYear: String(
      transaction.expiryYear ||
        transaction.expiry_year ||
        transaction.expYear ||
        transaction.year ||
        ""
    ),
    amount: Number(transaction.amount || 0),
    currency: transaction.currency || "USD",
    status: normalizeStatus(transaction.status),
    createdAt:
      transaction.created_at ||
      transaction.createdAt ||
      transaction.transaction_date ||
      new Date().toISOString(),
    maskedCardNumber: maskCardNumberForTable(cardNumber),
    maskedCvv: maskCvv()
  };
}

export async function fetchTransactions({ page = 1, limit = 100 } = {}) {
  const response = await apiClient.get(`/transactions?page=${page}&limit=${limit}`);
  const transactions = pickTransactionCollection(response.data).map(normalizeTransaction);

  return {
    transactions,
    total:
      response.data?.total ||
      response.data?.count ||
      response.data?.data?.total ||
      transactions.length
  };
}

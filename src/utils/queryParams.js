export function readQueryParams(search = "") {
  const params = new URLSearchParams(search);

  return {
    status:
      params.get("status") ||
      params.get("payment_status") ||
      params.get("result"),
    redirectUrl: params.get("redirect_url") || params.get("redirectUrl"),
    orderId: params.get("order_id") || params.get("orderId") || params.get("tx"),
    reference:
      params.get("reference") || params.get("transaction_reference") || params.get("ref"),
    message: params.get("message") || params.get("detail")
  };
}

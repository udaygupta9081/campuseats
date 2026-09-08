# Part D — Network Resilience

## D1. Outbound service
The Orders service calls the Payment Service through the `PAYMENT_SERVICE_URL` environment variable. No payment-service URL is hard-coded in the client.

## D2. Hardening
The payment client uses a request timeout, exponential backoff and jitter. Network failures, timeouts and 5xx responses may be retried. A 4xx response is never retried. The payment create request carries the same idempotency key used by the Orders create operation.

## D3. Fallback
If the Payment Service remains unreachable after safe retries, the Orders Service fails closed with `503 Service Unavailable` and does not persist the order. Degrading by creating an order without a successful payment could leave an unpaid order or an inconsistent order/payment state, so failing closed is safer. The client can retry later with the same idempotency key.

`curl-transcript.txt` contains the required create, repeated idempotent create, malformed body, missing resource, and state-conflict demonstrations.

# Part C — Node.js Implementation

The assignment's Python filenames are treated as architectural examples; this implementation uses the team's actual Node.js stack.

## Structure
- `src/models.js` — stored Order model and public `asJson()` representation.
- `src/store.js` — in-process order and idempotency storage.
- `src/errors.js` — single `problem()` helper/error shape.
- `src/app.js` — HTTP routing and handlers.
- `src/validation.js` — request-body validation before body fields are used.
- `src/paymentClient.js` — hardened Payment Service HTTP client.
- `tests/orders.test.js` — four required automated behaviours.

## Required behaviours
- Create: `201 Created` with `Location` header.
- Single read: `200 OK`.
- Filtered list: `GET /orders?status=...`.
- State-changing sub-resource: `POST /orders/{id}/cancellation`.
- Failure statuses: `400`, `404`, `409`, `422`, and `503` where applicable.
- One error shape with `type`, `title`, `status`, `detail`.
- Idempotent create using `Idempotency-Key`.
- Model/representation separation so internal fields do not leak.
- Four automated tests covering create, idempotent repeat, a 4xx failure, and unknown-id 404.

See `test-output.txt` for the recorded passing test run.

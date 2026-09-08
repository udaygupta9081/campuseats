import http from 'node:http';
import { validateOrderBody } from './validation.js';
import { problem, HttpProblem } from './errors.js';
import { createOrder, findById, findByIdempotencyKey, listOrders, updateStatus } from './store.js';
import { chargePayment } from './paymentClient.js';

function json(res, status, body, headers = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', ...headers });
  res.end(payload);
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { throw new HttpProblem(400, 'Malformed request body', 'Request body is not valid JSON.'); }
}

function routeParts(url) {
  return new URL(url, 'http://localhost').pathname.split('/').filter(Boolean);
}

export function createApp() {
  return http.createServer(async (req, res) => {
    try {
      const parts = routeParts(req.url);
      if (parts[0] !== 'orders') return problem(res, 404, 'Not found', 'The requested resource does not exist.');

      // POST /orders
      if (req.method === 'POST' && parts.length === 1) {
        const key = req.headers['idempotency-key'];
        if (!key || Array.isArray(key) || key.trim() === '') {
          return problem(res, 400, 'Missing Idempotency-Key', 'POST /orders requires an Idempotency-Key header.');
        }
        const body = await readJson(req);
        const input = validateOrderBody(body);
        const previous = findByIdempotencyKey(key);
        if (previous) {
          const same = previous.userId === input.userId && previous.restaurantId === input.restaurantId && previous.totalAmount === input.totalAmount && previous.deliveryAddress === input.deliveryAddress;
          if (!same) return problem(res, 409, 'Idempotency conflict', 'The Idempotency-Key was already used for a different order.');
          return json(res, 201, previous.asJson(), { Location: `/orders/${previous.id}` });
        }

        // The order is only persisted after payment succeeds. A retry therefore cannot duplicate a stored order.
        const provisionalId = `pending-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        let payment;
        try {
          payment = await chargePayment({ orderId: provisionalId, amount: input.totalAmount, currency: input.currency, idempotencyKey: key });
        } catch {
          return problem(res, 503, 'Payment service unavailable', 'The payment service could not be reached after safe retries. Please retry with the same Idempotency-Key.');
        }
        if (!payment.ok) {
          if (payment.status === 409) return problem(res, 409, 'Payment conflict', 'The payment service rejected the request as a state conflict.');
          if (payment.status >= 400 && payment.status < 500) return problem(res, 422, 'Payment declined', 'The payment service refused the payment request.');
          return problem(res, 503, 'Payment service unavailable', 'The payment service did not complete the request.');
        }

        const order = createOrder(input, key);
        return json(res, 201, order.asJson(), { Location: `/orders/${order.id}` });
      }

      // GET /orders?status=PLACED
      if (req.method === 'GET' && parts.length === 1) {
        const status = new URL(req.url, 'http://localhost').searchParams.get('status');
        const allowed = ['PLACED', 'CANCELLED', 'DELIVERED'];
        if (status && !allowed.includes(status)) return problem(res, 422, 'Invalid filter', `Unsupported status filter: ${status}.`);
        return json(res, 200, { orders: listOrders(status).map(o => o.asJson()) });
      }

      if (parts.length >= 2) {
        const id = parts[1];
        const order = findById(id);
        if (!order) return problem(res, 404, 'Order not found', `No order exists with id ${id}.`);

        // GET /orders/{id}
        if (req.method === 'GET' && parts.length === 2) return json(res, 200, order.asJson());

        // POST /orders/{id}/cancellation
        if (req.method === 'POST' && parts.length === 3 && parts[2] === 'cancellation') {
          if (!['PLACED'].includes(order.status)) {
            return problem(res, 409, 'Order cannot be cancelled', `Order ${id} is already ${order.status}.`);
          }
          updateStatus(id, 'CANCELLED');
          return json(res, 200, order.asJson());
        }
      }

      return problem(res, 404, 'Not found', 'The requested resource does not exist.');
    } catch (error) {
      if (error instanceof HttpProblem) return problem(res, error.status, error.title, error.detail, error.type);
      return problem(res, 500, 'Internal server error', 'An unexpected server error occurred.');
    }
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 3000);
  createApp().listen(port, () => console.log(`CampusEats Orders REST service listening on http://localhost:${port}`));
}

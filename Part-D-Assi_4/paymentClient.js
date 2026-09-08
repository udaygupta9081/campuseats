import { setTimeout as sleep } from 'node:timers/promises';

const DEFAULT_TIMEOUT_MS = 1200;
const MAX_ATTEMPTS = 3;

export async function chargePayment({ orderId, amount, currency, idempotencyKey }) {
  const baseUrl = process.env.PAYMENT_SERVICE_URL;
  if (!baseUrl) throw new Error('PAYMENT_SERVICE_URL is not configured');

  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Number(process.env.PAYMENT_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS));
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, '')}/payments`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: JSON.stringify({ orderId, amount, currency }),
        signal: controller.signal
      });
      clearTimeout(timer);
      const body = await response.json().catch(() => ({}));

      // 4xx is a business/client failure and is never retried.
      if (response.status >= 400 && response.status < 500) {
        return { ok: false, status: response.status, body };
      }
      if (response.ok) return { ok: true, status: response.status, body };
      lastError = new Error(`Payment service returned ${response.status}`);
    } catch (error) {
      clearTimeout(timer);
      lastError = error;
    }

    if (attempt < MAX_ATTEMPTS) {
      const exponential = 100 * (2 ** (attempt - 1));
      const jitter = Math.floor(Math.random() * 100);
      await sleep(exponential + jitter);
    }
  }
  throw lastError;
}

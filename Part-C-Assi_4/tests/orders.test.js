import test, { before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { createApp } from '../src/app.js';
import { clearStore } from '../src/store.js';

let app;
let paymentServer;
let baseUrl;

before(async () => {
  paymentServer = http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/payments') {
      res.writeHead(201, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ transactionId: 'txn-test', status: 'APPROVED' }));
    } else { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => paymentServer.listen(0, resolve));
  const port = paymentServer.address().port;
  process.env.PAYMENT_SERVICE_URL = `http://127.0.0.1:${port}`;
  app = createApp();
  await new Promise(resolve => app.listen(0, resolve));
  baseUrl = `http://127.0.0.1:${app.address().port}`;
});

beforeEach(() => clearStore());
after(async () => { await new Promise(resolve => app.close(resolve)); await new Promise(resolve => paymentServer.close(resolve)); });

async function createOrder(key = 'test-key') {
  return fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'Idempotency-Key': key },
    body: JSON.stringify({ userId: 1, restaurantId: 10, totalAmount: 250, deliveryAddress: 'Hostel Block A' })
  });
}

test('create succeeds with 201 and Location header', async () => {
  const response = await createOrder('create-1');
  assert.equal(response.status, 201);
  assert.match(response.headers.get('location'), /^\/orders\/\d+$/);
});

test('idempotent repeat returns the original result', async () => {
  const first = await createOrder('repeat-1');
  const firstBody = await first.json();
  const second = await createOrder('repeat-1');
  const secondBody = await second.json();
  assert.equal(second.status, 201);
  assert.deepEqual(secondBody, firstBody);
  assert.equal(second.headers.get('location'), first.headers.get('location'));
});

test('malformed body returns a common 400 problem shape', async () => {
  const response = await fetch(`${baseUrl}/orders`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'Idempotency-Key': 'bad-body' },
    body: '{bad-json'
  });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.deepEqual(Object.keys(body).sort(), ['detail', 'status', 'title', 'type']);
});

test('unknown id returns 404', async () => {
  const response = await fetch(`${baseUrl}/orders/999999`);
  const body = await response.json();
  assert.equal(response.status, 404);
  assert.equal(body.status, 404);
});

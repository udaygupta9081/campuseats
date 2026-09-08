import { randomUUID } from 'node:crypto';
import { Order } from './models.js';

const orders = new Map();
const idempotency = new Map();
let nextId = 1000;

export function createOrder(input, idempotencyKey) {
  const order = new Order({
    ...input,
    id: String(nextId++),
    internalRecordId: randomUUID(),
    idempotencyKey
  });
  orders.set(order.id, order);
  if (idempotencyKey) idempotency.set(idempotencyKey, order.id);
  return order;
}

export function findById(id) { return orders.get(String(id)); }
export function listOrders(status) {
  const all = [...orders.values()];
  return status ? all.filter(o => o.status === status) : all;
}
export function findByIdempotencyKey(key) {
  const id = idempotency.get(key);
  return id ? findById(id) : undefined;
}
export function updateStatus(id, status) {
  const order = findById(id);
  if (order) order.status = status;
  return order;
}
export function clearStore() {
  orders.clear();
  idempotency.clear();
  nextId = 1000;
}

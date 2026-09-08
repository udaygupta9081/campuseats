import { HttpProblem } from './errors.js';

export function validateOrderBody(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new HttpProblem(400, 'Malformed request body', 'Request body must be a JSON object.');
  }

  const required = ['userId', 'restaurantId', 'totalAmount', 'deliveryAddress'];
  for (const field of required) {
    if (!(field in body)) {
      throw new HttpProblem(400, 'Malformed request body', `Missing required field: ${field}.`);
    }
  }

  if (!Number.isInteger(body.userId) || body.userId <= 0 || !Number.isInteger(body.restaurantId) || body.restaurantId <= 0) {
    throw new HttpProblem(422, 'Invalid order data', 'userId and restaurantId must be positive integers.');
  }
  if (typeof body.totalAmount !== 'number' || !Number.isFinite(body.totalAmount) || body.totalAmount <= 0) {
    throw new HttpProblem(422, 'Invalid order data', 'totalAmount must be a positive number.');
  }
  if (typeof body.deliveryAddress !== 'string' || body.deliveryAddress.trim().length < 5) {
    throw new HttpProblem(422, 'Invalid order data', 'deliveryAddress must contain at least 5 characters.');
  }
  if (body.currency !== undefined && (typeof body.currency !== 'string' || !/^[A-Z]{3}$/.test(body.currency))) {
    throw new HttpProblem(422, 'Invalid order data', 'currency must be a three-letter uppercase code.');
  }

  return {
    userId: body.userId,
    restaurantId: body.restaurantId,
    totalAmount: Number(body.totalAmount.toFixed(2)),
    currency: body.currency ?? 'INR',
    deliveryAddress: body.deliveryAddress.trim()
  };
}

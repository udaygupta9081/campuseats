export class Order {
  constructor({ id, userId, restaurantId, totalAmount, currency, deliveryAddress, status = 'PLACED', createdAt = new Date().toISOString(), internalRecordId, idempotencyKey }) {
    this.id = id;
    this.internalRecordId = internalRecordId;
    this.userId = userId;
    this.restaurantId = restaurantId;
    this.totalAmount = totalAmount;
    this.currency = currency;
    this.deliveryAddress = deliveryAddress;
    this.status = status;
    this.createdAt = createdAt;
    this.idempotencyKey = idempotencyKey;
  }

  asJson() {
    return {
      id: this.id,
      userId: this.userId,
      restaurantId: this.restaurantId,
      totalAmount: this.totalAmount,
      currency: this.currency,
      deliveryAddress: this.deliveryAddress,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}

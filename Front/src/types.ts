export type Order = {
  correlationId?: string;
  customerName: string;
  productName: string;
  quantity: string;
  orderCreatedAt?: string | null;
  orderCookingAt?: string | null;
  orderDeliveredAt?: string | null;
  orderFinishAt?: string | null;
}

export type TCardapio = Order & {
  description: string;
  tags: string[];
};

export enum OrderStatusEnum {
  Created,
  Cooking,
  Delivered,
  Finish
}
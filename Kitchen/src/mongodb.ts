import mongoose from 'mongoose';

export enum OrderStatusEnum {
  Created,
  Cooking,
  Delivered,
  Finish
}

export type Order = {
  customerName: string,
  productName: string,
  quantity: string,
  status: number,
  correlationId: String,
}

const orderSchema = new mongoose.Schema({
  customerName: String,
  productName: String,
  quantity: String,
  status: Number,
  correlationId: String,
}, { timestamps: true });

export class SetupMongoDB {
  constructor(){
    this.init();
  }

  async init() {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  }

  model () {
    return mongoose.model('orders', orderSchema);
  }
}
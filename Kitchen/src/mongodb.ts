import mongoose from 'mongoose';

export enum OrderStatusEnum {
  Created,
  Cooking,
  Delivered,
  Finish
}

export type Order = {
  productName: string,
  quantity: string,
  status: number,
}

const orderSchema = new mongoose.Schema({
  productName: String,
  quantity: String,
  status: Number,
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
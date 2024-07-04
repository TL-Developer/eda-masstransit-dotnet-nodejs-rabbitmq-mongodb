import mongoose from 'mongoose';

const orderSchemaModel = new mongoose.Schema({
  customerName: String,
  productName: String,
  quantity: String,
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
    return mongoose.model('orders', orderSchemaModel);
  }
}
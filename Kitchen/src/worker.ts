import { Channel } from "amqplib";
import { SetupMongoDB } from "./mongodb";
import { Logger } from "./logger";
import { Order } from "./Order";

export class Worker {
  private OrdersModel = new SetupMongoDB().model();
  private channel!: Channel;
  private QUEUE: string;

  constructor(channel: Channel, queue: string) {
    this.channel = channel;
    this.QUEUE = queue;

    this.readMessage();
  }

  public async readMessage() {
    this.channel.consume(this.QUEUE, async (msg) => {
      if (msg !== null) {
        const message: Order = JSON.parse(msg.content.toString()).message;

        const newOrder = new this.OrdersModel({
          customerName: message.customerName,
          productName: message.productName,
          quantity: message.quantity,
          correlationId: message.correlationId,
        });
        
        await newOrder.save();

        this.channel.ack(msg);

        Logger.info(`Pedido ${message.productName} cadastrado com sucesso`);
      } else {
        Logger.info('Consumer cancelled by server');
      }
    });
  }
}
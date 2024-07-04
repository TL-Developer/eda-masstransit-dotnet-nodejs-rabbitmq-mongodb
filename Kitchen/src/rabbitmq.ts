import amqplib, { Connection, Channel } from 'amqplib';
import { Worker } from './worker';
import { Logger } from './logger';

export class SetupRabbitMq {
  private connection!: Connection;
  private channel!: Channel;
  private readonly COOKING_QUEUE = 'orders_cooking';

  constructor() {
    this.init();
  }

  private async getConnection() {
    this.connection = await amqplib.connect(
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
  }

  private async createChannel() {
    this.channel = await this.connection.createChannel();
  }

  public async init(): Promise<void> {
    await this.getConnection();
    await this.createChannel();
    await this.channel.assertQueue(this.COOKING_QUEUE);

    new Worker(this.channel, this.COOKING_QUEUE);
  }

  public sendMessage(payload: any) {
    Logger.info('Cooking Order');
    const message = JSON.stringify(payload);
    this.channel.sendToQueue(this.COOKING_QUEUE, Buffer.from(message));
  }
}
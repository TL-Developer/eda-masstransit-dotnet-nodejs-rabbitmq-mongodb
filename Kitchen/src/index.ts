import { PedidoController } from './controller';
import { SetupMongoDB } from './mongodb';
import { SetupRabbitMq } from './rabbitmq';
import { SetupServer } from './server';
require('dotenv').config();

(async (): Promise<void> => {
  const setupServer = new SetupServer(Number(process.env.PORT) || 3000);
  const rbmq = new SetupRabbitMq();
  new SetupMongoDB();
  new PedidoController(setupServer.getApp(), rbmq);
})();
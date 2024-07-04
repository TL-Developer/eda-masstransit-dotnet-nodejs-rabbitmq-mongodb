import { SetupMongoDB } from './mongodb';
import { SetupRabbitMq } from './rabbitmq';
import { SetupServer } from './server';
require('dotenv').config();

(async (): Promise<void> => {
  new SetupServer(Number(process.env.PORT) || 3000);
  new SetupRabbitMq();
  new SetupMongoDB();
})();
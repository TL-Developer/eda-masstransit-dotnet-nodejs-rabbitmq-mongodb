import { Application } from 'express';
import { SetupMongoDB } from './mongodb';

export class PedidoController {
  private app: Application;
  private OrdersModel = new SetupMongoDB().model();
  // private rbmq!: SetupRabbitMq;

  constructor(
    app: Application,
    // rbmq: SetupRabbitMq
  ) {
    this.app = app;
    // this.rbmq = rbmq;
    this.init();
  }

  init() {
    this.getOrders();
    // this.cookingOrder();
  }

  getOrders() {
    this.app.get('/orders', async (req, res) => {
      const orders = await this.OrdersModel.find({});

      res.status(200).json(orders);
    });
  }

  // cookingOrder() {
  //   this.app.post('/orders/:_id', async (req: Request<{ _id: string }>, res: Response) => {
  //     const { _id } = req.params;
  //     const order = await this.OrdersModel.findOne({ _id });

  //     if (!order) {
  //       return res.status(404).send('Order not found');
  //     }

  //     order.status = OrderStatusEnum.Cooking;

  //     order?.save();

  //     this.rbmq.init();
  //     this.rbmq.sendMessage(order);

  //     res.status(200).json(order);
  //   });
  // }
}
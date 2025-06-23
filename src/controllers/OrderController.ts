import { Request, Response } from 'express';
import RequestWithUser from '../interfaces/Request';
const { broadcast } = require('../websocket/broadcaster');

const maxWeight = 3;

class OrderController {
  factory: any;
  droneFactory: any;
  productFactory: any;
  userFactory: any;

  constructor(factory: any) {
    this.factory = factory.createOrderDAO();
    this.droneFactory = factory.createDroneDAO();
    this.productFactory = factory.createProductDAO();
    this.userFactory = factory.createUserDAO();
  }

  async insert(req: RequestWithUser, res: Response) {
    if (!req.user || !req.body.coordinates) {
      broadcast({ type: 'notification', message: 'created', data: req.body.coordinates });
      //TODO: later assign order.droneId with the drone that took the order
      res.sendStatus(500);
      return;
    }

    try {
      const now = new Date();
      const drones = await this.droneFactory.find({ status: 'available' });
      if (drones.length === 0) {
        console.error('No drone available');
        res.sendStatus(500);
        return;
      } else {
        const drone = drones[0];
        await this.droneFactory.update(drone._id, {
          status: 'waiting',
        });

        const productsTmp = [];
        const productIdsTmp: { _id: any; stock: number; quantity: number }[] = [];
        let totalPrice = 0;
        let totalWeight = 0;

        const productCount: { [key: string]: number } = {};
        for (const productId of req.user.cartId) {
          productCount[productId] = (productCount[productId] || 0) + 1;
        }

        for (const productId in productCount) {
          const p = await this.productFactory.findOne({ _id: productId });
          if (p) {
            if (p.stock < productCount[productId]) {
              console.error(`Product ${p._id} does not have enough stock`);
              res.sendStatus(400);
              return;
            } else {
              productIdsTmp.push({ _id: p._id, stock: p.stock, quantity: productCount[productId] });
              totalPrice += p.price * productCount[productId];
              totalWeight += p.weight * productCount[productId];
            }
          }
        }

        if (totalWeight > maxWeight) {
          console.error('Order exceeds maximum weight limit');
          res.sendStatus(400);
          return;
        }

        for (const p of productIdsTmp) {
          const updatedProduct = await this.productFactory.update(p._id, {
            stock: p.stock - p.quantity,
          });

          productsTmp.push(updatedProduct);
        }

        if (this.userFactory && req.user._id) {
          await this.userFactory.update(req.user._id, { cartId: [] });
        }

        const order = await this.factory.insert({
          droneId: drone._id,
          userId: req.user._id,
          dateOrder: now,
          status: 'created',
          products: productsTmp,
          deliveryCoordinates: req.body.coordinates,
          price: totalPrice,
        });

        res.json(order);
      }
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async update(req: Request, res: Response) {
    if (!req.body._id || (!req.body.droneId && !req.body.status)) {
      res.sendStatus(500);
      return;
    }

    try {
      const order = await this.factory.findOne({ _id: req.body._id });
      if (!order) {
        res.sendStatus(404);
        return;
      }

      const newOrder = await this.factory.update(order._id, {
        status: req.body.status || order.status,
        droneId: req.body.droneId || order.droneId,
      });

      if (newOrder.status === 'cancelled') {
        broadcast({ type: 'notification', message: 'cancelled' });
      }

      if (newOrder.status === 'completed') {
        broadcast({ type: 'notification', message: 'completed' });
      }

      res.json(newOrder);
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async delete(req: Request, res: Response) {
    if (!req.params.id) {
      res.sendStatus(500);
      return;
    }

    try {
      const orderToDelete = await this.factory.findOne({ _id: req.params.id });
      if (!orderToDelete) {
        res.sendStatus(404);
        return;
      }

      await this.factory.delete(orderToDelete._id);
      await this.droneFactory.update(orderToDelete.droneId, {
        status: 'available',
      });

      for (const product of orderToDelete.products) {
        const p = await this.productFactory.findOne({ id: product._id });
        if (p) {
          await this.productFactory.update(p._id, {
            stock: p.stock + 1,
          });
        }
      }

      res.sendStatus(200);
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async findAll(req: RequestWithUser, res: Response) {
    try {
      const orders = await this.factory.find();
      res.json(orders);
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async find(req: RequestWithUser, res: Response) {
    try {
      const orders = await this.factory.find({ userId: req.user._id });
      res.json(orders);
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async findOne(req: Request, res: Response) {
    if (!req.params.id) {
      res.sendStatus(404);
      return;
    }

    try {
      const order = await this.factory.findOne({ _id: req.params.id });
      res.json(order);
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }
}

export { OrderController };

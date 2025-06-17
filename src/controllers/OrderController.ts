import { Request, Response } from 'express';
import RequestWithUser from '../interfaces/Request';
const { broadcast } = require('../websocket/broadcaster');

class OrderController {
  factory: any;
  droneFactory: any;
  productFactory: any;

  constructor(factory: any) {
    this.factory = factory.createOrderDAO();
    this.droneFactory = factory.createDroneDAO();
    this.productFactory = factory.createProductDAO();
  }

  async insert(req: RequestWithUser, res: Response) {
    if (
      !req.body.products ||
      req.body.products.length === 0 ||
      !req.user ||
      !req.body.price ||
      !req.body.coordinates
    ) {
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
        const productIdsTmp = [];
        for (const product of req.body.products) {
          const p = await this.productFactory.findOne({ _id: product._id });
          if (p) {
            if (p.stock === 0) {
              res.sendStatus(400);
              return;
            } else {
              productIdsTmp.push({ _id: p._id, stock: p.stock });
            }
          }
        }
        for (const p of productIdsTmp) {
          const updatedProduct = await this.productFactory.update(p._id, {
            stock: p.stock - 1,
          });

          productsTmp.push(updatedProduct);
        }

        const order = await this.factory.insert({
          droneId: drone._id,
          userId: req.user._id,
          dateOrder: now,
          status: 'created',
          products: productsTmp,
          deliveryCoordinates: req.body.coordinates,
          price: req.body.price,
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

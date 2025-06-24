import request from 'supertest';
import express, { Express } from 'express';
import { OrderRouter } from '../routers/OrderRouter';
import { OrderController } from '../controllers/OrderController';

// Mock de l'authentification
jest.mock('../utils/auth', () => ({
  auth: {
    authenticate: () => (req: any, res: any, next: any) => {
      req.user = { _id: 'user123', cartId: [] }; // Ajout d'un user mocké
      next();
    },
  },
}));

describe('OrderRouter', () => {
  let app: Express;
  let controller: OrderController;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Mock du controller
    controller = {
      find: jest.fn((req, res) => res.status(200).json([{ id: 'order1' }])),
      findAll: jest.fn((req, res) => res.status(200).json([{ id: 'order1' }, { id: 'order2' }])),
      insert: jest.fn((req, res) => res.status(201).json({ id: 'newOrder' })),
      update: jest.fn((req, res) => res.status(200).json({ id: req.body._id })),
      delete: jest.fn((req, res) => res.status(204).send()),
      findOne: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
    } as unknown as OrderController;

    const orderRouter = new OrderRouter(controller);
    app.use('/orders', orderRouter.router);
  });

  describe('GET /orders', () => {
    it('should return user orders', async () => {
      const res = await request(app).get('/orders');

      expect(res.status).toBe(200);
      expect(controller.find).toHaveBeenCalled();
      expect(res.body).toEqual([{ id: 'order1' }]);
    });
  });

  describe('GET /orders/all', () => {
    it('should return all orders', async () => {
      const res = await request(app).get('/orders/all');

      expect(res.status).toBe(200);
      expect(controller.findAll).toHaveBeenCalled();
      expect(res.body).toEqual([{ id: 'order1' }, { id: 'order2' }]);
    });
  });

  describe('PUT /orders', () => {
    it('should create a new order', async () => {
      const res = await request(app)
        .put('/orders')
        .send({ coordinates: [1, 2] });

      expect(res.status).toBe(201);
      expect(controller.insert).toHaveBeenCalled();
      expect(res.body).toEqual({ id: 'newOrder' });
    });
  });

  describe('POST /orders', () => {
    it('should update an order', async () => {
      const res = await request(app).post('/orders').send({ _id: 'order123', status: 'completed' });

      expect(res.status).toBe(200);
      expect(controller.update).toHaveBeenCalled();
      expect(res.body).toEqual({ id: 'order123' });
    });
  });

  describe('GET /orders/:id', () => {
    it('should return a specific order', async () => {
      const res = await request(app).get('/orders/order123');

      expect(res.status).toBe(200);
      expect(controller.findOne).toHaveBeenCalled();
      expect(res.body).toEqual({ id: 'order123' });
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete an order', async () => {
      const res = await request(app).delete('/orders/order123');

      expect(res.status).toBe(204);
      expect(controller.delete).toHaveBeenCalled();
    });
  });
});

import express, { Express } from 'express';
import request from 'supertest';
import { CategoryRouter } from '../routers/CategoryRouter';
import { CategoryController } from '../controllers/CategoryController';

jest.mock('../utils/auth', () => ({
  auth: {
    authenticate: () => (req: any, res: any, next: any) => next(),
  },
}));

const mockAuthorizeAdminOnly = (req: any, res: any, next: any) => next();

describe('CategoryRouter', () => {
  let app: Express;
  let controller: CategoryController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.locals.authorizeAdminOnly = mockAuthorizeAdminOnly;

    controller = {
      find: jest.fn((req, res) => res.status(200).json([{ name: 'cat1' }])),
      insert: jest.fn((req, res) => res.status(201).json({ name: req.body.name })),
      update: jest.fn((req, res) => res.status(200).json({ name: req.body.name })),
      findOne: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
      delete: jest.fn((req, res) => res.status(204).send()),
    } as unknown as CategoryController;

    const categoryRouter = new CategoryRouter(app, controller);
    app.use('/categories', categoryRouter.router);
  });

  it('GET /categories should call controller.find', async () => {
    const res = await request(app).get('/categories');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ name: 'cat1' }]);
    expect(controller.find).toHaveBeenCalled();
  });

  it('PUT /categories should call controller.insert', async () => {
    const res = await request(app).put('/categories').send({ name: 'New Category' });

    expect(res.status).toBe(201);
    expect(controller.insert).toHaveBeenCalled();
  });

  it('GET /categories/:id should call controller.findOne', async () => {
    const res = await request(app).get('/categories/abc123');
    expect(res.status).toBe(200);
    expect(controller.findOne).toHaveBeenCalled();
  });

  it('DELETE /categories/:id should call controller.delete', async () => {
    const res = await request(app).delete('/categories/abc123');
    expect(res.status).toBe(204);
    expect(controller.delete).toHaveBeenCalled();
  });
});

import express, { Express } from 'express';
import request from 'supertest';
import { ProductRouter } from '../routers/ProductRouter';
import { ProductController } from '../controllers/ProductController';

jest.mock('../utils/auth', () => ({
  auth: {
    authenticate: () => (req: any, res: any, next: any) => next(),
  },
}));

// Fake multer middleware to bypass file upload in tests
jest.mock('multer', () => {
  return {
    __esModule: true,
    default: () => ({
      single: () => (req: any, res: any, next: any) => {
        req.file = { filename: 'mocked-file.jpg' };
        next();
      },
    }),
    diskStorage: jest.fn().mockImplementation(() => ({
      _handleFile: (req: any, file: any, cb: any) => {
        cb(null, { filename: 'mocked-file.jpg' });
      },
      _removeFile: (req: any, file: any, cb: any) => {
        cb(null);
      }
    })),
  };
});

describe('ProductRouter', () => {
  let app: Express;
  let controller: ProductController;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.locals.authorizeAdminOnly = (req: any, res: any, next: any) => next();

    controller = {
      find: jest.fn((req, res) => res.status(200).json([{ name: 'Test Product' }])),
      insert: jest.fn((req, res) => res.status(201).json({ name: req.body.name })),
      update: jest.fn((req, res) => res.status(200).json({ name: req.body.name })),
      delete: jest.fn((req, res) => res.status(204).send()),
      findOne: jest.fn((req, res) => res.status(200).json({ id: req.params.id })),
      getStar: jest.fn((req, res) => res.status(200).json([{ name: 'Star Product' }])),
    } as unknown as ProductController;

    const productRouter = new ProductRouter(app, controller);
    app.use('/products', productRouter.router);
  });

  it('GET /products should return products', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(controller.find).toHaveBeenCalled();
  });

  it('PUT /products should insert a product', async () => {
    const res = await request(app)
      .put('/products')
      .field('name', 'Product A')
      .field('price', '10')
      .field('description', 'desc')
      .field('stock', '5')
      .field('weight', '0.5')
      .field('categoryId', 'cat123');

    expect(res.status).toBe(201);
    expect(controller.insert).toHaveBeenCalled();
  });

  it('POST /products should update a product', async () => {
    const res = await request(app)
      .post('/products')
      .field('_id', 'abc123')
      .field('name', 'Updated Product')
      .field('price', '15')
      .field('description', 'Updated desc')
      .field('stock', '10')
      .field('weight', '0.7')
      .field('categoryId', 'cat456')
      .field('imageUrl', 'existing.jpg');

    expect(res.status).toBe(200);
    expect(controller.update).toHaveBeenCalled();
  });

  it('GET /products/star should return starred products', async () => {
    const res = await request(app).get('/products/star');
    expect(res.status).toBe(200);
    expect(controller.getStar).toHaveBeenCalled();
  });

  it('GET /products/:id should return a product', async () => {
    const res = await request(app).get('/products/12345');
    expect(res.status).toBe(200);
    expect(controller.findOne).toHaveBeenCalled();
  });

  it('DELETE /products/:id should delete a product', async () => {
    const res = await request(app).delete('/products/12345');
    expect(res.status).toBe(204);
    expect(controller.delete).toHaveBeenCalled();
  });
});

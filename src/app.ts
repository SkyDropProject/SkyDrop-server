import express, { NextFunction, Response } from 'express';
import { config } from './utils/config';
import http from 'http';
import { mongoConnection } from './utils/mongoConnection';
import { DAOMongoFactory } from './DAO/DAOMongoFactory';
import { ProductController } from './controllers/ProductController';
import { ProductRouter } from './routers/ProductRouter';
import { UserController } from './controllers/UserController';
import { UserRouter } from './routers/UserRouter';
import { OrderController } from './controllers/OrderController';
import { OrderRouter } from './routers/OrderRouter';
import { CategoryController } from './controllers/CategoryController';
import { CategoryRouter } from './routers/CategoryRouter';
import cors from 'cors';
import RequestWithUser from './interfaces/Request';
import { auth } from './utils/auth';
import { DroneController } from './controllers/DroneController';
import { DroneRouter } from './routers/DroneRouter';
import { TransactionController } from './controllers/TransactionController';
import { TransactionRouter } from './routers/TransactionRouter';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:8081', 'http://localhost:5173'],
    credentials: true,
  })
);
const PORT = config.PORT;
app.use(express.json());

app.locals.authorizeAdminOnly = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
    return;
  }

  res.sendStatus(401);
};

(async () => {
  let bddConnected: boolean = false;
  while (!bddConnected) {
    try {
      await mongoConnection();
      bddConnected = true;
    } catch (err: any) {
      console.log('BDD CONNECTION ERROR : ', err);
      bddConnected = false;
    }
  }

  const factory = new DAOMongoFactory();

  const productController = new ProductController(factory);
  const userController = new UserController(factory);
  const orderController = new OrderController(factory);
  const categoryController = new CategoryController(factory);
  const droneController = new DroneController(factory);
  const transactionController = new TransactionController(factory);

  app.use('/product', new ProductRouter(app, productController).router);
  app.use('/user', new UserRouter(userController).router);
  app.use('/order', new OrderRouter(orderController).router);
  app.use('/category', new CategoryRouter(app, categoryController).router);
  app.use('/drone', new DroneRouter(app, droneController).router);
  app.use('/transaction', new TransactionRouter(app, transactionController).router);
  app.use('/uploads', express.static('public/uploads'));

  const server = http.createServer(app);
  server.setTimeout(24 * 3600 * 1000);
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Server listening on PORT', PORT);
  });
})();

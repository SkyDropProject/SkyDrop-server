import express from 'express';
import { config } from './utils/config';
import http from 'http';
import { mongoConnection } from './utils/mongoConnection';
import { DAOMongoFactory } from './DAO/DAOMongoFactory';
import { ProductController } from './controllers/ProductController';
import { ProductRouter } from './routers/ProductRouter';
import { UserController } from './controllers/UserController';
import { UserRouter } from './routers/UserRouter';

const app = express();
const PORT = config.PORT;

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

  app.use('/product', new ProductRouter(productController).router);
  app.use('/user', new UserRouter(userController).router);

  const server = http.createServer(app);
  server.setTimeout(24 * 3600 * 1000);
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Server listening on PORT', PORT);
  });
})();

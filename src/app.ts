import express from 'express';
import { config } from './utils/config';
import http from 'http';
import { mongoConnection } from './utils/mongoConnection';
import { DAOMongoFactory } from './DAO/DAOMongoFactory';
import { ProductController } from './controllers/ProductController';
import { ProductRouter } from './routers/ProductRouter';

const app = express();
const PORT = config.PORT;

// BDD CONNECTION
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

  // FACTORIES

  const factory = new DAOMongoFactory();

  const productController = new ProductController(factory);

  // ROUTE INITIALIZATION

  app.use('/product', new ProductRouter(productController).router);

  // SERVER INITIALIZATION

  const server = http.createServer(app);
  server.setTimeout(24 * 3600 * 1000);
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Server listening on PORT', PORT);
  });
})();

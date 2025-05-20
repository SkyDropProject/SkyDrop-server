import express, { Request, Response } from 'express';
import { config } from './utils/config';
import http from 'http';
import { mongoConnection } from './utils/mongoConnection';

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

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript server!');
  });

  const server = http.createServer(app);
  server.setTimeout(24 * 3600 * 1000);
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('Server listening on PORT', PORT);
  });
})();

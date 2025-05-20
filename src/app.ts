import express from 'express';
import { config } from './helpers/config';
import http from 'http';

const app = express();
const PORT = config.PORT;

app.get('/', (req, res) => {
  res.send('Hello from TypeScript server!');
});

const server = http.createServer(app);
server.setTimeout(24 * 3600 * 1000);
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server listening on PORT', PORT);
});

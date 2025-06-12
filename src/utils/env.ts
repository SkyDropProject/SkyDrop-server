import * as dotenv from 'dotenv';
import * as path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';

const envFile = `.env.${NODE_ENV}`;
const envPath = path.resolve(__dirname, './../../', envFile);

dotenv.config({ path: envPath });

export const env = {
  NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
};

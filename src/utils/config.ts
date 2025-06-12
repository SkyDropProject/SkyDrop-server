import { configType } from '../types/config';
import { env } from './env';

const config: configType = {
  PORT: Number(env.PORT) || 3001,
  mongoPath: env.MONGO_URL || 'mongodb://skydrop:ulysseetchatgptnefontq1@127.0.0.1:27018/',
  jwtSecret: env.JWT_SECRET || 'fallback-secret-token-for-dev',
  jwtSession: {
    session: false,
  },
  saltRounds: Number(env.SALT_ROUNDS) || 3001,
  uploadPath: 'public/uploads',
};

export { config };

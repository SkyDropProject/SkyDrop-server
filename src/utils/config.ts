import { configType } from '../types/config';

const config: configType = {
  PORT: Number(process.env.PORT) || 3001,
  mongoPath: process.env.MONGO_URL || 'mongodb://skydrop:ulysseetchatgptnefontq1@127.0.0.1:27017/',
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-token-for-dev',
  jwtSession: {
    session: false,
  },
  saltRounds: 10,
  uploadPath: 'public/uploads',
};

export { config };

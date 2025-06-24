import { configType } from '../types/config';
import { env } from './env';

const config: configType = {
  PORT: Number(env.PORT),
  mongoPath: env.MONGO_URL || '',
  jwtSecret: env.JWT_SECRET || '',
  jwtSession: {
    session: false,
  },
  saltRounds: Number(env.SALT_ROUNDS),
  uploadPath: 'public/uploads',
  maxWeight : 3000
};

export { config };

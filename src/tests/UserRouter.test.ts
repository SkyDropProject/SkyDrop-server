jest.mock('../utils/auth', () => ({
  auth: {
    authenticate: () => (_req: any, _res: any, next: any) => next()
  }
}));

import express from 'express';
import request from 'supertest';
import { UserRouter } from '../routers/UserRouter';
import { UserController } from '../controllers/UserController';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Mock les fonctions externes
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

import mongoose from 'mongoose';

const mockUser = {
  //_id: new mongoose.Types.ObjectId(),
  _id: '1234', 
  email: 'test@example.com',
  password: 'hashedpass',
  isAdmin: false
};

// Mock de la factory
const mockDAO = {
  findOne: jest.fn().mockResolvedValue(mockUser),
};

const mockFactory = {
  createUserDAO: () => mockDAO,
};

describe('UserRouter - login', () => {
  let app: express.Application;

  beforeEach(() => {
    const controller = new UserController(mockFactory);
    const userRouter = new UserRouter(controller);
    app = express();
    app.use(express.json());
    app.use('/', userRouter.router);
  });

  it('should return token and user on valid login', async () => {
    // mock password comparison et jwt
    (bcrypt.compare as jest.Mock).mockImplementation((a, b, cb) => cb(null, true));
    (jwt.sign as jest.Mock).mockImplementation((_payload, _secret, _opts, cb) => cb(null, 'mocked-jwt-token'));

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('mocked-jwt-token');
    expect(response.body.user._id).toBe(mockUser._id);
  });

  it('should return 401 on bad password', async () => {
    (bcrypt.compare as jest.Mock).mockImplementation((a, b, cb) => cb(null, false));

    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'wrongpass' });

    expect(response.status).toBe(401);
  });

  it('should return 500 if user not found', async () => {
    mockDAO.findOne.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/login')
      .send({ email: 'nouser@example.com', password: 'password' });

    expect(response.status).toBe(500);
  });
});

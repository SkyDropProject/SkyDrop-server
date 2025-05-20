import express, { Request, Response, Router } from 'express';
import { auth } from './../utils/auth';
import { UserController } from '../controllers/UserController';

class UserRouter {
  public router: Router;

  constructor(userController: UserController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(auth, async (req: Request, res: Response) => {
        await userController.find(req, res);
      })
      .put(auth, async (req: Request, res: Response) => {
        await userController.insert(req, res);
      })
      .post(auth, async (req: Request, res: Response) => {
        await userController.update(req, res);
      });

    this.router
      .route('/:id')
      .get(auth, async (req: Request, res: Response) => {
        await userController.findOne(req, res);
      })
      .delete(auth, async (req: Request, res: Response) => {
        await userController.delete(req, res);
      });
  }
}

export { UserRouter };

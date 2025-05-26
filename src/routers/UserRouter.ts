import express, { Request, Response, Router } from 'express';
import { auth } from './../utils/auth';
import { UserController } from '../controllers/UserController';

class UserRouter {
  public router: Router;

  constructor(userController: UserController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await userController.find(req, res);
      })
      .put(async (req: Request, res: Response) => {
        await userController.register(req, res);
      })
      .post(auth.authenticate(), async (req: Request, res: Response) => {
        await userController.update(req, res);
      });

    this.router
      .route('/:id')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await userController.findOne(req, res);
      })
      .delete(auth.authenticate(), async (req: Request, res: Response) => {
        await userController.delete(req, res);
      });

    this.router.route('/login').post(async (req: Request, res: Response) => {
      await userController.login(req, res);
    });

    this.router
      .route('/verify-account')
      .post(auth.authenticate(), async (req: Request, res: Response) => {
        await userController.verifyAccount(req, res);
      });
  }
}

export { UserRouter };

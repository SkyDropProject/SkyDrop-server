import express, { Request, Response, Router } from 'express';
import { auth } from './../utils/auth';
import { CategoryController } from '../controllers/CategoryController';

class CategoryRouter {
  public router: Router;

  constructor(categoryController: CategoryController) {
    this.router = express.Router();

    this.router.route('/').get(auth, async (req: Request, res: Response) => {
      await categoryController.find(req, res);
    });
  }
}

export { CategoryRouter };

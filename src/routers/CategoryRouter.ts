import express, { Request, Response, Router, Express } from 'express';
import { auth } from './../utils/auth';
import { CategoryController } from '../controllers/CategoryController';

class CategoryRouter {
  public router: Router;

  constructor(app: Express, categoryController: CategoryController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await categoryController.find(req, res);
      })
      .put(
        auth.authenticate(),
        app.locals.authorizeAdminOnly,
        async (req: Request, res: Response) => {
          await categoryController.insert(req, res);
        }
      )
      .post(
        auth.authenticate(),
        app.locals.authorizeAdminOnly,
        async (req: Request, res: Response) => {
          await categoryController.update(req, res);
        }
      );

    this.router
      .route('/:id')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await categoryController.findOne(req, res);
      })
      .delete(
        auth.authenticate(),
        app.locals.authorizeAdminOnly,
        async (req: Request, res: Response) => {
          await categoryController.delete(req, res);
        }
      );
  }
}

export { CategoryRouter };

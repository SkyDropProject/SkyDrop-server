import express, { Request, Response, Router, Express } from 'express';
import { auth } from './../utils/auth';
import { TransactionController } from '../controllers/TransactionController';

class TransactionRouter {
  public router: Router;

  constructor(app: Express, transactionController: TransactionController) {
    this.router = express.Router();

    this.router.route('/').get(async (req: Request, res: Response) => {
      await transactionController.find(req, res);
    });

    this.router
      .route('/:id')
      .get(
        auth.authenticate(),
        app.locals.authorizeAdminOnly,
        async (req: Request, res: Response) => {
          await transactionController.findOne(req, res);
        }
      );
  }
}

export { TransactionRouter };

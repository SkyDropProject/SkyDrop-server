import express, { Request, Response, Router } from 'express';
import { auth } from './../utils/auth';
import { OrderController } from '../controllers/OrderController';

class OrderRouter {
  public router: Router;

  constructor(orderController: OrderController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(auth.authenticate(), async (req: any, res: Response) => {
        await orderController.find(req, res);
      })
      .put(auth.authenticate(), async (req: any, res: Response) => {
        await orderController.insert(req, res);
      })
      .post(auth.authenticate(), async (req: Request, res: Response) => {
        await orderController.update(req, res);
      });

    this.router.route('/all').get(auth.authenticate(), async (req: any, res: Response) => {
      await orderController.findAll(req, res);
    });
    this.router
      .route('/completed/:id')
      .get(auth.authenticate(), async (req: any, res: Response) => {
        await orderController.completed(req, res);
      });
    this.router
      .route('/:id')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await orderController.findOne(req, res);
      })
      .delete(auth.authenticate(), async (req: Request, res: Response) => {
        await orderController.delete(req, res);
      });
  }
}

export { OrderRouter };

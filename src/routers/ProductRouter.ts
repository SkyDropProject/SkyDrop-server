import express, { Request, Response, Router } from 'express';
import { auth } from './../utils/auth';
import { ProductController } from '../controllers/ProductController';

class ProductRouter {
  public router: Router;

  constructor(productController: ProductController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(auth, async (req: Request, res: Response) => {
        await productController.find(req, res);
      })
      .put(auth, async (req: Request, res: Response) => {
        await productController.insert(req, res);
      })
      .post(auth, async (req: Request, res: Response) => {
        await productController.update(req, res);
      });

    this.router
      .route('/:id')
      .get(auth, async (req: Request, res: Response) => {
        await productController.findOne(req, res);
      })
      .delete(auth, async (req: Request, res: Response) => {
        await productController.delete(req, res);
      });
  }
}

export { ProductRouter };

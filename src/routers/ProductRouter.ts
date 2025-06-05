import express, { Request, Response, Router } from 'express';
import { auth } from './../utils/auth';
import { ProductController } from '../controllers/ProductController';
import multer from 'multer';
import path from 'path';
import { config } from '../utils/config';

const storage = multer.diskStorage({
  destination: (req:Request, file:any, cb:Function) => {
    cb(null, config.uploadPath)
  },
  filename: (req:Request, file:any, cb:Function) => {
    const ext = path.extname(file.originalname)
    const baseName = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, baseName + ext)
  }
})

const upload = multer({ storage: storage })

class ProductRouter {
  public router: Router;

  constructor(productController: ProductController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await productController.find(req, res);
      })
      .put(auth.authenticate(), upload.single("image"), async (req: Request, res: Response) => {
        await productController.insert(req, res);
      })
      .post(auth.authenticate(), upload.single("image"), async (req: Request, res: Response) => {
        await productController.update(req, res);
      });

    this.router
      .route('/:id')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await productController.findOne(req, res);
      })
      .delete(auth.authenticate(), async (req: Request, res: Response) => {
        await productController.delete(req, res);
      });

    this.router
      .route('/star')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await productController.getStar(req, res);
      })
  }
}

export { ProductRouter };

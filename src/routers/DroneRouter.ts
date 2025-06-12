import express, { Request, Response, Router, Express } from 'express';
import { auth } from './../utils/auth';
import { DroneController } from '../controllers/DroneController';

class DroneRouter {
  public router: Router;

  constructor(app: Express, droneController: DroneController) {
    this.router = express.Router();

    this.router
      .route('/')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await droneController.find(req, res);
      })
      .put(
        auth.authenticate(),
        app.locals.authorizeAdminOnly,
        async (req: Request, res: Response) => {
          await droneController.insert(req, res);
        }
      )
      .post(
        auth.authenticate(),
        app.locals.authorizeAdminOnly,
        async (req: Request, res: Response) => {
          await droneController.update(req, res);
        }
      );

    this.router
      .route('/:id')
      .get(auth.authenticate(), async (req: Request, res: Response) => {
        await droneController.findOne(req, res);
      })
      .delete(
        auth.authenticate(),
        app.locals.authorizeAdminOnly,
        async (req: Request, res: Response) => {
          await droneController.delete(req, res);
        }
      );
  }
}

export { DroneRouter };

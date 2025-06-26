import { Request, Response } from 'express';

const originCoords = { x: 44.13, y: 4.1 };

class DroneController {
  factory: any;
  orderFactory: any;

  constructor(factory: any) {
    this.factory = factory.createDroneDAO();
    this.orderFactory = factory.createOrderDAO();
  }

  async insert(req: Request, res: Response) {
    if (!req.body.name) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .insert({
        name: req.body.name,
        status: 'available',
        coordinates: { x: 0, y: 0 },
      })
      .then((drone: any) => {
        res.json(drone);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async update(req: Request, res: Response) {
    console.log('Updating drone:', req.body);
    if (!req.body._id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((drone: any) => {
        if (!drone) {
          res.sendStatus(500);
          return;
        }

        this.orderFactory.findOne({ droneId: drone._id }).then((order: any) => {

          let newCoords = req.body.coordinates || originCoords;

          if(req.body.completion){
            // Parse completion percentage (e.g., '99,60779%' -> 99.60779)
            const completionStr = req.body.completion.replace('%', '').replace(',', '.');
            const completion = Math.min(Math.max(parseFloat(completionStr), 0), 100) / 100;

            if (order && order.deliveryCoordinates) {
              newCoords = {
                x: originCoords.x + (order.deliveryCoordinates.x - originCoords.x) * completion,
                y: originCoords.y + (order.deliveryCoordinates.y - originCoords.y) * completion,
              };
            }
          }
          this.factory
          .update(drone._id, {
            name: req.body.name,
            status: req.body.status,
            coordinates: newCoords,
          })
          .then((droneUpdated: any) => {
            res.json(droneUpdated);
          })
          .catch((err: any) => {
            console.log(err);
            res.sendStatus(500);
            return;
          });
        });

        
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async delete(req: Request, res: Response) {
    if (!req.params.id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.params.id })
      .then((drone: any) => {
        if (!drone) {
          res.sendStatus(500);
          return;
        }

        this.factory
          .delete(drone._id)
          .then((result: any) => {
            res.json(result);
          })
          .catch((err: any) => {
            console.log(err);
            res.sendStatus(500);
            return;
          });
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async find(req: Request, res: Response) {
    this.factory
      .find({})
      .then((drones: any) => {
        if (!drones) {
          res.sendStatus(500);
          return;
        }

        res.json(drones);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async findOne(req: Request, res: Response) {
    if (!req.params.id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.params.id })
      .then((drone: any) => {
        if (!drone) {
          res.sendStatus(500);
          return;
        }

        res.json(drone);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }
}

export { DroneController };

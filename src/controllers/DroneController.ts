import { Request, Response } from 'express';

class DroneController {
  factory: any;

  constructor(factory: any) {
    this.factory = factory.createDroneDAO();
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
    if (!req.body.name || !req.body._id || !req.body.status || !req.body.coordinates) {
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

        this.factory
          .update(drone._id, {
            name: req.body.name,
            status: req.body.status,
            coordinates: req.body.coordinates,
          })
          .then((droneUpdated: any) => {
            res.json(droneUpdated);
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

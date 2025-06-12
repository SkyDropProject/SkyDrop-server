import { Request, Response } from 'express';

class TransactionController {
  factory: any;

  constructor(factory: any) {
    this.factory = factory.createTransactionDAO();
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
      .then((transaction: any) => {
        res.json(transaction);
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
      .then((transactions: any) => {
        if (!transactions) {
          res.sendStatus(500);
          return;
        }

        res.json(transactions);
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
      .then((transaction: any) => {
        if (!transaction) {
          res.sendStatus(500);
          return;
        }

        res.json(transaction);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }
}

export { TransactionController };

import { Request, Response } from 'express';

class TransactionController {
  factory: any;

  constructor(factory: any) {
    this.factory = factory.createTransactionDAO();
  }

  async insert(req: Request, res: Response) {
    if (!req.body.slug) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .insert({
        slug: req.body.slug,
        user: req.body.user,
        date: req.body.date || new Date(),
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

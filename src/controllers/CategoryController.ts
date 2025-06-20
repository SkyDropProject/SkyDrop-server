import { Request, Response } from 'express';

class CategoryController {
  factory: any;

  constructor(factory: any) {
    this.factory = factory.createCategoryDAO();
  }

  async insert(req: Request, res: Response) {
    if (!req.body.name) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .insert({
        name: req.body.name,
      })
      .then((category: any) => {
        res.json(category);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async update(req: Request, res: Response) {
    if (!req.body.name || !req.body._id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((category: any) => {
        if (!category) {
          res.sendStatus(500);
          return;
        }

        this.factory
          .update(category._id, {
            name: req.body.name,
          })
          .then((categoryUpdated: any) => {
            res.json(categoryUpdated);
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
    if (!req.params._id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.params._id })
      .then((category: any) => {
        if (!category) {
          res.sendStatus(500);
          return;
        }

        this.factory
          .delete(category._id)
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
      .then((categories: any) => {
        if (!categories) {
          res.sendStatus(500);
          return;
        }

        res.json(categories);
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
      .then((category: any) => {
        if (!category) {
          res.sendStatus(500);
          return;
        }

        res.json(category);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }
}

export { CategoryController };

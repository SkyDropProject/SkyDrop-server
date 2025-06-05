import { Request, Response } from 'express';

class ProductController {
  factory: any;
  categoryFactory: any;

  constructor(factory: any) {
    this.factory = factory.createProductDAO();
    this.categoryFactory = factory.createCategoryDAO();
  }

  async insert(req: any, res: Response) {
    if (
      !req.body.name ||
      !req.body.price ||
      !req.body.description ||
      !req.body.stock ||
      !req.body.weight ||
      !req.body.categoryId ||
      !req.file
    ) {
      res.sendStatus(500);
      return;
    }

    try {
      let product = await this.factory.insert({
        name: req.body.name,
        imageUrl: !req.file.filename,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        weight: req.body.weight,
        star: !!req.body.star,
        categoryId: req.body.categoryId,
      });

      res.json(product);
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async update(req: any, res: Response) {
    if (
      !req.body._id ||
      !req.body.name ||
      !req.body.price ||
      !req.body.description ||
      !req.body.stock ||
      !req.body.weight ||
      !req.body.categoryId ||
      !(req.file || req.body.imageUrl)
    ) {
      res.sendStatus(500);
      return;
    }

    try {
      this.factory.findOne({ _id: req.body._id }).then(async (result: any) => {
        if (!result) {
          res.sendStatus(500);
          return;
        }

        let product = await this.factory.update(req.body._id, {
          name: req.body.name,
          imageUrl: req.file ? req.file.filename : req.body.imageUrl,
          price: req.body.price,
          description: req.body.description,
          stock: req.body.stock,
          weight: req.body.weight,
          star: !!req.body.star,
          categoryId: req.body.categoryId,
        });

        res.json(product);
      });
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async delete(req: Request, res: Response) {
    if (!req.params._id) {
      res.sendStatus(500);
      return;
    }

    try {
      this.factory.findOne({ _id: req.params._id }).then(async (result: any) => {
        if (!result) {
          res.sendStatus(500);
          return;
        }

        let product = await this.factory.delete(req.params._id);

        res.json(product);
      });
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async find(req: Request, res: Response) {
    try {
      this.factory.find({}).then(async (result: any) => {
        if (!result) {
          res.sendStatus(500);
          return;
        }

        res.json(result);
      });
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async getStar(req: Request, res: Response) {
    try {
      this.factory.find({ star: true }).then(async (result: any) => {
        if (!result) {
          res.sendStatus(500);
          return;
        }

        res.json(result);
      });
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }

  async findOne(req: Request, res: Response) {
    if (!req.params.id) {
      res.sendStatus(500);
      return;
    }

    try {
      this.factory.findOne({ _id: req.params.id }).then(async (result: any) => {
        if (!result) {
          res.sendStatus(500);
          return;
        }

        res.json(result);
      });
    } catch (err: any) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
  }
}

export { ProductController };

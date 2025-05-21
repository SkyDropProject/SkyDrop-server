import { Request, Response } from 'express';

class ProductController {
  factory: any;
  categoryFactory: any;

  constructor(factory: any) {
    this.factory = factory.createProductDAO();
    this.categoryFactory = factory.createCategoryDAO();
  }

  async insert(req: Request, res: Response) {
    res.sendStatus(200);
  }

  async update(req: Request, res: Response) {
    res.sendStatus(200);
  }

  async delete(req: Request, res: Response) {
    res.sendStatus(200);
  }

  async find(req: Request, res: Response) {
    res.sendStatus(200);
  }

  async findOne(req: Request, res: Response) {
    res.sendStatus(200);
  }
}

export { ProductController };

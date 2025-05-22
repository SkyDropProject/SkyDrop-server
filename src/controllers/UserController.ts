import { Request, Response } from 'express';

class UserController {
  factory: any;

  constructor(factory: any) {
    this.factory = factory.createUserDAO();
  }

  async login(req: Request, res: Response) {
    // if ((!req.body.email && !req.body.phone) || !req.body.password) {
    //   res.sendStatus(500);
    //   return;
    // }

    // this.factory.findOne({email: req.body.email}).then((user)=>{
    //     if (!user) {
    //       res.sendStatus(500);
    //       return;
    //     }
    //     res.sendStatus(200);
    // }).catch(err => {
    //   console.log(err);
    //   res.sendStatus(500);
    //   return;
    // })

    res.sendStatus(200);
  }

  async register(req: Request, res: Response) {
    res.sendStatus(200);
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

export { UserController };

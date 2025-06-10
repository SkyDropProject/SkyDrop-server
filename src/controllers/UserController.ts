import jwt, { SignCallback } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import uid from 'uid-safe';
import { Request, Response } from 'express';
import { config } from '../utils/config';
import { ObjectId } from 'mongoose';

class UserController {
  factory: any;

  constructor(factory: any) {
    this.factory = factory.createUserDAO();
  }

  generateToken(userId: ObjectId, isAdmin: boolean, cb: SignCallback) {
    const payload = {
      id: userId.toString(),
      iat: Math.floor(Date.now() / 1000),
      isAdmin: isAdmin,
    };
    jwt.sign(payload, config.jwtSecret, cb);
  }

  async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      res.sendStatus(500);
      return;
    }

    const email = req.body.email.trim();
    const password = req.body.password.trim();

    this.factory
      .findOne({ email: email })
      .then((user: any) => {
        if (!user) {
          res.sendStatus(500);
          return;
        }

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            res.sendStatus(500);
            return;
          }

          if (!match) {
            res.sendStatus(401);
            return;
          }

          this.generateToken(user._id, user.isAdmin, (err, token) => {
            if (err) {
              res.sendStatus(500);
              return;
            }

            res.json({ token: token, user: user });
          });
        });
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async register(req: Request, res: Response) {
    if (
      !req.body ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmPassword ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.birthdate ||
      !req.body.phone
    ) {
      res.sendStatus(500);
      return;
    }

    if (req.body.password !== req.body.confirmPassword) {
      res.sendStatus(403);
      return;
    }

    const email = req.body.email.trim();
    const password = req.body.password.trim();

    this.factory
      .find({ email: email })
      .then((isUserExist: any) => {
        if (isUserExist && isUserExist.length > 0) {
          res.json({ status: 401, error: 'email-already-exist' });
          return;
        }

        bcrypt.hash(password, config.saltRounds, async (err, hash) => {
          if (err) {
            res.sendStatus(500);
            return;
          }

          uid(18, async (err: any, verificationToken: string) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }

            const newUser = await this.factory.insert({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              isAdmin: false,
              email: email,
              password: hash,
              verificationToken: verificationToken,
              registrationDate: new Date(),
              phone: req.body.phone,
              birthdate: req.body.birthdate,
              cartId: [],
              favoriteProductsId: [],
            });

            this.generateToken(newUser._id, newUser.isAdmin, (err, token) => {
              if (err) {
                res.sendStatus(500);
                return;
              }

              res.json({ token: token, user: newUser });
            });
          });
        });
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async verifyAccount(req: Request, res: Response) {
    if (!req.body.verificationToken || !req.body.email) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .find({ email: req.body.email, verificationToken: req.body.verificationToken })
      .then((user: any) => {
        if (!user) {
          res.sendStatus(500);
          return;
        }

        this.factory
          .update(user._id, {
            verificationToken: null,
            verificationDate: new Date(),
          })
          .then(() => {
            res.sendStatus(200);
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

  async update(req: Request, res: Response) {
    if (!req.body._id) {
      res.sendStatus(500);
      return;
    }

    let email: string;
    if (req.body.email) email = req.body.email.trim();

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        this.factory
          .update(user._id, {
            email: email,
            firstName: req.body.firstName,
            birthdate: req.body.birthdate,
            lastName: req.body.lastName,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            phone: req.body.phone,
          })
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

  async updatePassword(req: Request, res: Response) {
    if (!req.body._id && !req.body.password && !req.body.newPassword) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (err) {
            res.sendStatus(500);
            return;
          }

          if (!match) {
            res.sendStatus(401);
            return;
          }

          bcrypt.hash(req.body.newPassword, config.saltRounds, async (err, hash) => {
            if (err) {
              res.sendStatus(500);
              return;
            }

            this.factory
              .update(user._id, { password: hash })
              .then((newUser: any) => {
                res.json(newUser);
              })
              .catch((err: any) => {
                console.log(err);
                res.sendStatus(500);
                return;
              });
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
    if (!req.body._id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then(() => {
        this.factory
          .delete(req.body._id)
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
      .then((users: Array<any>) => {
        res.json(users);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async findOne(req: Request, res: Response) {
    if (!req.params._id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.params._id })
      .then((user: any) => {
        res.json(user);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async addToCart(req: Request, res: Response) {
    if (!req.body._id || !req.body.productId) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        const cartTmp = [];
        for (const product of user.cartId) {
          cartTmp.push(product._id);
        }
        cartTmp.push(req.body.productId);

        this.factory
          .update(user._id, {
            cartId: cartTmp,
          })
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

  async viewCart(req: Request, res: Response) {
    if (!req.body._id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        res.json(user.cartId);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async deleteFromCart(req: Request, res: Response) {
    if (!req.body._id || !req.body.productId) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        const product = user.cartId.find((p: any) => p._id === req.body.productId);
        if (!product) {
          res.sendStatus(500);
          return;
        }

        const cartTmp = [];
        let deleted = false;
        for (let i = user.cartId.length - 1; i >= 0; i--) {
          const product = user.cartId[i];
          if (product._id !== req.body.productId || deleted) cartTmp.push(product._id);
          else deleted = true;
        }

        this.factory
          .update(user._id, {
            cartId: cartTmp,
          })
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

  async addToFavorites(req: Request, res: Response) {
    if (!req.body._id || !req.body.productId) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        const favoritesTmp = [];
        for (const product of user.favoriteProductsId) {
          favoritesTmp.push(product._id);
        }
        favoritesTmp.push(req.body.productId);

        this.factory
          .update(user._id, {
            favoriteProductsId: favoritesTmp,
          })
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

  async viewFavorites(req: Request, res: Response) {
    if (!req.body._id) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        res.json(user.favoriteProductsId);
      })
      .catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
        return;
      });
  }

  async deleteFromFavorites(req: Request, res: Response) {
    if (!req.body._id || !req.body.productId) {
      res.sendStatus(500);
      return;
    }

    this.factory
      .findOne({ _id: req.body._id })
      .then((user: any) => {
        const product = user.favoriteProductsId.find((p: any) => p._id === req.body.productId);
        if (!product) {
          res.sendStatus(500);
          return;
        }

        const favoriteTmp = [];
        for (const product of user.favoriteProductsId) {
          if (product._id !== req.body.productId) favoriteTmp.push(product._id);
        }

        this.factory
          .update(user._id, {
            favoriteProductsId: favoriteTmp,
          })
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
}

export { UserController };

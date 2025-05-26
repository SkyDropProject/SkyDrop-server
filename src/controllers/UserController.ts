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

  generateToken(userId: ObjectId, cb: SignCallback) {
    let payload = {
      id: userId.toString(),
      iat: Math.floor(Date.now() / 1000),
    };
    jwt.sign(payload, config.jwtSecret, cb);
  }

  async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      res.sendStatus(500);
      return;
    }

    let email = req.body.email.trim();
    let password = req.body.password.trim();

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

          this.generateToken(user._id, (err, token) => {
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

    res.sendStatus(200);
  }

  async register(req: Request, res: Response) {
    if (
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

    let email = req.body.email.trim();
    let password = req.body.password.trim();

    this.factory
      .find({ email: email })
      .then((isUserExist: any) => {
        if (isUserExist && isUserExist.length > 0) {
          res.json({ status: 401, error: 'email-already-exist' });
          return;
        }

        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async (err, hash) => {
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

            let newUser = await this.factory.insert({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: email,
              password: hash,
              verificationToken: verificationToken,
              registrationDate: new Date(),
              phone: req.body.phone,
              birthdate: req.body.birthdate,
            });

            this.generateToken(newUser._id, (err, token) => {
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

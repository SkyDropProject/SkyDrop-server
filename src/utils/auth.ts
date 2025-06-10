import { config } from './config';
import passportJWT from 'passport-jwt';
import passport from 'passport';
import { User } from './../models/User';
import { functionsMongo } from './functionsMongo';
import { Request } from 'express';

const Strategy = passportJWT.Strategy;

type optsType = {
  secretOrKey: string;
  jwtFromRequest: any;
};

const opts: optsType = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: (req: Request) => {
    let token;
    if (req && req.header('token')) token = req.get('token');
    return token;
  },
};

const strategy = new Strategy(opts, (jwt_payload, done) => {
  functionsMongo
    .findOne(User, { _id: jwt_payload.id })
    .then((res: any) => {
      if (res) {
        return done(null, {user:res});
      } else {
        return done(null, false);
      }
    })
    .catch((err: any) => {
      return done(err, false);
    });
});

passport.use(strategy);

const auth = {
  initialize: () => {
    return passport.initialize();
  },
  authenticate: () => {
    return passport.authenticate('jwt', config.jwtSession);
  },
};

export { auth };

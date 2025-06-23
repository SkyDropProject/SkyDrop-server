import { RequestHandler } from 'express';
import helmet from 'helmet';

const securityMiddleware: RequestHandler[] = [
  helmet(),

  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
      upgradeInsecureRequests: [],
    },
  }),

  helmet.frameguard({ action: 'deny' }),

  helmet.noSniff(),

  (req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
  },
];

export default securityMiddleware;

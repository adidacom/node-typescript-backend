import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { ExpressMiddlewareInterface } from 'routing-controllers';

export class Authenticate implements ExpressMiddlewareInterface {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    await passport.authenticate('jwt', { session: false })(req, res, next);
  }
}

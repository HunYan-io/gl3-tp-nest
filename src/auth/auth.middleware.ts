import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('auth');
    const authUser = req.headers['auth-user'];
    if (typeof authUser != 'string') {
      return next(new UnauthorizedException());
    }
    verify(authUser, 'mysupersecret', (err, decoded) => {
      if (err || !decoded || typeof decoded != 'object' || !decoded.userId) {
        return next(new UnauthorizedException());
      }
      req['userId'] = decoded.userId;
      next();
    });
  }
}

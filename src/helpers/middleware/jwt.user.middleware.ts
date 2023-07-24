import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserJwtMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const token = req.headers.authorization?.split(' ')[1].split(',')[0];
      console.log(req.headers);
      
      
      if (token) {
        try {
          const decodedToken = jwt.verify(token, 'jwtSecretKeyForUser');

          req['user'] = decodedToken;
          console.log(req);
          
          next();
        } catch (error) {
          console.log("invalid token");
          res.status(401).json({ message: 'Invalid token' });
        }
      } else {
        console.log("User Missing token");
        res.status(401).json({ message: 'Missing token' });
      }
    }
  }
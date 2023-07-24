import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1].split(',')[1];
    
    if (token) {
      try {
        const decodedToken = jwt.verify(token, 'jwtSecretKey');
        req['admin'] = decodedToken;

        next();
      } catch (error) {
        console.log("invalid token");
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      console.log("Missing token");
      res.status(401).json({ message: 'Missing token' });
    }
  }
}
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    const panel = req.headers.panel;
    console.log(req.headers);

    if (token) {
      try {
        const decodedToken = jwt.verify(token, "jwtSecretKey");
        req[`${panel}`] = decodedToken;
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(401).json({ message: "Missing token" });
    }
  }
}

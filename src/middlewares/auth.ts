import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { NextFunction, Request, Response } from "express";

class Authenticate {
  verifyToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader)
      return response.status(401).send({ error: "No token provided" });

    //Bearer {Hash}
    const parts = authHeader.split(" ");
    if (!(parts.length === 2))
      return response.status(401).send({ error: "Token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return response.status(401).send({ error: "Token malformatted" });

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) return response.status(401).send({ error: "Token invalid" });
      //request.body.username = decoded.id;
      return next();
    });
  }
}

export { Authenticate };

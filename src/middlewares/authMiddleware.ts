import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import { NextFunction, Request, Response } from "express";

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

class Authenticate {
  verifyToken(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.cookies.token;

    if (!authHeader)
      return response.status(401).send({ error: "No token provided" });

    //Bearer {Hash}
    const parts = authHeader.split(" ");
    if (!(parts.length === 2))
      return response.status(401).send({ error: "Token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
      return response.status(401).send({ error: "Token malformatted" });

    try {
      const data = jwt.verify(token, authConfig.secret);

      const { id } = data as TokenPayload;
      request.settingsId = id;

      return next();
    } catch {
      return response.sendStatus(401);
    }
  }
}

export { Authenticate };

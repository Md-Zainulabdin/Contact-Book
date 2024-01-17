import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface IJwtPayload {
  id: string;
  exp: number;
}

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ error: "Authorization failed." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;
    req.body.user = decoded
    return next();
  } catch (error) {
    console.log("auth-middleware-error", error);
    return res.status(400).send({ error: "Token is invalid." });
  }
}

export default auth;

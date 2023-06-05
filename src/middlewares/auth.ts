import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (req:Request, res:Response, next: NextFunction) => {
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    next();
};

export const authenticateToken = async (req:any, res:Response, next: NextFunction) => {
  // Get the access token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If there's no token, return an error
  if (!token) {
    return res.status(401).send({
        guid: null,
        code: 401,
        info: "unauthorized",
        data: null,
    });
  }

  // Verify the token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err:any, decoded:any) => {
    if (err) {
        return res.status(403).send({
            guid: null,
            code: 403,
            info: "verify token error",
            data: null,
        });
    }

    // If the token is valid, save the user object to the request object and call the next middleware
    req.body.token = token;
    next();
  });
};

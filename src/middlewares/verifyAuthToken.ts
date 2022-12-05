import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  const authorizationHeader = req.headers.authorization;
  // @ts-ignore
  const user_token = authorizationHeader.split(' ')[1];
  if (!user_token) {
    return res.status(401).send('Access denied');
  }

  try {
    jwt.verify(user_token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
    return;
  }
};

export default verifyAuthToken;

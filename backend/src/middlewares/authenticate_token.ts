import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { User } from 'src/@types/custom';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const authenticate_token = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: JsonWebTokenError, user: User) => {
    if (err) {
      return res.json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
  
};

export default authenticate_token;
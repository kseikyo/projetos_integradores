import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { User } from 'src/@types/custom';
import jwt from 'jsonwebtoken';
import Auth from '../controllers/auth/Auth';

require('dotenv').config();

const authenticate_token = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err: JsonWebTokenError, user: User) => {
    if (err) {
      const auth = new Auth();
      const accessToken = await auth.refresh_token(req, res);
      if (accessToken.message){
        return res.sendStatus(403);
      }
    }
    req.user = user;
    next();
  });
  
};

export default authenticate_token;
import { Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User } from 'src/@types/custom';

require('dotenv').config();

export const createAccessToken = (user: User) => {
  return jsonwebtoken.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m"
  });
};

export const createRefreshToken = (user: User) => {
  return jsonwebtoken.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
};
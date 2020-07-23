import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { PrismaClient } from "@prisma/client"
import { createAccessToken } from '../../utils/jwt';
import { serializeUser } from '../../utils/serializeUser';
const prisma = new PrismaClient();

require('dotenv').config();

export default class Auth {
  async login(request: Request, response: Response) {
    const { username, password, id } = request.body;

    // user logged in sucessfully
    // Get id, name, email, pessoa_professor_id and pessoa_tutor_id 
    const user = await prisma.pessoa.findOne({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        nome: true,
        email: true,
        professor: {
          select: {
            pessoa_professor_id: true
          }
        },
        tutor: {
          select: {
            pessoa_tutor_id: true,
            tipo: true
          }
        }
      }
    });

    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }
    const serializedUser = serializeUser(user);
    const jwt = jsonwebtoken.sign(serializedUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "5m"
    });
    const refresh = jsonwebtoken.sign(serializedUser, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d"
    });

    response.cookie('jid', refresh);

    return response.json({ accessToken: jwt });
  }


  async refresh_token(request: Request, response: Response) {
    const token = await request.cookies.jid;

    if (!token) {
      return { message: 'No token' };
      // return response.sendStatus(400);
    }

    let payload;
    try {
      payload = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.log(err);
      return { message: 'Bad token' };
      // return response.sendStatus(400);
    }
    // token is valid send back access
    const user = await prisma.pessoa.findOne({
      where: {
        id: Number(payload.id)
      },
      select: {
        id: true,
        nome: true,
        email: true,
        professor: {
          select: {
            pessoa_professor_id: true
          }
        },
        tutor: {
          select: {
            pessoa_tutor_id: true,
            tipo: true
          }
        }
      }
    });
    
    if (!user) {
      return { message: 'User not found' };
    }
    const serializedUser = serializeUser(user);
    return { accessToken: createAccessToken(serializedUser) };
    // return response.send({ accessToken: createAccessToken(serializedUser) })
  }
}

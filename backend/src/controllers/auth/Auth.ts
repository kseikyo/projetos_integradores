import { Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';

import { PrismaClient } from "@prisma/client"
import { createAccessToken, sendRefreshToken, createRefreshToken } from '../../utils/jwt';
import { serializeUser } from '../../utils/serializeUser';
const prisma = new PrismaClient();

require('dotenv').config();

export default class Auth {
  async login(request: Request, response: Response) {
    const { email, password, id } = request.body;
    
    // Check if user with provided email exists
    const auth_user = await prisma.pessoa.findOne({
      where: {
        email
      },
      select: {
        email: true
      }
    });

    if (!auth_user) {
      return response.json({ message: "Email not registered." });
    }

    // user exists checking password
    /**
     * TODO CHECK PASSWORD
     * Also add password to DB
     */

    // return response.json({ message: "Password incorrect." });


    // user logged in sucessfully
    // Get id, name, email, pessoa_professor_id and pessoa_tutor_id 
    const user = await prisma.pessoa.findOne({
      where: {
        email
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
    
    const jwt = createAccessToken(serializedUser);

    sendRefreshToken(response, createRefreshToken(serializedUser))

    return response.json({ accessToken: jwt });
  }


  async refresh_token(request: Request, response: Response) {
    const token = await request.cookies.jid;
    
    if (!token) {
      // return { message: 'No token' };
      return response.sendStatus(400);
    }

    let payload;
    try {
      payload = jsonwebtoken.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      // return { message: 'Bad token' };
      return response.sendStatus(400);
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
      // return { message: 'User not found' };
      return response.json({ message: 'User not found' });
    }
    const serializedUser = serializeUser(user);

    sendRefreshToken(response, createAccessToken(serializedUser));
    
    // return { accessToken: createAccessToken(serializedUser) };
    return response.send({ accessToken: createAccessToken(serializedUser) })
  }
}

import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class PersonController {
  async index(request: Request, response: Response) {
    
  }

  async create(request: Request, response: Response) {
    const { nome, email } = request.body;

    const person = await prisma.pessoa.create({
      data: {
        email,
        nome,
      }
    });

    if (!person) {
      return response.status(400).json({ message: "Could not create person." });
    }

    return response.json(person);
  }
}

export default PersonController;
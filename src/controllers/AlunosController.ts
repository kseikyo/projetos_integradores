import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class AlunosController {
  async index (request: Request, response: Response) {
    const alunos = await prisma.aluno.findMany();
    
    return response.json(alunos);
  };
}

export default AlunosController;
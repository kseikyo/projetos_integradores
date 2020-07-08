import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class DisciplinasController {
  async index (request: Request, response: Response) {
    const disciplinas = await prisma.disciplina.findMany();
    
    return response.json(disciplinas);
  };
}

export default DisciplinasController;
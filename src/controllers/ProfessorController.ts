import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class ProfessorController {
  async show (request: Request, response: Response) {
    const { id } = request.params;
    const professor_disciplinas = await prisma.professor.findOne({
      where: {
        pessoa_professor_id: Number(id)
      },
      include: {
        ministra: {
          include: {
            disciplina: {
              select: {
                id: true,
                nome: true
              }
            }
          }
        }
      }
    });

    if (!professor_disciplinas) {
      return response.status(400).json({ message: 'Professor não existe.'});
    }
    
    return response.json(professor_disciplinas);
  };
}

export default ProfessorController;
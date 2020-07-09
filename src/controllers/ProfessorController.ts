import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class ProfessorController {
  async create(request: Request, response: Response) {
    const { nome, email } = request.body;

    const professor = await prisma.professor.create({
      data: {
        pessoa: {
          create: {
            nome,
            email
          }
        }
      }
    });

    if (!professor) {
      return response.status(400).json({ message: "Could not create professor." });
    }

    return response.json(professor);
  }

  // Gets a professor and it's disciplines
  // Using for testing only
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
              },
            }
          }
        }
      }
    });

    if (!professor_disciplinas) {
      return response.status(400).json({ message: 'Professor does not exist.' });
    }
    
    return response.json(professor_disciplinas);
  };
}

export default ProfessorController;
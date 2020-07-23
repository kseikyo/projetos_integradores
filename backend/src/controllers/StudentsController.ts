import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

class StudentsController {
  async index(request: Request, response: Response) {
    /** Gets all students data
     * instituiçao, pessoa_aluno_id, ra, telefone
     * 
     * then inside person object gets 
     * email, id, nome, avalia[]
     */
    const students = await prisma.aluno.findMany({
      include: {
        pessoa: {
          include: {
            avalia: {
              select: {
                comentario: true,
                nota_parcial: true,
              }
            }
          }
        }
      }
    });

    return response.json(students);
  };

  async create(request: Request, response: Response) {
    const { nome, email, ra, telefone, instituicao } = request.body;
    const student = await prisma.aluno.create({
      data: {
        pessoa: {
          create: {
            email,
            nome
          },
        },
        ra,
        telefone,
        instituicao
      }
    });

    if (!student) {
      return response.status(400).json({ message: "Could not create student" });
    }

    return response.json(student);
  }
}

export default StudentsController;
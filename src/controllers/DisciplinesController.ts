import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DisciplinesController {
  async index (request: Request, response: Response) {
    const disciplines = await prisma.disciplina.findMany({
      select: {
        id: true,
        nome: true,
        peso: true,
        modulo: {
          select: {
            turma: true,
            data_fim: true
          }
        }
      }
    });

    // Check if module is over
    const now = new Date();
    const endDates = disciplines.map(discipline => {
      return discipline.modulo.data_fim > now
    });

    if(endDates.includes(false)){
      return response.status(503).json({ message: 'There are no modules available' });
    }
    
    return response.json(disciplines);
  };

  // Gets all disciplines from a professor by it's id on request
  async show_by_professor_id (request: Request, response: Response) {
    try {
      const { id } = request.user;

      if (isNaN(Number(id))) {
        return response.status(400).json({ message: "ID provided is not a valid ID."} );
      }
      const disciplines = await prisma.disciplina.findMany({
        where: {
          ministra: {
            some: {
              ministra_professor_id: {
                equals: Number(id)
              }
            }
          }
        }
      });

      if (disciplines.length < 1) {
        return response.status(400).json({ message: `Could not find disciplines from professor with id ${id}`});
      }

      return response.json(disciplines);

    } catch(err) {
      console.log(err);
    }
  }

  // Gets a discipline with ID included in request parameters
  // and add in to the response the professor(s) and tutor(s) from the ministra(s) relation
  async show_discipline (request: Request, response: Response) {
    
    try {
      const { id } = request.params;
      if (isNaN(Number(id))) {
        return response.status(400).json({ message: "ID provided is not a number."} );
      }
      
      const discipline = await prisma.disciplina.findMany({
        where: {
          id: Number(id)
        },
        include: {
          ministra: {
            include: {
              professor: {
                select: {
                  pessoa: {
                    select: {
                      id: true,
                      nome: true,
                    }
                  }
                }
              },
              tutor: {
                select: {
                  pessoa: {
                    select: {
                      id: true,
                      nome: true
                    }
                  }
                }
              }
            }
          }
        }
      });
      
      if (!discipline) {
        return response.status(400).json({ message: `Could not find discipline with id ${id}`});
      }

      return response.json(discipline);

    } catch(err) {
      console.log(err);
    }

  }

}

export default DisciplinesController;
import { Request, Response } from 'express';

import { PrismaClient } from "@prisma/client";
import { Aluno, Aluno_projetos } from 'src/@types/custom';
const prisma = new PrismaClient();

export default class EvaluationsController {

  async update(request: Request, response: Response) {
    try {
      /** Students on format
       * {
       *  "alunos": [
       *    {
       *      "pessoa_aluno_id": number,
       *      "pessoa"? : {}
       *      "disciplinas": [{
       *        "id": number
       *        "nota": number
       *      }]
       *    },
       *    ...
       *   ],
       * }
      */

      const { id } = request.user;
      const { alunos } = request.body;

      // Probably not gonna happen as user data comes from request
      if (isNaN(Number(id))) {
        return response.status(400).json({ message: "User is not authenticated." });
      }

      // Mapping on students returns a list of promisses
      // Get data uses Promise.all which only resolves when all promisses resolve
      // Use await GetData() to get students data
      const getData = async () => {
        return Promise.all(
          await alunos.map(async (user: Aluno) => {
            try {
              const aluno = await prisma.aluno.findOne({
                where: {
                  pessoa_aluno_id: user.pessoa_aluno_id,
                },
                select: {
                  pessoa_aluno_id: true,
                  entrega: {
                    select: {
                      projeto_integrador: {
                        select: {
                          id: true
                        }
                      }
                    }
                  }
                }
              });
              const disciplinas = user.disciplinas;
              return { aluno, disciplinas };
            }
            catch (err) {
              console.log(err);
            }
          })
        )
      }
      const alunosProjetos = await getData();



      // Mapping on students returns a list of promisses
      // Get data uses Promise.all which only resolves when all promisses resolve
      // aluno.disciplinas.map also returns a list of promisses

      // ERROR: duplicate key value violates unique constraint "avalia_pkey"
      // DETAIL: Key(avalia_pessoa_id, avalia_projeto_integrador_id) = (7, 1) already exists.
      const evaluate = async () => {
        return await Promise.all(
          alunosProjetos.map(async (aluno: Aluno_projetos) => {
            const data = await Promise.all(aluno.disciplinas.map(async (disciplina) => {
              const entrega = aluno.aluno.entrega[aluno.aluno.entrega.length - 1];
              const projeto_integrador = entrega.projeto_integrador;
              const comment = disciplina.comentario ? disciplina.comentario : "";
              const student = aluno.aluno;
              try {
                const insertedData = await prisma.avalia.upsert({
                  where: {
                    avalia_pessoa_id_avalia_projeto_integrador_id: {
                      avalia_pessoa_id: student.pessoa_aluno_id,
                      avalia_projeto_integrador_id: projeto_integrador.id
                    }
                  },
                  create: {
                    disciplina: {
                      connect: {
                        id: disciplina.id,
                      }
                    },
                    nota_parcial: disciplina.nota,
                    comentario: comment,
                    projeto_integrador: {
                      connect: {
                        id: projeto_integrador.id
                      }
                    },
                    pessoa: {
                      connect: {
                        id: student.pessoa_aluno_id
                      }
                    }
                  },
                  update: {
                    disciplina: {
                      connect: {
                        id: disciplina.id
                      }
                    },
                    nota_parcial: disciplina.nota,
                    comentario: comment,
                    projeto_integrador: {
                      connect: {
                        id: projeto_integrador.id
                      }
                    },
                    pessoa: {
                      connect: {
                        id: student.pessoa_aluno_id
                      }
                    }
                  },
                  select: {
                    avalia_disciplina_id: true,
                    avalia_projeto_integrador_id: true,
                    disciplina: {
                      select: {
                        id: true,
                        nome: true
                      }
                    },
                    nota_parcial: true,
                    projeto_integrador: true
                  }
                });
                return insertedData;
              } catch (err) {
                console.log(err);
              }
              // console.log("INSERTED DATA -----------------\n", insertedData);
            }));
            return data;
          })
        )
      }

      const inserted = await evaluate();

      if (!alunosProjetos) {
        return response.status(400).json({ message: 'idk' });
      }

      return response.json(alunosProjetos);
    } catch (err) {
      console.log(err);
    }
  }
}
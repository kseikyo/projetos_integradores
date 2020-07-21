import { Request } from 'express';
import { professor, tutor, projeto_integrador, aluno } from '@prisma/client';

interface User {
  id: number,
  nome?: String,
  email?: String,
  pessoa_professor_id?: string,
  professor?: professor[{}],
  tutor?: tutor[{}],
  pessoa_tutor_id?: string
}

interface Pessoa {
  id: number,
  email?: string,
  nome?: string,
  avalia?: []
}

interface disciplinas {
  id: number,
  nota: string,
  comentario?: string
}

interface Aluno {
  pessoa_aluno_id: number,
  pessoa: [Pessoa]
  nome?: string,
  email?: string,
  nota_parcial?: string,
  comentario?: string,
  entrega?: [{projeto_integrador}],
  disciplinas?: [disciplinas]
}

interface Aluno_projetos {
  aluno: Aluno,
  disciplinas: [disciplinas]
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
}


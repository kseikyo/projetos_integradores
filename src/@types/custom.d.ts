import { Request } from 'express';
import { professor, tutor } from '@prisma/client';

interface User {
  id: Number,
  nome?: String,
  email?: String,
  pessoa_professor_id?: string,
  professor?: professor[{}],
  tutor?: tutor[{}],
  pessoa_tutor_id?: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User
  }
}


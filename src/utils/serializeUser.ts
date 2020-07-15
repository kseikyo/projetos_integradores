import { User } from "src/@types/custom"

export const serializeUser = (user: User) => {
  return { 
    id: user.id,
    email: user.email,
    nome: user.nome,
    pessoa_professor_id: user.professor[0].pessoa_professor_id, 
    pessoa_tutor_id: user.tutor[0].pessoa_tutor_id
  }
}
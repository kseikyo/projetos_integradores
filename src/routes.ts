import express from 'express';

import AlunosController from './controllers/AlunosController';
import ProfessorController from './controllers/ProfessorController';

const routes = express.Router();

const alunosController = new AlunosController();
const professorController = new ProfessorController();

routes.get('/alunos', alunosController.index);
routes.get('/professor/:id', professorController.show);

export default routes;
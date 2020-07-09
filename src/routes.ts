import express from 'express';

import StudentsController from './controllers/StudentsController';
import ProfessorController from './controllers/ProfessorController';
import DisciplinesController from './controllers/DisciplinesController';


const routes = express.Router();

const studentsController = new StudentsController();
const professorController = new ProfessorController();
const disciplineController = new DisciplinesController();

// Students routes
routes.get('/students', studentsController.index);
routes.post('/students/create', studentsController.create);

// Professor routes
routes.post('/professor/create', professorController.create);
routes.get('/professor/:id', professorController.show);

// Disciplines routes
routes.get('/disciplines/:id', disciplineController.show_by_professor_id);


export default routes;
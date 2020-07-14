import express from 'express';

import StudentsController from './controllers/StudentsController';
import ProfessorController from './controllers/ProfessorController';
import DisciplinesController from './controllers/DisciplinesController';

import Auth from './controllers/auth/Auth';
import authenticate_token from './middlewares/authenticate_token';

const routes = express.Router();

const studentsController = new StudentsController();
const professorController = new ProfessorController();
const disciplineController = new DisciplinesController();
const auth = new Auth();

// Auth routes
routes.post('/login', auth.login);

// JWT routes
routes.post('/refresh_token', auth.refresh_token)

// Students routes
routes.get('/students', studentsController.index);
routes.post('/students/create', studentsController.create);

// Professor routes
routes.post('/professor/create', professorController.create);
routes.get('/professor/:id', professorController.show);

// Disciplines routes
routes.get('/disciplines/', authenticate_token, disciplineController.show_by_professor_id);


export default routes;
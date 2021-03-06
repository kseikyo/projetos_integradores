import express from 'express';

// Controllers
import Auth from './controllers/auth/Auth';
import DisciplinesController from './controllers/DisciplinesController';
import EvaluationsConstroller from './controllers/EvaluationsController';
import ProfessorController from './controllers/ProfessorController';
import StudentsController from './controllers/StudentsController';

// Middleware
import authenticate_token from './middlewares/authenticate_token';

const routes = express.Router();

const auth = new Auth();
const disciplineController = new DisciplinesController();
const evaluationsController = new EvaluationsConstroller();
const professorController = new ProfessorController();
const studentsController = new StudentsController();

// Auth routes
routes.post('/login', auth.login);

// JWT routes
routes.post('/refresh_token', auth.refresh_token)
routes.post('/logout', auth.logout);

// Students routes
routes.get('/students', studentsController.index);
routes.post('/students/create', studentsController.create);

// Professor routes
routes.post('/professor/create', professorController.create);
routes.get('/professor/:id', professorController.show);

// Disciplines routes
routes.get('/disciplines', authenticate_token, disciplineController.index);
routes.get('/disciplines/professor/', authenticate_token, disciplineController.show_by_professor_id);
routes.get('/disciplines/tutor/', authenticate_token, disciplineController.show_by_tutor_id);
routes.get('/disciplines/:id/students', disciplineController.students_from_discipline);

// Evaluations routes
routes.post('/evaluations/', authenticate_token, evaluationsController.update);

export default routes;
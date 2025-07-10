import { Router } from 'express';
import {
  getAllActors,
  getAllDirectors,
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson
} from '../controllers/person.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);

// Rotas específicas para atores e diretores
router.get('/actors', getAllActors);
router.get('/directors', getAllDirectors);

// Rotas gerais para pessoas
router.get('/', getAllPersons);
router.get('/:id', getPersonById);
router.post('/', createPerson);
router.patch('/:id', updatePerson);
router.delete('/:id', deletePerson);

export default router; 
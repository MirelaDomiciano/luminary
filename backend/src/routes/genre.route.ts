import { Router } from 'express';
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre
} from '../controllers/genre.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);

// Rotas para gêneros
router.get('/', getAllGenres);
router.get('/:id', getGenreById);
router.post('/', createGenre);
router.patch('/:id', updateGenre);
router.delete('/:id', deleteGenre);

export default router; 
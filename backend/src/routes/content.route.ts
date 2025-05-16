import { Router } from 'express';
import { 
  getAllContents, 
  getContentsByType, 
  getContentById, 
  createMovie, 
  createSeries,
  updateContent,
  deleteContent
} from '../controllers/content.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);

// Rotas para todos os conteúdos
router.get('/', getAllContents);
router.get('/type/:type', getContentsByType);
router.get('/:id', getContentById);

// Rotas para criação específica
router.post('/movies', createMovie);
router.post('/series', createSeries);

// Rotas para atualização e exclusão
router.patch('/:id', updateContent);
router.delete('/:id', deleteContent);

export default router;


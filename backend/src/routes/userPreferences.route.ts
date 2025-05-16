import { Router } from 'express';
import { 
  createUserPreferencesController, 
  getUserPreferencesByUserIdController, 
  updateUserPreferencesByUserIdController, 
  deleteUserPreferencesByUserIdController 
} from '../controllers/userPreferences.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

// Middleware para injetar o userId do usuário logado nos params
const injectLoggedUserId = (req: any, res: any, next: any) => {
  if (req.user && req.user.id) {
    req.params.userId = req.user.id;
    next();
  } else {
    res.status(401).json({ message: 'User not authenticated or missing ID' });
  }
};

// Todas as rotas agora usam o ID do usuário logado
router.get('/', injectLoggedUserId, getUserPreferencesByUserIdController);
router.post('/', injectLoggedUserId, createUserPreferencesController);
router.patch('/', injectLoggedUserId, updateUserPreferencesByUserIdController);
router.delete('/', injectLoggedUserId, deleteUserPreferencesByUserIdController);

export default router; 
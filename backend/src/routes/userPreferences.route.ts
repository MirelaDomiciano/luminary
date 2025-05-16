import { Router } from 'express';
import { 
  createUserPreferencesController, 
  getUserPreferencesByIdController, 
  getUserPreferencesByUserIdController, 
  updateUserPreferencesController, 
  deleteUserPreferencesController 
} from '../controllers/userPreferences.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  if (req.user && req.user.id) {
    const userId = req.user.id;
    try {
      // Forward to the getUserPreferencesByUserIdController
      (req.params as any).userId = userId;
      return getUserPreferencesByUserIdController(req, res);
    } catch (error) {
      return res.status(500).json({ 
        message: 'Error fetching user preferences', 
        error: (error as Error).message 
      });
    }
  } else {
    return res.status(401).json({ message: 'User not authenticated or missing ID' });
  }
});

// Rotas para preferências de usuário por ID de preferência
router.get('/:id', getUserPreferencesByIdController);
router.patch('/:id', updateUserPreferencesController);
router.delete('/:id', deleteUserPreferencesController);

// Rotas para preferências por usuário
router.get('/user/:userId', getUserPreferencesByUserIdController);
router.post('/user/:userId', createUserPreferencesController);

export default router; 
import { Router } from 'express';
import { 
  createUserController, 
  getUserByIdController, 
  getAllUsersController, 
  updateUserController, 
  deleteUserController 
} from '../controllers/user.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();
const router = Router();
router.use(authMiddleware);

// Rotas públicas
router.post('/', createUserController);
router.get('/', getAllUsersController);

// Rotas protegidas - definidas antes da rota /:id para evitar conflitos
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // The user is authenticated at this point
    // req.user contains the JWT payload with user info
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
        // Exclude password for security
      }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'Protected profile data', 
      user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Rotas com parâmetros - depois das rotas específicas
router.get('/:id', getUserByIdController);
router.patch('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router; 
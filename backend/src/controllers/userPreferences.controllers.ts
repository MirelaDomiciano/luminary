import { Request, Response } from 'express';
import { 
  createUserPreferences, 
  getUserPreferencesById, 
  getUserPreferencesByUserId, 
  updateUserPreferences, 
  deleteUserPreferences 
} from '../repositories/userPreferences.repository';
import { getUserById } from '../repositories/user.repository';

export const createUserPreferencesController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { genreIds, actorIds, directorIds } = req.body;
    
    // Verificar se o usuário existe
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const preferences = await createUserPreferences(userId, {
      genreIds,
      actorIds,
      directorIds
    });
    
    res.status(201).json(preferences);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating user preferences', 
      error: (error as Error).message 
    });
  }
};

export const getUserPreferencesByIdController = async (req: Request, res: Response) => {
  try {
    const preferencesId = req.params.id;
    const preferences = await getUserPreferencesById(preferencesId);
    
    if (!preferences) {
      return res.status(404).json({ message: 'User preferences not found' });
    }
    
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user preferences', 
      error: (error as Error).message 
    });
  }
};

export const getUserPreferencesByUserIdController = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    
    // Verificar se o usuário existe
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const preferences = await getUserPreferencesByUserId(userId);
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching user preferences', 
      error: (error as Error).message 
    });
  }
};

export const updateUserPreferencesController = async (req: Request, res: Response) => {
  try {
    const preferencesId = req.params.id;
    const { genreIds, actorIds, directorIds } = req.body;
    
    const updatedPreferences = await updateUserPreferences(preferencesId, {
      genreIds,
      actorIds,
      directorIds
    });
    
    if (!updatedPreferences) {
      return res.status(404).json({ message: 'User preferences not found' });
    }
    
    res.json(updatedPreferences);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating user preferences', 
      error: (error as Error).message 
    });
  }
};

export const deleteUserPreferencesController = async (req: Request, res: Response) => {
  try {
    const preferencesId = req.params.id;
    await deleteUserPreferences(preferencesId);
    res.status(200).json({ message: 'User preferences deleted successfully' });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error deleting user preferences', 
      error: (error as Error).message 
    });
  }
}; 
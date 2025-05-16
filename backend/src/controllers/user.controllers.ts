import { Request, Response } from 'express';
import { 
  createUser, 
  getUserById, 
  getUserByEmail, 
  getAllUsers, 
  updateUser, 
  deleteUser 
} from '../repositories/user.repository';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password, isActive } = req.body;
    
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    const newUser = await createUser({
      username,
      email,
      password,
      isActive
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: (error as Error).message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: (error as Error).message });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { username, email, password, isActive } = req.body;
    
    // Se o email estiver sendo atualizado, verificar se já existe
    if (email) {
      const existingUser = await getUserByEmail(email);
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    const user = await updateUser(id, {
      username,
      email,
      password, // Normalmente você deveria fazer hash da senha antes
      isActive
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: (error as Error).message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: (error as Error).message });
  }
}; 
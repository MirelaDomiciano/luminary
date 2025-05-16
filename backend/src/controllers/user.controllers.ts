import { Request, Response } from 'express';
import { 
  createUser, 
  getUserById, 
  getUserByEmail, 
  getAllUsers, 
  updateUser, 
  deleteUser 
} from '../repositories/user.repository';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password, isActive } = req.body;
    
    // Check for existing email
    const existingUserByEmail = await getUserByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    // Check for existing username
    const existingUserByUsername = await prisma.user.findFirst({
      where: { username }
    });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username already in use' });
    }
    
    const newUser = await createUser({
      username,
      email,
      password,
      isActive
    });
    
    res.status(201).json(newUser);
  } catch (error) {
    // Check for unique constraint violations that might have slipped through
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[];
        if (target.includes('email')) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        if (target.includes('username')) {
          return res.status(400).json({ message: 'Username already in use' });
        }
      }
    }
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
    
    // If email is being updated, check if it's already in use
    if (email) {
      const existingUser = await getUserByEmail(email);
      if (existingUser && existingUser.id !== id) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    // If username is being updated, check if it's already in use
    if (username) {
      const existingUser = await prisma.user.findFirst({
        where: { 
          username,
          id: { not: id }
        }
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already in use' });
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
    // Check for unique constraint violations
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[];
        if (target.includes('email')) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        if (target.includes('username')) {
          return res.status(400).json({ message: 'Username already in use' });
        }
      }
    }
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
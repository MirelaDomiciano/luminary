import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10; // Número de rounds para gerar o salt

interface UserCreateInput {
  username: string;
  email: string;
  password: string;
  isActive?: boolean;
}

interface UserUpdateInput {
  username?: string;
  email?: string;
  password?: string;
  isActive?: boolean;
}

// Função para fazer o hash da senha
const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

// Função para comparar senhas
export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const createUser = async (userData: UserCreateInput): Promise<User> => {
  try {
    // Faz o hash da senha antes de salvar
    const hashedPassword = await hashPassword(userData.password);
    
    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        preferences: {
          select: {
            id: true
          }
        },
        ratings: {
          select: {
            id: true
          }
        },
        viewHistory: {
          select: {
            id: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await prisma.user.findMany({
      include: {
        preferences: {
          select: {
            id: true
          }
        },
        ratings: {
          select: {
            id: true
          }
        },
        viewHistory: {
          select: {
            id: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: UserUpdateInput): Promise<User | null> => {
  try {
    // Se estiver atualizando a senha, faz o hash
    let dataToUpdate = { ...userData };
    
    if (userData.password) {
      dataToUpdate.password = await hashPassword(userData.password);
    }
    
    return await prisma.user.update({
      where: { id },
      data: dataToUpdate
    });
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    await prisma.user.delete({
      where: { id }
    });
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findFirst({
      where: { email },
      include: {
        preferences: {
          select: {
            id: true
          }
        },
        ratings: {
          select: {
            id: true
          }
        },
        viewHistory: {
          select: {
            id: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
};


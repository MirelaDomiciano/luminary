import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllGenres = async () => {
  try {
    return await prisma.genre.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getGenreById = async (id: string) => {
  try {
    return await prisma.genre.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        contents: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching genre with ID ${id}:`, error);
    throw error;
  }
};

export const createGenre = async (data: { name: string; description: string }) => {
  try {
    return await prisma.genre.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  } catch (error) {
    console.error('Error creating genre:', error);
    throw error;
  }
};

export const updateGenre = async (id: string, data: { name?: string; description?: string }) => {
  try {
    return await prisma.genre.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  } catch (error) {
    console.error(`Error updating genre with ID ${id}:`, error);
    throw error;
  }
};

export const deleteGenre = async (id: string) => {
  try {
    await prisma.genre.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting genre with ID ${id}:`, error);
    throw error;
  }
}; 
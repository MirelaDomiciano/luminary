import { PrismaClient, Content } from '@prisma/client';

const prisma = new PrismaClient();

interface ContentCreateInput extends Omit<Content, 'id'> {
  genreIds?: string[];
  actorIds?: string[];
}

interface ContentUpdateInput extends Partial<Content> {
  genreIds?: string[];
  actorIds?: string[];
}

export const createContent = async (contentData: ContentCreateInput): Promise<Content> => {
  try {
    const { genreIds, actorIds, ...contentDetails } = contentData;
    
    return await prisma.content.create({
      data: {
        ...contentDetails,
        ...(genreIds && genreIds.length > 0
          ? {
              genres: {
                connect: genreIds.map((id) => ({ id })),
              },
            }
          : {}),
        ...(actorIds && actorIds.length > 0
          ? {
              actors: {
                connect: actorIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
      include: {
        genres: true,
        actors: true,
        director: true,
      },
    });
  } catch (error) {
    console.error('Error creating content:', error);
    throw error;
  }
};

export const getAllContents = async (): Promise<Content[]> => {
  try {
    return await prisma.content.findMany();
  } catch (error) {
    console.error('Error fetching all contents:', error);
    throw error;
  }
};

export const getContentById = async (id: string): Promise<Content | null> => {
  try {
    return await prisma.content.findUnique({
      where: { id: id },
    });
  } catch (error) {
    console.error(`Error fetching content with ID ${id}:`, error);
    throw error;
  }
};

export const updateContent = async (id: string, contentData: ContentUpdateInput): Promise<Content | null> => {
  try {
    const { genreIds, actorIds, ...contentDetails } = contentData;
    
    return await prisma.content.update({
      where: { id: id },
      data: {
        ...contentDetails,
        ...(genreIds
          ? {
              genres: {
                set: genreIds.map((id) => ({ id })),
              },
            }
          : {}),
        ...(actorIds
          ? {
              actors: {
                set: actorIds.map((id) => ({ id })),
              },
            }
          : {}),
      },
    });
  } catch (error) {
    console.error(`Error updating content with ID ${id}:`, error);
    throw error;
  }
};

export const deleteContent = async (id: string): Promise<void> => {
  try {
    await prisma.content.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error(`Error deleting content with ID ${id}:`, error);
    throw error;
  }
};
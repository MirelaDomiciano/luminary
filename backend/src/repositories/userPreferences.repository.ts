import { PrismaClient, UserPreferences } from '@prisma/client';

const prisma = new PrismaClient();

interface UserPreferencesInput {
  genreIds?: string[];
  actorIds?: string[];
  directorIds?: string[];
}


export const createUserPreferences = async (
  userId: string, 
  preferencesData: UserPreferencesInput
): Promise<UserPreferences> => {
  try {
    const { genreIds, actorIds, directorIds } = preferencesData;
    
    return await prisma.userPreferences.create({
      data: {
        user: {
          connect: { id: userId }
        },
        ...(genreIds && genreIds.length > 0
          ? {
              genres: {
                connect: genreIds.map(id => ({ id }))
              }
            }
          : {}),
        ...(actorIds && actorIds.length > 0
          ? {
              actors: {
                connect: actorIds.map(id => ({ id }))
              }
            }
          : {}),
        ...(directorIds && directorIds.length > 0
          ? {
              directors: {
                connect: directorIds.map(id => ({ id }))
              }
            }
          : {})
      },
      include: {
        genres: {
          select: {
            id: true,
            name: true
          }
        },
        actors: {
          select: {
            id: true,
            name: true
          }
        },
        directors: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error creating user preferences for user with ID ${userId}:`, error);
    throw error;
  }
};

export const getUserPreferencesById = async (preferencesId: string): Promise<UserPreferences | null> => {
  try {
    return await prisma.userPreferences.findUnique({
      where: { id: preferencesId },
      include: {
        genres: {
          select: {
            id: true,
            name: true
          }
        },
        actors: {
          select: {
            id: true,
            name: true
          }
        },
        directors: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error fetching user preferences with ID ${preferencesId}:`, error);
    throw error;
  }
};

export const getUserPreferencesByUserId = async (userId: string): Promise<UserPreferences[]> => {
  try {
    return await prisma.userPreferences.findMany({
      where: { userId },
      include: {
        genres: {
          select: {
            id: true,
            name: true
          }
        },
        actors: {
          select: {
            id: true,
            name: true
          }
        },
        directors: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error fetching preferences for user with ID ${userId}:`, error);
    throw error;
  }
};

export const updateUserPreferences = async (
  preferencesId: string,
  preferencesData: UserPreferencesInput
): Promise<UserPreferences | null> => {
  try {
    const { genreIds, actorIds, directorIds } = preferencesData;
    
    return await prisma.userPreferences.update({
      where: { id: preferencesId },
      data: {
        ...(genreIds
          ? {
              genres: {
                set: genreIds.map(id => ({ id }))
              }
            }
          : {}),
        ...(actorIds
          ? {
              actors: {
                set: actorIds.map(id => ({ id }))
              }
            }
          : {}),
        ...(directorIds
          ? {
              directors: {
                set: directorIds.map(id => ({ id }))
              }
            }
          : {})
      },
      include: {
        genres: {
          select: {
            id: true,
            name: true
          }
        },
        actors: {
          select: {
            id: true,
            name: true
          }
        },
        directors: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Error updating user preferences with ID ${preferencesId}:`, error);
    throw error;
  }
};

export const deleteUserPreferences = async (preferencesId: string): Promise<void> => {
  try {
    await prisma.userPreferences.delete({
      where: { id: preferencesId }
    });
  } catch (error) {
    console.error(`Error deleting user preferences with ID ${preferencesId}:`, error);
    throw error;
  }
};
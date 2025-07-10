import { PrismaClient, PersonRole } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllActors = async () => {
  try {
    return await prisma.person.findMany({
      where: {
        role: PersonRole.ACTOR,
      },
      select: {
        id: true,
        name: true,
        biography: true,
        birthDate: true,
        deathDate: true,
        awards: true,
        role: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching actors:', error);
    throw error;
  }
};

export const getAllDirectors = async () => {
  try {
    return await prisma.person.findMany({
      where: {
        role: PersonRole.DIRECTOR,
      },
      select: {
        id: true,
        name: true,
        biography: true,
        birthDate: true,
        deathDate: true,
        awards: true,
        role: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching directors:', error);
    throw error;
  }
};

export const getAllPersons = async () => {
  try {
    return await prisma.person.findMany({
      select: {
        id: true,
        name: true,
        biography: true,
        birthDate: true,
        deathDate: true,
        awards: true,
        role: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error('Error fetching persons:', error);
    throw error;
  }
};

export const getPersonById = async (id: string) => {
  try {
    return await prisma.person.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        biography: true,
        birthDate: true,
        deathDate: true,
        awards: true,
        role: true,
        actorInContent: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
        directorOfContent: {
          select: {
            id: true,
            title: true,
            type: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching person with ID ${id}:`, error);
    throw error;
  }
};

export const createPerson = async (data: {
  name: string;
  biography: string;
  birthDate: Date;
  deathDate?: Date;
  awards?: string[];
  role: PersonRole;
}) => {
  try {
    return await prisma.person.create({
      data,
      select: {
        id: true,
        name: true,
        biography: true,
        birthDate: true,
        deathDate: true,
        awards: true,
        role: true,
      },
    });
  } catch (error) {
    console.error('Error creating person:', error);
    throw error;
  }
};

export const updatePerson = async (id: string, data: {
  name?: string;
  biography?: string;
  birthDate?: Date;
  deathDate?: Date;
  awards?: string[];
  role?: PersonRole;
}) => {
  try {
    return await prisma.person.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        biography: true,
        birthDate: true,
        deathDate: true,
        awards: true,
        role: true,
      },
    });
  } catch (error) {
    console.error(`Error updating person with ID ${id}:`, error);
    throw error;
  }
};

export const deletePerson = async (id: string) => {
  try {
    await prisma.person.delete({
      where: { id },
    });
  } catch (error) {
    console.error(`Error deleting person with ID ${id}:`, error);
    throw error;
  }
}; 
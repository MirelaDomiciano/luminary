import api from './api';
import type { Person } from './api';

export interface PersonData {
  name: string;
  biography: string;
  birthDate: string;
  deathDate?: string;
  awards?: string[];
  role: 'ACTOR' | 'DIRECTOR';
}

export const personService = {
  // Buscar todos os atores
  getAllActors: async (): Promise<Person[]> => {
    const response = await api.get<Person[]>('/persons/actors');
    return response.data;
  },

  // Buscar todos os diretores
  getAllDirectors: async (): Promise<Person[]> => {
    const response = await api.get<Person[]>('/persons/directors');
    return response.data;
  },

  // Buscar todas as pessoas
  getAllPersons: async (): Promise<Person[]> => {
    const response = await api.get<Person[]>('/persons');
    return response.data;
  },

  // Buscar pessoa por ID
  getPersonById: async (id: string): Promise<Person> => {
    const response = await api.get<Person>(`/persons/${id}`);
    return response.data;
  },

  // Criar pessoa
  createPerson: async (personData: PersonData): Promise<Person> => {
    const response = await api.post<Person>('/persons', personData);
    return response.data;
  },

  // Atualizar pessoa
  updatePerson: async (id: string, data: Partial<PersonData>): Promise<Person> => {
    const response = await api.patch<Person>(`/persons/${id}`, data);
    return response.data;
  },

  // Deletar pessoa
  deletePerson: async (id: string): Promise<void> => {
    await api.delete(`/persons/${id}`);
  },
}; 
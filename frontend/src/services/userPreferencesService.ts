import api from './api';

export interface UserPreferences {
  id: string;
  userId: string;
  genres: Array<{
    id: string;
    name: string;
  }>;
  actors: Array<{
    id: string;
    name: string;
  }>;
  directors: Array<{
    id: string;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferencesInput {
  genreIds?: string[];
  actorIds?: string[];
  directorIds?: string[];
}

export const userPreferencesService = {
  // Buscar preferências do usuário logado
  getUserPreferences: async (): Promise<UserPreferences[]> => {
    const response = await api.get<UserPreferences[]>('/preferences');
    return response.data;
  },

  // Criar preferências do usuário
  createUserPreferences: async (data: UserPreferencesInput): Promise<UserPreferences> => {
    const response = await api.post<UserPreferences>('/preferences', data);
    return response.data;
  },

  // Atualizar preferências do usuário
  updateUserPreferences: async (data: UserPreferencesInput): Promise<UserPreferences> => {
    const response = await api.patch<UserPreferences>('/preferences', data);
    return response.data;
  },

  // Deletar preferências do usuário
  deleteUserPreferences: async (): Promise<void> => {
    await api.delete('/preferences');
  },
}; 
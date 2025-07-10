import api from './api';
import type { Genre } from './api';

export interface GenreData {
  name: string;
  description: string;
}

export const genreService = {
  // Buscar todos os gêneros
  getAllGenres: async (): Promise<Genre[]> => {
    const response = await api.get<Genre[]>('/genres');
    return response.data;
  },

  // Buscar gênero por ID
  getGenreById: async (id: string): Promise<Genre> => {
    const response = await api.get<Genre>(`/genres/${id}`);
    return response.data;
  },

  // Criar gênero
  createGenre: async (genreData: GenreData): Promise<Genre> => {
    const response = await api.post<Genre>('/genres', genreData);
    return response.data;
  },

  // Atualizar gênero
  updateGenre: async (id: string, data: Partial<GenreData>): Promise<Genre> => {
    const response = await api.patch<Genre>(`/genres/${id}`, data);
    return response.data;
  },

  // Deletar gênero
  deleteGenre: async (id: string): Promise<void> => {
    await api.delete(`/genres/${id}`);
  },
}; 
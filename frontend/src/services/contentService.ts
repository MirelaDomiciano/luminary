import api from './api';
import type { Content } from './api';

export interface MovieData {
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  rating: number;
  studio: string;
  boxOffice: number;
  directorId: string;
  genreIds: string[];
  actorIds: string[];
}

export interface SeriesData {
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  rating: number;
  studio?: string;
  numberOfSeasons: number;
  currentStatus: string;
  directorId: string;
  genreIds: string[];
  actorIds: string[];
}

export const contentService = {
  // Buscar todos os conteúdos
  getAllContents: async (): Promise<Content[]> => {
    const response = await api.get<Content[]>('/content');
    return response.data;
  },

  // Buscar conteúdo por tipo (movies ou series)
  getContentsByType: async (type: 'movies' | 'series'): Promise<Content[]> => {
    const response = await api.get<Content[]>(`/content/type/${type}`);
    return response.data;
  },

  // Buscar conteúdo por ID
  getContentById: async (id: string): Promise<Content> => {
    const response = await api.get<Content>(`/content/${id}`);
    return response.data;
  },

  // Criar filme
  createMovie: async (movieData: MovieData): Promise<Content> => {
    const response = await api.post<Content>('/content/movies', movieData);
    return response.data;
  },

  // Criar série
  createSeries: async (seriesData: SeriesData): Promise<Content> => {
    const response = await api.post<Content>('/content/series', seriesData);
    return response.data;
  },

  // Atualizar conteúdo
  updateContent: async (id: string, data: Partial<Content>): Promise<Content> => {
    const response = await api.patch<Content>(`/content/${id}`, data);
    return response.data;
  },

  // Deletar conteúdo
  deleteContent: async (id: string): Promise<void> => {
    await api.delete(`/content/${id}`);
  },
}; 
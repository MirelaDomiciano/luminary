import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas e erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirecionar para login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Interfaces compartilhadas
export interface Genre {
  id: string;
  name: string;
  description: string;
}

export interface Person {
  id: string;
  name: string;
  biography: string;
  birthDate: string;
  deathDate?: string;
  awards: string[];
  role: 'ACTOR' | 'DIRECTOR';
}

export interface Content {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  duration: number;
  rating: number;
  type: 'MOVIE' | 'SERIES';
  studio?: string;
  boxOffice?: number;
  numberOfSeasons?: number;
  currentStatus?: string;
  imageUrl?: string;
  genres: Genre[];
  actors?: Person[];
  directors?: Person[];
  director?: Person;
  directorId?: string;
}

export default api; 
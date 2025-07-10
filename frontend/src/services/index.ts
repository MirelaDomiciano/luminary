// Re-export all services for convenient imports
export { authService } from './authService';
export { contentService } from './contentService';
export { genreService } from './genreService';
export { personService } from './personService';
export { userPreferencesService } from './userPreferencesService';

// Re-export types
export type { SignupData, LoginData, AuthResponse } from './authService';
export type { MovieData, SeriesData } from './contentService';
export type { GenreData } from './genreService';
export type { PersonData } from './personService';
export type { UserPreferences, UserPreferencesInput } from './userPreferencesService';
export type { Content, Genre, Person } from './api';

// Re-export the base API instance
export { default as api } from './api'; 
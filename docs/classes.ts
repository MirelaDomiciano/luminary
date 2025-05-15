import { v4 as uuidv4 } from 'uuid';

// ------------------------------------------------------------
// Content
// ------------------------------------------------------------
abstract class Content {
  contentId: string;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  rating: number;
  genres: Genre[];
  actors: Actor[];
  directors: Director[];
  constructor(title: string, description: string, releaseDate: Date, duration: number, rating: number) {
    this.contentId = uuidv4();
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.duration = duration;
    this.rating = rating;
  }
}

class Movie extends Content {
  studio: string;
  boxOffice: number;
  constructor(title: string, description: string, releaseDate: Date, duration: number, rating: number, studio: string, boxOffice: number) {
    super(title, description, releaseDate, duration, rating);
    this.studio = studio;
    this.boxOffice = boxOffice;
  }
}

class Series extends Content {
  numberOfSeasons: number;
  currentStatus: string;
  episodes: Episode[];
  constructor(title: string, description: string, releaseDate: Date, duration: number, rating: number, numberOfSeasons: number, currentStatus: string) {
    super(title, description, releaseDate, duration, rating);
    this.numberOfSeasons = numberOfSeasons;
    this.currentStatus = currentStatus;
    this.episodes = [];
  }
}

class Episode {
  episodeId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  
  constructor(title: string, description: string, releaseDate: Date, duration: number, seasonNumber: number, episodeNumber: number) {
    this.episodeId = uuidv4();
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.duration = duration;
    this.seasonNumber = seasonNumber;
    this.episodeNumber = episodeNumber;
  }
}

class Genre {
  genreId: string;
  name: string;
  description: string;
  contents: Content[];
  constructor(name: string, description: string) {
    this.genreId = uuidv4();
    this.name = name;
    this.description = description;
    this.contents = [];
  }
}

class Actor {
  actorId: string;
  name: string;
  biography: string;
  birthDate: Date;
  deathDate?: Date;
  constructor(name: string, biography: string, birthDate: Date, deathDate?: Date) {
    this.actorId = uuidv4();
    this.name = name;
    this.biography = biography;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
  }
}

class Director {
  directorId: string;
  name: string;
  biography: string;
  birthDate: Date;
  deathDate?: Date;
  constructor(name: string, biography: string, birthDate: Date, deathDate?: Date) {
    this.directorId = uuidv4();
    this.name = name;
    this.biography = biography;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
  }
}
// ------------------------------------------------------------
// User
// ------------------------------------------------------------
class User {
  userId: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  isActive: boolean;
  viewingHistory: ViewingHistory[];
  ratings: Rating[];
  recommendations: Recommendation[];
  preference: UserPreference;
  
  constructor(
    username: string,
    email: string,
    password: string,
  ) {
    this.userId = uuidv4();
    this.username = username;
    this.email = email;
    this.password = password; 
    this.createdAt = new Date();
    this.isActive = true;
    this.viewingHistory = [];
    this.ratings = [];
    this.recommendations = [];
    this.preference = new UserPreference();
    this.viewingHistory = [];
    this.ratings = [];
  }
}

class UserPreference {
  preferenceId: string;
  genres: Genre[];
  actors: Actor[];
  directors: Director[];
  
  constructor() {
    this.preferenceId = uuidv4();
    this.genres = [];
    this.actors = [];
    this.directors = [];
  }
}

class ViewingHistory {
  viewingHistoryId: string;
  viewDate: Date;
  completionPercentage: number;
  content: Content;  
  constructor(content: Content, viewDate: Date, completionPercentage: number) {
    this.viewingHistoryId = uuidv4();
    this.viewDate = viewDate;
    this.completionPercentage = completionPercentage;
    this.content = content;
  }
}
// ------------------------------------------------------------
// Rating
// ------------------------------------------------------------
class Rating {
  ratingId: string;
  content: Content;
  score: number;
  comment: string;
  creationAt: Date;
  constructor(score: number, comment: string) {
    this.ratingId = uuidv4();
    this.score = score;
    this.comment = comment;
    this.creationAt = new Date();
  }
}
// ------------------------------------------------------------
// Recommendation
// ------------------------------------------------------------

class Recommendation {
  recommendationId: string;
  score: number;
  reason: string;
  createdAt: Date;
  user: User;
  content: Content;
  constructor(score: number, reason: string) {
    this.recommendationId = uuidv4();
    this.score = score;
    this.reason = reason;
    this.createdAt = new Date();
  }
}

class ProcessedPreferences {
  genreWeights: Map<string, number>; 
  actorAffinities: Map<string, number>; 
  directorAffinities: Map<string, number>; 
  contentTypePreferences: Map<string, number>; 
  lastUpdated: Date;

  constructor() {
    this.genreWeights = new Map<string, number>();
    this.actorAffinities = new Map<string, number>();
    this.directorAffinities = new Map<string, number>();
    this.contentTypePreferences = new Map<string, number>();
    this.lastUpdated = new Date();
  }
}

class RecommendationCriteria {
  criteriaId: string;
  genreWeights: Map<string, number>; 
  recencyWeight: number;          
  popularityWeight: number;       
  similarityThreshold: number;    
  
  constructor() {
    this.criteriaId = uuidv4();
    this.genreWeights = new Map<string, number>();
    this.recencyWeight = 0.5;     
    this.popularityWeight = 0.5; 
    this.similarityThreshold = 0.3; 
  }
  
}
class RecommendationEngine {
  recommendations: Recommendation[];
  processPreference: ProcessedPreferences;
  recommendationCriteria: RecommendationCriteria;
  users: User[];
  contents: Content[];
  constructor(recommendationCriteria: RecommendationCriteria) {
    this.recommendationCriteria = recommendationCriteria;
    this.processPreference = new ProcessedPreferences();
    this.recommendations = [];
  }
}

// ------------------------------------------------------------
// Services
// ------------------------------------------------------------

class UserManager {
  users: User[];
  constructor() {
    this.users = [];
  } 
}
class AuthenticationService {
  users: User[];
  constructor() {
    this.users = [];
  }
}
